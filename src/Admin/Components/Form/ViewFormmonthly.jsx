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


export const ViewFormmonthly = () => {
    const { id } = useParams()
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        Id: '',
        poolmember: '',
        monthly_account: '',
        discrepancymonth: '',
        discrepancydate: '',
        summarysheet: '',
        discrepancyreason: '',
        remark: '',
        reason: '',
        //user_id: ''
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


        if (!formData.poolmember) {
            errors.poolmember = "Please enter poolmember";
        }

        if (!formData.monthly_account) {
            errors.monthly_account = "Please enter monthly account";
        }

        if (!formData.discrepancymonth) {
            errors.discrepancymonth = "Please enter discrepancymonth";
        }
        if (!formData.discrepancydate) {
            errors.discrepancydate = "Please enter discrepancydate";
        }

        if (!formData.summarysheet) {
            errors.summarysheet = "Input your values";
        }
        if (!formData.discrepancyreason) {
            errors.discrepancyreason = "Input your values";
        }

        // if (!formData.reason) {
        //     errors.reason = "Input your values";
        // }
        if (!formData.remark) {
            errors.remark = "Input your values";
        }



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

                const response = await apiClient.get(`/api/Monthlyaccount/${id}`);
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
            formDataToSend.append("id", id);  // Append SNo
            formDataToSend.append("remark", formData.remark);  // Append admin_remark
            formDataToSend.append("reason", formData.reason);
            // Send JSON request
            const response = await apiClient.post(`${api.updatemonthly}${id}`, formDataToSend, {
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
                        Id: '',
                        poolmember: '',
                        monthly_account: '',
                        discrepancymonth: '',
                        discrepancydate: '',
                        summarysheet: '',
                        discrepancyreason: '',
                        remark: '',
                        reason: '',
                        //user_id: ''
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
                            <h1>Monthly Account list </h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form Monthly </li>
                                    <li class="breadcrumb-item active"> Monthly Account list  </li>
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
                                                        Monthly Account list
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
                                                                    <td className="ui header"> Pool Entity</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.poolmember ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Entity Name"
                                                                            name='poolmember'
                                                                            value={formData.poolmember} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.poolmember}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Monthly Account</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.monthly_account ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Monthly Account"
                                                                            name='monthly_account'
                                                                            value={formData.monthly_account} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.monthly_account}

                                                                        />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">Discrepancy Month</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.discrepancymonth ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Discrepancy Month"
                                                                            name='discrepancymonth'
                                                                            value={formData.discrepancymonth} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.discrepancymonth}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Discrepancy date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.discrepancydate ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder=" Discrepancy Date"
                                                                            name='discrepancydate'
                                                                            value={formData.discrepancydate} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.discrepancydate}

                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Summary Sheet</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            ref={recommondationRef}
                                                                            className={`form-control ${formErrors.summarysheet ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Summary Sheet"
                                                                            name='summarysheet'
                                                                            value={formData.summarysheet} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.summarysheet}

                                                                        />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">Discrepancy Reason</td>
                                                                    <td>
                                                                        <input
                                                                            className={`form-control ${formErrors.discrepancyreason ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Discrepancy Reason"
                                                                            name="discrepancyreason"  // Correct binding
                                                                            value={formData.discrepancyreason} disabled
                                                                            onChange={handleChange}  // Bind the change handler
                                                                        />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">Is resolved</td>
                                                                    <td>

                                                                        <select
                                                                            className={`form-control ${formErrors.remark ? 'is-invalid' : ''}`}
                                                                            name="remark"
                                                                            value={formData.remark}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.remark}
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

                                                                            className="form-control"
                                                                            type="text"
                                                                            placeholder="Reasons"
                                                                            name="reason"  // Correct binding
                                                                            value={formData.reason}
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

