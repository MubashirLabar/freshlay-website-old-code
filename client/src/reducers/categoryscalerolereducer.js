import {
  CATEGORIES_LIST_SUCCESS,
  CATEGORY_REQUEST,
  CATEGORIES_LIST_FAIL,
  CATEGORIES_LIST_REQUEST,
  CATEGORY_SUCCESS,
  ROLES_ACCESS_REQUEST,
  ROLES_ACCESS_LIST,
  SPECIFIC_ROLE_REQUEST,
  SPECIFIC_ROLE_SUCCESS,
  SCALE_LIST_REQUEST,
  SCALE_LIST_SUCCESS,
} from "../actions/types";

export const Categoryreducer = (
  state = {
    categories: [],
    category: null,
    cat_loaded: false,
    access_loaded: false,
    roles: [],
    roleaccess: {},
    scale_loaded: false,
    scales: [],
  },
  action
) => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST: {
      return { loaded: false };
    }
    case CATEGORIES_LIST_SUCCESS: {
      return {
        ...state,
        loaded: true,
        categories: action.payload,
      };
    }
    case CATEGORY_REQUEST: {
      return {
        ...state,
        cat_loaded: false,
      };
    }
    case CATEGORY_SUCCESS: {
      return {
        ...state,
        cat_loaded: true,
        category: action.payload,
      };
    }
    case ROLES_ACCESS_REQUEST: {
      return {
        ...state,
        roles_loaded: false,
      };
    }
    case ROLES_ACCESS_LIST: {
      return {
        ...state,
        roles_loaded: true,
        access_loaded: false,
        roles: action.payload,
      };
    }
    case SPECIFIC_ROLE_REQUEST: {
      return {
        ...state,
        access_loaded: false,
      };
    }
    case SPECIFIC_ROLE_SUCCESS: {
      return {
        ...state,
        access_loaded: true,
        roleaccess: action.payload,
      };
    }
    case SCALE_LIST_REQUEST: {
      return {
        ...state,
        scale_loaded: false,
      };
    }
    case SCALE_LIST_SUCCESS: {
      return {
        ...state,
        scale_loaded: true,
        scales: action.payload,
      };
    }
    default:
      return state;
  }
};
