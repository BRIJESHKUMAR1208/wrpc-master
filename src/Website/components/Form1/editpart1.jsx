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
import { Link,useParams } from "react-router-dom";
import { Row } from "react-bootstrap/esm";
import apiclient from "../../../Api/ApiClient";
//import "./custom-form.scss";
import axios from "axios";
import {BASE_URL} from "../../../Api/ApiFunctions"


export const Editformonepart1 = () => {
    const { id } = useParams();
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
    tripping_date: "",
    tripping_time: "",
    owner_send: "",
    fir_s: "",
    dr_s: "",
    el_s: "",
    tr_s: "",
    category_s: "",
   
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

    
    if (!formData.tripping_date) {
      errors.tripping_date = "Required";
    }
    if (!formData.tripping_time) {
      errors.tripping_time = "Required";
    }
    if (!formData.owner_send) {
      errors.owner_send = "Required";
    }
    // if (!formData.FIRS) {
    //   errors.FIRS = "Required";
    // }
    // if (!formData.DRS) {
    //   errors.DRS = "Required";
    // }
    // if (!formData.ELS) {
    //   errors.ELS = "Required";
    // }
    // if (!formData.tr_s) {
    //   errors.tr_s = "Required";
    // }
    if (!formData.category_s) {
      errors.category_s = "Required";
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
    debugger;
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
     
      formDataToSend.append("Tripping_Date", formData.tripping_date);
      formDataToSend.append("Tripping_Time", formData.tripping_time);
      formDataToSend.append("Owner_SEND", formData.owner_send);
      if (formData.fir_s ) {
        setSelectedFile(formData.fir_s)
        formDataToSend.append("FIR_S", formData.fir_s);
      }
      else{
        formDataToSend.append("FIR_S", selectedFile);
      }
      if (formData.dr_s ) {
        setSelectedFile1(formData.dr_s)
        formDataToSend.append("DR_S", selectedFile1);
      }
      else{
        formDataToSend.append("DR_S", selectedFile1);
      }
      if (formData.el_s ) {
        setSelectedFile2(formData.el_s)
        formDataToSend.append("EL_S", selectedFile2);
      }
      else{
        formDataToSend.append("EL_S", selectedFile2);
      }
      if (formData.tr_s ) {
        setSelectedFile3(formData.tr_s)
        formDataToSend.append("TR_S", selectedFile3);
      }
      else{
        formDataToSend.append("TR_S", selectedFile3);
      }
      formDataToSend.append("Category_S", formData.category_s);
      ;
      const response = await apiclient.post(
        apis.TrippingUpdatepart1 + id,
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
            tripping_date: "",
            tripping_time: "",
            owner_send: "",
            fir_s: "",
            dr_s: "",
            el_s: "",
            tr_s: "",
            category_s: "",
           
          
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


  
  useEffect(() => {
    if (id) {
        apiclient
            .get(apis.editformone + id)
            .then((response) => {
                let trippingTime = response.data.tripping_time || ""; // Fetch time

                // Format time from "HH:MM:SS" to "HH:MM"
                if (trippingTime) {
                    trippingTime = trippingTime.slice(0, 5); // Take first 5 characters (HH:MM)
                }

                // Debugging output
                console.log("Processed Tripping Time for UI:", trippingTime);

                setFormData({
                    ...response.data,
                    tripping_time: trippingTime, // Bind the formatted time value
                });
            })
            .catch((error) => {
                console.error("Error fetching data for editing:", error);
            });
    }
}, [id]);

  
  
  
  
  
  
  

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
                                    {formErrors.tripping_date}
                                  </span>
                                  <input
                                    class="form-control"
                                    className="form-control"
                                    name="tripping_date"
                                    type="date"
                                    value={formData.tripping_date}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.tripping_date}
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
                                    {formErrors.tripping_time}
                                  </span>
                                  
                                  <input
                                    class="form-control"
                                    className="form-control"
                                    name="tripping_time"
                                    type="time"
                                    value={formData.tripping_time}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.tripping_time}
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
                                    {formErrors.owner_send}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="owner_send"
                                    maxlength="50"
                                    value={formData.owner_send}
                                    placeholder="Enter Owner(S)"
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.owner_send}
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
                                    {formErrors.fir_s}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="fir_s"
                                    type="file"
                                    // value={selectedFile}
                                    onChange={handleFileChange}
                                    isInvalid={!!formErrors.fir_s}
                                  />
                                   {/* Link to show image or PDF */}
      {formData.fir_spdfpath && (
        <div>
          <a
            href={ BASE_URL +  formData.fir_spdfpath} // Link to the file
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
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
                                    {formErrors.dr_s}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="dr_s"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange1}
                                    isInvalid={!!formErrors.dr_s}
                                  />
                                  {/* Link to show image or PDF */}
      {formData.dr_spath && (
        <div>
          <a
            href={ BASE_URL +  formData.dr_spath} // Link to the file
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
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
                                    {formErrors.el_s}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="el_s"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange2}
                                    isInvalid={!!formErrors.el_s}
                                  />
                                   {/* Link to show image or PDF */}
      {formData.el_spath && (
        <div>
          <a
            href={ BASE_URL +  formData.el_spath} // Link to the file
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
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
                                    {formErrors.tr_s}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="tr_s"
                                    type="file"
                                    maxlength="50"
                                    onChange={handleFileChange3}
                                    isInvalid={!!formErrors.tr_s}
                                  />
                                    {/* Link to show image or PDF */}
      {formData.tr_spath && (
        <div>
          <a
            href={ BASE_URL +  formData.tr_spath} // Link to the file
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer"
          >
            View File
          </a>
        </div>
      )}
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
                                    {formErrors.category_s}
                                  </span>
                                  <input
                                    class="form-control"
                                    name="category_s"
                                    placeholder="Enter category(S)"
                                    maxlength="50"
                                    value={formData.category_s}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.category_s}
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