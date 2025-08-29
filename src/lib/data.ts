import type { ProfileData, Project, SkillCategory, Achievement } from './types';

export const profileData: ProfileData = {
  name: 'yoneyone',
  title: '学生 / ホビイスト開発者',
  school: '愛知県立愛知総合工科高等学校',
  affiliation: 'STEM研究部',
  email: 'ganondorofu3143@outlook.com',
  github: '@ganondorofu',
  learningPolicy: [
    {
      title: '🎯 実践重視',
      description: '実際に動くプロジェクトで学ぶ方針',
    },
    {
      title: '🔄 自動化',
      description: '開発・デプロイの自動化を進める',
    },
    {
      title: '🤖 AI活用',
      description: '知識のない分野や難しい課題にもAIを使って積極的に挑戦',
    },
  ],
};

export const projectsData: Project[] = [
  {
    title: 'ClassConnect',
    category: 'Web Application',
    description: 'クラスの連絡・課題・時間割管理ツール',
    technologies: ['React', 'TypeScript', 'Firebase', 'Gemini API', 'Tailwind CSS', 'Vercel'],
    status: 'Production',
    url: 'https://class-connect-red.vercel.app/',
    github: 'https://github.com/ganondorofu/ClassConnect',
    image: 'https://picsum.photos/600/400?random=1',
  },
  {
    title: 'CanSat プロジェクト',
    category: 'IoT/Embedded',
    description: '飛行ログ・動画記録システム + BLE探索支援',
    technologies: ['C++', 'Spresense', 'BLE', 'センサー制御'],
    status: 'Completed',
    github: 'https://github.com/ganondorofu/stem_rocket_project',
    image: 'https://picsum.photos/600/400?random=2',
  },
  {
    title: '自宅サーバー群',
    category: 'Infrastructure',
    description: 'Proxmoxベースの仮想化インフラストラクチャ',
    technologies: ['Proxmox', 'Linux', 'nginx', 'Grafana', 'Docker', 'Nextcloud'],
    status: 'Active',
    image: 'https://picsum.photos/600/400?random=3',
  },
  {
    title: 'Reminder アプリ',
    category: 'Mobile App',
    description: '持ち物チェック＆通知アプリ',
    technologies: ['Flutter', 'Dart', 'SQLite', 'Local Notifications'],
    status: 'Completed',
    image: 'https://picsum.photos/600/400?random=4',
  },
  {
    title: 'STEM_Bot',
    category: 'Bot Development',
    description: 'Discord用多機能ボット',
    technologies: ['TypeScript', 'Discord.js', 'Node.js'],
    status: 'Active',
    github: 'https://github.com/ganondorofu/stem_Bot',
    image: 'https://picsum.photos/600/400?random=5',
  },
  {
    title: 'portableClipboard',
    category: 'Desktop App',
    description: 'クリップボード管理ツール',
    technologies: ['C#', 'WPF', '.NET'],
    status: 'Completed',
    github: 'https://github.com/ganondorofu/portableClipboard',
    image: 'https://picsum.photos/600/400?random=6',
  },
  {
    title: 'STEM Arcade',
    category: 'Unity Showcase',
    description: 'Unityで制作した教育向けミニゲーム集の展示サイト',
    technologies: ['Unity', 'C#', 'WebGL', 'GitHub'],
    status: 'Active',
    github: 'https://github.com/ganondorofu/STEM_Arcade',
    image: 'https://picsum.photos/600/400?random=7',
  },
];

export const skillsData: SkillCategory[] = [
  {
    category: '現在取り組んでいること',
    skills: [
      {
        name: 'Webフロントエンド',
        description: 'React/TypeScriptを用いたUI実装とアクセシビリティ改善',
      },
      {
        name: 'バックエンド',
        description: 'Node.jsでのAPI設計・実装・テスト',
      },
      {
        name: 'インフラ',
        description: 'Docker/nginx/Proxmoxによる自宅サーバー環境の構築・運用',
      },
      {
        name: 'ゲーム開発',
        description: 'Unityを用いたプロトタイプ制作（インタラクティブ実験）',
      },
      {
        name: '組み込み',
        description: 'Arduino/Spresenseを使ったソフトウェア開発',
      },
      {
        name: 'DevOps',
        description: 'GitHub ActionsによるCI/CDの自動化とデプロイ運用改善',
      },
      {
        name: '3Dモデリング',
        description: 'Fusion360による設計と3Dプリンターでのプロトタイピング',
      },
    ],
  },
];

export const achievementsData: Achievement[] = [
    {
      category: '競技・コンテスト',
      items: [
        {
          title: '全国高等学校AIアスリート選手権大会シンギュラリティバトルクエスト2024',
          details: 'AQ（二次予選通過）, XQ（決勝出場）, DQ（第2位）',
          date: '2024年',
        },
        {
          title: '未踏ジュニア',
          details: '書類審査通過',
          date: '2024年',
        },
        {
          title: 'U22プログラミングコンテスト',
          details: '参加',
          date: '2024年',
        },
      ],
    },
    {
      category: '資格・学習',
      items: [
        {
          title: 'ITパスポート',
          details: '受験予定',
          date: '2025年9月',
        },
      ],
    },
    {
      category: '技術的成果',
      items: [
        {
          title: 'AI支援フルスタック開発',
          details: 'フロントエンド(React)・バックエンド(Spring Boot)の実装経験、AIツールを補助的に使用した開発フローの導入',
          date: '継続中',
        },
        {
          title: '自宅サーバーインフラ構築',
          details: 'Proxmoxベースの仮想化環境構築・運用、nginx、Grafana、監視システムの導入',
          date: '運用中 (2024年〜)',
        },
        {
          title: 'CanSat技術開発',
          details: 'Spresenseを用いた飛行データ記録・動画記録・位置探索機能の実装',
          date: '完成 (2024年)',
        },
      ],
    },
];
