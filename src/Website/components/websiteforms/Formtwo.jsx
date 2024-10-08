import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import apis from '../../../Api/api.json';
// import 'bootstrap/dist/css/bootstrap.css';
import { CmsFooter } from '../Footer/CmsFooter';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';

import './custom-form.scss';
import axios from 'axios';


export const Formtwo = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [formData, setFormData] = useState({
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
        //   if (!formData.Report) {
        //     errors.Report = 'Required';
        //   } 
        //   if (!formData.Compliances) {
        //     errors.Compliances = 'Required';
        //   }
        //   if (!formData.Issuesobserved) {
        //     errors.Issuesobserved = 'Required';
        //   }
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

        if (file) {
            // File is a PDF
            setSelectedFile(file);

            // You can perform additional actions here if needed
        }
        // else {
        //     // File is not a PDF
        //     alert('Please upload a PDF file.');
        // }
    };
    const handleFileChange1 = (event) => {
        const file = event.target.files[0];


        // File is a PDF
        setSelectedFile1(file);


    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        setSelectedFile2(file);

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
         ;
        setConfirmDialogOpen(false);

        setLoading(true);

        try {
 ;
            let candidateId=0;
            if (localStorage.getItem("candidateId")) {
                 candidateId = localStorage.getItem("candidateId");
            }
            else{
                 candidateId = 0;
            }

            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('Station_Name', formData.StationName);
            formDataToSend.append('kV_Level', formData.kVLevel);
            formDataToSend.append('Owner', formData.Owner);
            formDataToSend.append('Location', formData.Location);
            formDataToSend.append('Planned_Date_of_Audit', formData.PlannedDateAudit);
            formDataToSend.append('Date_of_Audit', formData.DateAudit);
            formDataToSend.append('Audit_Team_State', formData.AuditTeamState);
            formDataToSend.append('Audit_Team_Members', formData.AuditTeamMembers);
            formDataToSend.append('Report', selectedFile);
            formDataToSend.append('Compliances', selectedFile1);
            formDataToSend.append('Issues_Observed', selectedFile2);
            formDataToSend.append('Remarks', formData.Remarks);
            formDataToSend.append('languagetype', 1);
 ;
            const response = await apiclient.post(apis.Tppaplan, formDataToSend);
            // const response = await axios.post("https://localhost:7006/api/TPPA_Plan_Monitoring/Getppa_list", formDataToSend)
            if (response.status === 200) {
                // console.log("user" + response.data)
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


    // console.log(formData)

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
                                        <h4>TPPA Plan & Monitoring
                                        </h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Station Name<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2"> <span style={{ color: "red" }}>{formErrors.StationName}</span>
                                                                <input class="form-control"
                                                                    name="StationName"
                                                                    placeholder="Enter Station Name"
                                                                    maxlength="50"
                                                                    value={formData.StationName}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.StationName}
                                                                /></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">kV Level<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.kVLevel}</span>
                                                                <input class="form-control"
                                                                    name="kVLevel"
                                                                    placeholder="Enter kV Level"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.kVLevel}
                                                                    maxlength="50" value={formData.kVLevel} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Owner<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Owner}</span>
                                                                <input class="form-control" name="Owner" placeholder="Owner"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Owner}
                                                                    maxlength="50" value={formData.Owner} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Location<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Location}</span>
                                                                <input class="form-control" name="Location" placeholder="Enter Location"
                                                                    maxlength="50" value={formData.Location}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Location} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Planned date of Audit<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.PlannedDateAudit}</span>
                                                                <input class="form-control"
                                                                    className="form-control" name="PlannedDateAudit" type="date"
                                                                    value={formData.PlannedDateAudit}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.PlannedDateAudit} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Date of Audit<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.DateAudit}</span>
                                                                <input class="form-control"
                                                                    className="form-control" name="DateAudit" type="date"
                                                                    value={formData.DateAudit}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.DateAudit} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Audit Team State<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.AuditTeamState}</span>
                                                                <input class="form-control" name="AuditTeamState" placeholder="Enter Audit Team state"
                                                                    maxlength="50" value={formData.AuditTeamState}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.AuditTeamState} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Audit Team Members<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.AuditTeamMembers}</span>
                                                                <input class="form-control" name="AuditTeamMembers" placeholder="Enter audit team members"
                                                                    value={formData.AuditTeamMembers}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.AuditTeamMembers} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Report<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Report}</span>
                                                                <input class="form-control" name="Report" type="file"
                                                                    // value={selectedFile}
                                                                    onChange={handleFileChange}
                                                                    isInvalid={!!formErrors.Report} /><small class="invalid-feedback"></small><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Compliances<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Compliances}</span>
                                                                <input class="form-control" name="Compliances" type='file'
                                                                    // value={selectedFile1}
                                                                    onChange={handleFileChange1}
                                                                    isInvalid={!!formErrors.Compliances} /><small class="invalid-feedback"></small><small class="invalid-feedback"></small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">Issues observed<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Issuesobserved}</span>
                                                                <input class="form-control" name="Issuesobserved" type='file'
                                                                    // value={selectedFile2}
                                                                    onChange={handleFileChange2}
                                                                    isInvalid={!!formErrors.Issuesobserved} /><small class="invalid-feedback"></small></div>

                                                            <label
                                                                class="col-sm-2 col-form-label">Remarks<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Remarks}</span>
                                                                <input class="form-control" name="Remarks" placeholder='Remarks'
                                                                    value={formData.Remarks}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Remarks} /><small class="invalid-feedback"></small></div>
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

