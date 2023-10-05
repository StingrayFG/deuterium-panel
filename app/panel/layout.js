import React from 'react';

import NavBar from 'components/NavBar';
import UserBar from 'components/UserBar';

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
