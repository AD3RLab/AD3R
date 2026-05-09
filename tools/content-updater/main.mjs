import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import { getProjectRoot, importMediaFile, loadWorkspace, resolvePreviewUrl, saveSection } from "./lib/data-store.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = getProjectRoot();
const previewState = {
  process: null,
  url: "http://127.0.0.1:4321/AD3R/",
  logs: [],
  status: "stopped"
};

function getNpmCommand() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function pushLog(target, chunk) {
  const text = String(chunk ?? "").replace(/\r\n/g, "\n").trim();
  if (!text) {
    return;
  }

  target.push(...text.split("\n"));
  if (target.length > 120) {
    target.splice(0, target.length - 120);
  }
}

function createProcessError(command, code, stdout, stderr) {
  const detail = [stderr, stdout].filter(Boolean).join("\n").trim();
  return new Error(detail || `${command} exited with code ${code}`);
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: { ...process.env, ...(options.env ?? {}) },
      shell: false
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
      if (options.onStdout) {
        options.onStdout(String(chunk));
      }
    });

    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
      if (options.onStderr) {
        options.onStderr(String(chunk));
      }
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(createProcessError(`${command} ${args.join(" ")}`, code, stdout, stderr));
    });
  });
}

async function runGit(args) {
  return runCommand("git", args);
}

function getPreviewSnapshot() {
  return {
    running: Boolean(previewState.process) && !previewState.process.killed,
    status: previewState.status,
    url: previewState.url,
    logs: previewState.logs.join("\n")
  };
}

async function startPreviewServer() {
  if (previewState.process && !previewState.process.killed) {
    return getPreviewSnapshot();
  }

  previewState.logs = [];
  previewState.status = "starting";
  const child = spawn(getNpmCommand(), ["run", "dev", "--", "--host", "127.0.0.1", "--port", "4321"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      BROWSER: "none"
    },
    shell: false
  });

  previewState.process = child;

  child.stdout.on("data", (chunk) => {
    pushLog(previewState.logs, chunk);
    if (/127\.0\.0\.1:4321|localhost:4321/i.test(String(chunk))) {
      previewState.status = "running";
    }
  });

  child.stderr.on("data", (chunk) => {
    pushLog(previewState.logs, chunk);
  });

  child.on("error", (error) => {
    pushLog(previewState.logs, error.message);
    previewState.status = "error";
    previewState.process = null;
  });

  child.on("close", (code) => {
    pushLog(previewState.logs, `Preview server exited with code ${code}.`);
    previewState.status = code === 0 ? "stopped" : "error";
    previewState.process = null;
  });

  await new Promise((resolve) => setTimeout(resolve, 1800));
  if (previewState.status !== "running") {
    previewState.status = previewState.process ? "running" : previewState.status;
  }

  return getPreviewSnapshot();
}

async function stopPreviewServer() {
  if (!previewState.process || previewState.process.killed) {
    previewState.status = "stopped";
    previewState.process = null;
    return getPreviewSnapshot();
  }

  previewState.process.kill();
  previewState.process = null;
  previewState.status = "stopped";
  pushLog(previewState.logs, "Preview server stopped.");
  return getPreviewSnapshot();
}

async function getGitStatus() {
  let branch = "";
  let remote = "";
  let statusOutput = "";

  try {
    branch = (await runGit(["branch", "--show-current"])).stdout.trim();
  } catch {
    branch = "";
  }

  try {
    remote = (await runGit(["remote", "get-url", "origin"])).stdout.trim();
  } catch {
    remote = "";
  }

  try {
    statusOutput = (await runGit(["status", "--short"])).stdout.trim();
  } catch {
    statusOutput = "";
  }

  const files = statusOutput
    ? statusOutput.split(/\r?\n/).filter(Boolean).map((line) => ({
        raw: line,
        code: line.slice(0, 2),
        path: line.slice(3).trim()
      }))
    : [];

  return {
    branch,
    remote,
    files,
    hasChanges: files.length > 0
  };
}

function getGitHubActionsUrl(remote) {
  const target = String(remote ?? "").trim();
  if (!target) {
    return "";
  }

  if (target.startsWith("https://github.com/")) {
    return target.replace(/\.git$/i, "").replace(/\/$/, "") + "/actions";
  }

  const sshMatch = target.match(/^git@github\.com:(.+?)(?:\.git)?$/i);
  if (sshMatch) {
    return `https://github.com/${sshMatch[1].replace(/\.git$/i, "")}/actions`;
  }

  return "";
}

async function showPublishConfirm(payload) {
  const commitMessage = String(payload?.commitMessage ?? "").trim() || "未填写";
  const branch = String(payload?.branch ?? "").trim() || "未知分支";
  const remote = String(payload?.remote ?? "").trim() || "未配置 origin";
  const files = Array.isArray(payload?.files) ? payload.files : [];
  const previewFiles = files.slice(0, 8).map((item) => `- ${item.path}`);
  const detailLines = [
    `分支：${branch}`,
    `远端：${remote}`,
    `提交说明：${commitMessage}`,
    `改动文件数：${files.length}`
  ];

  if (previewFiles.length > 0) {
    detailLines.push("", "即将推送的文件：", ...previewFiles);
    if (files.length > previewFiles.length) {
      detailLines.push(`... 还有 ${files.length - previewFiles.length} 个文件`);
    }
  }

  const result = await dialog.showMessageBox(BrowserWindow.getFocusedWindow() ?? undefined, {
    type: "question",
    buttons: ["确认发布", "取消"],
    defaultId: 0,
    cancelId: 1,
    title: "确认发布到 GitHub",
    message: "即将执行构建、提交并推送到 GitHub。",
    detail: detailLines.join("\n"),
    noLink: true
  });

  return result.response === 0;
}

