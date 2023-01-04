import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  CREATE_USER_RESULT,
  USER_CREATED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../types";
import axios from "axios";
import zuz from "../../core/Toast";

export const modifyuseraccess = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/edituseraccess`,
      data
    );
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Access has been modified`, time: 5 });
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getauser = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/getuser/${id}`
    );
    dispatch({ type: GET_USER_SUCCESS, payload: res.data.data });
    return res.data.data;
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getusers = (sortitem, status) => async (dispatch, getState) => {
  const { user } = getState().authreducer;
  try {
    dispatch({ type: GET_USERS_REQUEST });
    let res;
    if (user.role === "vendor") {
      res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/getvendorriders`,
        { ...sortitem, ...status }
      );
    } else if (user.role === "admin") {
      res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/admingetusers`,
        { ...sortitem, ...status }
      );
    }
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data.users });
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const edituser = (id, body) => async (dispatch) => {
  const { emailphone, password } = body.data;
  //console.log(body)
  let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailphone == null) {
    zuz.Toast.show({ html: "Enter your email Address or phone no", time: 5 });
  } else if (!emailphone.match(themail) && !emailphone.match(/^[0-9]+$/)) {
    zuz.Toast.show({ html: "Please input a valid email or phone no", time: 5 });
  } else if (password && password.length < 8) {
    zuz.Toast.show({
      html: "Your password length should be greater than 7 character",
      time: 5,
    });
  } else {
    try {
      // console.log(body)
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/edituser`,
        { id, body }
      );
      if (res.data.success) {
        zuz.Toast.show({ html: "User edit successfully", time: 5 });
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const createusers =
  ({
    username,
    address,
    fullname,
    role,
    status,
    emailphone,
    password,
    storelocationcity,
    storename,
    storelocationcoordinates,
    vehicleno,
    vendorId,
  }) =>
  async (dispatch) => {
    console.log("address", address);
    let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailphone == null) {
      zuz.Toast.show({ html: "Enter your email Address or phone no", time: 5 });
    } else if (!emailphone.match(themail) && !emailphone.match(/^[0-9]+$/)) {
      zuz.Toast.show({
        html: "Please input a valid email or phone no",
        time: 5,
      });
    } else if (fullname == null) {
      zuz.Toast.show({ html: "Enter a name", time: 5 });
    } else if (password == null) {
      zuz.Toast.show({ html: "Enter your password", time: 5 });
    } else if (password.length < 8) {
      zuz.Toast.show({
        html: "Your password length should be greater than 7 character",
        time: 5,
      });
    } else {
      try {
        // console.log(body)
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/createuser`,
          {
            username,
            address,
            fullname,
            role,
            status,
            emailphone,
            password,
            storelocationcity,
            storename,
            storelocationcoordinates,
            vehicleno,
            vendorId,
          }
        );
        if (res.data.success) {
          dispatch({ type: CREATE_USER_RESULT });
        }
      } catch (error) {
        if (error.response) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        }
      }
    }
  };

export const createinfo = () => async (dispatch) => {
  dispatch({ type: USER_CREATED });
};
