import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Pagination.Prev>
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Pagination.Next>
    </Pagination>
  );
};

export default Paginate;
