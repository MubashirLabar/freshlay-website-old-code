import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  LOAD_CART_ITEM,
  CART_UPDATE_PRICE,
} from "./types";
import zuz from "../core/Toast";
import { useHistory } from "react-router-dom";

import setheadertoken from "../utils/setheadertoken";

// creating orders
// screens/palceorder screen
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const { authreducer } = getState();
    const { user } = authreducer;
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/createorder`,
      order
    );
    //console.log(data)
    if (data.status === "success") {
      localStorage.setItem(
        "currentorderphone",
        order.orderlocation.address.cellphone
      );
      let token;
      if (user) {
        token = localStorage.myjwttoken;
      } else {
        //console.log('token',data.token)
        token = data.token;
      }
      //theorder.userId = userId;
      localStorage.setItem(
        "cartItems",
        JSON.stringify({ cartItems: getState().cartReducer.cartItems })
      );
      let res;
      if (user) {
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/addnotification`,
          {
            data: {
              notificationtype: "order",
              userid: data.order.vendorId,
              type: `order`,
              img: "new-order",
              label: `New Order Recieved`,
              text: "Response to order as early as possible",
              stamp: Date.now(),
            },
          }
        );
      } else {
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/addnotification`,
          {
            data: {
              notificationtype: "order",
              userid: data.order.vendorId,
              type: `order`,
              img: "new-order",
              label: `New Order Recieved`,
              text: "Response to order as early as possible",
              stamp: Date.now(),
            },
          },
          {
            headers: {
              myjwttoken: token,
            },
          }
        );
      }
      let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
      ws.onopen = () =>
        ws.send(
          JSON.stringify({
            type: "notification",
            token,
            data: res.data.notifications[0],
          })
        );
      setTimeout(() => {
        window.location.href = "/user/checkout/checkout-finish";
      }, 1000);
    }
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
        return false;
      } else {
        zuz.Toast.show({ html: `${error.response.statusText}`, time: 10 });
        return false;
      }
    }
  }
};

export const getOrders = () => async (dispatch, getState) => {
  if (localStorage.myjwttoken) {
    setheadertoken(localStorage.myjwttoken);
  }
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/getorders`
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      } else {
        zuz.Toast.show({ html: `${error.response.statusText}`, time: 10 });
      }
    }
  }
};
