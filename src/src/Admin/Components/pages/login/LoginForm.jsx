import React, { useState } from "react";
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
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link, useNavigate, Redirect } from "react-router-dom";
// import api from '../../utils/apiUrl.json';
// import apiClient from '../../services/AxiosApi';

import api from "../../../../Api/api.json";
import apiClient from "../../../../Api/ApiClient";
import ReCAPTCHA from "react-google-recaptcha";
import Captcha from "../../Captcha/Captcha";
import avtar from "../../../../assets/images/avtar.png";
import axios from 'axios'
import CryptoJS from 'crypto-js';

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    r_email: "",
    r_password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [iscapcha, issetCapcha] = useState(true);
  const [capcha, setCapcha] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [openIncorrectCredentialsDialog, setOpenIncorrectCredentialsDialog] = useState(false);
  const [stateLoginButton, setStateLoginButton] = useState({
    isVerified: true,
  });



  const enc = () => {

  }
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  function encryptData(data, key) {
    //const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    //const encrypted = CryptoJS.AES.encrypt(data, key, { Padding: CryptoJS.pad.Pkcs7 }).toString();
    const encrypted = CryptoJS.AES.encrypt(data, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    return encrypted;
  }
  const handleOpenIncorrectCredentialsDialog = () => {
    setOpenIncorrectCredentialsDialog(true);
  };

  // Function to close the dialog for incorrect credentials
  const handleCloseIncorrectCredentialsDialog = () => {
    setOpenIncorrectCredentialsDialog(false);
  };
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

    //const originalData = user.r_password
    var key = CryptoJS.enc.Utf8.parse('8080808080808080')
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080')
    var encrypassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.r_password), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    var encryemail = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.r_email), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    var encrycapcha = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(capcha), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    const jsonData = {
      r_email: encryemail.toString(),
      r_password: encrypassword.toString(),
      capcha: capcha,

    };
    try {
       ;
      const response = await apiClient.post(api.login, jsonData
        , {
          headers: {
            "Content-Type": "application/json"
          }
        });


      // const response = await axios.post('http://alldatabase.c4k.in/api/Login', jsonData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     //"Content-Type": "multipart/form-data",
      //   }});


      if (response && response.data) {
         ;
        if (response.status === 200) {
          let dt = response.data;
          let user = dt.user;
          let token = dt.token;
          let newExpirationTime = dt.timeexpire;
          localStorage.setItem("user", JSON.stringify(user));
         
          localStorage.setItem("token", token);
          localStorage.setItem("expirationTime", newExpirationTime);

          setDialogText("You have successfully logged in ");
          handleOpenIncorrectCredentialsDialog();

          setTimeout(() => {
            //handleCloseDialog();
            handleCloseIncorrectCredentialsDialog();
            // navigate("/dashboard"); // Navigate to the "/dashboard" page after successful login
            // window.location.href("/dashboard");
            window.location.replace("/dashboard");
          }, 3000); // Adjust the delay as needed
        }
      } else {
        setDialogText("You have entered invalid details");
        handleOpenIncorrectCredentialsDialog();
      }
    } catch (error) {
      // console.log("loginerrrrerer",error);
      if (error.response.data === "already_login") {
        setDialogText("User already login if you want to continue please click ok ");
        handleOpenDialog();
      } else if (error.response.data === "not_found") {
        setDialogText("You have entered invalid details");
        //handleOpenDialog();
        handleOpenIncorrectCredentialsDialog();
      }
    }
  };


  function onChange(value) {
    // console.log("Captcha value:", value);
    setCapcha(value);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = async (event) => {
    setOpenDialog(false);
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

    //const originalData = user.r_password
    var key = CryptoJS.enc.Utf8.parse('8080808080808080')
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080')
    var encrypassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.r_password), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    var encryemail = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(user.r_email), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    var encrycapcha = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(capcha), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    const jsonData2 = {
      r_email: encryemail.toString(),
      r_password: encrypassword.toString(),
      capcha: capcha,

    };
    try {
      const response = await apiClient.post(api.AdminLoginagain, jsonData2
        , {
          headers: {
            "Content-Type": "application/json"
          }
        });

      if (response && response.data) {
        if (response.status === 200) {
          let dt = response.data;
          let user = dt.user;
          let token = dt.token;
          let newExpirationTime = dt.timeexpire;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          localStorage.setItem("expirationTime", newExpirationTime);

          setDialogText("You have successfully logged in ");
          handleOpenIncorrectCredentialsDialog();

          setTimeout(() => {
            //handleCloseDialog();
            handleCloseIncorrectCredentialsDialog();
            // navigate("/dashboard"); // Navigate to the "/dashboard" page after successful login
            // window.location.href("/dashboard");
            window.location.replace("/dashboard");
          }, 3000); // Adjust the delay as needed
        }
      } else {
        setDialogText("You have entered invalid details");
        handleOpenIncorrectCredentialsDialog();
      }
    } catch (error) {
      if (error.response) {
        alert("You have entered invalid details");
      }
    }
  }



  const handleCancelDialog = () => {
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
          <p className="loginHeading">Western Regional Power Committee</p>
          <img className="panelavatar" src={avtar} />
          <p className="logintitle"> Admin</p>
          <Typography component="h1" variant="h5"></Typography>
          <Form onSubmit={handleSubmit}>
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
            {/* <div className="form-group ">
            <Captcha sendStateCaptcha={setStateLoginButton} />
          </div> */}
            <ReCAPTCHA
              sitekey="6LdGJv0UAAAAAIvZIBzc9LZ0kY1FovqsgO2Ewjb8"
              onChange={onChange}
            />
              <Row className="align-box"> 
              <Col>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={stateLoginButton.isVerified === true}
            // disabled={stateLoginButton.isVerified === true ? true : false}
            >
              Sign In
            </Button>
            </Col>
            <Col>
            <Button> <Link to="/ForgetPassword" className="button-link">
            Forget Password
        </Link>
             
            </Button>
            </Col>
            </Row>
          </Form>
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: dialogStyles }}
      >
        <DialogTitle id="alert-dialog-title" style={titleStyles}>
          {"Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={contentTextStyles}
          >
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={dialogActionsStyles}>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
          <Button onClick={handleCancelDialog} color="secondary"> {/* Cancel Button */}
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openIncorrectCredentialsDialog}
        onClose={handleCloseIncorrectCredentialsDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: dialogStyles }}
      >
        <DialogTitle id="alert-dialog-title" style={titleStyles}>
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={contentTextStyles}
          >
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={dialogActionsStyles}>
          <Button onClick={handleCloseIncorrectCredentialsDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
