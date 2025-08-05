// FontSizeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Default font size in percentage
  // const minFontSize = 10;
  // const maxFontSize = 30;

  // const increaseFontSize = () => {
  //   if (fontSize < maxFontSize) {
  //     setFontSize((prevSize) => Math.min(prevSize + 2, maxFontSize));
  //   }
  // };

  // const decreaseFontSize = () => {
  //   if (fontSize > minFontSize) {
  //     setFontSize((prevSize) => Math.max(prevSize - 2, minFontSize));
  //   }
  // };

  // const resetFontSize = () => {
  //   setFontSize(14); // Set to your initial font size
  // };

const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);


  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  return useContext(FontSizeContext);
};


