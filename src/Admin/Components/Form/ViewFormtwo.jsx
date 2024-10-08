import React, { useState, useEffect,useRef  } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../Api/ApiClient';
import api from '../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link,useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { BASE_URL } from '../../../Api/ApiFunctions';

export const ViewFormtwo = () => {
    const {id}= useParams()
const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        SNo: '',
        StationName: '',
        kVLevel: '',
        Owner: '',
        Location: '',
        PlannedofDateAudit: '',
        DateofAudit: '',
        AuditTeamState: '',
        AuditTeamMembers: '',
        Report: '',
        Compliances: '',
        Issuesobserved: '',
        Remarks: ''


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
      
        if (!formData.StationName) {
          errors.StationName = 'Do not left the field blank';
        }
        if (!formData.kVLevel) {
            errors.kVLevel = 'Required';
          }
        if (!formData.Owner) {
            errors.Owner = 'Do not left the field blank';
          }
        if (!formData.Location) {
            errors.Location = 'Required';
          }
          if (!formData.PlannedDateAudit) {
            errors.PlannedDateAudit = 'Required';
          }
          if (!formData.DateAudit) {
            errors.DateAudit = 'Required';
          }
          if (!formData.AuditTeamState) {
            errors.AuditTeamState = 'Required';
          }
          if (!formData.AuditTeamMembers) {
            errors.AuditTeamMembers = 'Required';
          }
          if (!formData.Report) {
            errors.Report = 'Required';
          } 
          if (!formData.Compliances) {
            errors.Compliances = 'Required';
          }
          if (!formData.Issuesobserved) {
            errors.Issuesobserved = 'Required';
          }
          if (!formData.Remarks) {
            errors.Remarks = 'Required';
          }
          if (!formData.CategoryS) {
            errors.CategoryS = 'Required';
          }
          if (!formData.OwnerR) {
            errors.OwnerR = 'Required';
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === 'application/pdf') {
            // File is a PDF
            setSelectedFile(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a PDF file.');
        }
    };

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
    
            const response = await apiClient.get(`/api/TPPA_Plan_Monitoring/${id}`);
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
        setConfirmDialogOpen(false);
        // Set loading state to true
        setLoading(true);

        try {
            const formDataToSend = {
                ...formData,
                usertype: parseInt(selectedRole, 10),
            };

            const response = await apiClient.post(api.newuser, formDataToSend);
            if (response.status === 200) {
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
        SNo: '',
        StationName: '',
        kVLevel: '',
        Owner: '',
        Location: '',
        PlannedDateAudit: '',
        DateAudit: '',
        AuditTeamState: '',
        AuditTeamMembers: '',
        Report: '',
        Compliances: '',
        Issuesobserved: '',
        Remarks: ''
                    });
                    setSelectedRole('');
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
                            <h1>TPPA Plan & Monitoring </h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form two </li>
                                    <li class="breadcrumb-item active"> TPPA Plan & Monitoring  </li>
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
                                                    TPPA Plan & Monitoring 
                                                    </h2>
                                                    <div className="mb-3">
                                                      
                                                        <form className="ui form" onSubmit={handleSubmit}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="ui header">S.No</td>
                                                                        <td>
                                                                            <input className="form-control" type="text" placeholder="Serial no"  value={formData.sr_no} disabled />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Station Name</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.StationName ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Station Name"
                                                                            name='StationName'
                                                                            value={formData.station_name} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.StationName}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">KV Level</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.kVLevel ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="KV Level"
                                                                            name='kVLevel'
                                                                            value={formData.kv_level} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.kVLevel}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Owner</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Owner ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Owner"
                                                                            name='Owner'
                                                                            value={formData.owner} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Owner}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Location</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Location ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Location"
                                                                            name='Location'
                                                                            value={formData.location} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Location}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Planned Date of Audit</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.PlannedDateAudit ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Planned Date of Audit"
                                                                            name='PlannedDateAudit'
                                                                            value={formData.planned_date_of_audit} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.PlannedDateAudit}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Date of Audit</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.DateAudit ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder=" Date of Audit"
                                                                            name='DateAudit'
                                                                            value={formData.date_of_audit} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.DateAudit}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Audit team state</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.AuditTeamState ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Audit team state"
                                                                            name='AuditTeamState'
                                                                            value={formData.audit_team_state} disabled 
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.AuditTeamState}
                                                                             
                                                                        />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Reports</td>
                                                                        <td>
                                                                        <Link
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Report ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Reports"
                                                                            name='Report'
                                                                            to={`${BASE_URL+formData.reportpdfpath}`}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.StationName}
                                                                        >{<PictureAsPdfIcon className="me-2" />} </Link>


                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Compliances</td>
                                                                        <td>
                                                                        <Link
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Compliances ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Compliances"
                                                                            name='Compliances'
                                                                            to={`${BASE_URL+formData.compliancesppath}`}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.StationName}
                                                                             
                                                                            >{<PictureAsPdfIcon className="me-2" />} </Link>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Issues Observed</td>
                                                                        <td>
                                                                        <Link
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Issuesobserved ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Issues Observed"
                                                                            name='Issuesobserved'
                                                                            to={`${BASE_URL+formData.issues_observedpath}`}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Issuesobserved}
                                                                            >{<PictureAsPdfIcon className="me-2" />} </Link>  
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="ui header">Remarks</td>
                                                                        <td>
                                                                        <Form.Control
                                                                         ref={recommondationRef}
                                                                         className={`form-control ${formErrors.Remark ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Remarks"
                                                                            name='Remark'
                                                                            value={formData.remarks} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.Remark}
                                                                             
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

