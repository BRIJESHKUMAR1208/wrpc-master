import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../../Api/ApiClient';
import api from '../../../../Api/api.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link, useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../../sidebar/Sidebar';
import Header from '../../header/Header'
import Footer from '../../footer/Footer';

export const EditUser=()=> {
    const {id}= useParams();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype: '',
  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRole(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

    if (!selectedRole) {
      errors.usertype = "Role is required";
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
setLoading(true);
    try {
      const formDataToSend = {
        ...formData,
        usertype: parseInt(formData.usertype),
      };
      // console.log(formDataToSend)
      const response = await apiClient.post("/api/user/put/"+id, formDataToSend);
      
      if (response.status === 200) {
        
        // Simulate a 3-second delay
        setTimeout(() => {
          // Set loading state back to false after the delay
          setLoading(false);
          // Show the success dialog
          setSuccessDialogOpen(true);
        }, 1000);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Something went wrong');
      setLoading(false);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(api.getUserType);
       
        setDropdownOptions(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(api.deleteuser+id);
       
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <>
      <div>
<main id="main" class="main">
<div class="pagetitle">
  <h1>Edit User</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item ">User</li>
      <li class="breadcrumb-item active"> Edit User</li>
    </ol>
  </nav>
</div>
        <div className="home">
          <Header/>
          <Sidebar/>
          <div className="homeContainer">
           
            <div className='bgimg'>
              <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-left">
                  <Col md={10} lg={12} xs={12}>
                    <Card>
                      <Card.Body>
                        <div className="mb-3 mt-md-4">
                          <h2 className="fw-bold mb-4 text-center text-uppercase">
                          Edit User 
                          </h2>
                          <div className="mb-3">
                            <Form onSubmit={handleSubmit}>
                              <Form.Group className="mb-3" controlId="Name">
                                <Form.Label  style={{ color: "black" }}>Name</Form.Label>
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
                                <Form.Label  style={{ color: "black" }}>E-mail</Form.Label>
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
                              <Form.Group className="mb-3" controlId="MobileNo">
                                <Form.Label  style={{ color: "black" }}>Mobile No.</Form.Label>
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
                              <Form.Group className="mb-3" controlId="Address">
                                <Form.Label  style={{ color: "black" }}>Address</Form.Label>
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

                              <Form.Group className="mb-3" controlId="Usertype">
                                <div className="mb-12">
                                  <Form.Label  style={{ color: "black" }}>Role</Form.Label>
                                  <select
                                    className='form-control'
                                    name='usertype'
                                    value={formData.usertype}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.usertype}
                                  >
                                    <option value='' style={{ color: "black" }}>Select a role</option>
                                    {dropdownOptions.map((data) => (
                                      <option key={data.users_id} value={data.users_id}>
                                        {data.user_name}
                                      </option>
                                    ))}
                                  </select>
                                  <Form.Control.Feedback type="invalid">
                                    {formErrors.usertype}
                                  </Form.Control.Feedback>
                                </div>
                              </Form.Group>

                              <div id="button" className="d-flex " style={{ justifyContent: "space-between" }}>
                                <Button variant="primary" type="submit" style={{ width: 100 }} disabled={loading}>
                                  Submit
                                </Button>
                                
                              </div>

                              <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel} >
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
              </Container>
            </div>
          </div>
        </div>
        </main>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>
          Are you sure you want to Update this user?
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
        <DialogContent>
          User Update successfully!
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Footer/>
    </>
  );
}


