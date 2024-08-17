import React, { useState, useEffect } from 'react';
import Table from './Table';
import usePagination from './usePagination';
import './App.css';

export default function App() {
  const [data, setData] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;

  const {
    currentPageNumber,
    dataToDisplay,
    totalPages,
    goOnPrevPage,
    goOnNextPage,
    renderPageNumbers,
  } = usePagination(data, TOTAL_VALUES_PER_PAGE);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  if (data.length === 0) return <div>Fetching Data...</div>;

  return (
    <div id="container">
      {/* This will call the Table Component to render the data */}
      <Table dataToDisplay={dataToDisplay} />
      <div id="btn-container">
        <button onClick={goOnPrevPage} disabled={currentPageNumber === 1}>
          Prev
        </button>

        {/* Render paginated page numbers */}
        {renderPageNumbers()}

        <button
          onClick={goOnNextPage}
          disabled={currentPageNumber === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
