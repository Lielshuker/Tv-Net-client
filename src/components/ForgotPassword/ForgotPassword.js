import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from "axios"



const theme = createTheme();

// TODO - remove
// https://mui.com/material-ui/getting-started/templates/

export default function ForgotPassword({ setToken }) {
    const [email, setEmail] = useState();
    const [isMailSend, setIsMailSend] = useState(false);




    const handleSubmit = async e => {
        e.preventDefault();
        // const access_token = await axios.post(`http://localhost:5000/auth/forgot_password`, { email })
        //     .then(function (response) { console.log(response); })
        //     .catch(function (error) { console.log(error); });
        // setToken(access_token);
        setIsMailSend(true)
    }

    function handleChange(e) {
        setEmail(e.target.value)
        setIsMailSend(false)
    }

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © TvNet '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            {isMailSend && alert("Email sent, please check your inbox to confirm")}

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
                            // flexFlow: 'row nowrap',
                            // justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Forgot Password
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                style={{ width: 600 }}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus

                                onChange={e => handleChange(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >

                                Confirm Email
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="./" variant="body2">
                                        back to login
                                    </Link>
                                </Grid>
                            </Grid>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box >
                </Grid >
            </Grid >
        </ThemeProvider >
    );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }