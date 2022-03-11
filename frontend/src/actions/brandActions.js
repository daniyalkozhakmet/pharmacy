import axios from 'axios'
import {
    GET_REQUEST_BRAND,
    GET_SUCCESS_BRAND,
    GET_FAIL_BRAND,

    CREATE_REQUEST_BRAND,
    CREATE_SUCCESS_BRAND,
    CREATE_FAIL_BRAND,

    DELETE_REQUEST_BRAND,
    DELETE_SUCCESS_BRAND,
    DELETE_FAIL_BRAND
} from '../types/brandTypes'
export const getBrand=()=>async dispatch=>{
    try {
        dispatch({type:GET_REQUEST_BRAND})
        const {data}=await axios.get('/api/products/brand')
        dispatch({type:GET_SUCCESS_BRAND,payload:data})
    } catch (error) {
        dispatch({
            type: GET_FAIL_BRAND,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}

export const createBrand = (brandData) => async (dispatch,getState) => {
    try {
      dispatch({ type: CREATE_REQUEST_BRAND });
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
      const { data } = await axios.post("/api/products/create/brand",brandData,config);
      dispatch({ type: CREATE_SUCCESS_BRAND, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_FAIL_BRAND,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deleteBrand = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: DELETE_REQUEST_BRAND });
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
      const { data } = await axios.delete(`/api/products/delete/brand/${id}`,config);
      dispatch({ type: DELETE_SUCCESS_BRAND, payload: id });
    } catch (error) {
      dispatch({
        type: DELETE_FAIL_BRAND,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  