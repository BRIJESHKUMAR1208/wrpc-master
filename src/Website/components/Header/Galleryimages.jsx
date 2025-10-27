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
      if (response.data && response.data.length > 0) {
        const galleryData = response.data[0];
        setGallery({
          title: galleryData.u_title,
          ImagePaths: galleryData.u_imagepaths
            ? galleryData.u_imagepaths.split(",")
            : [],
          Captions: galleryData.u_caption
            ? galleryData.u_caption.split(",")
            : [],
        });
      }
    } catch (error) {
      setError("Error fetching gallery data");
      console.error("Error fetching gallery data:", error);
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
      <div id="main-content">
      <CmsDisplay />

      <main>
        <div className="container mt-4 vh-90">
          {gallery ? (
            <>
              <h4 className="gallery-heading">{gallery.title}</h4>

             <div className="gallery-container">
  {!gallery?.ImagePaths || gallery.ImagePaths.length === 0 ? (
    <p>No images available.</p>
  ) : (
gallery.ImagePaths.map((imagePath, index) => {
   const galleryTitle = imagePath  ;
  const title = gallery.Captions[index]
    .replace(/^\/?galleryuploads\//i, "")
    .replace(/\.[^/.]+$/, "");
    
  return (
    <div key={index} className="gallery-card">
      <div className="card gallery-box">
        <img
          src={`${BASE_URL}${imagePath}`}
          alt={title}
          className="card-img-top gallery-image"
          onClick={() => openLightbox(imagePath)}
          loading="eager"
          aria-label={title}
          title={title}
        />
        <p className="image-caption">{title}</p>
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
       </div>
    </>
  );
};

export default GalleryDetail;
