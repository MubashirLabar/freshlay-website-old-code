import { combineReducers } from "redux";
import authreducer from "./authreducer";
import { cartReducer } from "./cartreducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./orderreducer";
import { Categoryreducer } from "./categoryscalerolereducer";
import {
  AdminProductList,
  homepageproductListReducer,
  filterdproducts,
  productDetailsReducer,
  searchproducts,
} from "./productreducer";
import {
  admindashboard,
  usersreducers,
  sitesettingsredicer,
} from "./adminreducer";
import { notificationReducer } from "./notificationreducer";
import generalReducers from "./generalReducers";

const rootreducer = combineReducers({
  myhomepageproducts: homepageproductListReducer,
  filterdproducts: filterdproducts,
  productdetails: productDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderlist: orderListReducer,
  adminproductlist: AdminProductList,
  categoriesandroles: Categoryreducer,
  allusers: usersreducers,
  notification: notificationReducer,
  searchproducts,
  dashboarddata: admindashboard,
  sitesetings: sitesettingsredicer,
  authreducer,
  cartReducer,
  generalReducers,
});

export default rootreducer;