async function showPublishResult(payload) {
  const success = Boolean(payload?.success);
  const branch = String(payload?.branch ?? "").trim();
  const remote = String(payload?.remote ?? "").trim();
  const actionsUrl = getGitHubActionsUrl(remote);
  const logs = String(payload?.logs ?? "").trim();

  const buttons = success && actionsUrl ? ["打开 GitHub Actions", "关闭"] : ["关闭"];
  const result = await dialog.showMessageBox(BrowserWindow.getFocusedWindow() ?? undefined, {
    type: success ? "info" : "error",
    buttons,
    defaultId: 0,
    cancelId: buttons.length - 1,
    title: success ? "发布完成" : "发布失败",
    message: success
      ? `已完成推送${branch ? `，目标分支为 ${branch}` : ""}。`
      : "发布流程执行失败，请查看日志。",
    detail: logs ? logs.slice(-5000) : "",
    noLink: true
  });

  if (success && actionsUrl && result.response === 0) {
    await shell.openExternal(actionsUrl);
  }

  return { openedActions: success && actionsUrl && result.response === 0, actionsUrl };
}

async function publishToGitHub(commitMessage) {
  const message = String(commitMessage ?? "").trim();

  if (!message) {
    throw new Error("请先填写提交说明。");
  }

  const logs = [];
  const branch = (await runGit(["branch", "--show-current"])).stdout.trim();

  if (!branch) {
    throw new Error("当前仓库没有可用分支，无法发布。");
  }

  const remote = (await runGit(["remote", "get-url", "origin"])).stdout.trim();
  logs.push(`Remote: ${remote || "未配置 origin"}`);
  logs.push(`Branch: ${branch}`);

  const buildResult = await runCommand(getNpmCommand(), ["run", "build"]);
  pushLog(logs, buildResult.stdout);
  pushLog(logs, buildResult.stderr);

  await runGit(["add", "."]);
  const staged = (await runGit(["diff", "--cached", "--name-only"])).stdout.trim();
  const stagedFiles = staged ? staged.split(/\r?\n/).filter(Boolean) : [];

  if (stagedFiles.length === 0) {
    return {
      branch,
      remote,
      skipped: true,
      logs: logs.join("\n"),
      stagedFiles: []
    };
  }

  const commitResult = await runGit(["commit", "-m", message]);
  pushLog(logs, commitResult.stdout);
  pushLog(logs, commitResult.stderr);

  const pushResult = await runGit(["push", "origin", branch]);
  pushLog(logs, pushResult.stdout);
  pushLog(logs, pushResult.stderr);

  return {
    branch,
    remote,
    skipped: false,
    stagedFiles,
    logs: logs.join("\n")
  };
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1480,
    height: 960,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: "#0b1120",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  window.loadFile(path.join(__dirname, "renderer", "index.html"));
}

ipcMain.handle("updater:load-workspace", async () => loadWorkspace());
ipcMain.handle("updater:get-project-root", async () => projectRoot);
ipcMain.handle("updater:save-section", async (_event, sectionKey, payload) => saveSection(sectionKey, payload));
ipcMain.handle("updater:import-media", async (_event, payload) => importMediaFile(payload));
ipcMain.handle("updater:resolve-preview-url", async (_event, sitePath) => resolvePreviewUrl(sitePath));
ipcMain.handle("updater:preview-status", async () => getPreviewSnapshot());
ipcMain.handle("updater:start-preview", async () => startPreviewServer());
ipcMain.handle("updater:stop-preview", async () => stopPreviewServer());
ipcMain.handle("updater:open-external", async (_event, url) => shell.openExternal(url));
ipcMain.handle("updater:git-status", async () => getGitStatus());
ipcMain.handle("updater:confirm-publish", async (_event, payload) => showPublishConfirm(payload));
ipcMain.handle("updater:show-publish-result", async (_event, payload) => showPublishResult(payload));
ipcMain.handle("updater:github-actions-url", async () => {
  const remote = (await getGitStatus()).remote;
  return getGitHubActionsUrl(remote);
});
ipcMain.handle("updater:publish-github", async (_event, commitMessage) => publishToGitHub(commitMessage));
ipcMain.handle("updater:open-in-folder", async (_event, targetPath) => {
  if (!targetPath) {
    return false;
  }

  const normalized = targetPath.replace(/^\/+/, "");
  const absolutePath = path.join(projectRoot, "public", normalized);
  await shell.showItemInFolder(absolutePath);
  return true;
});
ipcMain.handle("updater:choose-file", async (_event, options = {}) => {
  const result = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow() ?? undefined, {
    properties: ["openFile"],
    filters: options.filters ?? []
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("before-quit", () => {
  if (previewState.process && !previewState.process.killed) {
    previewState.process.kill();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
