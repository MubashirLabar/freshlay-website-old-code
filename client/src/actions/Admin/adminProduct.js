import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../types";
import axios from "axios";
import zuz from "../../core/Toast";

export const deleteproduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/product/deleteproduct/${id}`
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Product Deleted successfuly`, time: 5 });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/getadminproductlist`,
        {
          filterproduct: { category: "all", status: "all" },
        }
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.Products });
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const editProduct = (file, data) => async (dispatch) => {
  let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  formData.append("file", file);
  formData.append("data", JSON.stringify(data));

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/editproduct`,
      formData,
      config
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Product Edit successfuly`, time: 5 });
    }
    ws.onopen = () => ws.send(JSON.stringify({ type: "productedited" }));
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const AdminProductlist = (filter) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/getadminproductlist`,
      filter
    );

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.Products });
    return true;
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const CreateProduct = (file, data) => async (dispatch) => {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  formData.append("file", file);
  //formData.append("choppedimg",choppedimg);
  formData.append("data", JSON.stringify(data));
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/createproduct`,
      formData,
      config
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New product created successfuly`, time: 5 });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/getadminproductlist`,
        {
          filterproduct: { category: "all", status: "all" },
        }
      );

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.Products });
      return true;
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};
