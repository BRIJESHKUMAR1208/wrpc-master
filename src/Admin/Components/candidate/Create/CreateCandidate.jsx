import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../../Api/ApiClient';
import api from '../../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/Header'
import Footer from '../../footer/Footer';
import { CHECKBOX_STATUS_UNCHECKED } from 'react-bootstrap-table-next';
import { RadioButtonUnchecked } from '@mui/icons-material';

export const CreateCandidate = () => {

  const [formErrors, setFormErrors] = useState({});
  const [showAdditionalCheckboxes, setShowAdditionalCheckboxes] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    formtype1: 0,
    formtype2: 0,
    formtype3: 0,
    formtype4: 0,
    formtype5: 0,
    formtype1_1: 0,
    formtype1_2: 0,
    formtype1_3: 0,
    formtype1_4: 0

  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleChange = (event) => {
    const { name, value } = event.target;


    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    if (name === 'formtype1') {
      setShowAdditionalCheckboxes(checked);
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked ? 1 : 0, 
        formtype1_1: checked ? prevFormData.formtype1_1 : 0,
        formtype1_2: checked ? prevFormData.formtype1_2 : 0,
        formtype1_3: checked ? prevFormData.formtype1_3 : 0,
        formtype1_4: checked ? prevFormData.formtype1_4 : 0
      }));
    } else {
      // For other checkboxes, update their values directly
      setFormData
      
      ({
        ...formData,
        [name]: checked ? 1 : 0,
      });
    }
  };
  
  
  
  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Please enter your name';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = 'Please input alphabet characters only';
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = `E-mail must include "@" character `;
    }

    if (!formData.mobile_no) {
      errors.mobile_no = "Please enter your mobile number";
    } else if (!/^(\+91|\+91\-|0)?[789]\d{9}$/.test(formData.mobile_no)) {
      errors.mobile_no = "Please enter a valid 10-digit phone number ";
    }

    if (!formData.address) {
      errors.address = "Please enter your address";
    }



    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    // Close the confirmation dialog
    setConfirmDialogOpen(false);
    // Set loading state to true
    setLoading(true);

    try {
     
      const response = await apiClient.post(api.candidate, formData);
      if (response.status === 200) {
        setTimeout(() => {
          // Set loading state back to false after the delay
          setLoading(false);
          // Show the success dialog
          setSuccessDialogOpen(true);

          setFormData({
            name: '',
            email: '',
            mobile_no: '',
            address: '',
            formtype1: 0,
            formtype1_1: 0,
            formtype1_2: 0,
            formtype1_3: 0,
            formtype1_4: 0,
            formtype2: 0,
            formtype3: 0,
            formtype4: 0,
            formtype5: 0

          });

        }, 1000);
      } else if (response.status === 500) {
        alert("User already exists");

      }

      else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      //toast.error('Something went wrong');
      toast.error(error.response.data);
      setLoading(false);
    }
  };




  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <div className="pagetitle-lft">
              <h1>Create Candidate</h1>
              <nav>
                <ol class="breadcrumb">

                  <li class="breadcrumb-item active"> Create Candidate</li>
                </ol>
              </nav>
            </div>
            <div className="pagetitle-rgt">
              <Link to="/candidate/candidatetable">
                <button type="button" class="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="home">
            <div className="homeContainer">
              <div className="bgimg">
                {/* <Container> */}
                <Row className="vh-100 d-flex justify-content-center align-items-left">
                  <Col md={10} lg={12} xs={12}>
                    <Card>
                      <Card.Body>
                        <div className="mb-3 mt-md-4">
                          <h2 className="fw-bold mb-4 text-center text-uppercase">
                            Create Candidate
                          </h2>
                          <div className="mb-3">
                            <Form onSubmit={handleSubmit}>
                              <Form.Group className="mb-3" controlId="Name">
                                <Form.Label

                                  style={{ color: "black" }}
                                >
                                  Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.name}
                                  maxLength={15}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.name}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="Email">
                                <Form.Label

                                  style={{ color: "black" }}
                                >
                                  E-mail
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.email}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="MobileNo"
                              >
                                <Form.Label

                                  style={{ color: "black" }}
                                >
                                  Mobile No.
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Mobile No."
                                  name="mobile_no"
                                  value={formData.mobile_no}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.mobile_no}
                                  maxLength={10}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.mobile_no}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="Address"
                              >
                                <Form.Label

                                  style={{ color: "black" }}
                                >
                                  Address
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter your address"
                                  name="address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.address}
                                  maxLength={30}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group>
                                <Form.Label

                                  style={{ color: "black" }}
                                >
                                  Feedback Form
                                </Form.Label>
                                <div>


                                  <label>TRIPPING COMPLIANCE OF PCM DISCUSSIONS</label>
                                  <input
                                    type='checkbox'
                                    name="formtype1"
                                    checked={formData.formtype1}
                                    onChange={handleCheckboxChange}
                                    id="flexCheckChecked"
                                  />
                                  {/* {showAdditionalCheckboxes && (
                                    <>
                                      <label>Form 1</label>
                                      <input
                                        type='checkbox'
                                        name="formtype1_1"
                                        checked={formData.formtype1_1}
                                        onChange={handleCheckboxChange}
                                        id="flexCheckChecked"
                                      />
                                      <label>Form 2</label>
                                      <input
                                        type='checkbox'
                                        name="formtype1_2"
                                        checked={formData.formtype1_2}
                                        onChange={handleCheckboxChange}
                                        id="flexCheckChecked"
                                      />
                                      <label>Form 3</label>
                                      <input
                                        type='checkbox'
                                        name="formtype1_3"
                                        checked={formData.formtype1_3}
                                        onChange={handleCheckboxChange}
                                        id="flexCheckChecked"
                                      />
                                      <label>Form 4</label>
                                      <input
                                        type='checkbox'
                                        name="formtype1_4"
                                        checked={formData.formtype1_4}
                                        onChange={handleCheckboxChange}
                                        id="flexCheckChecked"
                                      />
                                    </>
                                  )} */}



                                  <label>TPPA PLAN & MONITORING</label>
                                  <input type='checkbox'
                                    name="formtype2"
                                    checked={formData.formtype2}
                                    onChange={handleCheckboxChange}
                                    id="flexCheckChecked"
                                  />
                                  <label>TPPA OBSERVATION</label>
                                  <input type='checkbox'
                                    name="formtype3"
                                    checked={formData.formtype3}
                                    onChange={handleCheckboxChange}
                                    id="flexCheckChecked" />
                                  <label>RELAY SETTINGS DATA</label>
                                  <input type='checkbox'
                                    name="formtype4"
                                    checked={formData.formtype4}
                                    onChange={handleCheckboxChange}
                                    id="flexCheckChecked" />
 <label>Performance Indices</label>
                                  <input type='checkbox'
                                    name="formtype5"
                                    checked={formData.formtype5}
                                    onChange={handleCheckboxChange}
                                    id="flexCheckChecked" /></div>
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <div
                                id="button"
                                className="d-flex "
                                style={{ justifyContent: "space-between" }}
                              >
                                <Button
                                  variant="primary"
                                  type="submit"
                                  style={{ width: 100 }}
                                >
                                  Submit
                                </Button>
                              </div>

                              <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel}>
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              </Dialog>
                            </Form>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                {/* </Container> */}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer />
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>
          Are you sure you want to create this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Candidate created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}


