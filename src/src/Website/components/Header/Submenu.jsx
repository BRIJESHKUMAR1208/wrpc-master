import React from "react";
import { Link } from "react-router-dom";
import { getContent } from "./getContent";
import CmsDisplay from "./CmsDisplay";

const Submenu = ({ items }) => {
  // Define a function to get submenu items for a specific menu ID
  const getSubmenuItems = (menuId) => {
    return items.filter((item) => item.menu_id === menuId && item.is_submenu === 1);
  };

  if (!items || items.length === 0) {
    return null; 
  }

  return (
    <>
    <CmsDisplay/>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/menu/${item.id}`}>{item.name}</Link>
          {/* {item.has_submenu === 1 && <Submenu items={getSubmenuItems(item.id)} />} */}
          <div>
            {getContent( item.content_data)}
          </div>
        </li>
      ))}
    </ul>
    </>
  );
};

export default Submenu;
