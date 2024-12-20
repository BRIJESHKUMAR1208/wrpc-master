import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
import apiClient from "../../../Api/ApiClient";
import api from "../../../Api/api.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"; // Import Material-UI components

export const ViewFormfour = () => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    SNo: "",
    Substation: "",
    kVLevel: "",
    Owner: "",
    Nameofelement: "",
    Protectiontypetext: "",
    Makeofrelay: "",
    Srnoofrelay: "",
    upload_file: "",
    languagetype: "",
    Remarks: "",
    admin_remark: "",  // Ensure this is initialized properly
  });

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Close confirmation dialog and show loading spinner
      setConfirmDialogOpen(false);
      setLoading(true);

      // Create FormData to send in POST request
      const formDataToSend = new FormData();
      formDataToSend.append("s_no", formData.s_no);  // Append SNo
      formDataToSend.append("admin_remark", formData.admin_remark);  // Append admin_remark

      // if (selectedFile) {
      //   formDataToSend.append("upload_file", selectedFile);
      // }

      const response = await apiClient.post(api.Relaadmindata, formDataToSend);

      if (response.status === 200) {
       // alert("Data saveed successfully");
        // Simulate a 1-second delay and handle success
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          setFormData({
            SNo: "",
            Substation: "",
            kVLevel: "",
            Owner: "",
            Nameofelement: "",
            Protectiontypetext: "",
            Makeofrelay: "",
            Srnoofrelay: "",
            upload_file: "",
            languagetype: "",
            Remarks: "",
            admin_remark: "",  // Clear admin_remark field
          });
        }, 1000);
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

        const response = await apiClient.get(`/api/Relay/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData2();
  }, [id]);
  

  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <main id="main" class="main">
          <div class="pagetitle">
            <div className="pagetitle-lft">
              <h1>Relay Settings Data</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">Dashboard</li>
                  <li class="breadcrumb-item ">Form two</li>
                  <li class="breadcrumb-item active">Relay settings data</li>
                </ol>
              </nav>
            </div>
            <div className="pagetitle-rgt">
              <Link to="/dashboard">
                <button type="button" class="btn btn-info">Back</button>
              </Link>
            </div>
          </div>
          <div className="home">
            <div className="homeContainer">
              <div className="bgimg">
                <Col md={10} lg={12} xs={12}>
                  <Card>
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-4 text-center text-uppercase">
                          Relay settings data
                        </h2>
                        <div className="mb-3">
                          <Form onSubmit={handleSubmit}>
                            <tbody>
                              {/* Form Fields */}
                              <tr>
                                <td className="ui header">S.No</td>
                                
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Serial no"
                                    value={formData.s_no} 
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                    <td className="ui header">Substation</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Substation"
                                        value={formData.substation} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Utility</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Utility Level"
                                        value={formData.utility} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">KV Level</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="KV Level"
                                        value={formData.kv_level} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Owner</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Owner"
                                        value={formData.owner} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Name of the element
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Name of the element"
                                        value={formData.name_of_element} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Protection(M!/M2/Backup){" "}
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Protection(M!/M2/Backup)"
                                        value={formData.protection_typetext} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">Make of Relay</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Make of Relay"
                                        value={formData.make_of_relay} disabled
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="ui header">
                                      Sr No of relay
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Sr No of relay"
                                        value={formData.sr_no_of_relay} disabled
                                      />
                                    </td>
                                  </tr>
                                  {/* <tr>
                                    <td className="ui header">Uploaded File</td>
                                    <td>
                                        <Link className="form-control" to={`${BASE_URL+formData.upload_filepath}`} ><PictureAsPdfIcon/></Link>
                                    </td>
                                  </tr> */}
                                  <tr>
                                    <td className="ui header">Remarks</td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Remarks"
                                        value={formData.remarks} disabled
                                      />
                                    </td>
                                  </tr>
                              {/* Other fields... */}
                              <tr>
                                <td className="ui header">Admin Remarks</td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Remarks"
                                    name="admin_remark"  // Correct binding
                                    value={formData.admin_remark}
                                    onChange={handleChange}  // Bind the change handler
                                  />
                                </td>
                              </tr>
                            </tbody>

                            <div
                              id="button"
                              className="d-flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <Button variant="primary" type="submit" style={{ width: 100 }} disabled={loading}>
                                Submit
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <ToastContainer />

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>Are you sure you want to submit?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Saved successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
