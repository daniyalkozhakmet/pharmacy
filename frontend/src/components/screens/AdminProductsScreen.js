import React, { useEffect } from "react";
import { Tab, Table, Button, Row, Col, Image, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../Message";
import { getProducts } from "../../actions/ProductActions";
import { deleteProduct } from "../../actions/ProductActions";
import { PRODUCT_DETAIL_RESET } from "../../types/productTypes";
import Moment from "react-moment";
import Paginate from "../Paginate";
const AdminProductsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userInf = useSelector((state) => state.userInfo);
  const { userInfo } = userInf;
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    }
  }, [history, userInfo]);
  const userAdmin = useSelector((state) => state.getUsersAdmin);
  const { users, loading, error } = userAdmin;
  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  const keyword = history.location.search ? history.location.search : "";
  useEffect(() => {
    dispatch(getProducts(keyword));
    dispatch({ type: PRODUCT_DETAIL_RESET });
  }, [dispatch, keyword]);
  const productDeleteHandler = (id) => {
    if (window.confirm("Do you want to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (e) => {
    console.log("Create");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="my-3 align-items-center">
            <Col>
              <h1>Дәріхана өнімдері</h1>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <LinkContainer to="/admin/products/create">
                <Button
                  className="block"
                  onClick={(e) => createProductHandler()}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> Өнім қосу
                </Button>
              </LinkContainer>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Атауы</th>
                    <th>Бренд</th>
                    <th>Категория</th>
                    <th>Баға</th>
                    <th>Сан</th>
                    <th>Жарамдылық мерзімі</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.brand.name}</td>
                        <td>{product.category.name}</td>
                        <td>${product.price}</td>
                        {product.countInStock < 5 ? (
                          <td style={{ color: "red", fontSize: "20px" }}>
                            {product.countInStock}
                            <i
                              style={{ color: "red", marginLeft: "5px" }}
                              className="fas fa-exclamation"
                            ></i>
                          </td>
                        ) : (
                          <td>{product.countInStock}</td>
                        )}

                        {product.expiresAt ? (
                          Math.abs(new Date() - new Date(product.expiresAt)) <
                          432000000 ? (
                            <td style={{ color: "red", fontSize: "20px" }}>
                              <Moment
                                format="YYYY-MM-DD"
                                style={{ fontSize: "12px" }}
                              >
                                {product.expiresAt}
                              </Moment>
                            </td>
                          ) : (
                            <td>
                              <Moment
                                format="YYYY-MM-DD"
                                style={{ fontSize: "12px" }}
                              >
                                {product.expiresAt}
                              </Moment>
                            </td>
                          )
                        ) : (
                          <td></td>
                        )}

                        <td>
                          <>
                            <Button
                              variant="light"
                              className="btn-sm mx-1"
                              onClick={(e) => productDeleteHandler(product._id)}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                            <LinkContainer
                              to={`/admin/products/create/?id=${product._id}`}
                            >
                              <Button variant="light" className="btn-sm mx-1">
                                <i className="fas fa-edit"></i>
                              </Button>
                            </LinkContainer>
                          </>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
      <Paginate page={page} pages={pages} isAdmin={true} />
    </>
  );
};

export default AdminProductsScreen;
