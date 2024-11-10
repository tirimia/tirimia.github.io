import { defineCollection, z } from "astro:content";

const notes = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.string().array().optional(),
        draft: z.boolean().optional(),
    })
})

export const collections = {
    notes,
};