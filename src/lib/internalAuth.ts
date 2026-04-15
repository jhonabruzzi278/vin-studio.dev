import { createHmac, timingSafeEqual } from "node:crypto";

export const INTERNAL_AUTH_COOKIE = "vin_internal_auth";
export const INTERNAL_AUTH_MAX_AGE = 60 * 60 * 8; // 8 hours

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAuthToken(secret: string) {
  const expiresAt = Date.now() + INTERNAL_AUTH_MAX_AGE * 1000;
  const payload = `${expiresAt}`;
  const signature = sign(payload, secret);
  return `${payload}.${signature}`;
}

export function verifyAuthToken(token: string, secret: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  if (!safeEqual(signature, expected)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  if (Date.now() > expiresAt) return false;
  return true;
}

export function parseCookieValue(cookieHeader: string | null, key: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (!part.startsWith(`${key}=`)) continue;
    return decodeURIComponent(part.slice(key.length + 1));
  }
  return null;
}

export function buildAuthCookie(token: string, secure: boolean) {
  const base = `${INTERNAL_AUTH_COOKIE}=${encodeURIComponent(token)}; Path=/interno; HttpOnly; SameSite=Strict; Max-Age=${INTERNAL_AUTH_MAX_AGE}`;
  return secure ? `${base}; Secure` : base;
}

export function buildLogoutCookie(secure: boolean) {
  const base = `${INTERNAL_AUTH_COOKIE}=; Path=/interno; HttpOnly; SameSite=Strict; Max-Age=0`;
  return secure ? `${base}; Secure` : base;
}
