import React from 'react';

import NavBar from 'components/Layout/NavBar';
import UserBar from 'components/Layout/UserBar';

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
