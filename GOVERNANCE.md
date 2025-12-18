# Governance (thynkai-core)

This repository is a protocol contract. Changes that affect semantics must be deliberate.

## Decision scope

Maintainers are responsible for decisions affecting:
- protocol types and invariants
- scoring behavior and defaults
- integrity and provenance requirements
- release/versioning policy

## When a proposal is required

A proposal is required for:
- breaking API changes (major)
- changes to default scoring or aggregation semantics
- changes that alter interpretation of `ValidationResult` fields
- new mandatory fields or tightened invariants
- integrity enforcement changes

Minor refactors and documentation changes do not require a proposal.

## Proposal format

A proposal can be a GitHub issue or PR that includes:
- Title
- Summary
- Rationale
- Specification (what changes in the protocol contract)
- Compatibility (migration notes; SemVer impact)
- Security considerations
- Test plan

## Lifecycle

Proposal states:
- draft -> review -> accepted/rejected/withdrawn

The reference lifecycle model is implemented in `src/governance/proposal.ts`.

## Decision rule

Maintainers evaluate:
- correctness and test coverage
- backwards compatibility and migration cost
- security implications
- clarity for implementers

Accepted proposals must be reflected in:
- tests
- docs (if semantics change)
- `CHANGELOG.md` for the next release
