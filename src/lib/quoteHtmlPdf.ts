type ExportHtmlQuotePdfOptions = {
  elementId: string;
  fileName: string;
};

export const exportHtmlQuotePdf = async ({ elementId, fileName }: ExportHtmlQuotePdfOptions) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento con id "${elementId}" no encontrado.`);
  }

  const safeName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  const origin = window.location.origin;
  const serializedHtml = [
    '<!doctype html>',
    '<html lang="es">',
    '<head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    `<base href="${origin}" />`,
    document.head.innerHTML,
    '</head>',
    '<body style="margin:0;padding:24px;background:#ffffff;">',
    element.outerHTML,
    '</body>',
    '</html>',
  ].join('');

  const response = await fetch('/api/quote-html-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html: serializedHtml,
      fileName: safeName,
    }),
  });

  if (!response.ok) {
    throw new Error('No fue posible generar el PDF HTML con htmldocs.');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
