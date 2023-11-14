import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link as Links } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// firebase
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 const navigate = useNavigate();
    // console.log(fname,lname,email,password);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await updateProfile(user,{
                displayName: `${fname} ${lname}`
            })
            setFName('')
            setLName('')
            setEmail('')
            setPassword('')
            // console.log(auth.currentUser);
            await auth.signOut()
            navigate('/login')
             
        } catch (err) {
            console.error(err)
            toast.error('Invalid Entry', {
                position: 'top-right',
                autoClose: 3000, // milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }

    };

    const handleGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate('/')
            
        } catch (err) {
            console.error(err)
            toast.error('Invalid Entry', {
                position: 'top-right',
                autoClose: 3000, // milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }

    };
    // console.log(auth?.currentUser?.email);

    return (
        <>
          
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{color:'black',fontWeight:700}}>Doc App</h3>

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={(e) => setFName(e.target.value)}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onChange={(e) => setLName(e.target.value)}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(e) => setEmail(e.target.value)}
    
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(e) => setPassword(e.target.value)}
    
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                          
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Links to="/login">
                                        Already have an account? Sign in
                                    </Links>
    
                                </Grid>
                            </Grid>
                            <Button
                            onClick={handleGoogle}
                            fullWidth
                                variant='contained'
                                sx={{ mt: 1, mb: 2, textTransform: 'none' }}>Sign in with google</Button>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
    
            </ThemeProvider>
            <ToastContainer />

        </>
    );
}