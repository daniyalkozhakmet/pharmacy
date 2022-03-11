import React, { useEffect } from "react";
import { getUsersAdmin } from "../../actions/userActions";
import { Tab, Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import {LinkContainer} from 'react-router-bootstrap'
import { deleteUser } from "../../actions/userActions";
import Message from "../Message";
const AdminUsers = ({ history }) => {
  const dispatch = useDispatch();
  const userInf = useSelector((state) => state.userInfo);
  const { userInfo } = userInf;
  useEffect(()=>{
    dispatch(getUsersAdmin())
    },[dispatch])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
  }, [ history, userInfo]);
  const userAdmin = useSelector((state) => state.getUsersAdmin);
  const { users, loading,error } = userAdmin;
  const userDeleteHandler = (id) => {
    if(window.confirm('Do you want to delete this User?')){
      dispatch(deleteUser(id))
    }
  };
  return (
    <>
      <h1>Pharmacy Users</h1>
      {loading ? (
        <Loader />
      ) : error ? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {!user.isAdmin ? (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    ) : (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <>
                      <Button
                        variant="light"
                        className="btn-sm mx-1"
                        onClick={(e)=>userDeleteHandler(user._id)}  
                      >
                        <i className="fa fa-trash"></i>
                      </Button>
                      <LinkContainer to={`admin/user/${user._id}`}>
                      <Button
                        variant="light"
                        className="btn-sm mx-1"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    </>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AdminUsers;
