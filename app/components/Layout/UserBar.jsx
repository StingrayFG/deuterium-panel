'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import logoutIcon from '/icons/logout-icon.svg';

export default function UserBar() {
  const router = useRouter();
  const userData = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null

  const [isMinimized, setIsMinimized] = useState(true);

  const switchMinimized = async () => { // Switch isMinimized to change between minimized and extended view
    setIsMinimized(!isMinimized);
  };

  const logOut = () => { // Remove user data from session storage
    sessionStorage.removeItem('user');
    router.replace('/');
  };

  return ( 
    <div>
      {isMinimized ? 
        <div onClick={switchMinimized} className='w-full h-full pr-2 pl-2 absolute right-0 pointer-events-none
        md:w-0 md:h-0 md:invisible z-30'>
          <div className='w-full h-12 mt-2 pr-2 pl-16 right-0 absolute pointer-events-none
          md:w-0 md:h-0 overflow-hidden
          text-neutral-200 text-2xl'>
            <div className='w-full h-12 mt-0 mx-auto pl-4 pr-4 place-content-center flex pointer-events-auto
            bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
            border-solid border-2 border-fuchsia-900 rounded-lg'>
              <p className='w-full self-center'>
                {userData ? JSON.parse(userData).login : ''}
              </p>  
              <button className='right-0 self-center' onClick={logOut}>
                <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
              </button>  
            </div>
          </div> 
        </div>     
        :
        <div onClick={switchMinimized} className='w-full h-full pr-2 pl-2 absolute right-0
        md:w-0 md:h-0 md:invisible bg-neutral-900/75 z-40'>
          <div className='w-full h-full mt-2 pr-2 pl-16 right-0 absolute pointer-events-none
          md:w-0 md:h-0 overflow-hidden
          text-neutral-200 text-2xl'>
            <div className='w-full h-12 mt-0 mx-auto pl-4 pr-4 place-content-center flex pointer-events-auto
            bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
            border-solid border-2 border-b-transparent border-fuchsia-900 rounded-t-lg'>
              <p className='w-full self-center'>
                {userData ? JSON.parse(userData).login : ''}
              </p>  
              <button className='right-0 self-center' onClick={logOut}>
                <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
              </button>  
            </div>

            <div className='h-[0.7rem] -mt-[0.1rem] w-full relative
            border-solid border-r-2 border-l-2 border-fuchsia-900
            bg-neutral-900'>
            </div> 
          </div> 

          <div className='w-full h-24 mt-16 pointer-events-auto
          border-solid border-2 border-fuchsia-900 rounded-b-lg rounded-tl-lg
          bg-neutral-900 text-neutral-200 text-2xl'>
          </div> 
        </div>   
      }     
      
     
      <div className='md:w-1/5 md:h-auto ml-6 mt-24 absolute
      w-0 h-0 overflow-hidden
      text-neutral-200 text-2xl'>
        <div className='w-full h-12 mt-0 mx-auto pl-4 pr-4 place-content-center
          bg-neutral-900
          border-solid border-2 border-fuchsia-900 rounded-lg'>
          <div className='w-full h-full flex'> 
            <p className='w-full self-center'>
              {userData ? JSON.parse(userData).login : ''}
            </p>  
            <button className='right-0 self-center' onClick={logOut}>
              <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
            </button>  
          </div>   
        </div>
      </div>
    </div>
  ) 
}
