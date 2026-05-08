import type { ShowcaseMedia } from "./media";

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
  showcase?: ShowcaseMedia[];
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
    showcase: [
      {
        id: "liu-qihan-demo-01",
        title: "长距离道路场景重建阶段演示",
        kind: "image",
        src: "/images/showcase/liu-qihan-road-demo.svg",
        summary: "用于展示长距离道路场景的 3DGS 重建效果与观察视角。",
        date: "2026-04-28"
      }
    ],
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
    showcase: [
      {
        id: "li-yandong-demo-01",
        title: "动态 Actor 分层验证截图",
        kind: "image",
        src: "/images/showcase/li-yandong-actor-validate.svg",
        summary: "用于跟踪动态交通参与者分层建模和验证结果。",
        date: "2026-04-18"
      }
    ],
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
    showcase: [
      {
        id: "gao-jin-ming-demo-01",
        title: "多模态尺度恢复分析图",
        kind: "image",
        src: "/images/showcase/gao-jin-ming-scale.svg",
        summary: "展示尺度恢复与几何一致性分析过程中的阶段结论。",
        date: "2026-04-21"
      }
    ],
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
    showcase: [
      {
        id: "sun-hao-demo-01",
        title: "场景资产化流程看板",
        kind: "image",
        src: "/images/showcase/sun-hao-pipeline.svg",
        summary: "展示从采集到重建、编辑、导出和演示的阶段流程结构。",
        date: "2026-04-26"
      }
    ],
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
    showcase: [
      {
        id: "shao-lei-demo-01",
        title: "UE 场景导入演示画面",
        kind: "image",
        src: "/images/showcase/shao-lei-ue-preview.svg",
        summary: "展示重建场景导入 Unreal Engine 后的阶段性效果。",
        date: "2026-04-12"
      }
    ],
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
    showcase: [
      {
        id: "xiao-han-demo-01",
        title: "场景资产表现与编辑示意",
        kind: "image",
        src: "/images/showcase/xiao-han-asset-visual.svg",
        summary: "展示场景资产整理、视觉表现和编辑界面的阶段产出。",
        date: "2026-04-20"
      }
    ],
    projectIds: ["ad3r-scene-bridge", "ad3r-actor-forge"],
    achievementIds: ["achv-003", "achv-006", "achv-009"]
  }
];
