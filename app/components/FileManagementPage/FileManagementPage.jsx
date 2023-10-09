'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import FilesFilter from 'components/FileManagementPage/FilesFilter';
import FilesList from 'components/FileManagementPage/FilesList';

export default function FileManagementPage({}) {
  
  const userData = sessionStorage.getItem('user')
  const [files, setFiles] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFiles([]);

    const searchParams = {
      name: event.target.elements.name.value,
      ip: event.target.elements.ip.value,
      dateFrom: event.target.elements.datefrom.value,
      dateTo: event.target.elements.dateto.value,
      maxResults: event.target.elements.maxresults.value,
    };

    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/search', {searchParams}, {headers})
      .then(res => {
        setFiles(res.data.files);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleHashSubmit = async (event) => {
    event.preventDefault();
    setFiles([]);

    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/hash', {hashSum: event.target.elements.hashsum.value}, {headers})
      .then(res => {
        setFiles(res.data.files);
      })
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  if (userData) {
    return (
      <div className='h-auto w-full md:w-4/5 pt-20 pb-20 ml-auto transition-all transition-500'> 
        <div className='h-auto ml-6 md:ml-12 mr-6 pb-12
          bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
          text-neutral-200 text-2xl'>    
          <div className='ml-6 mr-6'>
            <p className='mt-4 text-4xl'>File Management</p>
            <div className='mt-6 border-solid border-t-2 border-neutral-200 border-top'></div>
            <FilesFilter handleSubmit={handleSubmit} handleHashSubmit={handleHashSubmit}/>
            <FilesList files={files}/>
          </div>  
        </div>
      </div>
    ) 
  } else {
    null
  }
  
}
