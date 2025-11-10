# VIN STUDIO - SISTEMA DE DISEÑO
## Lujo Técnico Minimalista

> "El minimalismo no es la ausencia de diseño, es la máxima expresión del mismo."

---

## 🎨 Filosofía de Diseño

### La Regla del 80/20
- **80% Espacio Negativo (Blanco)**: El "aire" alrededor de los elementos da la sensación de elegancia y lujo
- **20% Contenido (Negro/Gris)**: Texto, líneas y botones nítidos de alto contraste

### Los Tres Pilares V.I.N.

1. **Visión** (Blanco predominante)
   - Claridad, orden, enfoque en el futuro
   - Espacios amplios que permiten "respirar" al contenido

2. **Integridad** (Estructura limpia)
   - Transparencia absoluta, no hay donde esconderse
   - Cada elemento tiene un propósito claro

3. **Notoriedad** (Detalles en Negro)
   - Contraste fuerte, audacia, autoridad
   - Los elementos importantes destacan sin esfuerzo

---

## 🎨 Paleta de Color (Monocromática Estricta)

### Background (Lienzo)
```css
--background: #FAFAFA  /* Zinc-50 - Blanco suave para los ojos */
--card: #FFFFFF        /* Blanco puro para contraste */
```

### Foreground (Tinta Principal)
```css
--foreground: #09090B  /* Zinc-950 - Negro profundo, no agresivo */
--primary: #09090B     /* Negro = Autoridad y Notoriedad */
```

### Elementos Secundarios
```css
--muted: #F4F4F5           /* Zinc-100 - Fondos sutiles */
--muted-foreground: #71717A /* Zinc-500 - Texto secundario */
--accent: #E4E4E7          /* Zinc-200 - Hover states */
```

### Estructura (Líneas)
```css
--border: #E4E4E7  /* Zinc-200 - Líneas de 1px */
```

**Regla de Oro**: NO usar colores. Mantener monocromía estricta.

---

## ✍️ Tipografía (La Voz de la Marca)

### Fuente Principal: Inter
Neogrotesca moderna, neutra con carácter técnico.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Jerarquía por Peso y Tamaño (NO por color)

#### H1 (Héroe)
```css
font-size: 6rem - 9rem      /* text-6xl a text-9xl */
font-weight: 800            /* font-extrabold */
letter-spacing: -0.02em     /* tracking-tighter */
color: #09090B              /* Negro */
```
> Debe sentirse casi excesivo. Esto es Notoriedad.

#### H2/H3 (Subtítulos)
```css
font-size: 2rem - 3rem      /* text-3xl a text-5xl */
font-weight: 600-700        /* font-semibold a font-bold */
letter-spacing: -0.01em     /* tracking-tight */
color: #09090B
```

#### Cuerpo de Texto
```css
font-size: 1rem - 1.25rem   /* text-base a text-xl */
font-weight: 300-400        /* font-light a font-normal */
line-height: 1.75           /* leading-relaxed */
color: #71717A              /* Zinc-500 */
```
> Altura de línea generosa para facilitar la lectura (Integridad).

---

## 🔲 Elementos de UI

### Radio de Borde (Border Radius)
```css
--radius-sm: 2px   /* Casi recto */
--radius-md: 4px   /* Sutil */
--radius-lg: 6px   /* Máximo permitido */
```

**Filosofía**: Esquinas rectas = Seriedad, precisión y tecnología.

### Sombras (Shadows)
**NO USAR SOMBRAS**. Usar bordes finos en su lugar:

```css
/* ❌ NO */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* ✅ SÍ */
border: 1px solid #E4E4E7;
```

### Líneas Divisorias
```html
<!-- Líneas horizontales finas para estructurar -->
<hr class="border-t border-zinc-200" />

<!-- Línea de Visión vertical (elemento distintivo VIN) -->
<div class="w-px h-24 bg-zinc-900"></div>
```

---

## 🎯 Componentes Clave

### Button (Inversión Elegante)

#### Primary
```css
/* Estado normal */
bg-zinc-900 text-white border-zinc-900

/* Hover: Inversión completa */
hover:bg-white hover:text-zinc-900
```

