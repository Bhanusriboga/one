import React from 'react';

import  { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './PaginationComponent.css'

const PaginationComponent = (paginationDetails) => {
    const { totalPages, currentPage, onPageChange } = paginationDetails
  const [visibleLinks, setVisibleLinks] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setVisibleLinks(3);
      } else if (window.innerWidth < 768) {
        setVisibleLinks(5);
      } else {
        setVisibleLinks(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisiblePageNumbers = () => {
    const halfVisiblePages = Math.floor(visibleLinks / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(currentPage + halfVisiblePages, totalPages);

    if (endPage - startPage < visibleLinks - 1) {
      if (currentPage <= halfVisiblePages) {
        endPage = Math.min(startPage + visibleLinks - 1, totalPages);
      } else {
        startPage = Math.max(endPage - visibleLinks + 1, 1);
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <Pagination aria-label="Page navigation example" className="pagination-custom">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => onPageChange(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => onPageChange(currentPage - 1)} />
      </PaginationItem>
      {visiblePageNumbers.map((pageNumber) => (
        <PaginationItem active={pageNumber === currentPage} key={pageNumber}>
          <PaginationLink onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => onPageChange(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => onPageChange(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
