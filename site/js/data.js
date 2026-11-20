// Project fields
//   id, title, period, client, org, role
//   categories : values from `filters`
//   tech, tasks: string arrays
//   image      : { src, alt, mobileSrc? } optional, mobileSrc is used on mobile widths
//   link       : public URL, optional
window.PORTFOLIO = {
  defaultImage: "site/img/projects/default.svg",
  filters: ["전체", "React", "모바일", "반응형·접근성", "관리 시스템"],

  projects: [
    {
      id: "orange-touch",
      title: "오렌지터치앱 고도화 개선",
      period: "2026.02 ~ 2026.11",
      client: "한화생명금융서비스 디지털솔루션",
      org: "한화생명금융서비스",
      role: "퍼블리싱",
      categories: ["모바일"],
      tech: ["HTML", "CSS/SCSS", "jQuery", "JavaScript", "Bootstrap", "Git/GitLab", "SourceTree"],
      tasks: [
        "FP 기관장용 모바일앱 화면 고도화",
        "SCSS 기반 모바일 화면 퍼블리싱",
        "jQuery/JavaScript 기반 UI 인터랙션 구현",
        "Git/GitLab, SourceTree 기반 형상 관리"
      ],
      image: {
        src: "site/img/projects/orangetouch_mobile.png",
        alt: "오렌지터치 앱의 시작 화면과 메인 화면"
      },
      link: ""
    },
    {
      id: "lg-com",
      title: "LG.COM 운영 및 구축",
      period: "2022.01 ~ 2025.12",
      client: "LG전자",
      org: "LG CNS",
      role: "퍼블리싱",
      categories: ["반응형·접근성"],
      tech: ["HTML/PUG", "CSS/SCSS", "JavaScript", "Bootstrap", "AEM", "Git/GitLab", "SourceTree", "Figma/Axure", "Teams", "Slack"],
      tasks: [
        "LG.COM 반응형 웹 화면 개발 및 운영",
        "웹접근성을 준수한 마크업 구현",
        "PUG 템플릿, SCSS 기반 퍼블리싱",
        "AEM 환경 기반 화면 구축",
        "Figma/Axure 산출물 기반 디자인 협업"
      ],
      image: {
        src: "site/img/projects/lgcom_desktop.png",
        mobileSrc: "site/img/projects/lgcom_mobile.png",
        alt: "LG.COM 영국 사이트 메인 화면"
      },
      link: ""
    },
    {
      id: "hanwha-dashboard",
      title: "클라우드 실시간 모니터링 대시보드",
      period: "2021.03 ~ 2021.12",
      client: "한화시스템",
      org: "한화시스템",
      role: "프론트엔드",
      categories: ["React"],
      tech: ["HTML", "CSS/SCSS", "JavaScript", "Node.js", "React", "ReactHook", "Redux", "Rest-API", "CoreUI-Bootstrap", "Git/GitLab"],
      tasks: [
        "React/ReactHook/Redux 기반 실시간 모니터링 대시보드 개발",
        "Rest-API 연동 데이터 처리 화면 구현",
        "CoreUI-Bootstrap 기반 UI 구성",
        "CSS/SCSS 퍼블리싱"
      ],
      image: null,
      link: ""
    },
    {
      id: "smartfarm",
      title: "친환경 농장물 스마트팜",
      period: "2019.05 ~ 2021.01",
      client: "자사 서비스",
      org: "최앤박㈜",
      role: "퍼블리싱·프론트엔드",
      categories: ["React"],
      tech: ["HTML", "CSS/SCSS", "JavaScript", "Node.js", "React", "ReactHook", "Redux", "Rest-API"],
      tasks: [
        "React 기반 화면 컴포넌트 개발",
        "ReactHook/Redux 기반 상태 관리",
        "Rest-API 연동 화면 구현",
        "컴포넌트 단위 화면 퍼블리싱"
      ],
      image: null,
      link: ""
    },
    {
      id: "perf-mgmt",
      title: "성과관리시스템 리뉴얼",
      period: "2018.10 ~ 2019.03",
      client: "자사 서비스",
      org: "팀소프트",
      role: "퍼블리싱",
      categories: ["관리 시스템"],
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git/GitLab"],
      tasks: [
        "관리자 웹 화면 프로그램 개발",
        "Bootstrap 기반 UI 구성 및 화면 퍼블리싱",
        "Git/GitLab 기반 형상 관리"
      ],
      image: null,
      link: ""
    },
    {
      id: "integrated-mgmt",
      title: "통합관리시스템 화면개발",
      period: "2018.02 ~ 2018.09",
      client: "중소기업진흥청",
      org: "중소기업진흥청",
      role: "퍼블리싱",
      categories: ["관리 시스템"],
      tech: ["HTML5", "CSS3", "Bootstrap", "Git/GitLab"],
      tasks: [
        "업무시스템 화면 웹 표준 리뉴얼",
        "HTML5/CSS3 기반 화면 퍼블리싱",
        "Bootstrap 기반 UI 구성",
        "Git/GitLab 기반 형상 관리"
      ],
      image: null,
      link: ""
    }
  ],

  jobs: [
    { company: "한화생명금융서비스", rank: "과장", period: "2026.02 ~ 2026.11", projectId: "orange-touch" },
    { company: "LG CNS", rank: "선임", period: "2022.01 ~ 2025.12", projectId: "lg-com" },
    { company: "한화시스템", rank: "과장", period: "2021.03 ~ 2021.12", projectId: "hanwha-dashboard" },
    { company: "최앤박㈜", rank: "과장", period: "2019.05 ~ 2021.01", projectId: "smartfarm" },
    { company: "팀소프트", rank: "대리", period: "2018.10 ~ 2019.03", projectId: "perf-mgmt" },
    { company: "중소기업진흥청", rank: "사원", period: "2018.02 ~ 2018.09", projectId: "integrated-mgmt" }
  ]
};
