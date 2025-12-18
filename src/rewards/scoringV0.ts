import type { ValidatorId } from "../models/validatorProfile.js";
import type { ValidationResult } from "../validation/types.js";

export type ScoringMethod = "median_weighted_v0";

export interface ScoreDetail {
  validatorId: ValidatorId;
  status: "pass" | "fail" | "error";
  base: number;
  completeness: number;
  weight: number;
  final: number;
}

export interface ScoreReport {
  method: ScoringMethod;
  aggregate: number;
  details: readonly ScoreDetail[];
}

export function scoreContributionV0(input: {
  results: readonly ValidationResult[];
  validatorWeights?: Readonly<Record<string, number>>;
}): ScoreReport {
  const details = input.results.map((r): ScoreDetail => {
    const validatorId = r.provenance.validatorId;
    const weight = clamp01(
      input.validatorWeights?.[validatorId as unknown as string] ?? 1
    );

    if (r.status !== "pass") {
      return {
        validatorId,
        status: r.status,
        base: 0,
        completeness: 0,
        weight,
        final: 0,
      };
    }

    const base = clamp01(r.score ?? 0.5);
    const metricsCount = Object.keys(r.evidence.metrics ?? {}).length;
    const completeness =
      metricsCount >= 3
        ? 1
        : metricsCount === 2
        ? 0.9
        : metricsCount === 1
        ? 0.75
        : 0.5;
    const final = clamp01(base * completeness);

    return { validatorId, status: r.status, base, completeness, weight, final };
  });

  const aggregate = weightedMedian(
    details.map((d) => ({ x: d.final, w: d.weight }))
  );

  return {
    method: "median_weighted_v0",
    aggregate,
    details: Object.freeze(details),
  };
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function weightedMedian(items: { x: number; w: number }[]): number {
  if (items.length === 0) return 0;
  const xs = items
    .filter((i) => i.w > 0)
    .map((i) => ({ x: clamp01(i.x), w: i.w }))
    .sort((a, b) => a.x - b.x);

  const total = xs.reduce((s, i) => s + i.w, 0);
  if (total <= 0) return 0;

  let acc = 0;
  for (const i of xs) {
    acc += i.w;
    if (acc >= total / 2) return i.x;
  }
  return xs[xs.length - 1]!.x;
}
