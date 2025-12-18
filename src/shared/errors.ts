export type ErrorCode =
  | "invalid_input"
  | "invalid_state"
  | "integrity_failed"
  | "validator_exception"
  | "semver_invalid"
  | "proposal_invalid_transition";

export class ThynkError extends Error {
  readonly code: ErrorCode;
  readonly details?: Readonly<Record<string, unknown>>;

  constructor(
    code: ErrorCode,
    message?: string,
    details?: Record<string, unknown>
  ) {
    super(message ?? code);
    this.name = "ThynkError";
    this.code = code;
    this.details = details ? Object.freeze({ ...details }) : undefined;
  }
}

export function invariant(
  condition: unknown,
  code: ErrorCode,
  message?: string,
  details?: Record<string, unknown>
): asserts condition {
  if (!condition) throw new ThynkError(code, message, details);
}
