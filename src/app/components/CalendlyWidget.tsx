'use client';

import React, { useEffect, useRef } from 'react';

export function CalendlyWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Only load on client side to prevent hydration issues
    if (typeof window !== 'undefined' && !scriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;

      // Add the script to the document
      document.head.appendChild(script);

      scriptLoaded.current = true;

      // Cleanup function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        scriptLoaded.current = false;
      };
    }
  }, []);

  useEffect(() => {
    // Hide Calendly header after widget loads
    const hideHeader = () => {
      const calendlyWidget = document.querySelector('.calendly-inline-widget iframe');
      if (calendlyWidget) {
        const iframe = calendlyWidget as HTMLIFrameElement;
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const header = iframeDoc.querySelector('.calendly-header, [class*="header"], header');
            if (header) {
              (header as HTMLElement).style.display = 'none';
            }
          }
        } catch (e) {
          // Cross-origin restrictions may prevent direct access
          console.log('Cannot access iframe content due to cross-origin policy');
        }
      }
    };

    // Try to hide header after widget loads
    const timer = setTimeout(hideHeader, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        data-url="https://calendly.com/shaikh_rashid_alnuaimi_advocates?hide_event_type_details=1&hide_gdpr_banner=1"
        style={{
          width: '100%',
          height: '600px',
          minHeight: '500px',
          border: 'none',
          overflow: 'hidden'
        }}
      ></div>
      <style jsx global>{`
        .calendly-inline-widget iframe {
          border: none !important;
        }
        .calendly-powered-by-banner,
        .calendly-powered-by {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
