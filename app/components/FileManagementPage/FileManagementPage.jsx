'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

import FilesFilter from 'components/FileManagementPage/FilesFilter';
import FilesList from 'components/FileManagementPage/FilesList';

export default function FileManagementPage({}) {
  
  const router = useRouter();
  const userData = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null

  const [isFailed, setIsFailed] = useState();
  const [files, setFiles] = useState([]);

  const handleSubmit = async (event) => { // Handle file search by given parameters
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
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/search/parameters', {searchParams}, {headers})
      .then(res => {
        setFiles(res.data.files);
      })
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  const handleHashSubmit = async (event) => { // Handle file search the specified hashsum
    event.preventDefault();
    setFiles([]);

    const headers = { 'Authorization': `Bearer ${JSON.parse(userData).accessToken}` };
    await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/panel/files/search/hash', {hashSum: event.target.elements.hashsum.value}, {headers})
      .then(res => {
        setFiles(res.data.files);
      })
      .catch(err => {
        setIsFailed(true);
        console.error(err);
      });
  };

  if (userData) {
    if (isFailed) {
      return (
        <div className='h-auto w-full md:w-4/5 pt-16 md:pt-24 pb-20 ml-auto transition-all transition-500'> 
          <div className='h-auto ml-2 md:ml-12 mr-2 md:mr-6 pb-12
            bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
            text-neutral-200 text-2xl'>    
            <div className='ml-4 mr-4 md:ml-6 md:mr-6'>
              <p className='mt-2 md:mt-4 text-4xl'>File Management</p>
              <div className='mt-4 md:mt-6 border-solid border-t-2 border-neutral-200 border-top'></div>
              <p className='mt-4 md:mt-6'>Something went wrong</p>
            </div>  
          </div>
        </div>
      ) 
    } else {
      return (
        <div className='h-auto w-full md:w-4/5 pt-16 md:pt-24 pb-20 ml-auto transition-all transition-500'> 
          <div className='h-auto ml-2 md:ml-12 mr-2 md:mr-6 pb-12
            bg-neutral-900 border-solid border-2 border-fuchsia-900 rounded-lg
            text-neutral-200 text-2xl'>    
            <div className='ml-4 mr-4 md:ml-6 md:mr-6'>
              <p className='mt-2 md:mt-4 text-4xl'>File Management</p>
              <div className='mt-4 md:mt-6 border-solid border-t-2 border-neutral-200 border-top'></div>
              <FilesFilter handleSubmit={handleSubmit} handleHashSubmit={handleHashSubmit}/>
              <FilesList files={files}/>
            </div>  
          </div>
        </div>
      ) 
    }
  } else {
    router.replace('/');
  }
}
