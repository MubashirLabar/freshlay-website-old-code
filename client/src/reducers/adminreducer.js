import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  CREATE_USER_RESULT,
  USER_CREATED,
  ALL_SETTINGS,
  ALL_SETTINGS_REQUEST,
  ROLES_ACCESS_REQUEST,
  ROLES_ACCESS_LIST,
  ADMIN_DASHBOARD_REQUEST,
  ADMIN_DASHBOARD_SUCCESS, //ADMIN_UPDATE_LOGO_SETTINGS_SUCCESS
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_DASHBOARD_LOGINED,
  GET_VENDOR_RIDERS,
} from "../actions/types";

export const usersreducers = (
  state = {
    usersloaded: false,
    loaded: false,
    usercreated: null,
    roles: [],
    user_loaded: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST: {
      return { usersloaded: false };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        usersloaded: true,
      };
    }
    case CREATE_USER_RESULT: {
      return {
        ...state,
        usercreated: true,
      };
    }
    case USER_CREATED: {
      return {
        ...state,
        usercreated: false,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        user_loaded: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user_loaded: true,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};

export const admindashboard = (
  state = {
    loaded: false,
    details: {},
    vendorriders: [],
    lastweekuploaded: [],
    productrequests: [],
  },
  action
) => {
  switch (action.type) {
    case GET_VENDOR_RIDERS: {
      return {
        ...state,
        vendorriders: action.payload,
      };
    }
    case ADMIN_DASHBOARD_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case ADMIN_DASHBOARD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        details: action.payload,
      };
    }

    default:
      return state;
  }
};

export const sitesettingsredicer = (
  state = { settings: {}, loaded: false, roles: [] },
  action
) => {
  switch (action.type) {
    case ALL_SETTINGS: {
      return {
        ...state,
        loaded: true,
        settings: action.payload,
      };
    }
    case ALL_SETTINGS_REQUEST: {
      return {
        ...state,
        loaded: false,
      };
    }
    case ROLES_ACCESS_REQUEST: {
      return {
        ...state,
        rolesloaded: false,
      };
    }
    case ROLES_ACCESS_LIST: {
      return {
        ...state,
        rolesloaded: true,
        roles: action.payload,
      };
    }
    default:
      return state;
  }
};
