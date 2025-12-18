import { randomUUID, createHash } from "node:crypto";
import type { Sha256Digest } from "./brand.js";
import { asSha256Digest } from "./brand.js";

export function uuid(): string {
  return randomUUID();
}

export function sha256Hex(data: string | Buffer): Sha256Digest {
  const h = createHash("sha256").update(data).digest("hex");
  return asSha256Digest(`sha256:${h}`);
}