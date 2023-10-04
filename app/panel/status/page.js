import React from 'react';
import Image from 'next/image'
import { cookies } from 'next/headers'

import StatusPage from 'components/StatusPage';
import Logo from '/images/logo-white.png';

export default function Page() {
  const cookie = cookies().get('user')?.value
  return (
    <div className='bg-gradient-to-b from-black/75 via-transparent to-fuchsia-700/75 h-screen grid'>
      <Image src={Logo} alt='logo' className='absolute top-0 left-0 pl-4 w-16 md:w-24'/>
      <StatusPage initial={cookie} />  
    </div>
  )
}
