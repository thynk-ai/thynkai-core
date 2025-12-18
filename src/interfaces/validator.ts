import type { ValidatorId } from "../models/validatorProfile.js";
import type {
  ValidationRequest,
  ValidationResult,
} from "../validation/types.js";

export interface Validator {
  readonly id: ValidatorId;
  readonly version: string;
  run(request: ValidationRequest): Promise<ValidationResult>;
}
