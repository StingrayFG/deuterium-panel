import React from 'react';

import dynamic from 'next/dynamic'

const UserBar = dynamic(() => import('components/Layout/UserBar'), { ssr: false })
const NavBar = dynamic(() => import('components/Layout/NavBar'), { ssr: false })

import 'globals.css'

export default function RootLayout({ children }) {
  return (
    <section>
      <NavBar />
      <UserBar />
      {children}
    </section>
  )
}
