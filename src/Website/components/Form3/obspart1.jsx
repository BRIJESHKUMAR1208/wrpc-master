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


export const Form3part1 = () => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedFilee, setSelectedFilee] = useState('');
    const [selectedFilee1, setSelectedFilee1] = useState('');
    const [formData, setFormData] = useState({

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
        CAT_A_deficiencies: "",
        CAT_B_deficiencies: "",
        AAttendedY_N: '',
        ADate_Attended: '',
        BAttendedY_N: '',
        BDate_Attended: ''
    });
    const [utility, setutilityName] = useState("");

    useEffect(() => {
        const storedEntityName = localStorage.getItem("utilityname");
        if (storedEntityName) {
            setutilityName(storedEntityName);
        }
    }, []);
    // New state variables for confirmation dialog and loading
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const [catAList, setCatAList] = useState([]); // Stores multiple CAT A values
    const [catBList, setCatBList] = useState([]); // Stores multiple CAT B values



    // Add CAT A Deficiency to the List
    const handleAddCatA = () => {
        if (formData.CAT_A_deficiencies.trim() !== "") {
            setCatAList([...catAList, formData.CAT_A_deficiencies]);
            setFormData({ ...formData, CAT_A_deficiencies: "" }); // Clear input field
        }
    };

    // Add CAT B Deficiency to the List
    const handleAddCatB = () => {
        if (formData.CAT_B_deficiencies.trim() !== "") {
            setCatBList([...catBList, formData.CAT_B_deficiencies]);
            setFormData({ ...formData, CAT_B_deficiencies: "" }); // Clear input field
        }
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
            //alert('Please upload a PDF file.');
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
        // if (!formData.Remarks) {
        //     errors.Remarks = "Required";
        // }
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
            formDataToSend.append('Station_Name', formData.StationName);
            formDataToSend.append('kV_Level', formData.kVLevel);
            formDataToSend.append('Owner', utility);
            formDataToSend.append('Location', formData.Location);
            formDataToSend.append('Planned_Date_of_Audit', formData.PlannedDateAudit);
            formDataToSend.append('Date_of_Audit', formData.DateAudit);
            formDataToSend.append('Audit_Entity', formData.AuditEntity);
            formDataToSend.append('Report', selectedFile);
            formDataToSend.append('Compliances', selectedFilee);
            formDataToSend.append('Issues_Observed', selectedFilee1);
            formDataToSend.append('Remarks', formData.Remarks);
            formDataToSend.append('CAT_A_Deficiencies', catAList.join("@@@ "));
            formDataToSend.append('CAT_B_Deficiencies', catBList.join("@@@ "));
            formDataToSend.append('Attended_CAT_A', formData.AAttendedY_N);
            formDataToSend.append('Date_Attended_CAT_A', formData.ADate_Attended);
            formDataToSend.append('Attended_CAT_B', formData.BAttendedY_N);
            formDataToSend.append('Date_Attended_CAT_B', formData.BDate_Attended);

            //  const response = await apiclient.post(apis.Tppaobspart1, formDataToSend)
            const response = await apiclient.post(apis.observateforma, formDataToSend)
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

                                                        <div class="form-group row">

                                                            <label
                                                                class="col-sm-2 col-form-label">Utility<span
                                                                ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.utility}</span>
                                                                <input class="form-control" placeholder="Utility"
                                                                    name="utility"
                                                                    type="text"
                                                                    value={utility}
                                                                    onChange={handleChange} /><small class="invalid-feedback"></small></div>


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
                                                                    value={formData.kVLevel} /><small class="invalid-feedback"></small></div>
                                                            <label class="col-sm-2 col-form-label">Station Name<span
                                                            ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.StationName}</span>
                                                                <input class="form-control"
                                                                    name="StationName"
                                                                    placeholder="Enter Station Name"

                                                                    value={formData.StationName}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.StationName}
                                                                /><small class="invalid-feedback">
                                                                </small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Location<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Location}</span>
                                                                <input class="form-control" name="Location" placeholder="Enter Location"
                                                                    value={formData.Location}
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
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Audit Entity<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.AuditEntity}</span>
                                                                <input class="form-control" name="AuditEntity" placeholder="Enter Audit Entity"
                                                                    value={formData.AuditEntity}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.AuditEntity} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Report<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFile}</span>
                                                                <input class="form-control" name="Report" type='file'
                                                                    // value={formData.Report}
                                                                    onChange={handleFileChange}
                                                                    isInvalid={!!formErrors.selectedFile} /><small class="invalid-feedback"></small></div><label
                                                                        class="col-sm-2 col-form-label">Compliances<span
                                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFilee}</span>
                                                                <input class="form-control" name="Compliances" type="file"
                                                                    // value={formData.Compliances}
                                                                    onChange={handleFileChange1}
                                                                    isInvalid={!!formErrors.selectedFilee} /><small class="invalid-feedback"></small></div>
                                                        </div>
                                                        <div class="form-group row"><label class="col-sm-2 col-form-label">Issues Observed<span
                                                        ><b>*</b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.selectedFilee1}</span>
                                                                <input class="form-control" name="Issuesobserved" placeholder="Enter Issues Observed"

                                                                    type='file'
                                                                    onChange={handleFileChange2}
                                                                    isInvalid={!!formErrors.selectedFilee1} /><small class="invalid-feedback"></small></div>
                                                            <label
                                                                class="col-sm-2 col-form-label">Remarks<span
                                                                ><b></b></span>:</label>
                                                            <div class="col-sm-2">
                                                                <span style={{ color: "red" }}>{formErrors.Remarks}</span>
                                                                <input class="form-control" name="Remarks" placeholder='Remarks'
                                                                    value={formData.Remarks}
                                                                    onChange={handleChange}
                                                                    isInvalid={!!formErrors.Remarks} /><small class="invalid-feedback"></small>
                                                            </div>

                                                            <div className="form-group row">
                                                                {/* CAT A Input */}
                                                                <label className="col-sm-2 col-form-label">
                                                                    CAT A Deficiencies<span><b>*</b></span>:
                                                                </label>
                                                                <div className="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_A_deficiencies}</span>
                                                                    <input
                                                                        className="form-control"
                                                                        name="CAT_A_deficiencies"
                                                                        placeholder="Enter CAT A deficiencies"
                                                                        value={formData.CAT_A_deficiencies}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <small className="invalid-feedback"></small>
                                                                </div><label className="col-sm-2 col-form-label">
                                                                    AttendedY_N<span><b>*</b></span>:
                                                                </label>
                                                                <div className="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_A_deficiencies}</span>
                                                                    <select
                                                                        className="form-control"
                                                                        name="AAttendedY_N"
                                                                        value={formData.AAttendedY_N}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value=""> --Select-- </option>
                                                                        <option value="1">Yes</option>
                                                                        <option value="2">No</option>
                                                                    </select>
                                                                </div>

                                                                {/* Conditional Rendering */}
                                                                {formData.AAttendedY_N === "1" ? (
                                                                    <>
                                                                        <label className="col-sm-2 col-form-label">
                                                                            Cat A Date Attended<span><b>*</b></span>:
                                                                        </label>
                                                                        <div className="col-sm-2">
                                                                            <span style={{ color: "red" }}>{formErrors.ADate_Attended}</span>
                                                                            <input
                                                                                type="date"
                                                                                className="form-control"
                                                                                name="ADate_Attended"
                                                                                value={formData.ADate_Attended}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : formData.AAttendedY_N === "2" ? (
                                                                    <div className="col-sm-4">
                                                                        <b className="text-danger">Cat A Date Attended is not required.</b>
                                                                    </div>
                                                                ) : (
                                                                    <div className="col-sm-4"></div> // Empty div to maintain alignment when no option is selected
                                                                )}

                                                                <div className="col-sm-2">

                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <button
                                                                        type="button"
                                                                        className="btn-primary"
                                                                        style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "white" }}
                                                                        onClick={handleAddCatA}
                                                                    >
                                                                        Add New CAT A
                                                                    </button>

                                                                </div>
                                                            </div>

                                                            {/* Display CAT A Deficiencies */}
                                                            {catAList.length > 0 && (
                                                                <div className="mt-2">
                                                                    <strong>CAT A List:</strong>
                                                                    <div className="list-group">
                                                                        {catAList.map((item, index) => (
                                                                            <div key={index} className="list-group-item">
                                                                                {item}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <hr />
                                                            {/* CAT B Input */}
                                                            <div className="form-group row">
                                                                <label className="col-sm-2 col-form-label">
                                                                    CAT B Deficiencies<span><b>*</b></span>:
                                                                </label>
                                                                <div className="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_B_deficiencies}</span>
                                                                    <input
                                                                        className="form-control"
                                                                        name="CAT_B_deficiencies"
                                                                        placeholder="Enter CAT B deficiencies"
                                                                        value={formData.CAT_B_deficiencies}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <small className="invalid-feedback"></small>
                                                                </div>
                                                                <label className="col-sm-2 col-form-label">
                                                                    AttendedY_N<span><b>*</b></span>:
                                                                </label>
                                                                <div className="col-sm-2">
                                                                    <span style={{ color: "red" }}>{formErrors.CAT_A_deficiencies}</span>
                                                                    <select
                                                                        className="form-control"
                                                                        name="BAttendedY_N"
                                                                        value={formData.BAttendedY_N}
                                                                        onChange={handleChange}
                                                                    >
                                                                        <option value=""> --Select-- </option>
                                                                        <option value="1">Yes</option>
                                                                        <option value="2">No</option>
                                                                    </select>
                                                                </div>

                                                                {/* Conditionally display the "Cat B Date Attended" field */}
                                                                {formData.BAttendedY_N === "1" ? (
                                                                    <>
                                                                        <label className="col-sm-2 col-form-label">
                                                                            Cat B Date Attended<span><b>*</b></span>:
                                                                        </label>
                                                                        <div className="col-sm-2">
                                                                            <span style={{ color: "red" }}>{formErrors.BDate_Attended}</span>
                                                                            <input
                                                                                className="form-control"
                                                                                type="date"
                                                                                name="BDate_Attended"
                                                                                value={formData.BDate_Attended}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : formData.BAttendedY_N === "2" ? (
                                                                    <div className="col-sm-4">
                                                                        <b className="text-danger">Cat B Date Attended is not required.</b>
                                                                    </div>
                                                                ) : (
                                                                    <div className="col-sm-4"></div> // Empty div when no option is selected
                                                                )}
                                                                <div className="col-sm-2">

                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <button type="button" className=" btn-primary" onClick={handleAddCatB} style={{ backgroundColor: "#007bff", borderColor: "#007bff", color: "white" }}
                                                                    >
                                                                        Add New CAT B
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Display CAT B Deficiencies */}
                                                            {catBList.length > 0 && (
                                                                <div className="mt-2">
                                                                    <strong>CAT B List:</strong>
                                                                    <div className="list-group">
                                                                        {catBList.map((item, index) => (
                                                                            <div key={index} className="list-group-item">
                                                                                {item}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}

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

