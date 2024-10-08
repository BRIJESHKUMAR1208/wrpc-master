import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContent } from "./getContent";
import CmsDisplay from "./CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import { getMenuoptinsById } from "../../../Api/ApiFunctions";
import axios from "axios";
import { TopHeader } from "../TopHeader/TopHeader";
import { Errorfound } from "../error404/Errorfound";

const MenuDetail = () => {
  const [Menuoptions, setMenuData] = useState(null); // Initialize as null or an empty object
  const [extractedNumber, setExtractedNumber] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState(1);

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
  useEffect(() => {
    
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
    }
}, []);
  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;

    setSelectedLanguage(newSelectedLanguage);

    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', newSelectedLanguage);

    // Reload the window after a brief delay to allow saving the selected language
      setTimeout(() => {
        if (newSelectedLanguage===1) {
          alert('Language changed to :English')
      
      } else if (newSelectedLanguage===2) {
          alert('Language changed to :Hindi')
      } else {
          
      }
          navigate('/')
      }, 500);
    }
  
  if (Menuoptions === null) {
    return <div></div>;
  }

  return (
    <div>
      <TopHeader selectedLanguage={selectedLanguage}
                        handleLanguageChange={handleLanguageChange} />
      <CmsDisplay />
      <div >
      <div className="container inner-sec">
        <h2>{Menuoptions.menuname}</h2>
  
        {getContent(
          Menuoptions.menu_id,
          Menuoptions.menu_url,
          Menuoptions.contenttype,
          Menuoptions.html,
          Menuoptions.file,
          Menuoptions.internal_link,
          Menuoptions.external_link
        )}
        
      </div>
      </div>
      <CmsFooter />
    </div>
  );
};

export default MenuDetail;
