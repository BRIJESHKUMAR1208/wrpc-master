import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../Api/ApiClient";
import apis from '../../../Api/api.json';
import "../Footer/Quicklinkmenu.css";

const CmsDisplayVertical= () => {
  const { id } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [menudata, setMenuData] = useState([]);
  const storedUserData = localStorage.getItem("user1");
  const user1 = JSON.parse(storedUserData);

  useEffect(() => {
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    if (newSelectedLanguage) {
      setSelectedLanguage(newSelectedLanguage);
    }
  }, []);

  useEffect(() => {
    async function fetchMenuData() {
      try {
        const response = await apiClient.get(apis.getmenuSubmenu + selectedLanguage);
        const data = response.data;
        if (Array.isArray(data)) {
          setMenuData(data);
        } else {
          console.error("Unexpected data format:", data);
          setMenuData([]);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }

    fetchMenuData();
    const newSelectedLanguage = localStorage.getItem("selectedLanguage");
    setSelectedLanguage(newSelectedLanguage ? parseInt(newSelectedLanguage) : 1);
  }, [selectedLanguage]);

  const renderSubMenu = (submenuList) => {
    return (
      <ul className="submenu-list">
        {submenuList.map((subMenuItem) => (
          <li key={subMenuItem.menu_id} className="submenu-item">
            {subMenuItem.submenuList && subMenuItem.submenuList.length > 0 ? (
              <a href="#" className="dropdown-toggle">
                {subMenuItem.menuname}
              </a>
            ) : (
              <Link to={"/menu/" + subMenuItem.menuurl} className="submenu-link">
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

  const renderMenuItems = (menuData) => {
    return (
      <ul className="menu-list">
        {menuData.map((menuItem) => (
          <li key={menuItem.menu_id} className="menu-item">
            {menuItem.submenuList && menuItem.submenuList.length > 0 ? (
              <a href="#" className="dropdown-toggle">
                {menuItem.menuname}
              </a>
            ) : (
              <Link to={"/menu/" + menuItem.menuurl} className="menu-link">
                {menuItem.menuname}
              </Link>
            )}
            {menuItem.submenuList &&
              menuItem.submenuList.length > 0 &&
              renderSubMenu(menuItem.submenuList)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="menu-container">
      <h3>Menu</h3>
      {renderMenuItems(menudata)}
    </div>
  );
};

export default CmsDisplayVertical;
