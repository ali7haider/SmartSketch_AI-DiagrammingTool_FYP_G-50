"use client"
import React, { useEffect, useState } from 'react'
import WorkSpaceHeader from '../_components/WorkSpaceHeader'; 
// import Editor from '../_components/Editor'
// import { useConvex } from 'convex/react';
// import { api } from '@/convex/_generated/api';
// import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';
import DiagramLeftSidebar from '../_components/DiagramLeftSidebar';

function Workspace({params}:any) {
   const [triggerSave,setTriggerSave]=useState(false);
   const convex=1;
  //  const convex=useConvex();
   const [fileData,setFileData]=useState<false>();
  //  const [triggerSave,setTriggerSave]=useState(false);
  //  const convex=useConvex();
  //  const [fileData,setFileData]=useState<FILE|any>();
   useEffect(()=>{
  //  console.log("FILEID",params.fileId)
  //  params.fileId&&getFileData();
   },[]);

   const getFileData=async()=>{
    // const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    // setFileData(result);
  }
  // Define the onAICreate function
  const onAICreate = () => {
    console.log('AI Create button clicked');
    // Your logic for creating diagram with AI
  };
  return (
    <div className="p-0">
      <WorkSpaceHeader className="p-0" onSave={()=>setTriggerSave(!triggerSave)} />

      {/* Workspace Layout  */}
      <div className='grid grid-cols-12'>
        {/* Left Side Panel (25%) */}
        <div className='col-span-3 h-screen border-l'>
          <h3>Left Side Panel</h3>
        </div>
        

        {/* Whiteboard/Canvas (50%) */}
        <div className='col-span-6 h-screen border-l border-r'>
          <Canvas
            // onSaveTrigger={triggerSave}
            // fileId={params.fileId}
            // fileData={fileData}
          />
        </div>

        {/* Right Side Panel (25%) */}
        <DiagramLeftSidebar onAICreate={onAICreate} className='col-span-3 h-screen border-r'/>
        {/* <aside >
        </aside> */}
        
      </div>

    </div>
  )
}

export default Workspace