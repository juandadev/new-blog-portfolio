import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  useSecureCookies: process.env.NODE_ENV === 'production',
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

      if (!email) return '/login?error=DEFAULT';

      const existingUser = await prisma.user.findUnique({
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
          return '/login?error=NO_INVITATION';
        }
      } else {
        // Make sure GitHub is linked
        if (!existingUser.githubId) {
          await prisma.user.update({
            where: { email },
            data: {
              githubId: account?.providerAccountId,
              name: user.name,
              profilePicture: user.image,
            },
          });
        }

        // Block login if user is inactive
        if (existingUser.status === 'INACTIVE') {
          return '/login?error=INACTIVE';
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
        const dbUser = await prisma.user.findUnique({
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
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
