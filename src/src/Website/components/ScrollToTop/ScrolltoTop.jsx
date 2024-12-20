import React, { useEffect, useState } from "react";

const ScrolltoTop = () => {
  const [isVisable, setIsVisable] = useState(false);
  const toggle = () => {
    if (window.pageYOffset > 0) {
      setIsVisable(true);
    } else {
      setIsVisable(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggle);
    return () => {
      window.removeEventListener("scroll", toggle);
    };
  }, []);
  return (
    <div>
     <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center active"><i
				class="fa-solid fa-arrow-up"></i></a>
    </div>
  );
};

export default ScrolltoTop;
