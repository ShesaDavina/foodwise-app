import React from 'react';

function PaginationComp({ meta, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= meta.last_page; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center gap-2 mt-6">
            <button 
                disabled={meta.current_page === 1}
                onClick={() => onPageChange(meta.current_page - 1)}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
            >
                ←
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded border ${
                        meta.current_page === page 
                            ? 'bg-[#2F5D56] text-white' 
                            : 'hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}
            
            <button 
                disabled={meta.current_page === meta.last_page}
                onClick={() => onPageChange(meta.current_page + 1)}
                className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
            >
                →
            </button>
        </div>
    );
}

export default PaginationComp;