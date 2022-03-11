import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../FormContainer";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import DatePicker from "react-datepicker";
import { createProduct } from "../../actions/ProductActions";
import { getCategory } from "../../actions/categoryActions";
import { getBrand } from "../../actions/brandActions";
import { CREATE_RESET_PRODUCT } from "../../types/productTypes";
import { getProduct } from "../../actions/ProductActions";
import { updateProduct } from "../../actions/ProductActions";
const AdminCreateScreen = ({ location, match, history }) => {
  const editId = location.search ? location.search.split("=")[1] : null;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { isAdmin: admin } = userInfo;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const productDet = useSelector((state) => state.productDetail);
  const {
    product: productDetail,
    loading: loadingDetail,
    error: errorDetail,
  } = productDet;
  useEffect(() => {
    if (editId !== null) {
      dispatch(getProduct(editId));
    }
  }, [dispatch, editId]);
  useEffect(() => {
    if (productDet) {
      setDescription(productDetail && productDetail.description);
      setName(productDetail && productDetail.name);
      setCountInStock(productDetail && productDetail.countInStock);
      setPrice(productDetail && productDetail.price);
      setBrand(productDetail && productDetail.brand && productDetail.brand._id);
      setCategory(
        productDetail && productDetail.category && productDetail.category._id
      );
    }
  }, [dispatch, productDet]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(
        updateProduct(
          {
            name,
            category,
            brand,
            description,
            price,
            rating: "4",
            countInStock,
            expiresAt: startDate != null ? convertDate(startDate) : null,
          },
          editId
        )
      );
    } else {
      dispatch(
        createProduct({
          name,
          category,
          brand,
          description,
          price,
          rating: "4",
          countInStock,
          expiresAt: startDate != null ? convertDate(startDate) : null,
        })
      );
    }
    dispatch({ type: CREATE_RESET_PRODUCT });
    history.push("/admin/products");
  };
  const getCategoryState = useSelector((state) => state.getCategory);
  const {
    category: categoryGet,
    loading: loadingCategory,
    error: errorCategory,
  } = getCategoryState;
  const getBrandState = useSelector((state) => state.getBrand);
  const {
    brand: brandGet,
    loading: loadingBrand,
    error: errorBrand,
  } = getBrandState;

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  useEffect(() => {
    if (isEmpty(userInfo)) {
      history.push("/");
      if (!admin) {
        history.push("/");
      }
    } else {
      dispatch(getCategory());
      dispatch(getBrand());
    }
  }, [history, admin, userInfo, dispatch]);
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const data1 = new FormData();
    data1.append("image", file);
    data1.append("product_id", editId);
    const formData = {
      image: file,
      product_id: editId,
    };
    console.log(formData);
    console.log(data1);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/create/uploadimage",
        data1,
        config
      );
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };
  return (
    <FormContainer>
      <h1>Create Product</h1>
      {loadingCategory ? (
        <Loader />
      ) : loadingBrand ? (
        <Loader />
      ) : errorCategory ? (
        <Message variant="danger">{errorCategory}</Message>
      ) : errorBrand ? (
        <Message variant="danger">{errorCategory}</Message>
      ) : (
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              as="select"
              defaultValue={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            >
              <option>* Select Brand Below</option>
              {brandGet &&
                brandGet.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Expire Date</Form.Label>
            <DatePicker
              selected={startDate}
              defaultValue={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              defaultValue={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>* Select Category Below</option>
              {categoryGet &&
                categoryGet.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          {editId && (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Image</Form.Label>

              <Form.File
                id="image-file"
                label="Browse"
                custom
                onChange={uploadImageHandler}
              ></Form.File>

              {uploading && <Loader />}
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter Price"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Count</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              placeholder="Enter Stock"
              defaultValue={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Write Description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mx-1">
            Save
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default AdminCreateScreen;
