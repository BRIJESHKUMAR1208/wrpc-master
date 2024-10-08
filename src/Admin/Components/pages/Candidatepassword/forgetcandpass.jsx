import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography, Alert } from '@mui/material';
import api from '../../../../Api/api.json';
import apiClient from '../../../../Api/ApiClient'

const CandidateForgetpassword = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    const handleGetOtp = async () => {
        try {
            const jsonData = { email };
            const response = await apiClient.post(api.getforgototp, jsonData, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                alert("Otp has been send on your email");
                setOtpSent(true);
                
                setEmailError('');
            } else {
                setEmailError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setEmailError('Failed to send OTP. Please try again.');
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleVerifyOtp = async () => {
        try {
            const jsonData = { email, otp };
            const response = await apiClient.post(api.getverifyotp, jsonData, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                setOtpVerified(true);
                setOtpError('');
                alert("OTP verified! Your login_id and password has been send on your email");
               // window.location.reload("/candidate/login");
                window.location.href("/candidate/login");
            } else {
                setOtpError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography component="h1" variant="h5">
                    Forget Password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    {!otpSent ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={handleEmailChange}
                                error={!!emailError}
                                helperText={emailError}
                            />
                            {emailError && <Alert severity="error">{emailError}</Alert>}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleGetOtp}
                            >
                                Get OTP
                            </Button>
                        </>
                    ) : !otpVerified ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="OTP"
                                name="otp"
                                autoFocus
                                value={otp}
                                onChange={handleOtpChange}
                                error={!!otpError}
                                helperText={otpError}
                            />
                            {otpError && <Alert severity="error">{otpError}</Alert>}
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleVerifyOtp}
                            >
                                Verify OTP
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body1">
                            OTP verified!Now you can login .
                            <a href="/candidate/login">Go Back !</a>
                        </Typography>
                        
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default CandidateForgetpassword;
