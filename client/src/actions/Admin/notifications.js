import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "../types";
import axios from "axios";
import zuz from "../../core/Toast";

export const addnotifiction = (body) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NOTIFICATION, payload: body });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};

export const deletenotification = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      {
        zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
      }
    }
  }
};
