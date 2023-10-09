'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import FilesListElement from 'components/FileManagementPage/FilesListElement';

export default function FilesFilter({files}) {

  const userData = sessionStorage.getItem('user')

  if (userData) {
    return (
      <div className={`w-full place-self-center overflow-hidden
      transition-all ${files.length > 0 ? 'max-h-[2000vh] opacity-100 mt-4 duration-[1000ms] h-auto': 'max-h-0 opacity-0 mt-0 duration-0'}`}>
        <div className='h-auto pl-0 pb-0
        bg-neutral-900 text-neutral-200 text-2xl'>  
          {files.map((file) => (
            <FilesListElement file={file} key={file.uuid} />
          ))}
        </div>
      </div>
    ) 
  } else {
    null
  }
  
}
