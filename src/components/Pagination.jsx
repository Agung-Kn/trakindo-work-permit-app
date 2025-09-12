import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 2 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between px-4 py-3 sm:px-6 gap-2 sm:gap-0">
      {/* Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
        <div>
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{start}</span> to{' '}
            <span className="font-medium">{end}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md border border-gray-300">
            {/* Previous */}
            <button
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md border-l border-gray-300 bg-white px-2 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            {/* Page numbers */}
            {pages.map((page, idx) =>
              page === '...' ? (
                <span
                  key={idx}
                  className="relative inline-flex items-center border-l border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={idx}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center border-l border-gray-300 px-4 py-2 text-sm font-medium focus:z-20 ${
                    page === currentPage
                      ? 'z-10 bg-indigo-500 text-white border-indigo-500'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Next */}
            <button
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md border-l border-gray-300 bg-white px-2 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
