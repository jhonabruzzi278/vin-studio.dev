import React from 'react';
import { Document, Page, StyleSheet, Text, View, pdf } from '@react-pdf/renderer';

export type QuotePdfData = {
  fileName: string;
  dateText: string;
  clientName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  planName: string;
  implementation: string;
  extras: string;
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

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 36,
    paddingBottom: 44,
    fontSize: 10,
    color: '#111827',
    lineHeight: 1.4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    width: 170,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  listItem: {
    marginBottom: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 36,
    right: 36,
    textAlign: 'right',
    color: '#6b7280',
    fontSize: 8,
  },
});

const ListSection = ({ title, items }: { title: string; items: string[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {(items.length ? items : ['Sin informacion disponible.']).map((item, idx) => (
      <Text key={`${title}-${idx}`} style={styles.listItem}>
        - {item}
      </Text>
    ))}
  </View>
);

const QuotePdfDocument = ({ data }: { data: QuotePdfData }) => (
  <Document title="Cotizacion Ecommerce - VIN Studio">
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>VIN Studio - Cotizacion Ecommerce</Text>
      <Text style={styles.subtitle}>Fecha: {data.dateText}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del cliente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{data.clientName || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Empresa:</Text>
          <Text style={styles.value}>{data.companyName || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email || '-'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>WhatsApp:</Text>
          <Text style={styles.value}>{data.whatsapp || '-'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen comercial</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Plan seleccionado:</Text>
          <Text style={styles.value}>{data.planName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Implementacion:</Text>
          <Text style={styles.value}>{data.implementation}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Extras:</Text>
          <Text style={styles.value}>{data.extras}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Descuento:</Text>
          <Text style={styles.value}>{data.discount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Motivo descuento:</Text>
          <Text style={styles.value}>{data.discountReason}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total inicial:</Text>
          <Text style={styles.value}>{data.total}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Continuidad:</Text>
          <Text style={styles.value}>{data.continuity}</Text>
        </View>
      </View>

      <ListSection title="Alcance del plan" items={data.scopeItems} />
      <ListSection title="No incluye este plan" items={data.exclusionItems} />
      <ListSection title="Alcance Soporte+ (global)" items={data.supportItems} />
      <ListSection title="Condicion de pago" items={data.paymentTerms} />
      <ListSection title="Condiciones comerciales" items={data.commercialTerms} />

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} de ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

export const exportQuotePdf = async (data: QuotePdfData) => {
  const blob = await pdf(<QuotePdfDocument data={data} />).toBlob();
  const fileName = data.fileName.endsWith('.pdf') ? data.fileName : `${data.fileName}.pdf`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
