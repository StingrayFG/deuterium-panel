'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

import uptimeIcon from '/icons/uptime-icon.svg';
import filesSizeIcon from '/icons/files-size-icon.svg';
import filesCountIcon from '/icons/files-count-icon.svg';

const { version } = require('/package.json');

export default function StatusPage({}) {
  const router = useRouter();
  const date = new Date(0);
  const userData = sessionStorage.getItem('user')

  const [status, setStatus] = useState();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    if (userData && (!status)) {

      const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
      axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/status', {headers})
        .then(res => {
          setStatus(res.data.status);     
        })
        .catch(err => {
          console.error(err);
        });
    };
  });

  if (status && userData) {
    date.setSeconds(+status.uptime + +time); 
    return (
      <div className='w-full md:w-4/5 pt-20 pb-20 ml-auto'> 
        <div className='h-auto ml-6 md:ml-12 mr-6 pb-12
          bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
          text-neutral-200 text-xl'>    
          <div className='ml-6 mr-6'>
            <p className='mt-4 text-4xl'>Status</p>
            <div className='mt-6 border-solid border-t-2 border-neutral-200 border-top'></div>
            
            <p className='mt-6'>deuterium-panel v{version}</p>
            <p className='mt-2'>deuterium v{status.version}</p>

            <div className='flex mt-6'>
              <Image src={uptimeIcon} width={24} height={24} alt='uptimeIcon' className='self-center'/>
              <p className='ml-2'>{Math.floor(date.getTime() / (86400 * 1000)) + ':' + date.toISOString().slice(11, 19)}</p>
            </div>        
            <div className='flex mt-2'>
              <Image src={filesSizeIcon} width={24} height={24} alt='filesSizeIcon' className='self-center'/>
              <p className='ml-2'>{status.filesSize} MB</p>
            </div>
            <div className='flex mt-2'>
              <Image src={filesCountIcon} width={24} height={24} alt='filesCountIcon' className='self-center'/>
              <p className='ml-2'>{status.filesCount} </p>
            </div>
          </div>  
        </div>
      </div>
    ) 
  } else if (!userData) {
    router.replace('/');
  } else {
    null
  }
  
}
