export const initCotizador = () => {
  const btnCalcular = document.getElementById('btnCalcular');
  if (!btnCalcular) return;
  if ((btnCalcular as HTMLButtonElement).dataset.cotizadorBound === '1') return;
  (btnCalcular as HTMLButtonElement).dataset.cotizadorBound = '1';

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

  const formatClp = (value: number) => `$${Number(value || 0).toLocaleString('es-CL')} CLP`;
  const planMap = {
    express: {
      name: 'Plan Tienda Express',
      price: 99990,
      scope: [
        'Tienda funcional básica lista para vender',
        'Hasta 10 productos cargados',
        'Configuración general de catálogo y navegación',
        'Configuración simple de envíos',
        'Pasarela de pago incluida en la implementación',
        'Verificación de fotografías y apoyo para material visual',
      ],
      exclusions: [
        'Compra de dominio y renovaciones',
        'Costo mensual de plataforma (desde mes 4)',
        'Servicios de correo corporativo',
        'Gestión de campañas publicitarias',
        'Desarrollo personalizado avanzado',
        'Apps o licencias pagadas de terceros',
      ],
    },
    completa: {
      name: 'Plan Tienda Completa',
      price: 249990,
      scope: [
        'Hasta 20 productos',
        'Estructura optimizada de tienda',
        'Emails automáticos básicos',
        'Navegación y categorías mejoradas',
        'Verificación de fotografías y apoyo para material visual',
      ],
      exclusions: [
        'Compra de dominio y renovaciones',
        'Costo mensual de plataforma (desde mes 4)',
        'Servicios de correo corporativo',
        'Gestión de campañas publicitarias',
        'Integraciones complejas no cotizadas',
        'Apps o licencias pagadas de terceros',
      ],
    },
    pro: {
      name: 'Plan Tienda Pro',
      price: 399990,
      scope: [
        'Hasta 50 productos',
        'Compra de dominio y renovación por 1 año',
        'Desarrollo a medida',
        'Configuración de conversión (carrito y checkout)',
        'Categorías, fichas y estructura comercial optimizada',
        'SEO base de tienda y productos',
        'Verificación de fotografías y apoyo para material visual',
      ],
      exclusions: [
        'Costo mensual de plataforma (desde mes 4)',
        'Servicios de correo corporativo',
        'Gestión publicitaria mensual (Meta/Google)',
        'Apps o licencias pagadas de terceros',
      ],
    },
    elite: {
      name: 'Plan Tienda Elite',
      price: 649990,
      scope: [
        'Hasta 100 productos',
        'Migración básica',
        'Landing pages',
        'Fotografia + contenido visual',
        'Integración WhatsApp API + bot de ventas y soporte',
        'Integración Shopify con marketplaces',
        'Integraciones operativas avanzadas',
        'Verificación de fotografías y apoyo para material visual',
      ],
      exclusions: [
        'Compra de dominio y renovaciones',
        'Costo mensual de plataforma (desde mes 4)',
        'Servicios de correo corporativo',
        'Gestión publicitaria mensual (Meta/Google)',
        'Automatizaciones avanzadas fuera de alcance',
        'Apps o licencias pagadas de terceros',
      ],
    },
  } as const;
  const extrasMap: Record<string, { name: string; core: string; price: number; detail: string }> = {
    productos_extra: {
      name: 'Carga extra de productos sin límite + colecciones detalladas, filtros de búsqueda y optimización de navegación',
      core: 'Carga productos',
      price: 100000,
      detail: 'Carga de productos sin límite con organización por colecciones, filtros de búsqueda y navegación optimizada.',
    },
    optimizacion_colecciones: {
      name: 'Optimización de colecciones, filtros y navegación',
      core: 'Colecciones y filtros',
      price: 80000,
      detail: 'Optimización de arquitectura de categorías, colecciones y filtros para mejorar la experiencia de compra.',
    },
    integracion_adicional: {
      name: 'Integraciones con apps y servicios externos',
      core: 'Apps externas',
      price: 40000,
      detail: 'Conexión con apps o servicios externos compatibles con Shopify según requerimiento del negocio.',
    },
    integracion_erp_crm: {
      name: 'Integración ERP / CRM / facturación',
      core: 'ERP/CRM',
      price: 220000,
      detail: 'Integración operativa con ERP/CRM/facturación para sincronizar datos comerciales y operativos.',
    },
    desarrollo_medida: {
      name: 'Desarrollo Shopify a medida',
      core: 'Dev a medida',
      price: 80000,
      detail: 'Desarrollo personalizado en Shopify para funcionalidades específicas del modelo de negocio.',
    },
    fotografia_adicional: {
      name: 'Fotografía adicional de productos',
      core: 'Fotografía',
      price: 60000,
      detail: 'Producción de fotografías adicionales de producto para mejorar presentación del catálogo.',
    },
    seo_tecnico: {
      name: 'SEO técnico para Shopify',
      core: 'SEO técnico',
      price: 70000,
      detail: 'Ajustes técnicos de SEO on-site para mejorar indexación y visibilidad orgánica de la tienda.',
    },
    email_corporativo: {
      name: 'Configuración email corporativo',
      core: 'Email corporativo',
      price: 45000,
      detail: 'Configuración y puesta en marcha de correo corporativo asociado al dominio del cliente.',
    },
    tracking_marketing_full: {
      name: 'Configuración GA4, GTM, Meta Pixel y TikTok Pixel',
      core: 'Tracking',
      price: 110000,
      detail: 'Implementación de medición y tracking comercial para campañas y análisis de conversiones.',
    },
    flows_email_marketing: {
      name: 'Email marketing flows (bienvenida, abandono, post-compra)',
      core: 'Flows email',
      price: 140000,
      detail: 'Configuración de automatizaciones de email para bienvenida, recuperación y post-compra.',
    },
    setup_campanas_landing: {
      name: 'Setup de campañas (Meta/Google) + landing page',
      core: 'Setup campañas + landing',
      price: 180000,
      detail: 'Configuración inicial de campañas con landing enfocada en captación o conversión.',
    },
    marketplace_sync: {
      name: 'Sincronización Shopify con marketplace',
      core: 'Marketplace',
      price: 120000,
      detail: 'Sincronización de catálogo y operación entre Shopify y marketplaces seleccionados.',
    },
    integracion_logistica: {
      name: 'Integración logística y couriers',
      core: 'Logística',
      price: 130000,
      detail: 'Integración logística con couriers para cálculo de envíos y trazabilidad de pedidos.',
    },
    whatsapp_api_bot: {
      name: 'WhatsApp API + bot básico de ventas/soporte',
      core: 'WhatsApp API + bot',
      price: 160000,
      detail: 'Implementación de WhatsApp API con bot básico para atención comercial y soporte.',
    },
    capacitacion_equipo: {
      name: 'Capacitación comercial para equipo',
      core: 'Capacitación comercial',
      price: 55000,
      detail: 'Capacitación práctica para el equipo en gestión comercial y operación del ecommerce.',
    },
  };
  const PASARELA_DISCOUNT = 100000;

  const getSelectedPlan = () => {
    const selected = document.querySelector<HTMLInputElement>('input[name="plan"]:checked');
    return selected ? selected.value : null;
  };

  const syncPasarelaRules = () => {
    const selectedPlanKey = getSelectedPlan();
    const sinPasarela = document.getElementById('sinPasarela') as HTMLInputElement;
    const hint = document.getElementById('sinPasarelaHint');
    const isExpress = selectedPlanKey === 'express';

    if (isExpress) {
      sinPasarela.checked = false;
      sinPasarela.disabled = true;
      if (hint) hint.textContent = 'Plan Express requiere pasarela de pago incluida. Esta opción no aplica.';
    } else {
      sinPasarela.disabled = false;
      if (hint) hint.textContent = 'Disponible para Plan Completa, Pro y Elite.';
    }
  };

  const syncSupportRules = () => {
    const selectedPlanKey = getSelectedPlan();
    const includeSupport = document.getElementById('incluirSoporte') as HTMLInputElement;
    const hint = document.getElementById('incluirSoporteHint');
    const isMandatorySupportPlan = selectedPlanKey === 'completa' || selectedPlanKey === 'pro' || selectedPlanKey === 'elite';

    if (isMandatorySupportPlan) {
      includeSupport.checked = true;
      includeSupport.disabled = true;
      if (hint) hint.textContent = 'Obligatorio para planes Tienda Completa, Tienda Pro y Tienda Elite.';
      return;
    }

    includeSupport.disabled = false;
    if (hint) hint.textContent = 'Opcional para Plan Tienda Express. Obligatorio para Completa, Pro y Elite.';
  };

  const getSelectedExtras = () => Array.from(document.querySelectorAll<HTMLInputElement>('input[data-extra-option="1"]:checked')).map((el) => el.value);

  const buildExtrasPreview = (extrasCore: string[]) => {
    if (!extrasCore.length) return 'Sin extras seleccionados.';

    const shorten = (value: string, maxLen = 24) => (value.length > maxLen ? `${value.slice(0, maxLen - 3)}...` : value);
    const joined = extrasCore.map((name) => shorten(name)).join(', ');
    const maxPreviewLen = 88;
    return joined.length > maxPreviewLen ? `${joined.slice(0, maxPreviewLen - 3)}...` : joined;
  };

  const buildOutputText = ({ cliente, empresa, email, whatsapp, planName, planPrice, planScope, planExclusions, extrasNames, extrasDetails, extrasTotal, discountTotal, total, includeSupport }: any) => {
    const extrasLine = extrasNames.length ? extrasNames.join(', ') : 'Sin extras';
    const combinedScope = [...(planScope || []), ...(extrasDetails || [])];
    const scopeLines = combinedScope.map((line: string) => `- ${line}`);
    const exclusionLines = (planExclusions || []).map((line: string) => `- ${line}`);
    const extraDetailLines = (extrasDetails || []).map((line: string) => `- ${line}`);
    const discountReason = discountTotal > 0 ? 'Descuento por implementación sin pasarela de pago.' : 'Sin descuento aplicado.';
    const discountLine = discountTotal > 0 ? `-${formatClp(discountTotal)}` : '$0 CLP';
    const supportLine = includeSupport
      ? 'Soporte+ mensual: $100.000 CLP/mes (detalle: $65.000 plataforma + $35.000 soporte).'
      : 'Soporte+ mensual no incluido en esta cotización.';
    return [
      'Cotización Ecommerce - VIN Studio',
      '',
      `Cliente: ${cliente || '-'}`,
      `Empresa: ${empresa || '-'}`,
      `Email: ${email || '-'}`,
      `WhatsApp: ${whatsapp || '-'}`,
      '',
      `Plan elegido: ${planName}`,
      `Implementación: ${formatClp(planPrice)}`,
      'Alcance del plan:',
      ...scopeLines,
      '',
      'No incluye este plan:',
      ...exclusionLines,
      '',
      `Extras (${extrasLine}): ${formatClp(extrasTotal)}`,
      ...(extraDetailLines.length
        ? [
            'Detalle de extras incluidos:',
            ...extraDetailLines,
            '',
          ]
        : []),
      `Descuento: ${discountLine}`,
      `Motivo descuento: ${discountReason}`,
      '',
      `Total inicial estimado: ${formatClp(total)}`,
      '',
      'Continuidad:',
      supportLine,
      'Durante los primeros 3 meses de contratacion el costo de plataforma lo asumimos nosotros.',
      'A partir del 4to mes el cliente paga la plataforma.',
      'El cliente no esta obligado a mantener el plan de soporte.',
      '',
      'Condición de pago:',
      '- Al aceptar la cotización se cancela el 50% del total inicial.',
      '- Luego se realiza revisión de conformidad.',
      '- Posterior a la conformidad se cancela el 50% restante del total inicial + soporte mensual.',
      '',
      'Alcance Soporte+ (global):',
      '- Soporte técnico continuo',
      '- Hasta 20 solicitudes de cambio mensuales',
      '- Ajustes operativos (textos, imágenes, estructura simple)',
      '- Capacitación inicial',
      '- Atencion por WhatsApp (08:30 a 17:30)',
      '- Tiempo de respuesta: hasta 30 minutos',
      '- Supervisión básica de funcionamiento',
      '',
      'Condiciones:',
      '- Contrato mínimo: 3 meses',
      '- Mientras corre el plazo de suscripción, la operación se gestiona bajo este modelo',
      '- Al terminar el plazo, se entrega acceso a la plataforma de desarrollo',
      '- Todo lo que quede fuera del alcance se cotiza por separado',
      '- Funcionalidades a medida se cotizan por separado',
      '- Servicio digital no reembolsable',
    ].join('\n');
  };

  const calculate = () => {
    const cliente = (document.getElementById('clienteNombre') as HTMLInputElement).value.trim();
    const empresa = (document.getElementById('clienteEmpresa') as HTMLInputElement).value.trim();
    const email = (document.getElementById('clienteEmail') as HTMLInputElement).value.trim();
    const whatsapp = (document.getElementById('clienteWhatsapp') as HTMLInputElement).value.trim();

    const selectedPlanKey = getSelectedPlan();
    if (!selectedPlanKey) {
      alert('Selecciona un plan para calcular la cotización.');
      return;
    }

    const selectedPlan = planMap[selectedPlanKey as keyof typeof planMap];
    if (selectedPlanKey === 'express' && (document.getElementById('sinPasarela') as HTMLInputElement).checked) {
      alert('El Plan Express requiere pasarela de pago. No se puede aplicar descuento sin pasarela.');
      return;
    }

    const selectedExtras = getSelectedExtras();
    let extrasTotal = 0;
    const extrasNames: string[] = [];
    const extrasCore: string[] = [];
    const extrasDetails: string[] = [];
    selectedExtras.forEach((key) => {
      if (extrasMap[key]) {
        extrasTotal += extrasMap[key].price;
        extrasNames.push(extrasMap[key].name);
        extrasCore.push(extrasMap[key].core);
        extrasDetails.push(`Extra: ${extrasMap[key].detail}`);
      }
    });

    const sinPasarela = (document.getElementById('sinPasarela') as HTMLInputElement).checked;
    const includeSupport = (document.getElementById('incluirSoporte') as HTMLInputElement).checked;
    const discountTotal = sinPasarela ? PASARELA_DISCOUNT : 0;
    const discountReason = sinPasarela ? 'Descuento por implementacion sin pasarela de pago.' : '-';
    const total = selectedPlan.price + extrasTotal - discountTotal;

    (document.getElementById('outCliente') as HTMLElement).textContent = cliente || '-';
    (document.getElementById('outEmpresa') as HTMLElement).textContent = empresa || '-';
    (document.getElementById('outPlan') as HTMLElement).textContent = selectedPlan.name;
    (document.getElementById('outImplementacion') as HTMLElement).textContent = formatClp(selectedPlan.price);
    (document.getElementById('outExtras') as HTMLElement).textContent = formatClp(extrasTotal);
    (document.getElementById('outExtrasDetalle') as HTMLElement).textContent = buildExtrasPreview(extrasCore);
    (document.getElementById('outDescuento') as HTMLElement).textContent = discountTotal ? `- ${formatClp(discountTotal)}` : '$0 CLP';
    (document.getElementById('outMotivoDescuento') as HTMLElement).textContent = discountReason;
    (document.getElementById('outTotal') as HTMLElement).textContent = formatClp(total);
    (document.getElementById('outContinuidad') as HTMLElement).textContent = includeSupport
      ? 'Soporte+ mensual: $100.000 CLP/mes'
      : 'Soporte+ mensual no incluido en esta cotización';

    const scopeList = document.getElementById('outScopeList') as HTMLUListElement;
    scopeList.innerHTML = '';
    selectedPlan.scope.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      scopeList.appendChild(li);
    });
    extrasDetails.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      scopeList.appendChild(li);
    });

    const exclusionsList = document.getElementById('outExclusionsList') as HTMLUListElement;
    exclusionsList.innerHTML = '';
    selectedPlan.exclusions.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      exclusionsList.appendChild(li);
    });

    (document.getElementById('outputTexto') as HTMLTextAreaElement).value = buildOutputText({
      cliente,
      empresa,
      email,
      whatsapp,
      planName: selectedPlan.name,
      planPrice: selectedPlan.price,
      planScope: selectedPlan.scope,
      planExclusions: selectedPlan.exclusions,
      extrasNames,
      extrasDetails,
      extrasTotal,
      discountTotal,
      total,
      includeSupport,
    });
  };

  btnCalcular.addEventListener('click', calculate);
  document.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((radio) => radio.addEventListener('change', () => {
    syncPasarelaRules();
    syncSupportRules();
  }));
  syncPasarelaRules();
  syncSupportRules();

  document.getElementById('btnCopiar')?.addEventListener('click', async () => {
    const text = (document.getElementById('outputTexto') as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert('Primero calcula una cotización.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      alert('Cotización copiada.');
    } catch {
      alert('No se pudo copiar automaticamente.');
    }
  });

  const collectQuoteData = () => {
    const text = (document.getElementById('outputTexto') as HTMLTextAreaElement).value;
    const cliente = (document.getElementById('clienteNombre') as HTMLInputElement).value.trim() || 'cliente';
    const empresa = (document.getElementById('clienteEmpresa') as HTMLInputElement).value.trim() || 'Empresa';
    if (!text.trim()) {
      alert('Primero calcula una cotización.');
      return null;
    }

    const sanitizedCompany = empresa.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase();
    const fileTitle = `Cotizacion+${sanitizedCompany || 'empresa'}.pdf`;
    const now = new Date();
    const outPlan = (document.getElementById('outPlan') as HTMLElement).textContent?.trim() || '-';
    const outImplementacion = (document.getElementById('outImplementacion') as HTMLElement).textContent?.trim() || '$0 CLP';
    const outExtras = (document.getElementById('outExtras') as HTMLElement).textContent?.trim() || '$0 CLP';
    const outDescuento = (document.getElementById('outDescuento') as HTMLElement).textContent?.trim() || '$0 CLP';
    const outMotivoDescuento = (document.getElementById('outMotivoDescuento') as HTMLElement).textContent?.trim() || '-';
    const outTotal = (document.getElementById('outTotal') as HTMLElement).textContent?.trim() || '$0 CLP';
    const outContinuidad = (document.getElementById('outContinuidad') as HTMLElement).textContent?.trim() || '-';
    const selectedExtrasDescriptions = getSelectedExtras()
      .map((key) => (extrasMap[key] ? extrasMap[key].core : ''))
      .filter(Boolean);
    const scopeItems = Array.from(document.querySelectorAll('#outScopeList li')).map((li) => li.textContent?.trim() || '').filter(Boolean);
    const exclusionItems = Array.from(document.querySelectorAll('#outExclusionsList li')).map((li) => li.textContent?.trim() || '').filter(Boolean);
    const supportItems = [
      'Soporte técnico continuo',
      'Hasta 20 solicitudes de cambio mensuales',
      'Ajustes operativos (textos, imágenes, estructura simple)',
      'Capacitación inicial',
      'Atencion por WhatsApp (08:30 a 17:30)',
      'Tiempo de respuesta: hasta 30 minutos',
      'Supervisión básica de funcionamiento',
    ];
    const paymentTerms = [
      'Al aceptar la cotización se cancela el 50% del total inicial.',
      'Luego se realiza una revisión de conformidad.',
      'Posterior a la conformidad se cancela el 50% restante del total inicial + soporte mensual .',
    ];

    return {
      cliente,
      empresa,
      fileTitle,
      now,
      outPlan,
      outImplementacion,
      outExtras,
      outDescuento,
      outMotivoDescuento,
      outTotal,
      outContinuidad,
      selectedExtrasDescriptions,
      scopeItems,
      exclusionItems,
      supportItems,
      paymentTerms,
      email: (document.getElementById('clienteEmail') as HTMLInputElement).value.trim() || '-',
      whatsapp: (document.getElementById('clienteWhatsapp') as HTMLInputElement).value.trim() || '-',
      signatureName: (document.getElementById('firmaNombre') as HTMLInputElement | null)?.value.trim() || '',
      signatureDate: (document.getElementById('firmaFecha') as HTMLInputElement | null)?.value.trim() || '',
    };
  };

  document.getElementById('btnExportarPdf')?.addEventListener('click', async () => {
    const quoteData = collectQuoteData();
    if (!quoteData) return;

    if (!quoteData.signatureName) {
      alert('Completa el nombre de firma del cliente antes de generar el PDF Pro.');
      return;
    }

    if (quoteData.email === '-' || !isValidEmail(quoteData.email)) {
      alert('Ingresa un email válido del cliente para enviar la copia firmada.');
      return;
    }

    try {
      const payload = {
        fileName: quoteData.fileTitle,
        dateText: quoteData.now.toLocaleDateString('es-CL'),
        clientName: quoteData.cliente,
        companyName: quoteData.empresa,
        email: quoteData.email,
        whatsapp: quoteData.whatsapp,
        signatureName: quoteData.signatureName,
        signatureDate: quoteData.signatureDate,
        planName: quoteData.outPlan,
        implementation: quoteData.outImplementacion,
        extras: quoteData.outExtras,
        extrasDetails: quoteData.selectedExtrasDescriptions,
        discount: quoteData.outDescuento,
        discountReason: quoteData.outMotivoDescuento,
        total: quoteData.outTotal,
        continuity: `${quoteData.outContinuidad}. Detalle mensual: $65.000 plataforma + $35.000 soporte.`,
        scopeItems: quoteData.scopeItems,
        exclusionItems: quoteData.exclusionItems,
        supportItems: quoteData.supportItems,
        paymentTerms: quoteData.paymentTerms,
        commercialTerms: [
          'Durante los primeros 3 meses de contratacion, VIN Studio asume el costo de plataforma.',
          'Desde el mes 4, el cliente paga directamente la plataforma.',
          'La continuidad de Soporte+ es opcional.',
          'Todo requerimiento fuera de alcance se cotiza por separado.',
          'Al finalizar el plazo contratado, se entrega acceso a la plataforma.',
        ],
      };

      const response = await fetch('/api/quote-pro-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = 'No fue posible generar el PDF Pro.';
        try {
          const errorPayload = await response.json();
          if (errorPayload?.error) {
            const details = errorPayload?.details ? ` ${String(errorPayload.details)}` : '';
            message = `${String(errorPayload.error)}${details}`;
          }
        } catch {
          // Keep generic fallback
        }
        throw new Error(message);
      }

      const emailDelivery = response.headers.get('X-Email-Delivery');
      const encodedEmailError = response.headers.get('X-Email-Error') || '';

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = payload.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      if (emailDelivery === 'failed') {
        let emailErrorMessage = 'No fue posible enviar la copia firmada por email.';
        try {
          if (encodedEmailError) {
            const decoded = decodeURIComponent(encodedEmailError);
            if (decoded) emailErrorMessage = decoded;
          }
        } catch {
          // Keep fallback if header is malformed.
        }
        alert(`PDF generado correctamente. Aviso de envío: ${emailErrorMessage}`);
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'No fue posible generar el PDF. Intenta nuevamente.';
      alert(message);
    }
  });

  document.getElementById('btnLimpiar')?.addEventListener('click', () => {
    (document.getElementById('clienteNombre') as HTMLInputElement).value = '';
    (document.getElementById('clienteEmpresa') as HTMLInputElement).value = '';
    (document.getElementById('clienteEmail') as HTMLInputElement).value = '';
    (document.getElementById('clienteWhatsapp') as HTMLInputElement).value = '';
    document.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((el) => (el.checked = false));
    document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el) => (el.checked = false));
    (document.getElementById('sinPasarela') as HTMLInputElement).disabled = false;
    (document.getElementById('sinPasarelaHint') as HTMLElement).textContent = 'Disponible para Plan Completa, Pro y Elite.';
    (document.getElementById('incluirSoporte') as HTMLInputElement).checked = true;
    (document.getElementById('incluirSoporte') as HTMLInputElement).disabled = false;
    (document.getElementById('incluirSoporteHint') as HTMLElement).textContent = 'Obligatorio para planes Tienda Completa, Tienda Pro y Tienda Elite.';
    (document.getElementById('outCliente') as HTMLElement).textContent = '-';
    (document.getElementById('outEmpresa') as HTMLElement).textContent = '-';
    (document.getElementById('outPlan') as HTMLElement).textContent = '-';
    (document.getElementById('outImplementacion') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outExtras') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outExtrasDetalle') as HTMLElement).textContent = 'Sin extras seleccionados.';
    (document.getElementById('outDescuento') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outMotivoDescuento') as HTMLElement).textContent = '-';
    (document.getElementById('outTotal') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outContinuidad') as HTMLElement).textContent = 'Soporte+ mensual: $100.000 CLP/mes';
    (document.getElementById('outScopeList') as HTMLElement).innerHTML = '<li>Selecciona un plan para ver detalle.</li>';
    (document.getElementById('outExclusionsList') as HTMLElement).innerHTML = '<li>Selecciona un plan para ver exclusiones.</li>';
    (document.getElementById('outputTexto') as HTMLTextAreaElement).value = '';
    const firmaNombreInput = document.getElementById('firmaNombre') as HTMLInputElement | null;
    const firmaFechaInputReset = document.getElementById('firmaFecha') as HTMLInputElement | null;
    if (firmaNombreInput) firmaNombreInput.value = '';
    if (firmaFechaInputReset) firmaFechaInputReset.value = '';
  });
};
