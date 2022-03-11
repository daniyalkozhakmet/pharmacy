import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  SET_SHIPPING_ADDRESS,
  SET_PAYMENT_METHOD,
  CART_ITEMS_RESET,
} from "../types/cartTypes";
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const cartItem = action.payload;
      const exist = state.cartItems.find(
        (item) => item.product == cartItem.product
      );
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product == cartItem.product ? cartItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_ITEMS_RESET:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
