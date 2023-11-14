import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'

import Header from '../components/Header'
import DocCard from '../components/DocCard'
import { Button } from '@mui/material'
import AddDocModal from '../components/AddDocModal'



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DocPage() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);   

    const [docLists, setDocLists] = useState(true);

    const updateDocLists = () => {
        setDocLists(true);
        console.log("test2");
    };

    useEffect(()=>{
        updateDocLists()
        console.log("test3");
    },[docLists])

useEffect(()=>{
    toast.error('Use Profile Icon to Logout', {
        position: 'bottom-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
},[])    
  
    return (
        <>
            <Header />
            <div className='container mt-3 mb-5'>
                {/* <h3 className='text-center'>Doc App</h3> */}

                <div className='d-flex justify-content-end'>
                    <Button variant="contained" onClick={handleOpen}>Add Doc</Button>
                </div>
                <div className='docs-collection'>
                    <div className='doc'>
                        <DocCard docLists={docLists} setDocLists={setDocLists} />
                    </div>
                </div>

                <div id='editor'>
                </div>
                {open && <AddDocModal handleClose={handleClose}  docLists={docLists} setDocLists={setDocLists} />}

            </div>
            
            <ToastContainer />

        </>
    )
}

export default DocPage