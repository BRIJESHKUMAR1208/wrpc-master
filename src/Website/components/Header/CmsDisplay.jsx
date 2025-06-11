import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../Api/ApiClient";
import apis from '../../../Api/api.json';

const CmsDisplay = () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [menudata, setMenuData] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);

  const storedUserData = localStorage.getItem("user1");
  const user1 = JSON.parse(storedUserData);

  const languageLabels = {
    1: { gallery: "Gallery", news: "Latest News" },
    2: { gallery: "गैलरी", news: "ताजा खबर" },
  };

  useEffect(() => {
    const lang = localStorage.getItem("selectedLanguage") || 1;
    setSelectedLanguage(Number(lang));
  }, []);

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const response = await apiClient.get(apis.getmenuSubmenu + selectedLanguage);
        const data = response.data;
        setMenuData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    async function fetchGalleryData() {
      try {
        const response = await apiClient.get(apis.getgallerylist);
        const data = response.data;
        setGalleryList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    }

    fetchMenuData();
    fetchGalleryData();
  }, [selectedLanguage]);

  const renderSubMenu = (submenuList) => {
    return (
      <ul className="dropdown-menu">
        {submenuList.map((subMenuItem) => (
          <li key={subMenuItem.menu_id} className="dropdown-submenu">
            {subMenuItem.submenuList?.length > 0 ? (
              <>
                <a href="#" className="dropdown-item dropdown-toggle">
                  {subMenuItem.menuname}
                </a>
                {renderSubMenu(subMenuItem.submenuList)}
              </>
            ) : (
              <Link to={`/menu/${subMenuItem.menuurl}`} className="dropdown-item">
                {subMenuItem.menuname}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderMenuItems = (menuData) => {
    return menuData.map((menuItem) => (
      <li className="nav-item" key={menuItem.menu_id}>
        {menuItem.submenuList?.length > 0 ? (
          <>
            <a className="nav-link" href="#">
              {menuItem.menuname}
            </a>
            {renderSubMenu(menuItem.submenuList)}
          </>
        ) : (
          <Link className="nav-link" to={`/menu/${menuItem.menuurl}`}>
            {menuItem.menuname}
          </Link>
        )}
      </li>
    ));
  };

  const renderGalleryDropdown = () => {
    const filteredGallery = galleryList.filter(
      (item) => item.language_id === selectedLanguage || !item.language_id
    );

    return (
      <li
        className="nav-item dropdown"
        onMouseEnter={() => setIsGalleryHovered(true)}
        onMouseLeave={() => setIsGalleryHovered(false)}
      >
        <span className="nav-link" style={{ color: "white", marginLeft: "30px" }}>
          {languageLabels[selectedLanguage].gallery}
        </span>
        {isGalleryHovered && filteredGallery.length > 0 && (
          <ul className="dropdown-menu show">
            {filteredGallery.map((item) => (
              <li key={item.u_id}>
                <Link to={`/gallery/${item.u_id}`} className="dropdown-item">
                  {item.u_title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const renderAdditionalForms = () => {
    if (!user1) return null;

    return (
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
            <li><Link to="/form1partsdata" className="dropdown-item">PCM Discussions</Link></li>
          )}
          {user1.can_ft2 === 1 && (
            <li><Link to="/candidate/form2" className="dropdown-item">TPPA Plan</Link></li>
          )}
          {user1.can_ft3 === 1 && (
            <li><Link to="/form3all_list" className="dropdown-item">TPPA Observation</Link></li>
          )}
          {user1.can_ft4 === 1 && (
            <li><Link to="/candidate/form4" className="dropdown-item">Relay Settings</Link></li>
          )}
          {user1.can_ft5 === 1 && (
            <li><Link to="/candidate/performance" className="dropdown-item">Performance Indices</Link></li>
          )}
          {user1.can_ft6 === 1 && (
            <li><Link to="/candidate/ecrsubmissionform" className="dropdown-item">ECR submission data</Link></li>
          )}
          {user1.can_ft7 === 1 && (
            <li><Link to="/candidate/weeklyaccountlist" className="dropdown-item">Weekly Discrepancies</Link></li>
          )}
          {user1.can_ft8 === 1 && (
            <li><Link to="/candidate/Monthlyaccountlist" className="dropdown-item">Monthly Discrepancies</Link></li>
          )}
          <li><Link to="/menu/WRLDC _1071" className="dropdown-item">WRLDC</Link></li>
         

        </ul>
      </li>
    );
  };

  return (
    <div className="main-nav">
      <nav className="navbar navbar-expand-lg cus-nav navbar-light bg-blue">
        <div className="container-fluid con-nav">
          <Link to="/" aria-label="Go to homepage" style={{ padding: "10px", display: "inline-block" }}>
            <i style={{ color: "white", fontSize: "24px" }} className="fa fa-home"></i>
          </Link>

          {/* <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar1"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}

          <div className="collapse navbar-collapse" id="navbar1">
            <ul className="navbar-nav">
              {renderMenuItems(menudata)}
              {renderGalleryDropdown()}
              <li className="nav-item">
                <Link to="/latestnews" className="nav-link" style={{ color: "white", marginLeft: "30px" }}>
                  {languageLabels[selectedLanguage].news}
                </Link>
              </li>
              {renderAdditionalForms()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CmsDisplay;
