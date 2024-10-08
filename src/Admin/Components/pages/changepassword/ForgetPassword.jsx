import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';


const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOtp = async () => {
    try {
      ;

      if (!validateEmail(email)) {
        setMessage('Invalid email format and email mandatory');
        return;
      }
      // Use query parameters to send the email
      //const response = await axios.get(`http://localhost:5141/api/ChangePassword/get_otp?email=${email}`);
      const response = await apiClient.get(apis.send_otp +email );
      setOtpSent(true);
      setMessage(response.data.message);
    } catch (error) {
      // Log the error to console for debugging
      console.error('Error sending OTP:', error);
      //setMessage('Error sending OTP');
       setMessage(error.response.data);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

  if (!validateEmail(email)) {
    setMessage('Invalid email format and email mandatory');
      return;
    }

    if (!otp) {
      setMessage('OTP is required');
      return;
    }

    try {
        const varifyotp ={
          email: email,
          otp : otp
        }
      ;
      //const response = await axios.post('http://localhost:5141/api/ChangePassword/Verify_otp', { email, otp });
      const response = await apiClient.post(apis.varify_otp ,varifyotp);
      //setMessage(response.data);
      alert('Password have been send to mail.');
      //window.location.href = 'http://localhost:3000/login';
      window.location.href("/");
      ;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage(error.response.data);
    }
  };


  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <div className="container">
      <div className="card mb-5 w-50 position-absolute top-50 start-50 translate-middle">
      <h2 className="text-center">Verify OTP</h2>
      
     
      <button type="button"  className="btn btn-primary " onClick={handleGoBack}>Go Back</button>
      <form onSubmit={handleSubmit} className='m-3'>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {otpSent && (
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP:</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}
        <div className="d-grid gap-2">
          {!otpSent ? (
            <button type="button" className="btn btn-primary" onClick={handleSendOtp}>
              Send OTP
            </button>
            
          ) : (
            <button type="submit" className="btn btn-primary">
              Verify OTP
            </button>
          )}
        </div>
      </form>
      {message && <div className="alert alert-info my-3">{message}</div>}
      
      </div>
    </div>
  );
};

export default OtpVerification;
