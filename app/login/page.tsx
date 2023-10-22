import React from 'react'
import { useUserContext } from '../context/user';
import { useRouter } from 'next/navigation';

import Login from './Login'

const Page = () => {
  const userContext = useUserContext() || { user: undefined };
  const { user } = userContext;
  const router = useRouter();

  if (user) {
    router.push('/');
  }

  return (
    <>
      <Login />
    </>
  )
}

export default Page