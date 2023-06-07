// src/env.mjs
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    KEYCLOAK_ID: z.string(),
    KEYCLOAK_REALM: z.string(),
    KEYCLOAK_SECRET: z.string(),
    KEYCLOAK_ISSUER: z.string(),

    NEXTAUTH_SECRET: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    KEYCLOAK_ID: process.env.KEYCLOAK_ID,
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_SECRET: process.env.KEYCLOAK_ISSUER,
    KEYCLOAK_ISSUER: process.env.KEYCLOAK_SECRET,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
});
