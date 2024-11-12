import { defineCollection, z } from "astro:content";

const notes = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.string().array().optional(),
        draft: z.boolean().optional(),
    }).strict()
})

const articles = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        subtitle: z.string().min(1).optional(),
        publishedAt: z.date()
    })
})

export const collections = {
    articles,
    notes,
};