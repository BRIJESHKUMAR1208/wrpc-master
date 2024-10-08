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
    console.log('No user data found in localStorage');
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
              <section class="top-b-section">
                <div class="container-fluid nav-con">
                  <div class="top-bar-section">
                    <div class="top-bar-lft">
                      <p className="bdr-rgt">{currentDate}</p>
                      <p className="bdr-rgt">{currentTime}</p>
                    </div>
                    <div class="top-bar-rgt">
                      <div class="bar1 bar-c">
                        <form id="search-form" action="/" method="get">
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
                        </form>
                      </div>
                      {/* <div class="bar2 bar-c">
                                                <p><a href="#">Screen Reader Access</a></p>
                                            </div> */}
                      <div class="bar3 bar-c">
                        <p>
                          <a href="#demos">Skip to main content</a>
                        </p>
                      </div>
                      <div class="bar3 bar-c">

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
                      <div class="bar4 bar-c">
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
                              className={`black-contrast dash_link_nt ${theme === "color" ? "active" : ""
                                }`}
                              onClick={() => toggleTheme("color")}
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
                          {/* <li>
                                                        <Link to="/sitemap" className="topbar-icon" title="Sitemap">
                                                            <i className="fa fa-sitemap" aria-hidden="true"></i>
                                                        </Link>
                                                    </li> */}

                          <li className="ftsz-70p ml-10">
                            <button
                              onClick={decreaseFontSize}
                              className="dash_link_nt"
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
                            >
                              A<sup className="topbar-sup-txt">+</sup>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="bar6 bar-c">
                        <div class="language-box">
                          <select
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
                      <div class="bar6 bar-c">



                        <div class="language-box">
                          {storedUserString ? (
                            <button onClick={handleLogout}>
                              <Link to="/">Logout</Link>
                            </button>
                          ) : storedUserString1 ? (
                            <div className="language-box">

                              <button
                                className="primary-button "
                                onClick={() => setShowDropdown(!showDropdown)}
                              >
                                Welcome, {cand_name}
                              </button>
                              {showDropdown && (
                                <div className="language-box">
                                  <div>
                                    <button onClick={handleLogout} className="dropdown-button" > Candidate Logout</button>

                                  </div>
                                  <div> <button onClick={handleChangePassword} className="dropdown-button">Change Password</button></div>

                                </div>
                              )}
                            </div>
                          ) : (
                            // <button>
                            //   <Link to="/login">Login</Link>
                            // </button>
                            <>
                            <div >

                           
                              {parseInt(selectedLanguage) === 1 ? (
                                <select name="languagetype" className="dash_link_nt" onChange={handleSelectChange}>
                                  <option value="" >  ---Login --- </option>
                                  <option value="1" >Admin Login</option>
                                  <option value="2" >Candidate Login</option>
                                </select>

                              ) : (

                                <select name="languagetype" className="dash_link_nt" onChange={handleSelectChange}>
                                  <option value="" >  --- लॉग इन --- </option>
                                  <option value="1" >व्यवस्थापक लॉगिन</option>
                                  <option value="2" >अभ्यर्थी लॉगिन</option>
                                </select>
                              )}
                               </div>
                            </>
                          )}
                        </div>



                        {/* <button><Link to='/candidate/login'>Login</Link></button> */}

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="top-header-sec">
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-sm-6">
                    <div class="head-logo h-100">
                      <h2 class="logo w-100">
                        <a
                          href="/"
                          title="Home"
                          rel="home"
                          class="header__logo row w-100"
                          id="logo"
                        >
                          <div className="col-md-3">
                            <div className="custom-logo">
                              <img
                                class="national_emblem "
                                // src={Logo}

                                src={footerLogo}
                                alt="national emblem"
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
                  <div class="col-md-4 col-sm-6">
                    <div class="head-right">
                      {/* <div class="rgt-one">
                        <img src={swatchBarath} alt="" />
                      </div> */}
                      <div class="rgt-two">
                        <h6>Site Under Construction</h6>
                      </div>
                      <div class="rgt-three">
                        <img src={G20} alt="" />
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
              <section class="top-b-section">
                <div class="container-fluid nav-con">
                  <div class="top-bar-section">
                    <div class="top-bar-lft">
                      <p className="bdr-rgt">{currentDate}</p>
                      <p className="bdr-rgt">{currentTime}</p>
                    </div>
                    <div class="top-bar-rgt">
                      <div class="bar1 bar-c">
                        <form id="search-form" action="/" method="get">
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
                              placeholder="
खोज...."
                              class="round"
                            />

                            <button
                              type="submit"
                              class="corner"
                              aria-label="Search...."
                              title="
खोज...."
                            >
                              <i class="fa fa-search " aria-hidden="true"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="bar2 bar-c">
                        <p>
                          <a href="#">स्क्रीन रीडर एक्सेस</a>
                        </p>
                      </div>
                      <div class="bar3 bar-c">
                        <p>
                          <a
                            href="#rgt-three"
                            onClick={handleSkipToMainContent}
                          >
                            मुख्य विषयवस्तु में जाएं
                          </a>
                        </p>
                      </div>
                      <div class="bar4 bar-c">
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
                            >
                              A<sup className="topbar-sup-txt">+</sup>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="bar6 bar-c">
                        <div class="language-box">
                          <select
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

                      <div class="bar6 bar-c">
                        <div class="language-box">
                          {storedUserString ? (
                            <button >
                              <Link to="/">Logout</Link>
                            </button>
                          ) : (
                            // <button>
                            //   <Link to="/candidate/login">Login</Link>
                            // </button>
                            <>
                              {parseInt(selectedLanguage) === 1 ? (
                                <select name="languagetype" className="dash_link_nt" onChange={handleSelectChange}>
                                  <option value="" >  ---Login --- </option>
                                  <option value="1" >Admin Login</option>
                                  <option value="2" >Candidate Login</option>
                                </select>

                              ) : (

                                <select name="languagetype" className="dash_link_nt" onChange={handleSelectChange}>
                                  <option value="" >  --- लॉग इन --- </option>
                                  <option value="1" >व्यवस्थापक लॉगिन</option>
                                  <option value="2" >अभ्यर्थी लॉगिन</option>
                                </select>
                              )}</>
                          )}
                        </div>
                        {/* <button><Link to='/candidate/login'>Login</Link></button> */}
                      </div>


                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="top-header-sec">
              <div class="container">
                <div class="row">
                  <div class="col-md-8 col-sm-6">
                    <div class="head-logo h-100">
                      <h2 class="logo w-100">
                        <a
                          href="/"
                          title="Home"
                          rel="home"
                          class="header__logo row w-100"
                          id="logo"
                        >
                          <div className="col-md-3">
                            <div className="custom-logo">
                              <img
                                class="national_emblem w-50"
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
                  <div class="col-md-4 col-sm-6">
                    <div class="head-right d-flex flex-end">
                      {/* <div class="rgt-one">
                        <img src={swatchBarath} alt="" />
                      </div> */}
                      <div class="rgt-two">
                        {/* <img src={G20} alt="" /> */}
                        <h2 className="h6" style={{ marginLeft: '50%' }}>Site Under Construction</h2>
                      </div>
                      <div class="rgt-three">
                        <img src={G20} alt="" />
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
