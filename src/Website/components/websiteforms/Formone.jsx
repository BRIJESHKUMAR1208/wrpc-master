import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
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
import "./custom-form.scss";
import axios from "axios";

export const Formone = () => {
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
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [selectedFile6, setSelectedFile6] = useState(null);
  const [selectedFile7, setSelectedFile7] = useState(null);
  const [selectedFile8, setSelectedFile8] = useState(null);
  const [selectedFile9, setSelectedFile9] = useState(null);
  const [formData, setFormData] = useState({
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
  const handleFileChange4 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile4(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
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
  const handleFileChange8 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile8(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };
  const handleFileChange9 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile9(file);
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

      formDataToSend.append(
        "Recommendation_of_PCM",
        formData.RecommondationofPCM
      );
      formDataToSend.append("user_id", candidateId);
      formDataToSend.append("kV_Level", formData.kVLevel);
      formDataToSend.append("PCM_Number", formData.PCMNumber);
      formDataToSend.append("PCM_Date", formData.PCMDate);
      formDataToSend.append("Item_No_Heading", formData.ItemNo);
      formDataToSend.append("Tripping_Date", formData.TrippingDate);
      formDataToSend.append("Tripping_Time", formData.TrippingTime);
      formDataToSend.append("Owner_SEND", formData.OwnerS);
      formDataToSend.append("FIR_S", selectedFile);
      formDataToSend.append("DR_S", selectedFile1);
      formDataToSend.append("EL_S", selectedFile2);
      formDataToSend.append("TR_S", selectedFile3);
      formDataToSend.append("Category_S", formData.CategoryS);
      formDataToSend.append("Owner_REND", formData.OwnerR);
      formDataToSend.append("FIR_R", selectedFile4);
      formDataToSend.append("DR_R", selectedFile5);
      formDataToSend.append("EL_R", selectedFile6);
      formDataToSend.append("TR_R", selectedFile7);
      formDataToSend.append("Category_R", formData.CategoryR);
      formDataToSend.append("Analysis", selectedFile8);
      formDataToSend.append("Final_Report", selectedFile9);
      formDataToSend.append("Notified_Status", formData.NotifiedStatus);
      formDataToSend.append("Utility_Responsible_for_Attending", formData.UtilityAttending);
      formDataToSend.append("Action_Taken_by_Utility_to_Allow_Completion", formData.UtilityActiontaken);
      formDataToSend.append("Date_on_Which_Attended", formData.Dateattended);
      formDataToSend.append("Remarks", formData.Remarks);
      ;
      const response = await apiclient.post(
        apis.Trippingcompliance,
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
                          <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                              Recommondation of PCM
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>
                            <div class="col-sm-2">
                              <span style={{ color: "red" }}>
                                {formErrors.RecommondationofPCM}
                              </span>
                              <input
                                class="form-control"
                                name="RecommondationofPCM"
                                placeholder="Enter Recommondation of PCM"
                                maxlength="50"
                                value={formData.RecommondationofPCM}
                                onChange={handleChange}
                                isInvalid={!!formErrors.RecommondationofPCM}
                              />
                            </div>

                            <label class="col-sm-2 col-form-label">
                              PCM Number
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>
                            <div class="col-sm-2">
                              <span style={{ color: "red" }}>
                                {formErrors.PCMNumber}
                              </span>
                              <input
                                class="form-control"
                                name="PCMNumber"
                                placeholder="PCM Number"
                                onChange={handleChange}
                                isInvalid={!!formErrors.PCMNumber}
                                maxlength="50"
                                value={formData.PCMNumber}
                              />
                              <small class="invalid-feedback"></small>
                            </div>
                            <label class="col-sm-2 col-form-label">
                              PCM Date
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>
                            <div class="col-sm-2">
                              <span style={{ color: "red" }}>
                                {formErrors.PCMDate}
                              </span>
                              <input
                                class="form-control"
                                className="form-control"
                                name="PCMDate"
                                type="date"
                                value={formData.PCMDate}
                                onChange={handleChange}
                                isInvalid={!!formErrors.PCMDate}
                              />
                              <small class="invalid-feedback"></small>
                            </div>
                            <label class="col-sm-2 col-form-label">
                              Item No
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>
                            <div class="col-sm-2">
                              <span style={{ color: "red" }}>
                                {formErrors.ItemNo}
                              </span>
                              <input
                                class="form-control"
                                name="ItemNo"
                                placeholder="Enter Item No"
                                maxlength="50"
                                value={formData.ItemNo}
                                onChange={handleChange}
                                isInvalid={!!formErrors.ItemNo}
                              />
                              <small class="invalid-feedback"></small>
                            </div>
                          </div>
                          {/* form 1 */}
                          {true && (
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
                          )}
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

                          {/* form 2 */}
                          {/* form 3 */}

                          {true && (
                            <>
                              <div class="form-group row">
                                <label class="col-sm-2 col-form-label">
                                  Analysis
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.Analysis}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="Analysis"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange8}
                                    isInvalid={!!formErrors.Analysis}
                                  />
                                  <small class="invalid-feedback"></small>
                                </div>
                                <label class="col-sm-2 col-form-label">
                                  Final Report
                                  <span>
                                    <b>*</b>
                                  </span>
                                  :
                                </label>
                                <div class="col-sm-2">
                                  <span style={{ color: "red" }}>
                                    {formErrors.FinalReport}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="FinalReport"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange9}
                                    isInvalid={!!formErrors.FinalReport}
                                  />
                                </div>
                                <small class="invalid-feedback"></small>
                              </div>
                            </>
                          )}

                          {/* form 3 */}
                          <div class="form-group row">

                            <label class="col-sm-2 col-form-label">
                              Notified Status
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>

                            <select
                              class="form-control col-sm-2 col-form-label"
                              name="NotifiedStatus"
                              value={formData.NotifiedStatus}
                              onChange={handleChange}
                              isInvalid={!!formErrors.NotifiedStatus}
                            >
                              <option value="">--Select--</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>

                            <label class="col-sm-2 col-form-label">
                              Utility Attending
                              <span>
                                <b>*</b>
                              </span>
                              :
                            </label>
                            <div class="col-sm-2">
                              <span style={{ color: "red" }}>
                                {formErrors.UtilityAttending}
                              </span>
                              <input
                                class="form-control"
                                name="UtilityAttending"
                                placeholder="Enter Utility Attending"
                                maxlength="50"
                                value={formData.UtilityAttending}
                                onChange={handleChange}
                                isInvalid={!!formErrors.UtilityAttending}
                              />
                              <small class="invalid-feedback"></small>
                            </div>
                          </div>
                          {/* form 4 */}
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
