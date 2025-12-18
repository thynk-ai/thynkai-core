import type { ModelArtifact } from "../models/modelArtifact.js";
import { ThynkError } from "../shared/errors.js";

export interface IntegrityPolicy {
  verify(
    artifact: ModelArtifact,
    actualDigest?: string
  ): { ok: true } | { ok: false; reason: string };
}

export const DefaultIntegrityPolicy: IntegrityPolicy = {
  verify(artifact, actualDigest) {
    const expected = artifact.digest;
    if (!expected || !actualDigest) return { ok: true };
    if (expected === actualDigest) return { ok: true };
    return { ok: false, reason: "digest_mismatch" };
  },
};

export function assertIntegrity(
  policy: IntegrityPolicy,
  artifact: ModelArtifact,
  actualDigest?: string
): void {
  const r = policy.verify(artifact, actualDigest);
  if (!r.ok)
    throw new ThynkError("integrity_failed", r.reason, { uri: artifact.uri });
}
