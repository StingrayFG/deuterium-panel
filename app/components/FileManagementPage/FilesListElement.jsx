'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import axios from 'axios';

import downloadIcon from '/icons/download-icon.svg';
import trashIcon from '/icons/trash-icon.svg';
import fileLockIcon from '/icons/file-lock-icon.svg';

export default function FilesFilter({file}) {

  const userData = sessionStorage.getItem('user');
  const [requiresDeletion, setRequiresDeletion] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const deleteFile = async () => {
    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/' + file.uuid + '/delete', {}, {headers})
      .then(res => {  
        setRequiresDeletion(true);  
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className={`pr-4 text-xl overflow-hidden
    border-solid border-neutral-200 rounded-lg
    transition-all duration-500 
    ${requiresDeletion? 'opacity-0 max-h-0 border-0 mt-0 pt-0 pb-0' : 'opacity-100 max-h-96 border-2 mt-2 pt-2 pb-2'}`}>
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
        <Link href={process.env.NEXT_PUBLIC_BACKEND_URL + '/file/' + file.uuid + '/download'}>
        <button className='h-10 ml-0 pl-2 mt-0 w-48 flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={downloadIcon} width={24} height={24} alt='download-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>Download</p>
        </button>
        </Link>
        <button onClick={deleteFile} className='h-10 ml-2 pl-2 pl-2 mt-0 w-48 flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={trashIcon} width={24} height={24} alt='trash-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>Delete</p>
        </button>
        <button className='h-10 ml-2 pl-2 mt-0 w-48 flex
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={fileLockIcon} width={24} height={24} alt='file-lock-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>Blacklist</p>
        </button>
      </div> 
    </div>
  )   
}
