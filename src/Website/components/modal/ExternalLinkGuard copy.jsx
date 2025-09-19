import React, { useState, useCallback } from "react";

// Checks if href is an http(s) URL
const isHttpLink = (href) =>
  href && (href.startsWith("http://") || href.startsWith("https://"));

// Determines if the link is external
const isExternal = (href) => {
  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
};

export default function ExternalLinkGuard({
  children,
  openInNewTab = true, // "_blank" by default
  className,
  style,
  message = "You are about to proceed to an external website. Click Yes to proceed.",
}) {
  const [show, setShow] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  // Delegated onClick: handles all anchor tags within the wrapper
  const handleWrapperClick = useCallback((e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!isHttpLink(href)) return;

    if (isExternal(href)) {
      e.preventDefault();
      setPendingUrl(href);
      setShow(true);
    }
  }, []);

  const proceed = () => {
    if (openInNewTab) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(pendingUrl);
    }
    setShow(false);
    setPendingUrl("");
  };

  const cancel = () => {
    setShow(false);
    setPendingUrl("");
  };

  // --- Minimal modal styles ---
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: show ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };
  const box = {
    background: "#fff",
    width: 420,
    maxWidth: "90vw",
    borderRadius: 8,
    padding: "20px 24px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  };
  const btnRow = { marginTop: 16, display: "flex", gap: 12, justifyContent: "center" };
  const yesBtn = {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  };
  const noBtn = {
    background: "#ff9b9b",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <>
      <div onClick={handleWrapperClick} className={className} style={style}>
        {children}
      </div>

      {show && (
        <div style={overlay} role="dialog" aria-modal="true" aria-label="External link confirmation">
          <div style={box}>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{message}</p>
            <div style={btnRow}>
              <button style={yesBtn} onClick={proceed}>Yes</button>
              <button style={noBtn} onClick={cancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
