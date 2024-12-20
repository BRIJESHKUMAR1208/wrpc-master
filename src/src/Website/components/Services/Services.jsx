import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getLinks,
  getTender,
  getReport,
  getwhatsnew,
  getMenuoptins, BASE_URL
} from "../../../Api/ApiFunctions"; // Import Bootstrap JS
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArchiveComponent from "./ArchiveComponent";
import axios from "axios";

export const Services = () => {
  const [linkData, setLinkData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [tenderData, setTenderData] = useState([]);
  const [whatsnewData, setWhatsNewData] = useState([]);

  const [archivedLinkData, setArchivedLinkData] = useState([]);
  const [archivedReportData, setArchivedReportData] = useState([]);
  const [archivedTenderData, setArchivedTenderData] = useState([]);
  const [archivedWhatsNewData, setArchivedWhatsNewData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState("1");
  const [showArchive, setShowArchive] = useState(false);

  // Function to toggle the display of archive data
  const toggleArchiveDisplay = () => {
    setShowArchive(!showArchive);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function fetchData() {
      const username = 'admin';
      const password = 'admin123';
      const encodedCredentials = btoa(`${username}:${password}`);
     
      try {
        const linkData = await getLinks();
        //const linkData = await fetch('http://localhost:5141/api/whatsnew_post', requestOptions);
       
   
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

  // console.log("archive", archivedWhatsNewData);

  return (
    <>
      {parseInt(selectedLanguage) === 1 ? (
        <div>
          <div>
            <section class="news-section">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
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
                              label="Reports"
                              value="1"
                              className="custom-tab"
                            />
                            <Tab
                              label="Links"
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
                        <TabPanel value="1">
                          {/* Content for Reports tab */}

                          <div
                            className="marquee-container1 marquee1"
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
                                      <p class="news-p">
                                        {parseInt(item.u_contenttype) === 2 && (
                                          <Link
                                            to={BASE_URL+ `/${item.u_file}`}
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
                        <TabPanel value="2">
                          <div
                            className="marquee-container1 marquee1"
                            id="marqueeReports"
                          >
                            <ul className="marquee-list report-sec">
                              {linkData.map((item) => (
                                <li key={item.u_id}>
                                  <div className="newsbox">
                                    <div className="latest-news-date">
                                      <p className="news-sec-datep">
                                        {item.u_startdate}{" "}
                                      </p>
                                    </div>
                                    <div className="ml-10">
                                      <p class="news-p">
                                        {parseInt(item.u_contenttype) === 2 && (
                                          <Link
                                            to={BASE_URL+ item.u_file}
                                            target="_blank"
                                          >
                                            {item.u_news_tittle}
                                          </Link>
                                        )}
                                        {parseInt(item.u_contenttype) === 3 && (
                                          <Link
                                            to={item.u_internal_link}
                                            style={{ textDecoration: "none" }}
                                          >
                                            {item.u_news_tittle}
                                          </Link>
                                        )}
                                        {parseInt(item.u_contenttype) === 4 && (
                                          <a
                                            href={item.u_external_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {item.u_news_tittle}
                                          </a>
                                        )}
                                        {parseInt(item.u_contenttype) === 1 && (
                                          <Link to={`/menu/${item.u_menu_url}`}>
                                            {item.u_link_tittle}
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
                        <TabPanel value="3">
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
                                      <p class="news-p">
                                        {parseInt(item.u_contenttype) === 2 && (
                                          <Link
                                            to={BASE_URL+item.u_file}
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
                                          <Link to={`/menu/${item.u_menu_url}`}>
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
                  <div class="col-md-4">
                    <div class="news-box-rgt">
                      <div class="news-box meeting">
                        <h4>Latest News</h4>
                        <div class="news-list marquee-container marquee">
                          <ul class="marquee-list">
                            {/* {console.log(whatsnewData)} */}
                            {whatsnewData.map((item) => (
                              // Checki both content type and language type

                              <li key={item.u_id}>
                                <div class="newsbox">
                                  <div class="latest-news-date">
                                    <p class="news-sec-datep">
                                      {item.u_startdate}
                                    </p>
                                  </div>
                                  <div class="ml-10">
                                    <p class="news-p">
                                    {parseInt(item.u_contenttype) === 2 && (
                                          <a
                                            href={BASE_URL+ `/${item.u_file}`}
                                            target="_blank"
                                          >
                                            {item.u_news_tittle}
                                          </a>
                                        )}
                                      {parseInt(item.u_contenttype) === 3 && (
                                        <Link
                                          to={item.u_internale_file}
                                          style={{ textDecoration: "none" }}
                                        >
                                          {item.u_news_tittle}
                                        </Link>
                                      )}
                                      {parseInt(item.u_contenttype) === 4 && (
                                        <a
                                          href={item.u_external_file}
                                          target="_blank"

                                        >
                                          {item.u_news_tittle}
                                        </a>
                                      )}
                                      {parseInt(item.u_contenttype) === 1 && (
                                        <Link to={`/menu/${item.u_menu_url}`}>
                                          {item.u_news_tittle}
                                        </Link>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <section class="news-section">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
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
                              label="रिपोर्टों"
                              value="1"
                              className="custom-tab"
                            />
                            <Tab
                              label="लिंक"
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
                        <TabPanel value="1">
                          <div
                            className="marquee-container1 marquee1"
                            id="marqueeReports"
                          >
                            <ul className="marquee-list report-sec">
                              {reportData.map((item, index) =>
                                parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                  <li key={index}>
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
                                              to={BASE_URL+item.u_file}
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
                        <TabPanel value="2">
                          {/* Content for Links tab */}
                          <div
                            className="marquee-container1 marquee1"
                            id="marqueeReports"
                          >
                            <ul className="marquee-list report-sec">
                              {linkData.map((item, index) =>
                                parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                  <li key={index}>
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
                                              to={BASE_URL+item.u_file}
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
                        <TabPanel value="3">
                          {/* Content for Tenders tab */}
                          <div
                            className="marquee-container1 marquee1"
                            id="marqueeReports"
                          >
                            <ul className="marquee-list report-sec">
                              {tenderData.map((item, index) =>
                                parseInt(item.u_languagetype) ===
                                parseInt(selectedLanguage) ? (
                                  <li key={index}>
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
                                              to={BASE_URL+ item.u_file}
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

                  <div class="col-md-4">
                    <div class="news-box-rgt">
                      <div class="news-box meeting">
                        <h4>ताजा खबर</h4>
                        <div class="news-list marquee-container marquee">
                          <ul class="marquee-list">
                            {whatsnewData.map((item, index) =>
                              // Check both content type and language type
                              parseInt(item.u_languagetype) ===
                              parseInt(selectedLanguage) ? (
                                <li key={index}>
                                  <div class="newsbox">
                                    <div class="latest-news-date">
                                      <p class="news-sec-datep">{item.day}</p>
                                      <p class="news-sec-monthp">
                                        {item.month}
                                      </p>
                                      <p class="news-sec-yearp">{item.year}</p>
                                    </div>
                                    <div class="ml-10">
                                      <p class="news-p">
                                        {parseInt(item.u_contenttype) === 2 && (
                                          <a
                                            href={BASE_URL+ `/${item.u_file}`}
                                            target="_blank"
                                          >
                                            {item.u_news_tittle}
                                          </a>
                                        )}
                                        {parseInt(item.u_contenttype) === 3 && (
                                          <Link to={item.u_internal_link}>
                                            {item.u_news_tittle}
                                          </Link>
                                        )}
                                        {parseInt(item.u_contenttype) === 4 && (
                                          <a
                                            href={item.u_external_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {item.u_news_tittle}
                                          </a>
                                        )}
                                        {parseInt(item.u_contenttype) === 1 && (
                                         
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
