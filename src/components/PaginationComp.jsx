import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function PaginationComp({totalPosts, postsPerPage, currentPage, setCurrentPage}) {
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const pageNumbers = [1, 2, 3, 4, 5];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  //   }

  return (
    <div className="flex justify-center mt-5 mb-5">
      <div className="flex items-center gap-4 bg-[#FFF2E1] px-6 py-3 rounded-2xl shadow-sm">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center bg-[#F59E0B] text-black rounded-full hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuChevronLeft size={20} strokeWidth={3} />
        </button>
        <div className="flex items-center gap-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200
                ${
                  currentPage === number
                    ? "bg-[#2F5D56] text-white scale-110 shadow-md"
                    : "text-gray-700 hover:bg-[#2F5D56] hover:text-white"
                }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-[#F59E0B] text-black rounded-full hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LuChevronRight size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
