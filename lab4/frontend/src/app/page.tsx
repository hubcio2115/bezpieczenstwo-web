import { getServerSession } from 'next-auth';
import { LoginButton, LogoutButton } from './components/buttons';

import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex justify-center items-center flex-col h-[70vh]">
      <div>
        {!!session ? (
          <>
            <li>Email: {session.user?.email}</li>
            <li>Name: {session.user?.name}</li>
          </>
        ) : (
          'Signed out'
        )}
      </div>

      <div>
        <LoginButton />

        <LogoutButton />
      </div>
    </main>
  );
}
