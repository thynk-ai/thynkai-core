import type { Brand, IsoDateString } from "../shared/brand.js";
import { nowIso } from "../shared/brand.js";
import { assertSemVer } from "../governance/semver.js";
import type { ContributorId } from "./contributor.js";

export type ModelId = Brand<string, "ModelId">;
export type ModelModality = "text" | "vision" | "multimodal";

export interface ModelSpec {
  id: ModelId;
  name: string;
  modality: ModelModality;
  description?: string;
  ownerContributorId: ContributorId;
  createdAt: IsoDateString;
  version: string;
  tags?: readonly string[];
}

export function modelId(id: string): ModelId {
  if (!id.trim()) throw new TypeError("invalid_model_id");
  return id as ModelId;
}

export function createModelSpec(
  input: Omit<ModelSpec, "id" | "createdAt"> & {
    id: string;
    createdAt?: IsoDateString;
  }
): ModelSpec {
  if (!input.name.trim()) throw new TypeError("invalid_model_name");
  assertSemVer(input.version);
  return {
    ...input,
    id: modelId(input.id),
    createdAt: input.createdAt ?? nowIso(),
    tags: input.tags ? Object.freeze([...input.tags]) : undefined,
  };
}
