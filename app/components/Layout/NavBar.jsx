'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useState } from 'react';

import statusIcon from '/icons/status-icon.svg';
import fileManagementIcon from '/icons/file-management-icon.svg';
import userManagementIcon from '/icons/user-management-icon.svg';
import listIcon from '/icons/list-icon.svg';

export default function NavBar() {

  const [isMinimized, setIsMinimized] = useState(true);

  const switchMinimized = async () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div>
      {isMinimized ? 
        <div onClick={switchMinimized} className='w-full h-full pr-2 pl-2 absolute right-0 pointer-events-none
        md:w-0 md:h-0 md:left-0 md:invisible z-30'>
          <div onClick={switchMinimized} className='w-12 h-12 mt-2 pointer-events-auto grid
          bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 text-neutral-200 text-2xl
          border-solid border-2 border-fuchsia-200 rounded-lg'> 
            <Image src={listIcon} width={24} height={24} alt='listIcon' className='place-self-center'/>
          </div>
        </div>     
        :
        <div onClick={switchMinimized} className='w-full h-full pr-2 pl-2 absolute right-0
        md:w-0 md:h-0 md:left-0 md:invisible bg-neutral-900/75 z-40'>
          <div onClick={switchMinimized} className='w-12 h-12 mt-2 pointer-events-auto grid
          bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 text-neutral-200 text-2xl
          border-solid border-2 border-b-transparent border-fuchsia-200 rounded-t-lg'> 
            <Image src={listIcon} width={24} height={24} alt='listIcon' className='place-self-center'/>
          </div>

          <div className='h-[0.7rem] -mt-[0.1rem] w-12 relative
          border-solid border-r-2 border-l-2 border-fuchsia-200
          bg-neutral-900'>
          </div>  

          <div className='h-auto -mt-[0.1rem] pointer-events-auto
          border-solid border-2 border-fuchsia-200 rounded-b-lg rounded-tr-lg
          bg-neutral-900 text-neutral-200 text-2xl'>
            <div className='w-11/12 h-auto mb-4 ml-3 grid'>
              <Link href="/panel/status" className='mt-2 flex'>
                <Image src={statusIcon} width={24} height={24} alt='statusIcon' className='self-center'/>
                <p className='ml-2 self-center'>
                  Status
                </p>  
              </Link>  
              <Link href="/panel/files" className='mt-2 flex'>
                <Image src={fileManagementIcon} width={24} height={24} alt='fileManagementIcon' className='self-center'/>
                <p className='ml-2 self-center'>
                  File Management
                </p>  
              </Link>  
              <Link href="/panel/users" className='mt-2 flex'>
                <Image src={userManagementIcon} width={24} height={24} alt='userManagementIcon' className='self-center'/>
                <p className='ml-2 self-center'>
                  User Management
                </p>  
              </Link>  
            </div>
          </div>  
        </div>    
      }     


      <div className='md:w-1/5 md:h-auto ml-6 pt-[10.5rem] absolute
      w-0 h-0 overflow-hidden
      text-neutral-200 text-2xl'>
        <div className='w-full mt-0 pl-4 pr-4
        border-dashed border-2 border-neutral-200 rounded-lg bg-neutral-900/50'>
          <div className='w-11/12 h-auto mb-4 grid'>
            <Link href="/panel/status" className='mt-2 flex'>
              <Image src={statusIcon} width={24} height={24} alt='statusIcon' className='self-center'/>
              <p className='ml-2 self-center'>
                Status
              </p>  
            </Link>  
            <Link href="/panel/files" className='mt-2 flex'>
              <Image src={fileManagementIcon} width={24} height={24} alt='fileManagementIcon' className='self-center'/>
              <p className='ml-2 self-center'>
                File Management
              </p>  
            </Link>  
            <Link href="/panel/users" className='mt-2 flex'>
              <Image src={userManagementIcon} width={24} height={24} alt='userManagementIcon' className='self-center'/>
              <p className='ml-2 self-center'>
                User Management
              </p>  
            </Link>  
          </div>
        </div>
      </div>
    </div>
  ) 
}
