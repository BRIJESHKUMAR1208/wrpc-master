import React, { useEffect, useRef, useState } from 'react';
import apiClient from "../../../Api/ApiClient";
import apis from '../../../Api/api.json';
import './MenuDetail.css';
import ReusableModal from './ReusableModel.jsx'; // Apna reusable modal import karo

const MenuDetail = ({ html }) => {
  const containerRef = useRef(null);
  const processedLinks = useRef(new Set());

  const [showModal, setShowModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);

  const isExternal = (url) => {
    try {
      const linkUrl = new URL(url, window.location.origin);
      return linkUrl.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    processedLinks.current = new Set();

    const enhanceLinks = async () => {
      const container = containerRef.current;
      if (!container) return;

      const anchors = container.querySelectorAll("a[href]");

      anchors.forEach(async (anchor) => {
        const href = anchor.getAttribute("href");
        if (!href) return;

        if (isExternal(href)) {
          anchor.addEventListener("click", (e) => {
            e.preventDefault();
            setPendingUrl(href);
            setShowModal(true);
          });
        }

        if (href.includes("/allfile/")) {
          if (processedLinks.current.has(href)) return;
          if (anchor.nextSibling?.classList?.contains("file-meta-span")) return;

          try {
            const res = await apiClient.get(apis.filemetadata, {
              params: { url: href },
            });
            const { type, size } = res.data;

            const span = document.createElement("span");
            span.className = "file-meta-span";
            span.innerText = ` (${type.toUpperCase()} • ${size})`;

            anchor.parentNode.insertBefore(span, anchor.nextSibling);
            processedLinks.current.add(href);
          } catch (err) {
            console.warn(`⚠️ Failed for ${href}:`, err.message);
          }
        }
      });
    };

    if (html) {
      enhanceLinks();
    }
  }, [html]);

  const handleProceed = () => {
    if (pendingUrl) {
      window.open(pendingUrl, "_blank", "noopener,noreferrer");
    }
    setShowModal(false);
    setPendingUrl(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setPendingUrl(null);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="menu-detail-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ReusableModal
        show={showModal}
        onClose={handleClose}
        onConfirm={handleProceed}
        title="Leaving Website"
        message="You are about to proceed to an external website. Click Yes to proceed."
        confirmText="Yes"
        cancelText="No"
      />
    </>
  );
};

export default MenuDetail;
