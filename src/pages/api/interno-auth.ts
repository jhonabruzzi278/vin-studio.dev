import type { APIRoute } from "astro";
import { timingSafeEqual } from "node:crypto";
import {
  buildAuthCookie,
  buildLogoutCookie,
  createAuthToken,
} from "@/lib/internalAuth";

export const prerender = false;

function comparePin(input: string, expected: string) {
  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);
  if (inputBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(inputBuf, expectedBuf);
}

export const POST: APIRoute = async ({ request }) => {
  const expectedPin = import.meta.env.INTERNAL_COTIZADOR_PIN;
  const authSecret = import.meta.env.INTERNAL_AUTH_SECRET;

  if (!expectedPin || !authSecret) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Configuracion interna incompleta.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
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
        error: "Debes ingresar el PIN.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const valid = comparePin(providedPin, expectedPin);
  if (!valid) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "PIN incorrecto.",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const token = createAuthToken(authSecret);
  const setCookie = buildAuthCookie(token, import.meta.env.PROD);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
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
      "Set-Cookie": setCookie,
    },
  });
};
