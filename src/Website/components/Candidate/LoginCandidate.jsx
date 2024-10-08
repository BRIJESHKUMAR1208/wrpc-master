import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from '../../../Api/api.json'
import apiClient from '../../../Api/ApiClient'
import ReCAPTCHA from "react-google-recaptcha";
import avtar from '../../../assets/images/avtar.png';
import axios from 'axios';

// import ReCAPTCHA from "react-google-recaptcha";
export const LoginCandidate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    r_email: "",
    r_password: "",

  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [iscapcha, issetCapcha] = useState(true);
  const [capcha, setCapcha] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [stateLoginButton, setStateLoginButton] = useState({
    isVerified: true,
  });

  const jsonData = {
    r_email: user.r_email,
    r_password: user.r_password,
    capcha: capcha,

  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Validate email
  //   if (!emailRegex.test(user.r_email)) {
  //     setIsValidEmail(false);
  //     return;
  //   } else {
  //     setIsValidEmail(true);
  //   }

  //   // Validate password
  //   if (!user.r_password) {
  //     setIsValidPassword(false);
  //     return;
  //   } else {
  //     setIsValidPassword(true);
  //   }
  //   if (!user.capcha) {
  //     issetCapcha(false);
  //     return;
  //   } else {
  //     issetCapcha(true);
  //   }

  //   const response = await apiClient.post(api.login, jsonData);

  //   if (response && response.data) {
  //     if (response.status === 200) {
  //       let dt = response.data;
  //       console.log(dt)
  //       let user = dt.user;
  //       let token = dt.token;
  //       let newExpirationTime = dt.timeexpire
  //       localStorage.setItem("user", JSON.stringify(user));
  //       const storedUserString = localStorage.getItem('user');
  //       const u = JSON.parse(storedUserString);

  //       if (dt) {
  //         localStorage.setItem("token", token);
  //         // localStorage.setItem('expirationTime', newExpirationTime);
  //         setDialogText("You have successfully logged in ");

  //         localStorage.setItem('expirationTime', newExpirationTime);

  //         handleOpenDialog();
  //         // toast.success(' logged in');

  //         setTimeout(() => {
  //           handleCloseDialog();
  //           navigate("/dashboard"); // Navigate to the "/dashboard" page after successful login
  //         }, 1000); // Adjust the delay as needed
  //       }
  //     }
  //   } else {
  //     setDialogText("You have entered incorrect email/password");
  //     handleOpenDialog();
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!emailRegex.test(user.r_email)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
    }

    // Validate password
    if (!user.r_password) {
      setIsValidPassword(false);
      return;
    } else {
      setIsValidPassword(true);
    }

    if (!capcha) {
      alert("Please Tick Checkbox in Capture");
      return;
    }
    // Validate CAPTCHA

    // const response = await apiClient.post('/api/Candidate/LoginCandidate', jsonData);

    try {
      // const response = await axios.post('http://localhost:5141/api/Candidate/LoginCandidate', jsonData);
      const response = await apiClient.post('api/Candidate/LoginCandidate', jsonData);

      if (response && response.data) {
        if (response.status === 200) {
          let dt = response.data;
          let user = dt.user;
          var candidateId = response.data.user.cands_id;
          localStorage.setItem("candidateId", candidateId);
          localStorage.setItem("user1", JSON.stringify(user));
          if (dt) {
            // localStorage.setItem("user", JSON.stringify(dt));

            setDialogText("You have successfully logged in ");
            handleOpenDialog();

            setTimeout(() => {
              handleCloseDialog();
              navigate("/");
            }, 1000);
          }
        }
      } else {
        if (response && response.status === 400) {
          setDialogText("You have entered incorrect email/password");
          handleOpenDialog();
        } else {
          setDialogText("An error occurred while attempting to login");
          handleOpenDialog();
        }
      }
    } catch (error) {
      if (error && error.response.status === 400) {
        alert("You have entered incorrect email/password")
      } else {
        setDialogText("An error occurred while attempting to login");
      }
      console.error("An error occurred while attempting to login:", error);
    }
  };

  function onChange(value) {
   
    setCapcha(value)

  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Custom CSS styling for the dialog
  const dialogStyles = {
    minWidth: "300px",
    maxWidth: "400px",
    borderRadius: "10px",
  };

  const titleStyles = {
    backgroundColor: "#3f51b5",
    color: "#fff",
  };

  const contentTextStyles = {
    padding: "20px",
  };

  const dialogActionsStyles = {
    borderTop: "1px solid #e0e0e0",
    padding: "10px",
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className='loginHeading'>Western Regional Power Committee</p>
          <img className="panelavatar" src={avtar} />
          <p className='logintitle'>candidate</p>

          <Typography component="h1" variant="h5">
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="r_email"
              label="Email Address"
              name="r_email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={!isValidEmail}
              helperText={!isValidEmail ? "Invalid email address" : ""}
            />
            <TextField
              margin="normal"
              fullWidth
              name="r_password"
              label="Password"
              type="password"
              onChange={handleChange}

              error={!isValidPassword}
              helperText={!isValidPassword ? "Please enter your password" : ""}
            />

            <ReCAPTCHA
              sitekey="6LdGJv0UAAAAAIvZIBzc9LZ0kY1FovqsgO2Ewjb8"
              onChange={onChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={
                stateLoginButton.isVerified === true

              }


            >
              Sign In
            </Button>
            <a href="/candforgotpassword">Forgot Password?</a>
          </form>
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: dialogStyles }}
      >
        <DialogTitle id="alert-dialog-title" style={titleStyles}>{""}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={contentTextStyles}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={dialogActionsStyles}>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
