import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Screen
import Searchbox from "./sub/Searchbox";
import axios from "axios";

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  LIVE_PRODUCT_REQUESTS_LIST,
} from "../actions/types";
import moment from "moment";
//import {Howl, Howler} from 'howler';
//import myaudiofile from '../unconvinced-569.mp3';

function Header({ notBg }) {
  const [isTop, setTop] = useState(true);
  const [isUser, setUser] = useState(true);
  const [dropNotic, setDropNotic] = useState(false);
  const [nav, setNav] = useState([
    // { label: "Home", icon: "icon-home", slug: "/" },
    { label: "Offers", slug: "/allpackages" },
    { label: "Fruits", slug: "/user/category/Fruits" },
    { label: "Vegetables", slug: "/user/category/Vegetables" },
    { label: "Grocery & Meat", slug: "/user/category/Grocery" },
    { label: "Track", icon: "icon-map-pin", slug: "/user/track-orders" },
  ]);
  const [publicNav, setPulicNav] = useState([
    // { label: "Home", slug: "/" },
    { label: "Offers", slug: "/allpackages" },
    { label: "Fruits", slug: "/user/category/Fruits" },
    { label: "Vegetables", slug: "/user/category/Vegetables" },
    { label: "Grocery & Meat", slug: "/user/category/Grocery" },
    { label: "Blogs", slug: "/blogs" },
  ]);

  const [profile, setProfile] = useState([
    { label: "My Orders", icon: "icon-circle", slug: "/user/my-orders" },
    { label: "Profile", icon: "icon-user", slug: "/user/profile" },
    { label: "Wish List", icon: "icon-heart1", slug: "/user/wishlist" },
    { label: "Blogs", slug: "/blogs" },
  ]);
  const [allnotifications, setallNotifications] = useState([
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "1m",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "50m",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "1 hour",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "2 hour",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "3 hour",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "3 hour",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "3 hour",
      slug: "/",
    },
    {
      img: "icon-bell",
      label: "Congrats on your new Purchase",
      text: "Now see your order how far away from you.",
      stamp: "3 hour",
      slug: "/",
    },
  ]);

  const { loaded, isAuthenticated, user } = useSelector(
    (state) => state.authreducer
  );
  const { notifications } = useSelector((state) => state.notification);
  const [menu, setMenu] = useState(false);
  //const { loaded, isAuthenticated,user } = theuser
  //console.log('user in header',theuser)
  let data = useSelector((state) => state.cartReducer);
  const { hideSidebar } = useSelector((state) => state.generalReducers);
  const { cartItems } = data;
  const cartlength = cartItems ? cartItems.length : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setTop(false);
      } else {
        setTop(true);
      }
    };
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    document.body.addEventListener("click", () => {
      setDropNotic(false);
    });
  }, [menu]);

  useEffect(() => {
    if (hideSidebar == true) {
      setMenu(false);
    }
  }, [hideSidebar]);

  const removenotification = async (id) => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/user/removenotification/${id}`
    );
  };

  const Noticfications = () => {
    useEffect(() => {
      if (dropNotic) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      document.body.addEventListener("click", () => {
        setMenu(false);
      });
    }, [menu]);

    return (
      <button
        className="cleanbtn cart-btn flex aic not"
        onClick={(e) => {
          e.stopPropagation();
          setDropNotic(!dropNotic);
        }}
      >
        <div className="cart anim flex aic rel">
          <div className="icon s20 icon-bell1 color flex aic" />
          {notifications.length <= 0 ? (
            ""
          ) : (
            <div className="qty fontl s13 cfff abs flex aic">
              {notifications.length}
            </div>
          )}
        </div>
        {dropNotic && (
          <div className="notic-blk abs flex flex-col">
            <div className="hd sticky flex aic">
              <div className="lb fontl s18 b6 c000">Notifications</div>
              <button
                className="cross cleanbtn fontlr s36 c555 anim"
                onClick={() => setDropNotic(false)}
              >
                &times;
              </button>
            </div>
            {notifications.length > 0 ? (
              <div className="items flex flex-col">
                {notifications.map((item) => (
                  <button
                    onClick={() => removenotification(item._id)}
                    className="cleanbtn item flex aic"
                  >
                    <div className="img flex aic">
                      <img src={`/images/${item.data.img}.svg`} />
                    </div>
                    <div className="meta flex flex-col">
                      <div className="msg">
                        <span className="fontl s15 b6 color">
                          {item.data.label}
                        </span>
                        &nbsp;
                        <span className="fontl s14 c333">{item.data.text}</span>
                      </div>
                      <div className="stamp fontl s14 c777">
                        {moment(item.data.stamp).startOf("minute").fromNow()}
                      </div>
                    </div>
                    {/*<button onClick={() => removenotification(item._id)}>ok</button>*/}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className="empty flex flex-col aic"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <img src={`/images/icon_notifications.webp`} className="img" />
                <div className="lbl fontl s18 b6 black">
                  No notifications (Yet!)
                </div>
                <div className="ms fontl s13 c333">
                  Purchase something and start to seeing some activity here
                </div>
              </div>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <React.Fragment>
      {loaded ? (
        <React.Fragment>
          <div
            className={`header sticky flex aic anim ${
              isTop == false ? "bg" : ""
            } ${notBg == true && "bgnon"} ${menu ? "show" : "hide"}`}
          >
            <div
              className={`wrapWidth wrapper flex aic ${
                menu ? "open show anim" : "close hide anim"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Left Side */}
              <div className="left flex aic">
                <Link to="/" className="logo">
                  <img src={`/images/logo.svg`} className="img" />
                </Link>
                {!notBg && (
                  <Searchbox placeholder={`Search ${global.siteName}`} />
                )}
              </div>

              {/* Header Right Side */}
              <div className="right flex aic">
                {isAuthenticated == false ? (
                  <div className="p-nav nav flex aic">
                    {publicNav.map((item, index) => (
                      <Link
                        key={index}
                        to={item.slug}
                        className="flex aic lin fontl s16 b6 color anim rel"
                        onClick={() => {
                          document.documentElement.scrollTop = 0;
                          setMenu(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {/* <Link
                      to="/signup"
                      className="button btn fontl s15 flex aic anim"
                      onClick={() => setMenu(false)}
                    >
                      <div>Sign Up</div>
                    </Link> */}
                    <Link
                      to="/login"
                      className="button fontl s15 anim"
                      onClick={() => setMenu(false)}
                    >
                      {/*<div className="ico icon-user s22 c000" />*/}
                      <div>Sign In</div>
                    </Link>

                    <Link
                      to="/user/cart"
                      className="cleanbtn cart-btn cart flex aic rel"
                    >
                      <img className="img" src="/images/cart-fill.svg" />
                      {cartlength !== 0 && (
                        <div className="qty ct fontl s13 flex aic color abs cfff">
                          {cartlength}
                        </div>
                      )}
                    </Link>
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="p-nav nav flex aic">
                      {nav.map((item, index) => (
                        <NavLink
                          key={index}
                          exact
                          to={item.slug}
                          className="flex aic lin fontl s16 b6 color anim rel"
                          onClick={() => {
                            setMenu(false);
                            document.documentElement.scrollTop = 0;
                          }}
                        >
                          {/*<div className={`ico ${item.icon} s22`} />*/}
                          <div>{item.label}</div>
                        </NavLink>
                      ))}

                      {/* Drop down profile option in sidebar */}
                      <div className="list flex flex-col">
                        {profile.map((item, index) => (
                          <NavLink
                            key={index}
                            exact
                            to={item.slug}
                            className="flex aic lin fontl s16 b6 color anim rel"
                            onClick={() => {
                              setMenu(false);
                              document.documentElement.scrollTop = 0;
                            }}
                          >
                            {/*<div className={`ico ${item.icon} s20`} />*/}
                            <div>{item.label}</div>
                          </NavLink>
                        ))}
                      </div>

                      {/* Notification Block */}
                      <Noticfications />

                      {/* Cart button */}
                      <Link
                        to="/user/cart"
                        className="cleanbtn cart-btn cart flex aic rel"
                        onClick={() => (document.documentElement.scrollTop = 0)}
                      >
                        <img className="img" src="/images/cart-fill.svg" />
                        {cartlength !== 0 && (
                          <div className="qty ct fontl s13 flex aic color abs cfff">
                            {cartlength}
                          </div>
                        )}
                      </Link>

                      {/* Logout */}
                      <button
                        className="cleanbtn sidebar-log flex aic lin fontl s16 b6 color anim rel"
                        onClick={() => {
                          localStorage.removeItem("myjwttoken");
                          //localStorage.removeItem('orderaddress')
                          window.location.href = "/";
                        }}
                      >
                        {/*<div className={`ico icon-log-out s20`} />*/}
                        <div>Logout</div>
                      </button>
                    </div>

                    {/* User Block */}
                    <button className="cleanbtn user flex aic anim rel">
                      <div className="dp">
                        <img
                          className="img"
                          src={`${process.env.REACT_APP_END_URL}${user.media}`}
                        />
                      </div>
                      {/*<div className="meta flex flex-col">
                                            <div className="txt fontl s15 b6 c000 wordwrap">{user.username}</div>
                                            { //<div className="fontl s13 c777">Multan</div>
                                            }
                                        </div>*/}
                      <div className="icon-chevron-down s16 color b6" />
                      <div className="user-drop-nav abs flex flex-col anim">
                        {profile.map((item, index) => (
                          <NavLink
                            key={index}
                            exact
                            to={item.slug}
                            className="flex aic lin fontl s15 c000 anim"
                          >
                            {/*<div className={`ico ${item.icon} s20`} />*/}
                            <div className="fontl s16 b6 color">
                              {item.label}
                            </div>
                          </NavLink>
                        ))}
                        <button
                          className="cleanbtn flex aic lin fontl s16 b6 color anim"
                          onClick={() => {
                            localStorage.removeItem("myjwttoken");
                            //localStorage.removeItem('orderaddress')
                            window.location.href = "/";
                          }}
                        >
                          {/*<div className={`ico icon-log-out s20`} />*/}
                          <div>Logout</div>
                        </button>
                      </div>
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>

          {/* Small Scren Header */}
          <div
            className={`min-header sticky flex aic anim " ${
              isTop == false ? "bg" : ""
            }`}
          >
            <div className="wrapWidth wrapper flex aic">
              {/* Header Left Side */}
              <div className="left flex aic">
                <Link to="/" className="logo">
                  <img src={`/images/logo.svg`} className="img" />
                </Link>
                {!notBg && (
                  <Searchbox placeholder={`Search ${global.siteName}`} />
                )}
              </div>
              <div className="rigt flex aic">
                {/* Notification Block */}
                <Noticfications />

                {/* Add Cart Button */}
                <Link
                  to="/user/cart"
                  className="cleanbtn cart-btn cart flex aic rel"
                  onClick={() => (document.documentElement.scrollTop = 0)}
                >
                  <img className="img" src="/images/cart-fill.svg" />
                  {cartlength !== 0 && (
                    <div className="qty ct fontl s13 flex aic color abs cfff">
                      {cartlength}
                    </div>
                  )}
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(!menu);
                    dispatch({ type: "HIDE_SIDEBAR", payload: true });
                  }}
                  className="cleanbtn humburger flex flex-col aic"
                >
                  <div
                    className={`stick stick-1 ${menu ? "open" : "close"}`}
                  ></div>
                  <div
                    className={`stick stick-2 ${menu ? "open" : "close"}`}
                  ></div>
                  <div
                    className={`stick stick-3 ${menu ? "open" : "close"}`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

export default Header;
