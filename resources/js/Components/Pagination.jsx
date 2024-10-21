import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const renderPagination = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
          pages.push(
              <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`px-4 py-2 border rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              >
                  {i}
              </button>
          );
      }
      return (
          <div className="flex justify-center mt-4">
              {pages}
          </div>
      );
  };

  return renderPagination();
};

export default Pagination;