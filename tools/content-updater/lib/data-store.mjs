import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../../..");

const paths = {
  site: path.join(projectRoot, "src", "data", "site.ts"),
  members: path.join(projectRoot, "src", "data", "members.ts"),
  projects: path.join(projectRoot, "src", "data", "projects.ts"),
  achievements: path.join(projectRoot, "src", "data", "achievements.ts"),
  researchTopics: path.join(projectRoot, "src", "data", "researchTopics.ts"),
  newsDir: path.join(projectRoot, "src", "content", "news"),
  changelogDir: path.join(projectRoot, "src", "content", "changelog")
};

const markdownKeys = {
  news: ["title", "date", "author", "summary", "tags"],
  changelog: ["version", "date", "type", "project", "summary"]
};

function indent(level) {
  return "  ".repeat(level);
}

function formatKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

function serializeValue(value, level = 0) {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const items = value.map((item) => `${indent(level + 1)}${serializeValue(item, level + 1)}`).join(",\n");
    return `[\n${items}\n${indent(level)}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);

    if (entries.length === 0) {
      return "{}";
    }

    const body = entries
      .map(([key, entryValue]) => `${indent(level + 1)}${formatKey(key)}: ${serializeValue(entryValue, level + 1)}`)
      .join(",\n");

    return `{\n${body}\n${indent(level)}}`;
  }

  return "undefined";
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readTsModule(filePath) {
  const source = await fs.readFile(filePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    },
    fileName: filePath
  }).outputText;

  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    require(specifier) {
      throw new Error(`Unsupported runtime import in updater loader: ${specifier}`);
    },
    __dirname: path.dirname(filePath),
    __filename: filePath,
    console,
    process
  };

  vm.runInNewContext(transpiled, sandbox, { filename: filePath });
  return module.exports;
}

async function replaceTsExport(filePath, exportName, nextCode) {
  const source = await fs.readFile(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error(`Cannot find export "${exportName}" in ${filePath}`);
  }

  const header = source.slice(0, markerIndex);
  await fs.writeFile(filePath, `${header}${nextCode}\n`, "utf8");
}

async function writeTsArrayExport(filePath, exportName, typeName, data) {
  const serialized = serializeValue(data, 0);
  await replaceTsExport(filePath, exportName, `export const ${exportName}: ${typeName}[] = ${serialized};`);
}

async function writeSiteConfig(data) {
  const serialized = serializeValue(data, 0);
  await replaceTsExport(paths.site, "siteConfig", `export const siteConfig = ${serialized} as const;`);
}

function normalizeMarkdownBody(body) {
  return (body ?? "").replace(/\r\n/g, "\n").trim();
}

function pickDefinedKeys(item, keys) {
  const result = {};

  for (const key of keys) {
    const value = item[key];
    if (value === undefined || value === null || value === "") {
      continue;
    }
    result[key] = value;
  }

  return result;
}

async function loadMarkdownCollection(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"));

  const items = [];

  for (const fileName of markdownFiles) {
    const fullPath = path.join(dirPath, fileName);
    const raw = await fs.readFile(fullPath, "utf8");
    const parsed = matter(raw);

    items.push({
      slug: path.basename(fileName, ".md"),
      ...deepClone(parsed.data),
      body: normalizeMarkdownBody(parsed.content)
    });
  }

  return items;
}

async function writeMarkdownCollection(dirPath, type, items) {
  await ensureDir(dirPath);

  const existingEntries = await fs.readdir(dirPath, { withFileTypes: true });
  const existingFiles = existingEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  const nextFiles = new Set();

  for (const item of items) {
    if (!item.slug) {
      throw new Error(`Missing slug while saving ${type} entry.`);
    }

    const fileName = `${item.slug}.md`;
    nextFiles.add(fileName);
    const fullPath = path.join(dirPath, fileName);
    const frontmatter = pickDefinedKeys(item, markdownKeys[type]);
    const content = `${matter.stringify(normalizeMarkdownBody(item.body), frontmatter).trimEnd()}\n`;
    await fs.writeFile(fullPath, content, "utf8");
  }

  for (const fileName of existingFiles) {
    if (!nextFiles.has(fileName)) {
      await fs.unlink(path.join(dirPath, fileName));
    }
  }
}

function sanitizeFileName(fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const normalizedBase = base
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${normalizedBase || "asset"}${ext.toLowerCase()}`;
}

