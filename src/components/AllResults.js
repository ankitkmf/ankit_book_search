import React from "react";
import SearchResult from "./SearchResult";
import PropTypes from "prop-types";

const AllResults = ({ books,getSingleBook }) => {
  return (
    <div className="row allResult">
      {books.map(book => (
        <SearchResult bookData={book} key={book.id} getSingleBook={getSingleBook} />
      ))}
    </div>
  );
};

AllResults.propTypes = {
  books: PropTypes.array
};

export default AllResults;
