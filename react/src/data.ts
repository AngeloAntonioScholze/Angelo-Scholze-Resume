export type Seg = string | { gold: string };

export const RESUME_URL = 'assets/angelo-scholze-resume.pdf';
export const EMAIL = 'antonioscholze@gmail.com';

export const nav = [
  { href: '#about', label: './about' },
  { href: '#experience', label: './experience' },
  { href: '#skills', label: './skills' },
  { href: '#contact', label: './contact' },
];

export const hero = {
  name: 'Angelo Scholze',
  role: 'Full Stack Senior Flutter Developer',
  sub: [
    'I am a Senior-Level Software Developer with ',
    { gold: 'seven years' },
    ' of experience, specializing primarily in mobile development using the ',
    { gold: 'Flutter' },
    ' framework, paired with full-stack work in ',
    { gold: 'React' },
    ', ',
    { gold: 'Next.js' },
    ' and ',
    { gold: 'Node.js' },
    '.',
  ] as Seg[],
};

export const stats = [
  { k: 'years_experience', v: '7', gilt: true },
  { k: 'companies', v: '5', gilt: false },
  { k: 'core_stack', v: 'Flutter', gilt: false },
  { k: 'languages', v: 'EN / FR', gilt: false },
];

export const about: Seg[] = [
  'Seven years building mobile-first products in ',
  { gold: 'Flutter' },
  ' — ',
  { gold: 'BloC' },
  ', ',
  { gold: 'GetX' },
  ', ',
  { gold: 'MobX' },
  ', ',
  { gold: 'Provider' },
  ' — paired with full-stack range across ',
  { gold: 'React' },
  ', ',
  { gold: 'Next.js' },
  ' and ',
  { gold: 'Node.js/Express' },
  '. Conversations and documentation entirely in English. Comfortable owning architecture end to end: ',
  { gold: 'REST APIs' },
  ', ',
  { gold: 'MongoDB/PostgreSQL' },
  ', ',
  { gold: 'SOLID' },
  ' principles, ',
  { gold: 'Clean Code' },
  ' and ',
  { gold: 'TDD' },
  ', ',
  { gold: 'Scrum' },
  ' delivery. Also freelancing full-stack work on Fiverr since 2021. English fluent, French basic.',
];

export const experience: { name: string; dates: string; body: Seg[] }[] = [
  {
    name: 'leading-edge-ag-solutions/',
    dates: 'Aug 2025 — current',
    body: [
      'Senior Software Developer, ',
      { gold: 'Flutter' },
      '. From-scratch to market development; complex web delivery using ',
      { gold: 'Flutter' },
      ' for full-stack; built with ',
      { gold: 'MobX' },
      ' and Modular libraries, ',
      { gold: 'SOLID' },
      ' principles and Clean Code.',
    ],
  },
  {
    name: 'ulist/',
    dates: 'Aug 2023 — Aug 2025',
    body: [
      'Senior Software Developer, ',
      { gold: 'Flutter' },
      '. Refactored and implemented the app UI; developed using ',
      { gold: 'MobX' },
      ' and Modular libraries with ',
      { gold: 'SOLID' },
      ' and Clean Code practices.',
    ],
  },
  {
    name: 'meta/',
    dates: 'Mar 2023 — Aug 2023',
    body: [
      'Software Developer, ',
      { gold: 'Flutter' },
      '. Built a data-crawling script and urban-mobility features with ',
      { gold: 'Google Maps' },
      ' and ',
      { gold: 'Waze' },
      ' deep-linking; new ',
      { gold: 'BloC' },
      ' state architecture over ',
      { gold: 'REST APIs' },
      ' and ',
      { gold: 'PostgreSQL' },
      '.',
    ],
  },
  {
    name: 'ibf/',
    dates: 'Aug 2021 — Nov 2021',
    body: [
      'Full Stack Developer. Development in ',
      { gold: 'React' },
      ', ',
      { gold: 'Next.js' },
      ' and ',
      { gold: 'Node.js' },
      ' using ',
      { gold: 'SOLID' },
      ' principles and Clean Code; integration and development of ',
      { gold: 'REST APIs' },
      ' and webhooks.',
    ],
  },
  {
    name: 'wayv-tecnologia/',
    dates: 'Nov 2021 — Feb 2023',
    body: [
      'Software Developer, ',
      { gold: 'Flutter' },
      '. Migrated Flutter 1 to Flutter 3, built new ',
      { gold: 'BloC' },
      '/',
      { gold: 'GetX' },
      ' state architecture, integrated ',
      { gold: 'REST APIs' },
      ' and ',
      { gold: 'MongoDB' },
      ' under Scrum.',
    ],
  },
];

export const skills = [
  'Flutter — 7y',
  'Dart — 7y',
  'Git — 7y',
  'SOLID — 6y',
  'Clean Code — 5y',
  'BloC — 5y',
  'AppStore Admin — 4y',
  'Provider — 3y',
  'GetX — 3y',
  'Firebase — 3y',
  'JavaScript — 2y',
  'MongoDB — 2y',
  'Kotlin — 1y',
  'TDD — 1y',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
];

export const contact = [
  { k: 'email', label: EMAIL, href: `mailto:${EMAIL}` },
  { k: 'phone', label: '+55 41 99676-6899' },
  { k: 'linkedin', label: '/in/angelo-scholze', href: 'https://www.linkedin.com/in/angelo-scholze/', external: true },
  { k: 'github', label: '/AngeloAntonioScholze', href: 'https://github.com/AngeloAntonioScholze', external: true },
];
