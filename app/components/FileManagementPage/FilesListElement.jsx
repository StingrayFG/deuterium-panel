'use client'

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import downloadIcon from '/icons/download-icon.svg';
import trashIcon from '/icons/trash-icon.svg';
import fileLockIcon from '/icons/file-lock-icon.svg';

export default function FilesFilter({file, updateFiles}) {
  
  const userData = sessionStorage.getItem('user');

  const [requiresDeletion, setRequiresDeletion] = useState();
  
  const deleteFile = async () => {
    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/file/' + file.uuid + '/delete', {}, {headers})
      .then(res => {  
        setRequiresDeletion(true);  
      })
      .catch(err => {
        console.error(err);
      });
  };

  const blacklistFile = async () => {
    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    if (file.isBlacklisted) {
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/blacklist/' + file.hashSum + '/remove', {}, {headers})
      .then(res => {  
        file.isBlacklisted = false;
      })
      .catch(err => {
        console.error(err);
      });
    } else {
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/blacklist/' + file.hashSum + '/add', {}, {headers})
      .then(res => {  
        file.isBlacklisted = true;
      })
      .catch(err => {
        console.error(err);
      });
    } 
    updateFiles(file.hashSum, file.isBlacklisted);
  };

  return (
    <div className={`pr-4 text-xl overflow-hidden
    border-solid border-neutral-200 rounded-lg
    transition-all duration-500 
    ${requiresDeletion? 'opacity-0 max-h-0 border-0 mt-0 pt-0 pb-0' : 'opacity-100 max-h-96 border-2 mt-2 pt-2 pb-2'}`}>
      <div className='ml-4 pr-2 w-full flex'>
        <p className='font-semibold w-32 flex-shrink-0'>Name</p>
        <p className='break-all'>{file.name}</p>
      </div>
      <div className='ml-4 pr-2 w-full flex'>
        <p className='font-semibold w-32 flex-shrink-0'>UUID</p>
        <p className='break-all'>{file.uuid}</p>
      </div>
      <div className='ml-4 pr-2 w-full flex'>
        <p className='font-semibold w-32 flex-shrink-0'>Upload Date</p>
        <p className='break-all'>{file.uploadDate.slice(0, 10) + ' ' + file.uploadDate.slice(11, 19)}</p>
      </div>
      <div className='ml-4 pr-2 w-full flex'>
        <p className='font-semibold w-32 flex-shrink-0'>Upload IP</p>
        <p className='break-all'>{file.uploadIP ? file.uploadIP : '-'}</p>
      </div>
      <div className='ml-4 pr-2 w-full flex'>
        <p className='font-semibold w-32 flex-shrink-0'>Hashsum</p>
        <p className='break-all'>{file.hashSum}</p>
      </div>
      <div className='ml-4 mt-2 mb-2 pr-4 w-full flex'>
        <a href={process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/file/' + file.uuid + '/download'}>
          <button className='w-10 md:w-48 h-10 ml-0 pl-1.5 md:pl-2 mt-0 flex overflow-hidden
          bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
          border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
            <Image src={downloadIcon} width={24} height={24} alt='download-icon' className='place-self-center' />
            <p className='opacity-0 md:opacity-100 w-0 md:w-auto ml-1 place-self-center'>Download</p>
          </button>
        </a>
        <button onClick={deleteFile} className='w-10 md:w-48 h-10 ml-2 pl-1.5 md:pl-2 mt-0 flex overflow-hidden
        bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none'>
          <Image src={trashIcon} width={24} height={24} alt='trash-icon' className='place-self-center' />
          <p className='opacity-0 md:opacity-100 w-0 md:w-auto ml-1 place-self-center'>Delete</p>
        </button>
        <button onClick={blacklistFile} className={`h-10 ml-2 pl-1.5 md:pl-2 mt-0 flex overflow-hidden
        hover:bg-neutral-800 active:bg-neutral-700
        border-solid border-2 border-fuchsia-900 rounded-md outline-none
        ${file.isBlacklisted ? 'w-64 bg-fuchsia-950' : 'w-48 bg-neutral-900'}`}>
          <Image src={fileLockIcon} width={24} height={24} alt='file-lock-icon' className='place-self-center' />
          <p className='ml-1 place-self-center'>{file.isBlacklisted ? 'Remove from blacklist' : 'Blacklist'}</p>
        </button>
      </div> 
    </div>
  )   
}
