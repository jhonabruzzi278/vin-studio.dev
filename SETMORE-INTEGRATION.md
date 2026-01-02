# Integración Widget Setmore - VIN Studio

## Resumen
Widget de agendamiento de llamadas integrado en el sitio web para facilitar la conversión de visitantes a leads calificados.

## Componente Creado
- **Ubicación**: `src/components/common/SetmoreWidget.astro`
- **Props**:
  - `variant`: 'inline' | 'button' | 'minimal' (default: 'minimal')
  - `text`: Texto del botón (default: 'Agendar llamada')
  - `className`: Clases CSS adicionales (opcional)

## Variantes de Diseño

### 1. Inline (Botón Principal)
```astro
<SetmoreWidget variant="inline" text="Agendar llamada gratuita" />
```
- Botón negro con texto blanco
- Icono de calendario
- Efecto hover invertido
- Ideal para CTAs principales

### 2. Button (Botón Outline)
```astro
<SetmoreWidget variant="button" text="Agendar llamada" />
```
- Botón con borde negro
- Fondo blanco, texto negro
- Hover con inversión de colores
- Ideal para CTAs secundarios

### 3. Minimal (Enlace Minimalista)
```astro
<SetmoreWidget variant="minimal" text="Agendar llamada" />
```
- Enlace de texto con icono
- Hover con escala de icono
- Ideal para navegación y footers

## Páginas Integradas

### 1. Página de Contacto (`/contacto`)
- **Ubicación**: Columna derecha, después de información de contacto
- **Variante**: `inline`
- **Texto**: "Agendar llamada gratuita"
- **Contexto**: Alternativa al formulario de contacto

### 2. Homepage (`/`)
- **Ubicación**: CallToAction, entre botón primario y portfolio
- **Variante**: `button`
- **Texto**: "Agendar llamada"
- **Contexto**: Opción adicional en el CTA principal

### 3. Página FAQs (`/faqs`)
- **Ubicación**: Sección CTA final, entre botones de contacto
- **Variante**: `button`
- **Texto**: "Agendar llamada"
- **Contexto**: Para usuarios que prefieren hablar directamente

## Configuración Técnica

### Script de Setmore
- Cargado globalmente en cada instancia del componente
- URL: `https://assets.setmore.com/integration/static/setmoreIframeLive.js`
- Configuración inline para evitar conflictos con build tools

### URL de Agendamiento
- **URL Actual**: `https://vinstudio.setmore.com`
- **ID del botón**: `Setmore_button_iframe` (requerido por Setmore)

### Estilos
- Diseño minimalista B&W coherente con VIN Studio
- Sin imagen predeterminada de Setmore (reemplazada por iconos SVG)
- Responsive y accesible
- z-index del iframe configurado a 9999 para overlay

## Próximos Pasos (Opcionales)

1. **Tracking de Conversiones**
   - Agregar eventos de Google Analytics cuando se abre el widget
   - Implementar en el script del componente

2. **Personalización Adicional**
   - Crear variante para footer
   - Agregar en página de servicios si se desea

3. **A/B Testing**
   - Probar diferentes textos de CTA
   - Medir tasas de conversión por página

4. **Confirmaciones**
   - Configurar emails de confirmación automáticos en Setmore
   - Personalizar plantillas de email

## Mantenimiento

- **URL de Gestión**: Panel de Setmore para configurar horarios y disponibilidad
- **Actualizaciones**: El script se actualiza automáticamente desde Setmore
- **Compatibilidad**: Funciona en todos los navegadores modernos

## Ejemplo de Uso Rápido

```astro
---
import SetmoreWidget from '@/components/common/SetmoreWidget.astro';
---

<!-- En cualquier página -->
<SetmoreWidget variant="inline" text="Reserva tu consultoría" />
```

---
**Última actualización**: 2 de enero de 2026
**Integrado por**: GitHub Copilot
