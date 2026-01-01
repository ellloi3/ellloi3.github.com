// characters.js
// CHARACTERS now include inline SVG strings in `imageSVG` so images don't need to be loaded from files.

const CHARACTERS = [
  {
    id: 'lloyd',
    name: 'Lloyd (Green Ninja)',
    short: 'LL',
    colorClass: 'color-lloyd',
    maxHP: 1400,
    attackMin: 90,
    attackMax: 150,
    specialMultiplier: 2.5,
    specialRequired: 6,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#a7f3d0"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#34d399" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#a7f3d0" font-weight="700" text-anchor="middle">LL</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Lloyd</text>
  </g>
</svg>`
  },
  {
    id: 'kai',
    name: 'Kai (Fire Ninja)',
    short: 'KA',
    colorClass: 'color-kai',
    maxHP: 1300,
    attackMin: 95,
    attackMax: 160,
    specialMultiplier: 2.2,
    specialRequired: 5,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#fecaca"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#f97316" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#fecaca" font-weight="700" text-anchor="middle">KA</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Kai</text>
  </g>
</svg>`
  },
  {
    id: 'jay',
    name: 'Jay (Lightning Ninja)',
    short: 'JA',
    colorClass: 'color-jay',
    maxHP: 1250,
    attackMin: 90,
    attackMax: 155,
    specialMultiplier: 2.3,
    specialRequired: 4,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#bfdbfe"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#3b82f6" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#bfdbfe" font-weight="700" text-anchor="middle">JA</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Jay</text>
  </g>
</svg>`
  },
  {
    id: 'cole',
    name: 'Cole (Earth Ninja)',
    short: 'CO',
    colorClass: 'color-cole',
    maxHP: 1400,
    attackMin: 85,
    attackMax: 145,
    specialMultiplier: 2.6,
    specialRequired: 7,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#fef3c7"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#f59e0b" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#fef3c7" font-weight="700" text-anchor="middle">CO</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Cole</text>
  </g>
</svg>`
  },
  {
    id: 'zane',
    name: 'Zane (Ice / Tech Ninja)',
    short: 'ZA',
    colorClass: 'color-zane',
    maxHP: 1200,
    attackMin: 100,
    attackMax: 170,
    specialMultiplier: 2.0,
    specialRequired: 5,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#e6f0ff"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#93c5fd" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#e6f0ff" font-weight="700" text-anchor="middle">ZA</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Zane</text>
  </g>
</svg>`
  },
  {
    id: 'nya',
    name: 'Nya (Water Ninja)',
    short: 'NY',
    colorClass: 'color-nya',
    maxHP: 1150,
    attackMin: 90,
    attackMax: 150,
    specialMultiplier: 2.4,
    specialRequired: 4,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#fde68a"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#f59e0b" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#fde68a" font-weight="700" text-anchor="middle">NY</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Nya</text>
  </g>
</svg>`
  },
  {
    id: 'wu',
    name: 'Sensei Wu',
    short: 'WU',
    colorClass: 'color-wu',
    maxHP: 1350,
    attackMin: 80,
    attackMax: 140,
    specialMultiplier: 2.5,
    specialRequired: 6,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#d1fae5"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#34d399" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#d1fae5" font-weight="700" text-anchor="middle">WU</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Sensei Wu</text>
  </g>
</svg>`
  },
  {
    id: 'garmadon',
    name: 'Lord Garmadon',
    short: 'GA',
    colorClass: 'color-garmadon',
    maxHP: 1400,
    attackMin: 110,
    attackMax: 180,
    specialMultiplier: 1.8,
    specialRequired: 9,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#fecaca"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#ef4444" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#fecaca" font-weight="700" text-anchor="middle">GA</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Garmadon</text>
  </g>
</svg>`
  },
  {
    id: 'pythor',
    name: 'Pythor (Serpentine)',
    short: 'PY',
    colorClass: 'color-pythor',
    maxHP: 1000,
    attackMin: 120,
    attackMax: 200,
    specialMultiplier: 1.6,
    specialRequired: 8,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#f3e8ff"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#a78bfa" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#f3e8ff" font-weight="700" text-anchor="middle">PY</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Pythor</text>
  </g>
</svg>`
  },
  {
    id: 'morro',
    name: 'Morro (Ghost)',
    short: 'MO',
    colorClass: 'color-morro',
    maxHP: 1100,
    attackMin: 100,
    attackMax: 170,
    specialMultiplier: 2.1,
    specialRequired: 5,
    imageSVG: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="100%" height="100%" rx="20" fill="#e9d5ff"/>
  <g transform="translate(24,24)">
    <rect x="0" y="60" width="192" height="84" rx="14" fill="#8b5cf6" />
    <circle cx="96" cy="36" r="34" fill="#07203a"/>
    <text x="96" y="44" font-family="Arial,Segoe UI" font-size="36" fill="#e9d5ff" font-weight="700" text-anchor="middle">MO</text>
    <text x="96" y="150" font-family="Arial,Segoe UI" font-size="14" fill="#07203a" text-anchor="middle">Morro</text>
  </g>
</svg>`
  }
];
