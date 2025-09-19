// MenuDetail.jsx
import React, { useEffect, useRef } from 'react';
import apiClient from "../../../Api/ApiClient";
import apis from '../../../Api/api.json';
import './MenuDetail.css';

const MenuDetail = ({ html }) => {
  const containerRef = useRef(null);
  const processedLinks = useRef(new Set());

  useEffect(() => {
    // Har nayi HTML load hone par cache reset karo
    processedLinks.current = new Set();

    const enhanceLinks = async () => {
      const container = containerRef.current;
      if (!container) return;

      const anchors = container.querySelectorAll('a[href]');

      for (const anchor of anchors) {
        const href = anchor.getAttribute('href');
        // Sirf file links process karo
        if (!href || !href.includes('/allfile/')) continue;
        // Already processed skip karo
        if (processedLinks.current.has(href)) continue;
        // Already span exist kare to skip karo
        if (anchor.nextSibling?.classList?.contains('file-meta-span')) continue;

        try {
          const res = await apiClient.get(apis.filemetadata, { params: { url: href } });
          const { type, size } = res.data;
          const span = document.createElement('span');
          span.className = 'file-meta-span';
          span.innerText = `(${type.toUpperCase()} • ${size})`;
          anchor.parentNode.insertBefore(span, anchor.nextSibling);
          processedLinks.current.add(href);
        } catch (err) {
          console.warn(`⚠️ Failed for ${href}:`, err.message);
        }
      }
    };

    if (html) {
      enhanceLinks();
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="menu-detail-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MenuDetail;