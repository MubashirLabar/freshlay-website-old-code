import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SET_DASHBOARD_LOGINED,
  AUTHENTICATION_FAIL,
  ADMIN_DASHBOARD_REQUEST,
} from "../actions/types";
import { useHistory } from "react-router-dom";

function Sidebar(props) {
  const dispatch = useDispatch();
  {
    //    {label: "Price List", icon: "icon-layers", slug:"/price-list"},
    //     http://localhost:3000/price-list
    //    {label: "Logout", icon: "icon-log-out", slug:"/logout"},
    //    {label: "Order response", icon: "icon-circle", slug:"/order-response"},
  }
  const { user } = useSelector((state) => state.authreducer);
  const { adminSidebar } = useSelector((state) => state.generalReducers);
  const history = useHistory();
  const [nav, setNav] = useState([
    { label: "Dashboard", icon: "icon-grid", slug: "/dashboard" },
    { label: "Orders Request", icon: "icon-download", slug: "/orders" },
    { label: "All Orders", icon: "icon-shopping-bag", slug: "/allorders" },
    { label: "Orders Report", icon: "icon-file-text", slug: "/orders-reports" },
    { label: "Categories", icon: "icon-layout", slug: "/categories/list/1" },
    // {label: "New Product", icon: "icon-inbox", slug:"/requestproduct"},
    { label: "Products", icon: "icon-folder", slug: "/products" },
    { label: "Scales", icon: "icon-codesandbox", slug: "/scales" },
    { label: "Packages", icon: "icon-gift", slug: "/packages" },
    { label: "Roles", icon: "icon-star", slug: "/roles" },
    { label: "Users", icon: "icon-users", slug: "/users" },
    { label: "Setting", icon: "icon-settings", slug: "/settings" },
    { label: "Reviews", icon: "icon-layers", slug: "/reviews" },
    { label: "Blog", icon: "icon-circle", slug: "/blogging" },
  ]);
  const [tab, setTab] = useState(null);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      dispatch({ type: "ADMIN_SIDEBAR", payload: false });
    });
    if ("__setNavTab" in window == false) {
      window.__setNavTab = (tab) => {
        setTab(tab);
      };
    }
  }, [tab]);

  return (
    <React.Fragment>
      <div
        className={`side-cvr abs fill anim ${adminSidebar ? "show" : "hide"}`}
      />
      <div
        className={`vendor-sidebar fixed flex flex-col anim ${
          adminSidebar ? "show" : "hide"
        }`}
      >
        <Link to="/" className="logo rfont s32 b5 flex aic">
          <img src="/images/logo.svg" className="img" />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "ADMIN_SIDEBAR", payload: false });
          }}
          className="cleanbtn cross fontr s30 c333 abs"
        >
          &times;
        </button>
        <div className="nav flex flex-col">
          {nav.map((item, index) => {
            const route = item.slug.split("/")[1];
            const userreadright = user.rights[route];
            //console.log('sidebar rights',userreadright)
            if (!userreadright) {
              return;
            } else if (userreadright.read) {
              return (
                <Link
                  key={index}
                  to={item.slug}
                  className={`item flex aic ${
                    tab == item.slug ? "color" : "c000"
                  }`}
                  onClick={() =>
                    dispatch({ type: "ADMIN_SIDEBAR", payload: false })
                  }
                >
                  <div className={`ico font ${item.icon} s24`} />
                  <div className="lbl font s16">{item.label}</div>
                </Link>
              );
            }
          })}
          {user.role === "admin" && (
            <Link
              to="/orders-reports"
              className={`item flex aic ${
                tab == "/orders-reports" ? "color" : "black"
              }`}
            >
              <div className={`ico rfont icon-circle s22`} />
              <div className="lbl rfont s16">Order reports</div>
            </Link>
          )}
          <button
            className="cleanbtn item flex aic lin rfont s15 c333 anim"
            onClick={() => {
              localStorage.removeItem("myjwttoken");
              localStorage.removeItem("isAdmin");
              window.location.href = "/login";
            }}
          >
            <div className={`ico icon-log-out s20`} />
            <div className="rfont s15">Logout</div>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;
