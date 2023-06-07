'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      className="mr-10"
      onClick={() => signIn('keycloak', { callbackUrl: 'localhost:3000' })}
    >
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button className="mr-10" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
