import NextAuth, { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { LOGIN_ERRORS } from '@/lib/constants';
import { User } from '@/types/user';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Runs before next-auth creates a session
    async signIn({ user, account }) {
      const email = user.email;

      if (!email) return false;

      const existingUser: User = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        // If not registered, check if invited
        const invitation = await prisma.invitation.findFirst({
          where: {
            email,
            expiresAt: { gt: new Date() },
          },
        });

        if (!invitation) {
          console.warn(LOGIN_ERRORS.NO_INVITATION);

          return false;
        }
      } else {
        // Make sure GitHub is linked
        if (!existingUser.githubId) {
          await prisma.user.update({
            where: { email },
            data: { githubId: account?.providerAccountId },
          });
        }

        // Block login if user is inactive
        if (existingUser.status === 'INACTIVE') {
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      session.user.profilePicture = token.picture as string;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser: User = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        token.id = dbUser?.id;
        token.role = dbUser?.role;
        token.picture = dbUser?.profilePicture;
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    // error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
