(() => {
  const btnCalcular = document.getElementById('btnCalcular');
  if (!btnCalcular) return;

  const formatClp = (value: number) => `$${Number(value || 0).toLocaleString('es-CL')} CLP`;
  const planMap = {
    express: {
      name: 'Plan Express',
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
      name: 'Plan Completa',
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
      name: 'Plan Pro',
      price: 399990,
      scope: [
        'Hasta 50 productos',
        'Configuración de conversión (carrito y checkout)',
        'Categorías, fichas y estructura comercial optimizada',
        'SEO base de tienda y productos',
        'Verificación de fotografías y apoyo para material visual',
      ],
      exclusions: [
        'Compra de dominio y renovaciones',
        'Costo mensual de plataforma (desde mes 4)',
        'Servicios de correo corporativo',
        'Gestión publicitaria mensual (Meta/Google)',
        'Desarrollo de software a medida',
        'Apps o licencias pagadas de terceros',
      ],
    },
    elite: {
      name: 'Plan Elite',
      price: 649990,
      scope: [
        'Hasta 100 productos',
        'Migración básica',
        'Landing pages',
        'Fotografia + contenido visual',
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
  const extrasMap: Record<string, { name: string; price: number }> = {
    productos_extra: { name: 'Carga extra de productos', price: 50000 },
    integracion_adicional: { name: 'Integraciones adicionales', price: 40000 },
    desarrollo_medida: { name: 'Desarrollo a medida', price: 80000 },
    fotografia_adicional: { name: 'Fotografia adicional', price: 60000 },
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

  const getSelectedExtras = () => Array.from(document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked')).map((el) => el.value);

  const buildOutputText = ({ cliente, empresa, email, whatsapp, planName, planPrice, planScope, planExclusions, extrasNames, extrasTotal, discountTotal, total, includeSupport }: any) => {
    const extrasLine = extrasNames.length ? extrasNames.join(', ') : 'Sin extras';
    const scopeLines = (planScope || []).map((line: string) => `- ${line}`);
    const exclusionLines = (planExclusions || []).map((line: string) => `- ${line}`);
    const discountReason = discountTotal > 0 ? 'Descuento por implementación sin pasarela de pago.' : 'Sin descuento aplicado.';
    const supportLine = includeSupport
      ? 'Soporte+ mensual incluido en propuesta: $100.000 CLP/mes (detalle: $65.000 plataforma + $35.000 soporte).'
      : 'Soporte+ mensual no incluido en esta cotizacion (opcional).';
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
      `Descuento: -${formatClp(discountTotal)}`,
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
      '- Al aceptar la cotización se cancela el 50% de la implementación.',
      '- Luego se realiza revisión de conformidad.',
      '- Posterior a la conformidad se cancela el 50% restante de implementación + soporte mensual (si fue incluido).',
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
    selectedExtras.forEach((key) => {
      if (extrasMap[key]) {
        extrasTotal += extrasMap[key].price;
        extrasNames.push(extrasMap[key].name);
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
    (document.getElementById('outDescuento') as HTMLElement).textContent = discountTotal ? `- ${formatClp(discountTotal)}` : '$0 CLP';
    (document.getElementById('outMotivoDescuento') as HTMLElement).textContent = discountReason;
    (document.getElementById('outTotal') as HTMLElement).textContent = formatClp(total);
    (document.getElementById('outContinuidad') as HTMLElement).textContent = includeSupport
      ? 'Soporte+ mensual incluido en propuesta: $100.000 CLP/mes'
      : 'Soporte+ mensual no incluido en esta cotizacion';

    const scopeList = document.getElementById('outScopeList') as HTMLUListElement;
    scopeList.innerHTML = '';
    selectedPlan.scope.forEach((item) => {
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
      extrasTotal,
      discountTotal,
      total,
      includeSupport,
    });
  };

  btnCalcular.addEventListener('click', calculate);
  document.querySelectorAll<HTMLInputElement>('input[name="plan"]').forEach((radio) => radio.addEventListener('change', syncPasarelaRules));
  syncPasarelaRules();

  document.getElementById('btnCopiar')?.addEventListener('click', async () => {
    const text = (document.getElementById('outputTexto') as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert('Primero calcula una cotizacion.');
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
      'Al aceptar la cotización se cancela el 50% de la implementación.',
      'Luego se realiza una revisión de conformidad.',
      'Posterior a la conformidad se cancela el 50% restante de implementación + soporte mensual (si fue incluido).',
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
      scopeItems,
      exclusionItems,
      supportItems,
      paymentTerms,
      email: (document.getElementById('clienteEmail') as HTMLInputElement).value.trim() || '-',
      whatsapp: (document.getElementById('clienteWhatsapp') as HTMLInputElement).value.trim() || '-',
    };
  };

  document.getElementById('btnExportarPdf')?.addEventListener('click', async () => {
    const quoteData = collectQuoteData();
    if (!quoteData) return;
    try {
      const { exportQuotePdf } = await import('../lib/quotePdf');
      await exportQuotePdf({
        fileName: quoteData.fileTitle,
        dateText: quoteData.now.toLocaleDateString('es-CL'),
        clientName: quoteData.cliente,
        companyName: quoteData.empresa,
        email: quoteData.email,
        whatsapp: quoteData.whatsapp,
        planName: quoteData.outPlan,
        implementation: quoteData.outImplementacion,
        extras: quoteData.outExtras,
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
      });
    } catch (error) {
      console.error(error);
      alert('No fue posible generar el PDF. Intenta nuevamente.');
    }
  });

  document.getElementById('btnExportarHtmlPdf')?.addEventListener('click', async () => {
    const quoteData = collectQuoteData();
    if (!quoteData) return;
    try {
      const { exportHtmlQuotePdf } = await import('../lib/quoteHtmlPdf');
      await exportHtmlQuotePdf({
        elementId: 'quoteCapture',
        fileName: quoteData.fileTitle.replace('.pdf', '-html.pdf'),
      });
    } catch (error) {
      console.error(error);
      alert('No fue posible generar el PDF HTML. Intenta nuevamente.');
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
    (document.getElementById('outCliente') as HTMLElement).textContent = '-';
    (document.getElementById('outEmpresa') as HTMLElement).textContent = '-';
    (document.getElementById('outPlan') as HTMLElement).textContent = '-';
    (document.getElementById('outImplementacion') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outExtras') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outDescuento') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outMotivoDescuento') as HTMLElement).textContent = '-';
    (document.getElementById('outTotal') as HTMLElement).textContent = '$0 CLP';
    (document.getElementById('outContinuidad') as HTMLElement).textContent = 'Soporte+ mensual incluido en propuesta: $100.000 CLP/mes';
    (document.getElementById('outScopeList') as HTMLElement).innerHTML = '<li>Selecciona un plan para ver detalle.</li>';
    (document.getElementById('outExclusionsList') as HTMLElement).innerHTML = '<li>Selecciona un plan para ver exclusiones.</li>';
    (document.getElementById('outputTexto') as HTMLTextAreaElement).value = '';
  });
})();
