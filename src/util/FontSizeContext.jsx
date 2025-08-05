// FontSizeContext.js
import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(100); // Default font size in percentage
  const minFontSize = 15;
  const maxFontSize = 300;

  const increaseFontSize = () => {
    if (fontSize < maxFontSize) {
      setFontSize((prevSize) => Math.min(prevSize + 2, maxFontSize));
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > minFontSize) {
      setFontSize((prevSize) => Math.max(prevSize - 2, minFontSize));
    }
  };

  const resetFontSize = () => {
    setFontSize(100); // Set to your initial font size
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  return useContext(FontSizeContext);
};
