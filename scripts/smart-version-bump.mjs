#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const VERSION_FILES = new Set(["package.json", "package-lock.json"]);
const VALID_BUMPS = new Set(["major", "minor", "patch", "none"]);

const docsOnlyPatterns = [
  /^README\.md$/i,
  /^WHATSNEW\.md$/i,
  /^CODE_OF_CONDUCT\.md$/i,
  /^CONTRIBUTING\.md$/i,
  /^SECURITY\.md$/i,
  /^SUPPORT\.md$/i,
  /^PRIVACY\.md$/i,
  /^LICENSE$/i,
];

const minorPatterns = [
  /^src\/App\.tsx$/,
  /^src\/main\.tsx$/,
  /^components\/.+\.tsx$/,
  /^layout\/.+\.tsx$/,
  /^index\.html$/,
  /^public\/(?!metaData\/)/,
];

const patchPatterns = [
  /^src\/.+\.(css|scss|ts)$/,
  /^components\/.+\.(css|scss)$/,
  /^layout\/.+\.(css|scss)$/,
  /^styles\//,
  /^utils\//,
  /^tests\//,
  /^scripts\//,
  /^\.github\/workflows\//,
  /^public\/metaData\//,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^tsconfig\.json$/,
  /^vite\.config\.ts$/,
];

const runGit = (args, options = {}) =>
  execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });

const getStagedFiles = () =>
  runGit(["diff", "--cached", "--name-only", "--diff-filter=ACMRT", "-z"])
    .split("\0")
    .filter(Boolean);

const readJsonFromGit = (ref) => {
  try {
    return JSON.parse(runGit(["show", ref]));
  } catch {
    return undefined;
  }
};

const parseVersion = (version) => {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version);
  if (!match) {
    throw new Error(`Unsupported semver version: ${version}`);
  }

  return match.slice(1).map(Number);
};

const nextVersion = (version, bump) => {
  const [major, minor, patch] = parseVersion(version);

  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

const matchesAny = (file, patterns) => patterns.some((pattern) => pattern.test(file));
const isDocsOnlyFile = (file) => matchesAny(file, docsOnlyPatterns);

const inferBump = (files) => {
  const nonVersionFiles = files.filter((file) => !VERSION_FILES.has(file));

  if (nonVersionFiles.length === 0) return "none";
  if (nonVersionFiles.every(isDocsOnlyFile)) return "none";
  if (nonVersionFiles.some((file) => matchesAny(file, minorPatterns))) return "minor";
  if (nonVersionFiles.some((file) => matchesAny(file, patchPatterns))) return "patch";

  return "patch";
};

const updateJsonFile = (file, updater) => {
  const json = JSON.parse(readFileSync(file, "utf8"));
  updater(json);
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
};

const updatePackageLockVersion = (version) => {
  if (!existsSync("package-lock.json")) {
    return;
  }

  updateJsonFile("package-lock.json", (json) => {
    json.version = version;
    if (json.packages?.[""]) {
      json.packages[""].version = version;
    }
  });

  runGit(["add", "package-lock.json"], { stdio: "inherit" });
};

const main = () => {
  const override = process.env.SITE_VERSION_BUMP?.toLowerCase();
  if (override && !VALID_BUMPS.has(override)) {
    throw new Error("SITE_VERSION_BUMP must be one of: major, minor, patch, none");
  }

  const files = getStagedFiles();
  if (files.length === 0) {
    console.log("Version bump skipped: no staged files.");
    return;
  }

  const bump = override || inferBump(files);
  if (bump === "none") {
    console.log("Version bump skipped: no release-worthy staged changes.");
    return;
  }

  const headPackageJson = readJsonFromGit("HEAD:package.json");
  const stagedPackageJson = readJsonFromGit(":package.json");
  if (
    headPackageJson?.version &&
    stagedPackageJson?.version &&
    headPackageJson.version !== stagedPackageJson.version
  ) {
    const stagedPackageLockJson = readJsonFromGit(":package-lock.json");
    if (
      existsSync("package-lock.json") &&
      (stagedPackageLockJson?.version !== stagedPackageJson.version ||
        stagedPackageLockJson?.packages?.[""]?.version !== stagedPackageJson.version)
    ) {
      updatePackageLockVersion(stagedPackageJson.version);
    }

    console.log(`Version bump skipped: staged version is already ${stagedPackageJson.version}.`);
    return;
  }

  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  const currentVersion = packageJson.version;
  const newVersion = nextVersion(currentVersion, bump);

  updateJsonFile("package.json", (json) => {
    json.version = newVersion;
  });

  updatePackageLockVersion(newVersion);
  runGit(["add", "package.json"], { stdio: "inherit" });
  console.log(`Version bumped: ${currentVersion} -> ${newVersion} (${bump}).`);
};

try {
  main();
} catch (error) {
  console.error(`Version bump failed: ${error.message}`);
  process.exit(1);
}
