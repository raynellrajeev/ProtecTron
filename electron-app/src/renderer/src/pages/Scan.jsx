import React, { useState } from 'react';
import Header from '../components/Header';
import { FileUpload } from '../components/FileUpload';
import FullScan from '../components/FullScan';

export default function Home() {
    const [files, setFiles] = useState([])
    const handleFileUpload = (files) => {
        setFiles(files)
        console.log(files)
    }
    return (
        <div className='h-screen'>
            <Header />
            <div className="grid grid-cols-[1.5fr,0.5fr,0.8fr,1.2fr] grid-rows-[1.3fr,0.7fr,1fr] gap-4 border-0 bg-transparent pt-24 p-12 h-full w-full max-w-screen max-h-screen-lg min-h-screen overflow-hidden">
                
                <div className="col-span-1 row-span-3 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar">
                    <div className='flex flex-col justify-center text-center items-center box-border w-full h-full overflow-y-auto  no-scrollbar'>
                        <div>
                            <FileUpload onChange={handleFileUpload} />
                        </div>
                      
                    </div>
                </div>
                <div className='col-span-2 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar'></div>
                <div className='col-span-1 row-span-1 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25 overflow-y-auto  no-scrollbar'>
                    <FullScan />
                    
                </div> 
                <div className='col-span-3 row-span-2 border-2 rounded-2xl flex items-center justify-center bg-neutral-800/30 border-white/25'>
                    
                </div>
               
            </div>
            
        </div>
    )
}

