import React, { useState } from "react";
import "./css/App.scss";
import {
  BrowserRouter,
  Route,
  Redirect,
  useHistory,
  Switch,
} from "react-router-dom";
import { OfferBox } from "./core";

//Screen
import store from "./components/store";
import { Provider, useSelector } from "react-redux";
import Home from "./screen/Home";
import Product from "./screen/Product";
import Signup from "./screen/Signup";
import Login from "./screen/Login";
import Cart from "./screen/Cart";
import Checkout from "./screen/Checkout";
import RecoverPassword from "./screen/RecoverPassword";
import Profile from "./screen/Profile";
import UserOrders from "./screen/UserOrders";
import SearchResult from "./screen/SearchResult";
import Category from "./screen/Category";
import Wishlist from "./screen/Wishlist";
import { loaduser } from "./actions/auth";
import { getcategories } from "./actions/Admin/admincategory";
import TrackOrders from "./screen/TrackOrders";
import { loadcart } from "./actions/cart";
import { useEffect } from "react";
import VerifyConfirmemail from "./screen/VerifyConfirmemail";
import VerifyConfirmcode from "./screen/VerifyConfirmcode";
import ShippingAddress from "./screen/sub/ShippingAddressForm";
import Resetconfirmcode from "./screen/ResetConfirmCode";
import Changepassword from "./screen/ChangePassword";
import ResetConfirmemail from "./screen/ResetConfirmemail";
import Package from "./screen/Package";
import SiteLoading from "./components/siteloading";
import Review from "./screen/SubmitReview";
import Socket from "./screen/sub/Socket";
import NotFound from "./screen/PageNotFound";
import About from "./screen/About";
import Privacy from "./screen/Privacy";
import ReturnPolicy from "./screen/ReturnPolicy";
import Terms from "./screen/Terms";
import DeliveryPolicy from "./screen/DeliveryPolicy";
import Contact from "./screen/Contact";
import FAQ from "./screen/FAQ";
import Couriers from "./screen/Couriers";
import Careers from "./screen/Careers";
import Blogs from "./screen/Blogs";
import Blog from "./screen/Blog";
import GoogleMap from "./screen/Googlemap";
import Allpackages from "./screen/Allpackages";
// Protected Route
import Vendoradminsidebar from "./components/vendoradminsidebar";
import Preventadmin from "./components/preventadmin";
import AdminAndVendorRoute from "./components/adminandvendorroute";
import PreventAdminAndUnauthorized from "./components/preventadminandunauthorized";
import PreventAdminAndUser from "./components/preventadminanduser";
// Vendor Screen
import Dashboard from "./vendor/Dashboard";
import Sidebar from "./vendor/Sidebar";
import Header from "./vendor/Header";
import VendorOrders from "./vendor/VendorOrders";
import OrderInvoice from "./vendor/OrderInvoice";
import RequestOrder from "./vendor/RequestOrder";
import VendorProducts from "./vendor/VendorProducts";
import Users from "./vendor/Users";
import UserEdit from "./vendor/UserEdit";
import ProductRequest from "./vendor/ProductRequest";
import Categories from "./vendor/Categories";
import Scales from "./vendor/Scales";
import Roles from "./vendor/Roles";
import AdminSetting from "./vendor/AdminSetting";
import PriceList from "./vendor/PriceList";
import AdminOrderAll from "./vendor/AdminOrdersAll";
import VendorPackages from "./vendor/VendorPackages";
import Reviews from "./vendor/Reviews";
import EmailTamplete from "./screen/EmailTamplete";
import VendorBlogs from "./vendor/VendorBlog";
import OrdersReport from "./vendor/OrdersReport";

global.setHeader = "/";
global.siteName = "Freshlay";

