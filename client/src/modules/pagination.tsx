import React from "react";
import '../styles/pagination.css';

/* Note: Had to remove first page and last page buttons because using the last page button would cycle through all the pages and break the api limit of 100 uses. */

interface PaginationProps {
  totalResults: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationElement: React.FC<PaginationProps> = ({
  totalResults, 
  currentPage, 
  onPageChange
}) => {
  
  let totalPages = Math.ceil(totalResults / 25);

  return (
    <div id="pagination">
      {/* <button
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      >
        First Page
      </button> */}

      <button 
        id='prev' 
        className="btn"
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous Page
      </button>

      <p id="page-index">Page {currentPage} of {totalPages}</p>

      <button 
        id="next" 
        className="btn"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>

      {/* <button
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      >
        Last Page
      </button> */}
    </div>
  );
};

export default PaginationElement;