#### Secondary (Outline)
```css
/* Estado normal */
bg-white text-zinc-900 border-zinc-900

/* Hover: Inversión completa */
hover:bg-zinc-900 hover:text-white
```

### Card
```css
/* Sin sombras, solo borde fino */
border: 1px solid #E4E4E7;
background: white;
padding: 2rem;  /* Generoso */
```

### Input (Alta Precisión)
```css
/* Normal */
border: 1px solid #E4E4E7;
height: 3rem;
padding: 0.75rem 1rem;

/* Focus: Ring negro */
focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900
```

---

## 🎬 Micro-interacciones

> "El movimiento es nuestro color"

### Hover en Botones
```css
transition: all 200ms ease;

/* Inversión rápida y satisfactoria */
.btn:hover {
  background: invertir();
  color: invertir();
}
```

### Aparición de Contenido
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Deslizamiento sutil desde abajo */
.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
```

---

## 📐 Grid y Espaciado

### Contenedor Principal
```css
max-width: 1280px;  /* 7xl */
padding: 0 1rem;
margin: 0 auto;
```

### Espaciado Vertical Generoso
```css
/* Secciones */
padding-top: 8rem;    /* py-32 */
padding-bottom: 8rem;

/* Entre elementos */
gap: 3rem;  /* gap-12 */
```

### Grid de 3 Columnas (V.I.N.)
```css
grid-template-columns: repeat(3, 1fr);
gap: 1px;  /* Líneas divisorias de 1px */
background: #E4E4E7;  /* Color del gap = línea */
```

---

## 🎪 Páginas Tipo

### Home: Manifiesto Visual
```html
<!-- Hero gigante -->
<h1 class="text-9xl font-extrabold">
  DE IDEA<br>A REALIDAD.
</h1>

<!-- Línea de Visión -->
<div class="w-px h-24 bg-zinc-900"></div>

<!-- Métricas data-driven -->
<div class="text-4xl font-bold">95%</div>
```

### Portafolio: Galería de Arte
```css
/* Grid de 2 columnas estricto */
grid-cols-2;
gap: 2rem;

/* Imagen con fondo gris si el screenshot es blanco */
background: #F4F4F5;

/* Título + Servicios separados por · */
Client Name · Service 1 · Service 2
```

### Contacto: Formulario de Alta Precisión
```css
/* Inputs grandes (16px mínimo) */
height: 3rem;
font-size: 1rem;

/* Focus en negro */
focus:ring-2 focus:ring-zinc-900;
```

---

## 🎨 El "Toque" VIN Studio

### Línea de Visión
Elemento gráfico distintivo: línea vertical negra de 1px que conecta secciones.

```html
<div class="w-px h-24 bg-zinc-900"></div>
```

Representa el camino desde la Idea hasta la Realidad.

### Scroll Indicator Minimalista
```html
<div class="w-6 h-10 border-2 border-zinc-900">
  <div class="w-1 h-2 bg-zinc-900"></div>
</div>
```

---

## ✅ Checklist de Diseño

Antes de implementar cualquier componente:

- [ ] ¿Usa solo blanco, negro y grises?
- [ ] ¿Los bordes son rectos o sutilmente redondeados (≤6px)?
- [ ] ¿Eliminé todas las sombras innecesarias?
- [ ] ¿La jerarquía se define por peso/tamaño, no por color?
- [ ] ¿Hay suficiente espacio negativo (aire)?
- [ ] ¿Las interacciones son suaves pero notables?
- [ ] ¿Cada elemento tiene un propósito claro?

---

## 🚀 Implementación Técnica

### TailwindCSS Classes Principales
```css
/* Colores */
bg-white, bg-zinc-50, bg-zinc-900
text-zinc-900, text-zinc-500, text-white
border-zinc-200, border-zinc-900

/* Espaciado */
py-32, px-4, gap-12, space-y-6

/* Tipografía */
text-6xl, font-extrabold, tracking-tight, leading-relaxed

/* Borders */
border, border-t, border-zinc-200

/* Transiciones */
transition-all duration-200
```

---

**VIN Studio** — De idea a realidad. Sin ruido. Solo resultados.
