# Threat model (high-level)

This document tracks protocol-relevant threats and mitigations.

## Supply chain / artifact tampering
Risk: artifact at `artifactUri` differs from what was declared.
Mitigation: `ValidationRequest.expectedArtifactDigest` + validator-reported digest + IntegrityPolicy enforcement.

## Validator spoofing / low-quality validators
Risk: validators return fabricated results.
Mitigation: provenance fields, validator profiles, and future cross-validation/reputation systems.

## Replay / stale results
Risk: old results reused to claim current performance.
Mitigation: include `executedAt`, benchmark versioning, and future signed result artifacts.

## Metric manipulation
Risk: metrics incomplete or selectively reported.
Mitigation: completeness factor in scoring v0; future richer evidence requirements.
