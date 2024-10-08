import React, { useState } from 'react'; 
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Row } from 'react-bootstrap/esm';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import apis from '../../../Api/api.json';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import './custom-form.scss';

export const Performanceindices = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [formData, setFormData] = useState({
        year: '',
        month: '',
        utilityname: '',
        correct_operation: '',
        unwanted_operation: '',
        failures_operate: '',
        incorrect_operation: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleYearChange = (date) => {
        if (date && date.isValid()) {
            const year = date.year();
            setSelectedYear(year);
            setFormData((prevFormData) => ({
                ...prevFormData,
                year: year,
            }));
            setSelectedMonth(null); // Reset month when year changes
        } else {
            setSelectedYear(null);
        }
    };

    const handleMonthChange = (date) => {
        if (date && date.isValid()) {
            const month = date.format('MM'); // Ensure the month is formatted as a two-digit number
            setSelectedMonth(month);
            setFormData((prevFormData) => ({
                ...prevFormData,
                month: month,
            }));
        } else {
            setSelectedMonth(null);
        }
    };

    const minMonthDate = selectedYear === "2023" ? dayjs("2023-10-01") : dayjs(`${selectedYear}-01-01`);
    const maxMonthDate = selectedYear ? dayjs(`${selectedYear}-12-31`) : dayjs();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            setSelectedFile(file);
        } else {
            alert('Please upload a valid Excel file.');
            setSelectedFile(null);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.utilityname) {
            errors.utilityname = "Please enter utility name";
        }
        if (!formData.correct_operation) {
            errors.correct_operation = "Please enter correct operations";
        }
        if (!formData.unwanted_operation) {
            errors.unwanted_operation = "Please enter unwanted operations";
        }
        if (!formData.failures_operate) {
            errors.failures_operate = "Please enter failures";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setConfirmDialogOpen(true);
        }
    };

    const handleDeleteCancel = () => {
        setConfirmDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        setConfirmDialogOpen(false);
        setLoading(true);
        try {
            let candidateId = localStorage.getItem("candidateId") || 0;
            const formDataToSend = new FormData();
            formDataToSend.append('user_id', candidateId);
            formDataToSend.append('year', formData.year);
            formDataToSend.append('month', formData.month);
            formDataToSend.append('utilityname', formData.utilityname);
            formDataToSend.append('correct_operation', formData.correct_operation);
            formDataToSend.append('unwanted_operation', formData.unwanted_operation);
            formDataToSend.append('failures_operate', formData.failures_operate);
            formDataToSend.append('incorrect_operation', selectedFile);
            formDataToSend.append('languagetype', 1);

            const response = await apiclient.post(apis.performance, formDataToSend);
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    setSuccessDialogOpen(true);
                    setFormData({
                        year: '',
                        month: '',
                        utilityname: '',
                        correct_operation: '',
                        unwanted_operation: '',
                        failures_operate: '',
                        incorrect_operation: ''
                    });
                    setSelectedFile(null);
                }, 1000);
            } else if (response.status === 500) {
                alert("Form already exists");
            } else {
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
                <TopHeader />
                <CmsDisplay />
                <main>
                    <div className="pagetitle"></div>
                    <div className="main-form">
                        <Container fluid>
                            <Row>
                                <Col md={12} className="grid-margin stretch-card">
                                    <Card>
                                        <Card.Body className="registrationCard">
                                            <Form className="forms-sample" onSubmit={handleSubmit}>
                                                <h4>Performance Indices</h4>
                                                <Row>
                                                    <Col md={4}>
                                                    <Form.Group>
                                                    <Form.Label>Year<span>*</span></Form.Label>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={["YearCalendar"]}>
                                                                <DatePicker
                                                                    label={"Year"}
                                                                    views={["year"]}
                                                                    minDate={dayjs("2023-10-01")}
                                                                    maxDate={dayjs()}
                                                                    renderInput={(params) => <TextField {...params} />}
                                                                    value={selectedYear ? dayjs(`${selectedYear}`) : null}
                                                                    onChange={handleYearChange} // Updated function
                                                                    enableAccessibleFieldDOMStructure
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                        <span style={{ color: "red" }}>{formErrors.year}</span></Form.Group>
                                                        
                                                    </Col>
                                                    <Col md={4}>
                                                    <Form.Group>
                                                    <Form.Label>Month<span>*</span></Form.Label>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={["month"]}>
                                                                <DesktopDatePicker
                                                                    views={["month"]}
                                                                    label={"Month"}
                                                                    minDate={minMonthDate}
                                                                    maxDate={maxMonthDate}
                                                                    value={selectedMonth ? dayjs(selectedMonth, 'MM') : null} // Ensure month is two-digit
                                                                    onChange={handleMonthChange} // Updated function
                                                                    disabled={!selectedYear}
                                                                    enableAccessibleFieldDOMStructure
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                        <span style={{ color: "red" }}>{formErrors.month}</span>
                                                        </Form.Group>
                                                      
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Utility Name <span>*</span></Form.Label>
                                                            <Form.Control
                                                                name="utilityname"
                                                                placeholder="Enter utility name"
                                                                maxLength="50"
                                                                value={formData.utilityname}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.utilityname}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formErrors.utilityname}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Correct Operations <span>*</span></Form.Label>
                                                            <Form.Control
                                                                name="correct_operation"
                                                                placeholder="Enter correct operations"
                                                                maxLength="50"
                                                                value={formData.correct_operation}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.correct_operation}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formErrors.correct_operation}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Unwanted Operations <span>*</span></Form.Label>
                                                            <Form.Control
                                                                name="unwanted_operation"
                                                                placeholder="Enter unwanted operations"
                                                                maxLength="50"
                                                                value={formData.unwanted_operation}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.unwanted_operation}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formErrors.unwanted_operation}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Failures to Operate <span>*</span></Form.Label>
                                                            <Form.Control
                                                                name="failures_operate"
                                                                placeholder="Enter failures"
                                                                maxLength="50"
                                                                value={formData.failures_operate}
                                                                onChange={handleChange}
                                                                isInvalid={!!formErrors.failures_operate}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {formErrors.failures_operate}
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={4}>
                                                        <Form.Group>
                                                            <Form.Label>Incorrect Operation File (Excel)</Form.Label>
                                                            <Form.Control
                                                                type="file"
                                                                accept=".xls,.xlsx"
                                                                onChange={handleFileChange}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button type="submit" className="btn btn-primary">
                                                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                                                </Button>
                                            </Form>
                                            <Dialog open={confirmDialogOpen}>
                                                <DialogTitle>Submit Confirmation</DialogTitle>
                                                <DialogContent>
                                                    Are you sure you want to submit the form?
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                                                    <Button onClick={handleDeleteConfirm}>Submit</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
                                                <DialogTitle>Success</DialogTitle>
                                                <DialogContent>
                                                    Form submitted successfully!
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setSuccessDialogOpen(false)}>Close</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <ToastContainer />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </main>
            </div>
        </>
    );
};
