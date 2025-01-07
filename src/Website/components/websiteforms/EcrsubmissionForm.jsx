import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TopHeader } from '../../components/TopHeader/TopHeader';
import apiclient from '../../../Api/ApiClient';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import apis from '../../../Api/api.json'
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';

export const EcrsubmissionForm = () => {
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile1, setSelectedFile1] = useState('');
    const [selectedFile2, setSelectedFile2] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [entities, setEntities] = useState([]);
    const [formData, setFormData] = useState({

        entityname: '',   
        installedcapacity : '',
        beneficiary   : '',
        ppa_quantum : '', 
        ppa_rate : '',  
        type   : '',
        approvalnumber  : '', 
        fromdate  : '', 
        todate  : '', 
        ecrdata : '',  
        copyofdata  : ''
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
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];

        if (file) {
            // File is a PDF
            setSelectedFile2(file);

            // You can perform additional actions here if needed
        } else {
            // File is not a PDF
            alert('Please upload a  file.');
        }
    };
    const handleFileChange1 = (event) => {
        const file = event.target.files[0];

        if (file) {
            // File is a PDF
            setSelectedFile1(file);

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
        // if (!selectedFile) {
        //     errors.selectedFile = "Input your values";
        // }
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

        if (validateForm()) {
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
           formDataToSend.append('entityname', formData.entityname);
           formDataToSend.append('installedcapacity', formData.installedcapacity);
           formDataToSend.append('beneficiary', formData.beneficiary);
           formDataToSend.append('ppa_quantum', formData.ppa_quantum);
           formDataToSend.append('ppa_rate', formData.ppa_rate);
           formDataToSend.append('type', formData.type);
           formDataToSend.append('approvalnumber', formData.approvalnumber);
           formDataToSend.append('fromdate', formData.fromdate);
           formDataToSend.append('todate', formData.todate);
           formDataToSend.append('ecrdata', selectedFile2);
           formDataToSend.append('copyofdata',selectedFile1);
          
            const response = await apiclient.post(apis.PostEcrsubmission, formDataToSend)
            if (response.status === 200) {
                console.log("user" + response.data)
                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        entityname: '',   
                        installedcapacity : '',
                        beneficiary   : '',
                        ppa_quantum : '', 
                        ppa_rate : '',  
                        type   : '',
                        approvalnumber  : '', 
                        fromdate  : '', 
                        todate  : '', 
                        ecrdata : '',  
                        copyofdata  : ''
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

    useEffect(() => {
        const relaysave = async () => {
            try {
                const response = await apiclient.get(apis.Getentitylist);
                if (response.status === 200) 
                    { 
                        setEntities(response.data);

                    }
               
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        relaysave();
    }, []);



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
                                        <h4>ECR submission data for sellers </h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row">
                                                            <label class="col-sm-2 col-form-label">Entity Name<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.entityname}</span>
                                                                <select
                                                                    className="form-control"
                                                                    name="entityname"
                                                                    value={formData.entityname}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.entityname}
                                                                >
                                                                    <option value="">Select Entity</option>
                                                                    {entities.map((entity) => (
                                                                        <option key={entity.id} value={entity.entityname}>
                                                                            {entity.entityname}
                                                                        </option>
                                                                    ))}
                                                                </select><small class="invalid-feedback">
                                                                </small></div>
                                                            <label class="col-sm-2 col-form-label">Installed Capacity<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.installedcapacity}</span>
                                                                <input class="form-control"
                                                                    name="installedcapacity"
                                                                    placeholder="Enter installedcapacity"
                                                                    maxlength="50"
                                                                    value={formData.installedcapacity}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.installedcapacity}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">Beneficiary<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.beneficiary}</span>
                                                                <input class="form-control"
                                                                    name="beneficiary"
                                                                    placeholder="Enter beneficiary"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.beneficiary}
                                                                    maxlength="500" value={formData.beneficiary} /><small class="invalid-feedback"></small>
                                                            </div>

                                                        </div>

                                                        <div class="form-group row">

                                                            <label
                                                                class="col-sm-2 col-form-label">PPA_quantum<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.ppa_quantum}</span>
                                                                <input class="form-control" name="ppa_quantum" placeholder="ppa_quantum"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.ppa_quantum}
                                                                    maxlength="50" value={formData.ppa_quantum} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">PPA_rate<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.ppa_rate}</span>
                                                                <input class="form-control" name="ppa_rate" placeholder="Enter ppa_rate"
                                                                    maxlength="500" value={formData.ppa_rate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.ppa_rate} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">Type (GNA/TGNA)<span><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.type}</span>
                                                                <select
                                                                    class="form-control"
                                                                    name="type"
                                                                    value={formData.type}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.type}
                                                                >
                                                                    <option value="">Select Type</option>
                                                                    <option value="GNA">GNA</option>
                                                                    <option value="TGNA">TGNA</option>
                                                                </select>
                                                                <small class="invalid-feedback"></small>
                                                            </div>


                                                        </div>
                                                        <div class="form-group row">
                                                            <label
                                                                class="col-sm-2 col-form-label">Approval number as per WRLDC<span ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                  <span style={{ color: "red" }}>{formErrors.approvalnumber}</span>
                                                                   <input class="form-control" name="approvalnumber" placeholder="Enter"
                                                                    maxlength="500" value={formData.approvalnumber}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.approvalnumber} />
                                                                    <small class="invalid-feedback"></small>
                                                           </div>
                                                            <label class="col-sm-2 col-form-label">From _date<span><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.fromdate}</span>
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name="fromdate"
                                                                    placeholder="Enter fromdate"
                                                                    maxlength="50"
                                                                    value={formData.fromdate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.fromdate}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">To Date<span><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.todate}</span>
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name="todate"
                                                                    placeholder="Enter todate"
                                                                    maxlength="50"
                                                                    value={formData.todate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.todate}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>

                                                            <label
                                                                class="col-sm-2 col-form-label">Signed copy of AS format<span
                                                                ><b>*</b></span>:
                                                            </label>
                                                            <div class="col-sm-2">
                                                                {/* <input class="form-control" name="Protection" type='file'
                                                    maxlength="50" value={formData.Uploadfile}
                                                    onChange={handleFileChange}
                                                    isInvalid={!!formErrors.Uploadfile} /> */}
                                                                <span style={{ color: "red" }}>{formErrors.copyofdata}</span>

                                                                <input
                                                                    className="form-control"
                                                                    type="file"

                                                                    name="copyofdata"

                                                                    onChange={handleFileChange1}
                                                                />
                                                                <small class="invalid-feedback"></small></div><label
                                                                    class="col-sm-2 col-form-label">Upload ECR data<span
                                                                    ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                {/* <input class="form-control" name="Protection" type='file'
                                                    maxlength="50" value={formData.Uploadfile}
                                                    onChange={handleFileChange}
                                                    isInvalid={!!formErrors.Uploadfile} /> */}
                                                                <span style={{ color: "red" }}>{formErrors.ecrdata}</span>

                                                                <input
                                                                    className="form-control"
                                                                    type="file"

                                                                    name="ecrdata"

                                                                    onChange={handleFileChange2}
                                                                />
                                                                <small class="invalid-feedback"></small></div>

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

