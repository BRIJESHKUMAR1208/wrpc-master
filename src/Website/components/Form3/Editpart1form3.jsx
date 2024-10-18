import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import { CmsFooter } from '../../components/Footer/CmsFooter';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import apis from '../../../Api/api.json';
import apiclient from '../../../Api/ApiClient';
import { BASE_URL } from '../../../Api/ApiFunctions';
// import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components


export const Editform3part1 = () => {
    const { id } = useParams();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFilee, setSelectedFilee] = useState('');
    const [selectedFilee1, setSelectedFilee1] = useState('');
    const [formData, setFormData] = useState({

        station_name: '',
        kv_level: '',
        owner: '',
        location: '',
        planned_date_of_audit: '',
        date_of_audit: '',
        audit_entity: '',
        Report: '',
        Compliances: '',
        Issuesobserved: '',
        remarks: '',
        cat_a_deficiencies: '',
        reportpath: '',
        compliancespath: '',
        issues_observedpath: '',
        cat_b_deficiencies: ''
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
    useEffect(() => {
        async function fetchData2() {
            try {

                const response = await apiclient.get(apis.TPPAobsgetdata + id);
                setFormData(response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);

            }
        }
        fetchData2();
    }, [id]);

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
           formDataToSend.append('id', id);
            formDataToSend.append('station_name', formData.station_name);
            formDataToSend.append('kv_level', formData.kv_level);
            formDataToSend.append('owner', formData.owner);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('planned_date_of_audit', formData.planned_date_of_audit);
            formDataToSend.append('date_of_audit', formData.date_of_audit);
            formDataToSend.append('audit_entity', formData.audit_entity);

            if (!selectedFile) {
                formDataToSend.append("Reportpath", formData.reportpath);
            } else {
                formDataToSend.append('report', selectedFile);
            }

            if (!selectedFilee) {
                formDataToSend.append("Compliancespath", formData.compliancespath);
            } else {
                formDataToSend.append('compliances', selectedFilee);
            }
            if (!selectedFilee1) {
                formDataToSend.append("Issues_Observedpath", formData.issues_observedpath);
            } else {
                formDataToSend.append('issues_observed', selectedFilee1);
            }

            formDataToSend.append('remarks', formData.remarks);
            formDataToSend.append('cat_a_deficiencies', formData.cat_a_deficiencies);
            formDataToSend.append('cat_b_deficiencies', formData.cat_b_deficiencies);
            const response = await apiclient.post(apis.Tppaobseditpart1, formDataToSend)

            if (response.status === 200) {

                console.log("user" + response.data)
                // Simulate a 3-second delay
                setTimeout(() => {
                    
                    
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
                        CAT_A_deficiencies: ''
                    });// Set loading state back to false after the delay
                    setLoading(false);
                    window.location.replace('/form3part1list');
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
                        CAT_A_deficiencies: ''
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
                                        <h4>TPPA Observations/descripancies</h4>
                                        <div class="row">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card">
                                                    <div class="card-body registrationCard">

                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Station Name<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.station_name}</span>
                                                                <input class="form-control"
                                                                    name="station_name"
                                                                    placeholder="Enter Station Name"
                                                                    maxlength="50"
                                                                    value={formData.station_name}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.station_name}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">kV Level<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.kv_level}</span>
                                                                <input class="form-control"
                                                                    name="kv_level"
                                                                    placeholder="Enter kV Level"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.kv_level}
                                                                    maxlength="50" value={formData.kv_level} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Owner<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Owner}</span>
                                                                <input class="form-control" name="owner" placeholder="Owner"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Owner}
                                                                    maxlength="50" value={formData.owner} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Location<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.location}</span>
                                                                <input class="form-control" name="location" placeholder="Enter Location"
                                                                    maxlength="50" value={formData.location}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Location} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Planned date of Audit<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.PlannedDateAudit}</span>
                                                                <input class="form-control"
                                                                    className="form-control" name="planned_date_of_audit" type="date"
                                                                    value={formData.planned_date_of_audit}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.PlannedDateAudit} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Date of Audit<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.DateAudit}</span>
                                                                <input class="form-control"
                                                                    className="form-control" name="date_of_audit" type="date"
                                                                    value={formData.date_of_audit}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.DateAudit} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Audit Entity<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.AuditEntity}</span>
                                                                <input class="form-control" name="audit_entity" placeholder="Enter Audit Entity"
                                                                    maxlength="50" value={formData.audit_entity}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.AuditEntity} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Report<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFile}</span>
                                                                <input class="form-control" name="Report" type='file'
                                                                    // value={formData.Report}
                                                                    onChange={handleFileChange}
                                                                    isInvalid={!!formErrors.selectedFile} />
                                                                {formData.reportpath && (
                                                                    <div>
                                                                        <a
                                                                            href={BASE_URL + formData.reportpath} // Link to the file
                                                                            target="_blank" // Opens in a new tab
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            View Report Document
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                <small class="invalid-feedback"></small></div><label
                                                                    class="col-sm-2 col-form-label">Compliances<span
                                                                    ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFilee}</span>
                                                                <input class="form-control" name="Compliances" type="file"
                                                                    // value={formData.Compliances}
                                                                    onChange={handleFileChange1}
                                                                    isInvalid={!!formErrors.selectedFilee} />
                                                                {formData.compliancespath && (
                                                                    <div>
                                                                        <a
                                                                            href={BASE_URL + formData.compliancespath} // Link to the file
                                                                            target="_blank" // Opens in a new tab
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            View Compliances Document
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                <small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Issues Observed<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFilee1}</span>
                                                                <input class="form-control" name="Issuesobserved"
                                                                    placeholder="Enter Issues Observed"
                                                                    type='file'
                                                                    onChange={handleFileChange2}
                                                                    isInvalid={!!formErrors.selectedFilee1} />
                                                                {formData.issues_observedpath && (
                                                                    <div>
                                                                        <a
                                                                            href={BASE_URL + formData.issues_observedpath} // Link to the file
                                                                            target="_blank" // Opens in a new tab
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            View issues observed Document
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                <small class="invalid-feedback"></small>
                                                            </div>
                                                            <label class="col-sm-2 col-form-label">Remarks<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.remarks}</span>
                                                                <input class="form-control" name="remarks" placeholder='Remarks'
                                                                    value={formData.remarks}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.remarks} />

                                                                <small class="invalid-feedback"></small>
                                                            </div>

                                                            <div class="form-group row"><label class="col-sm-2 col-form-label">CAT A deficiences<span
                                                            ><b>*</b></span>:</label>
                                                                <div class="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_A_deficiencies}</span>
                                                                    <input class="form-control" name="CAT_A_deficiencies" placeholder="Enter CAT A deficiences"
                                                                        maxlength="50" value={formData.cat_a_deficiencies}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!formErrors.CAT_A_deficiencies} />
                                                                    <small class="invalid-feedback"></small>
                                                                </div>
                                                                <label class="col-sm-2 col-form-label">CAT B deficiences<span
                                                                ><b>*</b></span>:</label>
                                                                <div class="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_B_deficiencies}</span>
                                                                    <input class="form-control" name="CAT_B_deficiencies" placeholder="Enter CAT B deficiences"
                                                                        maxlength="50"
                                                                        value={formData.cat_b_deficiencies}
                                                                        onChange={handleChange}
                                                                        isInvalid={!!formErrors.CAT_B_deficiencies} /><small class="invalid-feedback"></small>
                                                                </div>
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

