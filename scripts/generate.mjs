import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateSnakeAnimation } from "generate-snake-animation";

const username = "zhoujinq";
const token = process.env.GITHUB_TOKEN ?? "";
const root = fileURLToPath(new URL("../", import.meta.url));
const modes = ["light", "dark"];

const theme = {
  light: {
    background: "#fffefa",
    card: "#fffefa",
    foreground: "#282522",
    muted: "#756e64",
    border: "#e7e0d5",
    accent: "#c9633c",
    contributionEmpty: "#e9e2d8",
    contributionLevels: ["#edc4ae", "#df9b78", "#d47c53", "#c9633c"],
  },
  dark: {
    background: "#141311",
    card: "#171614",
    foreground: "#f4efe7",
    muted: "#b0a79b",
    border: "#37332d",
    accent: "#e58a62",
    contributionEmpty: "#292622",
    contributionLevels: ["#56372b", "#875039", "#b96846", "#e58a62"],
  },
};

const projects = [
  {
    repo: "customer-commitment-ledger",
    lines: ["把客户资料、方案与承诺串起来，", "打开就知道今天该跟进谁。"],
    meta: "HTML · 销售辅助系统",
  },
  {
    repo: "growing-assistant-skill",
    lines: ["让助手记住事实、偏好与成长，", "而不是每次重新自我介绍。"],
    meta: "SKILL · PERSONAL AI",
  },
  {
    repo: "model-cutline",
    lines: ["AA × AIHOT 六指标对比，", "用 Pareto 前沿看清模型边界。"],
    meta: "HTML · 模型斩杀线",
  },
  {
    repo: "po-wan-juan",
    lines: ["把阅读、记录与感悟整理成分身，", "持续蒸馏自己的判断。"],
    meta: "SKILL · 破万卷",
  },
  {
    repo: "n1-study-dashboard",
    lines: ["51 套真题按考期归档，", "按真实进度推进日语 N1 备考。"],
    meta: "JAVASCRIPT · N1 备考教练",
  },
  {
    repo: "resume-master",
    lines: ["YAML → HTML → PDF 一体化，", "内容与版式双门禁的中文简历。"],
    meta: "PYTHON · 简历工坊 PRO",
  },
];

