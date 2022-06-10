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
          <Form.Label>Бағалау</Form.Label>
          <Form.Control
            as="select"
            value={rating}
            required
            onChange={(e) => setRating(e.target.value)}
          >
            <option>* Бағаны таңдаңыз</option>
            <option value={1}>1(Нашар)</option>
            <option value={2}>2(Қанатағаттанарлықсыз)</option>
            <option value={3}>3(Қанатағаттанарлық)</option>
            <option value={4}>4(Жақсы)</option>
            <option value={5}>5(Өте жақсы)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Пікір</Form.Label>
          <Form.Control
            as="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </Form.Group>
        <Button type="submit">Жіберу</Button>
      </Form>
    </div>
  );
};

export default ReviewFormScreen;
