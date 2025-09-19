import React, { useState, useCallback } from "react";
import ReusableModal from "../Header/ReusableModel";

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
  openInNewTab = true,
  className,
  style,
  message = "You are about to proceed to an external website. Click Yes to proceed.",
}) {
  const [show, setShow] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

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

  return (
    <>
      <div onClick={handleWrapperClick} className={className} style={style}>
        {children}
      </div>

      <ReusableModal
        show={show}
        onClose={cancel}
        onConfirm={proceed}
        title="Leaving Website"
        message={message}
        confirmText="Yes"
        cancelText="No"
      />
    </>
  );
}
