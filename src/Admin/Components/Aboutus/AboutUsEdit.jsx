import React, { useState } from "react";
import axios from "axios";
import { Button, Box, IconButton, Paper, Grid, TextField } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../Api/api.json";
import apiClient from "../../../Api/ApiClient";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";
import { Link,useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
// import BannerTable from "./BannerTable";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export const AboutUsEdit = () => {
  const {id} = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");

  const handleVideoUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("imgsrc", selectedImage);
    formData.append("content", imageName);
    formData.append("description", description);

    try {
      
      const response = await apiClient.post('/api/About/put/'+id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });



      

      // Show a success toast notification
      toast.success("Image uploaded successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });

      // Clear the form fields and reset state after successful upload
      setSelectedImage(null);
      setImageName("");
      setDescription("");

      // Reset the input file element to allow selecting a new video
      const inputFile = document.getElementById(`upload-input-${id}`);
      if (inputFile) {
        inputFile.value = ""; // Clear the selected file
      }
    } catch (error) {
      console.error("Error uploading video:", error);

      // Show an error toast notification
      toast.error("Error uploading video", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    setSelectedImage(videoFile);
  };

  const handleContentChange = (event) => {
    setImageName(event.target.value);
    // setDescription(event.target.value);
  };
  
  const handleContentChange1 = (event) => {

    setDescription(event.target.value);
  };



  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" class="main">
      <div class="pagetitle-rgt">
              <Link to="/cms/aboutustable">
                <button type="button" class="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
        {/* ... (existing code) ... */}
        <form>
          <Paper elevation={3} sx={{ padding: 2, position: "relative" }}>
            <h1>About us</h1>
            {selectedImage && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                {/* Display a video preview, if needed */}
                <img
                  width="100"
                  height="100"
                  controls
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    objectFit: "cover",
                  }}
                  src={URL.createObjectURL(selectedImage)}
                />
              </Box>
            )}

            {/* Input for uploading video */}
            <input
              type="file"
              onChange={handleVideoChange}
              style={{ display: "none" }}
              id={`upload-input-${id}`}
            />
            <label htmlFor={`upload-input-${id}`}>
              <Button variant="outlined" component="span">
                <AddPhotoAlternateIcon />
                Choose Image
              </Button>
            </label>

           
            {/* Text field for video name */}
            <TextField
              label="Video Name"
              value={imageName}
              onChange={handleContentChange}
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />
            <TextareaAutosize
              aria-label="Description"
              minRows={3}
              name="description"
              placeholder="Description"
              value={description}
              fullWidth
              onChange={handleContentChange1}
              sx={{ marginTop: 2, width: "100%" }}
              required
            />

            {/* Upload button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleVideoUpload}
              disabled={!selectedImage}
              sx={{ marginTop: 2 }}
            >
              <UploadFileIcon />
              Upload Video
            </Button>

            <ToastContainer />
          </Paper>
        </form>
    
        
      </main>
      <Footer />
    </div>
  );
};
