'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import { getCookie } from "cookies-next";

export default function StatusPage({initial}) {

  const [isFailed, setIsFailed] = useState();
  const [status, setStatus] = useState();

  const cookie = getCookie('myCookie')?.toString()

  useEffect(() => {
    if (hasCookie('user') && (!status)) {
      const headers = { 'Authorization': `Bearer ${JSON.parse(getCookie('user')).accessToken}` };
     
      axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/status', {headers})
        .then(res => {
          setStatus(res.data.status)
        })
        .catch(err => {
          console.error(err);
        });
    };
  });

  return (
    <div className='w-5/6 h-5/6 right-0 absolute'> 
      <div className='h-full ml-12 mr-6 mt-20
        bg-neutral-900 border-dashed border-2 border-transparent rounded-lg  
        text-white text-4xl'>
      </div>
    </div>

  ) 
  
}
