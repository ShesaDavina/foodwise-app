import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function PaginationComp({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  // Generate page numbers dengan ellipsis untuk halaman yang banyak
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page) => {
    if (page === '...') return;
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;
    console.log('Changing to page:', page); // Debug
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-5 mb-5">
      <div className="flex items-center gap-4 bg-[#FFF2E1] px-6 py-3 rounded-2xl shadow-sm">
        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center bg-[#F59E0B] text-black rounded-full hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuChevronLeft size={20} strokeWidth={3} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((number, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(number)}
              disabled={number === '...'}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200
                ${currentPage === number
                  ? "bg-[#2F5D56] text-white scale-110 shadow-md"
                  : number === '...'
                    ? "cursor-default hover:bg-transparent"
                    : "text-gray-700 hover:bg-[#2F5D56] hover:text-white cursor-pointer"
                }`}
            >
              {number}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-[#F59E0B] text-black rounded-full hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}