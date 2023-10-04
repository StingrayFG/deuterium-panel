import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'

import logoutIcon from '/icons/logout-icon.svg';
import statusIcon from '/icons/status-icon.svg';
import fileManagementIcon from '/icons/file-management-icon.svg';

export default function NavBar() {
  const cookie = cookies().get('user')?.value

  return (
    <div className='w-1/6 h-auto ml-6 mt-20 absolute
    text-neutral-200 text-2xl'>
      <div className='w-full h-12 mt-0 mx-auto place-content-center
        bg-neutral-900
        border-solid border-2 border-fuchsia-900 rounded-lg'>
        <div className='w-11/12 h-full mx-auto flex'> 
          <p className='w-11/12 self-center'>
            {cookie ? JSON.parse(cookie).login : null}
          </p>  
          <button className='w-1/12 self-center'>
            <Image src={logoutIcon} width={24} height={24} alt='logoutIcon' className='self-center'/>
          </button>
        </div>   
      </div>

      <div className='w-full mt-4 border-dashed border-2 border-fuchsia-200 rounded-lg bg-neutral-900'>
        <div className='w-11/12 h-auto mb-4 mx-auto grid'>
          <Link href="/panel/status" className='mt-2 flex'>
            <Image src={statusIcon} width={24} height={24} alt='statusIcon' className='self-center'/>
            <p className='ml-2 self-center'>
              Status
            </p>  
          </Link>  
          <Link href="/panel/status" className='mt-2 flex'>
            <Image src={fileManagementIcon} width={24} height={24} alt='fileManagementIcon' lassName='self-center'/>
            <p className='ml-2 self-center'>
              File Management
            </p>  
          </Link>  
        </div>
      </div>
      
      
    </div>
  ) 
}
