import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      name: 'Sign in',
      clientId: env.KEYCLOAK_ID,
      clientSecret: env.KEYCLOAK_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'keycloak') {
        token.provider = account.provider;
        token.id_token = account.id_token;
      }

      return token;
    },
  },
  events: {
    async signOut({ token }) {
      const { provider, id_token } = token;

      if (provider === 'keycloak') {
        try {
          if (typeof id_token !== 'string')
            throw new TypeError('id_token is not a string');

          const params = new URLSearchParams();
          params.append('id_token_hint', id_token);

          await fetch(
            `${
              env.KEYCLOAK_ISSUER
            }/protocol/openid-connect/logout?${params.toString()}`,
          );
        } catch (e) {
          console.error('Unable to perform post-logout handshake', e);
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
