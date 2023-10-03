'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import { getCookie } from "cookies-next";

export default function LoginPage({}) {

  const [isFailed, setIsFailed] = useState();

  useEffect(() => {
    console.log(hasCookie('user'));
    console.log(getCookie('user'));
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
      
    </div>
  ) 
  
}
