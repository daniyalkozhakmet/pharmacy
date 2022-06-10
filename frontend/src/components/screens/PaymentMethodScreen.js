import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { setShippingAdress } from "../../actions/CartActions";
import CheckoutSteps from "../CheckoutSteps";
import { setPaymentMethod } from "../../actions/CartActions";
const PaymentMethodScreen = ({history}) => {
  const cart =useSelector(state=>state.cartItems)
  const {paymentMethod}=cart
  const [method, setMethod] = useState(paymentMethod);
  const dispatch=useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(method))
   history.push('/placeorder')
  };
  const onChange = (e) => {
    setMethod(e.target.value);
  };
  return (
      <>
      <CheckoutSteps step1 step2 step3/>
    <FormContainer>
      <h1>Төлем түрі</h1>
      <Form onSubmit={submitHandler}>
        <Form.Check
          label={"PayPal"}
          className="py-3"
          value="PayPal"
          onChange={onChange}
          
        />

        <Button type="submit">Жалғыстыру</Button>
      </Form>
    </FormContainer>
    </>
  );
};

export default PaymentMethodScreen;
