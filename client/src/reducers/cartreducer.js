import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  LOAD_CART_ITEM,
  CART_UPDATE_PRICE,
  UPDATE_ORDER_ADDRESS,
  LOAD_CART_ITEM_REQUEST,
} from "../actions/types";
export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
    itemsprice: {},
    orderaddress: null,
    paymentMethod: null,
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case LOAD_CART_ITEM_REQUEST:
      return { loading: true, ...state };
    case LOAD_CART_ITEM:
      return { ...state, cartItems: action.payload };
    case CART_ADD_ITEM:
      const item = action.payload;
      let existItem;
      if (state.cartItems) {
        if (item.type === "product") {
          existItem = state.cartItems.find((x) => x.product === item.product);
          if (existItem) {
            console.log("in exist item");
            return {
              ...state,
              cartItems: state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
              ),
              loading: false,
            };
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, item],
              loading: false,
            };
          }
        } else if (item.type === "package") {
          existItem = state.cartItems.find((x) => x.package === item.package);
          if (existItem) {
            return {
              ...state,
              cartItems: state.cartItems.map((x) =>
                x.package === existItem.package ? item : x
              ),
              loading: false,
            };
          } else {
            return {
              ...state,
              cartItems: [...state.cartItems, item],
              loading: false,
            };
          }
        }
      }

    case UPDATE_ORDER_ADDRESS:
      return {
        ...state,
        orderaddress: action.payload,
        loading: false,
      };
    case CART_UPDATE_PRICE:
      console.log(action.payload);
      return {
        ...state,
        itemsprice: action.payload,
        loading: false,
      };
    case CART_REMOVE_ITEM:
      //let cartItems = state.cartItems.filter((x) => x.product !== action.payload)
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.cart_id !== action.payload),
        loading: false,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
        loading: false,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
