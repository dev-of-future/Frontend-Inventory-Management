'use client'
import React from 'react'
import { useUserContext } from './context/user';
import { useRouter } from 'next/navigation';

import Login from './login/Login';

export default function Home() {
  const userContext = useUserContext() || { user: undefined };
  const { user } = userContext;
  const router = useRouter();

  if (user) {
    router.push('/items');
  }

  return (
    <main>
      <Login />
    </main>
  )
}
