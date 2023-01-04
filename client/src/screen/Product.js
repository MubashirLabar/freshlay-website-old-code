import React, { useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cart";
import { connect, useDispatch, useSelector } from "react-redux";
import zuz from "../core/Toast";
import Review from "./sub/Review";
import axios from "axios";
import Rating from "./sub/Rating";

// Screen
import ProductCard from "./sub/ProductCard";
import Header from "./Header";
import Footer from "./Footer";
import { listProductDetails } from "../actions/product";
import { addtowishlist } from "../actions/auth";
import { generateID } from "../core";
import Slider from "react-slick";
import NewProductCard from "./sub/NewProductCard";
function Product(props) {
  const [chopped, setChopped] = useState("Unchopped");
  const [choppedimg, setchoppedimg] = useState("jangle.jpg");
  //const [unit,setunit] = useState('kg')

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

  //const [unitValue, setUnitValue] = useState('1 kg')
  const [dropUnits, setDropUnits] = useState(false);
  const _units = [{ label: "kg" }, { label: "g" }];

  //const [relativeLoad, SetRelativeLoad] = useState(false);
  const [productloaded, setproductloaded] = useState(false);
  const [reviewloaded, setreviewloaded] = useState(false);
  const [relativeprodloaded, setrelativeprodloaded] = useState(false);
  const [relatedproducts, setrelatedproducts] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [choppedindex, setchoppedindex] = useState(0);
  const { loading, product } = useSelector((state) => state.productdetails);
  const dispatch = useDispatch();
  let eachcartstate = relative.map(function (item, id) {
    return { state: 1 };
  });
  const changecartstate = (id, thestate) => {
    let newstate = (cartstate[id].state = thestate);
    setcartstate(newstate);
  };
  const [cartstate, setcartstate] = useState(eachcartstate);
  const [currentunit, setcurrentunit] = useState(product ? product.unit : "");
  const { isAuthenticated } = useSelector((state) => state.authreducer);
  const [qty, setqty] = useState(
    product ? (product.unit === "g" ? 250 : 1) : ""
  );
  useEffect(() => {
    setcurrentunit(product.unit);
    setqty(product ? (product.unit === "g" ? 250 : 1) : "");
  }, [product]);
  const addinCart = (id, qty, unit, orgunit) => {
    if (qty === 0) {
      zuz.Toast.show({ html: "Please add some quantity", time: 5 });
    } else {
      const cart_id = generateID(4, 5);
      dispatch(
        addToCart({
          cart_id,
          id,
          chopped,
          choppedimg: product.choppedimages[choppedindex],
          qty,
          unit,
          type: "product",
          orgunit,
        })
      );
      zuz.Toast.show({ html: "Added to cart successfully", time: 5 });
    }
  };

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

  useEffect(() => {
    document.title = "Prodcut Detail";
    document.documentElement.scrollTop = 0;
    setDropUnits(false);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropUnits(false);
    });
    const getaproduct = async () => {
      setproductloaded(false);
      const res = await dispatch(
        listProductDetails(props.match.params.productid)
      );
      if (res) {
        setproductloaded(true);
      }
    };
    getaproduct();
  }, [props.match.params.productid]);
  // getting reviews
  useEffect(() => {
    const getproductreviews = async () => {
      try {
        setreviewloaded(false);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/review/getproductreviews/${props.match.params.productid}`
        );
        setreviews(data.reviews);
        setreviewloaded(true);
      } catch (error) {
        if (error.response) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        }
      }
    };
    getproductreviews();
  }, [props.match.params.productid]);
  useEffect(() => {
    if (productloaded) {
      const getrelatedproducts = async () => {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/getrelatedproducts`,
            { category: product.category }
          );
          setrelatedproducts(data.products);
          setrelativeprodloaded(true);
        } catch (error) {
          if (error.response) {
            zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
          }
        }
      };
      getrelatedproducts();
    }
  }, [productloaded]);
  let customeSlider = createRef();
  const next = () => {
    if (choppedindex < product.choppedimages.length - 1) {
      setchoppedindex(choppedindex + 1);
    }
    customeSlider.current.slickNext();
  };
  const previous = () => {
    if (choppedindex > 0) {
      setchoppedindex(choppedindex - 1);
    }
    customeSlider.current.slickPrev();
  };

  return (
    <React.Fragment>
      <Header />
      <div className="product-view wrapWidth flex flex-col">
        <div className="page-title fontl b6 s24 black">Product Detail</div>
        {!productloaded ? (
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
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="head flex">
            <div className="left">
              <div className="media">
                <img
                  src={`${process.env.REACT_APP_END_URL}${product.media}`}
                  className="img"
                />
              </div>

              {/* Chopped Section */}
              <div
                className={`chop-sec flex flex-col anim ${
                  chopped === "Chopped" ? "show" : "hide"
                }`}
              >
                <div className="meta flex aic">
                  <div className="tt font s16 b7 black">
                    Chopped Apple Designs
                  </div>
                  <div className="fontu s18 b5 black">
                    {product.label_ur
                      ? `کٹی ${product.label_ur[0].value} ڈیزائن`
                      : ""}{" "}
                  </div>
                </div>
                <div className="shapes slider-blk flex aic rel">
                  <Slider {...twoItemSlides} ref={customeSlider}>
                    {product.choppedimages.map((item, index) => (
                      <div className="shape">
                        <div
                          className="sh"
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_END_URL}/choppedimages/${item})`,
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                  <div style={{ textAlign: "center" }}>
                    <button
                      className="cleanbtn icon-chevron-left prev-btn abs"
                      onClick={() => previous()}
                    />
                    <button
                      className="cleanbtn icon-chevron-right next-btn abs"
                      onClick={() => next()}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="right flex">
              {/* Product Discription */}
              <div className="discrip flex flex-col">
                <div className="prdtName flex aic">
                  <div className="eng">
                    <div className="label font s20 b6 black">
                      {product.label_en}
                    </div>
                    <div className="disc font s15 c777">{product.label_en}</div>
                  </div>
                  <div className="fontu s24 b6 c000">
                    {product.label_ur ? product.label_ur[0].value : ""}
                  </div>
                </div>
                <div className="price flex flex-col">
                  {product.discount && product.discount > 0 ? (
                    <React.Fragment>
                      <div className="current color rfont s20 b6">
                        Rs. {parseInt(product.price)}
                      </div>
                      <div className="orignal font s14 c777 flex aic">
                        <strike>
                          Rs. {product.price + parseInt(product.discount)}
                        </strike>
                        &nbsp;
                        <span>
                          -&nbsp;
                          {Math.floor(
                            (parseInt(product.discount) * 100) /
                              (product.price + parseInt(product.discount))
                          )}
                          %
                        </span>
                      </div>
                    </React.Fragment>
                  ) : (
                    <div className="current color rfont s20 b6">
                      Rs. {product.price}
                    </div>
                  )}
                </div>

                <div className="scale flex aic">
                  {(product.unit === "kg" || product.unit === "g") && (
                    <div className="unit flex aic">
                      {/* Select Unit Block */}
                      <div className="txt fontu s15 c333">Unit:</div>
                      {/*product.unit*/}
                      {/* Units */}
                      <div className="units flex aic">
                        <button
                          className="cleanbtn cum-select flex aic rel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDropUnits(!dropUnits);
                          }}
                        >
                          {_units.map(
                            (item, index) =>
                              currentunit == item.label && (
                                <div key={index} className="slt flex aic">
                                  <div className="lbl font s15 c333">
                                    {item.label}
                                  </div>
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
                              {_units.map((item, index) => (
                                <button
                                  key={index}
                                  className="cleanbtn item flex aic anim"
                                  onClick={() => {
                                    setDropUnits(false);
                                    setcurrentunit(item.label);
                                    setqty(item.label === "g" ? 250 : 1);
                                  }}
                                >
                                  <div className="txt font s15 black">
                                    {item.label}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="qty flex aic">
                    <div className="txt rfont s15 c333">{currentunit}:</div>
                    <div className="counter flex aic">
                      <button
                        className="cleanbtn icon-minus btn anim"
                        onClick={() =>
                          qty > 0
                            ? currentunit === "g"
                              ? qty > 250
                                ? setqty(qty - 250)
                                : ""
                              : setqty(qty - 1)
                            : ""
                        }
                      />
                      <input
                        disabled
                        /*onChange={(e) => setqty(`${e.target.value}`.replace(/[^0-9\.]/g, ''))} */ type="text"
                        className="iput cleanbtn font s15 c333"
                        placeholder="1"
                        value={`${qty}`}
                      />
                      <button
                        className="cleanbtn icon-plus btn anim"
                        onClick={() =>
                          currentunit === "g"
                            ? setqty(qty + 250)
                            : setqty(qty + 1)
                        }
                      />
                    </div>
                  </div>
                </div>

                {product.chopped === "Chopped" && (
                  <label className="chop-opt flex aic">
                    <div className="check-b flex aic">
                      <button
                        onClick={() => {
                          setChopped(
                            chopped === "Chopped" ? "Unchopped" : "Chopped"
                          );
                          chopped == "Chopped" &&
                            (document.documentElement.scrollTop = 200);
                        }}
                        className={`cirlce anim cleanbtn circle rel anim ${
                          chopped === "Chopped" && "on"
                        }`}
                      />
                      <div Chopped className="nfont s15 b5 black">
                        Chopped {product.label_en}
                      </div>
                    </div>
                    <div className="rfont s16 black">
                      {product.label_ur
                        ? `کٹی ${product.label_ur[0].value}`
                        : ""}
                    </div>
                  </label>
                )}
                <button
                  onClick={() =>
                    addinCart(
                      props.match.params.productid,
                      qty,
                      currentunit,
                      unit
                    )
                  }
                  className="button cart-btn font s16 flex aic anim"
                >
                  <div className="ico icon-shopping-cart s20" />
                  <span className="b5">Add to Cart</span>
                </button>
                <button className="cleanbtn wish font s15 flex aic">
                  <button
                    onClick={() => {
                      isAuthenticated
                        ? dispatch(
                            addtowishlist({
                              id: props.match.params.productid,
                              media: product.media,
                              label_en: product.label_en,
                              price: product.price,
                              discount: product.discount,
                              label_ur: product.label_ur,
                            })
                          )
                        : zuz.Toast.show({
                            html: "Please login to add this product to wishlist",
                            time: 5,
                          });
                    }}
                    className="cleanbtn fav-ico icon-heart1 s24 c333"
                  />
                  <span>Add to Wishlist</span>
                </button>
                {/*<div className="item font s15 flex aic">  
                                    <div className="lbl b6 black">SKU:</div>&nbsp;
                                    <div className="text c777">5350-13314</div>
                                </div>*/}
                {/*<div className="item font s15 flex aic">
                                    <div className="lbl b6 black">Catagory:</div>&nbsp;
                                    <div className="text c777">{product.category}</div>
                                </div>*/}
                {/*<div className="item font s15 flex aic">
                                    <div className="lbl b6 black">Tags:</div>&nbsp;
                                    <div className="text c777">{product.category}</div>
                                </div>*/}
                {/*<div className="item font s15 flex aic">
                                    <div className="lbl b6 black">Share:</div>&nbsp;
                                    <div className="social">
                                        <Link to="/" className="lin icon-facebook s18 c777" />
                                        <Link to="/" className="lin icon-twitter s18 c777" />
                                        <Link to="/" className="lin icon-instagram s18 c777" />
                                    </div>
                                </div>*/}
              </div>

              {/* Actions */}
              <div className="actions">
                <div className="tit rfont s15 c777">Reviews</div>
                <div className="item flex aic border first">
                  <div className="txt flex aic font s15 c333">
                    <div className={"stars flex aic"}>
                      <Rating rating={product.avgrating} />
                    </div>
                  </div>
                  <div className="rig flex aic rfont b5 s15">
                    {product.numreviews} Reviews
                  </div>
                </div>
                <div className="item flex aic">
                  <div className="txt flex aic">
                    <div className="ico icon-shopping-bag s22" />
                    <div className="flex flex-col">
                      <div className="font s15 c333">Home Delivery</div>
                      <div className="time rfont s13 c777">30 - 60 mints</div>
                    </div>
                  </div>
                  <div className="btn rfont s15 b6 black">Free</div>
                </div>
                <div className="item flex aic border">
                  <div className="txt flex aic font s15 c333">
                    <div className="ico icon-credit-card s22" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
                {/*<div className="title top rfont s15 c777">Return & Warranty</div>
                                <div className="item flex aic">
                                    <div className="txt flex aic">
                                        <div className="ico icon-rotate-cw s22" />
                                        <div className="flex flex-col">
                                            <div className="font s15 c333">Return On the Spot</div>
                                            <div className="time rfont s13 c777">Change of mind is not applicable</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item flex aic border"> 
                                    <div className="txt flex aic font s15 c333"> 
                                        <div className="ico icon-alert-triangle s22" />
                                        <span>Warranty not available</span>
                                    </div>
                                </div>*/}
                <div className="title top font s15 c000">Description</div>
                <div className="dsrpt font font s14 c333">
                  {product.description}
                </div>
                {/*<div className="title top rfont s15 c777">About Seller</div>
                                <div className="rating flex aic">
                                    <div className="blk flex flex-col">
                                        <div className="tt font s13 c777">Positive Rating</div>
                                        <div className="num font s24 b6 c333">79%</div>
                                    </div>
                                    <div className="blk flex flex-col">
                                        <div className="tt font s13 c777">Shipping on Time</div>
                                        <div className="num font s24 b6 c333">100%</div>
                                    </div>
                                </div>*/}
              </div>
            </div>
          </div>
        )}

        {/* Relative Items */}
        {relativeprodloaded === false ? (
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
          <div className="relative-blk flex flex-col wrapWidth">
            <div className="lbl fontl s24 b6 c000">Relative Products</div>
            <div className="slider-blk  flex">
              <Slider {...fourItemSlides}>
                {relatedproducts.map((item, index) => (
                  <NewProductCard key={index} data={item} />
                ))}
              </Slider>
            </div>
          </div>
        )}
        {/* Reviews Block */}
        <div className="reviews flex flex-col">
          {reviews.length > 0 && (
            <div className="lbl font s22 b c000">Client Reviews</div>
          )}
          {reviewloaded ? (
            reviews.map((item, index) => <Review key={index} data={item} />)
          ) : (
            <React.Fragment>
              {reviews.length > 0 && (
                <React.Fragment>
                  <div className="blk holder" />
                  <div className="blk holder" />
                  <div className="blk holder" />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Product;
