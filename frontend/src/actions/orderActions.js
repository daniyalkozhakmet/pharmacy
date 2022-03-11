import axios from "axios";
//AX3fY5gOy4KtZ5eSVyR3kJDq4WxmzFz1k4N0fte8pMPY7Yw--HF92IIj6Lamit2c9PxTN98HliMlh5xg
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_REQUEST_DETAIL,
  ORDER_SUCCESS_DETAIL,
  ORDER_FAIL_DETAIL,
  PAY_REQUEST_DETAIL,
  PAY_SUCCESS_DETAIL,
  PAY_FAIL_DETAIL,
  GET_REQUEST_MYORDERS,
  GET_SUCCESS_MYORDERS,
  GET_FAIL_MYORDERS,
  GET_RESET_MYORDERS,
  GET_REQUEST_ORDERS,
  GET_SUCCESS_ORDERS,
  GET_FAIL_ORDERS,
  GET_RESET_ORDERS,
  MARK_REQUEST_DELIVERED,
  MARK_SUCCESS_DELIVERED,
  MARK_FAIL_DELIVERED,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../types/orderTypes";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
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
    const { data } = await axios.post("api/orders/add", order, config);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQUEST_DETAIL });
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
    const { data } = await axios.get(`/api/orders/${id}`, config);
    console.log(data);
    dispatch({ type: ORDER_SUCCESS_DETAIL, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL_DETAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const orderToPaid =
  (id, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: PAY_REQUEST_DETAIL });
      const {
        userInfo: {
          userInfo: { token },
        },
      } = getState();
      console.log(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${id}/pay`,
        paymentResult,
        config
      );
      dispatch({ type: PAY_SUCCESS_DETAIL, payload: data });
    } catch (error) {
      dispatch({
        type: PAY_FAIL_DETAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_MYORDERS });
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
    const { data } = await axios.get(`/api/orders/myorder`, config);
    dispatch({ type: GET_SUCCESS_MYORDERS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_MYORDERS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REQUEST_ORDERS });
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
    const { data } = await axios.get(`/api/orders/get`, config);
    console.log(data);
    dispatch({ type: GET_SUCCESS_ORDERS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAIL_ORDERS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const markDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_REQUEST_DELIVERED });
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
    const { data } = await axios.get(`/api/orders/delivered/${id}`, config);
    dispatch({ type: MARK_SUCCESS_DELIVERED, payload: data });
  } catch (error) {
    dispatch({
      type: MARK_FAIL_DELIVERED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//DELETE order BY ID
export const deleteOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
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
    await axios.delete(`api/orders/${id}/delete`, config);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
