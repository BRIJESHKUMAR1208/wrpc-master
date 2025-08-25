import React, { useState, useEffect } from "react";
import { TopHeader } from "../../components/TopHeader/TopHeader";
import CmsDisplay from "../../components/Header/CmsDisplay";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import { useNavigate } from "react-router-dom";

const initialState = { name: "", email: "", message: "" };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function Feedback() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState({ type: "", text: "" });

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

  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(1);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (event) => {
    const newSelectedLanguage = event.target.value;
    setSelectedLanguage(newSelectedLanguage);
    localStorage.setItem("selectedLanguage", newSelectedLanguage);

    setTimeout(() => {
      if (newSelectedLanguage == 1) {
        alert("Language changed to: English");
      } else if (newSelectedLanguage == 2) {
        alert("Language changed to: Hindi");
      }
      window.location.reload();
      navigate("/");
    }, 500);
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
      setSubmitMsg({ type: "danger", text: "Please fix the errors above." });
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
        handleLanguageChange={handleLanguageChange}
      />
      <CmsDisplay selectedLanguage={selectedLanguage} />

      <div className="container py-5" style={{ maxWidth: 700 }}>
        <div className="card shadow-lg border-0 rounded-4 p-4">
          <h2 className="text-center mb-2">Feedback</h2>
          {submitMsg.text && (
            <div
              className={`alert alert-${submitMsg.type}`}
              role="alert"
              aria-live="polite"
            >
              {submitMsg.text}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Name <span className="text-danger">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={inputClass("name")}
                value={values.name}
                onChange={handleChange}
                maxLength={80}
                autoComplete="name"
                placeholder="Enter your full name"
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={inputClass("email")}
                value={values.email}
                onChange={handleChange}
                maxLength={120}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={inputClass("message")}
                value={values.message}
                onChange={handleChange}
                rows={5}
                minLength={10}
                maxLength={1000}
                placeholder="Write your feedback…"
                required
              />
              {errors.message && (
                <div className="invalid-feedback">{errors.message}</div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2 justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={submitting}
              >
                {submitting ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting…
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => {
                  setValues(initialState);
                  setErrors({});
                  setSubmitMsg({ type: "", text: "" });
                }}
                disabled={submitting}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <CmsFooter />
    </>
  );
}
