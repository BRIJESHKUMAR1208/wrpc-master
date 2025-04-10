import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import apiClient  from "../../../Api/ApiFunctions";
import apiClient from "../../../Api/ApiClient"
//import { getsubMenu } from "../../../Api/ApiFunctions";
// import { useFontSize } from "../../../util/FontSizeContext";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import apis from '../../../Api/api.json';

const CmsDisplay = () => {

  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  // const { fontSize } = useFontSize();
  const [menudata, setMenuData] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const storedUserData = localStorage.getItem("user1");
  var user1 = JSON.parse(storedUserData);
const languageLabels = {
    1: { gallery: "Gallery", news: "Latest News" },
    2: { gallery: "गैलरी", news: "ताजा खबर" }
  };
  const dateOptions = [
    { id: 1, name: "DSMUI Account" },
    { id: 2, name: "REGIONAL ENERGY ACCOUNTS" },
    { id: 5, name: "REACTIVE ENERGY ACCOUNTS" },
    { id: 3, name: "Compensation Statement" },
    { id: 4, name: "Ramping Certificate" },
    { id: 9, name: "Ancillary Services Operations Data Received" },
    { id: 10, name: "Ancillary Services Charges" },
    { id: 6, name: "REGIONAL TRANSMISSION ACCOUNTS" },
    { id: 7, name: "REGIONAL TRANSMISSION DEVIATION ACCOUNTS" },
    { id: 8, name: "REGIONAL CONGESTION ACCOUNTS" },
    { id: 11, name: "RRAS AGC SCED" },
    { id: 12, name: "REA through New Software" },
    { id: 13, name: "New Software Sharing of Transmission Charges" },
  ];
  useEffect(() => {
    const lang = localStorage.getItem("selectedLanguage") || 1;
    setSelectedLanguage(Number(lang));
  }, []);
  useEffect(() => {
    async function fetchMenuData() {

      try {
        //const data = await getsubMenu();
        const response = await apiClient.get(apis.getmenuSubmenu + selectedLanguage);
        const data = response.data;
        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.error("Unexpected data format:", data);
          setMenuData([]); // or handle the case appropriately
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    async function fetchGalleryData() {
      try {
        const response = await apiClient.get(apis.getgallerylist); // API for gallery list
        const data = response.data;
        if (Array.isArray(data)) {
          setGalleryList(data);
        } else {
          console.error("Unexpected gallery data format:", data);
          setGalleryList([]);
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    }
    fetchMenuData();
    fetchGalleryData();
  }, [selectedLanguage]);
  const handleGalleryHover = () => {
    setIsGalleryHovered(true);
  };

  const handleGalleryLeave = () => {
    setIsGalleryHovered(false);
  };
  const renderGalleryList = () => {
    // Filter gallery items based on selected language
    const filteredGallery = galleryList.filter(item => 
      item.language_id == selectedLanguage || !item.language_id
    );

    return (
      <NavDropdown
        title={selectedLanguage == 1 ? "Gallery" : "गैलरी"}
        id="navbar-gallery-dropdown"
        className="nav-link"
        style={{ color: 'white', marginLeft: '30px' }}
        onMouseEnter={() => setIsGalleryHovered(true)}
        onMouseLeave={() => setIsGalleryHovered(false)}
      >
        {isGalleryHovered && filteredGallery.map((item) => (
          <NavDropdown.Item key={item.u_id} as={Link} to={`/gallery/${item.u_id}`}>
            {item.u_title}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    );
  };
  

  const renderSubMenu = (submenuList) => {
    return (
      <ul className="dropdown-menu">
        {submenuList.map((subMenuItem) => (
          <li key={subMenuItem.menu_id} className="dropdown-submenu">
            {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 ? (
              <a href="#" className="dropdown-item dropdown-toggle">
                {subMenuItem.menuname}
              </a>
            ) : (
              <Link
                to={"/menu/" + subMenuItem.menuurl}
                className="dropdown-item"
              >
                {subMenuItem.menuname}
              </Link>
            )}
            {subMenuItem.submenuList &&
              subMenuItem.submenuList.length > 0 &&
              renderSubMenu(subMenuItem.submenuList)}
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuItems = (menuData, user) => {
    return (
      <ul className="navbar-nav">
        {menuData.map((menuItem) => (
          <li className="nav-item active" key={menuItem.menu_id}>
            {menuItem.submenuList && menuItem.submenuList.length > 0 ? (
              <a className="nav-link" href="#">
                {menuItem.menuname}
              </a>
            ) : (
              <Link to={"/menu/" + menuItem.menuurl}>{menuItem.menuname}</Link>
            )}
            {menuItem.submenuList &&
              menuItem.submenuList.length > 0 &&
              renderSubMenu(menuItem.submenuList)}
          </li>
        ))}

        {/* Static menu items */}
        {/* <li className="nav-item">
                <Link to="/form/static1" className="nav-link">Static Form 1</Link>
            </li>
            <li className="nav-item">
                <Link to="/form/static2" className="nav-link">Static Form 2</Link>
            </li>
            <li className="nav-item">
                <Link to="/form/static3" className="nav-link">Static Form 3</Link>
            </li>
            <li className="nav-item">
                <Link to="/form/static4" className="nav-link">Static Form 4</Link>
            </li> */}

        {user1 && (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Additional Form
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {user1.can_ft1 === 1 && (
                <li>
                  <Link to="/form1partsdata" className="dropdown-item">
                    PCM Discussions
                  </Link>
                </li>
              )}
              {user1.can_ft2 === 1 && (
                <li>
                  <Link to="/candidate/form2" className="dropdown-item">
                    TPPA Plan
                  </Link>
                </li>
              )}
              {user1.can_ft3 === 1 && (
                // form3all_list
                <li>
                  <Link to="/form3all_list" className="dropdown-item">
                    TPPA Observation
                  </Link>
                </li>
              )}
              {user1.can_ft4 === 1 && (
                <li>
                  <Link to="/candidate/form4" className="dropdown-item">
                    Relay Settings
                  </Link>
                </li>
              )}
              {user1.can_ft5 === 1 && (
                <li>
                  <Link to="/candidate/performance" className="dropdown-item">
                    Performance Indices
                  </Link>
                </li>
              )}
              {user1.can_ft6 === 1 && (

                <li>
                  <Link to="/candidate/ecrsubmissionform" className="dropdown-item">
                    ECR submission data
                  </Link>
                </li>
              )}
              {user1.can_ft7 === 1 && (

                <li>
                  <Link to="/candidate/weeklyaccountlist" className="dropdown-item">
                    Weekly  Discrepancies
                  </Link>
                </li>
              )}
              {user1.can_ft8 === 1 && (

                <li>
                  <Link to="/candidate/Monthlyaccountlist" className="dropdown-item">
                    Monthly  Discrepancies
                  </Link>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="main-nav">

        <nav className="navbar navbar-expand-lg cus-nav navbar-light bg-blue">
          <div className="container-fluid con-nav">
          <Link to={"/"} aria-label="Go to homepage" style={{ padding: "10px", display: "inline-block" }}>
  <i style={{ color: "white", fontSize: "24px" }} className="fa fa-home"></i>
</Link>

            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar1"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar1">
              <ul className="navbar-nav">
                {renderMenuItems(menudata)}
                <li 
                className="nav-item dropdown"
                onMouseEnter={() => setIsGalleryHovered(true)}
                onMouseLeave={() => setIsGalleryHovered(false)}
              >
                
                <Link 
                 
                  className="nav-link" 
                  style={{ color: 'white', marginLeft: '30px' }}
                >
                 {languageLabels[selectedLanguage].gallery}
                </Link>
                {isGalleryHovered && galleryList.length > 0 && (
                  <div className="dropdown-menu show">
                    {galleryList.map((item) => (
                      <Link
                        key={item.u_id}
                        to={`/gallery/${item.u_id}`}
                        className="dropdown-item"
                      >
                        {item.u_title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Latest News Link */}
              <li className="nav-item">
                <Link 
                  to="/latestnews" 
                  className="nav-link" 
                  style={{ color: 'white', marginLeft: '30px' }}
                >
                  {languageLabels[selectedLanguage].news}
                </Link>
              </li>

              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbar1">

              {/* <Link to={"/form3all_list"} style={{ color: 'white' }}>Formdata</Link> */}
            </div>
          </div>
        </nav>

      </div>
    </>
  );
};

export default CmsDisplay;

