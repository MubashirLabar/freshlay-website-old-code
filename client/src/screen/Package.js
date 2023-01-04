import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "slick-carousel/slick/slick";
import { addToCart } from "../actions/cart";
import { connect, useDispatch, useSelector } from "react-redux";
import zuz from "../core/Toast";
import axios from "axios";
import Slider from "react-slick";

// Screen
import ProductCard from "./sub/ProductCard";
import Header from "./Header";
import Footer from "./Footer";
import { generateID } from "../core";
import { homepagepackages } from "../actions/package";

function Product(props) {
  const [qty, setqty] = useState(0);
  const [loading, setloading] = useState(true);
  const [thepackage, setthepackage] = useState({});
  const [change, setChange] = useState(false);
  const [relative, SetRelative] = useState([
    {
      label_en: "White Potato",
      label_ur: "سفید آلو",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/1.jpg",
    },
    {
      label_en: "Fresh Lehsan China",
      label_ur: "تازہ لہسن چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/4.jpg",
    },
    {
      label_en: "Ginger China",
      label_ur: "ادرک چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/3.jpg",
    },
    {
      label_en: "Crinkled Smooth",
      label_ur: "بندھ گوبھی",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/1.jpg",
    },
    {
      label_en: "White Potato",
      label_ur: "سفید آلو",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/3.jpg",
    },
    {
      label_en: "Fresh Lehsan China",
      label_ur: "تازہ لہسن چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/4.jpg",
    },
    {
      label_en: "Ginger China",
      label_ur: "ادرک چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/2.jpg",
    },
    {
      label_en: "Crinkled Smooth",
      label_ur: "بندھ گوبھی",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/5.png",
    },
    {
      label_en: "White Potato",
      label_ur: "سفید آلو",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/6.jpg",
    },
    {
      label_en: "Fresh Lehsan China",
      label_ur: "تازہ لہسن چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/1.jpg",
    },
    {
      label_en: "Ginger China",
      label_ur: "ادرک چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/2.jpg",
    },
    {
      label_en: "Crinkled Smooth",
      label_ur: "بندھ گوبھی",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/3.jpg",
    },
    {
      label_en: "Ginger China",
      label_ur: "ادرک چین",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/2.jpg",
    },
    {
      label_en: "Crinkled Smooth",
      label_ur: "بندھ گوبھی",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/5.png",
    },
    {
      label_en: "White Potato",
      label_ur: "سفید آلو",
      currentPrice: "80",
      orignalPrice: "150",
      slug: "/product",
      media: "./images/6.jpg",
    },
  ]);
  const [unit, setUnit] = useState("kg");
  const [unitItems, setunitItems] = useState([
    { label: "kg" },
    { label: "gm" },
    { label: "qty" },
    { label: "dz" },
  ]);
  const [dropUnits, setDropUnits] = useState(false);
  const [relativeLoad, SetRelativeLoad] = useState(false);

  const dispatch = useDispatch();
  let eachcartstate = relative.map(function (item, id) {
    return { state: 1 };
  });
  const changecartstate = (id, thestate) => {
    let newstate = (cartstate[id].state = thestate);
    setcartstate(newstate);
  };
  const [cartstate, setcartstate] = useState(eachcartstate);

  const { isAuthenticated } = useSelector((state) => state.authreducer);

  const addinCart = (id, qty, unit) => {
    const cart_id = generateID(4, 5);
    dispatch(addToCart({ cart_id, id, qty, unit, type: "package" }));
  };
  useEffect(() => {
    document.title = "Prodcut Detail";
    $(".relative-items").slick({
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 5,
    });
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    dispatch(homepagepackages());
  }, []);
  const { packageloaded, packages } = useSelector(
    (state) => state.myhomepageproducts
  );
  const theproduct = useSelector((state) => state.productdetails);
  const { product } = theproduct;
  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropUnits(false);
    });
    const getapackage = async () => {
      try {
        setloading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/package/getapackage/${props.match.params.packageid}`
        );
        if (res.data.status === "success") {
          setthepackage(res.data.package);
          setloading(false);
        }
      } catch (error) {
        if (error.response) {
          {
            zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
          }
        }
      }
    };
    getapackage();
  }, [props.match.params.packageid]);

  const fourItemSlides = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const twoItemSlides = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <React.Fragment>
      <Header />
      <div className="product-view wrapWidth flex flex-col">
        <div className="page-title rfont b6 s24 black">Package Detail</div>
        {loading ? (
          <div className="head flex">
            <div className="left">
              <div className="img holder" />
            </div>
            <div className="right flex">
              <div className="discrip flex flex-col">
                <div className="label holder" />
                <div className="disc holder" />
                <div className="price hol flex flex-col">
                  <div className="current holder" />
                </div>
                <div className="scale flex aic">
                  <div className="unit">
                    <div className="holder" />
                  </div>
                  <div className="qty holder" />
                </div>
                <div className="cart-btn holder" />
                <div className="item a holder" />
                <div className="item b holder" />
                <div className="item c holder" />
              </div>
              <div className="actions">
                <div className="tit holder" />
                <div className="item holder" />
                <div className="placeholder flex aic">
                  <div className="circle holder" />
                  <div className="flex flex-col">
                    <div className="tit holder" />
                    <div className="item holder" />
                  </div>
                </div>
                <div className="placeholder flex aic">
                  <div className="circle holder" />
                  <div className="flex flex-col">
                    <div className="tit holder" />
                    <div className="item holder" />
                  </div>
                </div>
                <div className="placeholder flex aic">
                  <div className="circle holder" />
                  <div className="flex flex-col">
                    <div className="tit holder" />
                    <div className="item holder" />
                  </div>
                </div>
                <div className="placeholder flex aic">
                  <div className="meta flex flex-col">
                    <div className="tit holder" />
                    <div className="item holder" />
                  </div>
                  <div className="flex flex-col">
                    <div className="tit holder" />
                    <div className="item holder" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="head flex">
            <div className="left">
              <div className="media">
                <img
                  src={`${process.env.REACT_APP_END_URL}${thepackage.media}`}
                  className="img"
                />
              </div>
            </div>
            <div className="right flex">
              {/* Product Discription */}
              <div className="discrip flex flex-col">
                <div className="label font s22 b6 black">
                  Package # {thepackage.PKG_id}
                </div>
                <div className="disc font s15 c777">{product.label_en}</div>
                <div className="price flex flex-col">
                  <div className="current color rfont s20 b6">
                    Rs. {thepackage.price}
                  </div>
                  <div className="orignal font s14 c777 flex aic">
                    {thepackage.discount && thepackage.discount > 0 ? (
                      <React.Fragment>
                        <div className="orignal font s14 c777 flex aic">
                          <strike>
                            Rs.{" "}
                            {parseInt(thepackage.price) +
                              parseInt(thepackage.discount)}
                          </strike>
                          &nbsp;
                          <span>
                            -&nbsp;
                            {Math.floor(
                              (parseInt(thepackage.discount) * 100) /
                                (parseInt(thepackage.price) +
                                  parseInt(thepackage.discount))
                            )}
                            %
                          </span>
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {thepackage.packageitems &&
                  thepackage.packageitems.map((item, index) => {
                    return (
                      <div className="scale list flex aic">
                        <div className="unit flex aic">
                          <div className="txt rfont s15 c333">{index + 1}</div>
                          {item.label_en}{" "}
                          {item.label_ur ? item.label_ur[0].value : ""}
                        </div>
                        <div className="qty flex aic">
                          <div className="txt rfont s15 c333">
                            Qty:{item.qty} {item.unit}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <button
                  onClick={() =>
                    addinCart(props.match.params.packageid, qty, unit)
                  }
                  className="button cart-btn font s16 flex aic anim"
                >
                  <div className="ico icon-shopping-cart s20" />
                  <span className="b5">Add to Cart</span>
                </button>
                {/*<button className="cleanbtn wish font s15 flex aic">
                                    <button onClick={() => {
                                        console.log('wishlist clicked')
                                        dispatch(addtowishlist(
                                            {id: props.match.params.productid,
                                            media:  product.media,
                                            label_en:  product.label_en,
                                            currentPrice : product.currentPrice,
                                            currentPrice : product.orignalPrice,
                                            label_ur : product.label_ur
                                            }
                                            
                                            
                                            
                                            ))}} className="cleanbtn fav-ico icon-heart1 s24 c333" />
                                    <span>Add to Wishlist</span> 
                                    </button>
                                     */}

                <div className="item font s15 flex aic">
                  <div className="lbl b6 black">SKU:</div>&nbsp;
                  <div className="text c777">5350-13314</div>
                </div>
                <div className="item font s15 flex aic">
                  <div className="lbl b6 black">Catagory:</div>&nbsp;
                  <div className="text c777">{product.category}</div>
                </div>
                <div className="item font s15 flex aic">
                  <div className="lbl b6 black">Tags:</div>&nbsp;
                  <div className="text c777">Vegetable, Vegetables</div>
                </div>
                <div className="item font s15 flex aic">
                  <div className="lbl b6 black">Share:</div>&nbsp;
                  <div className="social">
                    <Link to="/" className="lin icon-facebook s18 c777" />
                    <Link to="/" className="lin icon-twitter s18 c777" />
                    <Link to="/" className="lin icon-instagram s18 c777" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="actions">
                <div className="tit rfont s15 c777">Reviews</div>
                <div className="item flex aic border first">
                  <div className="txt flex aic font s15 c333">
                    <div className={"stars flex aic"}>
                      <li className="icon-star1" />
                      <li className="icon-star1" />
                      <li className="icon-star1" />
                      <li className="icon-star1" />
                      <li className="icon-star-half-empty" />
                    </div>
                  </div>
                  <div className="rig flex aic rfont b5 s15">15 Reviews</div>
                </div>
                <div className="item flex aic">
                  <div className="txt flex aic">
                    <div className="ico icon-shopping-bag s22" />
                    <div className="flex flex-col">
                      <div className="font s15 c333">Home Delivery</div>
                      <div className="time rfont s13 c777">1 - 2 hour</div>
                    </div>
                  </div>
                  <div className="btn rfont s15 b6 black">Free</div>
                </div>
                <div className="item flex aic border">
                  <div className="txt flex aic font s15 c333">
                    <div className="ico icon-credit-card s22" />
                    <span>Cash on Delivery Available</span>
                  </div>
                </div>
                <div className="title top rfont s15 c777">
                  Return & Warranty
                </div>
                <div className="item flex aic">
                  <div className="txt flex aic">
                    <div className="ico icon-rotate-cw s22" />
                    <div className="flex flex-col">
                      <div className="font s15 c333">Return On the Spot</div>
                      <div className="time rfont s13 c777">
                        Change of mind is not applicable
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item flex aic border">
                  <div className="txt flex aic font s15 c333">
                    <div className="ico icon-alert-triangle s22" />
                    <span>Warranty not available</span>
                  </div>
                </div>
                <div className="title top rfont s15 c000">Description</div>
                <div className="dsrpt font font s14 c333">
                  {thepackage.description}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Relative Items */}
        {packageloaded === false ? (
          <div className="relative-blk flex flex-col wrapWidth">
            <div className="lbl fontl s22 b6 c000">Relative Products</div>
            <div className="wrap flex aic">
              <div className="placeholder product-card flex rel">
                <div className="holder blk loading flex flex-col aic anim"></div>
              </div>
              <div className="placeholder product-card flex rel">
                <div className="holder blk loading flex flex-col aic anim"></div>
              </div>
              <div className="placeholder product-card flex rel">
                <div className="holder blk loading flex flex-col aic anim"></div>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="relative-blk flex flex-col wrapWidth">
              <div className="lbl font s24 b6 c000">Relative Products</div>
              <div className="relative-items flex">
                <Slider {...fourItemSlides}>
                  {packages.map((item, index) => (
                    <ProductCard key={index} data={item} package={true} />
                  ))}
                </Slider>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Product;
