import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const task = z.object({
  title: z.string(),
  authorId: z.string(),
  description: z.string(),
});

export const taskRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hi task: ${input.text}`,
      };
    }),
});
