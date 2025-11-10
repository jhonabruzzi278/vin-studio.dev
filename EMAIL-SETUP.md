# 📧 Configuración de Email con Resend

## Estado Actual: ✅ Funcionando en Desarrollo

### Configuración Actual (Plan Gratuito)
- **Destinatario**: jonathanguerra278@gmail.com
- **Remitente**: onboarding@resend.dev
- **Límite**: 3,000 emails/mes, 100 emails/día
- **Restricción**: Solo puedes recibir en tu email personal

---

## 🚀 Para Producción: Verificar Dominio

### Paso 1: Agregar Dominio en Resend
1. Ve a: https://resend.com/domains
2. Click en "Add Domain"
3. Ingresa: `vin-studio.dev`
4. Click "Add"

### Paso 2: Configurar DNS Records
Resend te dará 3 registros DNS que debes agregar:

#### En tu proveedor de DNS (ej: Cloudflare, Namecheap, etc.):

**SPF Record:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record:**
```
Type: TXT
Name: resend._domainkey
Value: [Lo proporciona Resend]
```

**DMARC Record (opcional pero recomendado):**
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:jonathanguerra278@gmail.com
```

### Paso 3: Verificar en Resend
- Espera 5-10 minutos para propagación DNS
- En Resend, click "Verify" en tu dominio
- Debería mostrar "Verified" ✅

### Paso 4: Actualizar Código

**Archivo: `src/pages/api/contact.ts`**

Cambiar:
```typescript
// ANTES (Desarrollo)
from: 'VIN Studio <onboarding@resend.dev>',
to: ['jonathanguerra278@gmail.com'],
```

Por:
```typescript
// DESPUÉS (Producción)
from: 'VIN Studio <contacto@vin-studio.dev>',
to: ['jonathan.guerra@vin-studio.dev'],
```

**Archivo: `.env`**
```bash
# Email Configuration (Producción)
EMAIL_FROM=contacto@vin-studio.dev
EMAIL_TO=jonathan.guerra@vin-studio.dev
```

### Paso 5: Usar Variables de Entorno

**Actualizar `src/pages/api/contact.ts`:**
```typescript
const { data: emailData, error } = await resend.emails.send({
  from: `VIN Studio <${import.meta.env.EMAIL_FROM || 'onboarding@resend.dev'}>`,
  to: [import.meta.env.EMAIL_TO || 'jonathanguerra278@gmail.com'],
  replyTo: email,
  subject: `Nueva Consulta de ${nombre}${empresa ? ` - ${empresa}` : ''}`,
  // ... resto del código
});
```

---

## 📊 Límites y Precios

### Plan Gratuito (Actual)
- ✅ 3,000 emails/mes
- ✅ 100 emails/día
- ❌ Solo email personal hasta verificar dominio
- ✅ Todas las funcionalidades

### Plan Pro ($20/mes)
- ✅ 50,000 emails/mes
- ✅ Emails ilimitados/día
- ✅ Múltiples dominios verificados
- ✅ Prioridad en soporte

---

## 🧪 Testing

### En Desarrollo
```bash
# Enviar email de prueba
curl -X POST http://localhost:4321/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "email": "test@ejemplo.com",
    "mensaje": "Mensaje de prueba"
  }'
```

### Verificar Email Recibido
- Revisa: jonathanguerra278@gmail.com
- Carpeta: Inbox o Spam (primera vez)
- Asunto: "Nueva Consulta de Test Usuario"

---

## 🔧 Troubleshooting

### Email no llega
1. ✅ Verificar API key en `.env`
2. ✅ Revisar logs del servidor
3. ✅ Verificar carpeta Spam
4. ✅ Confirmar dominio verificado (producción)

### Error 403: validation_error
- **Causa**: Intentando enviar a email diferente al tuyo sin dominio verificado
- **Solución**: Verificar dominio en Resend o usar tu email personal

### Email va a Spam
- **Solución**: Verificar registros SPF, DKIM y DMARC
- **Tip**: Calentar dominio enviando pocos emails al inicio

---

## 📝 Checklist de Producción

- [ ] Dominio agregado en Resend
- [ ] DNS Records configurados (SPF, DKIM, DMARC)
- [ ] Dominio verificado en Resend
- [ ] Variables de entorno actualizadas
- [ ] Código actualizado con nuevo `from` y `to`
- [ ] Email de prueba enviado y recibido
- [ ] Email NO va a spam
- [ ] Reply-to funciona correctamente

---

## 🎯 Emails Recomendados

Para vin-studio.dev:
- `contacto@vin-studio.dev` - Formulario de contacto
- `hola@vin-studio.dev` - Email general
- `soporte@vin-studio.dev` - Soporte técnico
- `proyectos@vin-studio.dev` - Gestión de proyectos
- `no-reply@vin-studio.dev` - Notificaciones automáticas

---

**Última actualización**: 9 de noviembre de 2025
**Estado**: ✅ Funcionando en desarrollo
**Próximo paso**: Verificar dominio en producción
