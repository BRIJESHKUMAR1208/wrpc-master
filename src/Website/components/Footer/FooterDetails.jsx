import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContent } from "./getContent";
import CmsDisplay from "../Header/CmsDisplay";
import { CmsFooter } from "./CmsFooter";
import { getMenuoptinsById } from "../../../Api/ApiFunctions";
import axios from "axios";
import { TopHeader } from "../TopHeader/TopHeader";
import { Errorfound } from "../error404/Errorfound";
import { Card, Container } from "@mui/material";
;

 export const FooterDetails = () => {
  const [Menuoptions, setMenuData] = useState(null); // Initialize as null or an empty object
  const [extractedNumber, setExtractedNumber] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const numberMatch = id.match(/\d+/);

    if (numberMatch) {
      const number = parseInt(numberMatch[0], 10);
      setExtractedNumber(number);
      async function fetchMenuData() {
        try {
          const data = await getMenuoptinsById(number);
          setMenuData(data);
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
  
      fetchMenuData();
    }
  }, [id]);
  if (Menuoptions === null) {
    return <div><Errorfound /></div>;
  }

  return (
    <div>
    <TopHeader />
    <CmsDisplay />
    <div>
      {getContent(
        Menuoptions.menu_id,
        Menuoptions.menu_url,
        Menuoptions.html,
        Menuoptions.contenttype,
        Menuoptions.file,
        Menuoptions.internal_link,
        Menuoptions.external_link,
        Menuoptions.footertype,
      )}
    </div>
    <CmsFooter />
  </div>
  );
};
