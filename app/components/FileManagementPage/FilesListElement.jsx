'use client'

import React from 'react';
import Image from 'next/image';

import trashIcon from '/icons/trash-icon.svg';
import fileLockIcon from '/icons/file-lock-icon.svg';

export default function FilesFilter({file}) {

  return (
    <div className='pt-2 pb-2 pr-4 mt-2 text-xl
    border-solid border-2 border-neutral-200 rounded-lg'>
      <div className='ml-4 pr-4 w-full flex'>
        <p className='font-semibold w-48'>Name</p>
        <p>{file.name}</p>
      </div>
      <div className='ml-4 pr-4 w-full flex'>
        <p className='font-semibold w-48'>UUID</p>
        <p>{file.uuid}</p>
      </div>
      <div className='ml-4 pr-4 w-full flex'>
        <p className='font-semibold w-48'>Upload Date</p>
        <p>{file.uploadDate.slice(0, 10) + ' ' + file.uploadDate.slice(11, 19)}</p>
      </div>
      <div className='ml-4 pr-4 w-full flex'>
        <p className='font-semibold w-48'>Upload IP</p>
        <p>{file.uploadIP ? file.uploadIP : '-'}</p>
      </div>
      <div className='ml-4 pr-4 w-full flex'>
        <p className='font-semibold w-48'>MD5</p>
        <p className='break-all'>{file.hashSum}</p>
      </div>
      <div className='ml-4 mt-2 mb-2 pr-4 w-full flex'>
        <button className='h-10 pl-2 pl-2 mt-0 w-64 flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={trashIcon} width={24} height={24} alt='trash-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>Delete</p>
        </button>
        <button className='h-10 ml-2 pl-2 mt-0 w-64 flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={fileLockIcon} width={24} height={24} alt='file-lock-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>Blacklist</p>
        </button>
      </div>
     
    </div>
  )   
}
