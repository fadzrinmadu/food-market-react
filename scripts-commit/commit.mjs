#!/usr/bin/env node
// Commit dengan tanggal otomatis: lanjut dari tanggal commit terakhir,
// maksimal 5 commit per hari, lalu pindah ke hari berikutnya.
// Jika sudah mencapai hari ini, semua commit tetap di hari ini.
// Pemakaian: node scripts/commit.mjs "feat: pesan commit"
import { execFileSync } from "node:child_process";

const MAX_PER_DAY = 5;
const message = process.argv.slice(2).join(" ").trim();
if (!message) {
  console.error('Pemakaian: node scripts/commit.mjs "pesan commit"');
  process.exit(1);
}

const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const git = (args, opts = {}) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts });

try {
  git(["rev-parse", "--is-inside-work-tree"]);
} catch {
  git(["init", "-b", "main"]);
}

const now = new Date();
const today = ymd(now);

let dates = [];
try {
  dates = git(["log", "--format=%ad", "--date=format-local:%Y-%m-%d"])
    .split("\n").map((s) => s.trim()).filter(Boolean);
} catch {
  dates = [];
}

let target = today;
if (dates.length > 0) {
  const last = dates[0];
  const countLast = dates.filter((d) => d === last).length;
  if (last >= today) {
    target = today;
  } else if (countLast < MAX_PER_DAY) {
    target = last;
  } else {
    const [y, m, d] = last.split("-").map(Number);
    const next = ymd(new Date(y, m - 1, d + 1));
    target = next > today ? today : next;
  }
}

const already = dates.filter((d) => d === target).length;

let when;
if (target === today) {
  when = now;
} else {
  const [y, m, d] = target.split("-").map(Number);
  const hour = Math.min(9 + already * 2, 22);
  const minute = (already * 17 + 7) % 60;
  when = new Date(y, m - 1, d, hour, minute, 0);
}

const offset = -when.getTimezoneOffset();
const sign = offset >= 0 ? "+" : "-";
const abs = Math.abs(offset);
const stamp =
  `${ymd(when)}T${pad(when.getHours())}:${pad(when.getMinutes())}:${pad(when.getSeconds())}` +
  `${sign}${pad(Math.floor(abs / 60))}${pad(abs % 60)}`;

git(["add", "-A"]);
let hasChanges = false;
try {
  git(["diff", "--cached", "--quiet"]);
} catch {
  hasChanges = true;
}
if (!hasChanges) {
  console.log("Tidak ada perubahan untuk di-commit.");
  process.exit(0);
}

execFileSync("git", ["commit", "-m", message], {
  stdio: "inherit",
  env: { ...process.env, GIT_AUTHOR_DATE: stamp, GIT_COMMITTER_DATE: stamp },
});
console.log(`Tanggal commit: ${stamp} (commit ke-${already + 1} pada ${target})`);
