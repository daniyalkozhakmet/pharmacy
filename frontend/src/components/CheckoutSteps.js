import React from "react";
import { Nav } from "react-bootstrap";
import { LinContainer, LinkContainer } from "react-router-bootstrap";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center my-3">
      {step1 ? (
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link>Кіру</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/login">
            <Nav.Link disabled>Кіру</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step2 ? (
        <Nav.Item>
          <LinkContainer to="/shipping">
            <Nav.Link>Жеткізу мәліметі</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/shipping">
            <Nav.Link disabled>Жеткізу мәліметі</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step3 ? (
        <Nav.Item>
          <LinkContainer to="/payment">
            <Nav.Link>Төлем</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/payment">
            <Nav.Link disabled>Төлем</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
      {step4 ? (
        <Nav.Item>
          <LinkContainer to="/placeorder">
            <Nav.Link>Тапсырыс орналастыру</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      ) : (
        <Nav.Item>
          <LinkContainer to="/placeorder">
            <Nav.Link disabled>Тапсырыс орналастыру</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default CheckoutSteps;
