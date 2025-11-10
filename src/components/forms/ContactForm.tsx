"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useState } from 'react';

// Schema de validación con Zod
const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.',
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, {
      message: 'El nombre solo puede contener letras.',
    }),
  email: z.string().email({
    message: 'Por favor ingresa un email válido.',
  }),
  empresa: z.string().optional(),
  telefono: z.string().optional(),
  mensaje: z.string().min(10, {
    message: 'El mensaje debe tener al menos 10 caracteres.',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones.',
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Definir el formulario con validación
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: '',
      email: '',
      empresa: '',
      telefono: '',
      mensaje: '',
      terms: false,
    },
  });

  // Manejador de envío
  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Enviar a nuestro API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: values.nombre,
          email: values.email,
          empresa: values.empresa,
          telefono: values.telefono,
          mensaje: values.mensaje,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
      
      console.log('Mensaje enviado exitosamente:', result);
      setSubmitStatus('success');
      form.reset();
      
      // Opcional: Scroll al mensaje de éxito
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitStatus('error');
      
      // Limpiar mensaje de error después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envíanos un mensaje</CardTitle>
        <CardDescription>
          Completa el formulario y nos pondremos en contacto contigo pronto
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Campo Nombre */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Campo Empresa */}
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa" {...field} />
                    </FormControl>
                    <FormDescription>
                      Opcional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo Teléfono */}
              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+56 9 1234 5678" {...field} />
                    </FormControl>
                    <FormDescription>
                      Opcional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Campo Mensaje */}
            <FormField
              control={form.control}
              name="mensaje"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Cuéntanos sobre tu proyecto..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe tu proyecto o consulta con el mayor detalle posible
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Términos y Condiciones */}
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 border border-zinc-200 p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label htmlFor="terms" className="text-sm font-normal text-zinc-900">
                      Acepto los{' '}
                      <a
                        href="/terminos"
                        className="underline hover:text-zinc-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        términos y condiciones
                      </a>
                      {' '}y la{' '}
                      <a
                        href="/privacidad"
                        className="underline hover:text-zinc-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        política de privacidad
                      </a>
                    </Label>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-white border border-zinc-900 text-zinc-900">
                ✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-zinc-900 text-white border border-zinc-900">
                ✗ Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}

            {/* Botón de envío */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
