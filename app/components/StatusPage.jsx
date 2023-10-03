'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import { getCookie } from "cookies-next";

export default function StatusPage({initial}) {

  const [isFailed, setIsFailed] = useState();
  const [Status, setStatus] = useState();

  const cookie = getCookie('myCookie')?.toString()

  useEffect(() => {
    console.log(cookie);
    console.log(initial);
    if (hasCookie('user')) {

      const headers = { 'Authorization': `Bearer ${JSON.parse(getCookie('user')).accessToken}` };
     
      axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/testToken', {headers})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    };
  });

  return (
    <div>
      <p>{cookie ?? initial}</p>
    </div>
  ) 
  
}
