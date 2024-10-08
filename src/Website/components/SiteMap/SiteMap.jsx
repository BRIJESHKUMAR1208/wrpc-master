import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TopHeader } from "../TopHeader/TopHeader";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "../../Footer/CmsFooter";
import { getMenuoptins } from '../../../Api/ApiFunctions';
const SiteMap = ({ Theme }) => {
  const [loadData, setLoadData] = useState([]);
  const[menudata,setmenudata]=useState([])
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getMenuoptins();
        setmenudata(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    }

    fetchMenuData();
  }, []);

  
  return (
    <div>
        <TopHeader/>
        <CmsDisplay/>
    <section className={Theme === true ? "grayTheme_section" : "section"}>
      <div className="container-fluid">
        <div
          className={Theme === true ? "grayTheme_InnerSection" : "InnerSection"}
          style={{ border: "10px" }}
        >
       
          <div className="portal">
            <div className="row">
              <div className="col-sm-12">
                <h3>Site Map</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div
          className={Theme === true ? "grayTheme_InnerSection" : "InnerSection"}
          style={{ minHeight: "56vh" }}
        >
          <div
            className={
              Theme === true
                ? "grayTheme_InnerSectionBox InnerSectionBox_table"
                : "InnerSectionBox InnerSectionBox_table"
            }
          >
            <div>
              <div>
                <h4>Menu </h4>
                
              </div>
              <ul>
  {menudata.map((i) => (
    <li className="first" key={i.u_id}>
      <Link to={"/menu/" + i.u_menu_url}>{i.u_menu_name}</Link>
    </li>
  ))}
</ul>

            </div>
            <div>
              <div>
                <h4>Facility Available</h4>
              </div>
              <ul>
                <li className="first">
                  <a
                    href="#"
                    onClick={() => window.open("/assets/files/userManual.pdf")}
                  >
                    Dte. of Employment Manual
                  </a>
                </li>

                <li className="first">
                  <Link to={"/ExistingCandidateList"}>
                    {" "}
                    Validating Existing Registered List
                  </Link>
                </li>

                <li className="first">
                  <Link to={"/ValidatingExistingRegistrationList"}>
                    {" "}
                    Validating Existing Data
                  </Link>
                </li>

                <li className="first">
                  <Link to={"/GrievanceTrackingStatus"}>
                    {" "}
                    Technical Assistance Tracking Status
                  </Link>
                </li>

                <li className="first">
                  <Link to={"/InstructionEmpRegistration"}>
                    {" "}
                    Employer Registration for job posting
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <h4>Vacancy Notification</h4>
              </div>
              <ul>
                <li className="first">
                  <Link to={"/StatusofNotifiedVacancies"}>
                    {" "}
                    Status of Vacancies Notified
                  </Link>
                </li>

                <li className="first">
                  <Link to={"/StatusofNotifiedVacanciesforShortDuration"}>
                    {" "}
                    Status of Hiring of Skilled/ Semi-Skilled Workers for Short
                    Duration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div>
                <h4>Footer</h4>
              </div>
              <ul>
                <li className="first">
                  <Link to={"/HyperlinkPolicy"}> Hyperlink Policy</Link>
                </li>

                <li className="first">
                  <Link to={"/PrivacyPolicy"}> Privacy Policy</Link>
                </li>

                <li className="first">
                  <Link to={"/CopyRightPolicy"}> Copyright Policy</Link>
                </li>

                <li className="first">
                  <Link to={"/TermsAndConditions"}> Terms & Conditions</Link>
                </li>

                <li className="first">
                  <Link to={"/Feedback"}> Feedback/Technical Assistance</Link>
                </li>

                <li className="first">
                  <Link to={"/ContactUs"}> Contact Us</Link>
                </li>

                <li className="first">
                  <Link to={"/Help"}> Help</Link>
                </li>

                <li className="first">
                  <Link to={"/DownloadForm"}> Download Form</Link>
                </li>
                <li className="first">
                  <a
                    href="#"
                    onClick={() => window.open("/assets/files/faq.pdf")}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <CmsFooter/>
    </div>
  );
};

export default SiteMap;