async function buildUniquePath(targetDir, originalName) {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  let candidate = path.join(targetDir, originalName);
  let index = 1;

  while (await fileExists(candidate)) {
    candidate = path.join(targetDir, `${base}-${index}${ext}`);
    index += 1;
  }

  return candidate;
}

function isVideoExtension(ext) {
  return [".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"].includes(ext.toLowerCase());
}

function resolveMediaTarget(targetFolder, sourcePath) {
  const ext = path.extname(sourcePath);

  if (targetFolder === "members") {
    return {
      absoluteDir: path.join(projectRoot, "public", "images", "members"),
      publicPath: "/images/members"
    };
  }

  if (targetFolder === "projects") {
    return {
      absoluteDir: path.join(projectRoot, "public", "images", "projects"),
      publicPath: "/images/projects"
    };
  }

  if (targetFolder === "showcase") {
    if (isVideoExtension(ext)) {
      return {
        absoluteDir: path.join(projectRoot, "public", "videos"),
        publicPath: "/videos"
      };
    }

    return {
      absoluteDir: path.join(projectRoot, "public", "images", "showcase"),
      publicPath: "/images/showcase"
    };
  }

  throw new Error(`Unsupported target folder: ${targetFolder}`);
}

export function getProjectRoot() {
  return projectRoot;
}

export function resolvePreviewUrl(sitePath) {
  if (!sitePath) {
    return "";
  }

  const relative = sitePath.replace(/^\/+/, "");
  const absolute = path.join(projectRoot, "public", relative);
  return pathToFileURL(absolute).href;
}

export async function importMediaFile({ sourcePath, targetFolder }) {
  if (!sourcePath) {
    throw new Error("Missing source path.");
  }

  const target = resolveMediaTarget(targetFolder, sourcePath);
  await ensureDir(target.absoluteDir);

  const safeName = sanitizeFileName(path.basename(sourcePath));
  const nextPath = await buildUniquePath(target.absoluteDir, safeName);
  await fs.copyFile(sourcePath, nextPath);

  return {
    sitePath: `${target.publicPath}/${path.basename(nextPath)}`,
    absolutePath: nextPath
  };
}

export async function loadWorkspace() {
  const [{ siteConfig }, { members }, { projects }, { achievements }, { researchTopics }, news, changelog] = await Promise.all([
    readTsModule(paths.site),
    readTsModule(paths.members),
    readTsModule(paths.projects),
    readTsModule(paths.achievements),
    readTsModule(paths.researchTopics),
    loadMarkdownCollection(paths.newsDir),
    loadMarkdownCollection(paths.changelogDir)
  ]);

  return {
    site: deepClone(siteConfig),
    members: deepClone(members),
    projects: deepClone(projects),
    achievements: deepClone(achievements),
    topics: deepClone(researchTopics),
    news,
    changelog
  };
}

export async function saveSection(sectionKey, payload) {
  switch (sectionKey) {
    case "site":
      await writeSiteConfig(payload);
      break;
    case "members":
      await writeTsArrayExport(paths.members, "members", "Member", payload);
      break;
    case "projects":
      await writeTsArrayExport(paths.projects, "projects", "Project", payload);
      break;
    case "achievements":
      await writeTsArrayExport(paths.achievements, "achievements", "Achievement", payload);
      break;
    case "topics":
      await writeTsArrayExport(paths.researchTopics, "researchTopics", "ResearchTopic", payload);
      break;
    case "news":
      await writeMarkdownCollection(paths.newsDir, "news", payload);
      break;
    case "changelog":
      await writeMarkdownCollection(paths.changelogDir, "changelog", payload);
      break;
    default:
      throw new Error(`Unsupported section: ${sectionKey}`);
  }

  return { success: true };
}
