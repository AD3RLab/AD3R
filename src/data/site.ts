export const siteConfig = {
  name: "AD3R",
  shortName: "AD3R",
  englishName: "Autonomous Driving 3D Reconstruction Lab",
  description:
    "AD3R Lab 是一个面向自动驾驶与具身智能场景的三维重建研发组织，专注于将真实世界采集数据转化为可重建、可编辑、可渲染、可仿真、可评测的高价值 3D 场景资产。",
  github: "",
  gitee: "https://gitee.com/rec-any-thing/ad3-r",
  email: "contact@kotei.com.cn",
  location: "面向自动驾驶真实世界数据的 3D 场景资产化技术团队",
  mission:
    "我们当前的核心研发方向是自动驾驶场景下的 3D Gaussian Splatting 重建，面向 OEM、Tier1 以及智能驾驶研发团队在影子数据利用、稀有场景复现、仿真数据闭环和真实世界资产化方面的需求，构建从车端多模态数据到高保真三维场景资产的技术体系。",
  joinUs:
    "欢迎对自动驾驶三维重建、3DGS、大场景表达、动静态分离、真实尺度恢复、UE 渲染接入和 AIGC 场景编辑感兴趣的工程师与研究者加入，一起建设真实世界数据资产化的长期能力。",
  address: "让每一段真实驾驶数据都可以转化为可复用、可编辑、可仿真的三维世界资产。",
  positioning: "面向自动驾驶真实世界数据的 3D 场景资产化技术团队。",
  vision:
    "让每一段真实驾驶数据都可以转化为可复用、可编辑、可仿真的三维世界资产，并在此基础上服务自动驾驶感知、规控、仿真、测试和数据闭环。",
  audience: [
    "OEM",
    "Tier1",
    "智能驾驶研发团队",
    "自动驾驶仿真与测试团队"
  ],
  capabilities: [
    {
      title: "真实场景重建",
      description:
        "基于车载相机、多视角视频、标定、轨迹和其他可用传感器数据，重建具有真实尺度与空间一致性的驾驶场景。"
    },
    {
      title: "3DGS 大场景表达",
      description:
        "面向城市道路、路口、园区和长距离驾驶片段，探索适用于自动驾驶场景的高质量、可扩展、可渲染 3DGS 表示。"
    },
    {
      title: "动静态分离与结构化",
      description:
        "将静态道路环境与动态车辆、行人、骑行者等交通参与者进行分层建模，为场景编辑、事件复现与仿真回放提供基础。"
    },
    {
      title: "真实尺度恢复",
      description:
        "结合多相机标定、运动轨迹、深度估计、地图或车辆先验，使重建结果从相对几何走向可用于工程验证的真实尺度世界。"
    },
    {
      title: "渲染与仿真接入",
      description:
        "支持将重建场景导入 Unreal Engine、Web 渲染或其他仿真平台，使真实数据能够进入研发、测试和演示流程。"
    },
    {
      title: "AIGC 与语义理解",
      description:
        "探索利用生成式模型、视觉语言模型和 3D 语义理解技术，对遮挡、空洞、稀疏区域进行补全，并提升场景的可检索与可编辑能力。"
    }
  ],
  researchDirections: [
    "自动驾驶场景 3DGS 重建",
    "多相机 / 单前视视频三维重建",
    "长距离道路场景重建与 LOD 表达",
    "动静态目标分离与动态 Actor 建模",
    "真实尺度恢复与多模态几何融合",
    "UE / Web 场景导出与实时渲染",
    "AIGC 场景补洞、扩展与编辑",
    "3D 语义理解与场景资产结构化"
  ],
  nav: [
    { label: "首页", href: "/" },
    { label: "成员", href: "/members/" },
    { label: "项目", href: "/projects/" },
    { label: "成果", href: "/achievements/" },
    { label: "课题", href: "/topics/" },
    { label: "动态", href: "/news/" },
    { label: "更新日志", href: "/changelog/" },
    { label: "关于", href: "/about/" }
  ]
} as const;
