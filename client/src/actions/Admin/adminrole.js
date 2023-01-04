import {
  ROLES_ACCESS_REQUEST,
  ROLES_ACCESS_LIST,
  SPECIFIC_ROLE_REQUEST,
  SPECIFIC_ROLE_SUCCESS,
} from "../types";
import axios from "axios";
import zuz from "../../core/Toast";
import setheadertoken from "../../utils/setheadertoken";

export const deleterole = (data) => async (dispatch) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/deleterole`,
      { data }
    );
    console.log(res);
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Role deleted succesfully`, time: 5 });
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/getroles`
      );
      console.log(res);
      if (res.data.status === "success") {
        dispatch({ type: ROLES_ACCESS_LIST, payload: res.data.roles });
      }
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

export const editrole = (data) => async (dispatch) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/editrole`,
      data
    );
    console.log(res);
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New Role edited succesfully`, time: 5 });
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/getroles`
      );
      console.log(res);
      if (res.data.status === "success") {
        dispatch({ type: ROLES_ACCESS_LIST, payload: res.data.roles });
      }
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

export const createrole = (data) => async (dispatch) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    console.log(data);
    //dispatch()
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/addnewrole`,
      { name: data }
    );
    console.log(res);
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `New Role added succesfully`, time: 5 });
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/getroles`
      );
      console.log(res);
      if (res.data.status === "success") {
        dispatch({ type: ROLES_ACCESS_LIST, payload: res.data.roles });
      }
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

export const modifyroleaccess = (data) => async (dispatch) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    //dispatch()
    console.log(data);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/modifyaccess`,
      data
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Access modified succussfuly`, time: 5 });
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

export const getarole = (role) => async (dispatch) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    dispatch({ type: SPECIFIC_ROLE_REQUEST });
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/getarole`,
      { role }
    );
    console.log(res);
    dispatch({ type: SPECIFIC_ROLE_SUCCESS, payload: res.data.role[0] });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const getroles = () => async (dispatch) => {
  try {
    dispatch({ type: ROLES_ACCESS_REQUEST });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/category/getroles`
    );
    console.log(res);
    if (res.data.status === "success") {
      dispatch({ type: ROLES_ACCESS_LIST, payload: res.data.roles });
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
