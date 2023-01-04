import axios from "axios";
import zuz from "../../core/Toast";
import {
  SELECT_CATEGORY_PRODUCT_REQUEST,
  SELECT_CATEGORY_PRODUCT_SUCCESS,
  PRODUCT_REQUESTS_LIST_REQUEST,
  PRODUCT_REQUESTS_LIST_SUCCESS,
} from "../types";

export const responseproductrequest = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/responseproductrequest`,
      data
    );
    console.log(res);
    const { productrequest } = res.data;

    let res2 = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/addnotification`,
      {
        data: {
          notificationtype: "productrequestresponse",
          userid: productrequest.vendorId,
          type: `productrequest${productrequest.approval}`,
          img: `request-${productrequest.approval}`,
          label: `Product stock request`,
          text: `Your product stock request has been ${productrequest.approval}`,
          stamp: Date.now(),
        },
      }
    );

    const token = localStorage.myjwttoken;
    let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
    ws.onopen = () =>
      ws.send(
        JSON.stringify({
          type: "notification",
          token,
          data: res2.data.notifications[0],
        })
      );
    //ws.onopen = () => ws.send(JSON.stringify({ type: "productstockresponse",token , productrequest }));
    if (res.data.status === "success") {
      zuz.Toast.show({
        html: `Request has been ${res.data.approval} successfully`,
        time: 5,
      });
      if (res.data.status === "success") {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/product/getproductrequests`
        );
        console.log(res);
        dispatch({
          type: PRODUCT_REQUESTS_LIST_SUCCESS,
          payload: res.data.allproductrequest,
        });
        return true;
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

export const getProductrequest = (data) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REQUESTS_LIST_REQUEST });
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/getproductrequests`,
      data
    );
    console.log(res);
    dispatch({
      type: PRODUCT_REQUESTS_LIST_SUCCESS,
      payload: res.data.allproductrequest,
    });
    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const ReloadProductrequest = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/getproductrequests`
    );
    dispatch({
      type: PRODUCT_REQUESTS_LIST_SUCCESS,
      payload: res.data.allproductrequest,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const CreateProductrequest = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/productrequest`,
      data
    );
    let res2 = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/addnotification`,
      {
        data: {
          notificationtype: "productstockrequest",
          userid: "admin",
          type: `productrequest`,
          img: "productstockrequest",
          label: `New product stock request`,
          text: "New product stock request recieved",
          stamp: Date.now(),
        },
      }
    );

    const token = localStorage.myjwttoken;
    let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`);
    ws.onopen = () =>
      ws.send(
        JSON.stringify({
          type: "notification",
          token,
          data: res2.data.notifications[0],
        })
      );
    //ws.onopen = () => ws.send(
    // JSON.stringify({
    //  type: "productstockrequest",
    //  token,
    //  product: res.data.productrequest,
    // })
    //);
    if (res.data.status === "success") {
      zuz.Toast.show({
        html: `Request has been sended to admin for approval`,
        time: 5,
      });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/getproductrequests`
      );
      dispatch({
        type: PRODUCT_REQUESTS_LIST_SUCCESS,
        payload: res.data.allproductrequest,
      });
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

export const categoryProductselction = (filter) => async (dispatch) => {
  try {
    console.log("selection called");
    dispatch({ type: SELECT_CATEGORY_PRODUCT_REQUEST });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/getadminproductlist`,
      filter
    );
    console.log(data);
    dispatch({
      type: SELECT_CATEGORY_PRODUCT_SUCCESS,
      payloadproduct: data.Products,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};
