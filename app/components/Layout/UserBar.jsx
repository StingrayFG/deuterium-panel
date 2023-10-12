'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'

import logoutIcon from '/icons/logout-icon.svg';

export default function UserBar() {
  const router = useRouter();
  const userData = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null

  const logOut = () => {
    sessionStorage.removeItem('user');
    router.replace('/');
  };

  return (
    <div className='w-1/5 h-auto ml-6 mt-20 absolute
    text-neutral-200 text-2xl'>
      <div className='w-full h-12 mt-0 mx-auto place-content-center
        bg-neutral-900
        border-solid border-2 border-fuchsia-900 rounded-lg'>
        <div className='w-11/12 h-full ml-4 flex'> 
          <p className='w-11/12 self-center'>
            {userData ? JSON.parse(userData).login : ''}
          </p>  
          <button className='w-1/12 self-center' onClick={logOut}>
            <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
          </button>
        </div>   
      </div>
    </div>
  ) 
}
