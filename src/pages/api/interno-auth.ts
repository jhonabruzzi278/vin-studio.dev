import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import {
  buildAuthCookie,
  buildLogoutCookie,
  createAuthToken,
} from "@/lib/internalAuth";

export const prerender = false;

type AuthAttemptState = {
  attempts: number;
  windowStartedAt: number;
  blockedUntil: number;
};

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_MS = 15 * 60 * 1000; // 15 minutes
const attemptStore = new Map<string, AuthAttemptState>();

function comparePin(input: string, expected: string) {
  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);
  if (inputBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(inputBuf, expectedBuf);
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown-ip";
  const userAgent = request.headers.get("user-agent") || "unknown-ua";
  return `${ip}|${userAgent}`;
}

function getAttemptState(key: string) {
  const now = Date.now();
  const current = attemptStore.get(key);

  if (!current) {
    const nextState: AuthAttemptState = {
      attempts: 0,
      windowStartedAt: now,
      blockedUntil: 0,
    };
    attemptStore.set(key, nextState);
    return nextState;
  }

  if (now - current.windowStartedAt > WINDOW_MS) {
    current.attempts = 0;
    current.windowStartedAt = now;
  }

  if (current.blockedUntil && now > current.blockedUntil) {
    current.blockedUntil = 0;
    current.attempts = 0;
    current.windowStartedAt = now;
  }

  return current;
}

function registerFailedAttempt(key: string) {
  const now = Date.now();
  const state = getAttemptState(key);
  state.attempts += 1;
  if (state.attempts >= MAX_ATTEMPTS) {
    state.blockedUntil = now + BLOCK_MS;
  }
}

function clearAttempts(key: string) {
  attemptStore.delete(key);
}

export const POST: APIRoute = async ({ request }) => {
  const expectedPin = import.meta.env.INTERNAL_COTIZADOR_PIN;
  const authSecret = import.meta.env.INTERNAL_AUTH_SECRET;
  const clientKey = getClientKey(request);
  const state = getAttemptState(clientKey);
  const now = Date.now();

  if (state.blockedUntil && now < state.blockedUntil) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "No fue posible autenticar.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Retry-After": `${Math.ceil((state.blockedUntil - now) / 1000)}`,
        },
      },
    );
  }

  if (!expectedPin || !authSecret) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "No fue posible autenticar.",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      },
    );
  }

  let body: { pin?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const providedPin = (body.pin || "").trim();
  if (!providedPin) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "No fue posible autenticar.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      },
    );
  }

  const valid = comparePin(providedPin, expectedPin);
  if (!valid) {
    registerFailedAttempt(clientKey);
    return new Response(
      JSON.stringify({
        success: false,
        error: "No fue posible autenticar.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      },
    );
  }

  const token = createAuthToken(authSecret);
  const setCookie = buildAuthCookie(token, import.meta.env.PROD);
  clearAttempts(clientKey);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie": setCookie,
    },
  });
};

export const DELETE: APIRoute = async () => {
  const setCookie = buildLogoutCookie(import.meta.env.PROD);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Set-Cookie": setCookie,
    },
  });
};
