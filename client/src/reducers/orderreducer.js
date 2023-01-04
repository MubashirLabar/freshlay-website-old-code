import {
  ADMIN_DAILY_ORDER_REQUEST,
  ADMIN_DAILY_ORDER_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  UPDATE_DAILY_ORDER_LIVE,
} from "../actions/types";
import zuz from "../core/Toast";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    loading: true,
    orderitemsactive: [],
    orderitemsprev: [],
    new_order_loaded: false,
    new_orders: [],
    vendor_orders: [],
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderitemsactive: action.payload.userordersactive,
        orderitemsprev: action.payload.userordersprev,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_DAILY_ORDER_REQUEST:
      return {
        ...state,
        new_order_loaded: false,
      };
    case ADMIN_DAILY_ORDER_SUCCESS:
      return {
        ...state,
        new_order_loaded: true,
        new_orders: action.payload.pendingorder,
        vendor_orders: action.payload.vendororders,
      };
    case UPDATE_DAILY_ORDER_LIVE:
      const anorder = action.payload;
      return {
        ...state,
        daily_orders: [anorder, ...state.daily_orders],
      };
    //}
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loaded: false,
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loaded: true,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
