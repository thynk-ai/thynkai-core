import type { Validator } from "../interfaces/validator.js";
import type { IntegrityPolicy } from "../interfaces/integrityPolicy.js";
import {
  DefaultIntegrityPolicy,
  assertIntegrity,
} from "../interfaces/integrityPolicy.js";
import type {
  ValidationRequest,
  ValidationResult,
  ValidationRun,
} from "./types.js";
import { ThynkError } from "../shared/errors.js";
import { nowIso } from "../shared/brand.js";
import type { ModelArtifact } from "../models/modelArtifact.js";

export class ValidationRunner {
  constructor(
    private readonly validator: Validator,
    private readonly integrityPolicy: IntegrityPolicy = DefaultIntegrityPolicy
  ) {}

  async run(request: ValidationRequest): Promise<ValidationRun> {
    const result = await this.safeRun(request);
    return { request, result };
  }

  private async safeRun(request: ValidationRequest): Promise<ValidationResult> {
    try {
      const result = await this.validator.run(request);
      const normalized = this.normalizeResult(result);
      this.enforceIntegrityIfConfigured(request, normalized);
      return normalized;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const e = err instanceof ThynkError ? err : undefined;
      return {
        runId: request.runId,
        status: "error",
        evidence: { metrics: {} },
        provenance: {
          validatorId: this.validator.id,
          validatorVersion: this.validator.version,
          executedAt: nowIso(),
        },
        errorCode: e?.code ?? "validator_exception",
        errorMessage: message,
      };
    }
  }

  private normalizeResult(result: ValidationResult): ValidationResult {
    const score = result.score;
    const normalizedScore =
      score === undefined ? undefined : Math.max(0, Math.min(1, score));

    const frozenMetrics = Object.freeze({ ...(result.evidence.metrics ?? {}) });
    const frozenArtifacts = result.evidence.artifacts
      ? Object.freeze([...result.evidence.artifacts])
      : undefined;

    return {
      ...result,
      score: normalizedScore,
      evidence: {
        ...result.evidence,
        metrics: frozenMetrics,
        artifacts: frozenArtifacts,
      },
    };
  }

  private enforceIntegrityIfConfigured(
    request: ValidationRequest,
    result: ValidationResult
  ): void {
    const expected = request.expectedArtifactDigest;
    if (!expected) return;

    const actual = result.evidence.artifacts?.find(
      (a) => a.uri === request.artifactUri
    )?.digest;

    const artifact: ModelArtifact = {
      modelId: request.modelId,
      version: request.modelVersion,
      uri: request.artifactUri,
      digest: expected,
    };

    assertIntegrity(this.integrityPolicy, artifact, actual);
  }
}
