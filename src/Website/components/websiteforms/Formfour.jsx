import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

// import 'bootstrap/dist/css/bootstrap.css';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TopHeader } from '../../components/TopHeader/TopHeader';
import apiclient from '../../../Api/ApiClient';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';
import { Relaysave } from '../../../Api/ApiFunctions';
import './custom-form.scss';
import axios from 'axios';
import apis from '../../../Api/api.json'
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';

export const Formfour = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');

    const [formData, setFormData] = useState({

        Substation: '',
        kV_Level: '',
        Owner: '',
        NameElement: '',
        Protection: '',
        MakeOfRelay: '',
        SrNoOfRelay: '',
        Uploadfile: '',
        Remarks: '',
        utility:''
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
            alert('Please upload a  file.');
        }
    };
    const validateForm = () => {
        const errors = {};

        if (!formData.Substation) {
            errors.Substation = "Please enter substation";
        }

        if (!formData.Owner) {
            errors.Owner = "Please enter owner";
        }

        if (!formData.kV_Level) {
            errors.kV_Level = "Please enter kv level";
        }
        if (!formData.NameElement) {
            errors.NameElement = "Please enter name element";
        }
        if (!formData.Protection) {
            errors.Protection = "Please enter";
        }
        if (!formData.MakeOfRelay) {
            errors.MakeOfRelay = "Input your values";
        }
        if (!formData.SrNoOfRelay) {
            errors.SrNoOfRelay = "Input your values";
        }
        if (!selectedFile) {
            errors.selectedFile = "Input your values";
        }
        if (!formData.Remarks) {
            errors.Remarks = "Please enter remarks";
        }

        if (!selectedRole) {
            errors.selectedRole = "Role is required";
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


            let candidateId = 0;
            if (localStorage.getItem("candidateId")) {
                candidateId = localStorage.getItem("candidateId");
            }
            else {
                candidateId = 0;
            }
            // const formDataToSend = {
            //     ...formData,
            //     Uploadfile:selectedFile

            // };
            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('Substation', formData.Substation);
            formDataToSend.append('kV_Level', formData.kV_Level);
            formDataToSend.append('Owner', formData.Owner);
            formDataToSend.append('Name_of_Element', formData.NameElement);
            formDataToSend.append('protection_typetext', formData.Protection);
            formDataToSend.append('Make_of_Relay', formData.MakeOfRelay);
            formDataToSend.append('Sr_No_of_Relay', formData.SrNoOfRelay);
            formDataToSend.append('Upload_File_input', selectedFile);
            formDataToSend.append('Remarks', formData.Remarks);
            formDataToSend.append('utility', formData.utility);
            formDataToSend.append('languagetype', 1);
            ;
            const response = await apiclient.post(apis.Relaysave, formDataToSend)
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
                        Substation: '',
                        kV_Level: '',
                        Owner: '',
                        NameElement: '',
                        Protection: '',
                        MakeOfRelay: '',
                        SrNoOfRelay: '',
                        Uploadfile: '',
                        Remarks: ''
                    });
                    setSelectedRole('');
                }, 1000);
            } else if (response.status === 500) {
                alert("Form already exists");

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
    //     const relaysave = async () => {
    //       try {
    //         const response = await apiClient.get(api.relaysave);
    //         setDropdownOptions(response.data);
    //       } catch (error) {
    //         console.error('Error fetching roles:', error);
    //       }
    //     };
    //     relaysave();
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
    console.log(formData)


    return (
        <>
            <div>
                <div>
                    <TopHeader />

                </div>

                <CmsDisplay />

                <main >
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
                                        <h4>Relay Settings Data </h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row">
                                                            <label class="col-sm-2 col-form-label">Substation<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Substation}</span>
                                                                <input class="form-control"
                                                                    name="Substation"
                                                                    placeholder="Enter Substation"
                                                                    maxlength="50"
                                                                    value={formData.Substation}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Substation}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label class="col-sm-2 col-form-label">Utility<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.utility}</span>
                                                                <input class="form-control"
                                                                    name="utility"
                                                                    placeholder="Enter Utility"
                                                                    maxlength="50"
                                                                    value={formData.utility}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.utility}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">kV Level<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.kV_Level}</span>
                                                                <input class="form-control"
                                                                    name="kV_Level"
                                                                    placeholder="Enter kV Level"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.kV_Level}
                                                                    maxlength="50" value={formData.kV_Level} /><small class="invalid-feedback"></small></div>
                                                                   
                                                        </div>

                                                        <div class="form-group row">
                                                            
                                                        <label
                                                                        class="col-sm-2 col-form-label">Owner<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Owner}</span>
                                                                <input class="form-control" name="Owner" placeholder="Owner"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Owner}
                                                                    maxlength="50" value={formData.Owner} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">Name of Element<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.NameElement}</span>
                                                                <input class="form-control" name="NameElement" placeholder="Enter Name of Element"
                                                                    maxlength="50" value={formData.NameElement}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.NameElement} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Protection (M1/M2/Backup)<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Protection}</span>
                                                                <input class="form-control" name="Protection" placeholder="Enter Protection (M1/M2/Backup)"
                                                                    maxlength="50" value={formData.Protection}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Protection} /><small class="invalid-feedback"></small></div>
                                                                    
                                                        </div>
                                                        <div class="form-group row">
                                                        <label
                                                                        class="col-sm-2 col-form-label">Make of Relay<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.MakeOfRelay}</span>
                                                                <input class="form-control" name="MakeOfRelay" placeholder="Enter"
                                                                    maxlength="50" value={formData.MakeOfRelay}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.MakeOfRelay} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">Sr No of Relay<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.SrNoOfRelay}</span>
                                                                <input class="form-control" name="SrNoOfRelay" placeholder="Enter Sr No of Relay"
                                                                    maxlength="50" value={formData.SrNoOfRelay}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.SrNoOfRelay} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Upload file<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                {/* <input class="form-control" name="Protection" type='file'
                                                    maxlength="50" value={formData.Uploadfile}
                                                    onChange={handleFileChange}
                                                    isInvalid={!!formErrors.Uploadfile} /> */}
                                                                <span style={{ color: "red" }}>{formErrors.Uploadfile}</span>

                                                                <input
                                                                    className="form-control"
                                                                    type="file"

                                                                    name="Uploadfile"

                                                                    onChange={handleFileChange}
                                                                />


                                                                <small class="invalid-feedback"></small></div><label
                                                                    class="col-sm-2 col-form-label">Remarks<span
                                                                    ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Remarks}</span>
                                                                <input class="form-control" name="Remarks" placeholder="Enter"
                                                                    maxlength="50" value={formData.Remarks}
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

