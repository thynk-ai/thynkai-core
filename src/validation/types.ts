import type { Brand, IsoDateString, Sha256Digest } from "../shared/brand.js";
import type { ValidatorId } from "../models/validatorProfile.js";
import type { ModelId } from "../models/modelSpec.js";

export type RunId = Brand<string, "RunId">;
export type BenchmarkId = Brand<string, "BenchmarkId">;

export type ValidationStatus = "pass" | "fail" | "error";

export interface Provenance {
  validatorId: ValidatorId;
  validatorVersion: string;
  executedAt: IsoDateString;
  environment?: Readonly<{
    os?: string;
    runtime?: string;
    notes?: string;
  }>;
}

export interface ValidationRequest {
  runId: RunId;
  modelId: ModelId;
  modelVersion: string;
  artifactUri: string;

  /**
   * Optional expected digest for the artifact. If provided, runner will enforce integrity by
   * comparing it with the digest reported by the validator in evidence.artifacts.
   */
  expectedArtifactDigest?: Sha256Digest;

  benchmarkId: BenchmarkId;
  benchmarkVersion?: string;
  seed?: number;
  timeoutMs?: number;
  metadata?: Readonly<Record<string, unknown>>;
}

export interface ValidationEvidence {
  metrics: Readonly<Record<string, number>>;
  artifacts?: readonly Readonly<{
    name: string;
    uri: string;
    digest?: Sha256Digest;
  }>[];
  notes?: string;
}

export interface ValidationResult {
  runId: RunId;
  status: ValidationStatus;
  score?: number;
  evidence: ValidationEvidence;
  provenance: Provenance;
  errorCode?: string;
  errorMessage?: string;
}

export interface ValidationRun {
  request: ValidationRequest;
  result: ValidationResult;
}