const languageColors = {
  HTML: "#e34c26",
  CSS: "#663399",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Rust: "#dea584",
  Go: "#00add8",
  Other: "#8b8378",
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const outputPath = (relative) => path.join(root, relative);

async function save(relative, content) {
  const destination = outputPath(relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content, "utf8");
}

function svg(width, height, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(title)}</title>
<desc id="desc">${escapeXml(title)} · zhoujinq GitHub profile</desc>
${body}
</svg>
`;
}

function banner(mode) {
  const t = theme[mode];
  const dots = [];
  for (let y = 18; y <= 212; y += 12) {
    for (let x = 18; x <= 862; x += 12) {
      if (x > 190 && x < 690) continue;
      const noise = (Math.sin(x * 12.9898 + y * 78.233) + 1) / 2;
      const edge = Math.min(x, 880 - x) / 190;
      const opacity = (0.05 + noise * 0.16) * (1.15 - Math.min(edge, 1) * 0.55);
      const color = Math.round(x / 12 + y / 12) % 31 === 0 ? t.accent : t.foreground;
      dots.push(`<rect x="${x}" y="${y}" width="2.5" height="2.5" rx=".4" fill="${color}" opacity="${opacity.toFixed(3)}"/>`);
    }
  }
  const body = `
<defs>
  <linearGradient id="name-${mode}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${t.foreground}"/>
    <stop offset=".5" stop-color="${t.accent}"/>
    <stop offset="1" stop-color="${t.foreground}"/>
  </linearGradient>
</defs>
<rect x=".5" y=".5" width="879" height="229" rx="14" fill="${t.background}" stroke="${t.border}"/>
${dots.join("\n")}
<style>
  .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .sans { font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif; }
  .name { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 45px; font-weight: 750; letter-spacing: 4px; fill: url(#name-${mode}); }
  @media (max-width: 520px) { .name { font-size: 52px; } }
</style>
<text x="28" y="33" class="mono" font-size="12" fill="${t.muted}" letter-spacing="1">$ whoami</text>
<text x="852" y="33" text-anchor="end" class="mono" font-size="11" fill="${t.muted}" letter-spacing="1">SHENZHEN / CN</text>
<rect x="406" y="54" width="68" height="3" rx="1.5" fill="${t.accent}"/>
<text x="440" y="119" text-anchor="middle" class="name">ZHOU JINQUAN</text>
<text x="440" y="153" text-anchor="middle" class="sans" font-size="21" font-weight="600" fill="${t.foreground}" letter-spacing="5">周锦全</text>
<text x="440" y="185" text-anchor="middle" class="mono" font-size="13" fill="${t.muted}" letter-spacing="1.4">AI NATIVE BUILDER / TECHNICAL SALES</text>
<text x="28" y="211" class="mono" font-size="10" fill="${t.muted}" letter-spacing="1">BUILD · LEARN · LIVE</text>
<text x="852" y="211" text-anchor="end" class="mono" font-size="10" fill="${t.muted}" letter-spacing="1">~/ZHOUJINQ</text>`;
  return svg(880, 230, "周锦全 · AI Native Builder / Technical Sales", body);
}

function stack(mode) {
  const t = theme[mode];
  const body = `
<rect x="20" y=".5" width="560" height="39" rx="10" fill="${t.card}" stroke="${t.border}"/>
<rect x="36" y="15" width="8" height="8" rx="2" fill="${t.accent}"/>
<text x="310" y="25" text-anchor="middle" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="12" fill="${t.muted}" letter-spacing=".7">AI AGENTS · HTML / CSS · JAVASCRIPT · PYTHON · GITHUB ACTIONS</text>`;
  return svg(600, 40, "AI Agents · HTML / CSS · JavaScript · Python · GitHub Actions", body);
}

function projectCard(project, index, mode) {
  const t = theme[mode];
  const number = String(index + 1).padStart(2, "0");
  const body = `
<rect x=".5" y=".5" width="399" height="139" rx="12" fill="${t.card}" stroke="${t.border}"/>
<rect x="20" y="19" width="4" height="19" rx="2" fill="${t.accent}"/>
<text x="34" y="35" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="16" font-weight="700" fill="${t.foreground}">${escapeXml(project.repo)}</text>
<text x="378" y="25" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10" fill="${t.muted}">${number} / BUILD</text>
<text x="20" y="67" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif" font-size="13" fill="${t.muted}">${escapeXml(project.lines[0])}</text>
<text x="20" y="88" font-family="PingFang SC, Microsoft YaHei, Noto Sans SC, sans-serif" font-size="13" fill="${t.muted}">${escapeXml(project.lines[1])}</text>
<circle cx="25" cy="117" r="4" fill="${t.accent}"/>
<text x="36" y="121" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" fill="${t.muted}" letter-spacing=".4">${escapeXml(project.meta)}</text>
<text x="378" y="121" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="15" fill="${t.foreground}">↗</text>`;
  return svg(400, 140, project.repo, body);
}

function statsCard(data, mode) {
  const t = theme[mode];
  const metrics = [
    ["Public repositories", data.publicRepos],
    ["Total stars earned", data.stars],
    ["Total forks received", data.forks],
    ["Pull requests opened", data.pullRequests],
    ["Issues opened", data.issues],
  ];
  const rows = metrics
    .map(([label, value], index) => {
      const y = 61 + index * 22;
      return `<rect x="20" y="${y - 8}" width="7" height="7" rx="1.5" fill="${index === 0 ? t.accent : t.border}"/>
<text x="36" y="${y}" font-family="Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="12" fill="${t.muted}">${label}</text>
<text x="444" y="${y}" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="13" font-weight="700" fill="${t.foreground}">${escapeXml(value)}</text>`;
    })
    .join("\n");
  const body = `
<rect x=".5" y=".5" width="466" height="194" rx="12" fill="${t.card}" stroke="${t.border}"/>
<text x="20" y="30" font-family="Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="650" fill="${t.foreground}">GitHub Stats</text>
<text x="444" y="28" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="9.5" fill="${t.muted}" letter-spacing="1">PUBLIC SIGNALS</text>
${rows}
<text x="20" y="181" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="9" fill="${t.muted}" letter-spacing=".6">SYNCED ${data.date} · PUBLIC DATA ONLY</text>`;
  return svg(467, 195, "GitHub Stats · zhoujinq", body);
}

function topLanguagesCard(languages, mode) {
  const t = theme[mode];
  const total = languages.reduce((sum, language) => sum + language.value, 0);
  const bar = [];
  const legends = [];
  if (total > 0) {
    let x = 20;
    bar.push(`<rect x="20" y="47" width="260" height="9" rx="2" fill="${t.border}"/>`);
    languages.forEach((language, index) => {
      const ratio = language.value / total;
      const width = Math.max(1, 260 * ratio);
      bar.push(`<rect x="${x.toFixed(2)}" y="47" width="${Math.max(0, width).toFixed(2)}" height="9" rx="2" fill="${language.color}"/>`);
      x += width;
      const row = Math.floor(index / 2);
      const column = index % 2;
      const lx = 20 + column * 142;
      const ly = 82 + row * 24;
      const percentage = `${(ratio * 100).toFixed(2)}%`;
      legends.push(`<circle cx="${lx + 4}" cy="${ly - 4}" r="4" fill="${language.color}"/>
<text x="${lx + 14}" y="${ly}" font-family="Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="10.5" fill="${t.muted}">${escapeXml(language.name)} ${percentage}</text>`);
    });
  } else {
    legends.push(`<text x="20" y="85" font-family="Segoe UI, sans-serif" font-size="12" fill="${t.muted}">No public language data yet.</text>`);
  }
  const body = `
<rect x=".5" y=".5" width="299" height="194" rx="12" fill="${t.card}" stroke="${t.border}"/>
<text x="20" y="30" font-family="Segoe UI, PingFang SC, Microsoft YaHei, sans-serif" font-size="18" font-weight="650" fill="${t.foreground}">Top Languages</text>
${bar.join("\n")}
${legends.join("\n")}
<text x="20" y="181" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="9" fill="${t.muted}" letter-spacing=".4">BY CODE BYTES · PUBLIC REPOS</text>`;
  return svg(300, 195, "Top Languages · zhoujinq", body);
}

