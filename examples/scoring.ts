import { scoreContributionV0 } from "../src/rewards/scoringV0.js";
import { validatorId } from "../src/models/validatorProfile.js";
import { nowIso } from "../src/shared/brand.js";

const results = [
  {
    runId: "run-1" as any,
    status: "pass" as const,
    score: 0.8,
    evidence: { metrics: { a: 1, b: 2, c: 3 } },
    provenance: {
      validatorId: validatorId("v1"),
      validatorVersion: "0.1.0",
      executedAt: nowIso(),
    },
  },
  {
    runId: "run-1" as any,
    status: "pass" as const,
    score: 0.4,
    evidence: { metrics: { a: 1 } },
    provenance: {
      validatorId: validatorId("v2"),
      validatorVersion: "0.1.0",
      executedAt: nowIso(),
    },
  },
];

const report = scoreContributionV0({
  results,
  validatorWeights: { v1: 2, v2: 1 },
});

console.log(report);
