import React from "react";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";

export type QuotePdfData = {
  cliente: string;
  empresa: string;
  email: string;
  whatsapp: string;
  fecha: string;
  plan: string;
  implementacion: string;
  extras: string;
  descuento: string;
  motivoDescuento: string;
  totalInicial: string;
  continuidad: string;
  scopeItems: string[];
  exclusionItems: string[];
};

const styles = StyleSheet.create({
  page: { padding: 34, fontSize: 10, color: "#111111", fontFamily: "Helvetica" },
  coverPage: { padding: 40, fontSize: 10, color: "#111111", fontFamily: "Helvetica" },
  coverBand: { backgroundColor: "#111111", padding: 16, marginBottom: 26 },
  coverBandTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: 700, letterSpacing: 0.6 },
  coverBandSubtitle: { color: "#D4D4D8", marginTop: 4, fontSize: 11 },
  coverMeta: { marginTop: 8, gap: 6 },
  coverMetaText: { fontSize: 11, color: "#27272A" },
  coverHighlight: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    backgroundColor: "#FAFAFA",
    padding: 12,
  },
  coverHighlightTitle: { fontSize: 10, textTransform: "uppercase", color: "#52525B", marginBottom: 4 },
  coverHighlightValue: { fontSize: 18, fontWeight: 700 },
  coverFooter: { position: "absolute", bottom: 34, left: 40, right: 40, borderTopWidth: 1, borderTopColor: "#E4E4E7", paddingTop: 10 },
  coverFooterText: { fontSize: 9, color: "#71717A" },
  header: { marginBottom: 14, borderBottomWidth: 1, borderBottomColor: "#111111", paddingBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  title: { fontSize: 15, fontWeight: 700 },
  subtitle: { fontSize: 9, color: "#555555", marginTop: 2 },
  section: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 3,
    padding: 9,
  },
  sectionTitle: { fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", color: "#27272A" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4, gap: 8 },
  label: { color: "#3F3F46" },
  value: { fontWeight: 700, maxWidth: "55%", textAlign: "right" },
  rowTotal: { marginTop: 6, paddingTop: 6, borderTopWidth: 1, borderTopColor: "#D4D4D8" },
  bullet: { marginBottom: 3, color: "#27272A" },
  twoCols: { flexDirection: "row", gap: 10 },
  col: { flex: 1 },
  paymentBox: { marginTop: 12, backgroundColor: "#F4F4F5", borderWidth: 1, borderColor: "#D4D4D8", padding: 10 },
  paymentTitle: { fontSize: 10, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" },
  signWrap: { marginTop: 18, flexDirection: "row", gap: 16 },
  signCol: { flex: 1 },
  signLine: { marginTop: 22, borderTopWidth: 1, borderTopColor: "#A1A1AA", paddingTop: 4, fontSize: 8, color: "#71717A" },
  footer: { marginTop: 12, fontSize: 8, color: "#666666" },
});

const QuotePdfDocument = ({ data }: { data: QuotePdfData }) => (
  <Document>
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverBand}>
        <Text style={styles.coverBandTitle}>VIN STUDIO</Text>
        <Text style={styles.coverBandSubtitle}>Cotizacion Comercial Ecommerce</Text>
      </View>

      <View style={styles.coverMeta}>
        <Text style={styles.coverMetaText}>Cliente: {data.cliente || "-"}</Text>
        <Text style={styles.coverMetaText}>Empresa: {data.empresa || "-"}</Text>
        <Text style={styles.coverMetaText}>Fecha de emision: {data.fecha}</Text>
        <Text style={styles.coverMetaText}>Plan recomendado: {data.plan}</Text>
      </View>

      <View style={styles.coverHighlight}>
        <Text style={styles.coverHighlightTitle}>Total inicial de implementacion</Text>
        <Text style={styles.coverHighlightValue}>{data.totalInicial}</Text>
      </View>

      <View style={styles.coverHighlight}>
        <Text style={styles.coverHighlightTitle}>Continuidad mensual</Text>
        <Text>{data.continuidad}</Text>
        <Text>Detalle: $65.000 plataforma + $35.000 soporte.</Text>
      </View>

      <View style={styles.coverFooter}>
        <Text style={styles.coverFooterText}>
          Propuesta de implementacion y acompanamiento ecommerce para lanzamiento y operacion continua.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>VIN Studio - Cotizacion Ecommerce</Text>
          <Text style={styles.subtitle}>Resumen ejecutivo y alcance comercial</Text>
        </View>
        <Text style={styles.subtitle}>Fecha: {data.fecha}</Text>
      </View>

      <View style={styles.twoCols}>
        <View style={[styles.section, styles.col]}>
          <Text style={styles.sectionTitle}>Datos cliente</Text>
          <Text>Nombre: {data.cliente || "-"}</Text>
          <Text>Empresa: {data.empresa || "-"}</Text>
          <Text>Email: {data.email || "-"}</Text>
          <Text>WhatsApp: {data.whatsapp || "-"}</Text>
        </View>

        <View style={[styles.section, styles.col]}>
          <Text style={styles.sectionTitle}>Resumen del plan</Text>
          <Text>Plan seleccionado: {data.plan}</Text>
          <Text>Motivo descuento: {data.motivoDescuento || "-"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen economico</Text>
        <View style={styles.row}><Text style={styles.label}>Implementacion</Text><Text style={styles.value}>{data.implementacion}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Extras</Text><Text style={styles.value}>{data.extras}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Descuento</Text><Text style={styles.value}>{data.descuento}</Text></View>
        <View style={[styles.row, styles.rowTotal]}><Text style={styles.label}>Total inicial</Text><Text style={styles.value}>{data.totalInicial}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Continuidad mensual</Text><Text style={styles.value}>{data.continuidad}</Text></View>
        <Text>Detalle mensual soporte: $65.000 plataforma + $35.000 soporte</Text>
      </View>

      <View style={styles.twoCols}>
        <View style={[styles.section, styles.col]}>
          <Text style={styles.sectionTitle}>Alcance del plan</Text>
          {(data.scopeItems.length ? data.scopeItems : ["Sin detalle de alcance."]).map((item) => (
            <Text style={styles.bullet}>- {item}</Text>
          ))}
        </View>

        <View style={[styles.section, styles.col]}>
          <Text style={styles.sectionTitle}>No incluye este plan</Text>
          {(data.exclusionItems.length ? data.exclusionItems : ["Sin exclusiones definidas."]).map((item) => (
            <Text style={styles.bullet}>- {item}</Text>
          ))}
        </View>
      </View>

      <View style={styles.paymentBox}>
        <Text style={styles.paymentTitle}>Condicion de pago</Text>
        <Text style={styles.bullet}>- 50% de implementacion al aceptar la cotizacion.</Text>
        <Text style={styles.bullet}>- Revision de conformidad del entregable.</Text>
        <Text style={styles.bullet}>- 50% restante de implementacion + soporte mensual (si aplica).</Text>
      </View>

      <View style={styles.signWrap}>
        <View style={styles.signCol}>
          <Text style={styles.signLine}>Aprobacion cliente (nombre, firma y fecha)</Text>
        </View>
        <View style={styles.signCol}>
          <Text style={styles.signLine}>Ejecutivo VIN Studio (nombre y fecha)</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Documento generado por el cotizador interno de VIN Studio. Vigencia y condiciones finales sujetas a propuesta formal.
      </Text>
    </Page>
  </Document>
);

export async function downloadQuotePdf(data: QuotePdfData, fileName: string) {
  const blob = await pdf(<QuotePdfDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
