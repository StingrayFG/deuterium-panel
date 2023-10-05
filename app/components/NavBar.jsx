import Link from 'next/link';
import Image from 'next/image';

import statusIcon from '/icons/status-icon.svg';
import fileManagementIcon from '/icons/file-management-icon.svg';

export default function NavBar() {

  return (
    <div className='w-1/5 h-auto ml-6 mt-36 absolute
    text-neutral-200 text-2xl'>
      <div className='w-full mt-0 border-dashed border-2 border-neutral-200 rounded-lg bg-neutral-900/50'>
        <div className='w-11/12 h-auto mb-4 ml-4 grid'>
          <Link href="/panel/status" className='mt-2 flex'>
            <Image src={statusIcon} width={24} height={24} alt='statusIcon' className='self-center'/>
            <p className='ml-2 self-center'>
              Status
            </p>  
          </Link>  
          <Link href="/panel/" className='mt-2 flex'>
            <Image src={fileManagementIcon} width={24} height={24} alt='fileManagementIcon' className='self-center'/>
            <p className='ml-2 self-center'>
              File Management
            </p>  
          </Link>  
        </div>
      </div>
    </div>
  ) 
}
