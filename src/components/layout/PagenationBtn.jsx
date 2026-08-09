import React from 'react'

function PagenationBtn({currentPage,setCurrentPage,totalPages}) {
    return (
        <div className="mt-7 flex items-center justify-center gap-3">

            <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                ← Prev
            </button>


            <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Page {currentPage + 1} of {totalPages || 1}
            </div>


            <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next →
            </button>

        </div>
    )
}

export default PagenationBtn