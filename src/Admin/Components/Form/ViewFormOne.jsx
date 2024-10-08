import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';

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
import './custom-form.scss';
import { BASE_URL } from '../../../Api/ApiFunctions';


export const ViewFormOne = () => {
    const { id } = useParams()
    const recommondationRef = useRef();
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [getuser, setuser] = useState('');
    const [formData, setFormData] = useState({
        SNo: '',
        RecommondationofPCM: '',
        kVLevel: '',
        PCMNumber: '',
        PCMDate: '',
        ItemNo: '',
        tripping_date: '',
        tripping_time: '',
        owner_send: '',
        fir_spdfpath: '',
        dr_spath: '',
        el_spath: '',
        tr_spath: '',
        category_s: '',
        owner_rend: '',
        fir_rpath: '',
        dr_rpath: '',
        el_rpath: '',
        tr_rpath: '',
        category_r: '',
        analysispath: '',
        final_reportpath: '',
        NotifiedStatus: '',
        UtilityAttending: '',
        action_taken_by_utility_to_allow_completion: '',
        date_on_which_attended: '', 
        remarks: ''
    });

    
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const validateForm = () => {
        const errors = {};

        if (!formData.RecommondationofPCM) {
            errors.RecommondationofPCM = 'Do not left the field blank';
        }
        if (!formData.kVLevel) {
            errors.kVLevel = 'Required';
        }
        if (!formData.PCMNumber) {
            errors.PCMNumber = 'Do not left the field blank';
        }
        if (!formData.PCMDate) {
            errors.PCMDate = 'Required';
        }
        if (!formData.ItemNo) {
            errors.ItemNo = 'Required';
        }
        if (!formData.TrippingDate) {
            errors.TrippingDate = 'Required';
        }
        if (!formData.TrippingTime) {
            errors.TrippingTime = 'Required';
        }
        if (!formData.OwnerS) {
            errors.OwnerS = 'Required';
        }
        if (!formData.FIRS) {
            errors.FIRS = 'Required';
        }
        if (!formData.DRS) {
            errors.DRS = 'Required';
        }
        if (!formData.ELS) {
            errors.ELS = 'Required';
        }
        if (!formData.TRS) {
            errors.TRS = 'Required';
        }
        if (!formData.CategoryS) {
            errors.CategoryS = 'Required';
        }
        if (!formData.OwnerR) {
            errors.OwnerR = 'Required';
        }
        if (!formData.FIRR) {
            errors.FIRR = 'Required';
        }
        if (!formData.DRR) {
            errors.DRR = 'Required';
        }
        if (!formData.ELR) {
            errors.ELR = 'Required';
        }
        if (!formData.TRR) {
            errors.TRR = 'Required';
        }
        if (!formData.CategoryR) {
            errors.CategoryR = 'Required';
        }
        if (!formData.Analysis) {
            errors.Analysis = 'Required';
        }
        if (!formData.Remarks) {
            errors.Remarks = 'Required';
        }
        
        if (!formData.NotifiedStatus) {
            errors.NotifiedStatus = 'Required';
        }
        if (!formData.UtilityAttending) {
            errors.UtilityAttending = 'Required';
        }
        if (!formData.UtilityActiontaken) {
            errors.UtilityActiontaken = 'Required';
        }
        if (!formData.Dateattended) {
            errors.Dateattended = 'Required';
        }



        // Add similar checks for other fields

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
            const formDataToSend = new FormData();
            formDataToSend.append("id", id);  
            formDataToSend.append('Recommendation_of_PCM', formData.RecommondationofPCM);
            formDataToSend.append('PCM_Number', formData.PCMNumber);
            formDataToSend.append('PCM_Date', formData.PCMDate);
            formDataToSend.append('Item_No_Heading', formData.ItemNo);
            formDataToSend.append('Utility_Responsible_for_Attending', formData.UtilityAttending);
            const response = await apiClient.post(apis.Trippingreportpart4, formDataToSend);
            if (response.status === 200) {

                // Simulate a 3-second delay
                setTimeout(() => {
                    // Set loading state back to false after the delay
                    setLoading(false);
                    // Show the success dialog
                    setSuccessDialogOpen(true);

                    setFormData({
                        SNo: '',
                        RecommondationofPCM: '',
                        kVLevel: '',
                        PCMNumber: '',
                        PCMDate: '',
                        ItemNo: '',
                        RecommondationofPCM: '',
                        TrippingDate: '',
                        TrippingTime: '',
                        OwnerS: '',
                        FIRS: '',
                        DRS: '',
                        ELS: '',
                        TRS: '',
                        CategoryS: '',
                        OwnerR: '',
                        FIRR: '',
                        DRR: '',
                        ELR: '',
                        TRR: '',
                        CategoryR: '',
                        Analysis: '',
                        FinalReport: '',
                        NotifiedStatus: '',
                        UtilityAttending: '',
                        UtilityActiontaken: '',
                        Dateattended: '',
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

    useEffect(() => {
        async function fetchData2() {
            try {
                const response = await apiClient.get(`/api/Tripping_compliance_pcm_discussions/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData2();
    }, []);


    return (
        <>
            <div>
                <Header />
                <Sidebar />
                <main id="main" class="main">
                    <div class="pagetitle">
                        <div className="pagetitle-lft">
                            <h1>Tripping compliance of PCM Discussions</h1>
                            <nav>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item">Dashboard</li>
                                    <li class="breadcrumb-item ">Form one </li>
                                    <li class="breadcrumb-item active"> Tripping compliance of PCM Discussions </li>
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
                                                        Tripping compliance of PCM Discussions
                                                    </h2>
                                                    <div className="mb-3">

                                                        <form className="ui form" onSubmit={handleSubmit}>
                                                            <tbody>


                                                                <tr>
                                                                    <td className="ui header">Tripping Date </td>
                                                                    <td>
                                                                        <Form.Control

                                                                            className={`form-control ${formErrors.tripping_date ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="Tripping Date"
                                                                            name='tripping_date'disabled
                                                                            value={formData.tripping_date}

                                                                            isInvalid={!!formErrors.tripping_date}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.tripping_date}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Tripping Time </td>

                                                                    <td>
                                                                        <Form.Control

                                                                            className={`form-control ${formErrors.tripping_time ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Tripping Time"
                                                                            name='tripping_time'
                                                                            value={formData.tripping_time} disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.tripping_time}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.tripping_time}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Owner(Send) </td>
                                                                    <td>
                                                                        <Form.Control

                                                                            className={`form-control ${formErrors.owner_send ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Owner(Send)"
                                                                            name='owner_send'
                                                                            value={formData.owner_send}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.owner_send}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.owner_send}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">FIR(S) </td>
                                                                    <td>
                                                                        {formData.fir_spdfpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.fir_spdfpath} target="_blank" rel="noopener noreferrer">
                                                                                View FIR (S) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.FIRS}</span>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="ui header">DR(S) </td>
                                                                    <td>
                                                                        {formData.dr_spath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.dr_spath} target="_blank" rel="noopener noreferrer">
                                                                                View DR(S) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.dr_rpath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">EL(S) </td>

                                                                    <td>
                                                                        {formData.el_spath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.el_spath} target="_blank" rel="noopener noreferrer">
                                                                                View EL (S) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.el_spath}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">TR(S) </td>

                                                                    <td>
                                                                        {formData.tr_spath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.tr_spath} target="_blank" rel="noopener noreferrer">
                                                                                View TR (S) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.tr_spath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Category(Send) </td>
                                                                    <td>
                                                                        <Form.Control

                                                                            className={`form-control ${formErrors.category_s ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Category(Send)"
                                                                            name='category_s'
                                                                            value={formData.category_s}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.category_s}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.category_s}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Owner(R) </td>
                                                                    <td>
                                                                        <Form.Control

                                                                            className={`form-control ${formErrors.owner_rend ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Owner(R)"
                                                                            name='owner_rend'
                                                                            value={formData.owner_rend}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.owner_rend}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.owner_rend}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">FIR(R) </td>
                                                                    
                                                                    <td>
                                                                        {formData.fir_rpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.fir_rpath} target="_blank" rel="noopener noreferrer">
                                                                                View FIR(R) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.fir_rpath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">DR(R) </td>
                                                                    <td>
                                                                        {formData.dr_rpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.dr_rpath} target="_blank" rel="noopener noreferrer">
                                                                                View DR (R) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.dr_rpath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">EL(R) </td>

                                                                    <td>
                                                                        {formData.el_rpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.el_rpath} target="_blank" rel="noopener noreferrer">
                                                                                View EL(R) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.el_rpath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">TR(R) </td>
                                                                    <td>
                                                                        {formData.tr_rpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.tr_rpath} target="_blank" rel="noopener noreferrer">
                                                                                View TR(R) Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.tr_rpath}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Category(R) </td>
                                                                    <td>
                                                                        <Form.Control
                                                                            //  ref={FinalReport}
                                                                            className={`form-control`}
                                                                            type="text"
                                                                            placeholder="CategoryR"
                                                                            name='category_r'
                                                                            value={formData.category_r}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.category_r}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.category_r}</span>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Analysis </td>
                                                                    <td>
                                                                        {formData.analysispath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.analysispath} target="_blank" rel="noopener noreferrer">
                                                                                View Analysis Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.analysispath}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Final Reports </td>
                                                                    <td>
                                                                        {formData.final_reportpath ? (
                                                                            // Display the PDF file as a clickable link
                                                                            <a href={BASE_URL+formData.final_reportpath} target="_blank" rel="noopener noreferrer">
                                                                                View Final Reports  Document
                                                                            </a>
                                                                        ) : (
                                                                            // Show a message or placeholder if there's no file
                                                                            <span>No PDF available</span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.final_reportpath}</span>
                                                                    </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <td className="ui header">Action taken by utility to  allow complition</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            //  ref={UtilityActiontaken}
                                                                            className={`form-control ${formErrors.action_taken_by_utility_to_allow_completion ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Utility Action taken"
                                                                            name='action_taken_by_utility_to_allow_completion'
                                                                            value={formData.action_taken_by_utility_to_allow_completion}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.action_taken_by_utility_to_allow_completion}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.action_taken_by_utility_to_allow_completion}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Date on which attended</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            //  ref={Dateattended}
                                                                            className={`form-control ${formErrors.date_on_which_attended ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="Date on which attended"
                                                                            name='date_on_which_attended'
                                                                            value={formData.date_on_which_attended}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.date_on_which_attended}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.date_on_which_attended}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Remarks</td>
                                                                    <td>
                                                                        <Form.Control
                                                                            //  ref={Remarks}
                                                                            className={`form-control ${formErrors.remarks ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Remarks"
                                                                            name='remarks'
                                                                            value={formData.remarks}disabled
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.remarks}

                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <span style={{ color: "red" }}>{formErrors.remarks}</span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">PCM Number</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.PCMNumber ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="PCM Number"
                                                                            name='PCMNumber'
                                                                            value={formData.PCMNumber}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.PCMNumber}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.PCMNumber}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">PCM Date</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.PCMDate ? 'is-invalid' : ''}`}
                                                                            type="date"
                                                                            placeholder="PCM Date"
                                                                            name='PCMDate'
                                                                            value={formData.PCMDate}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.PCMDate}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.PCMDate}</span>
                                                                    </td>
                                                                    
                                                                </tr>   
                                                                <tr>
                                                                    <td className="ui header">Item No</td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.ItemNo ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Item No"
                                                                            name='ItemNo'
                                                                            value={formData.ItemNo}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.ItemNo}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.ItemNo}</span>
                                                                    </td>
                                                                    
                                                                </tr>  
                                                                <tr>
                                                                    <td className="ui header">Recommendations of PCM </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        
                                                                         className={`form-control ${formErrors.RecommondationofPCM ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Recommendations of PCM"
                                                                            name='RecommondationofPCM'
                                                                            value={formData.RecommondationofPCM}
                                                                            onChange={handleChange}
                                                                            isInvalid={!!formErrors.RecommondationofPCM}
                                                                             
                                                                        />

                                                                    </td>
                                                                    <td>
                                                                    <span style={{ color: "red" }}>{formErrors.RecommondationofPCM}</span>
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>
                                                                    <td className="ui header">Utility responsible for Attending </td>
                                                                    <td>
                                                                        <Form.Control
                                                                        //  ref={UtilityAttending}
                                                                         className={`form-control ${formErrors.UtilityAttending ? 'is-invalid' : ''}`}
                                                                            type="text"
                                                                            placeholder="Utility responsible for Attending"
                                                                            name='UtilityAttending'
                                                                            value={formData.UtilityAttending}
                                                                            onChange={handleChange}
                                                                            // isInvalid={!!formErrors.UtilityAttending}
                                                                          
                                                                        />
                                                                         </td>
                                                                     <td>
                                                                    <span style={{ color: "red" }}>{formErrors.UtilityAttending}</span>
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

                                                        </form>



                                                        <Dialog className="backdrop" open={confirmDialogOpen} onClick={handleDeleteCancel}>
                                                            <Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner>
                                                        </Dialog>

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


