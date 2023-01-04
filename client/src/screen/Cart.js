import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import * as emptyCart from "../lottie/emptyCart.json";

// Screen
import Header from "./Header";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdatetheCart,
  removeFromCart,
  updatecartPrice,
} from "../actions/cart";

function Cart() {
  const [items, setItems] = useState([
    { label: "White Potato", unit: "1kg", price: "60", img: "./images/1.jpg" },
    {
      label: "Fresh Lehsan China",
      unit: "1kg",
      price: "80",
      img: "./images/2.jpg",
    },
    { label: "Ginger China", unit: "1kg", price: "150", img: "./images/3.jpg" },
    {
      label: "Crinkled Smooth",
      unit: "1kg",
      price: "150",
      img: "./images/4.jpg",
    },
  ]);

  let data = useSelector((state) => state.cartReducer);
  let { user } = useSelector((state) => state.authreducer);
  const { cartItems, itemsprice, loading } = data;
  const [discountpercentage, setdiscountpercentage] = useState("40%");
  const [caldiscount, setcaldiscount] = useState();
  const [calordertotal, setcalordertotal] = useState(itemsprice.ordertotal);
  //console.log(cartItems)

  const [unitValue, setUnitValue] = useState(1);
  const [punit, setpunit] = useState("kg");
  const _units = [{ punit: "g" }, { punit: "kg" }];

  let ordertotal = 0;
  let subtotal = 0;
  let savings = 0;
  const dispatch = useDispatch();
  const updatecart = ({
    id,
    qty,
    unit,
    label_en,
    media,
    price,
    discount,
    prod_id,
    label_ur,
    category,
    cart_id,
    type,
    chopped,
    choppedimg,
    orgunit,
  }) => {
    //console.log({id, qty,unit,label_en,media,price,discount,prod_id,label_ur,category,cart_id,type,chopped,choppedimg})
    dispatch(
      UpdatetheCart({
        id,
        qty,
        unit,
        label_en,
        media,
        price,
        discount,
        prod_id,
        label_ur,
        category,
        cart_id,
        type,
        chopped,
        choppedimg,
        orgunit,
      })
    );
  };
  useEffect(() => {
    document.title = "Cart";
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].unit === "kg") {
        subtotal = subtotal + parseInt(cartItems[i].price) * cartItems[i].qty;
        savings = savings + parseInt(cartItems[i].discount) * cartItems[i].qty;
      } else if (cartItems[i].unit === "g") {
        // every product unit will be kg, dividing by 1000
        subtotal = Math.floor(
          subtotal + (parseInt(cartItems[i].price) * cartItems[i].qty) / 1000
        );
        savings = Math.floor(
          savings + (parseInt(cartItems[i].discount) * cartItems[i].qty) / 1000
        );
      } else {
        subtotal = subtotal + parseInt(cartItems[i].price) * cartItems[i].qty;
        savings = savings + parseInt(cartItems[i].discount) * cartItems[i].qty;
      }
    }
    ordertotal = subtotal;
    subtotal = subtotal;
    //const thediscount  =  Math.ceil((ordertotal * 40) / 100)
    //ordertotal = ordertotal - ordertotal * 40 / 100;
    //console.log('ordertotal',ordertotal)
    const itemprices = {
      ordertotal,
      subtotal,
      savings,
      //discount
    };
    dispatch(updatecartPrice(itemprices));
  }, [cartItems]);

  const _emptyCart_ = {
    loop: true,
    autoplay: true,
    animationData: emptyCart.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Dropdown = ({ item }) => {
    const [dropUnits, setDropUnits] = useState(false);
    useEffect(() => {
      document.body.addEventListener("click", () => {
        setDropUnits(false);
      });
    }, []);
    return (
      <div className="units flex aic">
        <button
          className="cleanbtn cum-select flex aic rel"
          onClick={(e) => {
            e.stopPropagation();
            setDropUnits(!dropUnits);
          }}
        >
          {_units.map(
            (citem, index) =>
              item.unit == citem.punit && (
                <div key={index} className="slt flex aic">
                  <div className="lbl fontl s15 c333">{citem.punit}</div>
                  <div
                    className={`arrow s18 color anim ${
                      dropUnits == true
                        ? "icon-chevron-up"
                        : "icon-chevron-down"
                    }`}
                  />
                </div>
              )
          )}
          {dropUnits && (
            <div className="options flex flex-col abs">
              {_units.map((citem, index) => (
                <button
                  key={index}
                  className="cleanbtn item flex aic anim"
                  onClick={() => {
                    setDropUnits(false);

                    updatecart({
                      id: item.product,
                      qty: citem.punit === "kg" ? 1 : 250,
                      unit: citem.punit,
                      label_en: item.label_en,
                      media: item.media,
                      price: item.price,
                      discount: item.discount,
                      prod_id: item.prod_id,
                      label_ur: item.label_ur,
                      category: item.category,
                      cart_id: item.cart_id,
                      type: item.type,
                      chopped: item.chopped,
                      choppedimg: item.choppedimg,
                      orgunit: item.orgunit,
                    });
                    setpunit(item.punit);
                  }}
                >
                  <div className="txt fontl s15 black">{citem.punit}</div>
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
    );
  };
  // useEffect(() => {
  //     if(user){
  //     if(user.ordercount == 0)
  //     {
  //         setdiscountpercentage('40%')
  //         setcaldiscount(Math.floor(itemsprice.ordertotal * 40 / 100))
  //         setcalordertotal(itemsprice.ordertotal - Math.floor(itemsprice.ordertotal * 40 / 100))
  //     }
  //     else if(user.ordercount == 1)
  //     {
  //         setdiscountpercentage('30%')
  //         setcaldiscount(Math.floor(itemsprice.ordertotal * 30 / 100))
  //         setcalordertotal(itemsprice.ordertotal - Math.floor(itemsprice.ordertotal * 30 / 100))
  //     }
  //     else if(user.ordercount == 2)
  //     {
  //         setdiscountpercentage('20%')
  //         setcaldiscount(Math.floor(itemsprice.ordertotal * 20 / 100))
  //         setcalordertotal(itemsprice.ordertotal - Math.floor(itemsprice.ordertotal * 20 / 100))
  //     }
  //     else if(user.ordercount == 3)
  //     {
  //         setdiscountpercentage('10%')
  //         setcaldiscount(Math.floor(itemsprice.ordertotal * 10 / 100))
  //         console.log(itemsprice.ordertotal - Math.floor(itemsprice.ordertotal * 10 / 100))
  //         setcalordertotal(itemsprice.ordertotal - Math.floor(itemsprice.ordertotal * 10 / 100))
  //     }
  //     else
  //     {
  //         setcalordertotal(itemsprice.ordertotal)
  //     }
  // }
  // },[itemsprice.ordertotal])

  const _cart = () => {
    return (
      <div className="cart-page wrapWidth flex flex-col">
        <div className="head flex aic">
          <div className="page-title fontl b6 s24 black">Shopping Cart</div>
          <Link to="/" className="color fontl s15">
            Back to Shop
          </Link>
        </div>
        <div className="wrap flex">
          <div className="left">
            {cartItems.map((item, index) =>
              item.package ? (
                <div key={index} className="block flex aic rel">
                  <div className="item flex aic">
                    <div className="pic">
                      <img
                        className="img"
                        alt="product-profile"
                        src={`${process.env.REACT_APP_END_URL}${item.media}`}
                      />
                    </div>
                    <div className="meta flex flex-col">
                      <div className="name fontl s16 b6 black">
                        Package # {item.PKG_id}
                      </div>
                      <div className="fontl s13 c777">
                        {item.packageitems.length} items
                      </div>
                    </div>
                  </div>
                  <div className="actions flex aic">
                    <div className="unit flex aic"></div>
                    <div className="qty flex aic"></div>
                    <div className="price flex aic">
                      <div className="fontl s16 b6 black">Rs. {item.price}</div>
                    </div>
                    <button
                      className="close cleanbtn fontlr s26 black anim"
                      onClick={() => dispatch(removeFromCart(item.cart_id))}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ) : (
                <div key={index} className="block flex aic">
                  <div className="item flex aic">
                    <div className="pic">
                      <img
                        className="img"
                        alt="product-profile"
                        src={`${process.env.REACT_APP_END_URL}${item.media}`}
                      />
                    </div>
                    <div className="meta flex flex-col">
                      <div className="name fontl s16 b6 black">
                        {item.label_en}
                      </div>
                      <div className="fontl s13 c777">{item.unit}</div>
                    </div>
                  </div>
                  <div className="actions flex aic">
                    {item.unit == "kg" || item.unit == "g" ? (
                      <div className="unit flex aic">
                        <div className="lbl fontl s13 c777">Unit:</div>
                        {/*item.unit*/}
                        {/* Units */}
                        <Dropdown item={item} />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="qty flex aic">
                      <div className="lbl fontl s13 c777">{item.unit}</div>
                      <div className="counter flex aic">
                        <button
                          className="cleanbtn icon-minus btn anim"
                          onClick={() =>
                            item.qty > 1
                              ? item.unit === "g"
                                ? item.qty > 250
                                  ? updatecart({
                                      id: item.product,
                                      qty: item.qty - 250,
                                      unit: item.unit,
                                      label_en: item.label_en,
                                      media: item.media,
                                      price: item.price,
                                      discount: item.discount,
                                      prod_id: item.prod_id,
                                      label_ur: item.label_ur,
                                      category: item.category,
                                      cart_id: item.cart_id,
                                      type: item.type,
                                      chopped: item.chopped,
                                      choppedimg: item.choppedimg,
                                      orgunit: item.orgunit,
                                    })
                                  : ""
                                : updatecart({
                                    id: item.product,
                                    qty: item.qty - 1,
                                    unit: item.unit,
                                    label_en: item.label_en,
                                    media: item.media,
                                    price: item.price,
                                    discount: item.discount,
                                    prod_id: item.prod_id,
                                    label_ur: item.label_ur,
                                    category: item.category,
                                    cart_id: item.cart_id,
                                    type: item.type,
                                    chopped: item.chopped,
                                    choppedimg: item.choppedimg,
                                    orgunit: item.orgunit,
                                  })
                              : ""
                          }
                        />
                        <input
                          disabled
                          /*onChange={(e) => {
                                                     updatecart({id :item.product,qty : `${e.target.value}`.replace(/[^0-9\.]/g) ,unit : item.unit,label_en : item.label_en,media: item.media,price : item.price,discount: item.discount,prod_id : item.prod_id,label_ur: item.label_ur,category : item.category,cart_id : item.cart_id,type : item.type,chopped : item.chopped,choppedimg : item.choppedimg, orgunit : item.orgunit}) 
                                                     }}*/
                          type="text"
                          className="iput cleanbtn fontl s14 c333"
                          value={`${item.qty}`}
                        />
                        <button
                          className="cleanbtn icon-plus btn anim"
                          onClick={() =>
                            item.unit === "g"
                              ? updatecart({
                                  id: item.product,
                                  qty: item.qty + 250,
                                  unit: item.unit,
                                  label_en: item.label_en,
                                  media: item.media,
                                  price: item.price,
                                  discount: item.discount,
                                  prod_id: item.prod_id,
                                  label_ur: item.label_ur,
                                  category: item.category,
                                  cart_id: item.cart_id,
                                  type: item.type,
                                  chopped: item.chopped,
                                  choppedimg: item.choppedimg,
                                  orgunit: item.orgunit,
                                })
                              : updatecart({
                                  id: item.product,
                                  qty: item.qty + 1,
                                  unit: item.unit,
                                  label_en: item.label_en,
                                  media: item.media,
                                  price: item.price,
                                  discount: item.discount,
                                  prod_id: item.prod_id,
                                  label_ur: item.label_ur,
                                  category: item.category,
                                  cart_id: item.cart_id,
                                  type: item.type,
                                  chopped: item.chopped,
                                  choppedimg: item.choppedimg,
                                  orgunit: item.orgunit,
                                })
                          }
                        />
                      </div>
                    </div>
                    <div className="price flex aic">
                      <div className="fontl s16 b6 black">
                        Rs. {item.price}/{item.orgunit}
                      </div>
                    </div>
                    <button
                      className="close cleanbtn fontlr s26 black anim"
                      onClick={() => dispatch(removeFromCart(item.cart_id))}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="order-right">
            <div className="block flex flex-col">
              <div className="tit fontl s16 b6 black">Order Summary</div>
              <div className="item flex aic">
                <div className="lbl fontl s15 c333">Sub Total</div>
                <div className="amount fontl s15 black">{`Rs. ${itemsprice.subtotal}`}</div>
              </div>
              {/*
                            <div className="item flex aic"> 
                                <div className="lbl fontl s15 black">Total Saving</div>
                                <div className="amount fontl s15 black">{`Rs. ${itemsprice.savings}`}</div> 
                            </div>
                            <div className="item flex aic">
                                <div className="lbl fontl s15 black">Delivery Fee</div>
                                <div className="amount fontl s15 black">Rs 0</div> 
                            </div>
                
                        
                            <div className="item ship flex flex-col"> 
                                <div className="lbl ship fontl s15 black">Shipping To:</div> 
                                <div className="adr fontl s15 black">Chungi no.9 near goal Bag street no #3, Multan</div>                     
                            </div> 
                            <div className="item flex aic">
                                <div className="lbl fontl s16 b6 black">40% discount</div>
                                <div className="amount fontl s15 black">{`Rs. ${itemsprice.discount}`}</div> 
                            </div>
                            */}
              {
                // user ?
                // user.ordercount < 4 &&
                // <div className="item flex aic">
                //     {
                //     <div className="lbl fontl s16 b6 black">{discountpercentage} discount</div>
                //     }
                //     <div className="amount fontl s15 black">{`Rs. ${caldiscount}`}</div>
                // </div>
                // :
                // <div className="item flex aic">
                //     {
                //     <div className="lbl fontl s16 b6 black">{discountpercentage} discount</div>
                //     }
                //     <div className="amount fontl s15 black">{`Rs. ${Math.floor(itemsprice.ordertotal * 40 / 100)}`}</div>
                // </div>
              }
              <div className="item flex aic">
                <div className="lbl fontl s16 b6 black">Order Total</div>
                {
                  // user ?
                  // <div className="amount fontl s16 b6 black">{`Rs. ${calordertotal}`}</div>
                  // :
                  <div className="amount fontl s16 b6 black">{`Rs. ${Math.floor(
                    itemsprice.ordertotal
                  )}`}</div>
                }
              </div>
              <Link
                to="/user/checkout"
                className="button btn fontl s15 b6 anim"
              >
                Proceed to Checkout
              </Link>
            </div>
            {/*<div className="gtr flex flex-col">
                            <div className="msg fontl s15 c555">We guarantee quick, dependable service and your cashback if anything turns out badly.</div>
                            <div className="flex aic">
                                <div className="links flex flex-col">
                                    <Link to="/" className="link fontl s15 b5 anim black">{`Learn about our ${global.siteName} Guarantee`}</Link>
                                    <Link to="/" className="link fontl s15 b5 anim black">Return Policy</Link>
                                </div>
                                <img src={`/images/guarantee.svg`} className="img" /> 
                            </div>
                        </div>*/}
          </div>
        </div>
      </div>
    );
  };

  const _preloading = () => {
    return (
      <div className="cart-page wrapWidth flex flex-col">
        <div className="head flex aic">
          <div className="page-title">
            <div className="holder" />
          </div>
          <div className="lin holder" />
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

  const _emptyCart = () => (
    <div className="empty-cart flex flex-col wrapWidth">
      <Lottie options={_emptyCart_} width={350} />
      <div className="meta flex flex-col aic">
        <div className="lbl fontl s18 b6 c000">Opps! Your cart is empty.</div>
        <div className="txt fontl s15 c000">
          Looks like you need to do some shopping!
        </div>
        <Link to="/" className="button txt fontl s15 cfff anim">
          Discover Products
        </Link>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Header />
      {loading !== false
        ? _preloading()
        : cartItems.length == 0 || cartItems == null
        ? _emptyCart()
        : _cart()}
      <Footer />
    </React.Fragment>
  );
}

export default Cart;
