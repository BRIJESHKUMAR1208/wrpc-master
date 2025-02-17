import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import { BASE_URL, getBannerImg } from "../../../Api/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import {
  getLinks,
  getTender,
  getReport,
  getwhatsnew,
  getMenuoptins, getLatestuploads, BASE_URL, getBannerImg, Getlivestreaming
} from "../../../Api/ApiFunctions"; // Import Bootstrap JS
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const Banner = () => {
  const [menudata, setMenuData] = useState([]);
  const [streamingdata, setstreaming] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState("1");
  const [showArchive, setShowArchive] = useState(false);
  const [linkData, setLinkData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [tenderData, setTenderData] = useState([]);
  const [whatsnewData, setWhatsNewData] = useState([]);
  const [archivedLinkData, setArchivedLinkData] = useState([]);
  const [archivedReportData, setArchivedReportData] = useState([]);
  const [archivedTenderData, setArchivedTenderData] = useState([]);
  const [archivedWhatsNewData, setArchivedWhatsNewData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    async function fetchData() {
      const username = 'admin';
      const password = 'admin123';
      const encodedCredentials = btoa(`${username}:${password}`);

      try {
        // const linkData = await getLinks();lastestuploads
        //const linkData = await fetch('http://localhost:5141/api/whatsnew_post', requestOptions);

        const linkData = await getLatestuploads();
        const reportData = await getReport();
        const tenderData = await getTender();
        const whatsnewData = await getwhatsnew();

        const currentDate = new Date();

        // Filter and archive link data
        const filteredLinkData = linkData.filter(
          (item) => new Date(item.endDate) >= currentDate
        );
        const archivedLinkData = linkData.filter(
          (item) => new Date(item.endDate) < currentDate
        );

        // Filter and archive report data
        const filteredReportData = reportData.filter(
          (item) => new Date(item.endDate) >= currentDate
        );
        const archivedReportData = reportData.filter(
          (item) => new Date(item.endDate) < currentDate
        );

        // Filter and archive tender data
        const filteredTenderData = tenderData.filter(
          (item) => new Date(item.endDate) >= currentDate
        );
        const archivedTenderData = tenderData.filter(
          (item) => new Date(item.endDate) < currentDate
        );

        // Filter and archive what's new data
        const filteredWhatsNewData = whatsnewData.filter(
          (item) => new Date(item.u_end_date) >= currentDate
        );
        const archivedWhatsNewData = whatsnewData.filter(
          (item) => new Date(item.u_end_date) < currentDate
        );

        // Set filtered data and archive archived data
        setLinkData(linkData);
        setReportData(reportData);
        setTenderData(tenderData);
        setWhatsNewData(whatsnewData);

        // Set archived data
        setArchivedLinkData(archivedLinkData);
        setArchivedReportData(archivedReportData);
        setArchivedTenderData(archivedTenderData);
        setArchivedWhatsNewData(archivedWhatsNewData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);


  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getBannerImg();
        const Getstreamingdata = await Getlivestreaming();
        setstreaming(Getstreamingdata);
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    fetchMenuData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <div>
      {parseInt(selectedLanguage) === 1 ? (
        <>
          <section className="city_main_banner" >

            <div className="main-banner-slider">
              <h2>slider </h2>

              <div className="row" >
                <div className="col-md-8">
                  <Slider {...settings}>
                    {menudata.map((item, index) => (
                      <div key={`${item.u_id || item.imgpath}-${index}`}>
                        <figure className="overlay">
                          <div className="video-container" style={{ minHeight: "500px" }}>
                            <img
                              src={BASE_URL + item.imgpath}
                              alt={`Banner ${index + 1}`}
                            />
                          </div>

                        </figure>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="col-md-4" >
                  <Box
                    className="main-box1 "
                    sx={{ width: "100%", typography: "body1" }}
                    bgcolor={'#00000'}
                  >
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            label="News"
                            value="1"
                            className="custom-tab"
                          />
                          <Tab
                            label="Latest Uploads"
                            value="2"
                            className="custom-tab"
                          />
                          <Tab
                            label="Tenders"
                            value="3"
                            className="custom-tab"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" className="bg-light">
                        {/* Content for Reports tab */}

                        <div
                          className="marquee-container1 marquee1 "
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {reportData.map((item) => (
                              <li key={item.u_id}>
                                <div className="newsbox">
                                  <div className="latest-news-date">
                                    <p className="news-sec-datep">
                                      {item.u_startdate}{" "}
                                    </p>
                                  </div>
                                  <div className="ml-10">
                                    <p className="news-p">
                                      {parseInt(item.u_contenttype) === 2 && (
                                        <Link
                                          to={BASE_URL + `/${item.filepdfpath}`}
                                          target="_blank"
                                        >
                                          {item.u_report_tittle}
                                        </Link>
                                      )}
                                      {parseInt(item.u_contenttype) === 3 && (
                                        <Link
                                          to={item.u_internal_link}
                                          style={{ textDecoration: "none" }}
                                        >
                                          {item.u_report_tittle}
                                        </Link>
                                      )}
                                      {parseInt(item.u_contenttype) === 4 && (
                                        <a
                                          href={item.u_external_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.u_report_tittle}
                                        </a>
                                      )}
                                      {parseInt(item.u_contenttype) === 1 && (
                                        // <Link to={`/menu/${item.u_menu_url}`}>
                                        //   {item.u_report_tittle}
                                        // </Link>
                                        <Link to={`/menu/${item.u_menu_url}`}>
                                          {item.u_report_tittle}
                                        </Link>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabPanel>
                      <TabPanel value="2" className="bg-light">
                        <div
                          className="marquee-container1 marquee1"
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {linkData.map((item, subMenuItem) => (
                              <li key={item.u_id}>
                                <div className="newsbox">
                                  <div className="latest-news-date">
                                    <p className="news-sec-datep">
                                      {item.createddate}{" "}
                                    </p>
                                  </div>
                                  <div className="ml-10">
                                    <p className="news-p">
                                      {parseInt(item.u_content_type) === 2 && (
                                        <Link
                                          to={BASE_URL + item.u_file}
                                          target="_blank"
                                        >
                                          {item.u_menu_name}
                                        </Link>
                                      )}
                                      {parseInt(item.u_content_type) === 3 && (
                                        <Link
                                          to={item.u_internal_link}
                                          style={{ textDecoration: "none" }}
                                        >
                                          {item.u_menu_name}
                                        </Link>
                                      )}
                                      {parseInt(item.u_content_type) === 4 && (
                                        <a
                                          href={item.u_external_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.u_menu_name}

                                        </a>
                                      )}
                                      {parseInt(item.u_content_type) === 1 && (
                                        // <Link to={`/menu/${item.u_menu_url}`}>
                                        //   {item.u_link_tittle}
                                        // </Link>
                                        <Link
                                          to={"/menu/" + item.u_menu_url}
                                          className="dropdown-item"
                                        >
                                          {item.u_menu_name}
                                        </Link>
                                        //   <Link to={`#`}>
                                        //   {item.u_menu_name}
                                        // </Link>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>

                        </div>
                      </TabPanel>
                      <TabPanel value="3" className="bg-light">
                        <div
                          className="marquee-container1 marquee1"
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {tenderData.map((item) => (
                              <li key={item.u_id}>
                                <div className="newsbox">
                                  <div className="latest-news-date">
                                    <p className="news-sec-datep">
                                      {item.u_startdate}{" "}
                                    </p>
                                  </div>
                                  <div className="ml-10">
                                    <p className="news-p">
                                      {parseInt(item.u_contenttype) === 2 && (
                                        <Link
                                          to={BASE_URL + item.filepdfpath}
                                          target="_blank"
                                        >
                                          {item.u_tender_tittle}
                                        </Link>
                                      )}
                                      {parseInt(item.u_contenttype) === 3 && (
                                        <Link
                                          to={item.u_internale_file}
                                          style={{ textDecoration: "none" }}
                                        >
                                          {item.u_tender_tittle}
                                        </Link>
                                      )}
                                      {parseInt(item.u_contenttype) === 4 && (
                                        <a
                                          href={item.u_external_file}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.u_tender_tittle}
                                        </a>
                                      )}
                                      {parseInt(item.u_contenttype) === 1 && (
                                        // <Link to={`/menu/${item.u_menu_url}`}>
                                        //   {item.u_tender_tittle}
                                        // </Link>
                                        <Link to={`#`}>
                                          {item.u_tender_tittle}
                                        </Link>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </div>

          </section>
          <section className="notice-section">
            <div className="container">
              <div className="row pt-2">
                <div className="col-md-2">
                  <div className="notice-lft">
                    <p>Live Streaming</p>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="notice-rgt">
                    <div className="marquee-container2">
                      <div className="marquee2">
                        <div className="dial">
                          <div className="d1">
                            {streamingdata.map((data) => (

                              <div key={data.id} className="marquee-item">
                                <marquee direction="right" behavior="alternate">
                                  <p className="marquee-text">
                                    <i className="fa-solid fa-bullhorn"></i> &nbsp; {data.titlename}
                                  </p>
                                </marquee>
                              </div>
                            ))}
                          </div>
                          {/* <div class="d2">
                            <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp; Dial
                              '1912' for Electricity Complaints across India and
                              for more Information download 'URJA' App
                            </p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="city_main_banner">

            <div className="main-banner-slider">
              <h2>slider </h2>
              <div className="row">
                <div className="col-md-8">
                  <Slider {...settings}>
                    {menudata.map((item, index) => (
                      <div key={item.id ? `banner-${item.id}` : `banner-index-${index}`}>
                        <figure className="overlay">
                          <div className="video-container">
                            <img src={BASE_URL + item.imgpath} alt={`Banner ${index + 1}`} />
                          </div>
                          {/* <div className="banner_text">
                        <div className="small_text animated">
                          पश्चिम क्षेत्रीय विद्युत् समिति में{" "}
                        </div>
                        <div className="medium_text animated">
                          {" "}
                          आपका स्वागत है
                        </div>
                        <div className="large_text animated">
                          {item.u_content}
                        </div>
                        <div className="banner_btn row">
                      <div className="col-md-6">
                          <a className="theam_btn animated" href="#">
                            और पढ़ें
                          </a>
                          </div>
                          <div className="col-md-6">
                          <a className="theam_btn animated" href="#">
                            अन्वेषण करें
                          </a>
                          </div>
                        </div>
                      </div> */}
                        </figure>
                      </div>
                    ))}
                  </Slider>
                </div>
                <div class="col-md-4">
                  <Box
                    className="main-box1"
                    sx={{ width: "100%", typography: "body1" }}
                  >
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            label="समाचार"
                            value="1"
                            className="custom-tab"
                          />
                          <Tab
                            label="नवीनतम अपलोड"
                            value="2"
                            className="custom-tab"
                          />
                          <Tab
                            label="निविदाओं"
                            value="3"
                            className="custom-tab"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" className="bg-light">
                        <div
                          className="marquee-container1 marquee1"
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {reportData.map((item, index) =>
                              parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                <li key={item.id ? `report-${item.id}` : `report-index-${index}`}>
                                  <div className="newsbox">
                                    <div className="latest-news-date">
                                      <p className="news-sec-datep">
                                        {item.u_startdate}
                                      </p>
                                      {/* <p className="news-sec-monthp">{item.month}</p>
                  <p className="news-sec-yearp">{item.year}</p> */}
                                    </div>
                                    <div className="ml-10">
                                      <p className="news-p">
                                        {parseInt(item.u_contenttype) ===
                                          2 && (
                                            <Link
                                              to={BASE_URL + item.u_file}
                                              target="_blank"
                                            >
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          3 && (
                                            <Link to={item.u_internal_link}>
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          4 && (
                                            <a
                                              href={item.u_external_link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {item.u_news_tittle}
                                            </a>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          1 && (
                                            <Link
                                              to={`/menu/${item.u_menu_url}`}
                                            >
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      </TabPanel>
                      <TabPanel value="2" className="bg-light">
                        {/* Content for Links tab */}
                        <div
                          className="marquee-container1 marquee1"
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {linkData.map((item, index) =>
                              parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                <li key={item.id ? `news-${item.id}` : `news-index-${index}`}>
                                  <div className="newsbox">
                                    <div className="latest-news-date">
                                      <p className="news-sec-datep">
                                        {item.u_startdate}
                                      </p>
                                    </div>
                                    <div className="ml-10">
                                      <p className="news-p">
                                        {parseInt(item.u_contenttype) ===
                                          2 && (
                                            <Link
                                              to={BASE_URL + item.u_file}
                                              target="_blank"
                                            >
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          3 && (
                                            <Link to={item.u_internal_file}>
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          4 && (
                                            <a
                                              href={item.u_external_file}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {item.u_news_tittle}
                                            </a>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          1 && (
                                            <Link
                                              to={`/menu/${item.u_menu_url}`}
                                            >
                                              {item.u_news_tittle}
                                            </Link>
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      </TabPanel>
                      <TabPanel value="3" className="bg-light">
                        {/* Content for Tenders tab */}
                        <div
                          className="marquee-container1 marquee1"
                          id="marqueeReports"
                        >
                          <ul className="marquee-list report-sec">
                            {tenderData.map((item, index) =>
                              parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                <li key={item.id ? `tender-${item.id}` : `tender-index-${index}`}>
                                  <div className="newsbox">
                                    <div className="latest-news-date">
                                      <p className="news-sec-datep">
                                        {item.u_startdate}
                                      </p>
                                    </div>
                                    <div className="ml-10">
                                      <p className="news-p">
                                        {parseInt(item.u_contenttype) ===
                                          2 && (
                                            <Link
                                              to={BASE_URL + item.u_file}
                                              target="_blank"
                                            >
                                              {item.u_tender_tittl}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          3 && (
                                            <Link to={item.u_internal_file}>
                                              {item.u_tender_tittl}
                                            </Link>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          4 && (
                                            <a
                                              href={item.u_external_file}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              {item.u_tender_tittl}
                                            </a>
                                          )}
                                        {parseInt(item.u_contenttype) ===
                                          1 && (
                                            <Link
                                              to={`/menu/${item.u_menu_url}`}
                                            >
                                              {item.u_tender_tittl}
                                            </Link>
                                          )}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ) : null
                            )}
                          </ul>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              </div>
            </div>

          </section>
          <section className="notice-section">
            <div className="container">
              <div className="row pt-2">
                <div className="col-md-2">
                  <div className="notice-lft">
                    <p>अद्यतन समाचार</p>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="notice-rgt">
                    <div className="marquee-container2">
                      <div className="marquee2">
                        <div className="dial">
                          <div className="d1">
                            <p>
                              <i className="fa-solid fa-bullhorn"></i> &nbsp;
                              सौभाग्य के तहत घरेलू विद्युतीकरण पर सभी प्रश्नों
                              और शिकायतों के लिए टोल-फ्री हेल्पलाइन नंबर
                              1800-121-5555 डायल करें।
                            </p>
                          </div>
                          <div className="d2">
                            {/* <p>
                              <i class="fa-solid fa-bullhorn"></i> &nbsp; पूरे
                              भारत में बिजली की शिकायतों के लिए '1912' डायल करें
                              और अधिक जानकारी के लिए 'ऊर्जा' ऐप डाउनलोड करें
                            </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </>
      )}
    </div>
  );
};
