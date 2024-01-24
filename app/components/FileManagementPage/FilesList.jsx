'use client'

import React from 'react';
import { useState } from 'react';

import FilesListElement from 'components/FileManagementPage/FilesListElement';

export default function FilesFilter({files}) {

  const userData = sessionStorage.getItem('user')

  const [updaterState, setUpdaterState] = useState();

  const updateFiles = async (hashSum, isBlacklisted) => { // Update the files' isBlacklisted field based on the specified hashsum
    files.forEach((element, index, array) => {   
      if (element.hashSum === hashSum) {
        element.isBlacklisted = isBlacklisted;
      }    
    });
    setUpdaterState(!updaterState);
  }

  if (userData) {
    return (
      <div className={`w-full place-self-center overflow-hidden
      transition-all ${files.length > 0 ? 'max-h-[2000vh] opacity-100 mt-4 duration-[1000ms] h-auto': 'max-h-0 opacity-0 mt-0 duration-0'}`}>
        <div className='h-auto pl-0 pb-0
        bg-neutral-900 text-neutral-200 text-2xl'>  
          {files.map((file) => (
            <FilesListElement key={file.uuid} file={file} updateFiles={updateFiles}/>
          ))}
        </div>
      </div>
    ) 
  } else {
    null
  }
  
}