function App(props) {
  useEffect(() => {
    store.dispatch(loaduser());
    store.dispatch(loadcart());
    store.dispatch(getcategories());
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     _getStart();
  //   }, 3000);
  // }, []);

  const _getStart = () => {
    OfferBox({
      title: "",
      content: (
        <div className="get-start">
          <img src="/images/annoce.jpeg" className="img" />
        </div>
      ),
    });
  };

  const AppRoutes = (props) => {
    const theuser = useSelector((state) => state.authreducer);
    const { loaded, isAuthenticated, user } = theuser;
    return (
      <React.Fragment>
        {loaded ? (
          <BrowserRouter>
            <Switch>
              {isAuthenticated ? (
                <>
                  {user.role === "user" || user.role === "rider" ? (
                    <>
                      <Socket />
                      <Switch>
                        <Route exact path="/" component={Home} />
                        {/*
      <Route 
        exact 
        path="/login" 
        component={Login} 
      />
      <Route 
        exact 
        path="/signup" 
        component={Signup} 
      />
      */}
                        <Route
                          exact
                          path="/recover-password"
                          component={RecoverPassword}
                        />
                        <Route
                          exact
                          path="/user/product/:productid"
                          component={Product}
                        />
                        <Route
                          exact
                          path="/user/package/:packageid"
                          component={Package}
                        />
                        <Route
                          exact
                          path="/user/confirmemail/:emaillink"
                          component={VerifyConfirmemail}
                        />
                        <Route
                          exact
                          path="/user/confirmcode/:number"
                          component={VerifyConfirmcode}
                        />
                        <Route
                          exact
                          path="/user/resetconfirmcode/:number"
                          component={Resetconfirmcode}
                        />
                        <Route
                          exact
                          path="/user/changepassword"
                          component={Changepassword}
                        />
                        <Route
                          exact
                          path="/user/confirmresetemail/:resetlink"
                          component={ResetConfirmemail}
                        />
                        <Route
                          exact
                          path="/user/search-result/:keyword"
                          component={SearchResult}
                        />

                        <Route
                          exact
                          path="/user/category/:categoryname"
                          component={Category}
                        />
                        <Route exact path="/user/cart" component={Cart} />
                        <Route
                          exact
                          path="/user/checkout"
                          component={Checkout}
                        />
                        <Route
                          exact
                          path="/user/checkout/:section"
                          component={Checkout}
                        />
                        <Route exact path="/user/profile" component={Profile} />
                        <Route
                          exact
                          path="/user/my-orders"
                          component={UserOrders}
                        />
                        <Route
                          exact
                          path="/user/my-orders/:section"
                          component={UserOrders}
                        />

                        <Route
                          exact
                          path="/user/wishlist"
                          component={Wishlist}
                        />
                        <Route
                          exact
                          path="/user/track-orders"
                          component={TrackOrders}
                        />
                        <Route
                          exact
                          path="/user/review/:orderid"
                          component={Review}
                        />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/privacy" component={Privacy} />
                        <Route
                          exact
                          path="/return-policy"
                          component={ReturnPolicy}
                        />
                        <Route
                          exact
                          path="/terms-conditions"
                          component={Terms}
                        />
                        <Route
                          exact
                          path="/delivery-policy"
                          component={DeliveryPolicy}
                        />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/faq" component={FAQ} />
                        <Route exact path="/couriers" component={Couriers} />
                        <Route exact path="/careers" component={Careers} />
                        <Route exact path="/blogs" component={Blogs} />
                        <Route
                          exact
                          path="/blogs/:section/:id"
                          component={Blog}
                        />
                        <Route exact path="/googlemap" component={GoogleMap} />
                        <Route
                          exact
                          path="/allpackages"
                          component={Allpackages}
                        />
                        <Route component={NotFound} />
                      </Switch>
                    </>
                  ) : (
                    <>
                      {/* Vendor Sidebar */}
                      {/* user.role === "vendor" || user.role === "admin" || user.role === "seller" */}

                      {
                        <Redirect
                          to={`${
                            window.location.pathname === "/"
                              ? "/dashboard"
                              : window.location.pathname
                          }`}
                        />
                      }
                      <div className="vendor-app flex rel">
                        <Vendoradminsidebar component={Sidebar} />
                        <div className="vendor-content flex flex-col">
                          <Vendoradminsidebar component={Header} />
                          <Switch>
                            <AdminAndVendorRoute
                              exact
                              path="/dashboard"
                              component={Dashboard}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/orders"
                              component={RequestOrder}
                            />
                            {
                              // <VendorProtectRoute
                              //    exact path="/request-order"
                              //    render={props => <RequestOrder {...props} />}
                              // />
                            }
                            <AdminAndVendorRoute
                              exact
                              path="/orders/:section"
                              component={RequestOrder}
                            />
                            {
                              //  <Route
                              //  exact path="/order-response"
                              //  render={props => <VendorOrders {...props} />}
                              //  />
                            }

                            <AdminAndVendorRoute
                              exact
                              path="/allorders"
                              component={AdminOrderAll}
                            />
                            <Route
                              exact
                              path="/orders-reports"
                              render={(props) => <OrdersReport {...props} />}
                            />
                            {
                              // <Route
                              // exact path="/order-response/:section"
                              // render={props => <VendorOrders {...props} />}
                              // />
                            }
                            <Route
                              exact
                              path="/order-invoice/:id"
                              render={(props) => <OrderInvoice {...props} />}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/requestproduct"
                              component={ProductRequest}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/products"
                              component={VendorProducts}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/products/:section/:id"
                              component={VendorProducts}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/users"
                              component={Users}
                            />
                            <Route
                              exact
                              path="/users/:section"
                              component={Users}
                            />
                            <Route
                              exact
                              path="/edit-user/:id"
                              render={(props) => <UserEdit {...props} />}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/categories"
                              component={Categories}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/categories/:section/:id"
                              component={Categories}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/scales"
                              component={Scales}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/scales/:section"
                              componnet={Scales}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/roles"
                              component={Roles}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/roles/:section/:role"
                              component={Roles}
                            />
                            <Route
                              exact
                              path="/price-list"
                              render={(props) => <PriceList {...props} />}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/settings"
                              component={AdminSetting}
                            />
                            <Route exact path="/reviews" component={Reviews} />
                            <Route
                              exact
                              path="/settings/:section"
                              component={AdminSetting}
                            />
                            <Route
                              exact
                              path="/packages"
                              component={VendorPackages}
                            />
                            <Route
                              exact
                              path="/packages/:section/:id"
                              component={VendorPackages}
                            />
                            <Route exact path="/careers" component={Careers} />
                            <AdminAndVendorRoute
                              exact
                              path="/blogging"
                              component={VendorBlogs}
                            />
                            <AdminAndVendorRoute
                              exact
                              path="/blogging/:section/:id"
                              component={VendorBlogs}
                            />
                            <Route component={NotFound} />
                          </Switch>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* we are adding here bcz in future we need to hide header to so admin side hide it too */}
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route
                      exact
                      path="/recover-password"
                      component={RecoverPassword}
                    />
                    <Route
                      exact
                      path="/user/product/:productid"
                      component={Product}
                    />
                    <Route
                      exact
                      path="/user/package/:packageid"
                      component={Package}
                    />
                    <Route
                      exact
                      path="/user/confirmemail/:emaillink"
                      component={VerifyConfirmemail}
                    />
                    <Route
                      exact
                      path="/user/confirmcode/:number"
                      component={VerifyConfirmcode}
                    />
                    <Route
                      exact
                      path="/user/resetconfirmcode/:number"
                      component={Resetconfirmcode}
                    />
                    <Route
                      exact
                      path="/user/changepassword"
                      component={Changepassword}
                    />
                    <Route
                      exact
                      path="/user/confirmresetemail/:resetlink"
                      component={ResetConfirmemail}
                    />
                    <Route
                      exact
                      path="/user/search-result/:keyword"
                      component={SearchResult}
                    />

                    <Route
                      exact
                      path="/user/category/:categoryname"
                      component={Category}
                    />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route
                      exact
                      path="/return-policy"
                      component={ReturnPolicy}
                    />
                    <Route exact path="/user/checkout" component={Checkout} />
                    <Route
                      exact
                      path="/user/checkout/:section"
                      component={Checkout}
                    />
                    <Route exact path="/user/cart" component={Cart} />
                    <Route exact path="/terms-conditions" component={Terms} />
                    <Route
                      exact
                      path="/delivery-policy"
                      component={DeliveryPolicy}
                    />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/faq" component={FAQ} />
                    <Route exact path="/couriers" component={Couriers} />
                    <Route exact path="/careers" component={Careers} />
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/blogs/:section/:id" component={Blog} />
                    <Route exact path="/googlemap" component={GoogleMap} />
                    <Route exact path="/allpackages" component={Allpackages} />
                    <Route component={NotFound} />
                  </Switch>
                </>
              )}
            </Switch>
          </BrowserRouter>
        ) : (
          <div className="splash flex aic">
            <div className="logo">
              <img src="/images/logo.svg" className="img" />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };
  return (
    <div className="App rel">
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  );
}

export default App;
