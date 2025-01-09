import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link, useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { BASE_URL } from '../../../Api/ApiFunctions';
import axios from 'axios';


export const ViewFormweekly = () => {
    const { id } = useParams()
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        SNo: '',
                        name_of_pool_entity: '',
                        weekly_account: '',
                        account_period_start_week_date: '',
                        account_period_end_week_date: '',
                        discrepancy_period_date: '',
                        discrepancy_period_blocks: '',
                        discrepancy_reason: '',
                        isresolved: '',
                        reasons: ''

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

        if (!formData.name_of_pool_entity) {
            errors.name_of_pool_entity = 'Do not left the field blank';
        }
        if (!formData.weekly_account) {
            errors.weekly_account = 'Required';
        }
        if (!formData.account_period_start_week_date) {
            errors.account_period_start_week_date = 'Do not left the field blank';
        }
       
        if (!formData.account_period_end_week_date) {
            errors.account_period_end_week_date = 'Required';
        }
        if (!formData.discrepancy_period_date) {
            errors.discrepancy_period_date = 'Required';
        }
       
        if (!formData.discrepancy_period_blocks) {
            errors.discrepancy_period_blocks = 'Required';
        }
        if (!formData.discrepancy_reason) {
            errors.discrepancy_reason = 'Required';
        }
        if (!formData.isresolved) {
            errors.isresolved = 'Required';
        }
        // if (!formData.reasons) {
        //     errors.reasons = 'Required';
        // }
       


        setFormErrors(errors);

        // Focus on the first invalid field
        if (Object.keys(errors).length > 0) {
            if (recommondationRef.current) {
                recommondationRef.current.focus();
            }
            // Focus on other fields as needed
        }

        return Object.keys(errors).length === 0;
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];

    //     if (file && file.type === 'application/pdf') {
    //         // File is a PDF
    //         setSelectedFile(file);

    //         // You can perform additional actions here if needed
    //     } else {
    //         // File is not a PDF
    //         alert('Please upload a PDF file.');
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Open the confirmation dialog when the user clicks "Submit"
        setConfirmDialogOpen(true);
    };

    useEffect(() => {
        async function fetchData2() {
            try {

                const response = await apiClient.get(`/api/Weeklyaccount/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData2();
    }, []);

    const handleDeleteCancel = () => {
        // Handle cancel action in the confirmation dialog
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        // Close the confirmation dialog
       
        try {
            setConfirmDialogOpen(false);
            debugger;
            // Set loading state to true
            setLoading(true);
            const formDataToSend = new FormData();
            formDataToSend.append("SNo", id);  // Append SNo
            formDataToSend.append("isresolved", formData.isresolved);  // Append admin_remark
            formDataToSend.append("reasons", formData.reasons);
            // Send JSON request
        const response = await apiClient.post(api.updateweekly, formDataToSend, {
            headers: {
                "Content-Type": "application/json",
            },
        });

            //const response = await apiClient.post(api.updateweekly, formDataToSend);
            if (response.status === 200) {
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        SNo: '',
                        name_of_pool_entity: '',
                        weekly_account: '',
                        account_period_start_week_date: '',
                        account_period_end_week_date: '',
                        discrepancy_period_date: '',
                        discrepancy_period_blocks: '',
                        discrepancy_reason: '',
                        isresolved: '',
                        reasons: ''
                    });
                    setSelectedRole('');
                  
                 // window.location.pathname = "/form/FormData";
                }, 1000);
            } else if (response.status === 500) {
                alert("User already exists");

            }

            else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Something went wrong');
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
                            <h1>Weekly Account list </h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form Weekly </li>
                                    <li class="breadcrumb-item active"> Weekly Account list  </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="pagetitle-rgt">
                            <Link to="/dashboard">
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
                                                    Weekly Account list
                                                    </h2>
                                                    <div className="mb-3">

                                                        <form className="ui form" onSubmit={handleSubmit}>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <td className="ui header">S.No</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Serial no" value={formData.srn} disabled />
                                                                    </td>
                                                                </tr> */}
                                                                <tr>
                                                                    <td className="ui header">Name of Pool Entity</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.name_of_pool_entity ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Entity Name"
                                                                            name='StationName'
                                                                            value={formData.name_of_pool_entity} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.name_of_pool_entity}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Weekly Account</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.weekly_account ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Weekly Account"
                                                                            name='weekly_account'
                                                                            value={formData.weekly_account} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.weekly_account}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                  
                                                                <tr>
                                                                    <td className="ui header">Account period start week date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.account_period_start_week_date ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Account period start week date"
                                                                            name='account_period_start_week_date'
                                                                            value={formData.account_period_start_week_date} disabled  
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.account_period_start_week_date}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Account period end week date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.account_period_end_week_date ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder=" Account period end week date"
                                                                            name='account_period_end_week_date'
                                                                            value={formData.account_period_end_week_date} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.account_period_end_week_date}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Discrepancy period date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.discrepancy_period_date ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Audit team state"
                                                                            name='discrepancy_period_date'
                                                                            value={formData.discrepancy_period_date} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.discrepancy_period_date}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                               
                                                                <tr>
                                                                    <td className="ui header">Discrepancy period blocks</td>
                                                                    <td>
                                                                        <input
                                                                            className={`form-control ${formErrors.discrepancy_period_blocks ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Discrepancy period blocks"
                                                                            name="discrepancy_period_blocks"  // Correct binding
                                                                            value={formData.discrepancy_period_blocks} disabled
                                                                            onChange={handleChange}  // Bind the change handler
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Discrepancy Reason</td>
                                                                    <td>
                                                                        <input
                                                                           className={`form-control ${formErrors.discrepancy_reason ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Discrepancy Reason"
                                                                            name="discrepancy_reason"  // Correct binding
                                                                            value={formData.discrepancy_reason} disabled
                                                                            onChange={handleChange}  // Bind the change handler
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Is resolved</td>
                                                                    <td>

                                                                    <select
          className={`form-control ${formErrors.isresolved ? 'is-invalid' : ''}`}
        name="isresolved"
        value={formData.isresolved}
        onChange={handleChange}
        
        
    >
        <option value="">Select</option> {/* Default placeholder */}
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
                                                                       
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Reasons</td>
                                                                    <td>
                                                                        <input
                                                                           className={`form-control ${formErrors.reasons ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="reasons"
                                                                            name="reasons"  // Correct binding
                                                                            value={formData.reasons} 
                                                                            onChange={handleChange}  // Bind the change handler
                                                                           
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
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
                                                        </form>

                                                        <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel}>
                                                            <Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner>
                                                        </Dialog>

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
                    Are you sure you want to submit ?
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
                <DialogContent>Saved successfully!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

