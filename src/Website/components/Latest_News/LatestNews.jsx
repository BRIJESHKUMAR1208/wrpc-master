import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TopHeader } from "../TopHeader/TopHeader";
import { CmsFooter } from "../Footer/CmsFooter";
import CmsDisplay from "../../components/Header/CmsDisplay";
import {
  getLinks,
  getTender,
  getReport,
  getwhatsnew,
  getMenuoptins,
  BASE_URL,
} from "../../../Api/ApiFunctions"; // Import Bootstrap JS
import { UTurnLeftSharp } from "@mui/icons-material";

const LatestNews = () => {
  const [whatsnewData, setWhatsNewData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState([]);
  const [tenderData, setTenderData] = useState([]);

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
      const username = "admin";
      const password = "admin123";
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

  // Define your 'languages' object here...

  useEffect(() => {
    // Get the selected language from localStorage on component mount
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;

    setSelectedLanguage(newSelectedLanguage);

    // Store the selected language in localStorage
    localStorage.setItem("selectedLanguage", newSelectedLanguage);

    // Reload the window after a brief delay to allow saving the selected language
    setTimeout(() => {
      // alert(`Language changed to ${newSelectedLanguage}`);
      if (newSelectedLanguage == 1) {
        alert("Language changed to :English");
      } else if (newSelectedLanguage == 2) {
        alert("Language changed to :Hindi");
      } else {
      }

      window.location.reload();

      navigate("/");
    }, 500);
  };

  return (
    <div>
        <TopHeader  selectedLanguage={selectedLanguage}
                        handleLanguageChange={handleLanguageChange} />
        <CmsDisplay selectedLanguage={selectedLanguage}/>
      <div>
        {parseInt(selectedLanguage)===1 ? (
            <section>
          <div>
            <div>
              <div>
                <h4 className="m-4 text-center">Latest News</h4>
                <div class="news-list marquee-container marquee h-100">
                  <ul>
                    {/* {console.log(whatsnewData)} */}
                    {whatsnewData.map((item) => (
                      // Checki both content type and language type

                      <li key={item.u_id} className="border-bottom border-success p-2 m-2">
                        <div class="newsbox">
                          <div class="latest-news-date">
                            <p class="news-sec-datep">{item.u_startdate}</p>
                          </div>
                          <div class="ml-10">
                            <p class="news-p">
                              {parseInt(item.u_contenttype) === 2 && (
                                <a
                                  href={BASE_URL + `/${item.u_file}`}
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
                                <a href={item.u_external_file} target="_blank">
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
          </section>
        ) : (
            <section>
          <div>
            <div>
              <h4 className="text-center m-4">ताजा खबर</h4>
              <div class="news-list marquee-container marquee h-100">
                <ul>
                  {whatsnewData.map((item, index) =>
                    // Check both content type and language type
                    parseInt(item.u_languagetype) ===
                    parseInt(selectedLanguage) ? (
                      <li key={index} className="border-bottom border-success p-2 m-2">
                        <div class="newsbox">
                          <div class="latest-news-date">
                            <p class="news-sec-datep">{item.day}</p>
                            <p class="news-sec-monthp">{item.month}</p>
                            <p class="news-sec-yearp">{item.year}</p>
                          </div>
                          <div class="ml-10">
                            <p class="news-p">
                              {parseInt(item.u_contenttype) === 2 && (
                                <a
                                  href={BASE_URL + `/${item.u_file}`}
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
                                <Link to={`/menu/${item.u_menu_url}`}>
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
          </section>
        )}
      </div>
      <CmsFooter />
    </div>
  );
};

export default LatestNews;
