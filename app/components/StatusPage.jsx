'use client';

import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import uptimeIcon from '/icons/uptime-icon.svg';
import filesSizeIcon from '/icons/files-size-icon.svg';
import filesCountIcon from '/icons/files-count-icon.svg';

const { version } = require('/package.json');

export default function StatusPage({initial}) {
  const router = useRouter();
  const date = new Date(0);
  const cookie = initial ?? getCookie('user')?.toString()

  const [forceRefresh, setForceRefresh] = useState();
  const [status, setStatus] = useState();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!forceRefresh) {
      setForceRefresh(true);
      router.refresh();
    }
  })

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  })

  useEffect(() => {
    console.log(initial)
    console.log(getCookie('user')?.toString())
    if (!cookie) {
      router.push('/');
    }
  });
  
  useEffect(() => {
    if (cookie && (!status)) {

      const headers = { 'Authorization': `Bearer ${JSON.parse(cookie).accessToken}` };
      axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/status', {headers})
        .then(res => {
          setStatus(res.data.status);     
        })
        .catch(err => {
          console.error(err);
        });
    };
  });

  if (status) {
    date.setSeconds(+status.uptime + +time); 
    return (
      <div className='w-4/5 h-5/6 right-0 absolute'> 
        <div className='h-full ml-12 mr-6 mt-20
          bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
          text-neutral-200 text-2xl'>    
          <div className='ml-4'>
            <p className='mt-2 text-4xl'>Status</p>
            <div className='mt-6 mr-6 border-dashed border-t-2 border-neutral-200 border-top'></div>
            
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
  } else {
    null
  }
  
}
