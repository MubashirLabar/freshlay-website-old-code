import axios from "axios";
import { ADMIN_DASHBOARD_REQUEST, ADMIN_DASHBOARD_SUCCESS } from "../types";
import zuz from "../../core/Toast";

export const getdashboarddata = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DASHBOARD_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/site/getdashboarddata`
    );
    dispatch({ type: ADMIN_DASHBOARD_SUCCESS, payload: data.data });
    return true;
  } catch (error) {
    if (error.response) {
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const reloaddashboarddata = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/site/getdashboarddata`
    );
    dispatch({ type: ADMIN_DASHBOARD_SUCCESS, payload: data.data });
    return true;
  } catch (error) {
    if (error.response) {
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};
