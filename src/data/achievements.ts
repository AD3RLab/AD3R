export type AchievementType =
  | "paper"
  | "patent"
  | "software"
  | "open-source"
  | "article"
  | "award"
  | "demo"
  | "report";

export type Achievement = {
  id: string;
  title: string;
  type: AchievementType;
  summary: string;
  authors: string[];
  memberIds: string[];
  projectIds?: string[];
  date: string;
  tags: string[];
  url?: string;
};

export const achievements: Achievement[] = [
  {
    id: "achv-001",
    title: "自动驾驶场景 3DGS 重建技术综述",
    type: "paper",
    summary: "总结自动驾驶真实场景下 3DGS 重建在尺度恢复、视角覆盖和大场景表达方面的关键问题。",
    authors: ["柳琦晗", "李艳东"],
    memberIds: ["liu-qihan", "li-yan-dong"],
    projectIds: ["ad3r-scene-engine"],
    date: "2026-03-10",
    tags: ["3DGS", "自动驾驶", "综述"],
    url: "https://example.com/ad3r/3dgs-survey"
  },
  {
    id: "achv-002",
    title: "多模态几何融合尺度恢复报告",
    type: "report",
    summary: "围绕多相机标定、轨迹与深度估计的融合策略，沉淀自动驾驶场景尺度恢复方法。",
    authors: ["高金铭", "柳琦晗"],
    memberIds: ["gao-jin-ming", "liu-qihan"],
    projectIds: ["ad3r-scene-engine"],
    date: "2026-04-02",
    tags: ["尺度恢复", "多模态", "几何融合"],
    url: "https://example.com/ad3r/scale-report"
  },
  {
    id: "achv-003",
    title: "重建场景 UE 接入实践",
    type: "article",
    summary: "分享如何把真实世界重建结果导入 Unreal Engine，并用于演示、回放和仿真准备。",
    authors: ["邵磊", "肖晗"],
    memberIds: ["shao-lei", "xiao-han"],
    projectIds: ["ad3r-scene-bridge"],
    date: "2026-03-26",
    tags: ["UE", "渲染", "资产导出"],
    url: "https://example.com/ad3r/ue-bridge"
  },
  {
    id: "achv-004",
    title: "动态交通参与者分层建模原型",
    type: "software",
    summary: "完成面向车辆、行人和骑行者的动态 actor 分层建模原型，为事件复现提供基础。",
    authors: ["柳琦晗", "孙浩"],
    memberIds: ["liu-qihan", "sun-hao"],
    projectIds: ["ad3r-actor-forge"],
    date: "2026-04-05",
    tags: ["Actor", "动态建模", "事件复现"],
    url: "https://example.com/ad3r/actor-forge"
  },
  {
    id: "achv-005",
    title: "自动驾驶场景回放 Demo",
    type: "demo",
    summary: "通过可交互场景回放展示重建结果在视角观察、局部编辑和演示流程中的可用性。",
    authors: ["李艳东", "邵磊"],
    memberIds: ["li-yan-dong", "shao-lei"],
    projectIds: ["ad3r-scene-bridge"],
    date: "2026-04-16",
    tags: ["Demo", "Replay", "Rendering"],
    url: "https://example.com/ad3r/demo-replay"
  },
  {
    id: "achv-006",
    title: "AIGC 场景补洞与编辑探索笔记",
    type: "article",
    summary: "记录团队在遮挡区域补全、稀疏区域扩展和语义编辑方面的阶段性观察。",
    authors: ["高金铭", "肖晗"],
    memberIds: ["gao-jin-ming", "xiao-han"],
    projectIds: ["ad3r-actor-forge"],
    date: "2026-04-20",
    tags: ["AIGC", "场景补全", "编辑"],
    url: "https://example.com/ad3r/aigc-scene-edit"
  },
  {
    id: "achv-007",
    title: "长距离道路场景 3DGS 重建奖项提名",
    type: "award",
    summary: "表彰团队在长距离自动驾驶道路场景重建与工程表达方面的阶段性成果。",
    authors: ["柳琦晗"],
    memberIds: ["liu-qihan"],
    projectIds: ["ad3r-scene-engine"],
    date: "2025-12-12",
    tags: ["3DGS", "道路场景", "Award"],
    url: "https://example.com/ad3r/award-road-scene"
  },
  {
    id: "achv-008",
    title: "动态 actor 结构化表达专利申请",
    type: "patent",
    summary: "围绕动态交通参与者的分层表示、结构化编辑和场景复现提出专利申请方案。",
    authors: ["李艳东", "高金铭"],
    memberIds: ["li-yan-dong", "gao-jin-ming"],
    projectIds: ["ad3r-actor-forge"],
    date: "2026-04-20",
    tags: ["Patent", "Actor", "Structure"],
    url: "https://example.com/ad3r/patent-actor"
  },
  {
    id: "achv-009",
    title: "场景资产化流程模板",
    type: "software",
    summary: "整理从采集、重建、编辑、渲染到演示输出的统一流程模板，帮助团队形成可复用工作方式。",
    authors: ["孙浩", "肖晗"],
    memberIds: ["sun-hao", "xiao-han"],
    projectIds: ["ad3r-scene-bridge", "ad3r-actor-forge"],
    date: "2026-04-26",
    tags: ["Pipeline", "Asset", "Workflow"],
    url: "https://example.com/ad3r/asset-pipeline"
  },
  {
    id: "achv-010",
    title: "真实世界场景导出与展示周报合集",
    type: "report",
    summary: "整理团队连续多周在场景导出、Web 展示和 UE 接入上的阶段性结论，作为内部资产沉淀。",
    authors: ["邵磊"],
    memberIds: ["shao-lei"],
    projectIds: ["ad3r-scene-bridge"],
    date: "2026-04-12",
    tags: ["Weekly", "UE", "Web"],
    url: "https://example.com/ad3r/weekly-bridge"
  }
];
