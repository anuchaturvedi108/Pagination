import { useState, useEffect } from 'react';

function usePagination(data, itemsPerPage) {
  //data = api response , itemsPerPage = 10
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);

  useEffect(() => {
    const start = (currentPageNumber - 1) * itemsPerPage;
    const end = currentPageNumber * itemsPerPage;
    setDataToDisplay(data.slice(start, end));
  }, [currentPageNumber, data, itemsPerPage]);

  const goOnPrevPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber((prev) => prev - 1);
    }
  };

  const goOnNextPage = () => {
    // Math.ceil return smallest integer greater than or equal to its numeric argument
    if (currentPageNumber < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPageNumber((prev) => prev + 1);
    }
  };

  const handleSelectChange = (e) => {
    setCurrentPageNumber(Number(e.target.value));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    // Math.ceil return largest integer greater than or equal to its numeric argument
    const halfRange = Math.floor(maxVisiblePages / 2);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    let startPage = Math.max(1, currentPageNumber - halfRange);
    let endPage = Math.min(totalPages, currentPageNumber + halfRange);

    if (currentPageNumber <= halfRange) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPageNumber + halfRange >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    // Add the start of the pagination
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handleSelectChange({ target: { value: 1 } })}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    // Add the visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleSelectChange({ target: { value: i } })}
          className={currentPageNumber === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    // Add the end of the pagination
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handleSelectChange({ target: { value: totalPages } })}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return {
    currentPageNumber,
    dataToDisplay,
    totalPages: Math.ceil(data.length / itemsPerPage),
    goOnPrevPage,
    goOnNextPage,
    renderPageNumbers,
  };
}

export default usePagination;
