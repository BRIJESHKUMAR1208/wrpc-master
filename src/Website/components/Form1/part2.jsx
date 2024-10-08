import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
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
import { Link,useParams } from "react-router-dom";
import { Row } from "react-bootstrap/esm";
import apiclient from "../../../Api/ApiClient";
//import "./custom-form.scss";
import axios from "axios";

export const Formonepart2 = () => {
  const { id } = useParams();
  const recommondationRef = useRef();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [getuser, setuser] = useState("");
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [selectedFile6, setSelectedFile6] = useState(null);
  const [selectedFile7, setSelectedFile7] = useState(null);
  const [formData, setFormData] = useState({
    SNo: "",    
    OwnerR: "",
    FIRR: "",
    DRR: "",
    ELR: "",
    TRR: "",
    CategoryR: "",
    
  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  
  const handleFileChange4 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile4(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const navigate = useNavigate();
 
  const handleFileChange5 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile5(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange6 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile6(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange7 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile7(file);
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
    if (!formData.OwnerR) {
      errors.OwnerR = "Required";
    }
    if (!formData.FIRR) {
      errors.FIRR = "Required";
    }
    if (!formData.DRR) {
      errors.DRR = "Required";
    }
    if (!formData.ELR) {
      errors.ELR = "Required";
    }
    if (!formData.TRR) {
      errors.TRR = "Required";
    }
    if (!formData.CategoryR) {
      errors.CategoryR = "Required";
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
      formDataToSend.append("uniqueid", id); 
      formDataToSend.append("Owner_REND", formData.OwnerR);
      formDataToSend.append("FIR_R", selectedFile4);
      formDataToSend.append("DR_R", selectedFile5);
      formDataToSend.append("EL_R", selectedFile6);
      formDataToSend.append("TR_R", selectedFile7);
      formDataToSend.append("Category_R", formData.CategoryR);
      ;
      const response = await apiclient.post( apis.Trippingreportpart2, formDataToSend);
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
            OwnerR: "",
            FIRR: "",
            DRR: "",
            ELR: "",
            TRR: "",
            CategoryR: "",
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
                          
                         
                          {/* form 2 */}
                          {true && (
                            <>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Owner(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.OwnerR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="OwnerR"
                                    placeholder="Enter Owner(R)"
                                    maxlength="50"
                                    value={formData.OwnerR}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.OwnerR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  FIR(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.FIRR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="FIR(R)"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange4}
                                    isInvalid={!!formErrors.FIRR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  DR(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.DRR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="DRR"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange5}
                                    isInvalid={!!formErrors.DRR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  EL(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.ELR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="ELR"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange6}
                                    isInvalid={!!formErrors.ELR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  TR(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.TRR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="TRR"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange7}
                                    isInvalid={!!formErrors.TRR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Category(R)
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.CategoryR}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="CategoryR"
                                    placeholder="Enter category(R)"
                                    maxlength="50"
                                    value={formData.CategoryR}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.CategoryR}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                              </div>
                            </>
                          )}

                         
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
