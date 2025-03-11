import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import apiclient from "../../../Api/ApiClient";
// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; // Import Material-UI components
import { Link, useParams } from 'react-router-dom';

import { Row } from 'react-bootstrap/esm';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import { BASE_URL } from '../../../Api/ApiFunctions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const ViewFormthree = () => {
    const { id } = useParams()
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [selectedFile, setSelectedFile] = useState({});
    const [formData, setFormData] = useState({
        SNo: '',
        pcmreview_cata: [],
        pcmnumber_catb: [],
        pcmreview_catb: [],
        pcmnumber_catb: [],
        part3: '',
        admin_remark: ''
    });

    // New state variables for confirmation dialog and loading
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        setConfirmDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        // Handle cancel action in the confirmation dialog
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {


        try {
            setConfirmDialogOpen(false);
            setLoading(true);
            const formDataToSend = new FormData();

            if (formData.part3 === 1) {
                formDataToSend.append("id", id);
                formDataToSend.append('admin_remark', formData.admin_remark);
                const response = await apiclient.post(apis.Tppaobspart4, formDataToSend)
                if (response.status === 200) {

                    // Simulate a 3-second delay
                    setTimeout(() => {
                        // Set loading state back to false after the delay
                        setLoading(false);
                        // Show the success dialog
                        setSuccessDialogOpen(true);

                        setFormData({
                            SNo: '',
                            admin_remark: ''
                        });
                        setSelectedRole('');
                    }, 1000);
                } else if (response.status === 500) {
                    alert("User already exists");

                }
            }
            else {
                formDataToSend.append("id", id);

                // Handle Category A
                formData.cat_a_deficiencies?.split(',').forEach((item, index) => {
                    formDataToSend.append("pcmnumber_catA", formData[`pcm_number_cata_${index}`] || "");
                    formDataToSend.append("pcmreview_catA", formData[`pcm_review_cata_${index}`] || "");
                });

                // Handle Category B
                formData.cat_b_deficiencies?.split(',').forEach((item, index) => {
                    formDataToSend.append("pcmnumber_catB", formData[`pcm_number_catb_${index}`] || "");
                    formDataToSend.append("pcmreview_catB", formData[`pcm_review_catb_${index}`] || "");
                });

                const response = await apiclient.post(apis.Tppaobspart2post, formDataToSend);
                if (response.status === 200) {

                    // Simulate a 3-second delay
                    setTimeout(() => {
                        // Set loading state back to false after the delay
                        setLoading(false);
                        // Show the success dialog
                        setSuccessDialogOpen(true);

                        setFormData({
                            SNo: '',

                            attended_cat_a: '',
                            date_attended_cat_a: '',
                            cat_b_deficiencies: '',
                            attended_cat_b: '',
                            date_attended_cat_b: '',
                        });
                        setSelectedRole('');
                    }, 1000);
                } else if (response.status === 500) {
                    alert("User already exists");

                }
            }


        } catch (error) {
            console.error('Error submitting data:', error);
            toast.error('Something went wrong');
            setLoading(false);
        }
    };


    useEffect(() => {
        async function fetchData2() {
            try {

                //const response = await apiClient.get(`/api/FormReports/Ttppaobservation/${id}`);
                const response = await apiClient.get(`/api/TPPA_Obs/${id}`);
                setFormData(response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);

            }
        }
        fetchData2();
    }, [id]);



    return (
        <>
            <div>
                <Header />
                <Sidebar />
                <main id="main" class="main">
                    <div class="pagetitle">
                        <div className="pagetitle-lft">
                            <h1>TPPA Plan & Monitoring</h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form two </li>
                                    <li class="breadcrumb-item active"> TPPA Observation  </li>
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
                                                        TPPA Observation/descripancies
                                                    </h2>
                                                    <div className="mb-3">
                                                        <Form className="ui form" onSubmit={handleSubmit}>

                                                            <tbody>
                                                                <tr>
                                                                    <td className="ui header">S.No</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Serial no" value={formData.id} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header" >Station Name</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Station Name" value={formData.station_name} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">KV Level</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="KV Level" value={formData.kv_level} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Utility</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Owner" value={formData.owner} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Location</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Location" value={formData.location} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Planned Date of Audit</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Planned Date of Audit" value={formData.planned_date_of_audit} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Date of Audit</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Date of Audit" value={formData.date_of_audit} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Audit Entity</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Audit Entity" value={formData.date_of_audit} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Reports</td>
                                                                    <td>
                                                                        {/* <input className="form-control" type="file" accept=".pdf" onChange={handleFileChange} placeholder="Reports" value={formData.reportpdfpath} disabled   /> */}
                                                                        <Link className="form-control" to={`${BASE_URL + formData.reportpdfpath}`} ><PictureAsPdfIcon /></Link>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Compliances</td>
                                                                    <td>
                                                                        <Link className="form-control" to={`${BASE_URL + formData.compliancesppath}`} ><PictureAsPdfIcon /></Link>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Issues Observed</td>
                                                                    <td>
                                                                        <Link className="form-control" to={`${BASE_URL + formData.issues_observedpath}`} ><PictureAsPdfIcon /></Link>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Remarks</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Remarks" value={formData.remarks} disabled />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">CAT A Deficiencies</td>
                                                                    <td colSpan="3">
                                                                        <ul className="list-group" >
                                                                            {formData.cat_a_deficiencies?.split(',').map((item, index) => (
                                                                                <li key={index} className="list-group-item d-flex align-items-center">
                                                                                    {/* Read-Only Deficiency Name */}
                                                                                    <span style={{ flex: 1 }}>{item.trim()}</span>

                                                                                    {/* PCM Number Input (Editable by Admin) */}
                                                                                    <input
                                                                                        className="form-control mx-2"
                                                                                        type="text"
                                                                                        placeholder="PCM Number"
                                                                                        value={formData[`pcm_number_cata_${index}`] || ""}
                                                                                        name={`pcm_number_cata_${index}`}
                                                                                        onChange={handleChange}
                                                                                        style={{ width: "120px" }}
                                                                                    />

                                                                                    {/* PCM Review Input (Editable by Admin) */}
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        placeholder="PCM Review"
                                                                                        value={formData[`pcm_review_cata_${index}`] || ""}
                                                                                        name={`pcm_review_cata_${index}`}
                                                                                        onChange={handleChange}
                                                                                        style={{ width: "200px" }}
                                                                                    />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header" >Attended Y/N</td>
                                                                    <td>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            placeholder="Audit Entity"
                                                                            value={formData.attended_cat_a == "1" ? "Yes" : formData.attended_cat_a == "2" ? "No" : ""}
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">Date Attended</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Audit Entity" value={formData.date_attended_cat_a} disabled />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">CAT B Deficiencies</td>
                                                                    <td colSpan="3">
                                                                        <ul className="list-group">
                                                                            {formData.cat_b_deficiencies?.split(',').map((item, index) => (
                                                                                <li key={index} className="list-group-item d-flex align-items-center">
                                                                                    {/* Read-Only Deficiency Name */}
                                                                                    <span style={{ flex: 1 }}>{item.trim()}</span>

                                                                                    {/* PCM Number Input (Editable by Admin) */}
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        placeholder="PCM Number"
                                                                                        value={formData[`pcm_number_catb_${index}`] || ""}
                                                                                        name={`pcm_number_catb_${index}`}
                                                                                        onChange={handleChange}
                                                                                        style={{ width: "150px", marginLeft: "10px" }}
                                                                                    />

                                                                                    {/* PCM Review Input (Editable by Admin) */}
                                                                                    <input
                                                                                        className="form-control"
                                                                                        type="text"
                                                                                        placeholder="PCM Review"
                                                                                        value={formData[`pcm_review_catb_${index}`] || ""}
                                                                                        name={`pcm_review_catb_${index}`}
                                                                                        onChange={handleChange}
                                                                                        style={{ width: "200px", marginLeft: "10px" }}
                                                                                    />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Attended Y/N Cat B</td>
                                                                    <td>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            placeholder="Audit Entity"
                                                                            value={formData.attended_cat_a == "1" ? "Yes" : formData.attended_cat_b == "2" ? "No" : ""}
                                                                            disabled
                                                                        />
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">Date Attended Cat B</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Audit Entity" value={formData.date_attended_cat_b} disabled />
                                                                    </td>
                                                                </tr>


                                                                <tr>
                                                                    <td className="ui header" hidden={formData.part3 != 1}>Admin Remark</td>
                                                                    <td>
                                                                        <input className="form-control" type="text" placeholder="Admin Remark" value={formData.admin_remark} name="admin_remark" onChange={handleChange} hidden={formData.part3 != 1} />
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

                                                            <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel}>
                                                                <Spinner animation="border" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </Spinner>
                                                            </Dialog>
                                                        </Form>
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


