import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { Menuoptions } from "../../data/Menu";
import { getFooteroptins } from "../../../Api/ApiFunctions"; // Import Bootstrap JS
import HomeIcon from "@mui/icons-material/Home";
import Logo from "../../../assets/images/emblem-dark.png";
import footerLogo from "../../../assets/images/top-logo.png";

export const CmsFooter = () => {
  const [extractedNumber, setExtractedNumber] = useState(null);
  // const { fontSize } = useFontSize();

  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [menudata, setMenuData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getFooteroptins();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    fetchMenuData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage || 1);
  }, []);

  return (
    <>
      {parseInt(selectedLanguage) === 1 ? (
        <div>
          <footer>
            <div class="widget_wrap overlay">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <div class="widget_list">
                      <h4 class="widget_title">Contact Us</h4>

                      {menudata.map((i) => {
                        if (i.u_footertype === 3) {
                          return (
                            <div className="foot-main" key={i.u_id}>
                              {/* {console.log(i, "hiiii")} */}

                              <p>{i.u_address}</p>
                              {/* <p>
                            Open Monday to Saturday From 7h to 18h or talk to an expert {i.u_mobile_no} – available 24/7
                          </p> */}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div class="widget_list">
                      <h4 class="widget_title">Quick Links</h4>
                      <div class="widget_service">
                        <ul>
                          {menudata.map((item) => (
                            <li key={item.u_id}>
                              {item.u_footertype === 4 && (
                                <>
                                  {item.u_contenttype === 1 && (
                                    <a href={item.u_file} target="_blank">
                                      {item.u_tittle_name}
                                    </a>
                                  )}
                                  {item.u_contenttype === 2 && (
                                    <Link to={`/footer/${item.u_id}`}>
                                      {item.u_tittle_name}
                                    </Link>
                                  )}
                                  {item.u_contenttype === 3 && (
                                    <Link to={item.u_internal_link}>
                                      {item.u_tittle_name}
                                    </Link>
                                  )}
                                  {item.u_contenttype === 4 && (
                                    <a
                                      href={item.u_external_link}
                                      target="_blank"
                                    >
                                      {item.u_tittle_name}
                                    </a>
                                  )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div class="widget_list">
                      <h4 class="widget_title">Explore</h4>
                      <div class="widget_service">
                        <ul>
                          {menudata.map((item) => (
                            <>
                              {item.u_footertype === 1 && (
                                <li key={item.u_id}>
                                  <Link to={item.u_internal_link}>
                                    {item.u_tittle_name}
                                  </Link>
                                </li>
                              )}
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="widget_copyright"> */}
                <div class="row widget_copyright">
                  <div class="col-md-3">
                    <div class="widget_logo">
                      {/* <a href="#"><img src={footerLogo} alt="" /></a>
                  </div> */}
                      <img
                        class="footer_emblem"
                        src={Logo}
                        // src={footerLogo}
                        alt="national emblem"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="copyright_text">
                      <p>
                        <span>
                          Copyright © 2006 Western Regional Power Committee
                        </span>
                        All Rights Reserved. | This site is best viewed at:
                        800x600 resolution.
                      </p>
                    </div>
                  </div>
                  {/* (Website
                  Last Updated on: 14-Jan-2019) */}

                  <div class="col-md-3">
                    <div class="city_top_social">
                      <ul>
                        <li>
                          <a href="#">
                            <i class="fa-brands fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa-brands fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa-brands fa-linkedin-in"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa-brands fa-youtube"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa-brands fa-google"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div>
          <footer>
            <div class="widget_wrap overlay">
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <div class="widget_list">
                      <h4 class="widget_title">संपर्क करें</h4>

                      {menudata.map((i) => {
                        if (i.u_footertype === 3) {
                          return (
                            <div key={i.u_id}>
                              {/* {console.log(i, "hiiii")} */}
                              <p>{i.u_address}</p>
                              <p>
                                सोमवार से शनिवार सुबह 7 बजे से शाम 18 बजे तक
                                खुला रखें या किसी विशेषज्ञ से बात करें{" "}
                                {i.u_mobile_no} – 24/7 उपलब्ध
                              </p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div class="widget_list">
                      <h4 class="widget_title">त्वरित संपर्क</h4>
                      <div class="widget_service">
                        <ul>
                          {menudata.map((item) => (
                            <li key={item.u_id}>
                              {item.u_footertype === 4 && (
                                <>
                                  {item.u_contenttype === 1 && (
                                    <a href={item.u_file} target="_blank">
                                      {item.u_tittle_name}
                                    </a>
                                  )}
                                  {item.u_contenttype === 2 && (
                                    <Link to={`/footer/${item.u_id}`}>
                                      {item.u_tittle_name}
                                    </Link>
                                  )}
                                  {item.u_contenttype === 3 && (
                                    <Link to={item.u_internal_link}>
                                      {item.u_tittle_name}
                                    </Link>
                                  )}
                                  {item.u_contenttype === 4 && (
                                    <a
                                      href={item.u_external_link}
                                      target="_blank"
                                    >
                                      {item.u_tittle_name}
                                    </a>
                                  )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 col-sm-3">
                    <div class="widget_list">
                      <h4 class="widget_title">खोज</h4>
                      <div class="widget_service">
                        <ul>
                          {menudata.map((item) => (
                            <>
                              {item.u_footertype === 1 && (
                                <li key={item.u_id}>
                                  {item.u_footertype === 1 && (
                                    <>
                                      <Link to={item.u_internal_link}>
                                        {item.u_tittle_name}
                                      </Link>
                                    </>
                                  )}
                                </li>
                              )}
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="widget_copyright">
                  <div class="row">
                    <div class="col-md-3">
                      <div class="d-flex justify-content-center">
                        <a href="#">
                          <img
                            // src={footerLogo}
                            src={Logo}
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="copyright_text">
                        <p>
                          <span>
                            कॉपीराइट © 2006 पश्चिमी क्षेत्रीय विद्युत समिति
                          </span>
                          सर्वाधिकार सुरक्षित। | इस साइट को सबसे अच्छी तरह से
                          देखा जा सकता है: 800x600 रिज़ॉल्यूशन।{" "}
                        </p>
                        (वेबसाइट अंतिम अद्यतन तिथि: 14-जनवरी-2019)
                      </div>
                      
                    </div>
                    <div class="col-md-3">
                      <div class="city_top_social">
                        <ul>
                          <li>
                            <a href="#">
                              <i class="fa-brands fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa-brands fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa-brands fa-youtube"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="fa-brands fa-google"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};
