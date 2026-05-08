import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([])
  })
});

const changelog = defineCollection({
  type: "content",
  schema: z.object({
    version: z.string(),
    date: z.string(),
    type: z.enum(["added", "changed", "fixed", "removed"]),
    project: z.string().optional(),
    summary: z.string()
  })
});

export const collections = {
  news,
  changelog
};
