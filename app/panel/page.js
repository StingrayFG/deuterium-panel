import React from 'react';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    redirect('/panel/status')
  )
}
