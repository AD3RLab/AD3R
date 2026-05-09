const root = document.querySelector("#app");

const optionMaps = {
  projectStatus: {
    planning: "规划中",
    active: "进行中",
    maintenance: "维护中",
    archived: "已归档"
  },
  topicStatus: {
    tracking: "追踪中",
    researching: "研究中",
    validating: "验证中",
    completed: "已完成",
    paused: "已暂停"
  },
  topicPriority: {
    urgent: "紧急",
    high: "高",
    medium: "中",
    low: "低"
  },
  achievementType: {
    paper: "论文",
    patent: "专利",
    software: "软件",
    "open-source": "开源",
    article: "文章",
    award: "奖项",
    demo: "演示",
    report: "报告"
  },
  changelogType: {
    added: "新增",
    changed: "变更",
    fixed: "修复",
    removed: "移除"
  },
  mediaKind: {
    image: "图片",
    video: "视频"
  },
  roadmapStatus: {
    todo: "待开始",
    doing: "进行中",
    done: "已完成"
  }
};

const slugRule = {
  pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  message: "请使用小写字母、数字和连字符。"
};

const state = {
  workspace: null,
  projectRoot: "",
  currentSection: "site",
  selectedIndex: null,
  statusText: "正在加载内容...",
  statusTone: "",
  busy: false,
  preview: {
    running: false,
    status: "stopped",
    url: "http://127.0.0.1:4321/AD3R/",
    logs: "",
    loading: false
  },
  git: {
    branch: "",
    remote: "",
    files: [],
    hasChanges: false,
    commitMessage: `content: update ${today()}`,
    logs: "",
    loading: false,
    actionsUrl: ""
  },
  mediaPreviewUrls: {},
  mediaPreviewLoading: new Set()
};

function showcaseFields() {
  return [
    { key: "id", label: "素材 ID", type: "text", required: true, rule: slugRule },
    { key: "title", label: "标题", type: "text", required: true },
    { key: "kind", label: "类型", type: "select", options: optionMaps.mediaKind, required: true },
    { key: "src", label: "素材文件", type: "media", targetFolder: "showcase", full: true, required: true },
    { key: "thumbnail", label: "缩略图", type: "media", targetFolder: "showcase", full: true },
    { key: "summary", label: "描述", type: "textarea", full: true },
    { key: "date", label: "日期", type: "date" },
    { key: "link", label: "外部链接", type: "url" }
  ];
}

