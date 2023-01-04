import React from "react";
import axios from "axios";
import {
  SIGNUP_SUCCESS,
  GET_USER,
  LOGIN_FAIL,
  SIGNUP_FAIL,
  SET_NUMBER_VERIFY,
  LOGIN_SUCCESS,
  AUTHENTICATION_FAIL,
  INITIAL_DATA,
  ADD_TO_WISHLIST,
  SET_EMAIL_VERIFY,
  SET_DASHBOARD_LOGINED,
  ADD_NOTIFICATION,
  LOAD_NOTIFICATION,
} from "./types";
import zuz from "../core/Toast";

//import {setAlert} from './setalert';
import setheadertoken from "../utils/setheadertoken";

export const loaduser = (history) => async (dispatch) => {
  let res;
  if (localStorage.myjwttoken) {
    try {
      res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/getuser`,{headers: {
          "myjwttoken" : localStorage.myjwttoken
        }
      }
      );
      setheadertoken(localStorage.myjwttoken);
      if (res.data.verified) {
        if (res.data.data.notifications) {
          dispatch({
            type: LOAD_NOTIFICATION,
            payload: res.data.data.notifications,
          });
        }
        if (
          (res.data.data.role === "user") ||
          (res.data.data.role === "rider")
        ) {
          if (history) {
            history.push("/");
          }
          // setTimeout(() => {
  
          // }, timeout);
          //   history.push('/')
        } else {
           //console.log(withRouter())
           dispatch({ type: SET_DASHBOARD_LOGINED, payload: true });
           if (history) {
             history.push("/dashboard");
           }
           //setTimeout((history) => {
           //  dispatch({ type: SET_DASHBOARD_LOGINED, payload: true });
           //  window.location.assign('/dashboard')
           //}, 100);
        }
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
        // }, 1000);
      } else {
        dispatch({
          type: AUTHENTICATION_FAIL,
        });
      }
    } catch (error) {
      localStorage.removeItem('myjwttoken')
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }
    
  }
  else  {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const addtowishlist = (id) => async (dispatch) => {
  try {
    console.log("wishlistid", id);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: id,
    });

    await axios.post(`${process.env.REACT_APP_API_URL}/user/addtowishlist`, id);
  } catch (error) {
    zuz.Toast.show({ html: `Failed To added in wishlist`, time: 5 });
  }
};

export const sendFacebookTokensingup =
  (userID, accessToken) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/facebookauthenticatesignup`,
        {
          userID,
          accessToken,
        }
      );
      if (res.data.token) {
        localStorage.setItem("myjwttoken", res.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response.data) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        return false;
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
        return false;
      }
    }
  };
export const sendFacebookTokensingin =
  (userID, accessToken) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/facebookauthenticatesignin`,
        {
          userID,
          accessToken,
        }
      );
      //console.log(res)
      if (res.data.token) {
        localStorage.setItem("myjwttoken", res.data.token);
        window.location.href = "/";
      } else {
        return false;
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
      }
      return false;
    }
  };
export const googleauthenticatesignup = (idToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ idToken });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/googleauthenticatesignup`,
      body,
      config
    );
    if (res.data.token) {
      localStorage.setItem("myjwttoken", res.data.token);
      window.location.href = "/";
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
    return false;
  }
};

export const googleauthenticatesignin = (idToken) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ idToken });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/googleauthenticatesignin`,
      body,
      config
    );
    //console.log('google repsonse',res.data)
    if (res.data.token) {
      localStorage.setItem("myjwttoken", res.data.token);
      window.location.href = "/";
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
    return false;
  }
};

export const retrylinksend = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/retrylink`,
      { email },
      config
    );
    if (res.data) {
      if (res.data.status === "success") {
        zuz.Toast.show({ html: `${res.data.message}`, time: 15 });
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      dispatch({
        type: SET_EMAIL_VERIFY,
        payload: { set: false },
      });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
  }
};

export const confirmlink = (link) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/confirmresetlink`,
      { link }
    );
    if (res.data) {
      if (res.data.status === "success") {
        localStorage.setItem("myjwttoken", res.data.data.resettoken);
        // save token to localstorage and redirect , auto loaduser()
        //console.log(res.data);
        window.location.href = "/user/changepassword";
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
  }
};

export const changepassword = (password) => async (dispatch) => {
  try {
    axios.defaults.headers.common["myjwttoken"] = localStorage.myjwttokenreset;
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/changepassword`,
      { password }
    );
    //console.log(res);
    if (res.data) {
      if (res.data.status === "success") {
        localStorage.removeItem("myjwttokenreset");
        window.location.href = `/login`;
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
  }
};

