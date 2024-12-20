import React, { useState, useEffect,useCallback } from "react";
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Link, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


export const EditCommerical = () => {
  const [selectedYear, setSelectedYear] = useState(new Date());
  const { id } = useParams()
  const [html, sethtml] = useState('');
  const [inputYear, setInputYear] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    languagetype: "",
    name: "",
    startdate: '',
    enddate: '',
    uploadpdf: "",
    uploadzip: " ",
    date: "",
    commercialtype:'',
  });

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  const handleEditorChange = (content) => {
    sethtml(content);
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.languagetype) {
      errors.languagetype = "Select Language";
    }
    if (!formData.commercialtype) {
      errors.commercialtype = "Select Title";
    }

    // Remove the validation for menuName

    if (!formData.name) {
      errors.name = "Please enter a Name";
    }

    if (!formData.start_date) {
      errors.start_date = 'Starting Date is required';
    }

    if (!formData.uploadpdf) {
      errors.uploadpdf = "PDF File is required";
    }

    if (!formData.uploadzip) {
      errors.uploadzip = "ZIP File is required";
    }

    // if (!selectedYear) {
    //   errors.selectedYear = "Select a year";
    // }

    // Additional validation for the year format
    // if (selectedYear && !/^20\d{2}$/.test(selectedYear.getFullYear())) {
    //   errors.selectedYear = "Invalid year format";
    // }
    if (!formData.end_date) {
      errors.end_date = 'Ending Date is required';
    } 
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
      errors.end_date = 'End date must be greater than or equal to start date';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (name === "year" && type === "text") {
      setInputYear(value);
    } else {
      setFormData({
        ...formData,
        [name]: type === "file" ? event.target.files[0] : value,
      });
    }
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };


  useEffect(() => {
    if (id) {
      apiClient.get(apis.commericalget + id)
        .then((response) => {
          setFormData(response.data)

        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
        });
    } else {
      setFormData({
        // report_tittle: '',
        // contenttype: 0,
        // external_file: '',
        // internal_file: '',
        // file: null,
        // start_date: '',
        // end_date: '',
        // html: '',
        // languagetype:'',
      });
    }
  }, [id]);

  const handleDeleteConfirm = async () => {
    setConfirmDialogOpen(false);

    try {
      const formDataToSend = new FormData();
   
      formDataToSend.append("languagetype", parseInt(formData.languagetype));
      formDataToSend.append("commercialtype", formData.title);
      formDataToSend.append("name", formData.name);
      formDataToSend.append('start_date', formData.startdate);
      formDataToSend.append('end_date', formData.enddate);
      formDataToSend.append("uploadpdf", formData.uploadpdf);
      formDataToSend.append("uploadzip", formData.uploadzip);
      formDataToSend.append("commercialtype", formData.uploadzip);
    //  formDataToSend.append("year", parseInt(selectedYear.getFullYear()));

      const response = await apiClient.put("/api/Commercial/put/" + id, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      
      setFormData({
        languagetype: "",
        name: "",
        start_date:"",
        end_date:"",
        uploadpdf: null,
        uploadzip: null,
        date: "",
      });

      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Something went wrong!");
    }
  };


  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Create Commerical</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item">Services</li>
              <li class="breadcrumb-item active">Commerical</li>
            </ol>
          </nav>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="col text-end"></div>
            </div>
          </div>
          <div class="pagetitle-rgt">
            <Link to="/services/commericaltable">
              <button type="button" class="btn btn-info">
                Back
              </button>
            </Link>
          </div>
          <div className="row justify-content-center">
            <div>
              <div class="card">
                <div class="card-body">
                  <div class="mb-3 mt-md-4">
                    <div class="box-sec">
                      <h1 className="text-center heading-main">Commerical</h1>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Select Language
                        </label>
                        <select
                          className="form-select"
                          name="languagetype"
                          value={formData.languagetype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select language</option>
                          <option value="1">English</option>
                          <option value="2">Hindi</option>
                        </select>
                        {errors.languagetype && (
                          <div className="text-danger">
                            {errors.languagetype}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Select Title
                        </label>
                        <select
                          className="form-select"
                          name="title"
                          value={formData.commercialtype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Title</option>
                          <option value="1">DSM/UI</option>
                          <option value="2">Account Regional Energy Account</option>
                          <option value="3">Compensation Statement</option>
                          <option value="4">Ramping Certificate</option>
                          <option value="5">REC Account</option>
                          <option value="6">RTA Account</option>
                          <option value="7">RTDA Account</option>
                          <option value="8">Congestion Account</option>
                          <option value="9">CAncillary Services Data(RRAS)</option>
                          <option value="10">RRAS AGC SCED</option>
                          <option value="11">Allocation of C.S Share</option>
                          <option value="12">REA Account through New Software</option>
                          <option value="13">Sharing of Transmission Charges</option>
                          <option value="14">P O C M</option>
                        </select>
                        {errors.commercialtype && (
                          <div className="text-danger">
                            {errors.commercialtype}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {errors.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                      <div className="mb-3">
              <label className="form-label text-dark">Starting Date</label>
              <input
                className="form-control"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
              {errors.start_date && (
                <div className="text-danger">{errors.start_date}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Ending Date</label>
              <input
                className="form-control"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
              {errors.end_date && (
                <div className="text-danger">{errors.end_date}</div>
              )}
            </div>
                      {/* <div className="mb-3">
                        <label className="form-label text-dark">
                          Select Year
                        </label>
                      </div>
                      <div className="mb-3">
                        <DatePicker
                          className="form-control"
                          selected={selectedYear}
                          onChange={handleYearChange}
                          showYearPicker
                          dateFormat="yyyy"
                        />
                        {errors.selectedYear && (
                          <div className="text-danger">
                            {errors.selectedYear}
                          </div>
                        )}
                      </div> */}

                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Choose PDF File
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          name="uploadpdf"
                          accept=".pdf"
                          onChange={handleInputChange}
                        />
                        {errors.uploadpdf && (
                          <div className="text-danger">{errors.uploadpdf}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Choose ZIP File
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          name="uploadzip"
                          accept=".zip"
                          onChange={handleInputChange}
                        />
                        {errors.uploadzip && (
                          <div className="text-danger">{errors.uploadzip}</div>
                        )}
                      </div>

                      <div className="btnsubmit">
                        <button
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Update
                        </button>

                        

                        <ToastContainer />
                        {/* Confirmation Dialog */}
                        <Dialog
                          open={confirmDialogOpen}
                          onClose={handleDeleteCancel}
                        >
                          <DialogTitle>Confirm Create</DialogTitle>
                          <DialogContent>
                            Are you sure you want to create this user?
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleDeleteCancel}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDeleteConfirm}
                              color="primary"
                            >
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
                          <DialogContent>
                            User created successfully!
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => setSuccessDialogOpen(false)}
                              color="primary"
                            >
                              OK
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
