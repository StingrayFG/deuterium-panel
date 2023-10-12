'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function UserManagementPage({}) {
  
  const router = useRouter();
  const userData = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [showingMessage, setShowingMessage] = useState();
  const [message, setMessage] = useState();

  const showMessage = async (msg) => {
    setMessage(msg);
    setShowingMessage(true);
    await delay(1500);
    setShowingMessage(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.elements.password.value  === event.target.elements.repeatpassword.value) {
      const formUserData = {login: event.target.elements.login.value, password: event.target.elements.password.value}
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/users/create', {userData: formUserData})
        .then(res => {
          if (res.status === 200) {
            showMessage('Created successfully');
          }
        })
        .catch(err => {
          if (!err.response) {
            showMessage('Something went wrong');
          } else if (err.response.status === 400) {
            showMessage('Username already exists');
          }
          console.error(err);
        });
    } else {
      showMessage('Passwords do not match');
    }

  };

  if (userData) {
    return (
      <div className='w-full md:w-4/5 pt-20 pb-20 ml-auto'> 
        <div className='h-auto ml-6 md:ml-12 mr-6 pb-12
          bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
          text-neutral-200 text-2xl'>    
          <div className='ml-6 mr-6'>
            <p className='mt-4 text-4xl'>Status</p>
            <div className='mt-6 border-solid border-t-2 border-neutral-200 border-top'></div>
            
            <form onSubmit={handleSubmit} className='mt-6 w-1/2 text-xl grid place-self-center 
            border-dashed border-2 border-transparent rounded-lg'>
              <div className='w-full mt-0 grid md:flex'>
                <label className='h-6 mt-2 w-48 font-semibold'>Username</label>
                <input className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder='At least 4 characters long'
                  name='login'
                  type='text'
                  min='4' max='64'/>
              </div>

              <div className='w-full mt-2 grid md:flex'>
                <label className='h-6 mt-2 w-48 font-semibold'>Password</label>
                <input className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg 
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder='At least 8 characters long'
                  name='password'
                  type='password'
                  min='8' max='64'/>
              </div> 

              <div className='w-full mt-2 grid md:flex'>
                <label className='h-6 mt-2 w-48 font-semibold'>Repeat Password</label>
                <input className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg 
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder=''
                  name='repeatpassword'
                  type='password'
                  min='8' max='64'/>
              </div> 

              <div className='w-full mt-2 grid md:flex'>
                <button className='h-10 pl-2 pr-2 mr-4 ml-48 grow
                bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 text-xl
                border-solid border-2 border-fuchsia-900 rounded-md '>
                  Submit
                </button>
              </div>   

              <div className='w-full mt-2 pl-48 pr-4 grid'>
                <p className={`place-self-center mt-0 text-xl transition-all duration-250
                ${showingMessage ? 'opacity-100': 'opacity-0'}`}>
                  {'' + message}
                </p>    
              </div>   
            </form>        
          </div>  
        </div>
      </div>
        
    )
  } else {
    router.replace('/panel/status');
  }
  
}
