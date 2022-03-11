import {
  GET_REQUEST_CATEGORY,
  GET_SUCCESS_CATEGORY,
  GET_FAIL_CATEGORY,
  CREATE_REQUEST_CATEGORY,
  CREATE_SUCCESS_CATEGORY,
  CREATE_FAIL_CATEGORY,
  DELETE_REQUEST_CATEGORY,
  DELETE_SUCCESS_CATEGORY,
  DELETE_FAIL_CATEGORY,
} from "../types/categoryTypes";

export const getCategoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case GET_REQUEST_CATEGORY:
    case CREATE_REQUEST_CATEGORY:
    case DELETE_REQUEST_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case GET_SUCCESS_CATEGORY:
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case CREATE_SUCCESS_CATEGORY:
      return {
        ...state,
        loading: false,
        category: [...state.category, action.payload],
      };
    case DELETE_SUCCESS_CATEGORY:
      return {
        ...state,
        loading: false,
        category: state.category.filter(
          (category) => category._id !== action.payload
        ),
      };
    case GET_FAIL_CATEGORY:
    case CREATE_FAIL_CATEGORY:
    case DELETE_FAIL_CATEGORY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
