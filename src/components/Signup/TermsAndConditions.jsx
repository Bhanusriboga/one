// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import PropTypes from 'prop-types';
// import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';

// pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfWorker], { type: 'application/javascript' }));

// const TermsAndConditions = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div style={{ overflow: 'auto' }}>
//       <Document
//         file={pdfUrl}
//         onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={console.error}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page
//             className="pdf-page"
//             key={`page_${index + 1}`}
//             pageNumber={index + 1}
//             scale={1.4} 
//             renderTextLayer={false} 
//             renderAnnotationLayer={false}
//           />
//         ))}
//       </Document>
//     </div>
//   );
// };

// TermsAndConditions.propTypes = {
//   pdfUrl: PropTypes.string.isRequired,
// };

// export default TermsAndConditions;