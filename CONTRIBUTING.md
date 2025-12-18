# Contributing to thynkai-core

This repo is protocol-oriented. We prioritize correctness, clarity, and stable contracts.

## Development

```bash
npm ci
npm run ci
```

## Expectations

- Keep changes small and reviewable.
- Preserve immutability at protocol boundaries (freeze arrays/records).
- Maintain strict TypeScript settings.
- Add tests for new behavior and edge cases.
- Update docs when semantics or invariants change.

## Proposals

Open a proposal (issue or PR) before implementing changes that affect:
- validation result meaning (status, score, provenance, evidence)
- scoring/aggregation rules
- versioning/governance rules
- integrity requirements / security-relevant behavior

See `GOVERNANCE.md`.

## Pull requests

Your PR should include:
- a short summary of the change
- rationale (why)
- tests
- docs updates if behavior changes

## Communication

Use GitHub Issues/PRs for technical discussion.
Follow the Code of Conduct in `CODE_OF_CONDUCT.md`.
