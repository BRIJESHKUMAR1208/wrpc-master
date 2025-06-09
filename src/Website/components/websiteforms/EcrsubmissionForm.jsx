import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import apis from '../../../Api/api.json'
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import { useNavigate } from 'react-router-dom';

export const EcrsubmissionForm = () => {
    const recommondationRef = useRef();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedFile1, setSelectedFile1] = useState(null); // Initialize with null for file inputs
    const [selectedFile2, setSelectedFile2] = useState(null); // Initialize with null for file inputs
    const [formErrors, setFormErrors] = useState({});
    const [formErrorssubmit, setFormErrorssubmit] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [entities, setEntities] = useState([]);
    const [formData, setFormData] = useState({
        entityname: '',
        subentityname: '',
        installedcapacity: '',
        beneficiary: '',
        ppa_quantum: '',
        ppa_rate: '',
        type: '',
        approvalnumber: '',
        fromdate: '',
        todate: '',
        // ecrdata and copyofdata are handled by selectedFile1/2
        fromblock: '',
        toblock: ''
    });

    // New state variable to hold the list of forms
    const [submittedFormsList, setSubmittedFormsList] = useState([]);

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [entitynameFromLocalStorage, setEntityNameFromLocalStorage] = useState(""); // Renamed for clarity
    const navigate = useNavigate();

    useEffect(() => {
        debugger;
        const storedEntityName = localStorage.getItem("entityname");
        if (storedEntityName) {
            setEntityNameFromLocalStorage(storedEntityName);
        }
    }, []);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Restrict only digits for fromblock and toblock
        if ((name === "fromblock" || name === "toblock") && !/^\d*$/.test(value)) {
            return;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        // Optional: Clear form errors
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile2(file);
        } else {
            alert('Please upload a file for ECR data.');
        }
    };

    const handleFileChange1 = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile1(file);
        } else {
            alert('Please upload a file for Signed copy of AS format.');
        }
    };

    const validateForm = () => {
        const errors = {};

        // Removed fields that are not in formData or are not explicitly validated
        // For instance, 'Substation', 'Owner', 'kV_Level', 'NameElement', 'Protection', 'MakeOfRelay', 'SrNoOfRelay', 'Remarks'
        // were in your validateForm but not in your formData state or displayed in the JSX.
        // I'm assuming they are either removed or were placeholder validations.
        // I've kept the validations for fields present in your formData.

        // if (!formData.entityname) {
        //     errors.entityname = "Please enter  entity name";
        // }
        if (!formData.subentityname) {
            errors.subentityname = "Please enter sub entity name";
        }
        if (!formData.beneficiary) {
            errors.beneficiary = "Please enter beneficiary";
        }
        if (!formData.ppa_quantum) {
            errors.ppa_quantum = "Please enter PPA Quantum";
        }
        if (!formData.ppa_rate) {
            errors.ppa_rate = "Please enter PPA Rate";
        }
        if (!formData.type) {
            errors.type = "Please select type";
        }
        if (!formData.approvalnumber) {
            errors.approvalnumber = "Please enter approval number";
        }
        if (!formData.fromdate) {
            errors.fromdate = "Please select from date";
        }
        if (!formData.todate) {
            errors.todate = "Please select to date";
        }
        // if (!selectedFile2) {
        //     errors.ecrdata = "Please upload ECR data";
        // }
        // if (!selectedFile1) {
        //     errors.copyofdata = "Please upload signed copy of AS format";
        // }
        // if (!formData.fromblock) {
        //     errors.fromblock = "Please enter from block";
        // }
        // if (!formData.toblock) {
        //     errors.toblock = "Please enter to block";
        // }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleAddToList = () => {
        if (validateForm()) {
            setSubmittedFormsList((prevList) => [...prevList, { ...formData }]);   //copyofdata: selectedFile1
            // Clear the form after adding to the list
            setFormData({
                entityname: '',
                subentityname: '',
                installedcapacity: '',
                beneficiary: '',
                ppa_quantum: '',
                ppa_rate: '',
                type: '',
                approvalnumber: '',
                fromdate: '',
                todate: '',
                fromblock: '',
                toblock: ''
            });
            setSelectedFile1(null);
            setSelectedFile2(null);
            setFormErrors({}); // Clear errors
            toast.success("Form added to list!");
        } else {
            toast.error("Please fill all required fields before adding to list.");
        }
    };

    const handleSubmitAllForms = async (event) => {
        debugger;
        event.preventDefault();

        const errors = {};

        if (!selectedFile1) {
            errors.copyofdata = "Please upload signed copy of AS format";
            setFormErrorssubmit(errors);
            return Object.keys(errors).length === 1;
        }

        if (submittedFormsList.length === 0) {
            toast.error("Please add at least one form to the list before submitting.");
            return;
        }
        setConfirmDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        debugger;
        setConfirmDialogOpen(false);
        setLoading(true);

        try {
            let candidateId = localStorage.getItem("candidateId") || 0;

            // Iterate over the submittedFormsList and send each form
            // for (const formToSubmit of submittedFormsList) {
            //     const formDataToSend = new FormData();
            //     formDataToSend.append('user_id', candidateId);
            //     formDataToSend.append('entityname', entitynameFromLocalStorage);
            //     formDataToSend.append('subentityname', formToSubmit.subentityname);
            //     formDataToSend.append('installedcapacity', formToSubmit.installedcapacity);
            //     formDataToSend.append('beneficiary', formToSubmit.beneficiary);
            //     formDataToSend.append('ppa_quantum', formToSubmit.ppa_quantum);
            //     formDataToSend.append('ppa_rate', formToSubmit.ppa_rate);
            //     formDataToSend.append('type', formToSubmit.type);
            //     formDataToSend.append('approvalnumber', formToSubmit.approvalnumber);
            //     formDataToSend.append('fromdate', formToSubmit.fromdate);
            //     formDataToSend.append('todate', formToSubmit.todate);
            //     formDataToSend.append('ecrdata', formToSubmit.ecrdata);
            //     formDataToSend.append('copyofdata', formToSubmit.copyofdata);
            //     formDataToSend.append('fromblock', formToSubmit.fromblock);
            //     formDataToSend.append('toblock', formToSubmit.toblock);

            //     const response = await apiclient.post(apis.PostEcrsubmission,selectedFile1, formDataToSend);

            //     if (response.status !== 200) {
            //         // If any submission fails, stop and show error
            //         toast.error(`Error submitting a form: ${response.data?.message || 'Something went wrong'}`);
            //         setLoading(false);
            //         return;
            //     }
            // }


            // Add user_id and entityname to each form
            const enrichedFormsList = submittedFormsList.map(form => ({
                ...form,
                user_id: Number(candidateId), // force numeric
                entityname: entitynameFromLocalStorage
            }));

            // Prepare FormData with single file and list as JSON string
            const formDataToSend = new FormData();
            formDataToSend.append('copyofdata', selectedFile1); // only one file
            formDataToSend.append('data', JSON.stringify(enrichedFormsList)); // all rows in one JSON string

            // Send data to API
            const response = await apiclient.post(
                apis.PostEcrsubmission,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    setSuccessDialogOpen(true);
                    setSubmittedFormsList([]); // Clear form
                    navigate('/candidate/ecrsubmissionform');
                }, 1000);
            } else {
                toast.error(`Error: ${response.data?.message || 'Something went wrong'}`);
                setLoading(false);
            }

        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Something went wrong during submission');
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await apiclient.get(apis.Getentitylist);
                if (response.status === 200) {
                    setEntities(response.data);
                }
            } catch (error) {
                console.error('Error fetching entities:', error);
            }
        };
        fetchEntities();
    }, []);

    // Function to render the list of added forms
    const renderSubmittedForms = () => {
        if (submittedFormsList.length === 0) {
            return <p>No ECR added to the list yet.</p>;
        }
        return (
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Entity Name</th>
                            <th>Sub Entity Name</th>
                            <th>Installed Capacity</th>
                            <th>Beneficiary</th>
                            <th>PPA Quantum</th>
                            <th>PPA Rate</th>
                            <th>Type</th>
                            <th>Approval No.</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>From Block</th>
                            <th>To Block</th>
                            {/* <th>ECR Data</th> */}
                            {/* <th>Signed Copy</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {submittedFormsList.map((form, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entitynameFromLocalStorage}</td> {/* Display entity name from local storage */}
                                <td>{form.subentityname}</td>
                                <td>{form.installedcapacity}</td>
                                <td>{form.beneficiary}</td>
                                <td>{form.ppa_quantum}</td>
                                <td>{form.ppa_rate}</td>
                                <td>{form.type}</td>
                                <td>{form.approvalnumber}</td>
                                <td>{form.fromdate}</td>
                                <td>{form.todate}</td>
                                <td>{form.fromblock}</td>
                                <td>{form.toblock}</td>
                                {/* <td>{form.ecrdata ? form.ecrdata.name : 'N/A'}</td> */}
                                {/* <td>{form.copyofdata ? form.copyofdata.name : 'N/A'}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
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
                                    <form class="forms-sample" onSubmit={handleSubmitAllForms}>
                                        <h4>ECR submission data for sellers </h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">
                                                        <div class="form-group row">
                                                            <label class="col-sm-2 col-form-label">Entities<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.entityname}</span>
                                                                <input
                                                                    name="entityname"
                                                                    type="text"
                                                                    value={entitynameFromLocalStorage} // Display from local storage
                                                                    onChange={handleChange}
                                                                // readOnly // Make it read-only if it comes from local storage
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label class="col-sm-2 col-form-label">Sub Entities (as per WRLDC Gen_sdl file )<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.subentityname}</span>
                                                                <input class="form-control"
                                                                    name="subentityname"
                                                                    placeholder="Enter Sub Entities"
                                                                    value={formData.subentityname}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.subentityname}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label class="col-sm-2 col-form-label">Installed Capacity<span
                                                            ><b></b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.installedcapacity}</span>
                                                                <input class="form-control"
                                                                    name="installedcapacity"
                                                                    placeholder="Enter installed capacity"
                                                                    value={formData.installedcapacity}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.installedcapacity}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                        </div>

                                                        <div class="form-group row">
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
                                                                    maxLength="500" value={formData.beneficiary} /><small class="invalid-feedback"></small>
                                                            </div>
                                                            <label
                                                                class="col-sm-2 col-form-label">PPA Quantum<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.ppa_quantum}</span>
                                                                <input class="form-control" name="ppa_quantum" placeholder="ppa_quantum"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.ppa_quantum}
                                                                    maxLength="50" value={formData.ppa_quantum} /><small class="invalid-feedback"></small></div>
                                                            <label className="col-sm-2 col-form-label">
                                                                PPA Rate (in Rs/MWHr)<span><b>*</b></span>:
                                                            </label>
                                                            <div className="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.ppa_rate}</span>
                                                                <input
                                                                    className={`form-control ${formErrors.ppa_rate ? 'is-invalid' : ''}`}
                                                                    name="ppa_rate"
                                                                    placeholder="Enter PPA rate"
                                                                    maxLength="10"
                                                                    value={formData.ppa_rate}
                                                                    onChange={handleChange}
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and decimal
                                                                        // Prevent multiple decimal points
                                                                        if ((e.target.value.match(/\./g) || []).length > 1) {
                                                                            e.target.value = e.target.value.slice(0, -1);
                                                                        }
                                                                        // Limit to 3 decimal places
                                                                        if (e.target.value.includes('.') && e.target.value.split('.')[1].length > 3) {
                                                                            e.target.value = e.target.value.slice(0, -1); // Allow only 3 decimal places
                                                                        }
                                                                        setFormData({ ...formData, [e.target.name]: e.target.value });
                                                                    }}
                                                                />
                                                                <small className="invalid-feedback">{formErrors.ppa_rate}</small>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label class="col-sm-2 col-form-label">Type (TGNA/GNA)<span><b>*</b></span>:</label>
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
                                                            <label
                                                                class="col-sm-2 col-form-label">Approval No. as per WRLDC<span ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.approvalnumber}</span>
                                                                <input class="form-control" name="approvalnumber" placeholder="Enter"
                                                                    maxLength="500" value={formData.approvalnumber}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.approvalnumber} />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">From Date<span><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.fromdate}</span>
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name="fromdate"
                                                                    placeholder="Enter fromdate"
                                                                    maxLength="50"
                                                                    value={formData.fromdate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.fromdate}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label class="col-sm-2 col-form-label">To Date<span><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.todate}</span>
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name="todate"
                                                                    placeholder="Enter todate"
                                                                    maxLength="50"
                                                                    value={formData.todate}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.todate}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">From Block<span><b></b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.fromblock}</span>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="fromblock"
                                                                    placeholder="Enter from block"
                                                                    maxLength="50"
                                                                    value={formData.fromblock}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.fromblock}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">To Block<span><b></b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.toblock}</span>
                                                                <input
                                                                    type="text"
                                                                    class="form-control"
                                                                    name="toblock"
                                                                    placeholder="Enter to block"
                                                                    maxLength="50"
                                                                    value={formData.toblock}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.toblock}
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            {/* <label
                                                                class="col-sm-2 col-form-label">Upload ECR data<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.ecrdata}</span>
                                                                <input
                                                                    className="form-control"
                                                                    type="file"
                                                                    name="ecrdata"
                                                                    onChange={handleFileChange2}
                                                                    key={selectedFile2 ? selectedFile2.name : 'empty2'} 
                                                                />
                                                                <small class="invalid-feedback"></small>
                                                            </div> */}

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="submitButton" style={{ marginBottom: '20px' }}>
                                            <button type="button" className="btn btn-outline-primary btn-icon-text btn-sm me-2" onClick={handleAddToList}>
                                                <i className="mdi mdi-plus-circle-outline fs-5"></i>
                                                <span>Add to List</span>
                                            </button>
                                            {/* <button type="submit" class="btn btn-outline-success btn-icon-text btn-sm" disabled={loading}>
                                                {loading ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    <>
                                                        <i class="mdi mdi-file-check btn-icon-prepend"></i>Submit All
                                                    </>
                                                )}
                                            </button> */}
                                        </div>

                                        <hr />
                                        <h4>ECR Added to List ({submittedFormsList.length})</h4>
                                        {renderSubmittedForms()}


                                        <div className="form-group row">

                                            <label
                                                class="col-sm-2 col-form-label">Signed copy of AS format<span
                                                ><b>*</b></span>:
                                            </label>
                                            <div class="col-sm-2">
                                                <span style={{ color: "red" }}>{formErrorssubmit.copyofdata}</span>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    name="copyofdata"
                                                    onChange={handleFileChange1}
                                                    key={selectedFile1 ? selectedFile1.name : 'empty1'} // Resets file input
                                                />
                                                <small class="invalid-feedback"></small>
                                            </div>
                                            <div class="submitButton" style={{ marginBottom: '20px' }}>
                                                <button type="submit" class="btn btn-outline-success btn-icon-text btn-sm" disabled={loading}>
                                                    {loading ? (
                                                        <Spinner animation="border" size="sm" />
                                                    ) : (
                                                        <>
                                                            <i class="mdi mdi-file-check btn-icon-prepend"></i>Submit All
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
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
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    Are you sure you want to submit all {submittedFormsList.length} forms?
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
                <DialogContent>All forms submitted successfully!</DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}