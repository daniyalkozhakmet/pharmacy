import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../actions/userActions";
import SearchBox from "./SearchBox";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userInfo);
  const { userInfo, loading, error } = userLogin;
  const logoutHandler = (e) => {
    dispatch(userLogout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-cannabis"></i> Pharmafy{"  "}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div
              className="row justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <div className="col-md-4 col-sm-12 py-sm-3 py-md-0">
                <SearchBox />
              </div>
              <div className="col-md-6 ">
                <div className="d-flex justify-content-end">
                  <Nav className="mr-auto my-2 my-lg-0" navbarScroll>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i> Cart
                      </Nav.Link>
                    </LinkContainer>
                    {userInfo && userInfo.name ? (
                      <NavDropdown
                        title={
                          userInfo.name.split(" ")[0]
                            ? userInfo.name.split(" ")[0]
                            : userInfo.name
                        }
                        id="basic-nav-dropdown"
                      >
                        <LinkContainer
                          to="/profile"
                          className="bg-light text-primary"
                        >
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to="/login">
                        <Nav.Link>
                          <i className="fas fa-user"></i> Sign in
                        </Nav.Link>
                      </LinkContainer>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <LinkContainer
                          to="/admin"
                          className="bg-light text-primary"
                        >
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer
                          to="/admin/products"
                          className="bg-light text-primary"
                        >
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer
                          to="/admin/category"
                          className="bg-light text-primary"
                        >
                          <NavDropdown.Item>Category&Brand</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer
                          to="/admin/orders"
                          className="bg-light text-primary"
                        >
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </Nav>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
