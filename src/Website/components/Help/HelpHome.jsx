import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Form,
  InputGroup,
  Button,
  Alert,
  Offcanvas,
  Breadcrumb,
} from "react-bootstrap";
import { Search, Globe, Contrast, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TopHeader } from "../../components/TopHeader/TopHeader";
import CmsDisplay from "../../components/Header/CmsDisplay";
import { CmsFooter } from "../../components/Footer/CmsFooter";
import "./HelpHome.css";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api.json";
import apiClient from "../../../Api/ApiClient";

// External link modal component styled as your image
function ExternalLinkModal({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "rgba(0,0,0,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff", // amber color
          color: "#111",
          borderRadius: 4,
          minWidth: 380,
          maxWidth: 460,
          padding: "30px 8px 22px 8px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 28, fontSize: 17 }}>
          You are about to proceed to an external website. Click Yes to proceed.
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
          <button
            style={{
              background: "#111",
              color: "#fff",
              borderRadius: 3,
              border: "none",
              padding: "8px 32px",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={onConfirm}
            autoFocus
          >
            Yes
          </button>
          <button
            style={{
              background: "#f88",
              color: "#fff",
              borderRadius: 3,
              border: "none",
              padding: "8px 32px",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

const CategoryCard = ({ icon, title, description, onClick, className }) => (
  <Card
    className={`h-100 shadow-sm border-0 rounded-3 category-card ${
      className || ""
    }`}
    role="button"
    onClick={onClick}
  >
    <Card.Body>
      <div className="d-flex align-items-center mb-2">
        {icon}
        <Card.Title className="ms-2">{title}</Card.Title>
      </div>
      <Card.Text className="text-muted">{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default function HelpHome() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const faqs = [
    {
      q: "How can I download forms?",
      a: "Go to Downloads → Forms. All documents show file type & size before download.",
    },
    { q: "Is the site available in Hindi?", a: "Yes. Use the 🌐 Language toggle in the header." },
    {
      q: "How to raise a help ticket?",
      a: "Click on Contact → 'Raise a Ticket' button. Fill details & submit.",
    },
  ];

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

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  );

  // External link modal logic
  const [showModal, setShowModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const linkAttemptRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector(".help-container");
    if (!container) return;

    function handleLinkClick(e) {
      let anchor = e.target.closest("a");
      if (
        anchor &&
        anchor.getAttribute("target") === "_blank" &&
        anchor.href &&
        !anchor.href.includes(window.location.hostname)
      ) {
        e.preventDefault();
        setExternalUrl(anchor.href);
        setShowModal(true);
        linkAttemptRef.current = anchor;
      }
    }
    container.addEventListener("click", handleLinkClick);
    return () => container.removeEventListener("click", handleLinkClick);
  }, []);

  function handleConfirm() {
    window.open(externalUrl, "_blank", "noopener,noreferrer");
    setShowModal(false);
    setExternalUrl("");
    linkAttemptRef.current = null;
  }

  function handleCancel() {
    setShowModal(false);
    setExternalUrl("");
    linkAttemptRef.current = null;
  }

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  // Final submit handler with API POST request
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Prepare data for POST
    const postData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      type: "help",
    };

    try {
      // const response = await fetch("http://localhost:5141/api/Feedback", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(postData),
      // });

        const response = await apiClient.post(api.Help, postData
              , {
                headers: {
                  "Content-Type": "application/json"
                }
              });

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowTicketForm(false);
          setShowContact(false);
          setSubmitted(false);
        }, 2000);
      } else {
        setSubmitError("Failed to submit ticket. Please try again.");
      }
    } catch (error) {
      setSubmitError("Error submitting ticket. Please try again.");
    }
  };

  return (
    <>
      <TopHeader
        selectedLanguage={selectedLanguage}
        handleLanguageChange={handleLanguageChange}
      />
      <CmsDisplay selectedLanguage={selectedLanguage} />

      <Container fluid className="p-4 help-container">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h2 className="mb-3">Help</h2>
            <p>
              The WRPC website provides information in multiple file formats (such as PDF, Word, Excel, and HTML). To view these documents correctly, your system must have the
              required software or plug-ins installed. In case you do not have the necessary software, you can download it for free from the internet. The table below shows the
              commonly used file formats and their respective viewer applications.
            </p>
            <h4 className="mt-4">Viewing Information in Various File Formats</h4>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Document Type</th>
                    <th>Required Plug-in / Viewer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Portable Document Format (PDF) files</td>
                    <td>Adobe Acrobat Reader</td>
                  </tr>
                  <tr>
                    <td>Word files</td>
                    <td>Microsoft Word Viewer / Office Compatibility Pack</td>
                  </tr>
                  <tr>
                    <td>Excel files</td>
                    <td>Microsoft Excel Viewer / Office Compatibility Pack</td>
                  </tr>
                  <tr>
                    <td>PowerPoint presentations</td>
                    <td>Microsoft PowerPoint Viewer / Office Compatibility Pack</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="mt-4">Screen Reader Access</h4>
            <p>
              This website complies with the Guidelines for Indian Government Websites (GIGW) and is accessible to users with visual impairments. The portal supports access
              through various Screen Readers and Assistive Technologies.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Screen Reader</th>
                    <th>Website</th>
                    <th>Free / Commercial</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Non Visual Desktop Access (NVDA)</td>
                    <td>
                      <a href="https://www.nvaccess.org/" target="_blank" rel="noopener noreferrer">
                        www.nvaccess.org
                      </a>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>System Access To Go</td>
                    <td>
                      <a href="http://www.satogo.com/" target="_blank" rel="noopener noreferrer">
                        www.satogo.com
                      </a>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>Thunder</td>
                    <td>
                      <a href="http://www.screenreader.net/" target="_blank" rel="noopener noreferrer">
                        www.screenreader.net
                      </a>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>WebAnywhere</td>
                    <td>
                      <a href="http://webanywhere.cs.washington.edu/wa.php" target="_blank" rel="noopener noreferrer">
                        webanywhere.cs.washington.edu
                      </a>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td>JAWS</td>
                    <td>
                      <a href="http://www.freedomscientific.com" target="_blank" rel="noopener noreferrer">
                        www.freedomscientific.com
                      </a>
                    </td>
                    <td>Commercial</td>
                  </tr>
                  <tr>
                    <td>Supernova</td>
                    <td>
                      <a href="http://www.yourdolphin.co.uk/productdetail.asp?id=1" target="_blank" rel="noopener noreferrer">
                        yourdolphin.co.uk
                      </a>
                    </td>
                    <td>Commercial</td>
                  </tr>
                  <tr>
                    <td>Window-Eyes</td>
                    <td>N/A</td>
                    <td>Commercial</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        <Button
          variant="primary"
          className="contact-float-btn position-fixed bottom-0 end-0 m-4 rounded-circle p-3 shadow-lg"
          onClick={() => setShowContact(true)}
          aria-label="Contact Support"
        >
          Help Support
          <MessageCircle size={24} />
        </Button>

        <Offcanvas
          show={showContact}
          onHide={() => {
            setShowContact(false);
            setShowTicketForm(false);
            setErrors({});
            setSubmitted(false);
            setSubmitError(null);
            setFormData({ name: "", email: "", message: "" });
          }}
          placement="end"
          aria-label="Contact & Support Panel"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Contact & Support</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {!showTicketForm ? (
              <>
                <p>
                  📩 <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@wrpc.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    support@wrpc.gov.in
                  </a>
                </p>
                <p>
                  📞 <strong>Helpline:</strong> 1800-XXXX-XXX
                </p>
                <Button
                  variant="success"
                  className="w-100 mb-2"
                  onClick={() => setShowTicketForm(true)}
                >
                  Raise a Ticket
                </Button>
              </>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <h5 className="mb-3">Raise a Support Ticket</h5>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {submitError && (
                  <Alert variant="danger" className="mb-3">
                    {submitError}
                  </Alert>
                )}

                {submitted && (
                  <Alert variant="success" className="mt-3">
                    Ticket submitted successfully!
                  </Alert>
                )}

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowTicketForm(false);
                      setErrors({});
                      setSubmitError(null);
                    }}
                  >
                    Back
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
      <CmsFooter />
      <ExternalLinkModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}