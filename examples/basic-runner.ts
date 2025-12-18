import { ValidationRunner } from "../src/validation/runner.js";
import { validatorId } from "../src/models/validatorProfile.js";
import { nowIso, asSha256Digest } from "../src/shared/brand.js";
import type { Validator } from "../src/interfaces/validator.js";
import type { ValidationRequest } from "../src/validation/types.js";

const dummyValidator: Validator = {
  id: validatorId("dummy"),
  version: "0.1.0",
  async run(request: ValidationRequest) {
    return {
      runId: request.runId,
      status: "pass",
      score: 0.9,
      evidence: {
        metrics: { accuracy: 0.9, latency_ms: 120, cost_usd: 0.01 },
        artifacts: [
          {
            name: "model",
            uri: request.artifactUri,
            digest: asSha256Digest(
              "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            ),
          },
        ],
      },
      provenance: {
        validatorId: this.id,
        validatorVersion: this.version,
        executedAt: nowIso(),
      },
    };
  },
};

const runner = new ValidationRunner(dummyValidator);

const request: ValidationRequest = {
  runId: "run-1" as any,
  modelId: "m-1" as any,
  modelVersion: "1.0.0",
  artifactUri: "https://example.com/model.bin",
  expectedArtifactDigest: asSha256Digest(
    "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ),
  benchmarkId: "bench-1" as any,
};

runner.run(request).then(console.log);
