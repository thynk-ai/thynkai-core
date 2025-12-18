export type Brand<T, B extends string> = T & { readonly __brand: B };

export type IsoDateString = Brand<string, "IsoDateString">;

export function asIsoDateString(value: string): IsoDateString {
  const t = Date.parse(value);
  if (Number.isNaN(t)) throw new TypeError("invalid_iso_date");
  return value as IsoDateString;
}

export function nowIso(): IsoDateString {
  return new Date().toISOString() as IsoDateString;
}

export type Sha256Digest = Brand<string, "Sha256Digest">;

export function asSha256Digest(value: string): Sha256Digest {
  if (!/^sha256:[0-9a-f]{64}$/i.test(value))
    throw new TypeError("invalid_sha256_digest");
  return value as Sha256Digest;
}
