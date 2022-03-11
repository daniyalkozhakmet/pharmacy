import axios from "axios";
import {
  GET_REQUEST_CATEGORY,
  GET_SUCCESS_CATEGORY,
  GET_FAIL_CATEGORY,
  CREATE_REQUEST_CATEGORY,
  CREATE_SUCCESS_CATEGORY,
  CREATE_FAIL_CATEGORY,
  DELETE_REQUEST_CATEGORY,
  DELETE_SUCCESS_CATEGORY,
  DELETE_FAIL_CATEGORY
} from "../types/categoryTypes";

export const getCategory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REQUEST_CATEGORY });
    const { data } = await axios.get("/api/products/category");
    dispatch({ type: GET_SUCCESS_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_CATEGORY,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCategory = (categoryData) => async (dispatch,getState) => {
  try {
    dispatch({ type: CREATE_REQUEST_CATEGORY });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("/api/products/create/category",categoryData,config);
    dispatch({ type: CREATE_SUCCESS_CATEGORY, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_FAIL_CATEGORY,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch,getState) => {
  try {
    dispatch({ type: DELETE_REQUEST_CATEGORY });
    const {
      userInfo: {
        userInfo: { token },
      },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/delete/category/${id}`,config);
    dispatch({ type: DELETE_SUCCESS_CATEGORY, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL_CATEGORY,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

