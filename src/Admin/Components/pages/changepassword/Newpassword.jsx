// ChangePasswordForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import { data } from 'jquery';


import { Button, Box, IconButton, Paper, Grid, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import api from '../../utils/apiUrl.json';
import apiClient from  '../../../../Api/ApiClient';
//import api from '../../../..//Api/api.json';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
//import SliderTable from './SliderTable';
import apis from '../../../../Api/api.json';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const user = localStorage.getItem("user");

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }


    let email_result = '';
    if (user) {
      try {
         ;
        const userObject = JSON.parse(user);
        if(userObject.email_result != '')
        email_result = userObject.email_result || '';
        else
          email_result = userObject.r_email || '';
      } catch (error) {
        console.error('Error parsing user JSON from localStorage:', error);
      }
    }


    try {
      
      //const response = await axios.post('http://localhost:5141/api/ChangePassword/Generate_newpassword'
        const response = await apiClient.post(apis.new_password , {
        email: email_result,
        oldPassword,
        newPassword,
        confirmPassword
      });

      setMessage(response.data);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success(response.data);
     
      
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div>

<Header/>
<Sidebar/>
<main id="main" class="main">
<div class="pagetitle row mt-5">
      <h2 className='text-center'>Change Password</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-secondary'>Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
   
     </main>
     <Footer/>
     </div>
  );
};

export default ChangePasswordForm;
