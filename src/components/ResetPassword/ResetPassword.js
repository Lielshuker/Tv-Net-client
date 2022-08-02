import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


const theme = createTheme();

export default function ResetPassword() {
    const [username, setUsername] = useState();
    const [newPassword, setNewPassword] = useState();
    const [verifyPassword, setVerifyPassword] = useState(false);
    const navigate = useNavigate();

    const { token } = useParams();

    let state = { open: false, username_error_text: null, password_error_text: null, password_match_error_text: null, disabled: true };
    let validation_key = validation()
    let username_error = validation_key.username_error_text
    let password_error = validation_key.password_error_text
    let password_match_error = validation_key.password_match_error_text

    const handleSubmit = async e => {
        e.preventDefault();
        if (!state.password_error_text && !state.username_error_text && !state.password_match_error_text) {
            await axios.get(`http://localhost:5000/auth/reset/${token}`, { params: { username, password: newPassword } })
                .then(function (response) { console.log(response); navigate("/"); })
                .catch(function (error) { console.log(error); });
        }

    }

    function validation() {
        if (username === "" || !username) {
            state.username_error_text = null

        } else {
            if (username.length <= 6) {
                state.username_error_text = "please enter valid username"
            }
        }

        if (newPassword === "" || !newPassword) {
            state.password_error_text = null
        } else {
            if (newPassword.length >= 6) {
                state.password_error_text = null
                if (newPassword === "" || !newPassword) {
                    state.password_match_error_text = null
                } else if (newPassword !== verifyPassword) {
                    state.password_match_error_text = "Password didn't match, try again"
                }
            } else {
                state.password_error_text = "Your password must be at least 6 characters"
            }
        }

        return state
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
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={e => setUsername(e.target.value)}
                                helperText={username_error}
                                error={username_error ? true : false}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="New Password"
                                name="newPassword"
                                autoFocus
                                onChange={e => setNewPassword(e.target.value)}
                                helperText={password_error}
                                error={password_error ? true : false}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="verifyPassowrd"
                                label="Verify Password"
                                name="verifyPassowrd"
                                autoFocus
                                onChange={e => setVerifyPassword(e.target.value)}
                                helperText={password_match_error}
                                error={password_match_error ? true : false}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
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

