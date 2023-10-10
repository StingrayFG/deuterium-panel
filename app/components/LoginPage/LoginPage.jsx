'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter();
  const userData = sessionStorage.getItem('user')

  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const [isFailed, setIsFailed] = useState();
  const [showingMessage, setShowingMessage] = useState();

  const showMessage = async () => {
    setShowingMessage(true);
    await delay(1500);
    setShowingMessage(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formUserData = {login: event.target.elements.login.value, password: event.target.elements.password.value}
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/login', {userData: formUserData})
      .then(res => {
        if (res.data.exists === true) {
          sessionStorage.setItem('user', JSON.stringify({login: event.target.elements.login.value, accessToken: res.data.accessToken}));
          router.replace('/panel/status');
        } else {
          showMessage();
        }
      })
      .catch(err => {
        showMessage();
        setIsFailed(true)
        console.error(err);
      });
  };
  
  if (!userData) {
    return (
      <div className='w-96 h-72 place-self-center grid 
      text-2xl font-sans text-neutral-200'>
        <div className='w-96 h-[14rem] place-self-center grid
        bg-neutral-900/50
        border-dashed border-2 border-fuchsia-200 rounded-lg'>
          <form onSubmit={handleSubmit} className='grid place-self-center w-full
          border-dashed border-2 border-transparent rounded-lg'>
            <input className='h-10 w-10/12 pl-2 place-self-center
            bg-neutral-700 text-xl
            border-solid border-2 border-neutral-200 rounded-md outline-none '
              placeholder='Login'
              name='login'
              type='text'/>
            <input className='h-10 w-10/12 pl-2 mt-2 place-self-center
            bg-neutral-700 text-xl
            border-solid border-2 border-neutral-200 rounded-md outline-none '
              placeholder='Password'
              name='password'
              type='password'/>    
            <button className='h-10 w-10/12 pl-2 mt-6 grid place-self-center
            bg-neutral-900 hover:bg-neutral-800/75 active:bg-neutral-700/75 font-sans text-xl text-neutral-200 
            border-solid border-2 border-fuchsia-900 rounded-md outline-none '>
              <p className='place-self-center text-xl'>
                Sign in
              </p>
            </button >
          </form>              
        </div>
        <p className={`place-self-center mt-0 text-xl transition-all duration-250
        ${showingMessage ? 'opacity-100': 'opacity-0'}`}>
          {isFailed ? 'Something went wrong' : 'Wrong user data'}
        </p>       
      </div>  
    ) 
  } else {
    router.replace('/panel/status');
  }
}

