import Image from 'next/image';
import { cookies } from 'next/headers'

import LogOutButton from './LogOutButton';

export const dynamic = "force-dynamic";

export default function UserBar() {
  const cookie = cookies().get('user')?.value

  return (
    <div className='w-1/5 h-auto ml-6 mt-20 absolute
    text-neutral-200 text-2xl'>
      <div className='w-full h-12 mt-0 mx-auto place-content-center
        bg-neutral-900
        border-solid border-2 border-fuchsia-900 rounded-lg'>
        <div className='w-11/12 h-full ml-4 flex'> 
          <p className='w-11/12 self-center'>
            {cookie ? JSON.parse(cookie).login : null}
          </p>  
          <LogOutButton />
        </div>   
      </div>
    </div>
  ) 
}
