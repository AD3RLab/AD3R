export type Member = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  title?: string;
  bio: string;
  researchAreas: string[];
  skills: string[];
  email?: string;
  github?: string;
  gitee?: string;
  homepage?: string;
  projectIds: string[];
  achievementIds: string[];
};

export const members: Member[] = [
  {
    id: "liu-qihan",
    name: "柳琦晗",
    avatar: "/images/members/liu-qihan.svg",
    role: "团队技术 Leader",
    title: "3DGS / 计算机视觉 / 泛 AI",
    bio: "负责团队核心技术方向与研发推进，重点关注 3D Gaussian Splatting、计算机视觉、强化学习及相关泛 AI 技术在自动驾驶场景中的落地。",
    researchAreas: ["3D Gaussian Splatting", "计算机视觉", "强化学习"],
    skills: ["3DGS", "Computer Vision", "Reinforcement Learning", "AI System"],
    email: "liu.qihan@kotei.com.cn",
    projectIds: ["ad3r-scene-engine", "ad3r-scene-bridge"],
    achievementIds: ["achv-001", "achv-004", "achv-007"]
  },
  {
    id: "li-yan-dong",
    name: "李艳东",
    avatar: "/images/members/li-yan-dong.svg",
    role: "研究工程师",
    title: "3D 重建 / SLAM",
    bio: "聚焦自动驾驶场景下的三维重建与 SLAM 问题，关注真实尺度恢复、轨迹一致性与重建流程稳定性。",
    researchAreas: ["3D 重建", "SLAM", "几何一致性"],
    skills: ["SfM", "SLAM", "Calibration", "Geometry"],
    email: "li.yandong@kotei.com.cn",
    projectIds: ["ad3r-scene-engine", "ad3r-actor-forge"],
    achievementIds: ["achv-001", "achv-005", "achv-008"]
  },
  {
    id: "gao-jin-ming",
    name: "高金铭",
    avatar: "/images/members/gao-jin-ming.svg",
    role: "研究工程师",
    title: "深度估计",
    bio: "负责深度估计与多模态几何融合相关工作，重点探索真实尺度恢复和可工程化使用的深度表征。",
    researchAreas: ["深度估计", "多模态融合", "尺度恢复"],
    skills: ["Depth Estimation", "Multi-view", "Fusion", "PyTorch"],
    email: "gao.jinming@kotei.com.cn",
    projectIds: ["ad3r-scene-engine", "ad3r-actor-forge"],
    achievementIds: ["achv-002", "achv-006", "achv-008"]
  },
  {
    id: "sun-hao",
    name: "孙浩",
    avatar: "/images/members/sun-hao.svg",
    role: "产品经理",
    title: "产品规划与需求协同",
    bio: "负责团队产品方向梳理、需求抽象与对外沟通，推动三维场景资产化能力形成可落地的产品表达。",
    researchAreas: ["产品规划", "需求分析", "场景资产化"],
    skills: ["Product Design", "Planning", "Roadmap", "Collaboration"],
    email: "sun.hao@kotei.com.cn",
    projectIds: ["ad3r-scene-bridge", "ad3r-actor-forge"],
    achievementIds: ["achv-004", "achv-009"]
  },
  {
    id: "shao-lei",
    name: "邵磊",
    avatar: "/images/members/shao-lei.svg",
    role: "UE 工程与渲染工程师",
    title: "UE / 实时渲染 / 场景导出",
    bio: "负责 Unreal Engine 场景接入、实时渲染与演示链路，推动重建场景进入仿真、展示和交互流程。",
    researchAreas: ["Unreal Engine", "实时渲染", "场景导出"],
    skills: ["UE", "Rendering", "Shader", "Pipeline"],
    email: "shao.lei@kotei.com.cn",
    projectIds: ["ad3r-scene-bridge"],
    achievementIds: ["achv-003", "achv-005", "achv-010"]
  },
  {
    id: "xiao-han",
    name: "肖晗",
    avatar: "/images/members/xiao-han.svg",
    role: "技术美术",
    title: "场景资产编辑与视觉表现",
    bio: "负责场景资产整理、视觉表现优化和技术美术支持，关注场景可编辑性、可展示性与内容生产协同。",
    researchAreas: ["技术美术", "场景编辑", "资产表现"],
    skills: ["Technical Art", "Scene Editing", "Material", "Visualization"],
    email: "xiao.han@kotei.com.cn",
    projectIds: ["ad3r-scene-bridge", "ad3r-actor-forge"],
    achievementIds: ["achv-003", "achv-006", "achv-009"]
  }
];
