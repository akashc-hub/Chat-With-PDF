import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser(); // Use 'await' to wait for the Promise to resolve

    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });

      // Check if user is in the Database
      const dbUser = await db.user.findFirst({
        where: {
          id: user?.id ?? '', // Use optional chaining and nullish coalescing to handle null or undefined
        },
      });

      if (!dbUser) {
        // Create user in db
        await db.user.create({
          data: {
            id: user?.id ?? '',
            email: user?.email ?? '',
          },
        });
      }

      return { success: true };
    }
  }),
});

export type AppRouter = typeof appRouter;
