import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import apiClient from '../../../Api/ApiClient';

export default function GalleryDetail() {
  const { id } = useParams(); // Get the gallery ID from the URL
  const galleryId = parseInt(id, 10);
  const [galleryData, setGalleryData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Fetch gallery data from the server using the gallery ID
    const fetchGalleryData = async () => {
      try {
        const response = await apiClient.get(`/api/Gallery/GetGallery/${galleryId}`);
        const data = response.data;
        setGalleryData(data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    if (galleryId) {
      fetchGalleryData();
    }
  }, [galleryId]);

  const handleDelete = async (imagePath) => {
    try {
       // Update the state to remove the deleted image
       const updatedImages = galleryData.ImagePaths.filter((image) => image !== imagePath);

        const formData = new FormData();
        formData.append('id', galleryId);
        formData.append('ImagePaths', updatedImages);
        formData.append('titlename', galleryData.title);
    

      // Call the API to delete the image
      //await apiClient.delete(`/api/Gallery/DeleteImage`, { data: { imagePath, galleryId } });
      const response = await apiClient.post(`/api/Gallery/Delete`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      debugger;   
   
      setGalleryData({ ...galleryData, ImagePaths: updatedImages });

      setSnackbarMessage('Image deleted successfully.');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error deleting image:', error);
      setSnackbarMessage('Failed to delete image.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'image', headerName: 'Image', flex: 1, renderCell: (params) => (
        <img
          src={apiClient.defaults.baseURL + params.value}
          alt={`image-${params.row.id}`}
          style={{ width: '100px', height: '100px' }}
        />
      ) 
    },
    { field: 'imagePath', headerName: 'Path', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.imagePath)}
        />,
      ],
    },
  ];

  const rows = galleryData.ImagePaths
    ? galleryData.ImagePaths.map((image, index) => ({
        id: index + 1,
        image,
        imagePath: image,
      }))
    : [];

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="pagetitle-lft">
            <h1 className="maintitle">Gallery Details</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Service</li>
                <li className="breadcrumb-item active">Gallery Data</li>
              </ol>
            </nav>
          </div>
          <div className="pagetitle-rgt">
            <Link to="/dashboard">
              <button type="button" className="btn btn-info">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h2>{galleryData.title}</h2>
          {galleryData.ImagePaths && galleryData.ImagePaths.length > 0 ? (
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          ) : (
            <p>No images found.</p>
          )}
        </div>
      </main>
      <Footer />

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
