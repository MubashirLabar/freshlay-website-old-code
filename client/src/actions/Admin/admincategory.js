import axios from "axios";
import zuz from "../../core/Toast";
import {
  CATEGORIES_LIST_SUCCESS,
  CATEGORY_REQUEST,
  CATEGORIES_LIST_REQUEST,
  CATEGORY_SUCCESS,
} from "../types";

export const deletecategory = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/category/deletecategory/${id}`
    );

    const data = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/getcategories`,
      {
        status: "0",
      }
    );
    // console.log(data)
    if (data.data.status === "success") {
      dispatch({
        type: CATEGORIES_LIST_SUCCESS,
        payload: data.data.categories,
      });
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const Addcategory = (file, data) => async (dispatch) => {
  try {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", file);
    formData.append("data", JSON.stringify(data));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/addnewcategory`,
      formData,
      config
    );
    //console.log(res)
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New category added`, time: 5 });
    }
    return true;
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getcategories = (filter) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });
    const data = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/getcategories`,
      filter
    );
    // console.log(data)
    if (data.data.status === "success") {
      dispatch({
        type: CATEGORIES_LIST_SUCCESS,
        payload: data.data.categories,
      });
      return true;
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

export const getacategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/category/getacategory/${id}`
    );
    dispatch({ type: CATEGORY_SUCCESS, payload: res.data.category });
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const editcategory = (file, data) => async (dispatch) => {
  try {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", file);
    formData.append("data", JSON.stringify(data));
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/editcategory`,
      formData,
      config
    );
    if (res.data.status === "success") {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/getcategories`,
        {
          status: "0",
        }
      );
      //console.log(data);
      if (data.data.status === "success") {
        dispatch({
          type: CATEGORIES_LIST_SUCCESS,
          payload: data.data.categories,
        });
      }

      zuz.Toast.show({ html: `Data has been updated`, time: 5 });
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};
