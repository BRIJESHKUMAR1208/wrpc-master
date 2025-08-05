import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  BASE_URL,
  getLatestuploads,
  getReport,
  getTender,
  getwhatsnew,
  getBannerImg,
  Getlivestreaming,
} from "../../../Api/ApiFunctions";
import TabSection from "./TabSection";

import "./../../../assets/css/letestnews.css";

const Banner = () => {
  const [menudata, setMenuData] = useState([]);
  const [streamingdata, setstreaming] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  const [linkData, setLinkData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [tenderData, setTenderData] = useState([]);
  const [whatsnewData, setWhatsNewData] = useState([]);

  const [value, setValue] = useState("1"); // For tabs
  const [isPaused, setIsPaused] = useState(false); // For marquee pause/play
  const [isPlaying, setIsPlaying] = useState(true); // For live streaming marquee

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          linkDataRes,
          reportDataRes,
          tenderDataRes,
          whatsnewDataRes,
          menuImages,
          liveStreaming,
        ] = await Promise.all([
          getLatestuploads(),
          getReport(),
          getTender(),
          getwhatsnew(),
          getBannerImg(),
          Getlivestreaming(),
        ]);

        setLinkData(linkDataRes);
        setReportData(reportDataRes);
        setTenderData(tenderDataRes);
        setWhatsNewData(whatsnewDataRes);
        setMenuData(menuImages);
        setstreaming(liveStreaming);
      } catch (err) {
        console.error("Error fetching banner data:", err);
      }
    }

    fetchData();

    const lang = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(lang ? parseInt(lang) : 1);
  }, []);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    arrows: true,
  };

  return (
    <>
      <section
        className="city_main_banner"
        aria-labelledby="main-banner-slider"
      >
        <div className="main-banner-slider" id="main-banner-slider">
          <h2 id="main-banner-slider-title">Slider</h2>
          <div className="row">
            <div
              className="col-md-8"
              role="region"
              aria-live="polite"
              aria-labelledby="main-banner-slider-title"
            >
              <Slider {...sliderSettings}>
                {menudata.map((item, index) => (
                  <div key={item.u_id || item.imgpath || index}>
                    <figure className="overlay">
                      <div
                        className="video-container"
                        style={{ minHeight: "500px" }}
                      >
                        <img
                          src={BASE_URL + item.imgpath}
                          alt={item.title || `Banner image ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                    </figure>
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-md-4">
              <TabSection
                value={value}
                handleChange={handleChange}
                reportData={reportData}
                linkData={linkData}
                tenderData={tenderData}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                selectedLanguage={selectedLanguage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="notice-section" aria-label="Live Streaming Notices">
        <div className="container">
          <div className="row pt-2">
            <div className="col-md-2">
              <div className="notice-lft">
                <p>अद्यतन समाचार</p>
                <div className="marquee-controls mt-2">
                  <button
                    onClick={togglePlay}
                    className="btn btn-sm btn-outline-primary"
                  >
                    {isPlaying ? "⏸️Pause" : "▶️Play"}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className="notice-rgt">
                <div className="marquee-wrapper">
                  <div className={`marquee ${isPlaying ? "running" : "paused"}`}>
                    <span>
                      <p>
                        <i className="fa-solid fa-bullhorn"></i> &nbsp; सौभाग्य के
                        तहत घरेलू विद्युतीकरण पर सभी प्रश्नों और शिकायतों के लिए
                        टोल-फ्री हेल्पलाइन नंबर 1800-121-5555 डायल करें।
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
