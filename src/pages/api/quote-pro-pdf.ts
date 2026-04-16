import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { renderQuotePdfBuffer, type QuotePdfData } from '@/lib/quotePdfDocument';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeFileName(fileName: string) {
  const trimmed = (fileName || '').trim();
  const safe = trimmed.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');
  if (!safe) return 'Cotizacion-empresa.pdf';
  return safe.endsWith('.pdf') ? safe : `${safe}.pdf`;
}

export const POST: APIRoute = async ({ request }) => {
  let payload: QuotePdfData | null = null;
  try {
    payload = await request.json();
  } catch {
    payload = null;
  }

  if (!payload || !payload.planName || !payload.total) {
    return new Response(JSON.stringify({ success: false, error: 'Datos de cotización incompletos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  const fileName = sanitizeFileName(payload.fileName || 'Cotizacion-empresa.pdf');

  const recipientEmail = (payload.email || '').trim();
  if (!EMAIL_REGEX.test(recipientEmail)) {
    return new Response(JSON.stringify({ success: false, error: 'Email del cliente no válido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  if (!payload.signatureName?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Firma del cliente incompleta.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  try {
    const pdfBuffer = await renderQuotePdfBuffer(payload);

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const resendFrom = import.meta.env.EMAIL_FROM || 'onboarding@resend.dev';
    const internalCopyRecipients = (import.meta.env.EMAIL_TO || '')
      .split(',')
      .map((value: string) => value.trim())
      .filter((value: string) => EMAIL_REGEX.test(value));

    let emailDelivery = 'sent';
    let emailErrorMessage = '';

    if (!resendApiKey) {
      emailDelivery = 'failed';
      emailErrorMessage = 'RESEND_API_KEY no configurada.';
    } else {
      try {
        const resend = new Resend(resendApiKey);
        const { error: emailError } = await resend.emails.send({
          from: `VIN Studio <${resendFrom}>`,
          to: [recipientEmail],
          ...(internalCopyRecipients.length ? { bcc: internalCopyRecipients } : {}),
          subject: `Copia de cotización firmada - ${payload.companyName || payload.clientName || 'Cliente'}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
              <h2 style="margin:0 0 8px 0;">Cotización firmada</h2>
              <p style="margin:0 0 12px 0;">Hola ${payload.clientName || ''}, adjuntamos la copia de tu cotización firmada.</p>
              <p style="margin:0;"><strong>Firmante:</strong> ${payload.signatureName}</p>
              <p style="margin:0;"><strong>Fecha de firma:</strong> ____________________</p>
            </div>
          `,
          attachments: [
            {
              filename: fileName,
              content: pdfBuffer.toString('base64'),
              contentType: 'application/pdf',
            },
          ],
        });

        if (emailError) {
          emailDelivery = 'failed';
          emailErrorMessage = typeof emailError.message === 'string' ? emailError.message : 'Error desconocido de Resend.';
          console.error('No fue posible enviar la copia firmada:', emailError);
        }
      } catch (emailRuntimeError) {
        emailDelivery = 'failed';
        emailErrorMessage = emailRuntimeError instanceof Error ? emailRuntimeError.message : 'Error al conectar con Resend.';
        console.error('No fue posible enviar la copia firmada:', emailRuntimeError);
      }
    }

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'X-Email-Delivery': emailDelivery,
        'X-Email-Error': encodeURIComponent(emailErrorMessage.slice(0, 180)),
      },
    });
  } catch (error) {
    console.error('No fue posible generar PDF Pro:', error);
    const details = error instanceof Error ? error.message : 'Sin detalles adicionales.';
    return new Response(JSON.stringify({ success: false, error: 'No fue posible generar el PDF Pro.', details }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
};
