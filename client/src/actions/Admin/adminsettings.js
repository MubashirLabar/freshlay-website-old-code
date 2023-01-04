import {
  // ADMIN_UPDATE_LOGO_SETTINGS_REQUEST,
  ADMIN_UPDATE_LOGO_SETTINGS_REQUEST,
  ALL_SETTINGS,
  ALL_SETTINGS_REQUEST,
} from "../types";
import axios from "axios";
import zuz from "../../core/Toast";

export const getallsettings = () => async (dispatch) => {
  try {
    console.log("called");
    dispatch({ type: ALL_SETTINGS_REQUEST });
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/site/getsettings`
    );
    console.log(res);
    if (res.data.status === "success") {
      dispatch({ type: ALL_SETTINGS, payload: res.data.settings });
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

export const updatesettingswithlogo = (file, data) => async (dispatch) => {
  try {
    //console.log('called')
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(file, data);
    formData.append("file", file);
    formData.append("data", JSON.stringify(data));
    console.log(formData.entries());
    //dispatch()
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/site/updatesettingslogo`,
      formData,
      config
    );
    console.log(res);
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Data has been updated`, time: 5 });
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

export const updatesettings = (body) => async (dispatch) => {
  try {
    console.log(body);
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/site/updatesettings`,
      body
    );
    console.log(res);
    if (res.data.status === "success") {
      zuz.Toast.show({ html: `Data has been updated`, time: 5 });
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
