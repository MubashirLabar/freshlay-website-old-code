import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  LOAD_NOTIFICATION,
} from "../actions/types";
import zuz from "../core/Toast";

export const notificationReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATION:
      return {
        notifications: action.payload,
      };
    case ADD_NOTIFICATION:
      // console.log('in notificatio',action.payload)
      return {
        notifications: [...action.payload, ...state.notifications],
      };
    case REMOVE_NOTIFICATION:
      const newnotification = state.notifications.filter(
        (item) => item._id !== action.payload
      );
      return {
        notifications: newnotification,
      };
    default:
      return state;
  }
};
