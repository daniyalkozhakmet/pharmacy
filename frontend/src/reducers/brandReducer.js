import {
  GET_REQUEST_BRAND,
  GET_SUCCESS_BRAND,
  GET_FAIL_BRAND,
  CREATE_REQUEST_BRAND,
  CREATE_SUCCESS_BRAND,
  CREATE_FAIL_BRAND,
  DELETE_REQUEST_BRAND,
  DELETE_SUCCESS_BRAND,
  DELETE_FAIL_BRAND,
} from "../types/brandTypes";
export const getBrandReducer = (state = { brand: [] }, action) => {
  switch (action.type) {
    case GET_REQUEST_BRAND:
    case CREATE_REQUEST_BRAND:
    case DELETE_REQUEST_BRAND:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS_BRAND:
      return {
        ...state,
        loading: false,
        brand: action.payload,
      };
    case CREATE_SUCCESS_BRAND:
      return {
        ...state,
        loading: false,
        brand: [...state.brand, action.payload],
      };
    case DELETE_SUCCESS_BRAND:
      return {
        ...state,
        loading: false,
        brand: state.brand.filter((brand) => brand._id !== action.payload),
      };
    case GET_FAIL_BRAND:
    case CREATE_FAIL_BRAND:
    case DELETE_FAIL_BRAND:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
