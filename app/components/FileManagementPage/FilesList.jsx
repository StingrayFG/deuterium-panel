'use client'

import React from 'react';
import path from 'path';

import FilesListElement from 'components/FileManagementPage/FilesListElement';

export default function FilesFilter({files}) {

  const userData = sessionStorage.getItem('user')

  const truncateFileName = (fileName) => {
    const len = path.parse(fileName).name.length;
    if (len > 40) {
      return path.parse(fileName).name.slice(0, 32) + '...' + 
      path.parse(fileName).name.slice(len - 5, len) +  path.parse(fileName).ext;
    } else {
      return fileName;
    }
  };

  if (userData) {
    return (
      <div className={`h-auto w-full mt-12 place-self-center
      border-dashed border-0 border-neutral-200 rounded-lg
      transition-all duration-500 ${files ? 'max-h-max opacity-100': 'max-h-0 opacity-0'}`}>
        <div className='h-auto pl-0 pb-4
        bg-neutral-900 text-neutral-200 text-2xl'>  
          {files.map((file) => (
            <FilesListElement file={file} key={file.uuid}/>
          ))}
        </div>
      </div>
    ) 
  } else {
    null
  }
  
}
