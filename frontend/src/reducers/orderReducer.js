import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_RESET,
  ORDER_REQUEST_DETAIL,
  ORDER_SUCCESS_DETAIL,
  ORDER_FAIL_DETAIL,
  PAY_REQUEST_DETAIL,
  PAY_SUCCESS_DETAIL,
  PAY_FAIL_DETAIL,
  PAY_RESET_DETAIL,
  
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
  MARK_RESET_DELIVERED,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "../types/orderTypes";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const getOrderDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_REQUEST_DETAIL:
      case MARK_REQUEST_DELIVERED:
      return {
        ...state,
      };
    case ORDER_SUCCESS_DETAIL:
      case MARK_SUCCESS_DELIVERED:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_FAIL_DETAIL:
      case MARK_FAIL_DELIVERED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case MARK_RESET_DELIVERED:
        return{}
    default:
      return state;
  }
};

export const orderToPayedDetailReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case PAY_REQUEST_DETAIL:
      return {
        loading: true,
      };
    case PAY_SUCCESS_DETAIL:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case PAY_FAIL_DETAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAY_RESET_DETAIL:
      return {};
    default:
      return state;
  }
};


export const getMyOrdersReducer = (state = { myOrders: [] }, action) => {
    switch (action.type) {
      case GET_REQUEST_MYORDERS:
        case DELETE_ORDER_REQUEST:
        return {
          ...state,
          error:null,
          loading: true,
        };
      case DELETE_ORDER_SUCCESS:
        return{
          loading:false,
          myOrders:state.myOrders.filter(o=>o._id!=action.payload)
        }
      case GET_SUCCESS_MYORDERS:
        return {
          loading: false,
          myOrders: action.payload,
        };
      case GET_FAIL_MYORDERS:
        case DELETE_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case GET_RESET_MYORDERS:
        return {};
      default:
        return state;
    }
  };
  

  export const getOrdersAdminReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case GET_REQUEST_ORDERS:
        return {
          loading: true,
        };
      case GET_SUCCESS_ORDERS:
        return {
          loading: false,
          orders: action.payload,
        };
      case GET_FAIL_ORDERS:
        return {
          loading: false,
          error: action.payload,
        };
      case GET_RESET_ORDERS:
        return {};
      default:
        return state;
    }
  };
    