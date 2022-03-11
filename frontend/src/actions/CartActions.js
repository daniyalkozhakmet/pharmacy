import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SET_SHIPPING_ADDRESS,
  SET_PAYMENT_METHOD,
} from "../types/cartTypes";
import axios from "axios";
export const addCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartItems.cartItems)
  );
};
export const removeCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartItems.cartItems)
  );
};
export const setShippingAdress = (data) => (dispatch) => {
  dispatch({ type: SET_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const setPaymentMethod=(method)=>async dispatch=>{
  dispatch({type:SET_PAYMENT_METHOD,payload:method})
  localStorage.setItem("paymentMethod", JSON.stringify(method));
}