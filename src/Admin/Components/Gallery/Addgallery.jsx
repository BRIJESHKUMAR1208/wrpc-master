import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Footer from '../footer/Footer';

export const AddGallery = () => {

    const [formErrors, setFormErrors] = useState({});
    const [showAdditionalCheckboxes, setShowAdditionalCheckboxes] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        titlename: '',
        lstImagePaths: [],  // Changed to an array to store multiple files
    });

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Updated handleFileChange to append new files to the existing ones
    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);

        setFormData((prevFormData) => ({
            ...prevFormData,
            lstImagePaths: [...prevFormData.lstImagePaths, ...newFiles],  // Append new files to the existing ones
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

        setConfirmDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        setConfirmDialogOpen(false);
        setLoading(true);
    
        try {
            const dataToSubmit = new FormData();
            dataToSubmit.append("titlename", formData.titlename);
    
            formData.lstImagePaths.forEach((file) => {
                dataToSubmit.append("lstImagePaths", file);  // Ensure consistent key for multiple files
            });
    
            // Debugging output
            for (let pair of dataToSubmit.entries()) {
                console.log(pair[0], pair[1]);
            }
    
            const response = await apiClient.post(api.Gallery, dataToSubmit);
    
            if (response.status === 200) {
                toast.success("Data saved successfully!");
                setTimeout(() => {
                    setLoading(false);
                    setSuccessDialogOpen(true);
                    setFormData({
                        titlename: '',
                        lstImagePaths: [],  // Reset files after success
                    });
                }, 1000);
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };
    
    return (
        <>
            <div>
                <Header />
                <Sidebar />
                <main id="main" className="main">
                    <div className="pagetitle">
                        <div className="pagetitle-lft">
                            <h1>Add New Gallery</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">Gallery</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="home">
                        <div className="homeContainer">
                            <Row className="vh-100 d-flex justify-content-center align-items-left">
                                <Col md={10} lg={12} xs={12}>
                                    <Card>
                                        <Card.Body>
                                            <h2 className="fw-bold mb-4 text-center text-uppercase">
                                                New Gallery
                                            </h2>
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-3" controlId="Name">
                                                    <Form.Label style={{ color: "black" }}>
                                                        Gallery Heading
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Heading"
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
                                                        Add Images
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="file"
                                                        multiple
                                                        accept="image/jpeg, image/jpg, image/png"  // Restrict to specific image formats
                                                        onChange={handleFileChange}
                                                    />
                                                </Form.Group>


                                                {/* Preview selected images */}
                                                <div>
                                                    {formData.lstImagePaths.length > 0 && (
                                                        <div className="image-previews">
                                                            {formData.lstImagePaths.map((file, index) => (
                                                                <div key={index} className="image-preview">
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        alt={`Preview ${index}`}
                                                                        style={{ width: '100px', height: '100px' }}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                                    <Button variant="primary" type="submit" style={{ width: 100 }}>
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Create</DialogTitle>
                <DialogContent>
                    Are you sure you want to create this gallery?
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
            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>Gallery created successfully!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer />
        </>
    );
};
