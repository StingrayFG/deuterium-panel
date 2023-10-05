'use client';

import Image from 'next/image';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import logoutIcon from '/icons/logout-icon.svg';

export default function UserBar() {
  const router = useRouter();

  const logOut = () => {
    deleteCookie('user');
    router.push('/');
  };

  return (
    <button className='w-1/12 self-center' onClick={logOut}>
      <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
    </button>
  ) 
}
