import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// importing to access data stored in firebase// deleteDoc is to delete
import { db } from '../config/firebase'
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {


    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function DocCard({ docLists, setDocLists }) {


    const [docList, setDocList] = useState([])

    const docCollection = collection(db, "Documents")
    const navigate = useNavigate()
    const getDocsList = async () => {
        console.log("testiggg ");
        try {
            const data = await getDocs(docCollection)
            const filterdata = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setDocList(filterdata)
            // console.log(docList);
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getDocsList()
        console.log("test1");
        // Listen for real-time updates
        // const unsubscribe = onSnapshot(docCollection, (snapshot) => {
        //     const updatedData = snapshot.docs.map((doc) => ({
        //         ...doc.data(),
        //         id: doc.id,
        //     }));
        //     setDocList(updatedData);
        // });

        // Clean up the listener when the component unmounts
        // return () => unsubscribe();
    }, [docLists]);



    // delete document
    const deleteDocList = async (id) => {
        // console.log(id);
        const deleteDocument = doc(db, "Documents", id)
        await deleteDoc(deleteDocument)
        setDocLists(false)

    }

    const handleeditNavigate = (id) => {
        navigate(`/editdoc/${id}`)
    }
    return (
        <>
            <Grid container spacing={2}>
                {docList?.map((item, index) => (
                    <Grid key={index} className='mt-5 w-100' item xl={3} md={4}>
                        <Card sx={{ height: 250 }} className=' d-flex flex-column justify-content-between'>

                            <CardContent className='card-content'>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <div style={{ maxHeight: '130px', overflow: 'auto' }}>
                                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                </div>
                            </CardContent>
                            <CardActions className='d-flex justify-content-end me-3'>
                                <Button className='ms-0' size="small" onClick={() => handleeditNavigate(item.id)}>Edit</Button>
                                <Button className='ms-0' size="small" onClick={() => deleteDocList(item.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

                }
            </Grid>
            <ToastContainer />

        </>
    )
}

export default DocCard