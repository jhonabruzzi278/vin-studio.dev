import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

type ExportHtmlQuotePdfOptions = {
  elementId: string;
  fileName: string;
};

export const exportHtmlQuotePdf = async ({ elementId, fileName }: ExportHtmlQuotePdfOptions) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento con id "${elementId}" no encontrado.`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: document.documentElement.scrollWidth,
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const imageHeight = (canvas.height * printableWidth) / canvas.width;

  let heightLeft = imageHeight;
  let position = margin;

  pdf.addImage(imageData, 'PNG', margin, position, printableWidth, imageHeight, undefined, 'FAST');
  heightLeft -= printableHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight + margin;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', margin, position, printableWidth, imageHeight, undefined, 'FAST');
    heightLeft -= printableHeight;
  }

  const safeName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
  pdf.save(safeName);
};
