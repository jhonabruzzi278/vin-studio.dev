import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Marcar como server-rendered
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nombre, email, empresa, telefono, mensaje } = data;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Nombre, email y mensaje son obligatorios' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email inválido' 
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Enviar email usando Resend
    console.log('📧 Enviando email a:', ['jonathanguerra278@gmail.com', 'jonathan.guerra@vin-studio.dev']);
    console.log('📤 Desde:', 'contacto@vin-studio.dev');
    console.log('📝 Asunto:', `Nueva Consulta de ${nombre}${empresa ? ` - ${empresa}` : ''}`);
    
    const { data: emailData, error } = await resend.emails.send({
      from: 'VIN Studio <contacto@vin-studio.dev>',
      to: [
        'jonathan.guerra@vin-studio.dev'
      ],
      replyTo: email,
      subject: `Nueva Consulta de ${nombre}${empresa ? ` - ${empresa}` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #18181b;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                border-bottom: 2px solid #18181b;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 900;
              }
              .section {
                margin-bottom: 25px;
                padding: 20px;
                background: #fafafa;
                border-left: 3px solid #18181b;
              }
              .label {
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #71717a;
                margin-bottom: 5px;
              }
              .value {
                font-size: 16px;
                color: #18181b;
                margin: 0;
              }
              .message {
                background: white;
                padding: 20px;
                border: 1px solid #e4e4e7;
                margin-top: 10px;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e4e4e7;
                font-size: 14px;
                color: #71717a;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Nueva Consulta - VIN Studio</h1>
            </div>

            <div class="section">
              <div class="label">Nombre Completo</div>
              <p class="value">${nombre}</p>
            </div>

            <div class="section">
              <div class="label">Email de Contacto</div>
              <p class="value">
                <a href="mailto:${email}" style="color: #18181b; text-decoration: none;">
                  ${email}
                </a>
              </p>
            </div>

            ${empresa ? `
              <div class="section">
                <div class="label">Empresa</div>
                <p class="value">${empresa}</p>
              </div>
            ` : ''}

            ${telefono ? `
              <div class="section">
                <div class="label">Teléfono</div>
                <p class="value">
                  <a href="tel:${telefono}" style="color: #18181b; text-decoration: none;">
                    ${telefono}
                  </a>
                </p>
              </div>
            ` : ''}

            <div class="section">
              <div class="label">Mensaje</div>
              <div class="message">${mensaje}</div>
            </div>

            <div class="footer">
              <p>Este email fue enviado desde el formulario de contacto de <strong>vin-studio.dev</strong></p>
              <p style="margin-top: 10px;">
                Puedes responder directamente a este email para contactar al cliente.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Error al enviar el mensaje. Por favor intenta nuevamente.' 
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ Email enviado exitosamente. ID:', emailData?.id);
    console.log('📊 Revisa en Resend:', `https://resend.com/emails/${emailData?.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensaje enviado correctamente',
        id: emailData?.id
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error en API de contacto:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Error interno del servidor' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
