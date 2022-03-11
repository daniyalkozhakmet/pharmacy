import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  CREATE_REGUEST_PRODUCT,
  CREATE_SUCCESS_PRODUCT,
  CREATE_FAIL_PRODUCT,
  UPDATE_REQUEST_PRODUCT,
  UPDATE_SUCCESS_PRODUCT,
  UPDATE_FAIL_PRODUCT,
  CREATE_REGUEST_REVIEW,
  CREATE_SUCCESS_REVIEW,
  CREATE_FAIL_REVIEW
} from "../types/productTypes";
import axios from "axios";
export const getProducts = (keyword='') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });
    const { data } = await axios.get(`/api/products/${keyword}`);
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }
    const { data } = await axios.delete(`/api/products/delete/${id}`,config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (productForm) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_REGUEST_PRODUCT });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }
    const { data } = await axios.post(`/api/products/create`,productForm,config);
    dispatch({ type: CREATE_SUCCESS_PRODUCT, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_FAIL_PRODUCT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateProduct = (productForm,id) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_REQUEST_PRODUCT });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }
    const { data } = await axios.put(`/api/products/update/${id}`,productForm,config);
    dispatch({ type: UPDATE_SUCCESS_PRODUCT, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL_PRODUCT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Create Review
export const createReview = (reviewForm,id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_REGUEST_REVIEW });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }
    const { data } = await axios.post(`/api/products/${id}/review`,reviewForm,config);
    dispatch(getProduct(id))
    dispatch({ type: CREATE_SUCCESS_REVIEW, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_FAIL_REVIEW,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
