import React from "react";

const SkipToContent = ({ targetId = "main-content" }) => {
  return (
    <a href={`#${targetId}`} className="skip-to-content">
      Skip to main content
    </a>
  );
};

export default SkipToContent;