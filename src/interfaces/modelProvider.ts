import type { ModelSpec } from "../models/modelSpec.js";
import type { ModelArtifact } from "../models/modelArtifact.js";
import type { ModelId } from "../models/modelSpec.js";

export interface ModelProvider {
  resolve(
    modelId: ModelId,
    version?: string
  ): Promise<{ spec: ModelSpec; artifact: ModelArtifact }>;
}
