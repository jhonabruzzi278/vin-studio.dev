import { defineCollection, z } from 'astro:content';

// Definir colección de proyectos del portafolio
const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    year: z.string(),
    services: z.array(z.string()),
    technologies: z.array(z.string()),
    image: z.string(),
    featured: z.boolean().default(false),
    publishDate: z.date(),
  }),
});

// Definir colección de posts del blog (opcional)
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

// Exportar las colecciones
export const collections = {
  portfolio: portfolioCollection,
  blog: blogCollection,
};
