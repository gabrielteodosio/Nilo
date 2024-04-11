import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const taskRouter = createTRPCRouter({
  test: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hi task: ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany();
  }),
});
