import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 11) {
      // Show all pages if 11 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        // Start range
        for (let i = 1; i <= 10; i++) {
          pages.push(i);
        }
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - 5) {
        // End range
        pages.push(1, "...");
        for (let i = totalPages - 9; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle range
        pages.push(1, "...");
        for (let i = currentPage - 4; i <= currentPage + 4; i++) {
          pages.push(i);
        }
        pages.push("...", totalPages);
      }
    }

    return pages;
  };

  const pagesToRender = generatePages();

  const handleClick = (page: number | "...") => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1  text-white disabled:opacity-50"
      >
        Prev
      </button>

      {pagesToRender.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          disabled={page === "..."}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-[#2BD17E] text-white"
              : "bg-[#224957] text-white hover:bg-[#1b3b42]"
          } ${page === "..." ? "cursor-default opacity-60" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1  text-white  disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
