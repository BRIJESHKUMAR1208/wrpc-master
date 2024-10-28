import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import LivestreamingTable from './Livestreamingtable';

export const Livestreaming = () => {

    const [formErrors, setFormErrors] = useState({});
    const [showAdditionalCheckboxes, setShowAdditionalCheckboxes] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false)
    const [formData, setFormData] = useState({
        titlename: '',
        tiltefile: ''

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

    const validateForm = () => {
        const errors = {};

        if (!formData.titlename) {
            errors.name = 'Please enter your name';
        } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
            errors.name = 'Please input alphabet characters only';
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
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            tiltefile: file,  // Ensure this matches the key used in handleDeleteConfirm
          }));
        }
    };
      
    const handleDeleteConfirm = async () => {
        // Close the confirmation dialog
        setConfirmDialogOpen(false);
        // Set loading state to true
        setLoading(true);

        try {
            const dataToSubmit = new FormData();

            // Append form data fields to FormData
            dataToSubmit.append("titlename", formData.titlename);
    
            // Append the file if it exists
            if (formData.tiltefile) {
                dataToSubmit.append("titlefile", formData.tiltefile);
            }
    
            const response = await apiClient.post(api.Livestreaming, dataToSubmit);
            if (response.status === 200) {
                alert ("Data saved successfully!");
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        titlename: '',
                        tiltefile: '',


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
            alert("Some went wrong");
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
                            <h1>Add live streaming</h1>
                            <nav>
                                <ol class="breadcrumb">

                                    <li class="breadcrumb-item active"> Live Streaming</li>
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
                                                        Live Streaming
                                                    </h2>
                                                    <div className="mb-3">
                                                        <Form onSubmit={handleSubmit}>
                                                            <Form.Group className="mb-3" controlId="Name">
                                                                <Form.Label

                                                                    style={{ color: "black" }}
                                                                >
                                                                    Title Name
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Title name"
                                                                    name="titlename"
                                                                    value={formData.titlename}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.titlename}
                                                                    
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formErrors.name}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="uploadFile">
                                                                <Form.Label style={{ color: "black" }}>
                                                                    Title File
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="file"  
                                                                    name="file"
                                                                    onChange={handleFileChange}  // Make sure you have a file handler function
                                                                    isInvalid={!!formErrors.file}  // Adjust for file-specific errors if needed
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {formErrors.file}  // Adjust for any file upload errors
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
                <DialogContent> created successfully!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}


