import React from "react";
import { Nav } from "react-bootstrap";
import { LinContainer, LinkContainer } from "react-router-bootstrap";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center my-3">
      {step1 ? (
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled>Login</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step2 ? (
        <Nav.Item>
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/shipping">
            <Nav.Link disabled>Shipping</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step3 ? (
        <Nav.Item>
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/payment">
            <Nav.Link disabled>Payment</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step4 ? (
        <Nav.Item>
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/placeorder">
            <Nav.Link disabled>Place Order</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default CheckoutSteps;
