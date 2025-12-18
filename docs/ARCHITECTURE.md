# Architecture

`thynkai-core` defines protocol primitives used by registries, validators, and tooling.

## Data flow

1. A model is described by a **ModelSpec** (identity + declared version + owner).
2. A build output is described by a **ModelArtifact** (URI + optional digest).
3. A validator runs a benchmark producing a **ValidationResult** with:
   - status (pass/fail/error)
   - optional score (0..1)
   - evidence (metrics + optional artifact records)
   - provenance (validator id/version + executedAt)

The **ValidationRunner** normalizes outputs and can enforce artifact integrity if an expected digest is provided in the request.

## Key invariants

- Scores are clamped to `[0, 1]` at the boundary.
- Evidence metrics are frozen to prevent mutation after publication.
- Protocol errors use `ThynkError` with structured codes + details.

## Modules

- `src/models/*`: protocol entities
- `src/validation/*`: requests/results and the runner
- `src/rewards/*`: scoring & reward policies
- `src/governance/*`: SemVer + proposals + protocol version tracking
- `src/interfaces/*`: validator/provider/integrity contracts
