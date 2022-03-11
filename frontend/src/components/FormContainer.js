import React from "react";
import { Row, Col, Container } from "react-bootstrap";
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-center py-3">
        <Col className="col-md-6">{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
