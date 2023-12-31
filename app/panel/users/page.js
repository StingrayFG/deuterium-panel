'use client';

import React from 'react';
import Image from 'next/image'
import dynamic from 'next/dynamic'

import logo from '/images/logo-white.png';

const UserManagementPage = dynamic(() => import('components/UserManagementPage/UserManagementPage'), { ssr: false })

export default function Page() {
  return (
    <div className='bg-gradient-to-b from-black/75 via-transparent to-fuchsia-700/75 min-h-screen'>
      <Image src={logo} alt='logo' className='absolute top-0 left-0 pl-4 pt-2 w-0 md:w-24'/>
      <UserManagementPage />  
    </div>
  )
}
