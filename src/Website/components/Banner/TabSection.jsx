import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BASE_URL } from "../../../Api/ApiFunctions";
import "./TabSection.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SCROLL_SPEED = 1.5; // Adjust marquee scroll speed as needed

const TabSection = ({
  value,
  handleChange,
  reportData,
  linkData,
  tenderData,
  isPaused,
  setIsPaused,
  selectedLanguage,
}) => {
  const animationFrameId = useRef(null);

  // Separate refs for each tab's scrolling container (for vertical marquee)
  const marqueeRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  // Scroll marquee animation using requestAnimationFrame
  useEffect(() => {
    const step = () => {
      if (!isPaused && marqueeRefs[value].current) {
        const el = marqueeRefs[value].current;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;
        let currentScrollTop = el.scrollTop;
        let newScrollTop = currentScrollTop + SCROLL_SPEED;

        if (newScrollTop >= scrollHeight - clientHeight) {
          newScrollTop = 0; // loop scroll to top
        }
        el.scrollTop = newScrollTop;
      }
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isPaused, value]);

  // Render individual list items based on type and language
  const renderListItem = (item, type) => {
    let title = "";
    let startDate = "";
    let contentType = 1;
    let keys = {};

    switch (type) {
      case "report":
        title = item.u_report_tittle || item.u_news_tittle || "";
        startDate = item.u_startdate;
        contentType = parseInt(item.u_contenttype);
        keys = {
          id: item.u_id,
          pdfPath: item.filepdfpath,
          internalLink: item.u_internal_link,
          externalLink: item.u_external_link,
          menuURL: item.u_menu_url,
        };
        break;
      case "link":
        title = item.u_menu_name || item.u_news_tittle || "";
        startDate = item.u_startdate || item.createddate;
        contentType = parseInt(item.u_content_type || item.u_contenttype);
        keys = {
          id: item.u_id,
          file: item.u_file,
          internalLink: item.u_internal_link,
          externalLink: item.u_external_link,
          menuURL: item.u_menu_url,
        };
        break;
      case "tender":
        title = item.u_tender_tittle || item.u_tender_tittl || item.u_news_tittle || "";
        startDate = item.u_startdate;
        contentType = parseInt(item.u_contenttype);
        keys = {
          id: item.u_id,
          pdfPath: item.filepdfpath,
          internalFile: item.u_internale_file,
          externalFile: item.u_external_file,
          menuURL: item.u_menu_url,
        };
        break;
      default:
        break;
    }

    // Language filter — show only items matching selectedLanguage
    if (item.u_languagetype && parseInt(item.u_languagetype) !== parseInt(selectedLanguage)) {
      return null;
    }

    const renderLink = () => {
      switch (contentType) {
        case 2:
          return (
            <Link
              to={BASE_URL + (keys.pdfPath || keys.file || "")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download: ${title}`}
            >
              {title}
            </Link>
          );
        case 3:
          return (
            <Link
              to={keys.internalLink || keys.internalFile || "#"}
              style={{ textDecoration: "none" }}
              aria-label={`View: ${title}`}
            >
              {title}
            </Link>
          );
        case 4:
          return (
            <a
              href={keys.externalLink || keys.externalFile || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit External Link: ${title}`}
            >
              {title}
            </a>
          );
        case 1:
        default:
          return (
            <Link to={`/menu/${keys.menuURL || ""}`} aria-label={`View Menu: ${title}`}>
              {title}
            </Link>
          );
      }
    };

    return (
      <li key={keys.id || title} className="newsbox" style={{ padding: "5px 0" }}>
        <div className="latest-news-date" style={{ marginBottom: "3px" }}>
          <p className="news-sec-datep">{startDate}</p>
        </div>
        <div className="ml-10">
          <p className="news-p">{renderLink()}</p>
        </div>
      </li>
    );
  };

  // Render filtered list items for each tab based on current tab value
  const renderListByTab = () => {
    switch (value) {
      case "1": // समाचार / News
        return reportData
          .filter((item) => !item.u_languagetype || parseInt(item.u_languagetype) === parseInt(selectedLanguage))
          .map((item) => renderListItem(item, "report"));
      case "2": // नवीनतम अपलोड / Latest Uploads
        return linkData
          .filter((item) => !item.u_languagetype || parseInt(item.u_languagetype) === parseInt(selectedLanguage))
          .map((item) => renderListItem(item, "link"));
      case "3": // निविदाओं / Tenders
        return tenderData
          .filter((item) => !item.u_languagetype || parseInt(item.u_languagetype) === parseInt(selectedLanguage))
          .map((item) => renderListItem(item, "tender"));
      default:
        return null;
    }
  };

  // Define tab labels dynamically based on selected language
  const tabLabels =
    selectedLanguage === 1
      ? { news: "News", uploads: "Latest Uploads", tenders: "Tenders", play: "▶️", pause: "⏸️" }
      : { news: "समाचार", uploads: "नवीनतम अपलोड", tenders: "निविदाओं", play: "▶️", pause: "⏸️" };

  return (
    <Box className="main-box1" sx={{ width: "100%", typography: "body1" }} bgcolor={"#00000"}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Tabs for News, Latest Uploads, and Tenders">
            <Tab label={tabLabels.news} value="1" className="custom-tab" />
            <Tab label={tabLabels.uploads} value="2" className="custom-tab" />
            <Tab label={tabLabels.tenders} value="3" className="custom-tab" />
            <div className="d-flex justify-content-end">
               <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip id="tooltip-national-emblem">Click to Play/Pause</Tooltip>}
                            >
              <button onClick={() => setIsPaused((prev) => !prev)} className="btn-sm btn-primary me-2">
                {isPaused ? tabLabels.play : tabLabels.pause}
              </button>
              </OverlayTrigger>
            </div>
          </TabList>
        </Box>

        <TabPanel value="1" className="bg-light">
          <div
            className="marquee-container1 marquee1 vertical-marquee"
            aria-live="polite"
            ref={marqueeRefs[1]}
            tabIndex={0}
            style={{ willChange: "scroll-position", maxHeight: "500px", overflowY: "auto" }}
          >
            <ul className={`marquee-list report-sec ${isPaused ? "paused" : ""}`}>{renderListByTab()}</ul>
          </div>
        </TabPanel>

        <TabPanel value="2" className="bg-light">
          <div
            className="marquee-container1 marquee1 vertical-marquee"
            aria-live="polite"
            ref={marqueeRefs[2]}
            tabIndex={0}
            style={{ willChange: "scroll-position", maxHeight: "500px", overflowY: "auto" }}
          >
            <ul className={`marquee-list report-sec ${isPaused ? "paused" : ""}`}>{renderListByTab()}</ul>
          </div>
        </TabPanel>

        <TabPanel value="3" className="bg-light">
          <div
            className="marquee-container1 marquee1 vertical-marquee"
            aria-live="polite"
            ref={marqueeRefs[3]}
            tabIndex={0}
            style={{ willChange: "scroll-position", maxHeight: "500px", overflowY: "auto" }}
          >
            <ul className={`marquee-list report-sec ${isPaused ? "paused" : ""}`}>{renderListByTab()}</ul>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabSection;
