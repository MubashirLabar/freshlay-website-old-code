import axios from "axios";
import {
  HOMEPAGE_RANDOM_PRODUCTS_REQUEST,
  HOMEPAGE_RANDOM_PRODUCTS_SUCCESS,
  FILTERD_PRODUCT_LIST_REQUEST,
  FILTERD_PRODUCT_LIST_SUCCESS,
  FILTERD_PRODUCT_LIST_SUCCESS_MORE,
  FILTERD_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE,
  HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  HOMEPAGE_PRODUCT_LIST_REQUEST,
  HOMEPAGE_PRODUCT_LIST_SUCCESS,
  HOMEPAGE_PRODUCT_LIST_FAIL,
  SEARCH_PRODUCT_LIST_REQUEST,
  SEARCH_PRODUCT_LIST_SUCCESS,
  SEARCH_PRODUCT_LIST_SUCCESS_MORE,
  SEARCH_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "./types";
import zuz from "../core/Toast";

/*export const homepagerandomproducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/product/get50randomproducts");
    console.log(data)
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
    }
  }
}*/

export const getpopularProducts = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/getpopularproducts`
    );
    return data;
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
      return false;
    }
  }
};

export const homepageProducts = (skip) => async (dispatch) => {
  try {
    if (skip <= 0) {
      dispatch({ type: HOMEPAGE_PRODUCT_LIST_REQUEST });
    }
    let body = {
      //limit,
      skip,
    };
    if (skip > 0) {
      dispatch({
        type: HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE_REQUEST,
      });
    }
    //  console.log('in home page function')
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/landingproductfilter`,
      body
    );
    if (skip > 0) {
      dispatch({
        type: HOMEPAGE_PRODUCT_LIST_SUCCESS_MORE,
        payload: data,
      });
    } else {
      dispatch({
        type: HOMEPAGE_PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
  }
};

export const filterProducts = (filter) => async (dispatch) => {
  try {
    if (filter.skip > 0) {
      dispatch({ type: FILTERD_PRODUCT_LIST_SUCCESS_MORE_REQUEST });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/filterproducts`,
        filter
      );
      dispatch({
        type: FILTERD_PRODUCT_LIST_SUCCESS_MORE,
        payload: data,
      });
    } else {
      dispatch({ type: FILTERD_PRODUCT_LIST_REQUEST });

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/filterproducts`,
        filter
      );
      if (data.updatedproducts) {
        dispatch({
          type: FILTERD_PRODUCT_LIST_SUCCESS_MORE,
          payload: data,
        });
      } else {
        dispatch({
          type: FILTERD_PRODUCT_LIST_SUCCESS,
          payload: {
           products: [],
           totalproducts: 0}
        });
        dispatch({
          type: FILTERD_PRODUCT_LIST_SUCCESS,
          payload: data,
        });
      }
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
  }
};

export const searchProducts = (searchdata) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PRODUCT_LIST_REQUEST, payload: searchdata });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/searchproduct`,
      {
        search: {
          searchdata,
        },
      }
    );
    dispatch({
      type: SEARCH_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
    // }
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
  }
};

export const searchproductupdate = () => async (dispatch, getState) => {
  try {
    const { searchproducts } = getState();
    dispatch({ type: SEARCH_PRODUCT_LIST_SUCCESS_MORE_REQUEST });
    const { currentkeyword, skip } = searchproducts;
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/searchproduct`,
      {
        search: {
          searchdata: currentkeyword,
          skip: skip + 10,
        },
      }
    );
    // console.log('action in details')
    dispatch({
      type: SEARCH_PRODUCT_LIST_SUCCESS_MORE,
      payload: data,
      payload2: skip + 10,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
  }
};

/*
export const listProducts = (keyword = '',pageNumber = '') => async (dispatch) => {
  


    try {
        dispatch({type : PRODUCT_LIST_REQUEST});
      
        const {data} = await axios.get(`
        /api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        console.log(data)
        dispatch({
            type : PRODUCT_LIST_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.message
             ? error.response.data.message : error.message
        })
    }
} */

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/getaproduct/${id}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    return true;
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/${productId}/reviews`,
        review,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
        } else {
          zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
        }
      }
      /*dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); */
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/top`
    );

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
      }
    }
    /*dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });*/
  }
};
