import { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify"; // XSS protection

const ExtrenalGuardLinkCMS = ({ htmlContent }) => {
  const containerRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // remove old listeners first (cleanup)
    const oldLinks = container.querySelectorAll("a");
    oldLinks.forEach((link) => {
      link.removeEventListener("click", handleClick);
    });

    // attach new listeners
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [htmlContent]);

  // ✅ Detect external links
  const isExternal = (url) => {
    try {
      const linkUrl = new URL(url, window.location.origin);
      return linkUrl.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  // Intercept click
  const handleClick = (e) => {
    const url = e.currentTarget.getAttribute("href");

    // only guard external links
    if (url && isExternal(url)) {
      e.preventDefault();
      setPendingUrl(url);
      setModalOpen(true);
    }
  };

  const handleConfirm = () => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setModalOpen(false);
    setPendingUrl(null);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setPendingUrl(null);
  };

  return (
    <div>
      {/* Render CMS HTML */}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(htmlContent || ""),
        }}
      />

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${modalOpen ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!modalOpen}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">Leaving Our Site</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                You are about to visit an external site:
                <br />
                <strong>{pendingUrl}</strong>
              </p>
              <p className="text-muted small">
                We are not responsible for the content on external websites.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCancel}>
                No, Stay Here
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for Bootstrap modal */}
      {modalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ExtrenalGuardLinkCMS;
