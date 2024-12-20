// FontSizeContext.js
import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(15);
  const minFontSize = 10;
  const maxFontSize = 30;

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
    setFontSize(16); // Set to your initial font size
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
