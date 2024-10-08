import React, { useState } from 'react';
import { TextField, Button, Box, Container, Alert } from '@mui/material';
import api from '../../../../Api/api.json';
import apiClient from '../../../../Api/ApiClient';
import { TopHeader } from '../../../../Website/components/TopHeader/TopHeader';
import { CmsFooter } from '../../../../Website/components/Footer/CmsFooter';
import CmsDisplay from '../../../../Website/components/Header/CmsDisplay';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ChangecandidatePassword = () => {
    const storedUserString = localStorage.getItem("user1");
    const user = JSON.parse(storedUserString);
    const email = user.cand_email;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError('New password and confirm password do not match');
            return;
        }
        try {
            const jsonData = { email, oldPassword, newPassword };
            const response = await apiClient.post(api.changepassword, jsonData, {
                headers: { "Content-Type": "application/json" }
            });
            if (response.status === 200) {
                setPasswordError('');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                alert('Password changed successfully');
                navigate('/'); // Redirect to another page after success
            } else {
                setPasswordError('Failed to change password. Please try again.');
            }
        } catch (error) {
            setPasswordError('Failed to change password. Please try again.');
        }
    };

    return (
        <div>
            <TopHeader />
            <CmsDisplay />
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
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="oldPassword"
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                            autoComplete="current-password"
                            autoFocus
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && <Alert severity="error">{passwordError}</Alert>}
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleChangePassword}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Container>
            <CmsFooter />
        </div>
    );
};

export default ChangecandidatePassword;
