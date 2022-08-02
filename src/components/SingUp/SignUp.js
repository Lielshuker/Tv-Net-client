import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react";
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';





function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © TvNet '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp(prop) {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const validEmail = emailValidation()
        const validPassword = passwordValidation()
        if (validEmail && validPassword) {
            event.preventDefault();
            await axios.post(`http://localhost:5000/users/`, { first_name, last_name, email, username, password })
                .then(function (response) {
                    navigate("/moviesList", { state: { username: username } })
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.data.msg)
                        console.log(error.response.headers)
                        setNameError(error.response.data.msg)
                    }
                })
        }

        // navigate('/moviesList')
    };
    function handleChangeUsername(e) {
        setUserName(e.target.value)
        setNameError(null)
    }
    function handleChangeEmail(e) {
        setEmail(e.target.value)
        const validEmail = emailValidation()
        if (validEmail) {
            setEmailError(null)
        }
    }
    function handleChangePassword(e) {
        setPassword(e.target.value)
        const validPass = passwordValidation()
        if (validPass) {
            setPasswordError(null)

        }
    }

    function emailValidation() {
        if (!validator.isEmail(email)) {
            setEmailError('Invalid email, please enter anthor email')
            return false
        }
        return true
    }

    function passwordValidation() {
        if (password.length < 6) {
            setPasswordError("Your password must be at least 6 characters")
            return false
        }
        return true
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?movie)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 8,
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e) => setLastName(e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={(e) => handleChangeUsername(e)}
                                        helperText={nameError}
                                        error={nameError ? true : false}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => handleChangeEmail(e)}
                                        helperText={emailError}
                                        error={emailError ? true : false}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => handleChangePassword(e)}
                                        helperText={passwordError}
                                        error={passwordError ? true : false}
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
                                    <Link href="/" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}