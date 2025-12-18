import type { Brand, IsoDateString } from "../shared/brand.js";
import { nowIso } from "../shared/brand.js";

export type ContributorId = Brand<string, "ContributorId">;

export interface Contributor {
  id: ContributorId;
  displayName: string;
  contact?: string;
  joinedAt: IsoDateString;
  reputation: number;
}

export function contributorId(id: string): ContributorId {
  if (!id.trim()) throw new TypeError("invalid_contributor_id");
  return id as ContributorId;
}

export function createContributor(input: {
  id: string;
  displayName: string;
  contact?: string;
  joinedAt?: IsoDateString;
}): Contributor {
  if (!input.displayName.trim()) throw new TypeError("invalid_display_name");
  return {
    id: contributorId(input.id),
    displayName: input.displayName,
    contact: input.contact,
    joinedAt: input.joinedAt ?? nowIso(),
    reputation: 0,
  };
}
