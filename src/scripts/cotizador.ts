export const initCotizador = () => {
  const btnCalcular = document.getElementById("btnCalcular");
  if (!btnCalcular) return;
  if ((btnCalcular as HTMLButtonElement).dataset.cotizadorBound === "1") return;
  (btnCalcular as HTMLButtonElement).dataset.cotizadorBound = "1";

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const formatClp = (value: number) => `$${Number(value || 0).toLocaleString("es-CL")} CLP`;

  const planMap = {
    express: {
      name: "Plan Tienda Express",
      basePrice: 99990,
      scope: [
        "Tienda lista para empezar a vender en poco tiempo",
        "Catálogo inicial de hasta 10 productos bien presentados",
        "Navegación clara para que el cliente encuentre rápido lo que busca",
        "Envíos y pagos configurados para recibir pedidos sin fricción",
        "Asesoría visual para mostrar productos con mejor percepción de valor",
      ],
      exclusions: [
        "Compra de dominio y renovaciones",
        "Costo mensual de plataforma (desde mes 4)",
        "Servicios de correo corporativo",
        "Gestión de campañas publicitarias",
        "Desarrollo personalizado avanzado",
        "Apps o licencias pagadas de terceros",
      ],
    },
    completa: {
      name: "Plan Tienda Completa",
      basePrice: 249990,
      scope: [
        "Tienda profesional preparada para vender y escalar con orden",
        "Catálogo de hasta 20 productos con categorías y navegación más eficiente",
        "Emails automáticos para mejorar confianza y seguimiento de compra",
        "Canal comercial por WhatsApp y formulario para captar oportunidades",
        "Recuperación básica de carritos para no perder ventas potenciales",
        "Capacitación inicial para que el equipo opere la tienda con autonomía",
        "Asesoría visual para elevar la presentación de productos",
      ],
      exclusions: [
        "Compra de dominio y renovaciones",
        "Costo mensual de plataforma (desde mes 4)",
        "Servicios de correo corporativo",
        "Gestión de campañas publicitarias",
        "Integraciones complejas no cotizadas",
        "Apps o licencias pagadas de terceros",
      ],
    },
    pro: {
      name: "Plan Tienda Pro",
      basePrice: 399990,
      scope: [
        "Ecommerce orientado a convertir mejor y vender de forma más constante",
        "Catálogo de hasta 50 productos con estructura comercial optimizada",
        "Optimización de carrito y checkout para reducir fricción en la compra",
        "SEO base en tienda y productos para aumentar visibilidad orgánica",
        "Pagos configurados para operar de forma estable",
        "Asesoría visual para reforzar confianza y valor percibido",
      ],
      exclusions: [
        "Costo mensual de plataforma (desde mes 4)",
        "Servicios de correo corporativo",
        "Gestión publicitaria mensual (Meta/Google)",
        "Apps o licencias pagadas de terceros",
      ],
    },
    elite: {
      name: "Plan Tienda Elite",
      basePrice: 649990,
      scope: [
        "Tienda robusta para operación comercial intensiva y crecimiento sostenido",
        "Catálogo de hasta 100 productos con estructura avanzada",
        "Migración base y landing pages enfocadas en campañas y conversión",
        "Integraciones operativas para mejorar flujo de ventas y postventa",
        "Automatizaciones de post-compra para fidelizar y aumentar recompra",
        "Dashboard comercial para monitorear resultados y tomar decisiones",
        "Acompañamiento estratégico continuo para priorizar mejoras de alto impacto",
        "Asesoría visual para mantener una imagen de marca más sólida",
      ],
      exclusions: [
        "Compra de dominio y renovaciones",
        "Costo mensual de plataforma (desde mes 4)",
        "Servicios de correo corporativo",
        "Gestión publicitaria mensual (Meta/Google)",
        "Automatizaciones avanzadas fuera de alcance",
        "Apps o licencias pagadas de terceros",
      ],
    },
  } as const;

  const extrasMap: Record<string, { name: string; core: string; price: number; detail: string }> = {
    productos_extra: {
      name: "Carga extra de productos sin límite + colecciones detalladas, filtros de búsqueda y optimización de navegación",
      core: "Carga productos",
      price: 100000,
      detail: "Carga de productos sin límite con colecciones, filtros y navegación optimizada.",
    },
    optimizacion_colecciones: {
      name: "Optimización de colecciones, filtros y navegación",
      core: "Colecciones y filtros",
      price: 80000,
      detail: "Mejora de arquitectura de categorias, colecciones y filtros.",
    },
    integracion_adicional: {
      name: "Integraciones con apps y servicios externos",
      core: "Apps externas",
      price: 40000,
      detail: "Conexion con apps o servicios externos compatibles.",
    },
    integracion_erp_crm: {
      name: "Integración ERP / CRM / facturación",
      core: "ERP/CRM",
      price: 220000,
      detail: "Integración operativa con ERP/CRM/facturación.",
    },
    desarrollo_medida: {
      name: "Desarrollo Shopify a medida",
      core: "Dev a medida",
      price: 80000,
      detail: "Desarrollo personalizado para necesidades específicas del negocio.",
    },
    fotografia_adicional: {
      name: "Fotografia adicional de productos",
      core: "Fotografia",
      price: 60000,
      detail: "Produccion de fotografias adicionales para catalogo.",
    },
    seo_tecnico: {
      name: "SEO técnico para Shopify",
      core: "SEO técnico",
      price: 70000,
      detail: "Ajustes de SEO técnico on-site.",
    },
    email_corporativo: {
      name: "Configuración email corporativo",
      core: "Email corporativo",
      price: 45000,
      detail: "Configuración de cuentas de correo corporativo.",
    },
    tracking_marketing_full: {
      name: "Configuración GA4, GTM, Meta Pixel y TikTok Pixel",
      core: "Tracking",
      price: 110000,
      detail: "Implementación de tracking comercial completo.",
    },
    flows_email_marketing: {
      name: "Email marketing flows (bienvenida, abandono, post-compra)",
      core: "Flows email",
      price: 140000,
      detail: "Automatizaciones de email para bienvenida, recuperación y post-compra.",
    },
    setup_campanas_landing: {
      name: "Setup de campañas (Meta/Google) + landing page",
      core: "Setup campañas + landing",
      price: 180000,
      detail: "Configuración inicial de campañas con landing.",
    },
    marketplace_sync: {
      name: "Sincronización Shopify con marketplace",
      core: "Marketplace",
      price: 120000,
      detail: "Sincronización de catálogo con marketplaces.",
    },
    integracion_logistica: {
      name: "Integración logística y couriers",
      core: "Logística",
      price: 130000,
      detail: "Integración logística con couriers para envíos y seguimiento.",
    },
    whatsapp_api_bot: {
      name: "WhatsApp API + bot básico de ventas/soporte",
      core: "WhatsApp API + bot",
      price: 160000,
      detail: "Implementación de WhatsApp API con bot básico.",
    },
    capacitacion_equipo: {
      name: "Capacitación comercial para equipo",
      core: "Capacitación comercial",
      price: 55000,
      detail: "Capacitación práctica para equipo comercial.",
    },
  };

  const PASARELA_DISCOUNT = 100000;
  const HOSTING_PRICE_BY_PLAN: Record<string, number> = {
    completa: 549990,
    pro: 849990,
  };

  const getSelectedPlan = () => document.querySelector<HTMLInputElement>('input[name="plan"]:checked')?.value ?? null;
  const getSelectedPlatform = () =>
    document.querySelector<HTMLInputElement>('input[name="platformModel"]:checked')?.value === "wordpress" ? "wordpress" : "shopify";
  const getPlatformPrice = (basePrice: number, planKey?: string | null) => {
    if (getSelectedPlatform() !== "wordpress") return basePrice;
    if (planKey && HOSTING_PRICE_BY_PLAN[planKey]) return HOSTING_PRICE_BY_PLAN[planKey];
    return basePrice * 2 + 100000;
  };
  const getSelectedExtras = () => Array.from(document.querySelectorAll<HTMLInputElement>('input[data-extra-option="1"]:checked')).map((el) => el.value);

  const getSupportInfo = () =>
    getSelectedPlatform() === "wordpress"
      ? {
          label: "Incluir Soporte+ mensual: $35.000 CLP",
          continuity: "Soporte+ mensual: $35.000 CLP/mes x 3 meses",
          detail: "$35.000 soporte (sin cobro de plataforma).",
          note: "Modelo Hosting Propio: el cliente mantiene su hosting, no paga plataforma mensual con VIN Studio y recibe 1 servicio a elección gratis en la primera implementación.",
        }
      : {
          label: "Incluir Soporte+ mensual: $100.000 CLP",
          continuity: "Soporte+ mensual: $100.000 CLP/mes",
          detail: "$65.000 plataforma + $35.000 soporte.",
          note: "Durante los primeros 3 meses de contratación, el costo de plataforma lo asumimos nosotros. Desde el 4to mes, el cliente paga la plataforma y no está obligado a mantener el plan de soporte.",
        };

  const adaptTextForPlatform = (value: string, platform: "shopify" | "wordpress") => {
    if (platform !== "wordpress") return value;
    return value
      .replace(/Shopify/g, "Hosting Propio")
      .replace(/shopify/g, "hosting propio")
      .replace("Productos: hasta 10", "Productos: sin límite")
      .replace("Productos: hasta 20", "Productos: sin límite")
      .replace("Productos: hasta 50", "Productos: sin límite")
      .replace("Productos: hasta 100", "Productos: sin límite")
      .replace("Configuración de tienda funcional", "Configuración avanzada en hosting propio")
      .replace("Catálogo y navegación optimizados", "Catálogo y navegación optimizados")
      .replace("Envíos y pasarela de pago configurados", "Envíos y pasarela configurados")
      .replace("Estructura ecommerce optimizada", "Estructura ecommerce optimizada")
      .replace("Categorías y navegación mejoradas", "Categorías y navegación mejoradas")
      .replace("Pasarela de pago incluida", "Pasarela de pago incluida")
      .replace("Estructura comercial optimizada", "Estructura comercial optimizada")
      .replace("Migración base y estructura avanzada", "Migración base y estructura avanzada")
      .replace("Landing pages comerciales", "Landing pages comerciales")
      .replace("Integraciones operativas avanzadas", "Integraciones operativas avanzadas")
      .replace("Verificación de fotografías y apoyo visual", "Verificación de fotografías y apoyo visual");
  };

  const syncPlatformPlanPrices = () => {
    document.querySelectorAll<HTMLElement>(".plan-price").forEach((node) => {
      const base = Number(node.dataset.basePrice || "0");
      const planId = node.dataset.planId || null;
      node.textContent = `${getPlatformPrice(base, planId).toLocaleString("es-CL")} CLP`;
    });
  };

  const syncPasarelaRules = () => {
    const planKey = getSelectedPlan();
    const sinPasarela = document.getElementById("sinPasarela") as HTMLInputElement;
    const hint = document.getElementById("sinPasarelaHint") as HTMLElement;
    if (planKey === "express") {
      sinPasarela.checked = false;
      sinPasarela.disabled = true;
      hint.textContent = "Plan Express requiere pasarela de pago incluida. Esta opción no aplica.";
    } else {
      sinPasarela.disabled = false;
      hint.textContent = "Disponible para Plan Tienda Completa, Tienda Pro y Tienda Elite.";
    }
  };

  const syncSupportRules = () => {
    const planKey = getSelectedPlan();
    const includeSupport = document.getElementById("incluirSoporte") as HTMLInputElement;
    const hint = document.getElementById("incluirSoporteHint") as HTMLElement;
    const supportLabel = document.getElementById("incluirSoporteLabel") as HTMLElement;
    const supportDetail = document.getElementById("incluirSoporteDetail") as HTMLElement;
    const support = getSupportInfo();
    supportLabel.textContent = support.label;
    supportDetail.textContent = `Detalle: ${support.detail}`;
    const mandatory = planKey === "completa" || planKey === "pro" || planKey === "elite";
    if (mandatory) {
      includeSupport.checked = true;
      includeSupport.disabled = true;
      hint.textContent = "Obligatorio para planes Tienda Completa, Tienda Pro y Tienda Elite.";
    } else {
      includeSupport.disabled = false;
      hint.textContent = "Opcional para Plan Tienda Express. Obligatorio para planes Tienda Completa, Tienda Pro y Tienda Elite.";
    }
  };

  const buildExtrasPreview = (extrasCore: string[]) => (extrasCore.length ? extrasCore.join(", ") : "Sin extras seleccionados.");

  const applyNoGatewayScopeRules = (scope: string[]) => {
    const noGatewayScope = scope.filter((line) => !/(carrito|checkout|pasarela)/i.test(line));
    const leadLine = "Canal comercial por WhatsApp y formulario para captar oportunidades";
    if (!noGatewayScope.some((line) => line.toLowerCase().includes("whatsapp") && line.toLowerCase().includes("formulario"))) {
      noGatewayScope.push(leadLine);
    }
    return noGatewayScope;
  };

  const buildOutputText = (params: any) => {
    const support = getSupportInfo();
    const scope = [...params.planScope, ...params.extrasDetails.map((d: string) => `Extra: ${d}`)];
    return [
      "Cotización Ecommerce - VIN Studio",
      "",
      `Cliente: ${params.cliente || "-"}`,
      `Empresa: ${params.empresa || "-"}`,
      `Email: ${params.email || "-"}`,
      `WhatsApp: ${params.whatsapp || "-"}`,
      "",
      `Plan elegido: ${params.planName}`,
      `Implementación: ${formatClp(params.planPrice)}`,
      "Lo que conseguirás con este plan:",
      ...scope.map((s) => `- ${s}`),
      "",
      "No incluye este plan:",
      ...params.planExclusions.map((s: string) => `- ${s}`),
      "",
      `Extras (${params.extrasNames.length ? params.extrasNames.join(", ") : "Sin extras"}): ${formatClp(params.extrasTotal)}`,
      `Descuento: ${params.discountTotal ? `-${formatClp(params.discountTotal)}` : "$0 CLP"}`,
      "",
      `Total inicial estimado: ${formatClp(params.total)}`,
      "",
      "Continuidad:",
      params.includeSupport ? support.continuity : "Soporte+ mensual no incluido en esta cotización.",
    ].join("\n");
  };

  const calculate = () => {
    const selectedPlanKey = getSelectedPlan();
    if (!selectedPlanKey) {
      alert("Selecciona un plan para calcular la cotización.");
      return;
    }

    const platform = getSelectedPlatform();
    const platformLabel = platform === "wordpress" ? "Hosting Propio" : "Shopify";
    const support = getSupportInfo();
    const selectedPlan = planMap[selectedPlanKey as keyof typeof planMap];
    const planPrice = getPlatformPrice(selectedPlan.basePrice, selectedPlanKey);

    const selectedExtras = getSelectedExtras();
    const extrasNames: string[] = [];
    const extrasCore: string[] = [];
    const extrasDetails: string[] = [];
    let extrasTotal = 0;
    selectedExtras.forEach((key) => {
      const item = extrasMap[key];
      if (!item) return;
      extrasNames.push(adaptTextForPlatform(item.name, platform));
      extrasCore.push(item.core);
      extrasDetails.push(adaptTextForPlatform(item.detail, platform));
      extrasTotal += item.price;
    });

    const sinPasarela = (document.getElementById("sinPasarela") as HTMLInputElement).checked;
    if (selectedPlanKey === "express" && sinPasarela) {
      alert("El Plan Express requiere pasarela de pago.");
      return;
    }
    const includeSupport = (document.getElementById("incluirSoporte") as HTMLInputElement).checked;
    const discountTotal = sinPasarela ? PASARELA_DISCOUNT : 0;
    const total = planPrice + extrasTotal - discountTotal;

    const exclusions =
      platform === "wordpress"
        ? selectedPlan.exclusions.filter((item) => !item.toLowerCase().includes("plataforma"))
        : selectedPlan.exclusions;
    let adaptedScope = selectedPlan.scope.map((item) => adaptTextForPlatform(item, platform));
    if (sinPasarela) {
      adaptedScope = applyNoGatewayScopeRules(adaptedScope);
    }
    if (platform === "wordpress") {
      adaptedScope.push("1 servicio a elección gratis en la primera implementación para acelerar tu lanzamiento");
    }
    const adaptedExclusions = exclusions.map((item) => adaptTextForPlatform(item, platform));

    (document.getElementById("outCliente") as HTMLElement).textContent = (document.getElementById("clienteNombre") as HTMLInputElement).value.trim() || "-";
    (document.getElementById("outEmpresa") as HTMLElement).textContent = (document.getElementById("clienteEmpresa") as HTMLInputElement).value.trim() || "-";
    (document.getElementById("outPlan") as HTMLElement).textContent = `${selectedPlan.name} (${platformLabel})`;
    (document.getElementById("outImplementacion") as HTMLElement).textContent = formatClp(planPrice);
    (document.getElementById("outExtras") as HTMLElement).textContent = formatClp(extrasTotal);
    (document.getElementById("outExtrasDetalle") as HTMLElement).textContent = buildExtrasPreview(extrasCore);
    (document.getElementById("outDescuento") as HTMLElement).textContent = discountTotal ? `- ${formatClp(discountTotal)}` : "$0 CLP";
    (document.getElementById("outMotivoDescuento") as HTMLElement).textContent = discountTotal ? "Descuento por implementación sin pasarela de pago." : "-";
    (document.getElementById("outTotal") as HTMLElement).textContent = formatClp(total);
    (document.getElementById("outContinuidad") as HTMLElement).textContent = includeSupport ? support.continuity : "Soporte+ mensual no incluido en esta cotización";
    (document.getElementById("outContinuidadDetalle") as HTMLElement).textContent = support.detail;
    (document.getElementById("outContinuidadImportante") as HTMLElement).textContent = support.note;

    const scopeList = document.getElementById("outScopeList") as HTMLUListElement;
    scopeList.innerHTML = "";
    [...adaptedScope, ...extrasDetails.map((d) => `Extra: ${d}`)].forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      scopeList.appendChild(li);
    });

    const exclusionsList = document.getElementById("outExclusionsList") as HTMLUListElement;
    exclusionsList.innerHTML = "";
    adaptedExclusions.forEach((line) => {
      const li = document.createElement("li");
      li.textContent = line;
      exclusionsList.appendChild(li);
    });

    (document.getElementById("outputTexto") as HTMLTextAreaElement).value = buildOutputText({
      cliente: (document.getElementById("clienteNombre") as HTMLInputElement).value.trim(),
      empresa: (document.getElementById("clienteEmpresa") as HTMLInputElement).value.trim(),
      email: (document.getElementById("clienteEmail") as HTMLInputElement).value.trim(),
      whatsapp: (document.getElementById("clienteWhatsapp") as HTMLInputElement).value.trim(),
      planName: `${selectedPlan.name} (${platformLabel})`,
      planPrice,
      planScope: adaptedScope,
      planExclusions: adaptedExclusions,
      extrasNames,
      extrasDetails,
      extrasTotal,
      discountTotal,
      total,
      includeSupport,
    });
  };

  const collectQuoteData = () => {
    const text = (document.getElementById("outputTexto") as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert("Primero calcula una cotización.");
      return null;
    }
    const empresa = (document.getElementById("clienteEmpresa") as HTMLInputElement).value.trim() || "Empresa";
    const fileCompany = empresa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
    return {
      fileName: `Cotizacion+${fileCompany || "empresa"}.pdf`,
      dateText: new Date().toLocaleDateString("es-CL"),
      clientName: (document.getElementById("clienteNombre") as HTMLInputElement).value.trim() || "-",
      companyName: empresa,
      email: (document.getElementById("clienteEmail") as HTMLInputElement).value.trim() || "-",
      whatsapp: (document.getElementById("clienteWhatsapp") as HTMLInputElement).value.trim() || "-",
      signatureName: (document.getElementById("firmaNombre") as HTMLInputElement).value.trim() || "",
      signatureDate: (document.getElementById("firmaFecha") as HTMLInputElement).value.trim() || "",
      planName: (document.getElementById("outPlan") as HTMLElement).textContent?.trim() || "-",
      implementation: (document.getElementById("outImplementacion") as HTMLElement).textContent?.trim() || "$0 CLP",
      extras: (document.getElementById("outExtras") as HTMLElement).textContent?.trim() || "$0 CLP",
      extrasDetails: ((document.getElementById("outExtrasDetalle") as HTMLElement).textContent || "").split(",").map((v) => v.trim()).filter(Boolean),
      discount: (document.getElementById("outDescuento") as HTMLElement).textContent?.trim() || "$0 CLP",
      discountReason: (document.getElementById("outMotivoDescuento") as HTMLElement).textContent?.trim() || "-",
      total: (document.getElementById("outTotal") as HTMLElement).textContent?.trim() || "$0 CLP",
      continuity: `${(document.getElementById("outContinuidad") as HTMLElement).textContent || ""}. Detalle mensual: ${(document.getElementById("outContinuidadDetalle") as HTMLElement).textContent || ""}`,
      scopeItems: Array.from(document.querySelectorAll("#outScopeList li")).map((li) => li.textContent?.trim() || "").filter(Boolean),
      exclusionItems: Array.from(document.querySelectorAll("#outExclusionsList li")).map((li) => li.textContent?.trim() || "").filter(Boolean),
      supportItems: [
        "Soporte técnico continuo",
        "Hasta 20 solicitudes de cambio mensuales",
        "Ajustes operativos (textos, imágenes, estructura simple)",
        "Capacitación inicial",
        "Atención por WhatsApp (08:30 a 17:30)",
        "Tiempo de respuesta: hasta 30 minutos",
        "Supervisión básica de funcionamiento",
      ],
      paymentTerms: [
        "Al aceptar la cotización se cancela el 50% del total inicial.",
        "Luego se realiza una revisión de conformidad.",
        "Posterior a la conformidad se cancela el 50% restante del total inicial + soporte mensual.",
      ],
      commercialTerms: [
        (document.getElementById("outContinuidadImportante") as HTMLElement).textContent || "",
        "Todo requerimiento fuera de alcance se cotiza por separado.",
      ],
    };
  };

  btnCalcular.addEventListener("click", calculate);
  document.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((r) => r.addEventListener("change", () => {
    syncPasarelaRules();
    syncSupportRules();
  }));
  document.querySelectorAll<HTMLInputElement>('input[name="platformModel"]').forEach((r) => r.addEventListener("change", () => {
    syncPlatformPlanPrices();
    syncPasarelaRules();
    syncSupportRules();
  }));
  syncPlatformPlanPrices();
  syncPasarelaRules();
  syncSupportRules();

  document.getElementById("btnCopiar")?.addEventListener("click", async () => {
    const text = (document.getElementById("outputTexto") as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert("Primero calcula una cotización.");
      return;
    }
    await navigator.clipboard.writeText(text);
    alert("Cotización copiada.");
  });

  document.getElementById("btnExportarPdf")?.addEventListener("click", async () => {
    const quoteData = collectQuoteData();
    if (!quoteData) return;
    if (!quoteData.signatureName) {
      alert("Completa el nombre de firma del cliente antes de generar el PDF Pro.");
      return;
    }
    if (quoteData.email === "-" || !EMAIL_REGEX.test(quoteData.email)) {
      alert("Ingresa un email válido del cliente para enviar la copia firmada.");
      return;
    }

    try {
      const response = await fetch("/api/quote-pro-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quoteData),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || "No fue posible generar el PDF Pro.");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = quoteData.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "No fue posible generar el PDF.");
    }
  });

  document.getElementById("btnLimpiar")?.addEventListener("click", () => {
    ["clienteNombre", "clienteEmpresa", "clienteEmail", "clienteWhatsapp", "firmaNombre", "firmaFecha"].forEach((id) => {
      const input = document.getElementById(id) as HTMLInputElement | null;
      if (input) input.value = "";
    });
    document.querySelectorAll<HTMLInputElement>('input[name="plan"],input[data-extra-option="1"],#sinPasarela').forEach((el) => (el.checked = false));
    (document.querySelector<HTMLInputElement>('input[name="platformModel"][value="shopify"]') as HTMLInputElement).checked = true;
    (document.getElementById("incluirSoporte") as HTMLInputElement).checked = true;
    (document.getElementById("outCliente") as HTMLElement).textContent = "-";
    (document.getElementById("outEmpresa") as HTMLElement).textContent = "-";
    (document.getElementById("outPlan") as HTMLElement).textContent = "-";
    (document.getElementById("outImplementacion") as HTMLElement).textContent = "$0 CLP";
    (document.getElementById("outExtras") as HTMLElement).textContent = "$0 CLP";
    (document.getElementById("outExtrasDetalle") as HTMLElement).textContent = "Sin extras seleccionados.";
    (document.getElementById("outDescuento") as HTMLElement).textContent = "$0 CLP";
    (document.getElementById("outMotivoDescuento") as HTMLElement).textContent = "-";
    (document.getElementById("outTotal") as HTMLElement).textContent = "$0 CLP";
    (document.getElementById("outContinuidad") as HTMLElement).textContent = "Soporte+ mensual: $100.000 CLP/mes";
    (document.getElementById("outContinuidadDetalle") as HTMLElement).textContent = "$65.000 plataforma + $35.000 soporte.";
    (document.getElementById("outContinuidadImportante") as HTMLElement).textContent =
      "Durante los primeros 3 meses de contratación, el costo de plataforma lo asumimos nosotros. Desde el 4to mes, el cliente paga la plataforma y no está obligado a mantener el plan de soporte.";
    (document.getElementById("incluirSoporteLabel") as HTMLElement).textContent = "Incluir Soporte+ mensual: $100.000 CLP";
    (document.getElementById("incluirSoporteDetail") as HTMLElement).textContent = "Detalle: $65.000 plataforma + $35.000 soporte.";
    (document.getElementById("outScopeList") as HTMLElement).innerHTML = "<li>Selecciona un plan para ver detalle.</li>";
    (document.getElementById("outExclusionsList") as HTMLElement).innerHTML = "<li>Selecciona un plan para ver exclusiones.</li>";
    (document.getElementById("outputTexto") as HTMLTextAreaElement).value = "";
    syncPlatformPlanPrices();
    syncPasarelaRules();
    syncSupportRules();
  });
};
