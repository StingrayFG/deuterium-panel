'use client';

import { useState } from 'react';
import Image from 'next/image';

import caretIcon from '/icons/caret-icon.svg';
import searchIcon from '/icons/search-icon.svg';

export default function FilesFilter({handleSubmit, handleHashSubmit}) {

  const userData = sessionStorage.getItem('user')
  const [isMinimized, setIsMinimized] = useState();

  const changeSize = async () => {
    setIsMinimized(!isMinimized)
    console.log(isMinimized)
  };

  if (userData) {
    return (
      <div className='w-full mt-6 place-self-center'>
        <div className={`w-full overflow-hidden text-xl
        border-solid border-2 border-neutral-200 rounded-lg
        transition-all duration-500 ${isMinimized ? 'opacity-0 max-h-0' : 'mb-2 opacity-100 max-h-screen'}`}>
          <form onSubmit={handleSubmit} className='h-auto mt-0 pb-0 place-self-center w-full'>

            <div className='w-full pl-4'>
              <div className='w-full mt-0 md:mt-4 grid md:flex'>
                <label className='h-6 mt-2 w-32 font-semibold'>Filename</label>
                <input className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder=''
                  name='name'
                  type='text'/>
              </div>

              <div className='w-full mt-2 grid md:flex'>
                <label className='h-6 mt-2 w-32 font-semibold'>Upload IP</label>
                <input className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg 
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder=''
                  name='ip'
                  type='text'/>
              </div> 

              <div className='w-full mt-2 grid md:flex h-max'>
                <label className='h-6 mt-2 w-32 font-semibold'>Upload date</label>
                <div className='mr-4 md:flex grow'>
                  <input className='h-10 w-full md:w-1/2 pl-2 pr-2
                      bg-neutral-700 text-lg
                      border-solid border-2 border-neutral-200 rounded-md outline-none '
                        name='datefrom'
                        type='date'/>
                  <div className='w-4 mt-2 md:mt-6 mb-2 mr-2 md:ml-2 border-solid border-t-2 border-neutral-200 border-top'></div>
                  <input className='h-10 w-full md:w-1/2 pl-2 pr-2
                      bg-neutral-700 text-lg
                      border-solid border-2 border-neutral-200 rounded-md outline-none '
                        name='dateto'
                        type='date'/>
                </div>        
              </div> 

              <div className='w-full mt-2 grid md:flex'>
                <label className='h-6 mt-2 w-32 font-semibold'>Max results</label>
                <input className='h-10 pl-2 pr-3 mr-4 grow
                bg-neutral-700 text-lg 
                border-solid border-2 border-neutral-200 rounded-md outline-none'
                  name='maxresults'
                  type='number'
                  min='5' max='50'
                  defaultValue = '5'/>
              </div> 

              <div className='w-full mt-2 grid md:flex h-max'> 
                <div className='w-full pr-4 grid h-max'>    
                  <button className='h-10 pl-2 mt-0 w-72 ml-auto flex
                  bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
                  border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
                    <Image src={searchIcon} width={24} height={24} alt='search-icon' className='place-self-center' />
                    <p className='ml-1 place-self-center'>Search by parameters</p>
                  </button>
                </div>   
              </div>  
            </div>

          </form>    

          <div className='mt-6 ml-4 mr-4 border-solid border-t-2 border-neutral-200 border-top'></div>

          <form onSubmit={handleHashSubmit} className='h-auto mt-0 pb-6 place-self-center w-full
          border-dashed border-0 border-neutral-200 rounded-lg'>
            <div className='w-full pl-4'>
              <div className='h-auto w-full mt-0 md:mt-4 grid md:flex'>
                <label className='h-6 mt-2 w-32 font-semibold'>Hashsum</label>
                <input required='required' className='h-10 pl-2 pr-2 mr-4 grow
                bg-neutral-700 text-lg
                border-solid border-2 border-neutral-200 rounded-md outline-none '
                  placeholder=''
                  name='hashsum'
                  type='text'/>
              </div>
              <div className='w-full mt-2 grid md:flex h-max'> 
                <div className='w-full pr-4 grid h-max'>    
                  <button className='h-10 pl-2 mt-0 w-72 ml-auto flex
                  bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
                  border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
                    <Image src={searchIcon} width={24} height={24} alt='search-icon' className='place-self-center' />
                    <p className='ml-1 place-self-center'>Search by hashsum</p>
                  </button>
                </div>   
              </div>  
            </div>
          </form>  

        </div>

        <button onClick={changeSize} className='w-full h-10 pl-2 mr-4 mt-0 grid flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 border-spacing-0 rounded-md outline-none'>
          <div className='flex pr-4 ml-2'>
            <div className='flex'>
              <Image src={searchIcon} width={24} height={24} alt='search-icon' className='place-self-center hover:animate-spin' />
              <p className='ml-2 place-self-center semibold text-xl'>Search options</p>
            </div>
            <Image src={caretIcon} width={24} height={24} alt='caretIcon' 
            className={`ml-auto transition-all duration-500 ${isMinimized ? 'rotate-0': 'rotate-180'}`}/>
          </div>
        </button>
      </div>
    ) 
  } else {
    null
  }
  
}
