import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { createReview } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/ProductActions";
const ReviewFormScreen = ({ id }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating == 0) {
      setMessage("Please provide rating");
    }else{
      dispatch(createReview({ rating, comment }, id));
      console.log(rating, comment);
    }
  };
  return (
    <div>
      {message!='' && <Message variant={'danger'}>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            required
            onChange={(e) => setRating(e.target.value)}
          >
            <option>* Select Rating Below</option>
            <option value={1}>1(Poor)</option>
            <option value={2}>2(Bad)</option>
            <option value={3}>3(Average)</option>
            <option value={4}>4(Good)</option>
            <option value={5}>5(Excellent)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default ReviewFormScreen;
