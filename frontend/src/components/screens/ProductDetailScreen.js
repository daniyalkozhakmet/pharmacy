import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Image, Button, ListGroup, Form } from "react-bootstrap";
import Rating from "../Rating";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/ProductActions";
import Loader from "../Loader";
import Message from "../Message";
import { addCart } from "../../actions/CartActions";
import ReviewsScreen from "./ReviewsScreen";
import ReviewFormScreen from "./ReviewFormScreen";
import Moment from "react-moment";
const ProductDetailScreen = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { userInfo: user } = userInfo;
  const productDetail = useSelector((state) => state.productDetail);
  const { product, error, loading } = productDetail;
  if(product){
    const { review } = product
  }

  const [qty, setQty] = useState(1);
  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch]);
  const addCartItem = () => {
    dispatch(addCart(match.params.id, qty));
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const redirect = location.search ? location.search.split("=")[1] : "";

  return (
    <div className="py-3">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error} />
      ) : (
        <>
          <Link to={`/${redirect}`} className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image
                src={product && product.image}
                alt={product && product.name}
                fluid
              />
            </Col>

            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product && product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    rating={product && product.rating}
                    numReviews={product && product.numReviews}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  Category:{" "}
                  {product && product.category && product.category.name}
                </ListGroup.Item>

                <ListGroup.Item>
                  Brand: {product && product.brand && product.brand.name}
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: ${product && product.price}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product && product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product && product.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product && product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty: </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[
                            ...Array(product && product.countInStock).keys(),
                          ].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Button
                      className="btn btn-block"
                      onClick={addCartItem}
                      disabled={product && product.countInStock === 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Row>
              <Col md={4}>
              <h3>Brand: {product && product.brand &&product.brand.name}</h3>
              <p>Company created in {product && product.brand &&<Moment format="YYYY-MM-DD">{product.brand.foundation}</Moment>}</p>
              <h5>Description</h5>
              <p>{product && product.brand &&product.brand.description}</p>
              </Col>
              <Col>
                <h3>Description</h3>
                <p>{product && product.description}</p>
              </Col>
            </Row>
            <Row className='py-4'>
              <Col md={4}>
                {user.name && product && <ReviewFormScreen id={product._id} />}
              </Col>
              <Col>{product && product.review && <ReviewsScreen review={product.review} />}</Col>
            </Row>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductDetailScreen;
