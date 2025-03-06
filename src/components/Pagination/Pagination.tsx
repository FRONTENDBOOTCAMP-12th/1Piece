import S from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange = () => undefined,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const maxVisiblePages = 5; // 최대 표시할 페이지 개수

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handlePreviousPage = () =>
    handlePageChange(Math.max(currentPage - 1, 1));
  const handleNextPage = () =>
    handlePageChange(Math.min(currentPage + 1, totalPages));
  const handleLastPage = () => handlePageChange(totalPages);

  // 현재 페이지를 기준으로 앞뒤로 maxVisiblePages만큼 보여줌
  const half = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - half, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // 끝 부분에서 startPage 조정 (예: 마지막 페이지 부근)
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className={S.paginationContainer}>
      <ul className={S.pagination}>
        <li>
          <button
            className={S.navButton}
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          >
            {'<<'}
          </button>
        </li>
        <li>
          <button
            className={S.navButton}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
          >
            {'<'}
          </button>
        </li>

        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`${S.pageButton} ${currentPage === page ? S.activePage : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            className={S.navButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </li>
        <li>
          <button
            className={S.navButton}
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
