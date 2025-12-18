# @thynkai/core

TypeScript reference implementation of ThynkAI core protocol primitives.

This repository defines stable types and minimal logic used across the ThynkAI ecosystem:
model metadata, artifacts, validators, validation runs, scoring policies, and governance utilities.

## Scope

Includes:
- Protocol types: `ModelSpec`, `ModelArtifact`, `ValidationRequest`, `ValidationResult`
- Interfaces: `Validator`, `ModelProvider`, `IntegrityPolicy`
- Runner: normalization + optional integrity enforcement
- Scoring: explainable aggregation (`scoringV0`)
- Governance helpers: SemVer, protocol versions, proposals

Non-goals:
- Hosting model binaries
- Running benchmarks end-to-end
- Validator orchestration infrastructure
- Product UX / website content

## Stability & compatibility

- Public exports from `src/index.ts` are the API surface.
- Semantics-changing edits require a proposal (see `GOVERNANCE.md`).
- Package releases follow SemVer. Protocol rules are documented in `docs/PROTOCOL_VERSIONING.md`.

## Install

```bash
npm i @thynkai/core
```

## Quickstart

See `examples/` for runnable patterns.

## Contributing

- Contribution guide: `CONTRIBUTING.md`
- Code of Conduct: `CODE_OF_CONDUCT.md`
- Security: `SECURITY.md`
- Governance: `GOVERNANCE.md`
