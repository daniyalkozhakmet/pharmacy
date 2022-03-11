import {
  USER_FAIL_LOGIN,
  USER_LOGOUT,
  USER_REQUEST_LOGIN,
  USER_SUCCESS_LOGIN,
} from "../types/userTypes";
import {
  USER_FAIL_REGISTER,
  USER_REQUEST_REGISTER,
  USER_SUCCESS_REGISTER,
} from "../types/userTypes";
import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_RESET,
} from "../types/userTypes";
import {
  USER_REQUEST_UPDATE,
  USER_SUCCESS_UPDATE,
  USER_FAIL_UPDATE,
  USER_UPDATE_RESET,
} from "../types/userTypes";
import {
  USERS_REQUEST_ADMIN,
  USERS_SUCCESS_ADMIN,
  USERS_FAIL_ADMIN,
  USERS_RESET_ADMIN,
} from "../types/userTypes";
import {
  USER_DELETE_REQUEST_ADMIN,
  USER_DELETE_SUCCESS_ADMIN,
  USER_DELETE_FAIL_ADMIN,
} from "../types/userTypes";
import {
  USER_GETBYID_REQUEST_ADMIN,
  USER_GETBYID_SUCCESS_ADMIN,
  USER_GETBYID_FAIL_ADMIN
} from "../types/userTypes";
import {
  UPDATE_USER_REQUEST_ADMIN,
  UPDATE_USER_SUCCESS_ADMIN,
  UPDATE_USER_FAIL_ADMIN
} from "../types/userTypes";
import { GET_RESET_ORDERS } from "../types/orderTypes";
import axios from "axios";
export const userLogin1 = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_LOGIN });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    const { data } = await axios.post("api/users/login/", formData, config);
    localStorage.setItem("userLogin", JSON.stringify(data));
    dispatch({ type: USER_SUCCESS_LOGIN, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FAIL_LOGIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: USERS_RESET_ADMIN });
  dispatch({ type: GET_RESET_ORDERS });
  localStorage.removeItem("userLogin");
  localStorage.removeItem("userInfo");
};

export const userRegister = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_REGISTER });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    console.log(formData);
    const { data } = await axios.post("api/users/register", formData, config);
    dispatch({ type: USER_SUCCESS_REGISTER, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_FAIL_REGISTER,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
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
  try {
    dispatch({ type: USER_DETAIL_REQUEST });
    const { data } = await axios.get(`api/users/${id}`, config);
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserDetail =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REQUEST_UPDATE });
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
      const { data } = await axios.put(
        "api/users/profile/update",
        { name, email, password },
        config
      );
      dispatch({ type: USER_SUCCESS_UPDATE, payload: data });

      localStorage.setItem("userLogin", JSON.stringify(data));
      dispatch({ type: USER_SUCCESS_LOGIN, payload: data });

      dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_FAIL_UPDATE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

    }
  };
export const getUsersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_REQUEST_ADMIN });
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
    const { data } = await axios.get("api/users", config);
    dispatch({ type: USERS_SUCCESS_ADMIN, payload: data });
  } catch (error) {
    dispatch({
      type: USERS_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
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
  try {
    dispatch({ type: USER_DELETE_REQUEST_ADMIN });
    const { data } = await axios.delete(`api/users/delete/${id}`, config);
    dispatch({ type: USER_DELETE_SUCCESS_ADMIN, payload: {id,data} });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET user by ID for ADMIN
export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_GETBYID_REQUEST_ADMIN });
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
    const { data } = await axios.get(`/api/users/get1/${id}`, config);
    dispatch({ type: USER_GETBYID_SUCCESS_ADMIN, payload: data });
  } catch (error) {
    dispatch({
      type: USER_GETBYID_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//UPDATE user by ID by ADMIN
export const updateUserById = (id,updatedUser) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST_ADMIN });
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
    const { data } = await axios.put(`/api/users/update/${id}`,updatedUser,config);
    dispatch({ type: UPDATE_USER_SUCCESS_ADMIN, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL_ADMIN,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
