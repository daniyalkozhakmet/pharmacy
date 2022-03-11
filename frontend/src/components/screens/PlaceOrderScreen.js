import React, { useEffect } from "react";
import {
  Container,
  Col,
  Row,
  ListGroup,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../Message";
import CheckoutSteps from "../CheckoutSteps";
import { createOrder } from "../../actions/orderActions";
import { CREATE_ORDER_RESET } from "../../types/orderTypes";
import { CART_ITEMS_RESET } from "../../types/cartTypes";
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.createOrder);
  const { loading, success, order, error } = orderItems;
  const cart = useSelector((state) => state.cartItems);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  console.log(paymentMethod);
  useEffect(() => {
    if (paymentMethod == "") {
      history.push("/payment");
    }
  }, [history]);
  cart.countTotal = cartItems.reduce((acc, item) => acc + item.qty, 0);
  cart.priceTotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  cart.taxPrice = 0;
  cart.shippingPrice = cartItems.priceTotal > 100 ? 0 : 20;
  const onClick = (e) => {
    const data = {
      orderItems: cartItems,
      paymentMethod,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.priceTotal,
      shippingAddress: shippingAddress,
    };
    dispatch(createOrder(data));
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
      dispatch({ type: CART_ITEMS_RESET });
    }
  }, [success, history]);
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row className="py-3">
        <Col md={8}>
          <h2>Place Order</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <p>
                    <strong>Shipping Address: </strong>
                    {shippingAddress.address}
                    {"  "}
                    {shippingAddress.city}
                    {"  "}
                    {shippingAddress.country}
                    {"  "}
                    {shippingAddress.postalCode}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <h3> Cart Items</h3>
          <ListGroup variant="flush">
            {cartItems.length == 0 ? (
              <Message variant="info">
                Cart is Empty!{" "}
                <LinkContainer to="/">Go Back Shopping</LinkContainer>
              </Message>
            ) : (
              cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <LinkContainer
                        to={`/product/${item.product}?redirect=placeorder`}
                      >
                        <Image src={item.image} fluid rounded />
                      </LinkContainer>
                    </Col>
                    <Col>
                      <LinkContainer
                        to={`/product/${item.product}?redirect=placeorder`}
                      >
                        <Col md={4}>{item.name}</Col>
                      </LinkContainer>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = $
                      {(item.price * item.qty).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <h2>Summary</h2>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Total Count:</Col>
                  <Col>{cart.countTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${cart.priceTotal.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Payment Method:</Col>
                  <Col>{paymentMethod}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Row>
                    <Message variant="danger">{error}</Message>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Row>
                  <Button className="btn-block" onClick={onClick}>
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
