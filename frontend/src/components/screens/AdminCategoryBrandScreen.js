import React, { useEffect, useState } from "react";
import { Col, Row, Table, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getCategory } from "../../actions/categoryActions";
import { getBrand } from "../../actions/brandActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import Moment from "react-moment";
import { ModelAddCategory } from "../ModelAddCategory";
import { ModelAddBrand } from "../ModalAddBrand";
import { deleteCategory } from "../../actions/categoryActions"
import { deleteBrand } from "../../actions/brandActions";
const AdminCategoryBrandScreen = ({history}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const dispatch = useDispatch();
  const getBrand1 = useSelector((state) => state.getBrand);
  const { brand, loading: loadingBrand, error: errorBrand } = getBrand1;

  const getCategory1 = useSelector((state) => state.getCategory);
  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin: admin } = userInfo;
  const {
    category,
    loading: loadingCategory,
    error: errorCategory,
  } = getCategory1;

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  useEffect(() => {
    if(isEmpty(userInfo)==false){
      dispatch(getBrand());
      dispatch(getCategory());
    }else{
      history.push("/");
      console.log('Redirect useEffect')
      if (!admin) {
        history.push("/");
        console.log('Redirect useEffect2')
      }
    }
  
  }, [dispatch,userInfo]);
  const categoryDeleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this Category?')){
      dispatch(deleteCategory(id))
    }
  };
  const brandDeleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this Brand?')){
      dispatch(deleteBrand(id))
    }
  };
  const addCategoryHandler = () => {
    console.log("Add");
  };
  const addBrandHandler = () => {
    console.log("Add");
  };
  return (
    <div>
      {loadingBrand || loadingCategory ? (
        <Loader />
      ) : errorCategory || errorBrand ? (
        <Message variant="danger">
          {errorBrand ? errorBrand : errorCategory}
        </Message>
      ) : (
        <>
          <Row className="py-3 gx-5">
            <Col md={4}>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Category</h2>
                <Button
                  className="btn-sm"
                  onClick={() => setModalShow(true)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i> Add Category
                </Button>
              </div>
              <ListGroup variant="flush">
                {category.map((category) => (
                  <ListGroup.Item
                    key={category._id}
                    className="d-flex justify-content-between"
                  >
                   {category._id}{'  '}{category.name}
                    <Button
                      variant="light"
                      className="btn-sm mx-1"
                      onClick={(e) => categoryDeleteHandler(category._id)}
                    >
                      <i className="fa fa-trash " aria-hidden="true"></i>
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Brand</h2>
                <Button className="btn-sm"  onClick={() => setModalShow1(true)}>
                  <i className="fa fa-plus" aria-hidden="true"></i> Add Brand
                </Button>
              </div>
              <Table striped borderless hover size="sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Foundation</th>
                    <th>Country</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {brand.map((brand) => (
                    <tr key={brand._id}>
                      <td>{brand._id}</td>
                      <td>{brand.name}</td>
                      <td>
                        <Moment format="YYYY-MM-DD">{brand.foundation}</Moment>
                      </td>
                      <td>{brand.country}</td>
                      <td>
                        <Button
                          variant="light"
                          className="btn-sm mx-1"
                          onClick={(e) => brandDeleteHandler(brand._id)}
                        >
                          <i className="fa fa-trash " aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <ModelAddCategory
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
              <ModelAddBrand
              show={modalShow1}
              onHide={() => setModalShow1(false)}
            />
          </Row>
        </>
      )}
    </div>
  );
};

export default AdminCategoryBrandScreen;
