import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TopHeader } from "../TopHeader/TopHeader";
import { CmsFooter } from "../Footer/CmsFooter";
import CmsDisplay from "../../components/Header/CmsDisplay";
import {
  getLinks,
  getTender,
  getReport,
  getwhatsnew,
  BASE_URL,
} from "../../../Api/ApiFunctions";

const LatestNews = () => {
  const [whatsnewData, setWhatsNewData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [linkData, setLinkData] = useState([]);
  const [tenderData, setTenderData] = useState([]);
  const [fileInfo, setFileInfo] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const navigate = useNavigate();

  // --- Helper: get file size and format for local files ---
  const getFileInfo = async (url) => {
    try {
      const headResp = await fetch(url, { method: "HEAD" });
      let sizeInBytes;

      if (headResp.ok && headResp.headers.get("Content-Length")) {
        sizeInBytes = parseInt(headResp.headers.get("Content-Length"));
      } else {
        const blob = await fetch(url).then((r) => r.blob());
        sizeInBytes = blob.size;
      }

      let sizeStr = sizeInBytes >= 1024 * 1024
        ? `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`
        : `${(sizeInBytes / 1024).toFixed(2)} KB`;

      const cleanUrl = url.split("?")[0];
      const parts = cleanUrl.split(".");
      const ext = parts.length > 1 ? parts.pop().toUpperCase() : "UNKNOWN";

      const extensionMap = {
        PDF: "PDF",
        DOC: "Word Document",
        DOCX: "Word Document",
        XLS: "Excel Spreadsheet",
        XLSX: "Excel Spreadsheet",
        PPT: "PowerPoint Presentation",
        PPTX: "PowerPoint Presentation",
        JPG: "Image",
        JPEG: "Image",
        PNG: "Image",
        GIF: "Image",
        TXT: "Text File",
        CSV: "CSV File",
        ZIP: "ZIP Archive",
        RAR: "RAR Archive",
        UNKNOWN: "Unknown File",
      };

      return { size: sizeStr, format: extensionMap[ext] || ext };
    } catch (error) {
      console.error("File not found:", url, error);
      return null;
    }
  };

  // --- Fetch data and progressive file info ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [links, reports, tenders, whatsnews] = await Promise.all([
          getLinks(),
          getReport(),
          getTender(),
          getwhatsnew(),
        ]);

        setLinkData(links);
        setReportData(reports);
        setTenderData(tenders);
        setWhatsNewData(whatsnews);

        // Progressive file info for local reports
        reports.filter(i => parseInt(i.u_contenttype) === 2 && i.filepdfpath && !i.filepdfpath.startsWith("http"))
          .forEach(async (i) => {
            const info = await getFileInfo(BASE_URL + `/${i.filepdfpath}`);
            if (info) setFileInfo(prev => ({ ...prev, [i.u_id]: info }));
          });

        // Progressive file info for local whatsnew
        whatsnews.filter(i => parseInt(i.u_contenttype) === 2 && i.u_file && !i.u_file.startsWith("http"))
          .forEach(async (i) => {
            const info = await getFileInfo(BASE_URL + `/${i.u_file}`);
            if (info) setFileInfo(prev => ({ ...prev, [i.u_id]: info }));
          });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const lang = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(lang || 1);
  }, []);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    localStorage.setItem("selectedLanguage", newLang);

    setTimeout(() => {
      alert(`Language changed to : ${newLang == 1 ? "English" : "Hindi"}`);
      window.location.reload();
      navigate("/");
    }, 500);
  };

  // --- Render link with size/format for local, or note for external ---
  const renderFileLink = (filePath, title, id) => {
    if (!filePath) return title;

    const isExternal = filePath.startsWith("http");

    return (
      <a href={filePath.startsWith("http") ? filePath : BASE_URL + `/${filePath}`} target="_blank" rel="noopener noreferrer">
        {title}{" "}
        {isExternal ? (
          <span className="text-muted ms-2">(External file)</span>
        ) : fileInfo[id] ? (
          <span className="text-muted ms-2">({fileInfo[id].format}, {fileInfo[id].size})</span>
        ) : (
          <span className="text-muted ms-2">(Loading...)</span>
        )}
      </a>
    );
  };

  return (
    <div>
      <TopHeader selectedLanguage={selectedLanguage} handleLanguageChange={handleLanguageChange} />
        <div id="main-content" className="container main-sec">
      <CmsDisplay selectedLanguage={selectedLanguage} />

    
        {parseInt(selectedLanguage) === 1 ? (
          <section className="news-section-box">
            <h3 className="m-4 text-center">Latest News</h3>
            <ul>
              {reportData.map((item) => (
                <li key={item.u_id} className="border-bottom border-success p-2 m-2">
                  <div className="newsbox">
                    <div className="latest-news-date">
                      <p className="news-sec-datep">{item.u_startdate}</p>
                    </div>
                    <div className="ml-10">
                      <p className="news-p">
                        {parseInt(item.u_contenttype) === 2
                          ? renderFileLink(item.filepdfpath, item.u_report_tittle, item.u_id)
                          : parseInt(item.u_contenttype) === 3 ? (
                              <Link to={item.u_internale_file}>{item.u_report_tittle}</Link>
                            ) : parseInt(item.u_contenttype) === 4 ? (
                              renderFileLink(item.u_external_file, item.u_report_tittle, item.u_id)
                            ) : parseInt(item.u_contenttype) === 1 ? (
                              <Link to={`/menu/${item.u_menu_url}`}>{item.u_report_tittle}</Link>
                            ) : (
                              item.u_report_tittle
                            )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="news-section-box">
            <h4 className="text-center m-4">ताजा खबर</h4>
            <div className="news-list marquee-container marquee h-100">
              <ul>
                {whatsnewData.map(
                  (item, index) =>
                    parseInt(item.u_languagetype) === parseInt(selectedLanguage) && (
                      <li key={index} className="border-bottom border-success p-2 m-2">
                        <div className="newsbox">
                          <div className="latest-news-date">
                            <p className="news-sec-datep">{item.day}</p>
                            <p className="news-sec-monthp">{item.month}</p>
                            <p className="news-sec-yearp">{item.year}</p>
                          </div>
                          <div className="ml-10">
                            <p className="news-p">
                              {parseInt(item.u_contenttype) === 2
                                ? renderFileLink(item.u_file, item.u_news_tittle, item.u_id)
                                : parseInt(item.u_contenttype) === 3 ? (
                                    <Link to={item.u_internal_link}>{item.u_news_tittle}</Link>
                                  ) : parseInt(item.u_contenttype) === 4 ? (
                                    renderFileLink(item.u_external_link, item.u_news_tittle, item.u_id)
                                  ) : parseInt(item.u_contenttype) === 1 ? (
                                    <Link to={`/menu/${item.u_menu_url}`}>{item.u_news_tittle}</Link>
                                  ) : (
                                    item.u_news_tittle
                                  )}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>
          </section>
        )}
     
      <CmsFooter />
       </div>
    </div>
  );
};

export default LatestNews;
