import React, { useEffect, useState } from "react";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../actions/userActions";
import Loader from "../Loader";
import Message from "../Message";
import { updateUserById } from "../../actions/userActions";
const AdminEditUser = ({ match, history }) => {
  const id = match.params.id;
  const { userInfo } = useSelector((state) => state.userInfo);
  const { isAdmin: admin } = userInfo;
  const getUserByIdAdmin = useSelector((state) => state.getUserByIdAdmin);
  const { loading, error, user } = getUserByIdAdmin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.name) {
      dispatch(getUserById(id));
    } else {
      setEmail(user ? user.email : "");
      setName(user ? user.name : "");
      setIsAdmin(user ? user.isAdmin : false);
    }
  }, [id, user, dispatch]);
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (isEmpty(userInfo)) {
      history.push("/");
      if (!admin) {
        history.push("/");
      }
    }
  }, [userInfo]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserById(id, { name, email, isAdmin }));
    history.push("/admin");
  };
  return (
    <FormContainer>
      <h1>Қолданушыны өзгерту</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Есімі</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              label="Admin"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mx-1">
            Өзгерту
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default AdminEditUser;
