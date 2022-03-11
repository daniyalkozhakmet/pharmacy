import React, { useState, useEffect } from "react";

import { Col, Row, NavDropdown } from "react-bootstrap";
import Product from "../Product";
import { getProducts } from "../../actions/ProductActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import {getBrand} from '../../actions/brandActions'
import {getCategory} from '../../actions/categoryActions'
import { useHistory } from "react-router-dom";
const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const history1=useHistory()
  const keyword = history.location.search ? history.location.search : "";
  useEffect(() => {
    dispatch(getBrand())
    dispatch(getCategory())
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);
  const productList = useSelector((state) => state.productList);
  const {brand,loading:loadingBrand,error:errorBrand}=useSelector(state=>state.getBrand)
  const {category,loading:loadingCategory,error:errorCategory}=useSelector(state=>state.getCategory)
  const { loading, error, products, page, pages } = productList;
  const searchHandler=(keyword)=>{
    history1.push(`/?keyword=${keyword}&pages=1`)
  }
  return (
    <div>
      <div className="row align-items-center py-3">
        <div className="col-md col-sm-12">
        <h1>Latest Products</h1>
        </div>
        <div className="col-md-2 col-sm-6 ">
        <NavDropdown title="Medicine Category" id="basic-nav-dropdown">
        {category.length>0 && category.map(c=><NavDropdown.Item key={c._id} onClick={e=>searchHandler(c.name)}>{c.name}</NavDropdown.Item>)}
          </NavDropdown>
        </div>
        <div className="col-md-2 col-sm-6 ">
        <NavDropdown title="Medicine Brand" id="basic-nav-dropdown">
            {brand.length>0 && brand.map(b=><NavDropdown.Item key={b._id} onClick={e=>searchHandler(b.name)}>{b.name}</NavDropdown.Item>)}
          </NavDropdown>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger" children={error} />
        ) : (
          <Row>
            {products.length == 0 ? (
              <Message variant="warning" children={"No match detected"} />
            ) : (
              products.map((product) => (
                <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            )}
          </Row>
        )}
        <Paginate page={page} pages={pages} />
      </div>
    </div>
  );
};

export default HomeScreen;