async function fetchJson(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "zhoujinq-profile-generator",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
      if (!response.ok) {
        const detail = await response.text();
        if (response.status >= 500 && attempt < 3) continue;
        throw new Error(`GitHub API ${response.status} for ${url}: ${detail.slice(0, 240)}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === 3 || error.message.startsWith("GitHub API 4")) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
  throw new Error(`Unreachable retry state for ${url}`);
}

async function publicData() {
  const user = await fetchJson(`https://api.github.com/users/${username}`);
  const repos = [];
  for (let page = 1; ; page += 1) {
    const batch = await fetchJson(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}&type=owner&sort=updated`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const originalRepos = repos.filter((repo) => !repo.fork);
  const languageResults = [];
  for (const repo of originalRepos) {
    languageResults.push(repo.languages_url ? await fetchJson(repo.languages_url) : {});
  }
  const totals = {};
  for (const result of languageResults) {
    for (const [language, bytes] of Object.entries(result)) {
      totals[language] = (totals[language] ?? 0) + bytes;
    }
  }
  const languages = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value, color: languageColors[name] ?? languageColors.Other }));
  const [pullRequests, issues] = await Promise.all([
    fetchJson(`https://api.github.com/search/issues?q=${encodeURIComponent(`author:${username} type:pr`)}&per_page=1`),
    fetchJson(`https://api.github.com/search/issues?q=${encodeURIComponent(`author:${username} type:issue`)}&per_page=1`),
  ]);
  return {
    stats: {
      publicRepos: user.public_repos,
      stars: originalRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      forks: originalRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      pullRequests: pullRequests.total_count,
      issues: issues.total_count,
      date: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10),
    },
    languages,
  };
}

function snakeOptions(mode) {
  const t = theme[mode];
  return {
    colorDots: [t.contributionEmpty, ...t.contributionLevels],
    colorEmpty: t.contributionEmpty,
    colorDotBorder: "transparent",
    colorSnake: t.foreground,
    sizeCell: 16,
    sizeDot: 12,
    sizeDotBorderRadius: 2,
  };
}

async function generateSnake() {
  const results = await generateSnakeAnimation(
    { platform: "github", username, githubToken: token || undefined },
    modes.map((mode) => ({
      format: "svg",
      drawOptions: snakeOptions(mode),
      animationOptions: { frameByStep: 1, stepDurationMs: 100 },
    })),
  );
  await Promise.all(
    modes.map(async (mode, index) => {
      const content = String(results[index]);
      const paused = content.replace(
        "<style>",
        "<style>@media (prefers-reduced-motion: reduce){*{animation-play-state:paused!important}}",
      );
      await save(`assets/snake-${mode}.svg`, paused);
    }),
  );
}

console.log("Generating identity, stack and project cards…");
await Promise.all([
  ...modes.map((mode) => save(`assets/banner-${mode}.svg`, banner(mode))),
  ...modes.map((mode) => save(`assets/stack-${mode}.svg`, stack(mode))),
  ...projects.flatMap((project, index) =>
    modes.map((mode) => save(`assets/cards/pin-${project.repo}-${mode}.svg`, projectCard(project, index, mode))),
  ),
]);

console.log("Fetching public GitHub statistics…");
const data = await publicData();
await Promise.all(
  modes.flatMap((mode) => [
    save(`assets/cards/stats-${mode}.svg`, statsCard(data.stats, mode)),
    save(`assets/cards/top-langs-${mode}.svg`, topLanguagesCard(data.languages, mode)),
  ]),
);

console.log("Generating the contribution snake…");
await generateSnake();
console.log(`Done: ${projects.length + 2} card types, two themes, stats and animated snake for @${username}.`);
