import React from 'react';
import { Document, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer';

export type QuotePdfData = {
  fileName: string;
  dateText: string;
  clientName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  signatureName: string;
  signatureDate: string;
  planName: string;
  implementation: string;
  extras: string;
  extrasDetails?: string[];
  discount: string;
  discountReason: string;
  total: string;
  continuity: string;
  scopeItems: string[];
  exclusionItems: string[];
  supportItems: string[];
  paymentTerms: string[];
  commercialTerms: string[];
};

const COMPANY_NAME = 'VIN Studio';
const COMPANY_EMAIL = 'contacto@vin-studio.dev';
const COMPANY_PHONE = '+56 9 3898 0598';

const formatSafeText = (value: string | undefined) => (value && value.trim() ? value.trim() : '-');

const createInvoiceNumber = (fileName: string) => {
  const base = (fileName || 'COT-0000').replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]+/g, '-').toUpperCase();
  return base || 'COT-0000';
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 38,
    fontSize: 9.6,
    color: '#111827',
    lineHeight: 1.4,
    backgroundColor: '#f8fafc',
  },
  pageTwo: {
    paddingTop: 28,
    paddingHorizontal: 28,
    paddingBottom: 38,
    fontSize: 9.6,
    color: '#111827',
    lineHeight: 1.45,
    backgroundColor: '#f8fafc',
  },
  shell: {
    backgroundColor: '#ffffff',
    border: '1 solid #e5e7eb',
    borderRadius: 8,
    padding: 18,
  },
  headerBar: {
    backgroundColor: '#0f172a',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  invoiceBadge: {
    color: '#0f172a',
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  topGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  cardTitle: {
    fontSize: 8,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  strongLine: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#0f172a',
  },
  lightLine: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 1,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1 solid #e2e8f0',
    paddingVertical: 4,
  },
  metaRowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  metaLabel: {
    fontSize: 8.4,
    color: '#475569',
  },
  metaValue: {
    fontSize: 8.8,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  tableWrap: {
    marginTop: 6,
    border: '1 solid #e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottom: '1 solid #e2e8f0',
    paddingVertical: 7,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 8,
    color: '#334155',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  colConcept: {
    width: '52%',
  },
  colDetails: {
    width: '28%',
  },
  colAmount: {
    width: '20%',
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottom: '1 solid #f1f5f9',
  },
  tableRowAlt: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottom: '1 solid #f1f5f9',
    backgroundColor: '#f8fafc',
  },
  conceptText: {
    fontSize: 9,
    color: '#0f172a',
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 8.6,
    color: '#334155',
  },
  amountText: {
    fontSize: 9,
    color: '#111827',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  summaryArea: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  notesCard: {
    flex: 1.2,
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  notesTitle: {
    fontSize: 8.4,
    color: '#334155',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  noteLine: {
    fontSize: 8.6,
    color: '#334155',
    marginBottom: 2,
  },
  totalCard: {
    flex: 0.8,
    border: '1 solid #0f172a',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  totalLabel: {
    fontSize: 8.3,
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalValue: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 6,
  },
  totalHint: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.5,
  },
  blocksGrid: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },
  block: {
    flex: 1,
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    padding: 8,
  },
  blockTitle: {
    fontSize: 8,
    color: '#334155',
    fontWeight: 'bold',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  listItem: {
    fontSize: 8.2,
    color: '#334155',
    marginBottom: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 30,
    right: 30,
    borderTop: '1 solid #e5e7eb',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7.5,
    color: '#64748b',
  },
  sectionCard: {
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  sectionTitleEs: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionItem: {
    fontSize: 8.7,
    color: '#334155',
    marginBottom: 2,
  },
  signatureWrap: {
    border: '1 solid #0f172a',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: '45%',
    marginLeft: 'auto',
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  signatureLine: {
    borderBottom: '1 solid #334155',
    height: 16,
    marginBottom: 4,
  },
  signatureMeta: {
    fontSize: 7.5,
    color: '#334155',
    marginBottom: 1,
  },
});

const InvoiceRow = ({
  concept,
  details,
  amount,
  alt,
}: {
  concept: string;
  details: string;
  amount: string;
  alt?: boolean;
}) => (
  <View style={alt ? styles.tableRowAlt : styles.tableRow}>
    <View style={styles.colConcept}>
      <Text style={styles.conceptText}>{concept}</Text>
    </View>
    <View style={styles.colDetails}>
      <Text style={styles.detailsText}>{details}</Text>
    </View>
    <View style={styles.colAmount}>
      <Text style={styles.amountText}>{amount}</Text>
    </View>
  </View>
);

const CompactListBlock = ({ title, items }: { title: string; items: string[] }) => (
  <View style={styles.block}>
    <Text style={styles.blockTitle}>{title}</Text>
    {(items.length ? items : ['Sin informacion disponible.']).slice(0, 8).map((item, idx) => (
      <Text key={`${title}-${idx}`} style={styles.listItem}>
        - {item}
      </Text>
    ))}
  </View>
);

const QuotePdfDocument = ({ data }: { data: QuotePdfData }) => {
  const invoiceNo = createInvoiceNumber(data.fileName);
  const signatureName = formatSafeText(data.signatureName);
  const extrasDetailsText = (data.extrasDetails && data.extrasDetails.length)
    ? data.extrasDetails.map((item) => `- ${item}`).join('\n')
    : 'Sin extras seleccionados.';

  return (
    <Document
      title="Invoice Cotización Ecommerce - VIN Studio"
      author={COMPANY_NAME}
      subject="Cotización Ecommerce"
      creator="VIN Studio"
      pageLayout="singlePage"
      pageMode="useNone"
      language="es-CL"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.shell}>
          <View style={styles.headerBar}>
            <Text style={styles.brand}>{COMPANY_NAME}</Text>
            <Text style={styles.invoiceBadge}>Cotización</Text>
          </View>

          <View style={styles.topGrid}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Emisor</Text>
              <Text style={styles.strongLine}>{COMPANY_NAME}</Text>
              <Text style={styles.lightLine}>Servicios Ecommerce y Soporte Digital</Text>
              <Text style={styles.lightLine}>{COMPANY_EMAIL}</Text>
              <Text style={styles.lightLine}>{COMPANY_PHONE}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Cliente</Text>
              <Text style={styles.strongLine}>{formatSafeText(data.clientName)}</Text>
              <Text style={styles.lightLine}>{formatSafeText(data.companyName)}</Text>
              <Text style={styles.lightLine}>{formatSafeText(data.email)}</Text>
              <Text style={styles.lightLine}>{formatSafeText(data.whatsapp)}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Detalle de documento</Text>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Fecha emisión</Text>
                <Text style={styles.metaValue}>{formatSafeText(data.dateText)}</Text>
              </View>
              <View style={styles.metaRowLast}>
                <Text style={styles.metaLabel}>Estado</Text>
                <Text style={styles.metaValue}>Propuesta comercial</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableWrap}>
            <View style={styles.tableHeader}>
              <View style={styles.colConcept}>
                <Text style={styles.tableHeaderText}>Concepto</Text>
              </View>
              <View style={styles.colDetails}>
                <Text style={styles.tableHeaderText}>Detalle</Text>
              </View>
              <View style={styles.colAmount}>
                <Text style={styles.tableHeaderText}>Monto</Text>
              </View>
            </View>

            <InvoiceRow concept="Plan" details={formatSafeText(data.planName)} amount={formatSafeText(data.implementation)} />
            <InvoiceRow concept="Extras" details={extrasDetailsText} amount={formatSafeText(data.extras)} alt />
            <InvoiceRow concept="Descuento" details={formatSafeText(data.discountReason)} amount={formatSafeText(data.discount)} />
            <InvoiceRow concept="Continuidad" details="Soporte mensual" amount={formatSafeText(data.continuity)} alt />
          </View>

          <View style={styles.summaryArea}>
            <View style={styles.notesCard}>
              <Text style={styles.notesTitle}>Condiciones de pago</Text>
              {(data.paymentTerms.length ? data.paymentTerms : ['Sin terminos definidos.']).map((item, idx) => (
                <Text key={`payment-${idx}`} style={styles.noteLine}>
                  - {item}
                </Text>
              ))}
            </View>

            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total inicial</Text>
              <Text style={styles.totalValue}>{formatSafeText(data.total)}</Text>
              <Text style={styles.totalHint}>Documento de referencia comercial. Valores expresados en CLP.</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{COMPANY_NAME} | {COMPANY_EMAIL}</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>

      <Page size="A4" style={styles.pageTwo}>
        <View style={styles.shell}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleEs}>Alcance del plan</Text>
            {(data.scopeItems.length ? data.scopeItems : ['Sin informacion disponible.']).map((item, idx) => (
              <Text key={`scope-${idx}`} style={styles.sectionItem}>- {item}</Text>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleEs}>No incluye este plan</Text>
            {(data.exclusionItems.length ? data.exclusionItems : ['Sin informacion disponible.']).map((item, idx) => (
              <Text key={`exclusion-${idx}`} style={styles.sectionItem}>- {item}</Text>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleEs}>Soporte+ mensual</Text>
            {(data.supportItems.length ? data.supportItems : ['Sin informacion disponible.']).map((item, idx) => (
              <Text key={`support-${idx}`} style={styles.sectionItem}>- {item}</Text>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitleEs}>Condiciones comerciales</Text>
            {(data.commercialTerms.length ? data.commercialTerms : ['Sin informacion disponible.']).map((item, idx) => (
              <Text key={`commercial-${idx}`} style={styles.sectionItem}>- {item}</Text>
            ))}
          </View>

          <View style={styles.signatureWrap}>
            <Text style={styles.signatureTitle}>Firma de aceptación del cliente</Text>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureMeta}>Nombre del firmante: {signatureName}</Text>
            <Text style={styles.signatureMeta}>Fecha de firma: ____________________</Text>
            <Text style={styles.signatureMeta}>Declaro conformidad con el detalle y condiciones de esta{`\n`}cotización.</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{COMPANY_NAME} | {COMPANY_EMAIL}</Text>
          <Text style={styles.footerText} render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export const renderQuotePdfBuffer = async (data: QuotePdfData) => {
  const instance = pdf(<QuotePdfDocument data={data} />);
  const raw = await instance.toBuffer();

  if (Buffer.isBuffer(raw)) {
    return raw;
  }

  if (raw instanceof Uint8Array) {
    return Buffer.from(raw);
  }

  if (raw && typeof (raw as { arrayBuffer?: () => Promise<ArrayBuffer> }).arrayBuffer === 'function') {
    const arrayBuffer = await (raw as { arrayBuffer: () => Promise<ArrayBuffer> }).arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  if (raw && typeof (raw as { on?: (event: string, handler: (...args: unknown[]) => void) => void }).on === 'function') {
    const stream = raw as {
      on: (event: string, handler: (...args: unknown[]) => void) => void;
    };
    const chunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
      stream.on('data', (chunk: unknown) => {
        if (Buffer.isBuffer(chunk)) {
          chunks.push(chunk);
          return;
        }

        if (chunk instanceof Uint8Array) {
          chunks.push(Buffer.from(chunk));
        }
      });
      stream.on('end', () => resolve());
      stream.on('error', (error: unknown) => reject(error));
    });

    return Buffer.concat(chunks);
  }

  throw new Error('No fue posible serializar el PDF Pro a un buffer válido.');
};
