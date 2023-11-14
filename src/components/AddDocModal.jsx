import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// to get stored data and add in firebase
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
// addDoc is the fucntion used to add data to document

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddDocModal({ handleClose,docLists, setDocLists }) {
    const [docTitle, setDocTitle] = useState('')
    // console.log(docTitle)

    const docCollection = collection(db, "Documents")

    const handleAdd = async() => {
        // const data = await getDocs(docCollection)
        console.log("test5");
        await addDoc(docCollection,{title:docTitle,description:""})
        handleClose()
        setDocLists(false)
        toast.success('Added successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }

    return (
        <>
            <div>
                <Modal
                    open={true}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} classname="text-center">
                        <TextField id="outlined-basic" label="Add New Doc" variant="outlined" onChange={(e) => setDocTitle(e.target.value)} />
                        <Button className='p-3 ms-5' variant="contained" onClick={handleAdd}>Add</Button>
                    </Box>
                </Modal>
            </div>
            <ToastContainer />
        
        </>
    )
}

export default AddDocModal