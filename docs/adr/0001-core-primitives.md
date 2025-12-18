# ADR 0001: Core protocol primitives

## Context
ThynkAI needs a stable contract between model registries, validators, and scoring systems.

## Decision
Keep thynkai-core minimal:
- Strong types
- Clear invariants
- Explainable scoring outputs
- Governance utilities for SemVer + proposals

## Consequences
- Other repos can iterate faster while core remains stable.
- Changes that affect semantics require proposals and careful versioning.
