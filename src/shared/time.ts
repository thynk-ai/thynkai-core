import type { IsoDateString } from "./brand.js";
import { asIsoDateString } from "./brand.js";

export function toIsoDateString(d: Date): IsoDateString {
  return asIsoDateString(d.toISOString());
}