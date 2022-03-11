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
  CREATE_RESET_PRODUCT,
  UPDATE_REQUEST_PRODUCT,
  UPDATE_SUCCESS_PRODUCT,
  UPDATE_FAIL_PRODUCT,
  UPDATE_RESET_PRODUCT,
  PRODUCT_DETAIL_RESET,
  CREATE_REGUEST_REVIEW,
  CREATE_SUCCESS_REVIEW,
  CREATE_FAIL_REVIEW,
} from "../types/productTypes";
export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
      };
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page:action.payload.page,
        pages:action.payload.pages,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case PRODUCTS_LIST_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
    case CREATE_REGUEST_REVIEW:
      return {
        ...state,
        loading: true,
        product: {},
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        
        loading: false,
        product: action.payload,
      };
    case CREATE_SUCCESS_REVIEW:
      return{
        ...state,
        loading:false,
        message:action.payload
      }
    case PRODUCT_DETAIL_FAIL:
    case CREATE_FAIL_REVIEW:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DETAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_REGUEST_PRODUCT:
      return {
        ...state,
        loading: true,
        product: {},
      };
    case CREATE_SUCCESS_PRODUCT:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case CREATE_FAIL_PRODUCT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_RESET_PRODUCT:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS_PRODUCT:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case UPDATE_FAIL_PRODUCT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_RESET_PRODUCT:
      return {};
    default:
      return state;
  }
};