const sectionDefs = [
  {
    key: "site",
    title: "站点信息",
    subtitle: "维护团队名称、定位、能力和导航",
    singleton: true,
    fields: [
      { key: "name", label: "站点名称", type: "text", required: true },
      { key: "shortName", label: "简称", type: "text", required: true },
      { key: "englishName", label: "英文名", type: "text", full: true, required: true },
      { key: "description", label: "站点简介", type: "textarea", full: true, required: true },
      { key: "github", label: "GitHub 地址", type: "url", required: true },
      { key: "gitee", label: "Gitee 地址", type: "url" },
      { key: "email", label: "联系邮箱", type: "email", required: true },
      { key: "location", label: "团队定位短句", type: "text", full: true, required: true },
      { key: "positioning", label: "团队定位", type: "text", full: true, required: true },
      { key: "mission", label: "使命 / 主线", type: "textarea", full: true, required: true },
      { key: "vision", label: "愿景", type: "textarea", full: true, required: true },
      { key: "joinUs", label: "加入我们", type: "textarea", full: true, required: true },
      { key: "address", label: "地址文案", type: "textarea", full: true, required: true },
      { key: "audience", label: "服务对象", type: "stringArray", full: true, required: true },
      {
        key: "capabilities",
        label: "核心能力",
        type: "objectArray",
        full: true,
        required: true,
        itemTitle: "title",
        createItem: () => ({ title: "", description: "" }),
        fields: [
          { key: "title", label: "能力标题", type: "text", required: true },
          { key: "description", label: "能力描述", type: "textarea", full: true, required: true }
        ]
      },
      { key: "researchDirections", label: "研究方向", type: "stringArray", full: true, required: true },
      {
        key: "nav",
        label: "导航",
        type: "objectArray",
        full: true,
        required: true,
        itemTitle: "label",
        createItem: () => ({ label: "", href: "" }),
        fields: [
          { key: "label", label: "显示名称", type: "text", required: true },
          { key: "href", label: "跳转路径", type: "text", required: true }
        ]
      }
    ]
  },
  {
    key: "members",
    title: "成员",
    subtitle: "编辑成员信息、头像、研究方向和个人展示",
    itemTitle: (item) => item.name || item.id || "未命名成员",
    itemSummary: (item) => item.role || "待补充成员角色",
    createItem: () => ({
      id: `member-${Date.now()}`,
      name: "",
      avatar: "",
      role: "",
      title: "",
      bio: "",
      researchAreas: [],
      skills: [],
      email: "",
      github: "",
      gitee: "",
      homepage: "",
      showcase: [],
      projectIds: [],
      achievementIds: []
    }),
    fields: [
      { key: "id", label: "成员 ID", type: "text", required: true, rule: slugRule },
      { key: "name", label: "姓名", type: "text", required: true },
      { key: "avatar", label: "头像", type: "media", targetFolder: "members", required: true },
      { key: "role", label: "角色", type: "text", required: true },
      { key: "title", label: "方向标题", type: "text" },
      { key: "bio", label: "成员简介", type: "textarea", full: true, required: true },
      { key: "researchAreas", label: "研究方向", type: "stringArray", full: true, required: true },
      { key: "skills", label: "技能标签", type: "stringArray", full: true, required: true },
      { key: "email", label: "邮箱", type: "email", required: true },
      { key: "github", label: "GitHub", type: "url" },
      { key: "gitee", label: "Gitee", type: "url" },
      { key: "homepage", label: "个人主页", type: "url" },
      {
        key: "projectIds",
        label: "关联项目",
        type: "relationArray",
        source: "projects",
        labelField: "name",
        full: true
      },
      {
        key: "achievementIds",
        label: "关联成果",
        type: "relationArray",
        source: "achievements",
        labelField: "title",
        full: true
      },
      {
        key: "showcase",
        label: "个人展示素材",
        type: "objectArray",
        full: true,
        itemTitle: "title",
        createItem: () => ({
          id: `showcase-${Date.now()}`,
          title: "",
          kind: "image",
          src: "",
          thumbnail: "",
          summary: "",
          date: today(),
          link: ""
        }),
        fields: showcaseFields()
      }
    ]
  },
  {
    key: "projects",
    title: "项目",
    subtitle: "维护项目简介、负责人、里程碑、更新记录和展示素材",
    itemTitle: (item) => item.name || item.id || "未命名项目",
    itemSummary: (item) => item.summary || "待补充项目简介",
    createItem: () => ({
      id: `project-${Date.now()}`,
      name: "",
      summary: "",
      description: "",
      status: "planning",
      version: "",
      techStack: [],
      leaderId: "",
      memberIds: [],
      repoUrl: "",
      demoUrl: "",
      cover: "",
      showcase: [],
      features: [],
      roadmap: [],
      updates: [],
      achievementIds: [],
      updatedAt: today()
    }),
    fields: [
      { key: "id", label: "项目 ID", type: "text", required: true, rule: slugRule },
      { key: "name", label: "项目名称", type: "text", required: true },
      { key: "status", label: "项目状态", type: "select", options: optionMaps.projectStatus, required: true },
      { key: "version", label: "版本", type: "text" },
      { key: "summary", label: "项目摘要", type: "textarea", full: true, required: true },
      { key: "description", label: "项目描述", type: "textarea", full: true, required: true },
      { key: "techStack", label: "技术栈", type: "stringArray", full: true, required: true },
      { key: "leaderId", label: "负责人", type: "relationSingle", source: "members", labelField: "name", required: true },
      { key: "memberIds", label: "参与成员", type: "relationArray", source: "members", labelField: "name", full: true, required: true },
      { key: "repoUrl", label: "仓库地址", type: "url" },
      { key: "demoUrl", label: "演示地址", type: "url" },
      { key: "cover", label: "封面图", type: "media", targetFolder: "projects", required: true },
      {
        key: "showcase",
        label: "阶段展示",
        type: "objectArray",
        full: true,
        itemTitle: "title",
        createItem: () => ({
          id: `showcase-${Date.now()}`,
          title: "",
          kind: "image",
          src: "",
          thumbnail: "",
          summary: "",
          date: today(),
          link: ""
        }),
        fields: showcaseFields()
      },
      { key: "features", label: "项目特性", type: "stringArray", full: true, required: true },
      {
        key: "roadmap",
        label: "里程碑",
        type: "objectArray",
        full: true,
        required: true,
        itemTitle: "title",
        createItem: () => ({ title: "", status: "todo", targetDate: today() }),
        fields: [
          { key: "title", label: "里程碑标题", type: "text", required: true },
          { key: "status", label: "状态", type: "select", options: optionMaps.roadmapStatus, required: true },
          { key: "targetDate", label: "目标时间", type: "date" }
        ]
      },
      {
        key: "updates",
        label: "更新记录",
        type: "objectArray",
        full: true,
        required: true,
        itemTitle: "title",
        createItem: () => ({ date: today(), title: "", content: "" }),
        fields: [
          { key: "date", label: "日期", type: "date", required: true },
          { key: "title", label: "更新标题", type: "text", required: true },
          { key: "content", label: "更新内容", type: "textarea", full: true, required: true }
        ]
      },
      {
        key: "achievementIds",
        label: "关联成果",
        type: "relationArray",
        source: "achievements",
        labelField: "title",
        full: true
      },
      { key: "updatedAt", label: "更新时间", type: "date", required: true }
    ]
  },
  {
    key: "topics",
    title: "课题",
    subtitle: "维护课题优先级、状态、进展和下一步计划",
    itemTitle: (item) => item.title || item.id || "未命名课题",
    itemSummary: (item) => `${optionMaps.topicPriority[item.priority] ?? "未设优先级"} · ${optionMaps.topicStatus[item.status] ?? "未设状态"}`,
    createItem: () => ({
      id: `topic-${Date.now()}`,
      title: "",
      status: "tracking",
      priority: "medium",
      background: "",
      goals: [],
      memberIds: [],
      projectIds: [],
      keywords: [],
      progress: "",
      nextSteps: [],
      updatedAt: today()
    }),
    fields: [
      { key: "id", label: "课题 ID", type: "text", required: true, rule: slugRule },
      { key: "title", label: "课题名称", type: "text", full: true, required: true },
      { key: "status", label: "状态", type: "select", options: optionMaps.topicStatus, required: true },
      { key: "priority", label: "优先级", type: "select", options: optionMaps.topicPriority, required: true },
      { key: "background", label: "背景", type: "textarea", full: true, required: true },
      { key: "goals", label: "研究目标", type: "stringArray", full: true, required: true },
      { key: "memberIds", label: "相关成员", type: "relationArray", source: "members", labelField: "name", full: true, required: true },
      { key: "projectIds", label: "关联项目", type: "relationArray", source: "projects", labelField: "name", full: true },
      { key: "keywords", label: "关键词", type: "stringArray", full: true, required: true },
      { key: "progress", label: "当前进展", type: "textarea", full: true, required: true },
      { key: "nextSteps", label: "下一步计划", type: "stringArray", full: true, required: true },
      { key: "updatedAt", label: "更新时间", type: "date", required: true }
    ]
  },
  {
    key: "achievements",
    title: "成果",
    subtitle: "维护论文、专利、文章、Demo 与报告等成果",
    itemTitle: (item) => item.title || item.id || "未命名成果",
    itemSummary: (item) => `${optionMaps.achievementType[item.type] ?? "未设类型"} · ${item.date || "未设日期"}`,
    createItem: () => ({
      id: `achv-${Date.now()}`,
      title: "",
      type: "paper",
      summary: "",
      authors: [],
      memberIds: [],
      projectIds: [],
      date: today(),
      tags: [],
      url: ""
    }),
    fields: [
      { key: "id", label: "成果 ID", type: "text", required: true, rule: slugRule },
      { key: "title", label: "成果标题", type: "text", full: true, required: true },
      { key: "type", label: "成果类型", type: "select", options: optionMaps.achievementType, required: true },
      { key: "date", label: "日期", type: "date", required: true },
      { key: "summary", label: "成果摘要", type: "textarea", full: true, required: true },
      { key: "authors", label: "作者", type: "stringArray", full: true, required: true },
      { key: "memberIds", label: "关联成员", type: "relationArray", source: "members", labelField: "name", full: true, required: true },
      { key: "projectIds", label: "关联项目", type: "relationArray", source: "projects", labelField: "name", full: true },
      { key: "tags", label: "标签", type: "stringArray", full: true, required: true },
      { key: "url", label: "成果链接", type: "url", full: true }
    ]
  },
  {
    key: "news",
    title: "动态",
    subtitle: "新增新闻动态，桌面端会自动写入 Markdown 文件",
    itemTitle: (item) => item.title || item.slug || "未命名动态",
    itemSummary: (item) => `${item.date || "未设日期"} · ${item.author || "未设作者"}`,
    createItem: () => ({
      slug: `news-${Date.now()}`,
      title: "",
      date: today(),
      author: "AD3R Lab",
      summary: "",
      tags: [],
      body: ""
    }),
    fields: [
      { key: "slug", label: "文件名 / slug", type: "text", required: true, rule: slugRule },
      { key: "title", label: "标题", type: "text", full: true, required: true },
      { key: "date", label: "日期", type: "date", required: true },
      { key: "author", label: "作者", type: "text", required: true },
      { key: "summary", label: "摘要", type: "textarea", full: true, required: true },
      { key: "tags", label: "标签", type: "stringArray", full: true, required: true },
      { key: "body", label: "正文", type: "textarea", full: true, required: true }
    ]
  },
  {
    key: "changelog",
    title: "更新日志",
    subtitle: "新增版本记录，桌面端会自动写入 changelog Markdown",
    itemTitle: (item) => item.version || item.slug || "未命名日志",
    itemSummary: (item) => `${optionMaps.changelogType[item.type] ?? "未设类型"} · ${item.date || "未设日期"}`,
    createItem: () => ({
      slug: `changelog-${Date.now()}`,
      version: "",
      date: today(),
      type: "added",
      project: "",
      summary: "",
      body: ""
    }),
    fields: [
      { key: "slug", label: "文件名 / slug", type: "text", required: true, rule: slugRule },
      { key: "version", label: "版本号", type: "text", required: true },
      { key: "date", label: "日期", type: "date", required: true },
      { key: "type", label: "类型", type: "select", options: optionMaps.changelogType, required: true },
      { key: "project", label: "关联项目", type: "text" },
      { key: "summary", label: "摘要", type: "textarea", full: true, required: true },
      { key: "body", label: "正文", type: "textarea", full: true, required: true }
    ]
  }
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getSectionDef(sectionKey = state.currentSection) {
  return sectionDefs.find((section) => section.key === sectionKey);
}

function getSectionData(sectionKey = state.currentSection) {
  return state.workspace?.[sectionKey];
}

function getCurrentItem() {
  const section = getSectionDef();
  if (!section || section.singleton) {
    return getSectionData();
  }

  const items = getSectionData() ?? [];
  if (items.length === 0 || state.selectedIndex === null || state.selectedIndex < 0) {
    return null;
  }

  return items[state.selectedIndex] ?? null;
}

function setStatus(message, tone = "") {
  state.statusText = message;
  state.statusTone = tone;
  render();
}

function normalizeStringArray(value) {
  return String(value ?? "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getByPath(target, path) {
  const parts = path.split(".").filter(Boolean);
  let current = target;

  for (const rawPart of parts) {
    const part = /^\d+$/.test(rawPart) ? Number(rawPart) : rawPart;
    current = current?.[part];
  }

  return current;
}

function setByPath(target, path, value) {
  const parts = path.split(".").filter(Boolean);
  let current = target;

  for (let index = 0; index < parts.length - 1; index += 1) {
    const rawPart = parts[index];
    const nextPart = parts[index + 1];
    const key = /^\d+$/.test(rawPart) ? Number(rawPart) : rawPart;

    if (current[key] === undefined) {
      current[key] = /^\d+$/.test(nextPart) ? [] : {};
    }

    current = current[key];
  }

  const rawLastPart = parts.at(-1);
  const lastKey = /^\d+$/.test(rawLastPart) ? Number(rawLastPart) : rawLastPart;
  current[lastKey] = value;
}

function buildSelectOptions(options, currentValue) {
  return Object.entries(options)
    .map(([value, label]) => `<option value="${escapeHtml(value)}"${value === currentValue ? " selected" : ""}>${escapeHtml(label)}</option>`)
    .join("");
}

function buildRelationOptions(field) {
  const collection = getSectionData(field.source) ?? [];
  return collection.map((item) => ({
    value: item.id,
    label: item[field.labelField] || item.id
  }));
}

function isEmptyValue(field, value) {
  if (field.type === "stringArray" || field.type === "relationArray" || field.type === "objectArray") {
    return !Array.isArray(value) || value.length === 0;
  }

  return value === undefined || value === null || String(value).trim() === "";
}

function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function addValidationError(errors, path, message) {
  errors.push({ path, message });
}

function validateField(field, value, item, fieldPath, errors) {
  if (field.required && isEmptyValue(field, value)) {
    addValidationError(errors, fieldPath, `${field.label}不能为空。`);
    return;
  }

  if (isEmptyValue(field, value)) {
    return;
  }

  if (field.type === "url" && !isValidUrl(String(value).trim())) {
    addValidationError(errors, fieldPath, `${field.label}不是有效的 URL。`);
  }

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) {
    addValidationError(errors, fieldPath, `${field.label}格式不正确。`);
  }

  if (field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(String(value).trim())) {
    addValidationError(errors, fieldPath, `${field.label}需要使用 YYYY-MM-DD 格式。`);
  }

  if (field.rule && !field.rule.pattern.test(String(value).trim())) {
    addValidationError(errors, fieldPath, `${field.label}${field.rule.message}`);
  }

  if (field.type === "objectArray") {
    const list = Array.isArray(value) ? value : [];
    list.forEach((_entry, index) => {
      field.fields.forEach((subField) => {
        const subPath = `${fieldPath}.${index}.${subField.key}`;
        validateField(subField, getByPath(item, subPath), item, subPath, errors);
      });
    });
  }
}

function buildCurrentValidation() {
  const section = getSectionDef();
  const item = getCurrentItem();
  if (!section || !item) {
    return { errors: [], byPath: {} };
  }

  const errors = [];
  section.fields.forEach((field) => {
    validateField(field, getByPath(item, field.key), item, field.key, errors);
  });

  return {
    errors,
    byPath: Object.fromEntries(errors.map((error) => [error.path, error.message]))
  };
}

function validateSectionData(sectionKey) {
  const section = getSectionDef(sectionKey);
  const data = getSectionData(sectionKey);
  const issues = [];

  if (!section) {
    return { count: 0, issues, bySection: [] };
  }

  if (section.singleton) {
    const errors = [];
    section.fields.forEach((field) => {
      validateField(field, getByPath(data, field.key), data, field.key, errors);
    });

    return {
      count: errors.length,
      issues: errors.map((error) => ({
        sectionTitle: section.title,
        itemTitle: section.title,
        path: error.path,
        message: error.message
      }))
    };
  }

  const items = data ?? [];
  items.forEach((item, index) => {
    const itemErrors = [];
    section.fields.forEach((field) => {
      validateField(field, getByPath(item, field.key), item, field.key, itemErrors);
    });

    issues.push(
      ...itemErrors.map((error) => ({
        sectionTitle: section.title,
        itemTitle: section.itemTitle(item) || `${section.title} ${index + 1}`,
        path: error.path,
        message: error.message
      }))
    );
  });

  return { count: issues.length, issues };
}

function validateAllSections() {
  const reports = sectionDefs.map((section) => ({
    key: section.key,
    title: section.title,
    ...validateSectionData(section.key)
  }));

  return {
    reports,
    count: reports.reduce((sum, report) => sum + report.count, 0)
  };
}

function findSectionField(section, path) {
  const firstKey = path.split(".")[0];
  return section.fields.find((field) => field.key === firstKey);
}

function getMediaKindFromValue(value) {
  const lower = String(value ?? "").toLowerCase();
  return /\.(mp4|mov|avi|mkv|webm|m4v)$/.test(lower) ? "video" : "image";
}

function ensurePreviewUrl(sitePath) {
  if (!sitePath || state.mediaPreviewUrls[sitePath] || state.mediaPreviewLoading.has(sitePath)) {
    return;
  }

  state.mediaPreviewLoading.add(sitePath);
  window.contentUpdater
    .resolvePreviewUrl(sitePath)
    .then((url) => {
      state.mediaPreviewUrls[sitePath] = url;
      state.mediaPreviewLoading.delete(sitePath);
      render();
    })
    .catch(() => {
      state.mediaPreviewLoading.delete(sitePath);
    });
}

function renderMediaPreview(value) {
  if (!value) {
    return "";
  }

  ensurePreviewUrl(value);
  const url = state.mediaPreviewUrls[value];

  if (!url) {
    return `<div class="media-placeholder">正在生成预览...</div>`;
  }

  if (getMediaKindFromValue(value) === "video") {
    return `
      <div class="media-preview-frame">
        <video class="media-preview" src="${escapeHtml(url)}" controls muted preload="metadata"></video>
      </div>
    `;
  }

  return `
    <div class="media-preview-frame">
      <img class="media-preview" src="${escapeHtml(url)}" alt="素材预览" />
    </div>
  `;
}

function renderField(field, item, validation, parentPath = "") {
  const fieldPath = parentPath ? `${parentPath}.${field.key}` : field.key;
  const value = getByPath(item, fieldPath);
  const fieldClass = `${field.full ? "field full" : "field"} ${validation.byPath[fieldPath] ? "invalid" : ""}`.trim();
  const label = `
    <label for="${escapeHtml(fieldPath)}">
      ${escapeHtml(field.label)}
      ${field.required ? '<span class="required-mark">*</span>' : ""}
    </label>
  `;
  const errorMessage = validation.byPath[fieldPath] ? `<div class="field-error">${escapeHtml(validation.byPath[fieldPath])}</div>` : "";

  if (field.type === "textarea") {
    return `
      <div class="${fieldClass}">
        ${label}
        <textarea id="${escapeHtml(fieldPath)}" data-path="${escapeHtml(fieldPath)}" data-type="textarea">${escapeHtml(value ?? "")}</textarea>
        ${errorMessage}
      </div>
    `;
  }

  if (["text", "url", "date", "email"].includes(field.type)) {
    const inputType = field.type === "text" ? "text" : field.type;
    return `
      <div class="${fieldClass}">
        ${label}
        <input id="${escapeHtml(fieldPath)}" type="${inputType}" value="${escapeHtml(value ?? "")}" data-path="${escapeHtml(fieldPath)}" data-type="${field.type}" />
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "select") {
    return `
      <div class="${fieldClass}">
        ${label}
        <select id="${escapeHtml(fieldPath)}" data-path="${escapeHtml(fieldPath)}" data-type="select">
          ${buildSelectOptions(field.options, value)}
        </select>
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "stringArray") {
    return `
      <div class="${fieldClass}">
        ${label}
        <textarea id="${escapeHtml(fieldPath)}" data-path="${escapeHtml(fieldPath)}" data-type="string-array">${escapeHtml((value ?? []).join("\n"))}</textarea>
        <div class="field-hint">每行一项，也支持用逗号分隔。</div>
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "relationSingle") {
    const options = buildRelationOptions(field);
    return `
      <div class="${fieldClass}">
        ${label}
        <select id="${escapeHtml(fieldPath)}" data-path="${escapeHtml(fieldPath)}" data-type="relation-single">
          <option value="">未选择</option>
          ${options
            .map(
              (option) =>
                `<option value="${escapeHtml(option.value)}"${option.value === value ? " selected" : ""}>${escapeHtml(option.label)}</option>`
            )
            .join("")}
        </select>
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "relationArray") {
    const selectedValues = new Set(value ?? []);
    const options = buildRelationOptions(field);
    return `
      <div class="${fieldClass}">
        ${label}
        <div class="checkbox-grid" data-checkbox-group="${escapeHtml(fieldPath)}">
          ${options
            .map(
              (option) => `
                <label class="checkbox-item">
                  <input
                    type="checkbox"
                    value="${escapeHtml(option.value)}"
                    data-path="${escapeHtml(fieldPath)}"
                    data-type="relation-array"
                    ${selectedValues.has(option.value) ? "checked" : ""}
                  />
                  <span>${escapeHtml(option.label)}</span>
                </label>
              `
            )
            .join("")}
        </div>
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "media") {
    return `
      <div class="${fieldClass}">
        ${label}
        <div class="dropzone" data-dropzone-path="${escapeHtml(fieldPath)}" data-target-folder="${escapeHtml(field.targetFolder)}">
          <div class="dropzone-path">${value ? escapeHtml(value) : "拖拽文件到这里，或点击下方按钮导入"}</div>
          ${renderMediaPreview(value)}
          <div class="dropzone-actions">
            <button class="button" type="button" data-action="import-media" data-path="${escapeHtml(fieldPath)}" data-target-folder="${escapeHtml(field.targetFolder)}">导入素材</button>
            ${value ? `<button class="ghost-button" type="button" data-action="open-media" data-path="${escapeHtml(fieldPath)}">打开所在目录</button>` : ""}
          </div>
        </div>
        ${errorMessage}
      </div>
    `;
  }

  if (field.type === "objectArray") {
    const entries = value ?? [];
    return `
      <div class="${fieldClass}">
        ${label}
        <div class="object-array">
          ${entries
            .map((entry, index) => {
              const objectPath = `${fieldPath}.${index}`;
              const titleKey = field.itemTitle || "title";
              const cardTitle = entry?.[titleKey] || `${field.label} ${index + 1}`;
              return `
                <section class="object-card">
                  <header>
                    <strong>${escapeHtml(cardTitle)}</strong>
                    <button class="danger-button" type="button" data-action="remove-object-item" data-path="${escapeHtml(fieldPath)}" data-index="${index}">
                      删除
                    </button>
                  </header>
                  <div class="form-grid">
                    ${field.fields.map((subField) => renderField(subField, item, validation, objectPath)).join("")}
                  </div>
                </section>
              `;
            })
            .join("")}
          <button class="ghost-button" type="button" data-action="add-object-item" data-path="${escapeHtml(fieldPath)}">新增${escapeHtml(field.label)}</button>
        </div>
        ${errorMessage}
      </div>
    `;
  }

  return "";
}

function renderSidebar() {
  return `
    <aside class="sidebar">
      <section class="brand-card">
        <p class="brand-eyebrow">AD3R Updater</p>
        <h1 class="brand-title">本地内容更新器</h1>
        <p class="brand-desc">直接维护站点真实数据文件，并接入预览、校验与发布流程。</p>
      </section>

      <nav class="section-nav">
        ${sectionDefs
          .map(
            (section) => `
              <button class="section-button ${section.key === state.currentSection ? "active" : ""}" data-action="switch-section" data-section="${section.key}">
                <strong>${escapeHtml(section.title)}</strong>
                <span>${escapeHtml(section.subtitle)}</span>
              </button>
            `
          )
          .join("")}
      </nav>

      <section class="status-card">
        <div class="status-pill ${escapeHtml(state.statusTone)}">${escapeHtml(state.statusText)}</div>
        <div class="sidebar-actions">
          <button class="button" type="button" data-action="save-section">保存当前模块</button>
          <button class="ghost-button" type="button" data-action="save-all">全部保存</button>
          <button class="ghost-button" type="button" data-action="reload">重新读取文件</button>
        </div>
      </section>
    </aside>
  `;
}

function renderListPanel() {
  const section = getSectionDef();
  const data = getSectionData();

  if (section.singleton) {
    return `
      <section class="list-panel">
        <div class="hero-card">
          <p class="panel-eyebrow">Overview</p>
          <h2 class="panel-title">${escapeHtml(section.title)}</h2>
          <p class="panel-desc">${escapeHtml(section.subtitle)}</p>
          <div class="badge-row">
            <span class="badge">直接写回 src/data/site.ts</span>
            <span class="badge">支持保存前校验</span>
            <span class="badge">适合维护首页、关于页和导航</span>
          </div>
        </div>
      </section>
    `;
  }

  const items = data ?? [];

  return `
    <section class="list-panel">
      <div class="panel-header">
        <div>
          <p class="panel-eyebrow">${escapeHtml(section.title)}</p>
          <h2 class="panel-title">${items.length} 条</h2>
          <p class="panel-desc">${escapeHtml(section.subtitle)}</p>
        </div>
        <div class="actions">
          <button class="button" type="button" data-action="add-item">新增</button>
        </div>
      </div>
      ${
        items.length === 0
          ? `
            <section class="empty-card">
              <h2>当前还没有内容</h2>
              <p>点击右上角“新增”，就可以从这个模块开始维护。</p>
            </section>
          `
          : `
            <div class="item-list">
              ${items
                .map((item, index) => {
                  const report = validateSectionData(section.key);
                  const itemTitle = section.itemTitle(item);
                  const itemErrorCount = report.issues.filter((issue) => issue.itemTitle === itemTitle).length;

                  return `
                    <button class="list-item ${index === state.selectedIndex ? "active" : ""}" type="button" data-action="select-item" data-index="${index}">
                      <div class="list-item-top">
                        <h3>${escapeHtml(itemTitle)}</h3>
                        ${itemErrorCount > 0 ? `<span class="mini-badge danger">${itemErrorCount} 个问题</span>` : ""}
                      </div>
                      <p>${escapeHtml(section.itemSummary(item))}</p>
                    </button>
                  `;
                })
                .join("")}
            </div>
          `
      }
    </section>
  `;
}

function renderValidationCard(validation) {
  return `
    <article class="tool-card">
      <div class="tool-card-head">
        <div>
          <p class="panel-eyebrow">Validation</p>
          <h3>当前模块校验</h3>
        </div>
        <span class="status-pill ${validation.errors.length > 0 ? "error" : "success"}">
          ${validation.errors.length > 0 ? `${validation.errors.length} 个问题` : "可保存"}
        </span>
      </div>
      ${
        validation.errors.length > 0
          ? `
            <div class="error-list">
              ${validation.errors
                .slice(0, 6)
                .map((error) => `<div class="error-item">${escapeHtml(error.message)}</div>`)
                .join("")}
            </div>
          `
          : `<p class="panel-desc">当前条目未发现必填缺失或格式问题。</p>`
      }
    </article>
  `;
}

function renderPreviewCard() {
  return `
    <article class="tool-card">
      <div class="tool-card-head">
        <div>
          <p class="panel-eyebrow">Preview</p>
          <h3>网站预览</h3>
        </div>
        <span class="status-pill ${state.preview.running ? "success" : ""}">
          ${state.preview.running ? "已运行" : state.preview.status === "starting" ? "启动中" : "未启动"}
        </span>
      </div>
      <div class="preview-block">
        <div>
          <strong>${escapeHtml(state.preview.url)}</strong>
          <p class="muted">点击后会在浏览器中打开本地预览站点。</p>
        </div>
      </div>
      <div class="tool-actions">
        <button class="button" type="button" data-action="start-preview">${state.preview.running ? "重新检查预览" : "启动预览"}</button>
        <button class="ghost-button" type="button" data-action="open-preview">打开网站</button>
        <button class="ghost-button" type="button" data-action="stop-preview">停止预览</button>
      </div>
      <pre class="log-box">${escapeHtml(trimLog(state.preview.logs, "预览服务尚未输出日志。"))}</pre>
    </article>
  `;
}

function renderPublishCard() {
  return `
    <article class="tool-card tool-card-wide">
      <div class="tool-card-head">
        <div>
          <p class="panel-eyebrow">GitHub</p>
          <h3>发布到 GitHub</h3>
        </div>
        <span class="status-pill ${state.git.hasChanges ? "" : "success"}">
          ${state.git.hasChanges ? `${state.git.files.length} 个改动` : "工作区干净"}
        </span>
      </div>
      <div class="meta-grid">
        <div class="meta-chip"><strong>远端</strong><span>${escapeHtml(state.git.remote || "未检测到 origin")}</span></div>
        <div class="meta-chip"><strong>分支</strong><span>${escapeHtml(state.git.branch || "未检测到分支")}</span></div>
      </div>
      <div class="field full">
        <label for="publish-message">提交说明</label>
        <textarea id="publish-message" data-action-input="commit-message">${escapeHtml(state.git.commitMessage)}</textarea>
      </div>
      <div class="tool-actions">
        <button class="ghost-button" type="button" data-action="refresh-git">刷新状态</button>
        <button class="ghost-button" type="button" data-action="open-actions" ${state.git.actionsUrl ? "" : "disabled"}>打开 Actions</button>
        <button class="button" type="button" data-action="publish-github">构建并发布</button>
      </div>
      <div class="changed-files">
        ${
          state.git.files.length > 0
            ? state.git.files
                .slice(0, 8)
                .map((file) => `<div class="changed-file"><span>${escapeHtml(file.code.trim() || "??")}</span><strong>${escapeHtml(file.path)}</strong></div>`)
                .join("")
            : `<div class="changed-file empty"><strong>当前没有待提交的改动。</strong></div>`
        }
      </div>
      <pre class="log-box">${escapeHtml(trimLog(state.git.logs, "发布日志会显示在这里。"))}</pre>
    </article>
  `;
}

function renderWorkbench(validation) {
  return `
    <section class="workspace-grid">
      ${renderValidationCard(validation)}
      ${renderPreviewCard()}
      ${renderPublishCard()}
    </section>
  `;
}

function renderEditorPanel() {
  const section = getSectionDef();
  const item = getCurrentItem();
  const validation = buildCurrentValidation();

  if (!item) {
    return `
      <section class="editor-panel">
        ${renderWorkbench({ errors: [], byPath: {} })}
        <section class="empty-card">
          <h2>选择一个条目开始编辑</h2>
          <p>左侧选择条目后，这里会显示对应的编辑表单。</p>
        </section>
      </section>
    `;
  }

  const title = section.singleton ? "站点基础信息" : section.itemTitle(item);
  const subtitle = section.singleton ? "修改后保存即可写回 src/data/site.ts。" : section.itemSummary(item);

  return `
    <section class="editor-panel">
      ${renderWorkbench(validation)}
      <section class="editor-card">
        <div class="editor-scroll">
          <header class="editor-header">
            <div>
              <p class="panel-eyebrow">${escapeHtml(section.title)}</p>
              <h2>${escapeHtml(title)}</h2>
              <p class="panel-desc">${escapeHtml(subtitle)}</p>
            </div>
            <div class="editor-actions">
              <button class="button" type="button" data-action="save-section">保存当前模块</button>
              ${section.singleton ? "" : `<button class="danger-button" type="button" data-action="delete-item">删除当前条目</button>`}
            </div>
          </header>

          <div class="form-grid">
            ${section.fields.map((field) => renderField(field, item, validation)).join("")}
          </div>
        </div>
      </section>
    </section>
  `;
}

function render() {
  if (!state.workspace) {
    root.innerHTML = `
      <section class="loading">
        <div class="hero-card">
          <p class="panel-eyebrow">Loading</p>
          <h1>正在加载内容更新器...</h1>
          <p class="panel-desc">首次读取站点数据可能需要几秒钟。</p>
        </div>
      </section>
    `;
    return;
  }

  root.innerHTML = `
    <main class="shell">
      ${renderSidebar()}
      ${renderListPanel()}
      ${renderEditorPanel()}
    </main>
  `;
}

function ensureSelection() {
  const section = getSectionDef();
  if (!section || section.singleton) {
    state.selectedIndex = null;
    return;
  }

  const items = getSectionData() ?? [];
  if (items.length === 0) {
    state.selectedIndex = null;
    return;
  }

  if (state.selectedIndex === null || state.selectedIndex >= items.length) {
    state.selectedIndex = 0;
  }
}

function switchSection(nextSection) {
  state.currentSection = nextSection;
  state.selectedIndex = null;
  ensureSelection();
  render();
}

function addCollectionItem() {
  const section = getSectionDef();
  const items = getSectionData();
  const nextItem = section.createItem();
  items.push(nextItem);
  state.selectedIndex = items.length - 1;
  setStatus(`已新增 ${section.title} 条目，记得保存。`);
}

function removeCollectionItem() {
  const section = getSectionDef();
  const items = getSectionData();

  if (!items || state.selectedIndex === null) {
    return;
  }

  const current = items[state.selectedIndex];
  const confirmed = window.confirm(`确认删除「${section.itemTitle(current)}」吗？`);
  if (!confirmed) {
    return;
  }

  items.splice(state.selectedIndex, 1);
  if (items.length === 0) {
    state.selectedIndex = null;
  } else if (state.selectedIndex >= items.length) {
    state.selectedIndex = items.length - 1;
  }

  setStatus(`已删除 ${section.title} 条目，记得保存。`);
}

function addObjectArrayItem(path) {
  const section = getSectionDef();
  const item = getCurrentItem() ?? getSectionData();
  const field = findSectionField(section, path);
  const list = getByPath(item, path) ?? [];
  list.push(field.createItem());
  setByPath(item, path, list);
  render();
}

function removeObjectArrayItem(path, index) {
  const item = getCurrentItem() ?? getSectionData();
  const list = getByPath(item, path) ?? [];
  list.splice(index, 1);
  setByPath(item, path, list);
  render();
}

function jumpToFirstValidationError(report) {
  const firstIssue = report.reports.find((entry) => entry.count > 0);
  if (!firstIssue) {
    return;
  }

  state.currentSection = firstIssue.key;
  state.selectedIndex = 0;
  ensureSelection();
  render();
}

async function saveSection(sectionKey = state.currentSection) {
  if (state.busy) {
    return false;
  }

  const report = validateSectionData(sectionKey);
  if (report.count > 0) {
    setStatus(`${getSectionDef(sectionKey).title} 还有 ${report.count} 个校验问题，请先修正。`, "error");
    render();
    return false;
  }

  const data = getSectionData(sectionKey);
  state.busy = true;
  setStatus(`正在保存 ${getSectionDef(sectionKey).title}...`);

  try {
    await window.contentUpdater.saveSection(sectionKey, deepClone(data));
    state.busy = false;
    setStatus(`${getSectionDef(sectionKey).title} 已保存。`, "success");
    return true;
  } catch (error) {
    state.busy = false;
    setStatus(error.message || "保存失败。", "error");
    return false;
  }
}

async function saveAllSections() {
  if (state.busy) {
    return false;
  }

  const allReport = validateAllSections();
  if (allReport.count > 0) {
    jumpToFirstValidationError(allReport);
    setStatus(`还有 ${allReport.count} 个校验问题，已跳转到第一个有问题的模块。`, "error");
    return false;
  }

  state.busy = true;
  setStatus("正在保存全部模块...");

  try {
    for (const section of sectionDefs) {
      await window.contentUpdater.saveSection(section.key, deepClone(getSectionData(section.key)));
    }
    state.busy = false;
    setStatus("全部模块已保存。", "success");
    await refreshGitStatus();
    return true;
  } catch (error) {
    state.busy = false;
    setStatus(error.message || "全部保存失败。", "error");
    return false;
  }
}

async function reloadWorkspace() {
  if (state.busy) {
    return;
  }

  state.busy = true;
  setStatus("正在重新读取文件...");

  try {
    state.workspace = await window.contentUpdater.loadWorkspace();
    state.busy = false;
    ensureSelection();
    setStatus("已重新读取当前站点文件。", "success");
    await refreshGitStatus();
  } catch (error) {
    state.busy = false;
    setStatus(error.message || "读取失败。", "error");
  }
}

function handleInputChange(element) {
  if (element.dataset.actionInput === "commit-message") {
    state.git.commitMessage = element.value;
    return;
  }

  const item = getCurrentItem() ?? getSectionData();
  if (!item) {
    return;
  }

  const path = element.dataset.path;
  const type = element.dataset.type;

  if (!path || !type) {
    return;
  }

  if (type === "string-array") {
    setByPath(item, path, normalizeStringArray(element.value));
    return;
  }

  if (type === "relation-array") {
    const checked = [...document.querySelectorAll(`input[data-path="${cssEscape(path)}"][data-type="relation-array"]:checked`)].map(
      (checkbox) => checkbox.value
    );
    setByPath(item, path, checked);
    return;
  }

  setByPath(item, path, element.value);
}

function cssEscape(value) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

async function importMediaIntoPath(path, targetFolder, sourcePath) {
  const item = getCurrentItem() ?? getSectionData();

  if (!item) {
    return;
  }

  try {
    setStatus("正在导入素材...");
    const result = await window.contentUpdater.importMedia({ sourcePath, targetFolder });
    setByPath(item, path, result.sitePath);
    setStatus(`素材已导入到 ${result.sitePath}`, "success");
    ensurePreviewUrl(result.sitePath);
    render();
  } catch (error) {
    setStatus(error.message || "素材导入失败。", "error");
  }
}

async function chooseMedia(path, targetFolder) {
  const sourcePath = await window.contentUpdater.chooseFile();
  if (!sourcePath) {
    return;
  }

  await importMediaIntoPath(path, targetFolder, sourcePath);
}

async function refreshPreviewStatus() {
  try {
    const snapshot = await window.contentUpdater.getPreviewStatus();
    state.preview = { ...state.preview, ...snapshot, loading: false };
    render();
  } catch {
    state.preview.loading = false;
  }
}

async function startPreview(openAfterStart = false) {
  try {
    state.preview.loading = true;
    setStatus("正在启动本地预览站点...");
    const snapshot = await window.contentUpdater.startPreview();
    state.preview = { ...state.preview, ...snapshot, loading: false };
    setStatus("本地预览站点已启动。", "success");
    if (openAfterStart) {
      await window.contentUpdater.openExternal(state.preview.url);
    }
  } catch (error) {
    state.preview.loading = false;
    setStatus(error.message || "预览站点启动失败。", "error");
  }
}

async function stopPreview() {
  try {
    const snapshot = await window.contentUpdater.stopPreview();
    state.preview = { ...state.preview, ...snapshot, loading: false };
    setStatus("本地预览站点已停止。");
  } catch (error) {
    setStatus(error.message || "停止预览失败。", "error");
  }
}

async function refreshGitStatus() {
  try {
    state.git.loading = true;
    const [snapshot, actionsUrl] = await Promise.all([
      window.contentUpdater.getGitStatus(),
      window.contentUpdater.getGitHubActionsUrl()
    ]);
    state.git = {
      ...state.git,
      ...snapshot,
      actionsUrl,
      loading: false
    };
    render();
  } catch (error) {
    state.git.loading = false;
    state.git.logs = error.message || "无法读取 Git 状态。";
    render();
  }
}

async function publishToGitHub() {
  if (state.busy) {
    return;
  }

  const saved = await saveAllSections();
  if (!saved) {
    return;
  }

  await refreshGitStatus();

  const confirmed = await window.contentUpdater.confirmPublish({
    branch: state.git.branch,
    remote: state.git.remote,
    files: state.git.files,
    commitMessage: state.git.commitMessage
  });

  if (!confirmed) {
    setStatus("已取消发布。");
    return;
  }

  state.busy = true;
  state.git.loading = true;
  state.git.logs = "正在执行构建、提交和推送...";
  render();

  try {
    const result = await window.contentUpdater.publishToGitHub(state.git.commitMessage);
    state.git.loading = false;
    state.git.logs = result.logs;
    state.busy = false;
    await refreshGitStatus();
    await window.contentUpdater.showPublishResult({
      success: true,
      branch: result.branch,
      remote: result.remote,
      logs: result.logs
    });
    setStatus(result.skipped ? "没有新的改动需要发布。" : `已推送到 GitHub 分支 ${result.branch}。`, "success");
  } catch (error) {
    state.git.loading = false;
    state.git.logs = error.message || "发布失败。";
    state.busy = false;
    await window.contentUpdater.showPublishResult({
      success: false,
      branch: state.git.branch,
      remote: state.git.remote,
      logs: state.git.logs
    });
    setStatus(error.message || "发布失败。", "error");
  }
}

function trimLog(value, fallback) {
  const text = String(value ?? "").trim();
  if (!text) {
    return fallback;
  }

  const lines = text.split(/\r?\n/);
  return lines.slice(-14).join("\n");
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) {
    return;
  }

  const action = target.dataset.action;

  if (action === "switch-section") {
    switchSection(target.dataset.section);
    return;
  }

  if (action === "select-item") {
    state.selectedIndex = Number(target.dataset.index);
    render();
    return;
  }

  if (action === "add-item") {
    addCollectionItem();
    return;
  }

  if (action === "delete-item") {
    removeCollectionItem();
    return;
  }

  if (action === "save-section") {
    await saveSection();
    return;
  }

  if (action === "save-all") {
    await saveAllSections();
    return;
  }

  if (action === "reload") {
    await reloadWorkspace();
    return;
  }

  if (action === "add-object-item") {
    addObjectArrayItem(target.dataset.path);
    return;
  }

  if (action === "remove-object-item") {
    removeObjectArrayItem(target.dataset.path, Number(target.dataset.index));
    return;
  }

  if (action === "import-media") {
    await chooseMedia(target.dataset.path, target.dataset.targetFolder);
    return;
  }

  if (action === "open-media") {
    const item = getCurrentItem() ?? getSectionData();
    const sitePath = getByPath(item, target.dataset.path);
    if (sitePath) {
      await window.contentUpdater.openInFolder(sitePath);
    }
    return;
  }

  if (action === "start-preview") {
    await startPreview(false);
    return;
  }

  if (action === "open-preview") {
    if (!state.preview.running) {
      await startPreview(true);
      return;
    }

    await window.contentUpdater.openExternal(state.preview.url);
    return;
  }

  if (action === "stop-preview") {
    await stopPreview();
    return;
  }

  if (action === "refresh-git") {
    await refreshGitStatus();
    setStatus("Git 状态已刷新。", "success");
    return;
  }

  if (action === "open-actions") {
    if (state.git.actionsUrl) {
      await window.contentUpdater.openExternal(state.git.actionsUrl);
    }
    return;
  }

  if (action === "publish-github") {
    await publishToGitHub();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
    return;
  }

  if (!target.dataset.path && !target.dataset.actionInput) {
    return;
  }

  handleInputChange(target);
  render();
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
    return;
  }

  if (!target.dataset.path) {
    return;
  }

  handleInputChange(target);
  render();
});

document.addEventListener("dragover", (event) => {
  const zone = event.target.closest("[data-dropzone-path]");
  if (!zone) {
    return;
  }

  event.preventDefault();
  zone.classList.add("dragover");
});

document.addEventListener("dragleave", (event) => {
  const zone = event.target.closest("[data-dropzone-path]");
  if (!zone) {
    return;
  }

  zone.classList.remove("dragover");
});

document.addEventListener("drop", async (event) => {
  const zone = event.target.closest("[data-dropzone-path]");
  if (!zone) {
    return;
  }

  event.preventDefault();
  zone.classList.remove("dragover");

  const file = event.dataTransfer?.files?.[0];
  const filePath = file?.path;

  if (!filePath) {
    setStatus("没有获取到拖入文件路径。", "error");
    return;
  }

  await importMediaIntoPath(zone.dataset.dropzonePath, zone.dataset.targetFolder, filePath);
});

async function init() {
  render();

  try {
    const [workspace, previewStatus, gitStatus] = await Promise.all([
      window.contentUpdater.loadWorkspace(),
      window.contentUpdater.getPreviewStatus(),
      window.contentUpdater.getGitStatus()
    ]);

    state.workspace = workspace;
    state.preview = { ...state.preview, ...previewStatus };
    state.git = { ...state.git, ...gitStatus };
    ensureSelection();
    setStatus("内容已加载，可以开始编辑。", "success");
    setInterval(refreshPreviewStatus, 4000);
  } catch (error) {
    setStatus(error.message || "初始化失败。", "error");
  }
}

init();
