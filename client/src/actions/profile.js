import { GET_USER } from "./types";
import axios from "axios";
import { loaduser } from "./auth";
import zuz from "../core/Toast";
import { generateID } from "../core";
import setheadertoken from "../utils/setheadertoken";
import { saveShippingAddressnonlogied,updateorderaddress } from "./cart";
export const updatepassword =
  (currentpassword, newpassword) => async (dispatch) => {
    try {
      const data = {
        //    userid,
        currentpassword,
        newpassword,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/updatepassword`,
        data
      );
      if (res.data.status === "success") {
        zuz.Toast.show({
          html: "Password has been updated succesfully",
          time: 5,
        });
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  };

export const updateaddressbook =
  (user, addressobject, setnonloginedaddresses) => async (dispatch) => {
    try {
      const cart_id = generateID(4, 5);
      if (user) {
        dispatch({ type: "UPDATE_ORDER_ADDRESS", payload: null });
        console.log(user, "addressbook", addressobject);
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/updateaddressbook`,
          addressobject
        );
        if (res.data.status === "success") {
          dispatch(loaduser());
        }
      } else {
        dispatch({ type: "UPDATE_ORDER_ADDRESS", payload: null });
        let addresses = JSON.parse(
          localStorage.getItem("saveaddressnonlogined")
        );
        if (!addresses) {
          console.log("saveaddressnonlogined", addressobject);
          localStorage.setItem(
            "saveaddressnonlogined",
            JSON.stringify([{ _id: cart_id, ...addressobject }])
          );
          addresses = JSON.parse(localStorage.getItem("saveaddressnonlogined"));
          setnonloginedaddresses(addresses);
          dispatch(updateorderaddress({address : {_id: cart_id, ...addressobject}}))
        } else {
          if (addressobject._id) {
            let newaddressbook = addresses.map((x) =>
              x._id === addressobject._id ? addressobject : x
            );
            localStorage.setItem(
              "saveaddressnonlogined",
              JSON.stringify([...newaddressbook])
            );
            console.log("updatedaddressbook", addressobject);
            dispatch(updateorderaddress({address : {...addressobject}}))
          } else {
            localStorage.setItem(
              "saveaddressnonlogined",
              JSON.stringify([{ _id: cart_id, ...addressobject }, ...addresses])
            );
            dispatch(updateorderaddress({address : {_id: cart_id, ...addressobject}}))
          }
          // save non-logined user address
          //dispatch(saveShippingAddressnonlogied({address : addressobject}))
          addresses = JSON.parse(localStorage.getItem("saveaddressnonlogined"));
          setnonloginedaddresses(addresses);
        }
      }
    } catch (error) {
      console.log(error);
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  };

export const updatedata = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/updateuser`,
      data
    );
    dispatch(loaduser());
    if (res.data.status === "success") {
      zuz.Toast.show({ html: "Info has been updated succesfully", time: 5 });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    }
  }
};

/*  export const updatepic = (picname) => async dispatch => {
        try {
            console.log('here')
            let data = {
                photo : picname
            }
                   const res = await axios.post('http://127.0.0.1:5000/user/updatedata',data)
                   console.log(res);
                   console.log(res.data.data.users);
                   dispatch({
                       type : GET_USER,
                       payload : res.data.data.users
                   })
                   dispatch(loaduser());
               } catch (error) {
                   console.log(error.response)
                 //  dispatch(setAlert(error.response, 'danger'))
               }
           }*/

export const uploadpic = (file) => async (dispatch) => {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  formData.append("file", file);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/uploadprofilephoto`,
      formData,
      config
    );
    if (res.data.status === "success") {
      setTimeout(function () {
        dispatch(loaduser());
      }, 1000);
    }
  } catch (error) {
    zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
  }
};