export const confirmCode =
  (code, phone, reset, number, email) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/verifycode`,
        { code, phone, reset, number, email },
        config
      );
      if (res.data) {
        if (res.data.status === "success") {
          if (res.data.reset) {
            localStorage.setItem("myjwttokenreset", res.data.data.resettoken);
            window.location.href = "/user/changepassword";
          } else {
            localStorage.setItem("myjwttoken", res.data.token);
            window.location.href = `/`;
          }
        }
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        dispatch({
          type: SET_EMAIL_VERIFY,
          payload: { set: false },
        });
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
      }
    }
  };

export const sendCodeForVerifyEmail =
  (email, notreload) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/sendcodetoverifyemail`,
        { email },
        config
      );
      if (res.data) {
        if (res.data.status === "success") {
          if (notreload) {
            zuz.Toast.show({
              html: "An Email has been sended, Code is valid for 5 minutes",
              time: 5,
            });
            return;
          } else {
            window.location.href = `/user/confirmcode/${email}`;
          }
        }
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        dispatch({
          type: SET_EMAIL_VERIFY,
          payload: { set: false },
        });
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
      }
    }
  };

export const verifyemail = (token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = { token: token };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/verifyemail`,
      body,
      config
    );
    if (res.data) {
      if (res.data.success === "true") {
        window.location.href = "/login";
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      dispatch({
        type: SET_EMAIL_VERIFY,
        payload: { set: false },
      });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
  }
};

export const resetwithemail = (email, sendingcodeagain) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  //console.log(body);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/resetpasswithemail`,
      body,
      config
    );
    if (sendingcodeagain) {
      zuz.Toast.show({ html: `${res.data.message}`, time: 5 });
      return true;
    } else {
      window.location.href = `/user/resetconfirmcode/${email}`;
    }
    return true;
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
    return true;
  }
};

export const resetandverifywithphone = (phoneno, type) => async (dispatch) => {
  //console.log(type);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ phoneno });
  //console.log(body);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/resetpasswordmessage`,
      body,
      config
    );
    if (res.data) {
      if (res.data.status === "success") {
        zuz.Toast.show({ html: `${res.data.message}`, time: 5 });
        if (type) {
          if (type.verifynumber) {
            window.location.href = `/user/confirmcode/${phoneno}`;
          } else if (type.resetpassword) {
            window.location.href = `/user/resetconfirmcode/${phoneno}`;
          }
        }
      }
    }
  } catch (error) {
    if (error.response) {
      zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.errors,
      });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
  }
};

export const login =
  (emailphone, password, history) => async (dispatch, getState) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ emailphone, password });
    //console.log(body);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        body,
        config
      );
      if (res.data.emailverify) {
        if (!res.data.emailverify.verify) {
          zuz.Toast.show({ html: `${"Please verify your email"}`, time: 10 });
          dispatch({
            type: SET_EMAIL_VERIFY,
            payload: { set: false },
          });
          return false;
        }
      } else if (res.data.numberverify) {
        if (!res.data.numberverify.verify) {
          zuz.Toast.show({ html: `${"Please verify your number"}`, time: 10 });
          dispatch({
            type: SET_NUMBER_VERIFY,
            payload: { set: false },
          });
          return false;
        }
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.data,
        });
        dispatch(loaduser(history));
        /*setTimeout(function () {
        if (
          res.data.data.userrole === "admin" ||
          res.data.data.userrole === "vendor" ||
          res.data.data.userrole === "seller" )
        {
         history.push('/dashboard')
        }
        else {
          history.push('/')
        }
       
      }, 1000);  */
      }
    } catch (error) {
      if (error.response) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.errors,
        });
      } else {
        zuz.Toast.show({ html: `Network error`, time: 5 });
      }
      return false;
    }
  };

export const signup = (username, emailphone, password) => async (dispatch) => {
  const letters = /^[A-Za-z]+$/;

  username = username.replace(/[^\w\s]/gi, "");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = { username, emailphone, password };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/create`,
      body,
      config
    );
    console.log(res.data);
    if (res.data) {
      if (res.data.success) {
        if (res.data.body.email) {
          await dispatch(sendCodeForVerifyEmail(emailphone));
          return false;
        } else if (res.data.body.phone) {
          dispatch(resetandverifywithphone(emailphone, { verifynumber: true }));
        }
      }
    }
  } catch (error) {
    if (error.response) {
      if (error.response.data.errors) {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
      dispatch({
        type: SIGNUP_FAIL,
        payload: error.response.data.errors,
      });
    } else {
      zuz.Toast.show({ html: `Network error`, time: 5 });
    }
    return false;
  }
};
