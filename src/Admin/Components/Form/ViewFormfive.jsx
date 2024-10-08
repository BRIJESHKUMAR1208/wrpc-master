import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css';
import apiClient from "../../../Api/ApiClient";
import api from "../../../Api/api.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../../Api/ApiFunctions';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import Material-UI components
import { json, Link ,useParams} from "react-router-dom";
import { Row } from "react-bootstrap/esm";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import DescriptionIcon from '@mui/icons-material/Description';

export const ViewFormfive = () => {
  const {id}= useParams()
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [getuser, setuser] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    utilityname :"",
    correct_operation: "",
    unwanted_operation: "",
    incorrect_operation: "",
    failures_operate:"",
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
            errors.utilityname = "Please enter utilityname";
        }
        if (!formData.correct_operation) {
            errors.correct_operation = "Please enter correct_operation";
        }
        if (!formData.unwanted_operation) {
            errors.unwanted_operation = "Please enter unwanted_operation";
        }
        if (!formData.failures_operate) {
            errors.failures_operate = "Please enter failures_operate";
        }
        if (!selectedFile) {
            errors.incorrect_operation = "Please upload an Excel file";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

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
         ;
      const formDataToSend = {
        ...formData,
        usertype: parseInt(selectedRole, 10),
      };

      const response = await apiClient.post(api.editPerformance, id);
      if (response.status === 200) {
        
        // Simulate a 3-second delay
        setTimeout(() => {
          // Set loading state back to false after the delay
          setLoading(false);
          // Show the success dialog
          setSuccessDialogOpen(true);

          setFormData({
            id: "",
            utilityname :"",
            correct_operation: "",
            unwanted_operation: "",
            incorrect_operation: "",
            failures_operate:""
          });
          setSelectedRole("");
        }, 1000);
      } else if (response.status === 500) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

 
  useEffect(() => {
    async function fetchData2() {
      try {

        //const response = await apiClient.get(`/api/Relay/${id}`);
        const response = await apiClient.get(`/api/PerformanceIndices/${id}`);
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
              <h1>Performance Data </h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">Dashboard</li>
                  <li class="breadcrumb-item ">Form two </li>
                  <li class="breadcrumb-item active"> Relay settings data </li>
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
                            Performance data
                          </h2>
                          <div className="mb-3">
                            <Form onSubmit={handleSubmit}>
                              <form className="ui form">
                                <tbody>
                                  <tr>
                                    <td className="ui header">Id</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Serial no"
                                        value={formData.id} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header" style={{ paddingLeft: "20px" }}>Year</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Year"
                                        value={formData.year} disabled
                                      />
                                    </td>
                                    <td style={{ paddingLeft: "50px" }}>

                                    </td>
                                    <td className="ui header" style={{ paddingLeft: "20px" }}>Month</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Month"
                                        value={formData.month} disabled
                                      />
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td className="ui header">Utility Name</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Utility Name"
                                        value={formData.utilityname} disabled
                                      />
                                    </td>

                                    <td style={{ paddingLeft: "50px" }}>

</td>
<td className="ui header" style={{ paddingLeft: "20px" }}>Incorrect Operations</td>
<td>
  <input
    className="form-control"
    type="text"
    placeholder="Incorrect Operations"
    value={formData.incorrectoperations_ni} disabled
  />
</td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Correct Opration</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Correct Opration"
                                        value={formData.correct_operation} disabled
                                      />
                                    </td>
                                    <td style={{ paddingLeft: "50px" }}>

</td>
<td className="ui header" style={{ paddingLeft: "20px" }}>Dependability Index</td>
<td>
  <input
    className="form-control"
    type="text"
    placeholder="Dependability Index"
    value={formData.dependabilityindex} disabled
  />
</td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Unwanted Opration</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Unwanted Opration"
                                        value={formData.unwanted_operation} disabled
                                      />
                                    </td>
                                    <td style={{ paddingLeft: "50px" }}>

</td>
<td className="ui header" style={{ paddingLeft: "20px" }}>Security Index</td>
<td>
  <input
    className="form-control"
    type="text"
    placeholder="Security Index"
    value={formData.securityindex} disabled
  />
</td>
                                  </tr>
                                
                                  <tr>
                                    <td className="ui header">Failures Operate</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Unwanted Opration"
                                        value={formData.failures_operate} disabled
                                      />
                                    </td>
                                    <td style={{ paddingLeft: "50px" }}>

</td>
<td className="ui header" style={{ paddingLeft: "20px" }}>Reliability index</td>
<td>
  <input
    className="form-control"
    type="text"
    placeholder="Reliability index"
    value={formData.reliabilityindex} disabled
  />
</td>
                                  </tr>
                                  {/* <tr>
                                    <td className="ui header">Incorrect Opration</td>
                                    <td>
                                        <Link className="form-control" to={`${BASE_URL+formData.incorrect_operation}`} ><DescriptionIcon/></Link>
                                        
                                    </td>
                                  </tr> */}
                                 
                                </tbody>
                              </form>

                              <div
                                id="button"
                                className="d-flex "
                                style={{ justifyContent: "space-between" }}
                              >
                                {/* <Button
                                  variant="primary"
                                  type="submit"
                                  style={{ width: 100 }}
                                >
                                  Submit
                                </Button> */}
                              </div>

                              <Dialog
                                className="backdrop"
                                open={confirmDialogOpen}
                                onClick={handleDeleteCancel}
                              >
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
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
        <DialogContent>Are you sure you want to submit ?</DialogContent>
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
};
