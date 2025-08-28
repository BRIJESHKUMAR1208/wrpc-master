import React, { useState, useEffect } from "react";
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

const CategoryCard = ({ icon, title, description, onClick, className }) => (
  <Card
    className={`h-100 shadow-sm border-0 rounded-3 category-card ${className || ""}`}
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

  


// Validation function
const validateForm = () => {
  let newErrors = {};
  if (!formData.name.trim()) newErrors.name = "Name is required.";
  if (!formData.email.trim()) newErrors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Invalid email format.";
  if (!formData.message.trim())
    newErrors.message = "Message cannot be empty.";
  return newErrors;
};

// Final submit handler
const handleFormSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setSubmitted(true);

  // यहां आप actual API call कर सकते हैं (अभी console.log demo)
  console.log("Ticket Submitted:", formData);

  // 2 sec बाद success msg hide और form reset
  setTimeout(() => {
    setShowTicketForm(false); // form बंद
    setShowContact(false);    // पूरा offcanvas बंद
    setSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
  }, 2000);
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
          <h4 className="mt-4">Accessibility Support</h4>
          <p>
            Visitors can enlarge text size, change contrast themes, and navigate the site using standard keyboard shortcuts for better accessibility. For further assistance,
            please contact the WRPC web team.
          </p>
        </Col>
      </Row>

      {/* Search */}
      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={18} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search help topics, FAQs, or guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search Help"
            />
          </InputGroup>
        </Col>
      </Row>

      {/* Categories */}
      <Row xs={1} md={3} className="g-4 mb-5">
        <Col>
          <CategoryCard
            icon={<i className="bi bi-book"></i>}
            title="Getting Started"
            description="Introductory guides & first steps."
            onClick={() => alert("Navigate to Getting Started")}
          />
        </Col>
        <Col>
          <CategoryCard
            icon={<i className="bi bi-file-earmark-text"></i>}
            title="Policies & Formats"
            description="Usage policies, file formats, compliance info."
            onClick={() => alert("Navigate to Policies")}
          />
        </Col>
        <Col>
          <CategoryCard
            icon={<i className="bi bi-download"></i>}
            title="Downloads"
            description="Forms, PDFs, and media with type & size info."
            onClick={() => alert("Navigate to Downloads")}
          />
        </Col>
        <Col>
          <CategoryCard
            icon={<i className="bi bi-tools"></i>}
            title="Troubleshooting"
            description="Common issues and quick fixes."
            onClick={() => alert("Navigate to Troubleshooting")}
          />
        </Col>
        <Col>
          <CategoryCard
            icon={<i className="bi bi-play-circle"></i>}
            title="Tutorials"
            description="Step-by-step guides and video help."
            onClick={() => alert("Navigate to Tutorials")}
          />
        </Col>
        <Col>
          <CategoryCard
            icon={<i className="bi bi-question-circle"></i>}
            title="FAQs"
            description="Most frequently asked questions."
            onClick={() => alert("Navigate to FAQs")}
          />
        </Col>
      </Row>

      {/* FAQs */}
      <Row className="mb-5">
        <Col md={{ span: 8, offset: 2 }}>
          <h4 className="mb-3">Popular FAQs</h4>
          {filteredFaqs.length === 0 && <Alert variant="info">No results found. Try a different keyword.</Alert>}
          <Accordion alwaysOpen className="faq-accordion" flush>
            {filteredFaqs.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{item.q}</Accordion.Header>
                <Accordion.Body>{item.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>

      {/* Floating Contact Button */}
      <Button
        variant="primary"
        className="contact-float-btn position-fixed bottom-0 end-0 m-4 rounded-circle p-3 shadow-lg"
        onClick={() => setShowContact(true)}
        aria-label="Contact Support"
      >
        Help Support
        <MessageCircle size={24} />
      </Button>

      {/* Contact Offcanvas */}
      <Offcanvas show={showContact} onHide={() => setShowContact(false)} placement="end" aria-label="Contact & Support Panel">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Contact & Support</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!showTicketForm ? (
            <>
              <p>
                📩 <strong>Email:</strong>{" "}
                <a href="mailto:support@wrpc.gov.in" target="_blank" rel="noopener noreferrer">
                  support@wrpc.gov.in
                </a>
              </p>
              <p>
                📞 <strong>Helpline:</strong> 1800-XXXX-XXX
              </p>
              <Button variant="success" className="w-100 mb-2" onClick={() => setShowTicketForm(true)}>
                Raise a Ticket
              </Button>
              
            </>
          ) : (
            <Form onSubmit={handleFormSubmit}>
  <h5 className="mb-3">Raise a Support Ticket</h5>

  <Form.Group className="mb-3">
    <Form.Label>Name *</Form.Label>
    <Form.Control
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      isInvalid={!!errors.name}
    />
    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Email *</Form.Label>
    <Form.Control
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      isInvalid={!!errors.email}
    />
    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Message *</Form.Label>
    <Form.Control
      as="textarea"
      rows={4}
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      isInvalid={!!errors.message}
    />
    <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
  </Form.Group>

  {submitted && (
    <Alert variant="success" className="mt-3">
      Ticket submitted successfully!
    </Alert>
  )}

  <div className="d-flex justify-content-between">
    <Button variant="secondary" onClick={() => setShowTicketForm(false)}>
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
    </>
  );
}