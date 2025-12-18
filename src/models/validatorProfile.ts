import type { Brand, IsoDateString } from "../shared/brand.js";
import { nowIso } from "../shared/brand.js";

export type ValidatorId = Brand<string, "ValidatorId">;

export interface ValidatorProfile {
  id: ValidatorId;
  displayName: string;
  org?: string;
  joinedAt: IsoDateString;
  reliability: number;
}

export function validatorId(id: string): ValidatorId {
  if (!id.trim()) throw new TypeError("invalid_validator_id");
  return id as ValidatorId;
}

export function createValidatorProfile(input: {
  id: string;
  displayName: string;
  org?: string;
  joinedAt?: IsoDateString;
  reliability?: number;
}): ValidatorProfile {
  if (!input.displayName.trim()) throw new TypeError("invalid_display_name");
  const reliability = input.reliability ?? 0.7;
  if (reliability < 0 || reliability > 1)
    throw new TypeError("invalid_reliability");
  return {
    id: validatorId(input.id),
    displayName: input.displayName,
    org: input.org,
    joinedAt: input.joinedAt ?? nowIso(),
    reliability,
  };
}
