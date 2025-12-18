import type { Sha256Digest } from "../shared/brand.js";
import type { ModelId } from "./modelSpec.js";

export interface ModelArtifact {
  modelId: ModelId;
  version: string;
  uri: string;
  digest?: Sha256Digest;
  sizeBytes?: number;
  builtWith?: Readonly<{
    framework?: string;
    runtime?: string;
    notes?: string;
  }>;
}
