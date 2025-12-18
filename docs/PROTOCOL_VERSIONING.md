# Protocol versioning

This repo follows SemVer for package releases and maintains internal protocol discipline.

## Patch
- bug fixes
- documentation improvements
- test improvements
- internal refactors with no observable behavior changes

## Minor
- backward-compatible additions (new optional fields, new helpers)
- new scoring policies alongside existing ones (do not change defaults silently)

## Major
- breaking changes to types or invariants
- changes to default scoring semantics
- changes that affect validation result interpretation
