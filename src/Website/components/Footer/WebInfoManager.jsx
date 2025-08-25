import React, { useState, useEffect } from "react";
import { TopHeader } from "../../components/TopHeader/TopHeader";
import CmsDisplay from "../../components/Header/CmsDisplay";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { useNavigate } from "react-router-dom";

const initialState = { name: "", email: "", message: "" };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function WebInfoManager() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ("name" in fieldValues) {
      const name = fieldValues.name.trim();
      if (!name) temp.name = "Name is required.";
      else if (name.length < 2) temp.name = "At least 2 characters.";
      else if (name.length > 80) temp.name = "Too long (max 80).";
      else temp.name = "";
    }

    if ("email" in fieldValues) {
      const email = fieldValues.email.trim();
      if (!email) temp.email = "Email is required.";
      else if (!emailRegex.test(email)) temp.email = "Invalid email address.";
      else temp.email = "";
    }

    if ("message" in fieldValues) {
      const msg = fieldValues.message.trim();
      if (!msg) temp.message = "Message is required.";
      else if (msg.length < 10) temp.message = "At least 10 characters.";
      else if (msg.length > 1000) temp.message = "Too long (max 1000).";
      else temp.message = "";
    }

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg({ type: "", text: "" });

    if (!validate()) {
      setSubmitMsg({ type: "danger", text: "⚠️ Please fix the errors above." });
      return;
    }

    try {
      setSubmitting(true);

      // TODO: Replace with actual API call
      await new Promise((r) => setTimeout(r, 1000));

      setValues(initialState);
      setErrors({});
      setSubmitMsg({
        type: "success",
        text: "✅ Thanks! Your feedback has been submitted.",
      });
    } catch (err) {
      setSubmitMsg({
        type: "danger",
        text: "❌ Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `form-control ${errors[field] ? "is-invalid" : values[field] ? "is-valid" : ""}`;

  return (
    <>
      <TopHeader
        selectedLanguage={selectedLanguage}
        handleLanguageChange={(e) => {
          const newLang = e.target.value;
          setSelectedLanguage(newLang);
          localStorage.setItem("selectedLanguage", newLang);
          window.location.reload();
          navigate("/");
        }}
      />
      <CmsDisplay selectedLanguage={selectedLanguage} />

      <div style={styles.wrapper}>
        {/* Contact Info */}
        <div style={styles.card}>
          <h2 style={styles.header}>Web Information Manager</h2>
          <div style={styles.content}>
            <p><strong>Name & Designation:</strong><br />
              Mr. Deepak Sharma<br />
              Assistant Secretary, WRPC
            </p>
            <p><strong>Address:</strong><br />
              Western Regional Power Committee, F-3, MIDC Area,<br />
              Marol, Opp. SEEPZ, Central Road,<br />
              Andheri (East), Mumbai - 400 093
            </p>
            <p><strong>Contact Details:</strong><br />
              Inter-com: +91 9711250509<br />
              Email: as-wrpc@nic.in
            </p>
          </div>
        </div>

       
      </div>

      <CmsFooter />
    </>
  );
}

// --- Styling ---
const styles = {
  wrapper: {
    width: "70%",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
    display: "grid",
    gap: "20px",
  },
  card: {
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    padding: "20px",
  },
  header: {
    backgroundColor: "#0074c2",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "18px",
    marginBottom: "15px",
  },
  content: {
    fontSize: "15px",
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  error: {
    fontSize: "13px",
    color: "red",
  },
  alert: {
    marginTop: "10px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#0074c2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
