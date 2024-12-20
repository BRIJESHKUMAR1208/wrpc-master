import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import apis from '../../../Api/api.json';
import apiclient from '../../../Api/ApiClient';
// import 'bootstrap/dist/css/bootstrap.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';



export const Form3part2 = () => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFilee, setSelectedFilee] = useState('');
    const [selectedFilee1, setSelectedFilee1] = useState('');
    const [formData, setFormData] = useState({

        
        pcmreview_catA: '',
        pcmnumber_catA: '',
        pcmreview_catB: '',
        pcmnumber_catB: '',
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
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // File is a PDF
            setSelectedFile(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange1 = (event) => {
        const file = event.target.files[0];

        if (file) {
            // File is a PDF
            setSelectedFilee(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a PDF file.');
        }
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];

        if (file) {
            // File is a PDF
            setSelectedFilee1(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a PDF file.');
        }
    };
    const validateForm = () => {
        const errors = {};

        if (!formData.StationName) {
            errors.StationName = "Please enter station name";
        }

        if (!formData.kVLevel) {
            errors.kVLevel = "Please enter KV level";
        }
        if (!formData.Owner) {
            errors.Owner = "Input value";
        }
        if (!formData.Location) {
            errors.Location = "Please enter location";
        }
        if (!formData.PlannedDateAudit) {
            errors.PlannedDateAudit = "Required ";
        }
        if (!formData.DateAudit) {
            errors.DateAudit = "Required";
        }
        if (!formData.AuditEntity) {
            errors.AuditEntity = "Required";
        }
        if (!selectedFile) {
            errors.selectedFile = "Required";
        }
        if (!selectedFilee) {
            errors.selectedFilee = "PRequired";
        }
        if (!selectedFilee1) {
            errors.selectedFilee1 = "Required";
        }
        if (!formData.Remarks) {
            errors.Remarks = "Required";
        }
        if (!formData.CAT_A_deficiencies) {
            errors.CAT_A_deficiencies = "Required";
        }
        if (!formData.AAttendedY_N) {
            errors.AAttendedY_N = "Required";
        }
        if (!formData.ADate_Attended) {
            errors.ADate_Attended = "Required";
        }

        if (!formData.CAT_B_deficiencies) {
            errors.CAT_B_deficiencies = "Required";
        }
        if (!formData.BAttendedY_N) {
            errors.BAttendedY_N = "TRequired";
        }
        if (!formData.BDate_Attended) {
            errors.BDate_Attended = "Required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        // if (!validateForm()) {
        //     return;
        // }

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
            

            let candidateId = 0;
            if (localStorage.getItem("candidateId")) {
                candidateId = localStorage.getItem("candidateId");
            }
            else {
                candidateId = 0;
            }


            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('Attended_CAT_A', formData.AAttendedY_N);
            formDataToSend.append('Date_Attended_CAT_A', formData.ADate_Attended);
            formDataToSend.append('Attended_CAT_B', formData.BAttendedY_N);
            formDataToSend.append('Date_Attended_CAT_B', formData.BDate_Attended);

            const response = await apiclient.post(apis.Tppaobspart3, formDataToSend)

            if (response.status === 200) {
                console.log("user" + response.data)
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
                        AuditEntity: '',
                        Report: '',
                        Compliances: '',
                        Issuesobserved: '',
                        Remarks: '',
                        CAT_A_deficiencies: '',
                        AAttendedY_N: '',
                        ADate_Attended: '',
                        CAT_B_deficiencies: '',
                        BAttendedY_N: '',
                        BDate_Attended: ''
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

    //   useEffect(() => {
    //     const fetchRoles = async () => {
    //       try {
    //         const response = await apiClient.get(api.getUserType);
    //         setDropdownOptions(response.data);
    //       } catch (error) {
    //         console.error('Error fetching roles:', error);
    //       }
    //     };
    //     fetchRoles();
    //   }, []);
    //   useEffect(() => {
    //     const fetchRoles = async () => {
    //       try {
    //         const response = await apiClient.get(api.newuser);
    //         setuser(response.data);
    //       } catch (error) {
    //         console.error('Error fetching roles:', error);
    //       }
    //     };
    //     fetchRoles();
    //   }, []);


    return (
        <>
            <div>
                <div>
                    <TopHeader />

                </div>

                <CmsDisplay />

                <main>
                    <div class="pagetitle">

                        {/* <div className="pagetitle-rgt">
                            <Link to="/dashboard">
                                <button type="button" class="btn btn-info">
                                    Back
                                </button>
                            </Link>
                        </div> */}
                    </div>
                    <div class="main-form">
                        <div class="container-fluid">
                            <div class="InnerSection">
                                <div class="InnerSectionBox">
                                    <form class="forms-sample" onSubmit={handleSubmit}>
                                        <h4>TPPA Observation</h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row"><label
                                                            class="col-sm-2 col-form-label">PCM Review for Cat-A<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2"><span style={{ color: "red" }}>{formErrors.pcmreview_catA}</span>
                                                            <input type="text" class="form-control" name="pcmnumber_catA"
                                                                    value={formData.pcmreview_catA}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.pcmreview_catA} /><small class="invalid-feedback"></small></div>

                                                            <label
                                                                class="col-sm-2 col-form-label">PCM No Cat-A<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.pcmnumber_catA}</span>
                                                                <input type="text" class="form-control" name="pcmnumber_catA"
                                                                    value={formData.pcmnumber_catA}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.pcmnumber_catA} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label
                                                            class="col-sm-2 col-form-label">PCM Review for Cat-B<span
                                                            ><b>*</b></span>:</label>
                                                             
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.pcmreview_catB}</span>
                                                                <input class="form-control" type="text" name="pcmreview_catB"
                                                                    value={formData.pcmreview_catB}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.pcmreview_catB} /><small class="invalid-feedback"></small>
                                                                    </div>
                                                            {/* <div class="col-sm-2"><input class="form-control" name="AttendedY_N" 
                                                    value={formData.AAttendedY_N}
                                                    onChange={handleFileChange}
                                                    isInvalid={!!formErrors.AAttendedY_N} /><small class="invalid-feedback"></small></div> */}
                                                            <label
                                                                class="col-sm-2 col-form-label">PCM No Cat-B<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.pcmnumber_catB}</span>
                                                                <input class="form-control" type="text" name="pcmnumber_catB"
                                                                    value={formData.pcmnumber_catB}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.pcmnumber_catB} /><small class="invalid-feedback"></small>
                                                                    </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="submitButton"><button type="submit" class="btn btn-outline-success btn-icon-text btn-sm"><i
                                            class="mdi mdi-file-check btn-icon-prepend"></i>Submit</button><button type="button"
                                                class="btn btn-outline-danger btn-sm" style={{ marginLeft: "10px" }}><i
                                                    class="mdi mdi-refresh"></i>Reset</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CmsFooter />
                </main>

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

