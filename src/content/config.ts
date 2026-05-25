import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    published: z.boolean(),
    featured: z.boolean(),
    status: z.enum(["Completed", "In Progress", "Improving", "Draft"]),
    category: z.string(),
    year: z.number(),
    cover: z.string(),
    coverPosition: z.string().optional(),
    demoGif: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    stack: z.array(z.string()),
    summary: z.string(),
    screenshots: z
      .array(
        z.object({
          src: z.string(),
          title: z.string(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = {
  projects,
};
