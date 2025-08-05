
// MenuDetail.jsx
import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const MenuDetail = ({ html }) => {
  const containerRef = useRef(null);
  const processedLinks = useRef(new Set()); // ✅ cache

  useEffect(() => {
    const enhanceLinks = async () => {
      const container = containerRef.current;
      if (!container) return;

      const anchors = container.querySelectorAll('a[href]');

      anchors.forEach(async anchor => {
        const href = anchor.getAttribute('href');

        // ✅ only target file links
        if (!href || !href.includes('/allfile/')) return;

        // ✅ skip already processed links
        if (processedLinks.current.has(href)) return;

        // ✅ avoid duplicate span
        if (anchor.nextSibling?.classList?.contains('file-meta-span')) return;

        try {
          const res = await axios.get('http://localhost:5141/api/FileMeta', {
            params: { url: href }
          });

          const { type, size } = res.data;

          const span = document.createElement('span');
          span.className = 'file-meta-span'; // ✅ for idempotent detection
          span.style.color = 'gray';
          span.style.fontSize = '0.9em';
          span.style.marginLeft = '5px';
          span.innerText = `(${type.toUpperCase()} • ${size})`;

          // ✅ insert AFTER the anchor tag
          anchor.parentNode.insertBefore(span, anchor.nextSibling);

          // ✅ mark as processed
          processedLinks.current.add(href);
        } catch (err) {
          console.warn(`⚠️ Failed for ${href}:`, err.message);
        }
      });
    };

    if (html) {
      enhanceLinks();
    }
  }, [html]);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default MenuDetail;



























































