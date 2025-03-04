import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
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

export const Weeklyaccount = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');

    const [options, setOptions] = useState([]); // To store API data
    const [selectedEntity, setSelectedEntity] = useState(""); // To store selected value
    const [entityname, setEntityName] = useState("");

    useEffect(() => {
        const storedEntityName = localStorage.getItem("entityname");
        if (storedEntityName) {
            setEntityName(storedEntityName);
        }
    }, []);

    // Function to fetch data
    const fetchOptions = async () => {
        try {

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


        SNo: '',
        entityname: '',
        Weekly_Account: '',
        Account_Period_Start_Week_Date: '',
        Account_Period_End_Week_Date: '',
        Discrepancy_Period_Date: '',
        Discrepancy_Period_Blocks: '',
        Discrepancy_Reason: '',
        Discrepancy_toDate: '',
        Discrepancy_toBlocks: '',
        // IsResolved: '',
        // Reasons: ''
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

        // if (!formData.entityname) {
        //     errors.entityname = "Please enter Entity";
        // }

        if (!formData.Weekly_Account) {
            errors.Weekly_Account = "Please enter Account";
        }

        if (!formData.Account_Period_Start_Week_Date) {
            errors.Account_Period_Start_Week_Date = "Please enter Start Week Date";
        }
        if (!formData.Account_Period_End_Week_Date) {
            errors.Account_Period_End_Week_Date = "Please enter End Week Date";
        }
        if (!formData.Discrepancy_Period_Date) {
            errors.Discrepancy_Period_Date = "Please enter Discrepancy Period Date";
        }
        if (!formData.Discrepancy_Period_Blocks) {
            errors.Discrepancy_Period_Blocks = "Input your values";
        }
        if (!formData.Discrepancy_Reason) {
            errors.Discrepancy_Reason = "Input your values";
        }

        // if (!formData.IsResolved) {
        //     errors.IsResolved = "Please enter IsResolved";
        // }
        // if (!formData.Reasons) {
        //     errors.Reasons = "Please enter Reasons";
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
            formDataToSend.append('name_of_pool_Entity', entityname);
            formDataToSend.append('Weekly_Account', formData.Weekly_Account);
            formDataToSend.append('Account_Period_Start_Week_Date', formData.Account_Period_Start_Week_Date);
            formDataToSend.append('Account_Period_End_Week_Date', formData.Account_Period_End_Week_Date);
            formDataToSend.append('Discrepancy_Period_Date', formData.Discrepancy_Period_Date);
            formDataToSend.append('Discrepancy_Period_Blocks', formData.Discrepancy_Period_Blocks);
            formDataToSend.append('Discrepancy_toDate', formData.Discrepancy_toDate);
            formDataToSend.append('Discrepancy_toBlocks', formData.Discrepancy_toBlocks);
            formDataToSend.append('Discrepancy_Reason', formData.Discrepancy_Reason);
            // formDataToSend.append('IsResolved', formData.IsResolved);
            // formDataToSend.append('Reasons', formData.Reasons);
            //formDataToSend.append('languagetype', 1);
            ;
            const response = await apiclient.post(apis.Weeklyaccontsave, formDataToSend)
            if (response.status === 200) {
                console.log("Weekly data" + response.data)
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        SNo: '',
                        name_of_pool_Entity: '',
                        Weekly_Account: '',
                        Account_Period_Start_Week_Date: '',
                        Account_Period_End_Week_Date: '',
                        Discrepancy_Period_Date: '',
                        Discrepancy_Period_Blocks: '',
                        Discrepancy_toDate: '',
                        Discrepancy_toBlocks: '',
                        Discrepancy_Reason: '',
                        // IsResolved: '',
                        // Reasons: ''
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
                                                            <label class="col-sm-2 col-form-label">Name of Pool Entity<span
                                                            ><b>*</b></span>:</label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.name_of_pool_Entity}</span>

                                                                <input
                                                                    name="entityname"
                                                                    type="text"
                                                                    value={entityname}
                                                                    onChange={handleChange}
                                                                />
                                                                {/* <select
                                                             className="form-control"
                                                              id="dropdown"
                                                               name="name_of_pool_Entity"
                                                               value={formData.name_of_pool_Entity}
                                                               isInvalid={!!formErrors.name_of_pool_Entity}
                                                                      onChange={handleChange}
                                                              >
                                                             <option value="">Select</option>
                                                                {options.map((option) => (
                                                              <option key={option.id} value={option.id}>
                                                                    {option.entityname}
                                                             </option>
                                                                ))}
                                                            </select> */}
                                                            </div>
                                                            {/* <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.name_of_pool_Entity}</span>
                                                                <input class="form-control"
                                                                    name="name_of_pool_Entity"
                                                                    placeholder="Enter Entity"
                                                                    maxlength="50"
                                                                    value={formData.name_of_pool_Entity}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.name_of_pool_Entity}
                                                                /><small class="invalid-feedback">
                                                                </small></div> */}
                                                            <label class="col-sm-2 col-form-label">Weekly Account<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Weekly_Account}</span>

                                                                <select
                                                                    className="form-control"
                                                                    name="Weekly_Account"
                                                                    value={formData.Weekly_Account}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Weekly_Account}
                                                                >
                                                                    <option value="">Select</option> {/* Default placeholder */}
                                                                    <option value="DSM">DSM        </option>
                                                                    <option value="REC">REC        </option>
                                                                    <option value="TRAS">TRAS</option>
                                                                    <option value="SRAS">SRAS </option>
                                                                    <option value="SCUC">SCUC      </option>
                                                                    <option value="Congestion">Congestion
                                                                    </option>

                                                                </select>

                                                                <small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">Account Period Start Week Date<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Account_Period_Start_Week_Date}</span>
                                                                <input class="form-control"
                                                                    className="form-control"
                                                                    name="Account_Period_Start_Week_Date" type="date"
                                                                    placeholder="Enter Start Week Date"
                                                                    value={formData.Account_Period_Start_Week_Date}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Account_Period_Start_Week_Date} /><small class="invalid-feedback"></small></div>
                                                        </div>

                                                        <div class="form-group row">

                                                            <label
                                                                class="col-sm-2 col-form-label">Account Period End Week Date<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Account_Period_End_Week_Date}</span>
                                                                <input class="form-control"
                                                                    className="form-control"
                                                                    name="Account_Period_End_Week_Date" type="date"
                                                                    placeholder="Enter End Week Date"
                                                                    value={formData.Account_Period_End_Week_Date}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Account_Period_End_Week_Date} /><small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">Discrepancy From Date<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Discrepancy_Period_Date}</span>
                                                                <input class="form-control"
                                                                    className="form-control"
                                                                    name="Discrepancy_Period_Date" type="date"
                                                                    placeholder="Enter Discrepancy Period Date"
                                                                    value={formData.Discrepancy_Period_Date}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Discrepancy_Period_Date} /><small class="invalid-feedback"></small>
                                                                    
                                                            </div>
                                                                    <label
                                                                        class="col-sm-2 col-form-label">Discrepancy From Blocks<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Discrepancy_Period_Blocks}</span>
                                                                <input class="form-control" name="Discrepancy_Period_Blocks" placeholder="Enter Blocks"
                                                                    maxlength="50" value={formData.Discrepancy_Period_Blocks}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Discrepancy_Period_Blocks} /><small class="invalid-feedback"></small>
                                                            </div>

                                                        </div>
                                                        <div class="form-group row">
                                                            <label
                                                                class="col-sm-2 col-form-label">Discrepancy Details<span ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Discrepancy_Reason}</span>
                                                                <input class="form-control" name="Discrepancy_Reason" placeholder="Enter"
                                                                    maxlength="50" value={formData.Discrepancy_Reason}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Discrepancy_Reason} /><small class="invalid-feedback">
                                                                        
                                                             </small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">Discrepancy To Date<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Discrepancy_toDate}</span>
                                                                <input class="form-control"
                                                                    className="form-control"
                                                                    name="Discrepancy_toDate" type="date"
                                                                    placeholder="Enter Discrepancy To Date"
                                                                    value={formData.Discrepancy_toDate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Discrepancy_toDate} /><small class="invalid-feedback"></small>
                                                                    
                                                            </div>
                                                                    <label
                                                                        class="col-sm-2 col-form-label">Discrepancy To Blocks<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Discrepancy_toBlocks}</span>
                                                                <input class="form-control" name="Discrepancy_toBlocks" placeholder="Enter Blocks"
                                                                    maxlength="50" value={formData.Discrepancy_toBlocks}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Discrepancy_toBlocks} /><small class="invalid-feedback"></small>
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

