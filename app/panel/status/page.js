import React from 'react';
import Image from 'next/image'

import StatusPage from 'components/StatusPage/StatusPage';
import logo from '/images/logo-white.png';

export default function Page() {
  return (
    <div className='bg-gradient-to-b from-black/75 via-transparent to-fuchsia-700/75 min-h-screen'>
      <Image src={logo} alt='logo' className='absolute top-0 left-0 pl-4 w-16 md:w-24'/>
      <StatusPage />  
    </div>
  )
}
