import { ThynkError } from "../shared/errors.js";

export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

const RE =
  /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/;

export function parseSemVer(v: string): SemVer {
  const m = RE.exec(v);
  if (!m) throw new ThynkError("semver_invalid", "invalid_semver", { v });
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: Number(m[3]),
    prerelease: m[4],
    build: m[5],
  };
}

export function assertSemVer(v: string): void {
  parseSemVer(v);
}

/**
 * SemVer precedence (SemVer 2.0.0):
 * - Compare major/minor/patch numerically
 * - A version without prerelease has higher precedence than one with prerelease
 * - Prerelease compare: dot-separated identifiers; numeric vs non-numeric rules
 * - Build metadata is ignored for precedence
 */
export function compareSemVer(a: string, b: string): number {
  const A = parseSemVer(a);
  const B = parseSemVer(b);

  if (A.major !== B.major) return A.major - B.major;
  if (A.minor !== B.minor) return A.minor - B.minor;
  if (A.patch !== B.patch) return A.patch - B.patch;

  const ap = A.prerelease;
  const bp = B.prerelease;

  if (!ap && !bp) return 0;
  if (!ap && bp) return 1;
  if (ap && !bp) return -1;

  return comparePrerelease(ap!, bp!);
}

function comparePrerelease(a: string, b: string): number {
  const A = a.split(".");
  const B = b.split(".");
  const n = Math.max(A.length, B.length);

  for (let i = 0; i < n; i++) {
    const ai = A[i];
    const bi = B[i];

    if (ai === undefined && bi === undefined) return 0;
    if (ai === undefined) return -1;
    if (bi === undefined) return 1;

    const aNum = isNumericIdentifier(ai);
    const bNum = isNumericIdentifier(bi);

    if (aNum && bNum) {
      const an = Number(ai);
      const bn = Number(bi);
      if (an !== bn) return an - bn;
      continue;
    }

    if (aNum && !bNum) return -1;
    if (!aNum && bNum) return 1;

    const cmp = ai.localeCompare(bi);
    if (cmp !== 0) return cmp;
  }

  return 0;
}

function isNumericIdentifier(x: string): boolean {
  return /^\d+$/.test(x);
}
