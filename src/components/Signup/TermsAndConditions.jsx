import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';

const TermsAndConditions = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            className="pdf-page"
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={1.4} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};

TermsAndConditions.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default TermsAndConditions;