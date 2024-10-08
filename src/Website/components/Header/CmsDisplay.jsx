import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import apiClient  from "../../../Api/ApiFunctions";
import apiClient from "../../../Api/ApiClient"
//import { getsubMenu } from "../../../Api/ApiFunctions";
// import { useFontSize } from "../../../util/FontSizeContext";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import apis from '../../../Api/api.json';

const CmsDisplay = () => {
  ;
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState();
  // const { fontSize } = useFontSize();
  const [menudata, setMenuData] = useState([]);
  const storedUserData = localStorage.getItem("user1");
  var user1 = JSON.parse(storedUserData);

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
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    if (newSelectedLanguage) {
      setSelectedLanguage(newSelectedLanguage);
    }
  }, []); // Empty dependency array to run only once when the component mounts

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

    fetchMenuData();

    fetchMenuData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage ? parseInt(newSelectedLanguage) : 1);
  }, [selectedLanguage]);


  // const renderSubMenu = (submenuList) => {
  //   return (
  //     <ul>
  //       {submenuList.map((subMenuItem) => (
  //         <li key={subMenuItem.menu_id}>
  //            {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 ? (
  //           <a className="menu_list">{subMenuItem.menuname}</a>
  //         ) : (
  //           <Link to={"/menu/" + subMenuItem.menuurl}>
  //           {subMenuItem.menuname}
  //         </Link>
  //         )}

  //           {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 &&
  //             renderSubMenu(subMenuItem.submenuList)
  //           }
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

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
                  <Link to="/candidate/form1" className="dropdown-item">
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
                <li>
                  <Link to="/candidate/form3" className="dropdown-item">
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

            </ul>
          </li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className="main-nav">

        {/* <nav id="navbar" className="navbar">
      <div className="container-fluid nav-con">
      <li>
            <Link to={"/"}>
              <i style={{ color: "white" }} className="fa fa-home"></i>
            </Link>
          </li>
          {renderMenuItems(menudata)}
          <i class="fa-solid fa-bars mobile-nav-toggle"></i>
          </div>
          <i class="bi bi-list mobile-nav-toggle"></i>
        
        </nav> */}



        <nav class="navbar navbar-expand-lg cus-nav navbar-light bg-blue">
          <div class="container-fluid con-nav">
            <Link to={"/"}>
              <i style={{ color: "white" }} className="fa fa-home"></i>
            </Link>
            <button
              class="navbar-toggler navbar-toggler-right"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar1"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar1">
              {renderMenuItems(menudata)}
              <Link to={"/latestnews"} style={{ color: 'white' }}>Latest News</Link>
            </div>
            <div class="collapse navbar-collapse" id="navbar1">
             
              <Link to={"/form1partsdata"} style={{ color: 'white' }}>Formdata</Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default CmsDisplay;
