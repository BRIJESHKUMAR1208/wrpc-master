import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = (props) => {
  const [stateCaptcha, setStateCaptcha] = useState({
    isVerified: true,
  });
  const onChange = (value) => {
    setStateCaptcha({ isVerified: false });
    props.sendStateCaptcha(stateCaptcha.isVerified);
  };
  return (
    <>
      <ReCAPTCHA
        // sitekey="6LfZ15oeAAAAACW73gurOFlzw5XFcfKEEu8p3--C" //localHost
         sitekey="6LdGJv0UAAAAANIXdBiQEws9mxQTh7WcB7-JDEN3" //localHost   neeraj sir
        //sitekey="6LdE1poeAAAAAGZq1prYSAMDl_94g5DGqphuuJ_h" // server
        //sitekey="6LfGOiEiAAAAAL0Q4NwBt_kV0fvsNIHVihkeY4_C" // live server
        onChange={onChange}
      />
    </>
  );
};

export default Captcha;
