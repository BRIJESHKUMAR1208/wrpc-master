import React, { useState, useEffect, useMemo, useCallback } from "react";
import apiClient from "../../../../Api/ApiClient";
import apis from "../../../../Api/api.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './whatsnew.scss'
import ViewListIcon from "@mui/icons-material/ViewList";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../../header/Header";

import Footer from "../../footer/Footer";
import Sidebar from "../../sidebar/Sidebar";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
// import {ToastContainer ,toast } from 'react-toastify'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export const CreateReports = () => {
  const [html, sethtml] = useState("");
  const [file, setselectefile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [content, setContent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
const[loading,setLoading]=useState(false);
  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const onChange = useCallback((newContent) => {
    // console.log("Editor content changed:", newContent);
    setContent(newContent);
  }, []);

  const [formData, setFormData] = useState({
    report_tittle: "",
    contenttype: "",
    external_file: "",
    internale_file: "",
    file: "",
    startdate: "",
    end_date: "",
    html: "",
    languagetype: "",
  });
  const [errors, setErrors] = useState({});

  const optionsData = [
    { id: "4", label: "External Link" },
    { id: "3", label: "Internal Link" },
    { id: "2", label: "File" },
    { id: "1", label: "HTML" },
  ];

  useEffect(() => {
    setFormData({
      report_tittle: "",
      contenttype: "",
      external_file: "",
      internale_file: "",
      file: "",
      startdate: "",
      end_date: "",
      html: "",
      languagetype: "",
    });
  }, []);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.report_tittle) {
      errors.report_tittle = "Please enter report name";
    } 
    //else if (
    //   !/^[A-Za-z ]+$/.test(formData.report_tittle) &&
    //   parseInt(formData.languagetype) == 1
    // ) 
    // {
    //   errors.report_tittle = "Please input alphabet characters only";
    // } 
    else if (
      !/^[\u0900-\u097F\s]+$/.test(formData.report_tittle) &&
      parseInt(formData.languagetype) == 2
    ) {
      errors.report_tittle = "कृपया केवल हिंदी शब्द ही इनपुट करें";
    }
    if (!formData.languagetype) {
      errors.languagetype = "Select Language";
    }

    if (!formData.contenttype) {
      errors.contenttype = "Select a content type";
    }

    if (formData.contenttype === "4" && !formData.external_file) {
      errors.external_file = "External Link is required";
    }

    // if (formData.contenttype === '3' && !formData.internale_file) {
    //   errors.internale_file = 'Internal Link is required';
    // }

    if (formData.contenttype === "2" && !file) {
      errors.file = "File is required";
    }

    if (!formData.startdate) {
      errors.startdate = "Starting Date is required";
    }

    if (!formData.end_date) {
      errors.end_date = "Ending Date is required";
    } else if (new Date(formData.startdate) > new Date(formData.end_date)) {
      errors.end_date = "End date must be greater than or equal to start date";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setselectefile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "2") {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setConfirmDialogOpen(false);
    if (validateForm()) {
      setLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("report_tittle", formData.report_tittle);
        formDataToSend.append("contenttype", formData.contenttype);

        if (formData.contenttype === "4") {
          formDataToSend.append("external_file", formData.external_file);
        } else if (formData.contenttype === "3") {
          formDataToSend.append("internale_file", formData.internale_file);
        } else if (formData.contenttype === "2") {
          formDataToSend.append("file", file);
        } else if (formData.contenttype === "1") {
          formDataToSend.append("html", content);
        }

        formDataToSend.append("startdate", formData.startdate);
        formDataToSend.append("end_date", formData.end_date);
        formDataToSend.append("languagetype", formData.languagetype);

        const response = await apiClient.post(apis.Report, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log('Data saved:', response.data);
        setFormData({
          report_tittle: "",
          contenttype: "",
          external_file: "",
          internale_file: "",
          file: "",
          startdate: "",
          end_date: "",
          html: "",
          languagetype: "",
        });
        toast.success("Data saved successfully!");
        // openModal('Data saved successfully!');
      } catch (error) {
        console.error("Error saving data:", error);
        toast.error("Something Went Wrong!");
      }
      finally{
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await apiClient.get(apis.getmenuname);
        setDropdownOptions(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData1();
  }, []);

  // console.log(formData);

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <div class="pagetitle-lft">
            <h1>Create Report</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Home</li>
                <li class="breadcrumb-item">Services</li>
                <li class="breadcrumb-item active">Create Report</li>
              </ol>
            </nav>
          </div>
          <div class="pagetitle-rgt">
            <Link to="/dashboard">
              <button type="button" class="btn btn-info">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="col text-end"></div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div>
              <div class="card">
                <div class="card-body">
                  <div class="mb-3 mt-md-4">
                    <div class="box-sec">
                      <h1 className="text-center heading-main">Latest News</h1>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Language Type
                        </label>
                        <select
                          className="form-select"
                          name="languagetype"
                          value={formData.languagetype}
                          onChange={handleInputChange}
                        >
                          <option value=" ">Select a Language</option>
                          <option value={1}>English</option>
                          <option value={2}>Hindi</option>
                        </select>
                        {errors.languagetype && (
                          <div className="text-danger">
                            {errors.languagetype}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-dark">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          name="report_tittle"
                          value={formData.report_tittle}
                          onChange={handleInputChange}
                        />
                        {errors.report_tittle && (
                          <div className="text-danger">
                            {errors.report_tittle}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Select a content type
                        </label>
                        <select
                          className="form-select"
                          name="contenttype"
                          value={formData.contenttype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a content type</option>
                           <option value="4">External</option>
                         {/* <option value="3">Internal</option>
                         <option value="1">HTML</option> */}                          
                          <option value="2">File</option> 
                        </select>
                        {errors.contenttype && (
                          <div className="text-danger">
                            {errors.contenttype}
                          </div>
                        )}
                      </div>
                      {formData.contenttype === "4" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            Enter External Link
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter External Link"
                            name="external_file"
                            value={formData.external_file}
                            onChange={handleInputChange}
                          />
                          {errors.external_file && (
                            <div className="text-danger">
                              {errors.external_file}
                            </div>
                          )}
                        </div>
                      )}
                      {formData.contenttype === "3" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            Enter Internal Link
                          </label>
                          {/* <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Internal Link"
                  name="internale_file"
                  value={formData.internale_file}
                  onChange={handleInputChange}
                /> */}
                          <select
                            className="form-control"
                            name="internale_file"
                            value={formData.internale_file}
                            onChange={handleInputChange}
                          >
                            <option value="" style={{ color: "black" }}>
                              Select a MenuName
                            </option>
                            {dropdownOptions.map((data) => (
                              <option
                                key={data.u_id}
                                value={"/menu/" + data.u_menu_url}
                              >
                                {"Menu Name" + ":-" + data.u_menu_name}
                              </option>
                            ))}
                          </select>
                          {errors.internale_file && (
                            <div className="text-danger">
                              {errors.internale_file}
                            </div>
                          )}
                        </div>
                      )}
                      {formData.contenttype === "2" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            Choose File
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="file"
                            onChange={handleImageChange}
                          />
                          {errors.file && (
                            <div className="text-danger">{errors.file}</div>
                          )}
                        </div>
                      )}
                      {formData.contenttype === "1" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            HTML Editor
                          </label>
                          <div>
                            <JoditEditor
                              value={content}
                              config={config}
                              tabIndex={1}
                              onChange={onChange}
                            />
                          </div>
                          {errors.editorContent && (
                            <div className="text-danger">
                              {errors.editorContent}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Starting Date
                        </label>
                        <input
                          className="form-control"
                          type="date"
                          name="startdate"
                          value={formData.startdate}
                          onChange={handleInputChange}
                        />
                        {errors.startdate && (
                          <div className="text-danger">{errors.startdate}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Ending Date
                        </label>
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
                      <div className="btnsubmit">
                        <button
                          className="btn btn-primary"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          Submit
                        </button>

                        {/* <CustomModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
                         */}
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
