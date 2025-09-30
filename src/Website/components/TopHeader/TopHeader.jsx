import React, { useState, useEffect } from "react";
import { useFontSize } from "../../../util/FontSizeContext";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/emblem-dark.png";
import G20 from "../../../assets/images/swach-bharat.png";
import { useNavigate } from 'react-router-dom';
import swatchBarath from "../../../assets/images/G20-logo.png";
import footerLogo from "../../../assets/images/top-logo.png"
import './TopHeader.scss'
import './UserOptionsDropdown.css';
import { useDarkMode } from "../../../util/DarkModeContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export const TopHeader = ({ selectedLanguage, handleLanguageChange }) => {
  const {theme, toggleTheme} = useDarkMode();
  const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontSize();
  const [selectedLanguageA, setSelectedLanguageA] = useState(1);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const storedUserString = localStorage.getItem("user");
  const storedUserString1 = localStorage.getItem("user1");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isReading, setIsReading] = useState(false);
  let cand_name = '';

  if (storedUserString1) {
    const user1 = JSON.parse(storedUserString1);
    cand_name = user1?.cand_name || '';  // Safely access cand_name or set it to an empty string if not found
  }

  const startReading = () => {
    const content = document.querySelector("body").innerText;
    const utterance = new SpeechSynthesisUtterance(content);
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const handleChangePassword = () => {
    navigate('/candchangepassword');
  };

  useEffect(() => {
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguageA(newSelectedLanguage || 1);
  }, []);

  const languages = {
    1: "English",
    2: "हिंदी",
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === '1') {
      navigate('/login');
    } else if (selectedValue === '2') {
      navigate('/candidate/login');
    }
  };

  const handleSelectCandidate = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === '1') {
      const currentLanguage = selectedLanguageA;
      const languageType = localStorage.getItem("languagetype");
      localStorage.clear();
      if (languageType) {
        localStorage.setItem("languagetype", languageType);
      }
      setSelectedLanguageA(currentLanguage);
      window.location.reload("/");
    } else if (selectedValue === '2') {
      navigate('/candchangepassword');
    }
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const dateOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime();
    return () => clearInterval(intervalId);
  }, []);

  const handleSkipToMainContent = () => {
    const targetElement = document.getElementById("main-content");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      targetElement.focus();
    }
  };

  // const [theme, setTheme] = useState("");

  // useEffect(() => {
  //   const userTheme = localStorage.getItem("theme");
  //   if (userTheme) {
  //     setTheme(userTheme);
  //   }
  // }, []);

  // const toggleTheme = (newTheme) => {
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);

  //   const themeStylesheet = document.getElementById("theme-stylesheet");
  //   if (themeStylesheet) {
  //     themeStylesheet.setAttribute("href", `css/${newTheme}.css`);
  //   }
  // };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload("/");
  };

  return (
    <header role="banner" aria-label="Website header">
      {parseInt(selectedLanguageA) === 1 ? (
        <>
          <nav className="top-b-section" aria-label="Utility navigation">
            <div className="container-fluid nav-con">
              <div className="top-bar-section">
               <div className="top-bar-lft">
  <time className="bdr-rgt" dateTime={new Date().toISOString()}>
    <span className="visually-hidden">Current date: </span>
    {currentDate}
  </time>

  <span className="divider" aria-hidden="true"></span>

  <time className="bdr-rgt" dateTime={new Date().toISOString()}>
    <span className="visually-hidden">Current time: </span>
    {currentTime}
  </time>
</div>




                <div className="top-bar-rgt">
                  <div className="bar3 bar-c">
                    <button
                      onClick={isReading ? stopReading : startReading}
                      aria-pressed={isReading}
                      className="screen-reader-toggle"
                    >
                      {isReading ? "Stop Reading" : "Start Reading"}
                    </button>

                  </div>

                  <div className="bar4 bar-c">
                    <ul role="list">
                      <li>
                         <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip-theme-dark">Switch to dark theme</Tooltip>}
  >
                        <button
                          className={`white-contrast dash_link_nt ${theme === "dark" ? "active" : ""}`}
                          onClick={() => toggleTheme("dark")}
                          aria-label="Switch to dark theme"
                          title="Switch to dark theme"
                          aria-pressed={theme === "dark"}
                        >
                          <i className="fa fa-square" aria-hidden="true"></i>
                        </button>
                        </OverlayTrigger>
                      </li>
                      <li>
                        <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip-theme-light">Switch to light theme</Tooltip>}
  >
                        <button
                          className={`black-contrast dash_link_nt ${theme === "color" ? "active" : ""}`}
                          onClick={() => toggleTheme("color")}
                          aria-label="Switch to light theme"
                          title="Switch to light theme"
                          aria-pressed={theme === "color"}
                        >
                          <i className="fa fa-square" aria-hidden="true"></i>
                        </button>
                      </OverlayTrigger>
                      </li>
                    </ul>
                  </div>

                  <div className="bar5 bar-c">
                    <ul role="list" aria-label="Font size controls">
                      <li className="ftsz-70p ml-10">
                         <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip-Decrease">Decrease font size</Tooltip>}
  >
                        <button
                          onClick={decreaseFontSize}
                          className="dash_link_nt"
                          aria-label="Decrease font size"
                          title = "Decrease font size"
                        >
                          A<sup className="topbar-sup-txt">-</sup>
                        </button>
                        </OverlayTrigger>
                      </li>
                      <li className="ftsz-90p">
                        <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip-default">Reset font size to default</Tooltip>}
  >
                        <button
                          className="dash_link_nt"
                          onClick={resetFontSize}
                          aria-label="Reset font size to default"
                          title = "Reset font size to default"
                        >
                          A
                        </button>
                        </OverlayTrigger>
                      </li>
                      <li className="ftsz-110p">
                         <OverlayTrigger
    placement="top"
    overlay={<Tooltip id="tooltip-Increase">Increase font size</Tooltip>}
  >
                        <button
                          onClick={increaseFontSize}
                          className="dash_link_nt"
                          aria-label="Increase font size"
                          title = "Increase font size"
                        >
                          A<sup className="topbar-sup-txt">+</sup>
                        </button>
                        </OverlayTrigger>
                      </li>
                    </ul>
                  </div>

                  {/* <div className="bar6 bar-c">
                    <div className="language-box">
                      <label htmlFor="languageDropdown" className="visually-hidden">
                        Select language
                      </label>
                      <select
                        id="languageDropdown"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        aria-label="Select language"
                        aria-haspopup="listbox"
                      >
                        {Object.keys(languages).map((langCode) => (
                          <option key={langCode} value={langCode}>
                            {languages[langCode]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  <div className="bar6 bar-c">
                    <div className="language-box">
                      {storedUserString ? (
                        <button
                          onClick={handleLogout}
                          className="logout-button"
                          aria-label="Logout"
                        >
                          Logout
                        </button>
                      ) : storedUserString1 ? (
                        <div className="language-box">
                          <label htmlFor="candidateActions" className="visually-hidden">
                            Candidate actions
                          </label>
                          <select
                            id="candidateActions"
                            name="languagetype"
                            className="dash_link_nt"
                            onChange={handleSelectCandidate}
                            aria-label="Candidate actions"
                            aria-haspopup="listbox"
                          >
                            <option value="">Welcome, {cand_name}</option>
                            <option value="1">Candidate Logout</option>
                            <option value="2">Change Password</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="loginType" className="visually-hidden">
                            Login options
                          </label>
                          <select
                            id="loginType"
                            name="languagetype"
                            className="dash_link_nt"
                            onChange={handleSelectChange}
                            aria-haspopup="listbox"
                          >
                            {parseInt(selectedLanguage) === 1 ? (
                              <>
                                <option value="">--- Login ---</option>
                                <option value="1">Admin Login</option>
                                <option value="2">Candidate Login</option>
                              </>
                            ) : (
                              <>
                                <option value="">--- Login ---</option>
                                <option value="1">Admin Login</option>
                                <option value="2">Candidate Login</option>

                                {/* <option value="">--- लॉग इन ---</option>
                                <option value="1">व्यवस्थापक लॉगिन</option>
                                <option value="2">अभ्यर्थी लॉगिन</option> */}
                              </>
                            )}
                          </select>
                        </div>

                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

       <div className="top-header-sec">
  <div className="container">
   <div className="row">
  <div className="col-md-4 col-sm-4">
    <div className="head-logo h-100" aria-label="National Emblem of India">
      <div className="custom-logo">
        <OverlayTrigger
  placement="top"
  overlay={<Tooltip id="tooltip-national-emblem">National Emblem of India</Tooltip>}
>
  <img
    className="national_emblem"
    src={footerLogo}
    alt="National Emblem of India"
    title="National Emblem of India"
    style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
  />
</OverlayTrigger>
      </div>
    </div>
  </div>

  <div className="col-md-4 col-sm-4">
    <div className="title-logo" aria-label="Website Title">
      <em>
        <span className="title-logo1 text-center">पश्चिम क्षेत्रीय विद्युत् समिति</span><br />
        <span className="title-logo1 text-center"> Western Regional Power Committee</span>
      </em>
    </div>
  </div>

  <div className="col-md-4 col-sm-4">
    <div className="head-right" aria-label="Swachh Bharat">
 <OverlayTrigger
  placement="top"
  overlay={<Tooltip id="tooltip-national-emblem">Swachh Bharat</Tooltip>}
>
        <img src={G20} alt="Swachh Bharat" title="Swachh Bharat" />
</OverlayTrigger>
    </div>
  </div>
</div>

  </div>
</div>

        </>
      ) : (
        <>
          <nav className="top-b-section" aria-label="उपयोगिता नेविगेशन">
            <div className="container-fluid nav-con">
              <div className="top-bar-section">
                <div className="top-bar-lft">
                  <time
                    className="bdr-rgt"
                    dateTime={new Date().toISOString()}
                    aria-label={`वर्तमान तिथि: ${currentDate}`}
                  >
                    {currentDate}
                  </time>
                  <time
                    className="bdr-rgt"
                    dateTime={new Date().toISOString()}
                    aria-label={`वर्तमान समय: ${currentTime}`}
                  >
                    {currentTime}
                  </time>
                </div>
                <div className="top-bar-rgt">
                  <div className="bar3 bar-c">
                    <button
                      onClick={isReading ? stopReading : startReading}
                      aria-label={isReading ? "स्क्रीन रीडर बंद करें" : "स्क्रीन रीडर शुरू करें"}
                      aria-pressed={isReading}
                      className="screen-reader-toggle"
                    >
                      {isReading ? "पढ़ना बंद करें" : "पढ़ना शुरू करें"}
                    </button>
                  </div>

                  <div className="bar4 bar-c">
                    <ul role="list">
                      <li>
                        <button
                          className={`white-contrast dash_link_nt ${theme === "dark" ? "active" : ""}`}
                          onClick={() => toggleTheme("dark")}
                          aria-label="डार्क थीम पर स्विच करें"
                          aria-pressed={theme === "dark"}
                        >
                          <i className="fa fa-square" aria-hidden="true"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          className={`black-contrast dash_link_nt ${theme === "color" ? "active" : ""}`}
                          onClick={() => toggleTheme("color")}
                          aria-label="लाइट थीम पर स्विच करें"
                          aria-pressed={theme === "color"}
                        >
                          <i className="fa fa-square" aria-hidden="true"></i>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="bar5 bar-c">
                    <ul role="list" aria-label="फ़ॉन्ट आकार नियंत्रण">
                      <li className="ftsz-70p ml-10">
                        <button
                          onClick={decreaseFontSize}
                          className="dash_link_nt"
                          aria-label="फ़ॉन्ट आकार घटाएं"
                        >
                          A<sup className="topbar-sup-txt">-</sup>
                        </button>
                      </li>
                      <li className="ftsz-90p">
                        <button
                          className="dash_link_nt"
                          onClick={resetFontSize}
                          aria-label="डिफ़ॉल्ट फ़ॉन्ट आकार पर रीसेट करें"
                        >
                          A
                        </button>
                      </li>
                      <li className="ftsz-110p">
                        <button
                          onClick={increaseFontSize}
                          className="dash_link_nt"
                          aria-label="फ़ॉन्ट आकार बढ़ाएं"
                        >
                          A<sup className="topbar-sup-txt">+</sup>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="bar6 bar-c">
                    <div className="language-box">
                      <label htmlFor="languageDropdownHindi" className="visually-hidden">
                        भाषा चुनें
                      </label>
                      <select
                        id="languageDropdownHindi"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        aria-label="भाषा चुनें"
                        aria-haspopup="listbox"
                      >
                        {Object.keys(languages).map((langCode) => (
                          <option key={langCode} value={langCode}>
                            {languages[langCode]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bar6 bar-c">
                    <div className="language-box">
                      {storedUserString ? (
                        <button
                          onClick={handleLogout}
                          className="logout-button"
                          aria-label="लॉगआउट"
                        >
                          लॉगआउट
                        </button>
                      ) : storedUserString1 ? (
                        <div className="language-box">
                          <label htmlFor="candidateActionsHindi" className="visually-hidden">
                            उम्मीदवार क्रियाएँ
                          </label>
                          <select
                            id="candidateActionsHindi"
                            name="languagetype"
                            className="dash_link_nt"
                            onChange={handleSelectCandidate}
                            aria-label="उम्मीदवार क्रियाएँ"
                            aria-haspopup="listbox"
                          >
                            <option value="">स्वागत है, {cand_name}</option>
                            <option value="1">उम्मीदवार लॉगआउट</option>
                            <option value="2">पासवर्ड बदलें</option>
                          </select>
                        </div>
                      ) : (
                        <div>
                          <label htmlFor="loginTypeHindi" className="visually-hidden">
                            लॉगिन विकल्प
                          </label>
                          <select
                            id="loginTypeHindi"
                            name="languagetype"
                            className="dash_link_nt"
                            aria-label="लॉगिन प्रकार चुनें"
                            onChange={handleSelectChange}
                            aria-haspopup="listbox"
                          >
                            <option value="">--- लॉग इन ---</option>
                            <option value="1">व्यवस्थापक लॉगिन</option>
                            <option value="2">अभ्यर्थी लॉगिन</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="top-header-sec">
            <div className="container">
                <div className="row">
  <div className="col-md-4 col-sm-4">
    <div className="head-logo h-100" aria-label="राष्ट्रीय प्रतीक">
      <div className="custom-logo">
        <img
          className="national_emblem"
          src={footerLogo}
          alt="राष्ट्रीय प्रतीक"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  </div>

  <div className="col-md-4 col-sm-4">
    <div className="title-logo" aria-label="पश्चिम क्षेत्रीय विद्युत् समिति">
      <em>
        <span className="title-logo1 text-center">पश्चिम क्षेत्रीय विद्युत् समिति</span><br />
        <span className="title-logo1 text-center"> Western Regional Power Committee</span>
      </em>
    </div>
  </div>

  <div className="col-md-4 col-sm-4">
    <div className="head-right" aria-label="स्वच्छ भारत">
      
        <img src={G20} alt="स्वच्छ भारत" />
      
    </div>
  </div>

</div>

            </div>
          </div>
        </>
      )}
    </header>
  );
};