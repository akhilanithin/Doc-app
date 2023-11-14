import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';





// firebase
import { db } from '../config/firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

function EditDoc() {

    const [docValue, setDocValue] = useState({
        title: '',
        description: "",
    })


    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

    // console.log(docValue.description);
    const { id } = useParams()
    // const sanitizedDescription = DOMPurify.sanitize(docValue.description);
    // const plainTextDescription = sanitizedDescription.replace(/<\/?p>/g, '');
    // console.log(plainTextDescription);    

    const navigate = useNavigate()
    // console.log(docList);

    // firebase

    const editDocList = async () => {
        const editDocument = doc(db, "Documents", id)

        try {
            await updateDoc(editDocument, { description: docValue.description })
            const successPromise = toast.promise(
                () => new Promise((resolve) => resolve('Added successfully!')),
                {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                }
            );

            // Wait for the success message to be closed
            await successPromise;

            navigate('/')

        } catch (err) {
            toast.error('An error occurred!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const getDocsList = async () => {
        const docRef = doc(db, "Documents", id)
        const docSnapShot = await getDoc(docRef)
        setDocValue({
            title: docSnapShot.data().title,
            description: docSnapShot.data().description,
        })
    }

    useEffect(() => {

        getDocsList()
    }, [id])

    // console.log(docList);


    const handleEdit = (value) => {
        try {

            setDocValue((prev) => ({
                ...prev,
                description: value
            }))

        } catch (err) {
            console.error(err)
        }
    }

    const module = {
        toolbar: toolbarOptions,
    }

    return (
        <>
            <div className='container mt-5'>
            <Button className='mb-4' onClick={editDocList} variant="contained">Save</Button>

                {/* <TextEditor value={docValue.description} onChange={handleEdit} /> */}
                <ReactQuill modules={module} theme='snow' value={docValue.description} onChange={handleEdit} />
                <ToastContainer/>

            </div>
        </>
    )
}

export default EditDoc