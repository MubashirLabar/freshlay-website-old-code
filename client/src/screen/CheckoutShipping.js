import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateorderaddress } from "../actions/cart";
import { updateaddressbook } from "../actions/profile";
// Screen
import ShippingAddressItems from "./ShippingAddressItems";
import ShippingAddressForm from "./sub/ShippingAddressForm";
import { Dialog } from "../core";
import store from "../components/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/order";
import zuz from "../core/Toast";
import axios from "axios";
import moment from "moment-timezone";
function CheckoutShipping(props) {
  const theuser = useSelector((state) => state.authreducer);
  const { loaded, user } = theuser;
  let data = useSelector((state) => state.cartReducer);
  const { cartItems, itemsprice, orderaddress, paymentMethod } = data;
  const dispatch = useDispatch();
  const [btndisabled, setbtndisable] = useState(false);
  const [btntext, setbtntext] = useState("Place order");
  const [ordercount, setordercount] = useState(null);
  const [nonloginedaddresses, setnonloginedaddresses] = useState([]);
  const [caldiscount, setcaldiscount] = useState();
  const [calordertotal, setcalordertotal] = useState(itemsprice.ordertotal);
  const [discountpercentage, setdiscountpercentage] = useState("");
  const [refercode, setrefercode] = useState();
  const [coupinname, setcoupinname] = useState();
  const [coupinnameverified, setcoupinnameverified] = useState();
  const [payMethod, setPayMethod] = useState([
    {
      label: "Cash on delivery",
      img: "/images/cash.svg",
      slug: "cash-delivery",
    },
    { label: "Freshlay wallet", img: "/images/logo.svg", slug: "jazz-cash" },
    // {label: "Bank transfer", img: "/images/bank.svg", slug: "bank"},
    // {label: "Debit/Credit Card", img: "/images/card.svg", slug: "card"},
  ]);
  const [dropMenu, setDropMenu] = useState(false);
  const [method, setMthod] = useState("Cash on delivery");
  const [address, setAddress] = useState([
    {
      name: "Mubashir Labar",
      street1: "Chungi no.9 near goal Bag street no #3",
      street2: "Chungi no.9 near goal Bag street no #3",
      city: "Multan",
      state: "Punjab",
      postal: "66000",
      phone: "03080059035",
    },
    {
      name: "Mubashir Labar",
      street1: "Chungi no.9 near goal Bag street no #3",
      street2: "Chungi no.9 near goal Bag street no #3",
      city: "Multan",
      state: "Punjab",
      postal: "66000",
      phone: "03080059035",
    },
    {
      name: "Mubashir Labar",
      street1: "Chungi no.9 near goal Bag street no #3",
      street2: "Chungi no.9 near goal Bag street no #3",
      city: "Multan",
      state: "Punjab",
      postal: "66000",
      phone: "03080059035",
    },
  ]);
  const [product, setProduct] = useState([
    {
      label: "White Potato",
      unit: "kg",
      qty: "1",
      price: "60",
      orignalPrice: "70",
      img: "./images/1.jpg",
    },
    {
      label: "Fresh Lehsan China",
      unit: "kg",
      qty: "3",
      price: "80",
      orignalPrice: "90",
      img: "./images/2.jpg",
    },
    {
      label: "Ginger China",
      unit: "kg",
      qty: "2",
      price: "150",
      orignalPrice: "180",
      img: "./images/3.jpg",
    },
  ]);
  const slots = [
    // { slot : 1,text : '5:00 AM to 8:00 AM'},
    // { slot : 1,text : '9:00 AM to 12:00 AM'},
    // { slot : 2,text : '1:00 PM to 4:00 PM'},
    // { slot : 3,text : '5:00 PM to 8:00 PM'}
    { slot: 1, text: "9:00 AM to 11:00 AM" },
    { slot: 2, text: "12:00 PM to 2:00 PM" },
    { slot: 3, text: "3:00 PM to 5:00 PM" },
    { slot: 4, text: "6:00 PM to 8:00 PM" },
  ];
  let [selectedslot, setseletedslot] = useState({ slot: "", text: "" });
  let [slotson, setslotson] = useState(0);
  let [date, setdate] = useState(new Date(moment.tz("Asia/Karachi").format()));
  let [tommorow, settommorow] = useState(0);
  useEffect(() => {
    if (user) {
      if (user.ordercount === 0) {
        setordercount(user.ordercount);
      } else {
        setordercount(user.ordercount);
      }
    } else {
      //   console.log('dataaa11',data)
      if (data.orderaddress) {
        if (data.orderaddress.address.cellphone) {
          const checkordercount = async () => {
            const res = await axios.post(
              `${process.env.REACT_APP_API_URL}/user/finduserbynumber`,
              { cellphone: data.orderaddress.address.cellphone }
            );
            if (res.data.status === "success") {
              if (res.data.userfounded) {
                setordercount(res.data.ordercount);
              } else {
                setordercount(0);
              }
            }
          };
          checkordercount();
        }
      }
    }
  }, [data.orderaddress]);
  useEffect(() => {
    if (ordercount == 0) {
      //setdiscountpercentage(10);
    } else {
      setcaldiscount(Math.floor(itemsprice.ordertotal));
      setcalordertotal(itemsprice.ordertotal);
    }
  }, [ordercount]);
  useEffect(() => {
    if (discountpercentage) {
      setcaldiscount(
        Math.floor((itemsprice.ordertotal * Number(discountpercentage)) / 100)
      );
      setcalordertotal(
        itemsprice.ordertotal -
          Math.floor((itemsprice.ordertotal * Number(discountpercentage)) / 100)
      );
    }
  }, [discountpercentage]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setbtndisable(true);
    }
    //console.log(moment.tz("Asia/Karachi").format())
    let currenthour = moment.tz("Asia/Karachi").hour();
    if (currenthour >= 1 && currenthour < 10) {
      setslotson(4);
      setseletedslot({ slot: 1, text: "9:00 AM to 11:00 AM" });
    } else if (currenthour >= 8 && currenthour < 12) {
      setslotson(3);
      setseletedslot({ slot: 2, text: "12:00 PM to 3:00 PM" });
    } else if (currenthour >= 12 && currenthour < 15) {
      setslotson(2);
      setseletedslot({ slot: 3, text: "3:00 PM to 5:00 PM" });
    } else if (currenthour >= 15 && currenthour < 18) {
      setslotson(1);
      setseletedslot({ slot: 4, text: "6:00 PM to 8:00 PM" });
    } else if (currenthour >= 18) {
      var tommorrowdate = new Date(moment.tz("Asia/Karachi").format());
      tommorrowdate.setDate(tommorrowdate.getDate() + 1);
      setdate(tommorrowdate);
      setslotson(4);
      settommorow(1);
      setseletedslot({ slot: 1, text: "9:00 AM to 11:00 AM" });
    }
  }, []);

  const [delivery, setDelivery] = useState("normal");
  const saveOrder = async () => {
    if (selectedslot.slot == "") {
      return zuz.Toast.show({ html: `Please select a delivery slot`, time: 5 });
    } else {
      setbtndisable(true);
      setbtntext("Processing...");
      {
        let order;
        order = {
          orderItems: cartItems,
          totalprice: itemsprice.subtotal,
          savings: itemsprice.savings,
          discountedprice: itemsprice.ordertotal,
          orderlocation: orderaddress,
          paymentMethod: method,
          deliverytype: delivery,
          refercode: refercode,
          coupinname: coupinnameverified,
          slotno: selectedslot.slot,
          slotdate: date,
        };
        const res = await dispatch(createOrder(order));
        if (res === false) {
          setbtntext("Place order");
          setbtndisable(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      const savedaddress = JSON.parse(
        localStorage.getItem("saveaddressnonlogined")
      );
      if (savedaddress) {
        setnonloginedaddresses(savedaddress);
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Shipping Address";
    document.body.addEventListener("click", () => {
      setDropMenu(false);
    });
  });

  const addressForm = () => {
    Dialog({
      title: "Add New Address",
      content: (
        <Provider store={store}>
          <ShippingAddressForm
            setnonloginedaddresses={setnonloginedaddresses}
          />
        </Provider>
      ),
    });
  };
  const getcurrentlocation = () => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const object = {
        addressincoords: {
          lat: latitude,
          lng: longitude,
        },
      };
      zuz.Toast.show({ html: `Current location selected`, time: 5 });
      dispatch(updateorderaddress(object));
    }

    function error() {
      zuz.Toast.show({ html: `Unable to get location`, time: 5 });
    }
  };

  const _preloading = () => {
    return (
      <div className="cart-page wrapWidth flex flex-col">
        <div className="head flex aic">
          <div className="page-title">
            <div className="holder" />
          </div>
        </div>
        <div className="wrap flex">
          <div className="left">
            <div className="block holder"></div>
            <div className="block holder"></div>
            <div className="block holder"></div>
            <div className="block holder"></div>
          </div>
          <div className="order-right">
            <div className="block holder" />
          </div>
        </div>
      </div>
    );
  };
  const checkrefercode = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/checkrefer`,
        { refercode }
      );
      //console.log(data)
      if (data.status === "success") {
        zuz.Toast.show({ html: `The refer code is correct`, time: 10 });
      } else {
        zuz.Toast.show({ html: `The refer code is Incorrect`, time: 10 });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
        } else {
          zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
        }
        return false;
      }
    }
  };
  const checkcoupincode = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/checkcoupincode`,
        { coupinname }
      );
      if (data.status == "success") {
        if (!coupinnameverified) {
          if (discountpercentage) {
            setdiscountpercentage(
              Number(discountpercentage) + Number(data.coupincode[0].discount)
            );
          } else {
            setdiscountpercentage(Number(data.coupincode[0].discount));
          }
          setcoupinnameverified(coupinname);
          zuz.Toast.show({
            html: `Congratulation! Yot got ${data.coupincode[0].discount}% discount`,
            time: 10,
          });
        }
      } else {
        zuz.Toast.show({ html: `The coupon code is Incorrect`, time: 10 });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
        } else {
          zuz.Toast.show({ html: `Internal Server Error`, time: 10 });
        }
        return false;
      }
    }
  };
  return (
    <React.Fragment>
      {loaded == true ? (
        <div className="shipping-p flex">
          <div className="left">
            <div className="title fontl b6 s24 black">Shipping Address</div>
            <div className="wrap">
              <div className="hdr flex aic">
                <button
                  className={`add-btn cleanbtn flex aic black`}
                  onClick={() => addressForm()}
                >
                  <div className="icon icon-plus s20" />
                  <div className="lb fontl s15 b6">Add New Address</div>
                </button>
                {/*
                        user &&
                        <button className="add-btn cleanbtn flex aic black" onClick={()=>getcurrentlocation()}>
                            <div className="icon icon-plus s20"/>
                            <div className="lb fontl s15 b6">Get current location</div>
                        </button> 
                        */}
              </div>
              {user ? (
                user.addressbook.length !== 0 ? (
                  user.addressbook.map((item) => (
                    <ShippingAddressItems data={item} />
                  ))
                ) : (
                  <div className="ship-msg flex flex-col aic font s16 c000">
                    <div className="txt fontl s16 c777">
                      Pleae add your delivery address before placing the order.
                    </div>
                    <button
                      className="button fontl s15 cfff"
                      onClick={() => addressForm()}
                    >
                      Add New Address
                    </button>
                  </div>
                )
              ) : nonloginedaddresses.length !== 0 ? (
                nonloginedaddresses.map((item) => (
                  <ShippingAddressItems
                    setordercount={setordercount}
                    data={item}
                    setnonloginedaddresses={setnonloginedaddresses}
                  />
                ))
              ) : (
                <div className="ship-msg flex flex-col aic font s16 c000">
                  <div className="txt font s16 c777">
                    Pleae add your delivery address before placing the order.
                  </div>
                  <button
                    className="button fontl s15 cfff"
                    onClick={() => addressForm()}
                  >
                    Add New Address
                  </button>
                </div>
              )}
            </div>

            {/* Delivery Block */}
            {/* <div className='dlivery flex flex-col'>
                    <div className='lbl fontl b6 s16 c000'>Delivery Type</div>
                    <div className='blk flex aic'>
                        <button className='cleanbtn item flex aic' onClick={() => setDelivery('normal')}>
                            <div className={`btn rel anim ${delivery == 'normal' ? 'on' : ''}`}>
                                <div className={`circle abs anim ${delivery == 'normal' ? 'on' : ''}`}/>
                            </div>  
                            <div className='meta flex flex-col'>
                                <div className="tit flex aic s15 c333 b6">
                                    <div className='lb fontl'>Free Delivery</div>
                                    <div className="s16 fontu">فری ڈلیوری</div>
                                </div> 
                                <div className='txt fontl s14 c777'>Delivered by Next Day (9:00am - 5:00pm)</div>
                            </div>
                        </button>
                        <button className='cleanbtn item flex aic' onClick={() => setDelivery('express')}>
                            <div className={`btn rel anim ${delivery == 'express' ? 'on' : ''}`}>
                                <div className={`circle abs anim ${delivery == 'express' ? 'on' : ''}`}/>
                            </div>
                            <div className='meta flex flex-col'>
                                <div className="tit flex aic s15 c333 b6">
                                    <div className='lb fontl'>Express Delivery</div>
                                    <div className="s16 fontu">ایکسپریس ڈلیوری</div>
                                </div> 
                                <div className='txt fontl s14 c777'>Delivered in an Hour (9:00am - 7:00pm)</div>
                            </div>
                        </button>
                    </div>
                </div> */}

            {/* Payment Method Selector */}
            {
              user && (
                <div className="pay-slect">
                  <div className="lbl fontl s16 b6 c000">Payment Method</div>
                  <div className={`blk flex flex-col rel ${dropMenu && "on"}`}>
                    <button
                      className="cleanbtn flex aic"
                      onClick={(e) => {
                        setDropMenu(!dropMenu);
                        e.stopPropagation();
                      }}
                    >
                      {payMethod.map(
                        (item) =>
                          method == item.label && (
                            <button className="cleanbtn item flex aic">
                              <div className="icon">
                                <img src={item.img} className="img" />{" "}
                              </div>
                              <div className="fontl s15 black">
                                {item.label}
                              </div>
                            </button>
                          )
                      )}
                      <div className="icon icon-chevron-down s18 c333" />
                    </button>
                    {dropMenu && (
                      <div className="drop-blk abs">
                        {payMethod.map((item) => (
                          <button
                            className="cleanbtn item flex aic"
                            onClick={() => {
                              setMthod(item.label);
                              //updatepayment(item.label)
                              setDropMenu(false);
                            }}
                          >
                            <div className="icon">
                              <img src={item.img} className="img" />{" "}
                            </div>
                            <div className="lbl fontl s16 black">
                              {item.label}
                            </div>
                            {method == item.label && (
                              <div className="tick icon-check s20 b" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
              /*Discription Block 
                    <div className="discrp flex aic">
                        {method == "Cash on delivery" && <div className="txt fontl s15 b6 c000">Pay with Cash after receiving the order.</div>}
                        {method == 'Freshlay wallet' &&   <></>}
                    </div> */
            }

            {/* Delivery Slots */}

            <div className="slots flex flex-col">
              {tommorow ? (
                <div className="tit fontl s15 b6 c000">
                  Will be delivered tommorow at these time slots
                </div>
              ) : (
                ""
              )}
              <div className="tit fontl s15 b6 c000">Select Delivery Slot</div>

              <div className="block flex aic">
                {slots.map((item, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (3 - i < slotson) {
                          setseletedslot({ slot: item.slot, text: item.text });
                        }
                      }}
                      className={`item font s14 c000 anim ${
                        3 - i < slotson ? "" : "off"
                      } ${selectedslot.slot === item.slot ? "on" : ""}`}
                    >
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Refer Code */}
            <div className="refer flex flex-col">
              <div className="tit fontl s15 b6 c000">Refer Code</div>
              <div className="item flex aic anim">
                <input
                  className="cleanbtn iput fontl s16 b6 c333 anim"
                  placeholder="Enter refer code"
                  value={refercode}
                  onChange={(e) => setrefercode(e.target.value)}
                />
                <button
                  onClick={() => checkrefercode()}
                  className="cleanbtn btn fontl s15 cfff"
                >
                  Check Refer
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="refer copen flex flex-col">
              <div className="tit fontl s15 b6 c000">Coupon name</div>
              <div className="item flex aic anim">
                <input
                  className="cleanbtn iput fontl s16 b6 c333 anim"
                  placeholder="Enter Coupon, get discount"
                  value={coupinname}
                  onChange={(e) => setcoupinname(e.target.value)}
                />
                <button
                  onClick={() => checkcoupincode()}
                  className="cleanbtn btn fontl s15 cfff"
                >
                  Apply coupon
                </button>
              </div>
            </div>
          </div>

          <div className="order-right">
            <div className="block flex flex-col">
              <div className="tit fontl s16 b6 black">Order Summary</div>
              <div className="item flex aic">
                <div className="lbl fontl s15 c333">Sub Total</div>
                <div className="amount fontl s15 black">{`Rs.  ${itemsprice.subtotal}`}</div>
              </div>
              {/* <div className="item flex aic"> 
                        <div className="lbl fontl s15 black">Total Saving</div>
                        <div className="amount fontl s15 black">{
                    `Rs.${itemsprice.savings}`
                    }</div> 
                    </div> */}
              <div className="item flex aic">
                <div className="lbl fontl s15 c333">Total Items</div>
                <div className="amount fontl s15 black">{cartItems.length}</div>
              </div>
              {delivery === "express" && (
                <div className="item flex aic">
                  <div className="lbl fontl s15 black">
                    Express Delivery Fee
                  </div>
                  <div className="amount fontl s15 black">Rs 59</div>
                </div>
              )}
              {delivery === "normal" && (
                <div className="item flex aic">
                  <div className="lbl fontl s15 black">Delivery Fee</div>
                  <div className="amount fontl s15 black">Rs 0</div>
                </div>
              )}
              {discountpercentage && (
                <div className="item flex aic">
                  {
                    <div className="lbl fontl s16 b6 black">
                      {discountpercentage}% discount
                    </div>
                  }
                  <div className="amount fontl s15 black">{`Rs. ${caldiscount}`}</div>
                </div>
              )}
              {/*<div className="item flex aic">
                               <div className="lbl fontl s16 b6 black">40% discount</div>
                               <div className="amount fontl s15 black">{`Rs. ${itemsprice.discount}`}</div> 
                    </div>
                    */}
              {/*<div className="item ship flex flex-col"> 
                        <div className="lbl ship fontl s15 black">Shipping To:</div> 
                        <div className="adr fontl s15 black">Chungi no.9 near goal Bag street no #3, Multan</div>                     
                    </div>*/}
              <div className="item flex aic">
                <div className="lbl fontl s16 b6 black">Order Total</div>
                <div className="amount fontl s18 b6 black">{`Rs. ${
                  calordertotal
                    ? delivery === "express"
                      ? calordertotal + 59
                      : calordertotal
                    : itemsprice.ordertotal - Math.floor(caldiscount)
                }`}</div>
              </div>
              {user ? (
                user.addressbook.length !== 0 ? (
                  orderaddress ? (
                    <button
                      disabled={btndisabled}
                      onClick={() => saveOrder()}
                      className="button btn font s15 b6 anim"
                    >
                      {btntext}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        zuz.Toast.show({
                          html: `Please Add/Select an address`,
                          time: 5,
                        });
                        //addressForm()
                      }}
                      className={`button btn font s15 b6 anim`}
                    >
                      Place Order
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      addressForm();
                    }}
                    className={`button btn font s15 b6 anim`}
                  >
                    Place Order
                  </button>
                )
              ) : nonloginedaddresses.length !== 0 ? (
                orderaddress ? (
                  <button
                    disabled={btndisabled}
                    onClick={() => saveOrder()}
                    className="button btn font s15 b6 anim"
                  >
                    {btntext}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      zuz.Toast.show({
                        html: `Please Add/Select an address`,
                        time: 5,
                      });
                      //addressForm()
                    }}
                    className={`button btn font s15 b6 anim`}
                  >
                    Place Order
                  </button>
                )
              ) : (
                <button
                  onClick={() => {
                    addressForm();
                  }}
                  className={`button btn font s15 b6 anim`}
                >
                  Place Order
                </button>
              )}

              {/* Products Block */}
              <div className="prdt-blk flex flex-col">
                {cartItems.map((item) => (
                  <div className="product flex aic">
                    <div className="pic">
                      <img
                        className="img"
                        src={`${process.env.REACT_APP_END_URL}${item.media}`}
                      />
                    </div>
                    <div className="meta flex flex-col">
                      <div className="flex aic">
                        {item.type === "product" ? (
                          <div className="name fontl s16 black wordwrap">
                            {item.label_en}
                          </div>
                        ) : (
                          <div className="name fontl s16 black wordwrap">
                            {item.PKG_id}
                          </div>
                        )}
                        <div className="unit fontl s16 black">
                          <span>{item.qty}</span>
                          <span>{item.unit}</span>
                        </div>
                      </div>
                      <div className="flex aic">
                        <React.Fragment>
                          <div className="current fontl s14 black">
                            Rs {Number(item.price)}/{item.orgunit}
                          </div>
                        </React.Fragment>
                        {/* {item.discount === 0 ?
                                            <React.Fragment>
                                            <div className="current fontl s14 black">Rs {Number(item.price) - Number(item.discount)}</div>
                                            <strike className="old fontl s14 c777">Rs {Number(item.price) + Number(item.discount)}</strike>
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                             <div className="current fontl s14 black">Rs {Number(item.price) - Number(item.discount)}</div>
                                            <strike className="old fontl s14 c777">Rs {Number(item.price) + Number(item.discount)}</strike>
                                            </React.Fragment> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tim-msg">
              <div className="txt fontl s15 cfff">
                Delivered will be in between 9:00 AM to 6:00 PM. To track your
                order log into your account.
              </div>
              <div className="txt fontl s15 cfff">
                <span className="b5">Note:</span> Order After 6:00 PM will be
                delivered Next Day.
              </div>
            </div>
            <div className="gtr flex flex-col">
              <div className="msg fontl s15 c555">
                Cash will be paid at the time of delivery. Our express delivery
                system is powered by MySupermen.
              </div>
              <div className="flex aic">
                <div className="links flex flex-col">
                  <div className="link fontl s16 b7 anim">Cash on Delivery</div>
                </div>
                <img src={`/images/guarantee.svg`} className="img" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        _preloading()
      )}
    </React.Fragment>
  );
}

export default CheckoutShipping;
