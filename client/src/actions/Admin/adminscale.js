import { SCALE_LIST_REQUEST, SCALE_LIST_SUCCESS } from "../types";
import axios from "axios";
import zuz from "../../core/Toast";

export const editScale = (body, sortstatus) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/editscale`,
      body
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Scale Edited succesfully`, time: 5 });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/getscale`,
        sortstatus
      );
      if (res.data.status === "success") {
        dispatch({ type: SCALE_LIST_SUCCESS, payload: res.data.scales });
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const deletescale = (body, sortstatus) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/deletescale`,
      { body }
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Scale deleted succesfully`, time: 5 });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/getscale`,
        sortstatus
      );
      if (res.data.status === "success") {
        dispatch({ type: SCALE_LIST_SUCCESS, payload: res.data.scales });
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getscales = (body) => async (dispatch) => {
  try {
    dispatch({ type: SCALE_LIST_REQUEST });
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/getscale`,
      body
    );
    if (res.data.status === "success") {
      dispatch({ type: SCALE_LIST_SUCCESS, payload: res.data.scales });
    }
    return true;
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const createScale = (body, sortstatus) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/addnewscale`,
      body
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New scale added succesfully`, time: 5 });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/getscale`,
        sortstatus
      );
      console.log(res);
      if (res.data.status === "success") {
        dispatch({ type: SCALE_LIST_SUCCESS, payload: res.data.scales });
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};
