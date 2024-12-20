import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiclient from "../../../Api/ApiClient";
import apis from "../../../Api/api.json";
import { BASE_URL } from "../../../Api/ApiFunctions";

const Slide = ({ id, imgPath, content, description }) => (
  <>
    <div key={id} className="boxxxx">
      <div class="main-about" id="demos">
        <div class="container">
          <div class="row"></div>
          <div class="row">
            <div class="col-md-6">
              <div class="city_about_fig">
                <figure class="box">
                  <div class="box-layer layer-1"></div>
                  <div class="box-layer layer-2"></div>
                  <div class="box-layer layer-3"></div>
                  <img src={BASE_URL +imgPath} alt={imgPath} width={100} height={300} />
                </figure>
              </div>
            </div>
            <div class="col-md-6">
              <div class="city_about_list">
                <div class="city_about_text">
                  <h6>{content}</h6>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export const Aboutus = () => {
  const [allData, setAllData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  useEffect(() => {
    apiclient
      .get(apis.aboutus)
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);

  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
  };

  return (
    <div>
      {parseInt(selectedLanguage) === 1 ? (
        <>
          <div className="main-about">
            <div className="container">
              <div className="row">
                <div class="section_heading border1">
                  <span>Welcome to Western Regional Power Committee </span>
                  <h2>About Us</h2>
                </div>
              </div>
            </div>
            <div className="city_about_wrap_inner" id="demos">
              <div className="container">
                <Slider {...sliderSettings}>
                  {allData.map((item) => (
                    <Slide
                      key={item.id}
                      id={item.id}
                      imgPath={item.imgpath}
                      content={item.u_content}
                      description={item.u_description}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="city_about_wrap" id="demos">
            <div className="container">
              <Slider {...sliderSettings}>
                {allData.map((item) => (
                  <Slide
                    key={item.id}
                    id={item.id}
                    imgPath={item.imgpath}
                    content={item.u_content}
                    description={item.u_description}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Aboutus;
