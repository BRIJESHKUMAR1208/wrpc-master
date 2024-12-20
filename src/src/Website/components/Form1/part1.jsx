import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";

// import 'bootstrap/dist/css/bootstrap.css';
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apis from "../../../Api/api.json";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import Material-UI components
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap/esm";
import apiclient from "../../../Api/ApiClient";
//import "./custom-form.scss";
import axios from "axios";

export const Formonepart1 = () => {
  const recommondationRef = useRef();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [getuser, setuser] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [formData, setFormData] = useState({
    SNo: "",    
    TrippingDate: "",
    TrippingTime: "",
    OwnerS: "",
    FIRS: "",
    DRS: "",
    ELS: "",
    TRS: "",
    CategoryS: "",
   
  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile1(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile2(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile3(file);
    } else {
      alert("Please upload a PDF file.");
    }
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

    
    if (!formData.TrippingDate) {
      errors.TrippingDate = "Required";
    }
    if (!formData.TrippingTime) {
      errors.TrippingTime = "Required";
    }
    if (!formData.OwnerS) {
      errors.OwnerS = "Required";
    }
    if (!formData.FIRS) {
      errors.FIRS = "Required";
    }
    if (!formData.DRS) {
      errors.DRS = "Required";
    }
    if (!formData.ELS) {
      errors.ELS = "Required";
    }
    if (!formData.TRS) {
      errors.TRS = "Required";
    }
    if (!formData.CategoryS) {
      errors.CategoryS = "Required";
    }
    
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
    //   return;
    // }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    ;
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

      formDataToSend.append("user_id", candidateId);
     
      formDataToSend.append("Tripping_Date", formData.TrippingDate);
      formDataToSend.append("Tripping_Time", formData.TrippingTime);
      formDataToSend.append("Owner_SEND", formData.OwnerS);
      formDataToSend.append("FIR_S", selectedFile);
      formDataToSend.append("DR_S", selectedFile1);
      formDataToSend.append("EL_S", selectedFile2);
      formDataToSend.append("TR_S", selectedFile3);
      formDataToSend.append("Category_S", formData.CategoryS);
      ;
      const response = await apiclient.post(
        apis.Trippingreportpart1,
        formDataToSend
      );
      ;
      if (response.status === 200) {
        console.log("user" + response.data);
        // Simulate a 3-second delay
        setTimeout(() => {
          // Set loading state back to false after the delay
          setLoading(false);
          // Show the success dialog
          setSuccessDialogOpen(true);

          setFormData({
            SNo: "",          
            TrippingDate: "",
            TrippingTime: "",
            OwnerS: "",
            FIRS: "",
            DRS: "",
            ELS: "",
            TRS: "",
            CategoryS: "",
          
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

  console.log(formData);

  return (
    <>
      <div>
        <div>
          <TopHeader />
        </div>

        <CmsDisplay />

        <div class="main-form">
          <div class="container-fluid">
            <div class="InnerSection">
              <div class="InnerSectionBox">
                <form class="forms-sample" onSubmit={handleSubmit}>
                  <h4>Tripping compliance of PCM Discussions </h4>
                  <div class="row">
                    <div class="col-md-12 grid-margin stretch-card">
                      <div class="card">
                        <div class="card-body registrationCard">
                          

                           
                          {/* form 1 */}
                        
                            <>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Tripping Date
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.TrippingDate}
                                  </span>
                                  <input
                                    class="form-control"
                                    className="form-control"
                                    name="TrippingDate"
                                    type="date"
                                    value={formData.TrippingDate}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.TrippingDate}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Tripping Time
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.TrippingTime}
                                  </span>
                                  <input
                                    class="form-control"
                                    className="form-control"
                                    name="TrippingTime"
                                    type="time"
                                    value={formData.TrippingTime}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.TrippingTime}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Owner(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.OwnerS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="OwnerS"
                                    maxlength="50"
                                    value={formData.OwnerS}
                                    placeholder="Enter Owner(S)"
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.OwnerS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  FIR(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.FIRS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="FIRS"
                                    type="file"
                                    // value={selectedFile}
                                    onChange={handleFileChange}
                                    isInvalid={!!formErrors.FIRS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  DR(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.DRS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="DRS"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange1}
                                    isInvalid={!!formErrors.DRS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  EL(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.ELS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="ELS"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange2}
                                    isInvalid={!!formErrors.ELS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  TR(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.TRS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="TRS"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange3}
                                    isInvalid={!!formErrors.TRS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Category(S)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.CategoryS}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="CategoryS"
                                    placeholder="Enter category(S)"
                                    maxlength="50"
                                    value={formData.CategoryS}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.CategoryS}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                {/* form 1 */}
                              </div>
                            </>
                         
                          

                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="submitButton">
                    <button
                      type="submit"
                      class="btn btn-outline-success btn-icon-text btn-sm"
                    >
                      <i class="mdi mdi-file-check btn-icon-prepend"></i>
                      Submit
                    </button>
                    <button
                      type="reset"
                      class="btn btn-outline-danger btn-sm"
                      style={{ marginLeft: "10px" }}
                    >
                      <i class="mdi mdi-refresh"></i>Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <CmsFooter />
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
