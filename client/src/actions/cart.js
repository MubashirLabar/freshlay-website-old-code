import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  LOAD_CART_ITEM_REQUEST,
  LOAD_CART_ITEM,
  CART_UPDATE_PRICE,
  UPDATE_ORDER_ADDRESS,
} from "./types";


export const loadcart = () => async (dispatch,getState) => {
  //const cartItems = (localStorage.cartItems);
  const CartITEMs = JSON.parse(localStorage.getItem("cartItems"));
  let ordertotal = 0;
  let subtotal = 0;
  let savings = 0;
  if (CartITEMs) {
    const { cartItems } = CartITEMs;
    if (CartITEMs && cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].unit === "kg") {
          subtotal =
            subtotal +
            parseInt(cartItems[i].price) * parseInt(cartItems[i].qty);
          savings =
            savings +
            parseInt(cartItems[i].discount) * parseInt(cartItems[i].qty);
        } else if (cartItems[i].unit === "g") {
          subtotal = Math.floor(
            subtotal + (parseInt(cartItems[i].price) * cartItems[i].qty) / 1000
          );
          savings = Math.floor(
            savings +
              (parseInt(cartItems[i].discount) * cartItems[i].qty) / 1000
          );
        } else {
          subtotal =
            subtotal +
            parseInt(cartItems[i].price) * parseInt(cartItems[i].qty);
          savings =
            savings +
            parseInt(cartItems[i].discount) * parseInt(cartItems[i].qty);
        }
        // else {
        //  subtotal = subtotal + parseInt(cartItems[i].price) * cartItems[i].qty
        //console.log(parseInt(cartItems[i].orignalPrice))
        //   savings = savings + parseInt(cartItems[i].discount) * cartItems[i].qty
        // }
      }
    } else {
      dispatch({
        type: LOAD_CART_ITEM,
        payload: [],
      });
    }

    if (CartITEMs && cartItems) {
      const { cartItems } = CartITEMs;
      dispatch({
        type: LOAD_CART_ITEM,
        payload: cartItems,
      });
    }
  }
  ordertotal = subtotal - savings;
  //const thediscount  =  (ordertotal * 40) / 100
  //ordertotal = ordertotal - ordertotal * 40 / 100;
  //console.log('ordertotal',ordertotal)
  const itemprices ={
  ordertotal,
  subtotal,
  savings,
  //discount
  }
  dispatch(updatecartPrice(itemprices));
  let orderaddresss;
  const {token} = getState().authreducer;
  console.log(getState().authreducer)
  console.log('checking autheticated',token)
  if(token){
    console.log('inside')
   orderaddresss =  localStorage.getItem("orderaddress");
  }
  else {
    console.log('else')
   orderaddresss =  localStorage.getItem("orderaddressnonlogined");
  }
  if (orderaddresss) {
    dispatch(updateorderaddress(JSON.parse(orderaddresss)));
  }
};

export const loadaddress = () => async (dispatch,getState) => {

  const {token} = getState().authreducer;
  let orderaddresss;
  if(token){
   orderaddresss =  localStorage.getItem("orderaddress");
  }
  else {
   orderaddresss =  localStorage.getItem("orderaddressnonlogined");
  }
  if (orderaddresss) {
    dispatch(updateorderaddress(JSON.parse(orderaddresss)));
  }
};

export const updateorderaddress = (addressid) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_ORDER_ADDRESS,
    payload: addressid,
  });
  const {token} = getState().authreducer;
  if(token) {
    localStorage.setItem("orderaddress", JSON.stringify(addressid));
  }
  else {
    localStorage.setItem("orderaddressnonlogined", JSON.stringify(addressid));
  }
 
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const saveShippingAddressnonlogied = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_ORDER_ADDRESS,
    payload: data,
  });
};

export const updatepaymentmethod = (paymentmethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentmethod,
  });
};

export const updatecartPrice = (orderprice) => async (dispatch) => {
  dispatch({
    type: CART_UPDATE_PRICE,
    payload: orderprice,
  });
};

export const UpdatetheCart =
  ({
    id,
    qty,
    unit,
    label_en,
    media,
    price,
    chopped,
    choppedimg,
    discount,
    prod_id,
    label_ur,
    category,
    cart_id,
    type,
    orgunit,
  }) =>
  async (dispatch, getState) => {
    // we getting id and qty from cart screen
    // first we are saving items in redux
    // see in cartReducers to know more about it
    //console.log("cart actions", id, qty, unit, label_en, media, price);
    //console.log("productid", prod_id);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: id,
        label_en,
        label_ur,
        media,
        unit,
        chopped,
        choppedimg,
        category,
        qty,
        price,
        discount,
        prod_id,
        cart_id,
        type,
        orgunit,
      },
    });
    // then we getting items from redux and then saving in localstorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify({ cartItems: getState().cartReducer.cartItems })
    );
  };

export const addToCart =
  ({ cart_id, id, chopped, choppedimg, qty, unit, type, orgunit }) =>
  async (dispatch, getState) => {
    // we getting id and qty from cart screen
    //console.log(id, qty, unit,type);
    if (type === "product") {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/getaproduct/${id}`
      );
      //console.log(data.product);
      dispatch({
        type: CART_ADD_ITEM,
        // we need type of item in vendor side and backend
        payload: {
          cart_id,
          product: id,
          type: type,
          chopped,
          choppedimg,
          label_en: data.product.label_en,
          media: data.product.media,
          label_ur: data.product.label_ur,
          unit,
          category: data.product.category,
          qty,
          price: data.product.price,
          discount: data.product.discount,
          prod_id: data.product.prod_id,
          orgunit,
        },
      });
    } else if (type === "package") {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/package/getapackage/${id}`
      );
      //console.log(data)
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          cart_id,
          package: data.package._id,
          type: type,
          //label_en: data.product.label_en,
          media: data.package.media,
          //label_ur: data.product.label_ur,
          //unit,
          //category: data.product.category,
          qty: 1,
          price: data.package.price,
          discount: data.package.discount,
          PKG_id: data.package.PKG_id,
          vendorId: data.package.vendorId,
          packageitems: data.package.packageitems,
        },
      });
    }
    localStorage.setItem(
      "cartItems",
      JSON.stringify({ cartItems: getState().cartReducer.cartItems })
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  //console.log('iddd',id)
  dispatch({
    type: LOAD_CART_ITEM_REQUEST,
    loading: true,
  });
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
