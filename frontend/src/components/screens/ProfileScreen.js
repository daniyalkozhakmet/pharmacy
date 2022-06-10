import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import Moment from "react-moment";
import { updateUserDetail, userRegister } from "../../actions/userActions";
import { getUserDetails } from "../../actions/userActions";
import { USER_UPDATE_RESET } from "../../types/userTypes";
import { getMyOrders ,deleteOrderById} from "../../actions/orderActions";
import PaypalButton from "../PaypalButton";
const ProfileScreen = ({ location, match, history }) => {
  const myOrder = useSelector((state) => state.getMyOrders);
  const { loading: loadingMyOrder, myOrders, error: errorMyOrder } = myOrder;
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userInfo);
  const updateUser = useSelector((state) => state.updateUser);
  const { success } = updateUser;
  const { loading, error, userInfo } = userLogin;
  const userDetail = useSelector((state) => state.userDetails);
  const { user } = userDetail;

  const [user1, setUser] = useState({
    password2: "",
    email: "",
    password: "",
    name: "",
  });
  const { email, password, password2, name } = user1;
  const [msg, setMsg] = useState("");
  const onChange = (e) => {
    setUser({
      ...user1,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMsg("Password does not match");
    } else {
      dispatch(updateUserDetail(user1.name, user1.email, user1.password));
    }
  };
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const orderDeleteHandler=(id)=>{
    if(window.confirm('Do you want to delete thsi order?')){
      dispatch(deleteOrderById(id))
    }
  
  }
  useEffect(() => {
    if (isEmpty(userInfo)) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setUser({
          password2: "",
          email: user.email,
          password: "",
          name: user.name,
        });
        if (success) {
          dispatch({ type: USER_UPDATE_RESET });
        }
        dispatch(getMyOrders());
      }
    }
  }, [history, userInfo, redirect, user, success]);
  return (
    <Container>
      <Row>
        <Col md={3}>
          <h2>Қолданушы профилі</h2>
          {loading && <Loader />}
          {msg && <Message variant="danger">{msg}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Есімі</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="Enter name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                required
                placeholder="Enter email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Парольді қайталау</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mx-1">
              Жаңарту
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>Тапсырыстар</h2>
          {loadingMyOrder ? (
            <Loader />
          ) : errorMyOrder ? (
            <Message variant="danger">{errorMyOrder}</Message>
          ) : (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Төлем түрі</th>
                  <th>Толық құны</th>
                  <th>Жеткізу</th>
                  <th>Толем</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        <p className="p-2 bg-success text-white">
                          <Moment format="YYYY/MM/DD">
                            {order.deliveredAt}
                          </Moment>
                        </p>
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isPaid ? (
                        <p className="p-2 bg-success text-white">
                          <Moment format="YYYY/MM/DD">{order.payedAt}</Moment>
                        </p>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`order/${order._id}`}>
                        <Button className="btn btn-info btn-sm">
                          Тапсырысты көру
                        </Button>
                      </LinkContainer>
                      {!order.isPaid && <i className="fa fa-trash px-3" aria-hidden="true" onClick={e=>orderDeleteHandler(order._id)}></i> }
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
