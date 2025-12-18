import type { IsoDateString } from "../shared/brand.js";
import { nowIso } from "../shared/brand.js";
import { assertSemVer } from "./semver.js";

export interface ProtocolVersion {
  version: string;
  releasedAt: IsoDateString;
  notes?: string;
}

export function createProtocolVersion(input: {
  version: string;
  releasedAt?: IsoDateString;
  notes?: string;
}): ProtocolVersion {
  assertSemVer(input.version);
  return {
    version: input.version,
    releasedAt: input.releasedAt ?? nowIso(),
    notes: input.notes,
  };
}
