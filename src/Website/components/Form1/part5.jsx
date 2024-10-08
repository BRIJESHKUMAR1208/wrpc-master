import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { useParams } from "react-router-dom";
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

export const Formonepart5 = () => {
    const { id } = useParams();
  const recommondationRef = useRef();
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [getuser, setuser] = useState("");
  const [formData, setFormData] = useState({
    SNo: "",
    UtilityActiontaken: "",
    Dateattended: "",
    Remarks: "",
  });

  // New state variables for confirmation dialog and loading
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  // const [selectedFile, setSelectedFile] = useState(null);

  

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
      errors.RecommondationofPCM = "Do not left the field blank";
    }
    if (!formData.kVLevel) {
      errors.kVLevel = "Required";
    }
    if (!formData.PCMNumber) {
      errors.PCMNumber = "Do not left the field blank";
    }
    if (!formData.PCMDate) {
      errors.PCMDate = "Required";
    }
    if (!formData.ItemNo) {
      errors.ItemNo = "Required";
    }
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
    if (!formData.Analysis) {
      errors.Analysis = "Required";
    }
    if (!formData.Remarks) {
      errors.Remarks = "Required";
    }
    if (!formData.FinalReport) {
      errors.FinalReport = "Required";
    }
    if (!formData.NotifiedStatus) {
      errors.NotifiedStatus = "Required";
    }
    if (!formData.UtilityAttending) {
      errors.UtilityAttending = "Required";
    }
    if (!formData.UtilityActiontaken) {
      errors.UtilityActiontaken = "Required";
    }
    if (!formData.Dateattended) {
      errors.Dateattended = "Required";
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
     formDataToSend.append("Action_Taken_by_Utility_to_Allow_Completion", formData.UtilityActiontaken);
      formDataToSend.append("Date_on_Which_Attended", formData.Dateattended);
      formDataToSend.append("Remarks", formData.Remarks);
      const response = await apiclient.post(
        apis.Trippingreportpart5,
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
            RecommondationofPCM: "",
            kVLevel: "",
            PCMNumber: "",
            PCMDate: "",
            ItemNo: "",
            RecommondationofPCM: "",
            TrippingDate: "",
            TrippingTime: "",
            OwnerS: "",
            FIRS: "",
            DRS: "",
            ELS: "",
            TRS: "",
            CategoryS: "",
            OwnerR: "",
            FIRR: "",
            DRR: "",
            ELR: "",
            TRR: "",
            CategoryR: "",
            Analysis: "",
            FinalReport: "",
            NotifiedStatus: "",
            UtilityAttending: "",
            UtilityActiontaken: "",
            Dateattended: "",
            Remarks: "",
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
                    
                          {true && (
                            <div class="form-group row">
                              <label class="col-sm-2 col-form-label">
                                Utility Action taken
                                <span>
                                  <b>*</b>
                                </span>
                                :
                              </label>
                              <div class="col-sm-2">
                                <span style={{ color: "red" }}>
                                  {formErrors.UtilityActiontaken}
                                </span>
                                <input
                                  class="form-control"
                                  name="UtilityActiontaken"
                                  placeholder="Enter Utility Action taken"
                                  maxlength="50"
                                  value={formData.UtilityActiontaken}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.UtilityActiontaken}
                                />
                                <small class="invalid-feedback"></small>
                              </div>
                              <label class="col-sm-2 col-form-label">
                                Date attended
                                <span>
                                  <b>*</b>
                                </span>
                                :
                              </label>
                              <div class="col-sm-2">
                                <span style={{ color: "red" }}>
                                  {formErrors.Dateattended}
                                </span>
                                <input
                                  class="form-control"
                                  name="Dateattended"
                                  type="date"
                                  min="1962-01-01"
                                  max="2024-26-001"
                                  maxlength="50"
                                  value={formData.Dateattended}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.Dateattended}
                                />
                                <small class="invalid-feedback"></small>
                              </div>
                              <label class="col-sm-2 col-form-label">
                                Remarks
                                <span>
                                  <b>*</b>
                                </span>
                                :
                              </label>
                              <div class="col-sm-2">
                                <span style={{ color: "red" }}>
                                  {formErrors.Remarks}
                                </span>
                                <input
                                  class="form-control"
                                  name="Remarks"
                                  placeholder="Enter Remarks"
                                  maxlength="50"
                                  value={formData.Remarks}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.Remarks}
                                />
                                <small class="invalid-feedback"></small>
                              </div>
                            </div>
                          )}

                          {/* form 4 */}
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
