declare module 'next-auth/jwt' {
  interface JWT {
    provider: string;
    id_token: string;
  }
}
