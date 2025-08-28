import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { CmsFooter } from "../Footer/CmsFooter";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from './CmsDisplay';
import apiClient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { BASE_URL } from '../../../Api/ApiFunctions';
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';

const GalleryDetail = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [gallery, setGallery] = useState(null); // To store gallery details
  const [error, setError] = useState(null); // For error handling
  const [isOpen, setIsOpen] = useState(false); // Lightbox visibility
  const [currentImage, setCurrentImage] = useState(''); // Store the full image path
  const [loadingImage, setLoadingImage] = useState(false); // Track image loading state

  useEffect(() => {
    async function fetchData2() {
      try {
        debugger;
        const response = await apiClient.get(apis.getgalleryimage + id);
        setGallery(response.data); // Set the gallery data
      } catch (error) {
        setError('Error fetching gallery data'); // Update error state
        console.error('Error fetching gallery data:', error);
      }
    }
    fetchData2();
  }, [id]);

  // Preload the image when opening the lightbox
  const preloadImage = (imagePath) => {
    const img = new Image();
    img.src = `${BASE_URL}${imagePath}`; // Preload the image
    img.onload = () => setLoadingImage(false); // Set loading state to false once image is loaded
    setLoadingImage(true); // Set loading state to true before opening
  };

  // Open the lightbox directly with the full image path
  const openLightbox = (imagePath) => {
    preloadImage(imagePath); // Preload the image
    setCurrentImage(`${BASE_URL}${imagePath}`); // Set the full image path
    setIsOpen(true); // Open the lightbox immediately
  };

  const closeLightbox = () => {
    setIsOpen(false); // Close the lightbox
  };

  const moveNext = () => {
    const currentIndex = gallery.ImagePaths.indexOf(currentImage.replace(BASE_URL, ''));
    const nextIndex = (currentIndex + 1) % gallery.ImagePaths.length;
    setCurrentImage(`${BASE_URL}${gallery.ImagePaths[nextIndex]}`); // Update the current image
  };

  const movePrev = () => {
    const currentIndex = gallery.ImagePaths.indexOf(currentImage.replace(BASE_URL, ''));
    const prevIndex = (currentIndex + gallery.ImagePaths.length - 1) % gallery.ImagePaths.length;
    setCurrentImage(`${BASE_URL}${gallery.ImagePaths[prevIndex]}`); // Update the current image
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <TopHeader />
      <CmsDisplay />
      <main>
        <div className="container mt-4 vh-90">
          {gallery ? (
            <>
              <h4 className="gallery-heading">{gallery.title}</h4>
              <div className="gallery-container">
                {gallery.ImagePaths.length === 0 ? (
                  <p>No images available.</p>
                ) : (
                  gallery.ImagePaths.map((imagePath, index) => {
                    // file extension हटाकर caption/title बनाएँ
                  const title = imagePath
  .replace(/^\/?Galleryuploads\//, "") // "/Galleryupload/" हटाओ
  .replace(/\.[^/.]+$/, "");          // extension हटाओ
                    return (
                      <div key={index} className="gallery-card">
                        <div className="card gallery-box">
                          <img
                            src={`${BASE_URL}${imagePath}`} // Image URL

                          //alt={`Image ${index + 1}`}
                          alt={title}
                          className="card-img-top gallery-image"
                          onClick={() => openLightbox(imagePath)} // Open lightbox on click
                          loading="eager" // Ensure eager loading to prevent lazy loading
                          aria-label={imagePath || ` image ${index + 1}`}
                          title={title}
                        />
                          
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
            <p>Loading gallery details...</p>
          )}
        </div>

        {/* Lightbox */}
        {isOpen && gallery && (
          <Lightbox
            mainSrc={currentImage} // Display the current image
            nextSrc={`${BASE_URL}${gallery.ImagePaths[(gallery.ImagePaths.indexOf(currentImage.replace(BASE_URL, '')) + 1) % gallery.ImagePaths.length]}`} // Next image
            prevSrc={`${BASE_URL}${gallery.ImagePaths[(gallery.ImagePaths.indexOf(currentImage.replace(BASE_URL, '')) + gallery.ImagePaths.length - 1) % gallery.ImagePaths.length]}`} // Previous image
            onCloseRequest={closeLightbox} // Close lightbox
            onMovePrevRequest={movePrev} // Navigate to previous
            onMoveNextRequest={moveNext} // Navigate to next
          />
        )}

        {/* Loading Spinner for Image */}
        {loadingImage && <div className="loading-spinner">Loading...</div>}

        <CmsFooter />
      </main>
    </>
  );
};

export default GalleryDetail;
