# Formularios con React Hook Form + Zod
## Componente Form de VIN Studio

Sistema de formularios type-safe con validación del lado del cliente usando React Hook Form y Zod.

---

## ✨ Características

- ✅ **Type-safe**: TypeScript completo con inferencia de tipos
- ✅ **Validación con Zod**: Schema validation potente y flexible
- ✅ **Accesibilidad**: ARIA attributes automáticos
- ✅ **Estilo Minimalista**: Integrado con el sistema de diseño VIN Studio
- ✅ **Mensajes de Error**: Gestión automática de errores
- ✅ **Composable**: Componentes reutilizables

---

## 📦 Componentes Instalados

### UI Components
- ✅ `<Form />` - Wrapper de React Hook Form
- ✅ `<FormField />` - Campo controlado
- ✅ `<FormItem />` - Contenedor de campo
- ✅ `<FormLabel />` - Label accesible
- ✅ `<FormControl />` - Control del input
- ✅ `<FormDescription />` - Texto de ayuda
- ✅ `<FormMessage />` - Mensajes de error
- ✅ `<Input />` - Input minimalista (ya existía)
- ✅ `<Textarea />` - Textarea minimalista (nuevo)
- ✅ `<Label />` - Label standalone (nuevo)

### Dependencias
```json
{
  "@radix-ui/react-label": "^latest",
  "@radix-ui/react-slot": "^latest",
  "react-hook-form": "^latest",
  "@hookform/resolvers": "^latest",
  "zod": "^latest"
}
```

---

## 🚀 Uso Básico

### 1. Definir Schema de Validación

```tsx
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
})
```

### 2. Crear el Formulario

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type FormValues = z.infer<typeof formSchema>

export function MyForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: FormValues) {
    console.log(values) // Type-safe!
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu nombre" {...field} />
              </FormControl>
              <FormDescription>
                Este será tu nombre público.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
```

---

## 📋 Ejemplo Completo: ContactForm

El formulario de contacto implementado en `src/components/forms/ContactForm.tsx` incluye:

### Schema
```tsx
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor ingresa un email válido.',
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: 'El mensaje debe tener al menos 10 caracteres.',
  }),
});
```

### Características
- ✅ Grid de 2 columnas responsive
- ✅ Validación en tiempo real
- ✅ Mensajes de error personalizados
- ✅ Estados de loading y success
- ✅ Reset automático después de envío exitoso
- ✅ Estilo minimalista (blanco/negro)

---

## 🎨 Validaciones Comunes con Zod

### String
```tsx
z.string()
  .min(3, "Mínimo 3 caracteres")
  .max(50, "Máximo 50 caracteres")
  .email("Email inválido")
  .url("URL inválida")
  .regex(/^[a-zA-Z]+$/, "Solo letras")
```

### Number
```tsx
z.number()
  .min(0, "Debe ser positivo")
  .max(100, "Máximo 100")
  .int("Debe ser entero")
  .positive("Debe ser positivo")
```

### Boolean
```tsx
z.boolean()
  .refine(val => val === true, "Debes aceptar los términos")
```

### Date
```tsx
z.date()
  .min(new Date("2024-01-01"), "Fecha muy antigua")
  .max(new Date(), "No puede ser fecha futura")
```

### Enum
```tsx
z.enum(["small", "medium", "large"], {
  errorMap: () => ({ message: "Selecciona un tamaño válido" })
})
```

### Array
```tsx
z.array(z.string())
  .min(1, "Selecciona al menos una opción")
  .max(5, "Máximo 5 opciones")
```

### Object
```tsx
z.object({
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
  })
})
```

### Optional
```tsx
z.string().optional()
z.string().nullable()
z.string().nullish() // null | undefined
```

---

## 🎯 Patrones Avanzados

### Validación Condicional
```tsx
const schema = z.object({
  hasCompany: z.boolean(),
  company: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasCompany) {
      return !!data.company;
    }
    return true;
  },
  {
    message: "Ingresa el nombre de la empresa",
    path: ["company"],
  }
);
```

### Validación Custom
```tsx
z.string().refine(
  (val) => val.toLowerCase() !== val.toUpperCase(),
  "Debe contener al menos una letra"
)
```

### Transform
```tsx
z.string()
  .transform((val) => val.trim())
  .transform((val) => val.toLowerCase())
```

### Async Validation
```tsx
z.string().refine(
  async (username) => {
    const available = await checkUsername(username);
    return available;
  },
  "Este nombre de usuario ya está en uso"
)
```

---

## 🎨 Estilo Minimalista VIN Studio

### Input Focus State
```tsx
<Input /> // Ring negro al focus
// focus-visible:ring-2 focus-visible:ring-zinc-900
```

### Mensajes de Error
```tsx
<FormMessage /> // Texto negro, no rojo
// text-zinc-900 font-medium
```

### Descripción
```tsx
<FormDescription /> // Gris suave
// text-zinc-500 leading-relaxed
```

### Estados de Éxito/Error
```tsx
// Éxito: Fondo blanco, borde negro
<div className="p-4 bg-white border border-zinc-900 text-zinc-900">
  ✓ Mensaje enviado
</div>

// Error: Fondo negro, texto blanco
<div className="p-4 bg-zinc-900 text-white border border-zinc-900">
  ✗ Error al enviar
</div>
```

---

## 📱 Uso en Astro

```astro
---
import ContactForm from '@/components/forms/ContactForm';
---

<div class="container mx-auto px-4">
  <ContactForm client:load />
</div>
```

**Importante**: Siempre usar `client:load` para componentes React interactivos.

---

## 🔧 Métodos Útiles del Form

### Reset
```tsx
form.reset() // Reset a valores por defecto
form.reset({ name: "Nuevo valor" }) // Reset con valores
```

### Set Value
```tsx
form.setValue("name", "Juan", {
  shouldValidate: true, // Validar inmediatamente
  shouldDirty: true,    // Marcar como modificado
})
```

### Get Values
```tsx
const values = form.getValues() // Todos los valores
const name = form.getValues("name") // Un valor específico
```

### Watch
```tsx
const watchName = form.watch("name") // Observar un campo
const watchAll = form.watch() // Observar todos
```

### Trigger Validation
```tsx
form.trigger("name") // Validar un campo
form.trigger() // Validar todo el formulario
```

---

## ✅ Checklist de Formulario Perfecto

- [ ] Schema de Zod definido con mensajes claros
- [ ] Valores por defecto configurados
- [ ] Validación funcional (min, max, email, etc.)
- [ ] Mensajes de error en español
- [ ] Estados de loading/success/error
- [ ] Reset después de envío exitoso
- [ ] Accesibilidad (labels, aria-*)
- [ ] Diseño responsive (grid en desktop, stack en mobile)
- [ ] Estilo minimalista (blanco/negro/gris)
- [ ] Type-safe con TypeScript

---

## 🎯 Próximos Pasos

1. **Implementar backend**: Conectar con API real
2. **Agregar más validaciones**: Teléfono, DNI, etc.
3. **File uploads**: Componente de subida de archivos
4. **Multi-step forms**: Formularios de varios pasos
5. **Auto-save**: Guardar progreso automáticamente

---

**VIN Studio** — Formularios de alta precisión. Type-safe. Accesibles. Minimalistas.
