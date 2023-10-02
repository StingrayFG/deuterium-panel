"use client";

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { setCookie } from "cookies-next";
import { hasCookie } from 'cookies-next';
import { redirect } from 'next/navigation'

export default function LoginPage({}) {

  const [isFailed, setIsFailed] = useState();
  const [isSuccess, setIsSuccess] = useState();

  useEffect(() => {
    if (hasCookie('user') || isSuccess) {
      redirect('/panel'); 
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {login: event.target.elements.login.value, password: event.target.elements.password.value}
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/login', {userData})
      .then(res => {
        if (res.data.exists === true) {
          setCookie('user', ({login: event.target.elements.login.value, accessToken: res.data.accessToken}), 
          { sameSite: true, path: '/', maxAge: 10 });   
          console.log(hasCookie('user'));   
          setIsSuccess(true);
        }
      })
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  return (
    <div className='w-96 h-60 mb-12 place-self-center grid
    bg-neutral-900/50
    border-dashed border-2 border-fuchsia-200 rounded-lg'>
      <form onSubmit={handleSubmit} className='grid place-self-center w-full
      border-dashed border-2 border-transparent rounded-lg'>
        <input className='h-12 w-10/12 pl-2 place-self-center
        bg-neutral-700 font-sans text-xl text-neutral-200
        border-solid border-2 border-fuchsia-900 rounded-md outline-none '
          placeholder='Login'
          name='login'
          type='text'/>
        <input className='h-12 w-10/12 pl-2 mt-2 place-self-center
        bg-neutral-700 font-sans text-xl text-neutral-200
        border-solid border-2 border-fuchsia-900 rounded-md outline-none '
          placeholder='Password'
          name='password'
          type='password'/>    
        <button className='h-12 w-10/12 pl-2 mt-6 grid place-self-center
        bg-neutral-900 hover:bg-neutral-800/75 active:bg-neutral-700/75 font-sans text-xl text-neutral-200 
        border-solid border-2 border-fuchsia-900 rounded-md outline-none '>
          <p className='place-self-center
          font-sans text-xl text-neutral-200'>
            Sign in</p>
        </button >
      </form>              
    </div>
  ) 
  
}
