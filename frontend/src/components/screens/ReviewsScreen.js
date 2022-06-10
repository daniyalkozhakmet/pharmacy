import React from "react";
import Rating from "../Rating";
import { ListGroup } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import Moment from "react-moment";
const ReviewsScreen = ({ review }) => {
  return (
    <div>
      
        {review && review.length !== 0 &&
        <ListGroup variant="flush">
        <h3>Бағалау</h3>
          {review.map((review) => 
            <ListGroup.Item key={review._id}>
                <p style={{padding:'0',margin:'0'}}>{review.name}</p>
                <Rating rating={review.rating}/>
                <Moment format="YYYY-MM-DD" style={{fontSize:'12px'}}>{review.createdAt}</Moment>
                <p>{review.comment}</p>
            </ListGroup.Item>
          )}
          </ListGroup>}
      
    </div>
  );
};

export default ReviewsScreen;
