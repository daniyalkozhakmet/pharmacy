import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersAdmin } from "../../actions/orderActions";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import Moment from "react-moment";
const AdminOrders = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const getOrders = useSelector((state) => state.getOrdersAdmin);
  const { loading, error, orders } = getOrders;
  const { isAdmin } = userInfo;
  const dispatch = useDispatch();
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  useEffect(() => {
    if (isEmpty(userInfo) || (!isEmpty(userInfo) && !isAdmin)) {
      history.push("/");
    } else {
      dispatch(getOrdersAdmin());
    }
  }, [userInfo, isAdmin, dispatch]);
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>
                  {" "}
                  <Moment format="YYYY-MM-DD">{order.paidAt}</Moment>
                </td>
                <td>${order.totalPrice}</td>
                <td>{order.isDelivered ? <Moment format="YYYY-MM-DD">{order.deliveredAt}</Moment>:<i className="fas fa-times"  style={{color:'red'}}></i>}</td>
              <td><LinkContainer to={`/order/${order._id}`}><Button className="btn-sm">Details</Button></LinkContainer></td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;
