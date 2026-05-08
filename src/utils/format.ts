export const achievementTypeLabels = {
  paper: "论文",
  patent: "专利",
  software: "软件",
  "open-source": "开源",
  article: "文章",
  award: "奖项",
  demo: "演示",
  report: "报告"
} as const;

export const projectStatusLabels = {
  planning: "规划中",
  active: "进行中",
  maintenance: "维护中",
  archived: "已归档"
} as const;

export const topicStatusLabels = {
  tracking: "追踪中",
  researching: "研究中",
  validating: "验证中",
  completed: "已完成",
  paused: "已暂停"
} as const;

export const roadmapStatusLabels = {
  todo: "待开始",
  doing: "进行中",
  done: "已完成"
} as const;

export const changelogTypeLabels = {
  added: "新增",
  changed: "变更",
  fixed: "修复",
  removed: "移除"
} as const;

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}
