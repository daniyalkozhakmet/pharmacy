import {
  USER_FAIL_LOGIN,
  USER_LOGOUT,
  USER_SUCCESS_LOGIN,
  USER_REQUEST_LOGIN,
  USER_FAIL_REGISTER,
  USER_REQUEST_REGISTER,
  USER_SUCCESS_REGISTER,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_REQUEST_UPDATE,
  USER_SUCCESS_UPDATE,
  USER_FAIL_UPDATE,
  USER_UPDATE_RESET,
  USER_DETAIL_RESET,
  USERS_REQUEST_ADMIN,
  USERS_SUCCESS_ADMIN,
  USERS_FAIL_ADMIN,
  USERS_RESET_ADMIN,
  USER_DELETE_REQUEST_ADMIN,
  USER_DELETE_SUCCESS_ADMIN,
  USER_DELETE_FAIL_ADMIN,
  USER_GETBYID_REQUEST_ADMIN,
  USER_GETBYID_SUCCESS_ADMIN,
  USER_GETBYID_FAIL_ADMIN,
  UPDATE_USER_REQUEST_ADMIN,
  UPDATE_USER_SUCCESS_ADMIN,
  UPDATE_USER_FAIL_ADMIN
} from "../types/userTypes";
export const userReducer = (state = {userInfo:{}}, action) => {
  switch (action.type) {
    case USER_REQUEST_LOGIN:
    case USER_REQUEST_REGISTER:
      return {
        loading: true,
      };
    case USER_SUCCESS_LOGIN:
    case USER_SUCCESS_REGISTER:
      return {
        userInfo: action.payload,
      };
    case USER_FAIL_LOGIN:
    case USER_FAIL_REGISTER:
      return {
        error: action.payload,
      };
    case USER_LOGOUT:
      return {userInfo:{}};
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case USER_DETAIL_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const updateUserReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_REQUEST_UPDATE:
      return {
        ...state,
        loading: true,
      };
    case USER_SUCCESS_UPDATE:
      return {
        ...state,
        success: true,
        loading: false,
        user: action.payload,
      };
    case USER_FAIL_UPDATE:
      return {
        ...state,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getUsersAdminReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USERS_REQUEST_ADMIN:
    case USER_DELETE_REQUEST_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case USER_DELETE_SUCCESS_ADMIN:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload.id),
      };
    case USERS_FAIL_ADMIN:
    case USER_DELETE_FAIL_ADMIN:
      return {
        ...state,
        error: action.payload,
      };
    case USERS_RESET_ADMIN:
      return {};
    default:
      return state;
  }
};
//Get user By ID Admin
export const getUserByIdAdminReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_GETBYID_REQUEST_ADMIN:
      case UPDATE_USER_REQUEST_ADMIN:
      return {
        ...state,
        loading: true,
      };
    case USER_GETBYID_SUCCESS_ADMIN:
      case UPDATE_USER_SUCCESS_ADMIN:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_GETBYID_FAIL_ADMIN:
      case UPDATE_USER_FAIL_ADMIN:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
