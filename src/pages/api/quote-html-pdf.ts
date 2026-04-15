import type { APIRoute } from "astro";

export const prerender = false;

const HTMLDOCS_ENDPOINT = "https://htmldocs.com/api/generate";
const MAX_HTML_LENGTH = 900_000;

function sanitizeFileName(fileName: string) {
  const trimmed = fileName.trim();
  const safe = trimmed.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  if (!safe) return "cotizacion-html.pdf";
  return safe.endsWith(".pdf") ? safe : `${safe}.pdf`;
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.HTMLDOCS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ success: false, error: "HTMLDOCS_API_KEY no configurada." }), {
      status: 503,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  let payload: { html?: string; fileName?: string };
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const html = (payload.html || "").trim();
  if (!html) {
    return new Response(JSON.stringify({ success: false, error: "HTML requerido." }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  if (html.length > MAX_HTML_LENGTH) {
    return new Response(JSON.stringify({ success: false, error: "El HTML excede el tamaño máximo permitido." }), {
      status: 413,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  const fileName = sanitizeFileName(payload.fileName || "cotizacion-html.pdf");

  const htmldocsResponse = await fetch(HTMLDOCS_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      html,
      format: "pdf",
      size: "A4",
      orientation: "portrait",
    }),
  });

  if (!htmldocsResponse.ok) {
    return new Response(JSON.stringify({ success: false, error: "htmldocs no pudo generar el PDF." }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  }

  const pdfBuffer = await htmldocsResponse.arrayBuffer();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename=\"${fileName}\"`,
    },
  });
};
