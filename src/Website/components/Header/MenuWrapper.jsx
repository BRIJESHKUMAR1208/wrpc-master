import React, { useEffect, useState } from 'react';
import MenuDetail from './MenuDetail';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { getContent } from "./getContent";
import CmsDisplay from "./CmsDisplay";
import { CmsFooter } from "../Footer/CmsFooter";
import { useLocation } from "react-router-dom";
import { TopHeader } from "../TopHeader/TopHeader";

const MenuWrapper = () => {
  const [html, setHtml] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [Menuoptions, setMenuData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  // ✅ Always call hooks at top level
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const numberMatch = id?.match(/\d+/);
    if (!numberMatch) return;
    axios
      .get('http://localhost:5141/api/TopMenu/' + parseInt(numberMatch[0]))
      .then(res => {
        console.log("✅ API Response:", res.data);
        setHtml(res.data.html);
        setMenuData(res.data); // ✅ You were missing this
      })
      .catch(err => console.error("❌ API Error:", err));
  }, [id]);

  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;
    setSelectedLanguage(newSelectedLanguage);
    localStorage.setItem('selectedLanguage', newSelectedLanguage);
    setTimeout(() => {
      if (newSelectedLanguage === '1') {
        alert('Language changed to: English');
      } else if (newSelectedLanguage === '2') {
        alert('Language changed to: Hindi');
      }
      navigate('/');
    }, 500);
  };

  if (!html || !Menuoptions) return <p>Loading...</p>;

  return (
    <div>
      <TopHeader
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />
      <CmsDisplay />
      <div>
        <div className="container inner-sec main-sec">
          <div className="box-sec">
          <MenuDetail html={html} />
          </div>
        </div>
        
        <CmsFooter />
      </div>
    </div>
  );
};

export default MenuWrapper;
