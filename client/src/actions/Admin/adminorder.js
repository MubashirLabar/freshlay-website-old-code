import axios from "axios";
import {
  ADMIN_DAILY_ORDER_REQUEST,
  ADMIN_DAILY_ORDER_SUCCESS,
  UPDATE_DAILY_ORDER_LIVE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  GET_VENDOR_RIDERS,
} from "../types";
import zuz from "../../core/Toast";

export const getvendorriders = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/getvendorriders/${id}`
    );
    if (res.data.status === "success") {
      //zuz.Toast.show({html:`Request has been ${res.data.approval}`, time: 5});
      dispatch({ type: GET_VENDOR_RIDERS, payload: res.data.vendorriders });
    }
  } catch (error) {
    //  dispatch(setAlert('Failed to save image', 'danger'))
    console.log(error);
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const respondtoorder = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/responseorder`,
      data
    );
    console.log("order accepted", res);
    if (res.data.status === "success") {
      zuz.Toast.show({
        html: `Request has been ${res.data.approval}`,
        time: 5,
      });
      const { data } = res;
      {
        const { theorder } = data;
        //theorder.phoneno = user.phoneno
        const token = localStorage.myjwttoken;

        console.log("orderresponse", theorder);
        let res;
        if (theorder.approval === "accepted")
          res = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/addnotification`,
            {
              data: {
                notificationtype: "orderresponse",
                userid: theorder.userId,
                type: `order${theorder.approval}`,
                img: "order-accepted",
                label: `Order Accepted`,
                text: "Your order has been accepted",
                stamp: theorder.updatedAt,
              },
            }
          );
        else if (theorder.approval === "rejected") {
          res = await axios.post(
            `${process.env.REACT_APP_API_URL}/user/addnotification`,
            {
              data: {
                notificationtype: "orderresponse",
                userid: theorder.userId,
                type: `order${theorder.approval}`,
                img: "order-rejected",
                label: `Order Rejected`,
                text: `${theorder.rejected}`,
                stamp: theorder.updatedAt,
              },
            }
          );
        }
        console.log(res.data);
        let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
        ws.onopen = () =>
          ws.send(
            JSON.stringify({
              type: "notification",
              token,
              data: res.data.notifications[0],
            })
          );
      }
      dispatch(getOrders());
    }
  } catch (error) {
    //  dispatch(setAlert('Failed to save image', 'danger'))
    console.log(error);
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const liveorders = (data) => async (dispatch, getState) => {
  try {
    //dispatch({ type: UPDATE_DAILY_ORDER_LIVE, payload: data });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/getvendersorder`
    );
    dispatch({
      type: ADMIN_DAILY_ORDER_SUCCESS,
      payload: {
        pendingorder: data.pendingorder,
        vendororders: data.allorders,
      },
    });
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getallOrders = (body) => async (dispatch, getState) => {
  try {
    console.log("get all ", body);
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/allorders`,
      body
    );
    console.log(data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

export const getOrders = (body) => async (dispatch, getState) => {
  try {
    console.log("get orders ", body);
    dispatch({ type: ADMIN_DAILY_ORDER_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/getvendersorder`,
      body
    );
    dispatch({
      type: ADMIN_DAILY_ORDER_SUCCESS,
      payload: {
        pendingorder: data.pendingorder,
        vendororders: data.allorders,
      },
    });
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};
