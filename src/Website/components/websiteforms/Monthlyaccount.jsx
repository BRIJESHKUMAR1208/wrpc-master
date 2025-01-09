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

export const Monthlyaccount = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');

    const [options, setOptions] = useState([]); // To store API data
    const [selectedEntity, setSelectedEntity] = useState(""); // To store selected value

    // Function to fetch data
    const fetchOptions = async () => {
        try {
            debugger;
            //const response = await axios.get("http://localhost:5141/api/ECRsubmission/Entitylist");
            const response = await apiclient.get('/api/ECRsubmission/Entitylist');
            setOptions(response.data); // Assuming response.data is an array
        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

     // Fetch data on component mount
     useEffect(() => {
        fetchOptions();
    }, []);

    const [formData, setFormData] = useState({


        Id: '',
        poolmember: '',
        monthly_account: '',
        discrepancymonth: '',
        discrepancydate: '',
        summarysheet: '',
        discrepancyreason: '',
        // remark: '',
        // reason: '',
        user_id: ''
       
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
        // if (!formData.remark) {
        //     errors.remark = "Input your values";
        // }
        // if (!formData.reason) {
        //     errors.reason = "Please enter Reasons";
        // }

       
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

debugger;
            let candidateId = 0;
            if (localStorage.getItem("candidateId")) {
                candidateId = localStorage.getItem("candidateId");
            }
            else {
                candidateId = 0;
            }
            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('poolmember', formData.poolmember);
            formDataToSend.append('monthly_account', formData.monthly_account);
            formDataToSend.append('discrepancymonth', formData.discrepancymonth);
            formDataToSend.append('discrepancydate', formData.discrepancydate);
            formDataToSend.append('summarysheet', formData.summarysheet);
            formDataToSend.append('discrepancyreason', formData.discrepancyreason);
            // formDataToSend.append('remark', formData.remark);
            // formDataToSend.append('reason', formData.reason);
            //formDataToSend.append('languagetype', 1);
            ;
            const response = await apiclient.post(apis.Monthlyaccontsave, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log("Monthly data" + response.data)
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
                    //    remark : '',
                    //     reason: '',
                        user_id: ''
                       
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
                                        <h4>Weekly Account Form </h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row">
                                                            <label class="col-sm-2 col-form-label">Pool Member<span
                                                            ><b>*</b></span>:</label>
                                                              <div className="col-sm-2">
                                                              <span style={{ color: "red" }}>{formErrors.poolmember}</span>


                                                            <select
                                                             className="form-control"
                                                              id="dropdown"
                                                               name="poolmember"
                                                               value={formData.poolmember}
                                                               isInvalid={!!formErrors.poolmember}
                                                                      onChange={handleChange}
                                                              >
                                                             <option value="">Select</option> {/* Default option */}
                                                                {options.map((option) => (
                                                              <option key={option.id} value={option.id}>
                                                                    {option.entityname}
                                                             </option>
                                                                ))}
                                                            </select>
                                                            </div>
                                                           
                                                            <label class="col-sm-2 col-form-label">Monthly Account<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.monthly_account}</span>

                                                                <select
        className="form-control"
        name="monthly_account"
        value={formData.monthly_account}
        onChange={handleChange}
        isInvalid={!!formErrors.monthly_account}
    >
        <option value="">Select</option> {/* Default placeholder */}
        <option value="REA">REA        </option>
        <option value="RTA">RTA        </option>
        <option value="RTDA">RTDA</option>
        <option value="Compensation">Compensation</option>
        <option value="Ramping">Ramping
        </option>
       
    </select>

                                                               <small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">DiscrepancyMonth<span
                                                                ><b>*</b></span>:</label>
                                                                 <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.discrepancymonth}</span>
                                                                <input class="form-control"
                                                                    className="form-control" 
                                                                    name="discrepancymonth" 
                                                                    placeholder="Enter discrepancymonth"
                                                                    value={formData.discrepancymonth}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.discrepancymonth} /><small class="invalid-feedback"></small></div>
                                                        </div>

                                                        <div class="form-group row">
                                                            
                                                        <label
                                                                        class="col-sm-2 col-form-label">Discrepancy Date<span
                                                                        ><b>*</b></span>:</label>
                                                           <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.discrepancydate}</span>
                                                                <input class="form-control"
                                                                    className="form-control" 
                                                                    name="discrepancydate" type="date"
                                                                    placeholder="Enter End Week Date"
                                                                    value={formData.discrepancydate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.discrepancydate} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">Summary Sheet<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.summarysheet}</span>
                                                                <input class="form-control"
                                                                    className="form-control" 
                                                                    name="summarysheet" 
                                                                    placeholder="Enter summarysheet"
                                                                    value={formData.summarysheet}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.summarysheet} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Discrepancy Reason<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.discrepancyreason}</span>
                                                                <input class="form-control" name="discrepancyreason" placeholder="Enter Discrepancy Reason"
                                                                    maxlength="50" value={formData.discrepancyreason}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.discrepancyreason} /><small class="invalid-feedback"></small></div>
                                                                    
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

