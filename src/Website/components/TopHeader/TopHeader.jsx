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

export const TopHeader = ({ selectedLanguage, handleLanguageChange }) => {
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
  } else {
    // Handle the case when storedUserString1 is null
    //console.log('No user data found in localStorage');
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
    // Redirect to the change password page
    navigate('/candchangepassword');
  };

  useEffect(() => {
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguageA(newSelectedLanguage || 1);
  }, []);

  const languages = {
    1: "English",
    2: "हिंदी",
    // Add more languages as needed
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
      //navigate('/login');
      const currentLanguage = selectedLanguageA;
      const languageType = localStorage.getItem("languagetype"); // Save the languagetype value

      localStorage.clear();
      if (languageType) {
        localStorage.setItem("languagetype", languageType);
      }

      setSelectedLanguageA(currentLanguage);
      //localStorage.clear();
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

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Call it once to initialize the values
    updateDateTime();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const handleSkipToMainContent = () => {
    // Use JavaScript to scroll to the target element with the id "rgt-three"
    const targetElement = document.getElementById("rgt-three");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [theme, setTheme] = useState("");

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    if (userTheme) {
      setTheme(userTheme);
    }
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const themeStylesheet = document.getElementById("theme-stylesheet");
    if (themeStylesheet) {
      themeStylesheet.setAttribute("href", `css/${newTheme}.css`);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload("/");
  };

  return (
    <>
      {parseInt(selectedLanguageA) === 1 ? (
        <div>
          <div>
            <div>
              <section className="top-b-section">
                <div className="container-fluid nav-con">
                  <div className="top-bar-section">
                    <div className="top-bar-lft">
                      <span className="bdr-rgt">{currentDate}</span>
                      <span className="bdr-rgt">{currentTime}</span>
                    </div>

                    {/* <div className="top-bar-lft">
  <time className="bdr-rgt12" dateTime={currentDate} aria-label={`Current Date: ${currentDate}`}>
    <span role="text"> {currentDate}</span>
  </time>
  <time className="bdr-rgt12" dateTime={currentTime} aria-label={`Current Time: ${currentTime}`}>
    <span role="text"> {currentTime}</span>
  </time>
</div> */}



                    <div className="top-bar-rgt">
                      <div className="bar1 bar-c">
                        {/* <form id="search-form" action="/" method="get">
                          <div class="search-box">
                            <input
                              id="myInputhidden"
                              type="hidden"
                              name="lang"
                              placeholder="Search...."
                              class="round"
                              value="en"
                            />
                            <input
                              id="myInput"
                              type="search"
                              name="s"
                              placeholder="Search...."
                              class="round"
                            />

                            <button
                              type="submit"
                              class="corner"
                              aria-label="Search...."
                              title="Search...."
                            >
                              <i class="fa fa-search " aria-hidden="true"></i>
                            </button>
                          </div>
                        </form> */}
                      </div>
                      {/* <div class="bar2 bar-c">
                                                <p><a href="#">Screen Reader Access</a></p>
                                            </div> */}
                      {/* <div className="bar3 bar-c">
                        <p>
                          <Link href="#">Skip to main content</Link>

                        </p>
                      </div> */}
                      <div className="bar3 bar-c">

                        <div>
                          {isReading ? (
                            <button onClick={stopReading}>Stop Reading</button>
                          ) : (
                            <button onClick={startReading}>
                              Start Reading
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="bar4 bar-c">
                        <ul>
                          <li>
                            <a
                              href="#"
                              className={`white-contrast dash_link_nt ${theme === "dark" ? "active" : ""}`}
                              onClick={() => toggleTheme("dark")}
                              title="Switch to dark theme"
                              role="button"
                              aria-label="Switch to dark theme"
                              tabIndex="0"
                            >
                              <i className="fa fa-square" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className={`black-contrast dash_link_nt ${theme === "color" ? "active" : ""}`}
                              onClick={() => toggleTheme("color")}
                              title="Switch to light theme"
                              role="button"
                              aria-label="Switch to light theme"
                              tabIndex="0"
                            >
                              <i className="fa fa-square" aria-hidden="true"></i>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div className="bar5 bar-c">
                        <ul>
                          {/* <li>
                                                        <Link to="/sitemap" className="topbar-icon" title="Sitemap">
                                                            <i className="fa fa-sitemap" aria-hidden="true"></i>
                                                        </Link>
                                                    </li> */}

                          <li className="ftsz-70p ml-10">
                            <button
                              onClick={decreaseFontSize}
                              className="dash_link_nt"
                              aria-label="Decrease font size"
                            >
                              A<sup className="topbar-sup-txt">-</sup>
                            </button>
                          </li>
                          <li className="ftsz-90p">
                            <button
                              className="dash_link_nt"
                              onClick={resetFontSize}
                            >
                              A
                            </button>
                          </li>
                          <li className="ftsz-110p">
                            <button
                              onClick={increaseFontSize}
                              className="dash_link_nt"
                              aria-label="Decrease font size"
                            >
                              A<sup className="topbar-sup-txt">+</sup>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="bar6 bar-c">
                        <div className="language-box">
                          <select
                            aria-label="languagetype"
                            id="languageDropdown"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
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
                            // Logout Button
                            <button onClick={handleLogout} className="logout-button">
                              Logout
                            </button>
                          ) : storedUserString1 ? (
                            // Candidate Menu (Logout & Change Password)
                            <div className="language-box">
                              <label htmlFor="candidateActions" className="visually-hidden">
                                Candidate Actions
                              </label>
                              <select
                                id="candidateActions"
                                name="languagetype"
                                className="dash_link_nt"
                                onChange={handleSelectCandidate}
                                aria-label="Candidate Actions"
                              >
                                <option value="">Welcome, {cand_name}</option>
                                <option value="1">Candidate Logout</option>
                                <option value="2">Change Password</option>
                              </select>
                            </div>
                          ) : (
                            // Language Selection & Login Options
                            <div>
                              <label htmlFor="loginType" className="visually-hidden">
                                Select Login Type
                              </label>
                              <select
                                id="loginType"
                                name="languagetype"
                                className="dash_link_nt"
                                aria-label="Select login type"
                                onChange={handleSelectChange}
                              >
                                {parseInt(selectedLanguage) === 1 ? (
                                  <>
                                    <option value="">--- Login ---</option>
                                    <option value="1">Admin Login</option>
                                    <option value="2">Candidate Login</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="">--- लॉग इन ---</option>
                                    <option value="1">व्यवस्थापक लॉगिन</option>
                                    <option value="2">अभ्यर्थी लॉगिन</option>
                                  </>
                                )}
                              </select>
                            </div>
                          )}
                        </div>


                        {/* <button><Link to='/candidate/login'>Login</Link></button> */}

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="top-header-sec">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-sm-6">
                    <div className="head-logo h-100">
                      <h2 className="logo w-100">
                        <a
                          href="/"
                          title="Home"
                          rel="home"
                          className="header__logo row w-100"
                          id="logo"
                        >
                          <div className="col-md-3">
                            <div className="custom-logo">
                              {/* <img
                                class="national_emblem "
                                // src={Logo}

                                src={footerLogo}
                                alt="national emblem"
                              /> */}
                              <img
                                className="national_emblem"
                                src={footerLogo}
                                alt="National Emblem"
                                style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                              />

                            </div>
                          </div>
                          <div className="col-md-9 d-flex align-items-center justify-content-end">
                            <em>
                              <span className="text-center">पश्चिम क्षेत्रीय विद्युत् समिति </span>
                              <span> Western Regional Power Committee</span>
                            </em>
                          </div>
                        </a>
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="head-right">
                      {/* <div class="rgt-one">
                        <img src={swatchBarath} alt="" />
                      </div> */}
                      <div className="rgt-two">
                        {/* <h6>Site Under Construction</h6> */}
                      </div>
                      <div className="rgt-three">
                        <img src={G20} alt="image" />
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div>
              <section className="top-b-section">
                <div className="container-fluid nav-con">
                  <div className="top-bar-section">
                    <div className="top-bar-lft">
                      <p className="bdr-rgt">{currentDate}</p>
                      <p className="bdr-rgt">{currentTime}</p>
                    </div>
                    <div className="top-bar-rgt">
                      <div className="bar1 bar-c">
                        <form id="search-form" action="/" method="get">
                          <div className="search-box">
                            <input
                              id="myInputhidden"
                              type="hidden"
                              name="lang"
                              placeholder="Search...."
                              className="round"
                              value="en"
                            />
                            <input
                              id="myInput"
                              type="search"
                              name="s"
                              placeholder="
खोज...."
className="round"
                            />

                            <button
                              type="submit"
                              className="corner"
                              aria-label="Search...."
                              title="
खोज...."
                            >
                              <i className="fa fa-search " aria-hidden="true"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="bar2 bar-c">
                        <p>
                          <a href="#">स्क्रीन रीडर एक्सेस</a>
                        </p>
                      </div>
                      <div className="bar3 bar-c">
                        <p>
                          <a
                            href="#rgt-three"
                            onClick={handleSkipToMainContent}
                          >
                            मुख्य विषयवस्तु में जाएं
                          </a>
                        </p>
                      </div>
                      <div className="bar4 bar-c">
                        {/* <ul>
                                                    <li>
                                                        <a href="#" class="white-contrast dash_link_nt" id="dark-mode-button"
                                                            aria-pressed="false" title="Black" role="button">
                                                            <i class="fa fa-square" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" class="black-contrast dash_link_nt" id="light-mode-button"
                                                            aria-pressed="true" title="white" role="button">
                                                            <i class="fa fa-square" aria-hidden="true"></i>
                                                        </a>
                                                    </li>
                                                </ul> */}
                        <ul>
                          <li>
                            <a
                              href="#"
                              className={`white-contrast dash_link_nt ${theme === "dark" ? "active" : ""
                                }`}
                              onClick={() => toggleTheme("dark")}
                              title="Black"
                              role="button"
                            >
                              <i
                                className="fa fa-square"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className={`black-contrast dash_link_nt ${theme === "light" ? "active" : ""
                                }`}
                              onClick={() => toggleTheme("light")}
                              title="White"
                              role="button"
                            >
                              <i
                                className="fa fa-square"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="bar5 bar-c">
                        <ul>
                          <li className="ftsz-70p ml-10">
                            <button className="dash_link_nt" aria-label="Decrease font size">A<sup className="topbar-sup-txt">-</sup></button>
                          </li>
                          <li className="ftsz-90p">
                            <button className="dash_link_nt" aria-label="Reset font size">A</button>
                          </li>
                          <li className="ftsz-110p">
                            <button className="dash_link_nt" aria-label="Increase font size">A<sup className="topbar-sup-txt">+</sup></button>
                          </li>
                        </ul>

                        {/* <ul>
                          <li>
                            <a href="#" className="topbar-icon" title="Sitemap">
                              <i
                                className="fa fa-sitemap"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>

                          <li className="ftsz-70p ml-10">
                            <button
                              onClick={decreaseFontSize}
                              className="dash_link_nt"
                              aria-label="Decrease font size"
                            >
                              A<sup className="topbar-sup-txt">-</sup>
                            </button>
                          </li>
                          <li className="ftsz-90p">
                            <button
                              className="dash_link_nt"
                              onClick={resetFontSize}
                              aria-label="Decrease font size"
                            >
                              A
                            </button>
                          </li>
                          <li className="ftsz-110p">
                            <button
                              onClick={increaseFontSize}
                              className="dash_link_nt"
                              aria-label="Decrease font size"
                            >
                              A<sup className="topbar-sup-txt">+</sup>
                            </button>
                          </li>
                        </ul> */}
                      </div>
                      <div className="bar6 bar-c">
                        <div className="language-box">
                          <select
                            id="languageDropdown"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            aria-label="select language"
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
                            <Link to="/" className="logout-button">Logout</Link>
                          ) : (
                            <>
                              <label htmlFor="loginType" className="visually-hidden">
                                Select Login Type
                              </label>
                              <select
                                id="loginType"
                                name="languagetype"
                                className="dash_link_nt"
                                aria-label="Select login type"
                                onChange={handleSelectChange}
                              >
                                {parseInt(selectedLanguage) === 1 ? (
                                  <>
                                    <option value="">--- Login ---</option>
                                    <option value="1">Admin Login</option>
                                    <option value="2">Candidate Login</option>
                                  </>
                                ) : (
                                  <>
                                    <option value="">--- लॉग इन ---</option>
                                    <option value="1">व्यवस्थापक लॉगिन</option>
                                    <option value="2">अभ्यर्थी लॉगिन</option>
                                  </>
                                )}
                              </select>
                            </>
                          )}
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="top-header-sec">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-sm-6">
                    <div className="head-logo h-100">
                      <h2 className="logo w-100">
                        <a
                          href="/"
                          title="Home"
                          rel="home"
                          className="header__logo row w-100"
                          id="logo"
                        >
                          <div className="col-md-3">
                            <div className="custom-logo">
                              <img
                                className="national_emblem w-50"
                                // src={Logo}
                                src={footerLogo}
                                alt="national emblem"
                              />
                            </div>
                          </div>
                          <div className="col-md-8 d-flex align-items-center justify-content-end">
                            <em>
                              <span className="text-center">पश्चिम क्षेत्रीय विद्युत् समिति </span>
                              <span> Western Regional Power Committee</span>
                            </em>
                          </div>

                        </a>
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <div className="head-right d-flex flex-end">
                      {/* <div class="rgt-one">
                        <img src={swatchBarath} alt="" />
                      </div> */}
                      <div className="rgt-two">
                        {/* <img src={G20} alt="" /> */}
                        {/* <h2 className="h6" style={{ marginLeft: '50%' }}>Site Under Construction</h2> */}
                      </div>
                      <div className="rgt-three">
                        <img src={G20} alt="image" />
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
