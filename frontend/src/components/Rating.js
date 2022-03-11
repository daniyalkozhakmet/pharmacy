import React from "react";

const Rating = ({ rating, numReviews }) => {
  var color = "yellow";
  return (
    <div>
      <i
        style={{ color }}
        className={
          rating >= 1
            ? "fas fa-star"
            : rating >= 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          rating >= 2
            ? "fas fa-star"
            : rating >= 1.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          rating >= 3
            ? "fas fa-star"
            : rating >= 2.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          rating >= 4
            ? "fas fa-star"
            : rating >= 3.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        style={{ color }}
        className={
          rating >= 5
            ? "fas fa-star"
            : rating >= 4.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      {numReviews && (
        <p style={{ marginLeft: "5px", display: "inline-block" }}>
          {numReviews} reviews
        </p>
      )}
    </div>
  );
};

export default Rating;
