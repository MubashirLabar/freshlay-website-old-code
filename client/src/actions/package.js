import axios from "axios";
import {
    HOMEPAGE_PACKAGE_LIST_REQUEST,
    HOMEPAGE_PACKAGE_LIST_SUCCESS
} from "./types";
import zuz from "../core/Toast";

export const homepagepackages = (filter) => async (dispatch) => {
    try {
     
        dispatch({ type: HOMEPAGE_PACKAGE_LIST_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/package/allpackages`);
        //console.log(data)
        dispatch({
          type: HOMEPAGE_PACKAGE_LIST_SUCCESS,
          payload: data.allpackages,
        });
     
    } catch (error) {
      if (error.response) {
        if(error.response.data.errors)
        {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
        }
        else
        {
          zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
        }
      
      }
    }
  };
