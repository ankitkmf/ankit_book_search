import React from "react";
import ReactHtmlParser from "react-html-parser";
import StarRatings from 'react-star-ratings';

const SingleResult = ({ books, resetView }) => {
    console.log("SingleResult");
    books = books.length === 0 ? books : books[0];
    var displayTitle = "";
    if (books.title)
        displayTitle = books.title.replace("<![CDATA[", "").replace("]]>", "");
    else if (books.work && books.work.original_title) {
        displayTitle = books.work.original_title.replace("<![CDATA[", "").replace("]]>", "");
    }
    else
        displayTitle = "...";

    var description = (books.description) ? books.description.replace("<![CDATA[", "").replace("]]>", "").replace("<br/>", "") : "";

    return (
        <React.Fragment>
            <div className="row col-lg-12">
                <div className="row col-lg-2">
                    <div>
                        <button className="btn btn-primary" onClick={() => resetView()}>Back</button>
                    </div>
                </div>
                <div className="row col-lg-8">
                    <img
                        className="img-responsive singleResult"
                        src={books.image_url}
                        alt="Book cover"
                    />
                </div>
                <div className="row col-lg-2">
                </div>
            </div>
            <div className="row col-lg-12">
                <h3 className="col-lg-12 heading">{displayTitle}</h3>
            </div>
            <div className="row col-lg-12">
                <div id="divDescription" className="description">
                    {ReactHtmlParser(description)}
                </div>
            </div>
            <div className="row col-lg-12">
                <h5>Average rating:</h5>               
                {!isNaN(books.average_rating) ?
                    <StarRatings
                        rating={parseFloat(books.average_rating)}
                        starDimension="40px"
                        starSpacing="15px"
                        starRatedColor="black"
                    /> : ''
                }
            </div>
        </React.Fragment>
    );
};

export default SingleResult;