import React, { useEffect, useState } from "react";
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
import { getOrderDetail, orderToPaid } from "../../actions/orderActions";
import Loader from "../Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { PAY_RESET_DETAIL } from "../../types/orderTypes";
import { MARK_RESET_DELIVERED } from "../../types/orderTypes";
import Moment from "react-moment";
import { markDelivered } from "../../actions/orderActions";
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetail = useSelector((state) => state.getOrderDetail);
  const { loading, orderItems, order, error, isDelivered } = orderDetail;
  const {userInfo}=useSelector(state=>state.userInfo)
  const {isAdmin}=userInfo
  const orderPay = useSelector((state) => state.orderToPaid);
  const { loading: loadingPay, success: successPay } = orderPay;
  if (!loading && !error) {
    order.countTotal = order.orderItem.reduce((acc, item) => acc + item.qty, 0);
  }
  const [stkReady, setStkReady] = useState(false);
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src ="https://www.paypal.com/sdk/js?client-id=AX3fY5gOy4KtZ5eSVyR3kJDq4WxmzFz1k4N0fte8pMPY7Yw--HF92IIj6Lamit2c9PxTN98HliMlh5xg";
    script.async = true;
    script.onload = () => {
      setStkReady(true);
      console.log("Script added");
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (!order || order._id!==Number(orderId) || successPay || isDelivered) {
      dispatch(getOrderDetail(orderId));     
    } 
    if ( order && !order.isPaid) {
      console.log('useEffect')
      if (!window.paypal) {
        addPayPalScript();
        setStkReady(true);
      } else {
        console.log(window.paypal);
        setStkReady(true);
      }
    }
  }, [dispatch, successPay, orderId, isDelivered,setStkReady,order]);
  useEffect(()=>{
     if(!order || order._id!==Number(orderId) || isDelivered){
      dispatch(getOrderDetail(orderId));
    }
  },[dispatch,isDelivered,orderId,order])
  const successPaymentHandler = (paymentResult) => {
    console.log("successPaymentHandler");
    console.log(paymentResult);
    dispatch(orderToPaid(orderId, paymentResult));
  };
  const markAsDeliveredHandler = (orderId) => {
    dispatch(markDelivered(orderId));
  };
  return loading ? (

    <Loader className="py-1" />
  ) : error ? (
    <Message variant="danger" className="py-1">
      {error}
    </Message>
  ) : (
    <Container>
      <Row className="py-3">
        <Col md={8}>
          <h1>Order {order._id}</h1>
          <h3>Shipping: </h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong>Shipping Address: </strong>
                    {order.shippingAddress.address}
                    {"  "}
                    {order.shippingAddress.city}
                    {"  "}
                    {order.shippingAddress.country}
                    {"  "}
                    {order.shippingAddress.postalCode}
                  </p>

                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered at{" "}
                      <Moment format="YYYY/MM/DD">{order.deliveredAt}</Moment>
                    </Message>
                  ) : (
                    <Message variant="warning">Not Delivered</Message>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <h3>Payment Method</h3>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  <p>{order.paymentMethod}</p>{" "}
                  {order.isPaid ? (
                    <Message variant="success">
                      Paid at{" "}
                      <Moment format="YYYY/MM/DD">{order.paidAt}</Moment>
                    </Message>
                  ) : (
                    <Message variant="warning">Not Paid</Message>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <h3> Order Items</h3>
          <ListGroup variant="flush">
            {order.orderItem.length == 0 ? (
              <Message variant="info">
                Order is Empty!{" "}
                <LinkContainer to="/">Go Back Shopping</LinkContainer>
              </Message>
            ) : (
              order.orderItem.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <LinkContainer
                        to={`/product/${item.product}?redirect=placeorder`}
                      >
                        <Image src={item.image} fluid rounded />
                      </LinkContainer>
                    </Col>

                    <LinkContainer
                      to={`/product/${item.product}?redirect=placeorder`}
                    >
                      <Col md={4}>{item.name}</Col>
                    </LinkContainer>

                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.price * item.qty}
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
                  <Col>{order.countTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Payment Method:</Col>
                  <Col>{order.paymentMethod}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!stkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {order && order.isPaid && !order.isDelivered && isAdmin && (
                <ListGroup.Item>
                  <Row>
                    <Button onClick={(e) => markAsDeliveredHandler(orderId)}>
                      Mark as delivered
                    </Button>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
