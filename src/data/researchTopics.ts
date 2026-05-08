export type TopicStatus =
  | "tracking"
  | "researching"
  | "validating"
  | "completed"
  | "paused";

export type TopicPriority = "urgent" | "high" | "medium" | "low";

export type ResearchTopic = {
  id: string;
  title: string;
  status: TopicStatus;
  priority: TopicPriority;
  background: string;
  goals: string[];
  memberIds: string[];
  projectIds?: string[];
  keywords: string[];
  progress: string;
  nextSteps: string[];
  updatedAt: string;
};

export const researchTopics: ResearchTopic[] = [
  {
    id: "topic-long-road-3dgs",
    title: "长距离道路场景 3DGS 表达",
    status: "tracking",
    priority: "high",
    background: "长距离驾驶片段会带来视角跨度大、尺度漂移和渲染稳定性下降等问题，是自动驾驶场景 3DGS 重建中的关键挑战。",
    goals: ["定义长距离道路重建评估方式", "比较不同 LOD 表达策略", "建立首版稳定性测试集"],
    memberIds: ["liu-qihan", "li-yan-dong"],
    projectIds: ["ad3r-scene-engine"],
    keywords: ["3DGS", "长距离场景", "LOD"],
    progress: "已完成若干道路片段的表达方式比对，正在梳理场景长度、视角密度与渲染质量之间的关系。",
    nextSteps: ["补充评测指标", "完成首版实验对照", "输出阶段性报告"],
    updatedAt: "2026-04-24"
  },
  {
    id: "topic-scale-recovery",
    title: "真实尺度恢复与多模态几何融合",
    status: "researching",
    priority: "urgent",
    background: "自动驾驶重建不仅要求视觉连续性，还需要尽可能接近真实尺度，以便用于工程验证和后续仿真。",
    goals: ["融合标定、轨迹和深度信息", "提升远距区域尺度稳定性", "建立可复用尺度恢复流程"],
    memberIds: ["gao-jin-ming", "li-yan-dong"],
    projectIds: ["ad3r-scene-engine"],
    keywords: ["尺度恢复", "多模态", "Geometry"],
    progress: "已经完成多相机标定与深度估计的联合实验，正在比较不同深度先验对几何一致性的影响。",
    nextSteps: ["引入更多真实样本", "分析异常场景", "固化工程流程"],
    updatedAt: "2026-04-21"
  },
  {
    id: "topic-dynamic-actor",
    title: "动静态分离与动态 Actor 建模",
    status: "validating",
    priority: "urgent",
    background: "为了支持事件复现、场景编辑和仿真回放，需要将静态道路环境与动态交通参与者做清晰分层。",
    goals: ["建立 actor 结构定义", "验证关键对象分离效果", "评估编辑链路可用性"],
    memberIds: ["liu-qihan", "xiao-han", "sun-hao"],
    projectIds: ["ad3r-actor-forge"],
    keywords: ["Actor", "分层建模", "Scene Editing"],
    progress: "已完成车辆与行人两类对象的结构化表达验证，正在补充场景编辑和回放接口。",
    nextSteps: ["扩展更多对象类型", "联调导出格式", "设计回放模板"],
    updatedAt: "2026-04-29"
  },
  {
    id: "topic-ue-web-export",
    title: "UE / Web 场景导出与实时渲染",
    status: "completed",
    priority: "medium",
    background: "团队需要验证重建场景是否能够稳定进入 Unreal Engine 和 Web 展示环境，支撑演示和交互。",
    goals: ["验证导出格式", "建立演示链路", "沉淀基础展示模板"],
    memberIds: ["shao-lei", "xiao-han"],
    projectIds: ["ad3r-scene-bridge"],
    keywords: ["UE", "Web", "Rendering"],
    progress: "基础导出流程和轻量展示原型已经完成，当前结论已沉淀到 Scene Bridge 工具链。",
    nextSteps: ["继续优化表现质量", "复用到后续展示项目"],
    updatedAt: "2026-03-28"
  },
  {
    id: "topic-aigc-completion",
    title: "AIGC 场景补洞与语义编辑",
    status: "paused",
    priority: "low",
    background: "生成式补全和语义编辑对真实世界场景资产化很有价值，但现阶段基础重建和导出链路优先级更高。",
    goals: ["评估补洞质量", "验证语义编辑边界"],
    memberIds: ["gao-jin-ming", "xiao-han"],
    projectIds: ["ad3r-actor-forge"],
    keywords: ["AIGC", "补洞", "Semantic Editing"],
    progress: "完成第一轮方案调研后暂缓，待基础场景资产生产流程稳定后再继续投入。",
    nextSteps: ["保留调研结论", "等待基础能力成熟后重启"],
    updatedAt: "2026-02-08"
  }
];
