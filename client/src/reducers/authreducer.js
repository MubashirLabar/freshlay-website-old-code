import {
  LOGIN_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  GET_USER,
  AUTHENTICATION_FAIL,
  SIGNUP_SUCCESS,
  INITIAL_DATA,
  SET_DASHBOARD_LOGINED,
  SET_NUMBER_VERIFY,
  ADD_TO_WISHLIST,
  SET_EMAIL_VERIFY,
} from "../actions/types";
import zuz from "../core/Toast";
import setheadertoken from "../utils/setheadertoken";
import axios from "axios";

const initialstates = {
  token: localStorage.getItem("myjwttoken"),
  isAuthenticated: null,
  loaded: false,
  dashboardlogined: false,
  isAdmin: JSON.parse(localStorage.getItem("isAdmin")),
  // emailverify : false,
  user: null,
  wishlist: [],
  emailverify: null,
  numberverify: null,
};

export default function (state = initialstates, action) {
  switch (action.type) {
    case SET_DASHBOARD_LOGINED: {
      return { ...state, dashboardlogined: action.payload };
    }
    case ADD_TO_WISHLIST: //console.log('inside add to wishlist')
    {
      if (state.wishlist.length == 0) {
        zuz.Toast.show({ html: `Added to wishlist`, time: 5 });
        state.wishlist.push(action.payload);
      } else if (state.wishlist.length != 0) {
        const check = state.wishlist.map(
          (item) => item.id == action.payload.id
        );
        if (check.includes(true)) {
          // deleting id
          let newwishlist = state.wishlist.filter(
            (item) => item.id != action.payload.id
          );
          return {
            ...state,
            wishlist: newwishlist,
          };
        } else {
          state.wishlist.push(action.payload);
          zuz.Toast.show({ html: `Added to wishlist`, time: 5 });
          return {
            ...state,
          };
        }
      }
    }
    case SET_EMAIL_VERIFY: {
      return {
        ...state,
        emailverify: action.payload.set,
      };
    }
    case SET_NUMBER_VERIFY: {
      return {
        ...state,
        numberverify: action.payload.set,
      };
    }
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS: {
      localStorage.setItem("myjwttoken", action.payload.token);
      return {
        ...state,
        //isAuthenticated : true,
        token: action.payload.token,
      };
    }
    case INITIAL_DATA: {
      return {
        ...state,
        emailverify: true,
        user: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload.data,
        wishlist: action.payload.data.favourite,
        isAuthenticated: true,
        loaded: true,
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        signup: false,
        // we can put error here too if neccessary
        error: action.payload,
      };
    }
    case LOGIN_FAIL:
    case AUTHENTICATION_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isAdmin: false,
        loaded: true,
      };
    }
    default:
      return state;
  }
}
