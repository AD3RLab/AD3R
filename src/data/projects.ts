import type { ShowcaseMedia } from "./media";

export type ProjectStatus = "planning" | "active" | "maintenance" | "archived";

export type Project = {
  id: string;
  name: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  version?: string;
  techStack: string[];
  leaderId: string;
  memberIds: string[];
  repoUrl?: string;
  demoUrl?: string;
  cover?: string;
  showcase?: ShowcaseMedia[];
  features: string[];
  roadmap: {
    title: string;
    status: "todo" | "doing" | "done";
    targetDate?: string;
  }[];
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
  achievementIds: string[];
  updatedAt: string;
};

export const projects: Project[] = [
  {
    id: "ad3r-scene-engine",
    name: "AD3R Scene Engine",
    summary: "面向自动驾驶真实世界数据的 3DGS 场景重建引擎，负责从多相机、多模态采集数据生成高保真三维场景资产。",
    description:
      "AD3R Scene Engine 是团队当前的核心研发项目，聚焦自动驾驶场景下的 3D Gaussian Splatting 重建，强调真实尺度恢复、空间一致性、多模态几何融合和大场景可扩展表达。",
    status: "active",
    version: "v0.6.0",
    techStack: ["PyTorch", "3DGS", "CUDA", "SLAM", "Depth Estimation"],
    leaderId: "liu-qihan",
    memberIds: ["liu-qihan", "li-yan-dong", "gao-jin-ming"],
    repoUrl: "https://gitee.com/rec-any-thing/awesome-3dgs-autonomous-driving",
    cover: "/images/projects/ad3r-scene-engine.svg",
    showcase: [
      {
        id: "scene-engine-shot-01",
        title: "道路场景重建预览",
        kind: "image",
        src: "/images/showcase/scene-engine-road-preview.svg",
        summary: "展示自动驾驶道路片段在 3DGS 管线中的阶段性重建效果。",
        date: "2026-04-28"
      },
      {
        id: "scene-engine-shot-02",
        title: "尺度恢复验证画面",
        kind: "image",
        src: "/images/showcase/scene-engine-scale-validate.svg",
        summary: "用于对比尺度恢复与多模态几何对齐之后的视觉结果。",
        date: "2026-04-02"
      }
    ],
    features: [
      "从车端多相机与视频数据构建高保真 3DGS 场景",
      "支持尺度恢复、轨迹约束和多模态几何对齐",
      "针对长距离道路与城市道路场景做大范围表达优化",
      "为后续编辑、渲染、仿真与评测提供统一资产输出"
    ],
    roadmap: [
      { title: "核心重建管线验证", status: "done", targetDate: "2026-02-20" },
      { title: "长距离道路场景稳定性优化", status: "doing", targetDate: "2026-06-15" },
      { title: "多模态几何融合版本", status: "todo", targetDate: "2026-09-01" }
    ],
    updates: [
      {
        date: "2026-04-28",
        title: "完成首批道路场景重建基线",
        content: "打通从原始采集数据到 3DGS 场景输出的最小闭环，具备初步的可视化和质量评估能力。"
      },
      {
        date: "2026-03-16",
        title: "加入深度估计辅助模块",
        content: "在稀疏纹理和远距区域引入深度先验，提升尺度恢复和几何稳定性。"
      }
    ],
    achievementIds: ["achv-001", "achv-002", "achv-007"],
    updatedAt: "2026-04-28"
  },
  {
    id: "ad3r-scene-bridge",
    name: "AD3R Scene Bridge",
    summary: "面向 UE 与 Web 渲染生态的场景导出与展示工具链，让重建结果进入仿真、演示和交互流程。",
    description:
      "AD3R Scene Bridge 负责把重建完成的三维场景资产导入 Unreal Engine、Web 渲染或其他可视化环境，支持展示、回放、交互与后续仿真接入。",
    status: "maintenance",
    version: "v0.3.2",
    techStack: ["Unreal Engine", "WebGL", "TypeScript", "Asset Pipeline"],
    leaderId: "shao-lei",
    memberIds: ["liu-qihan", "sun-hao", "shao-lei", "xiao-han"],
    cover: "/images/projects/ad3r-scene-bridge.svg",
    showcase: [
      {
        id: "scene-bridge-shot-01",
        title: "UE 导入效果截图",
        kind: "image",
        src: "/images/showcase/scene-bridge-ue-shot.svg",
        summary: "展示导入 Unreal Engine 后的场景表现与观察视角。",
        date: "2026-04-12"
      },
      {
        id: "scene-bridge-shot-02",
        title: "Web 轻量展示页面",
        kind: "image",
        src: "/images/showcase/scene-bridge-web-shot.svg",
        summary: "展示 Web 端轻量化预览界面的阶段样式与信息结构。",
        date: "2026-03-08"
      }
    ],
    features: [
      "支持将重建场景导出到 Unreal Engine 和 Web 端",
      "支持演示级场景播放、镜头观察和可视化表达",
      "为技术美术和产品展示提供统一资产接入方式",
      "为后续仿真平台对接保留标准化导出结构"
    ],
    roadmap: [
      { title: "UE 基础导出流程", status: "done", targetDate: "2026-01-30" },
      { title: "Web 轻量展示原型", status: "doing", targetDate: "2026-05-30" },
      { title: "实时编辑能力接入", status: "todo", targetDate: "2026-08-20" }
    ],
    updates: [
      {
        date: "2026-04-12",
        title: "完成 UE 导入格式整理",
        content: "统一场景描述、贴图与表现层结构，为后续演示和回放流程打下基础。"
      },
      {
        date: "2026-03-08",
        title: "新增 Web 展示链路验证",
        content: "在浏览器端完成轻量级场景展示原型，验证远程展示可行性。"
      }
    ],
    achievementIds: ["achv-003", "achv-005", "achv-010"],
    updatedAt: "2026-04-12"
  },
  {
    id: "ad3r-actor-forge",
    name: "AD3R Actor Forge",
    summary: "面向动态交通参与者分离、结构化建模与编辑回放的研发项目，为事件复现和仿真构建基础。",
    description:
      "AD3R Actor Forge 聚焦动静态分离、动态 actor 建模与场景结构化，让车辆、行人、骑行者等交通参与者能够被分层表达、独立编辑和复现。",
    status: "planning",
    version: "v0.2.0-alpha",
    techStack: ["Tracking", "Segmentation", "3D Geometry", "Simulation Pipeline"],
    leaderId: "li-yan-dong",
    memberIds: ["li-yan-dong", "gao-jin-ming", "sun-hao", "xiao-han"],
    cover: "/images/projects/ad3r-actor-forge.svg",
    showcase: [
      {
        id: "actor-forge-shot-01",
        title: "动态 Actor 分层示意",
        kind: "image",
        src: "/images/showcase/actor-forge-layering.svg",
        summary: "展示车辆、行人和骑行者在分层建模中的结构化表达方式。",
        date: "2026-04-18"
      },
      {
        id: "actor-forge-shot-02",
        title: "事件复现流程草图",
        kind: "image",
        src: "/images/showcase/actor-forge-replay.svg",
        summary: "用于说明事件复现、场景编辑与回放链路的关系。",
        date: "2026-04-10"
      }
    ],
    features: [
      "分离静态道路环境与动态交通参与者",
      "支持关键 actor 的结构化资产表示",
      "为事件复现和场景编辑提供基础输入",
      "为后续仿真和语义检索预留结构接口"
    ],
    roadmap: [
      { title: "动态对象分层方案定义", status: "done", targetDate: "2026-02-12" },
      { title: "关键 actor 建模原型", status: "doing", targetDate: "2026-06-30" },
      { title: "编辑回放链路联调", status: "todo", targetDate: "2026-09-10" }
    ],
    updates: [
      {
        date: "2026-04-18",
        title: "完成首版动态 actor 结构定义",
        content: "明确车辆、行人和骑行者等典型对象的分层表达方式，准备进入原型联调。"
      }
    ],
    achievementIds: ["achv-004", "achv-006", "achv-008", "achv-009"],
    updatedAt: "2026-04-18"
  }
];
