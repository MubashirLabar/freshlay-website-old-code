import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
// Screen
import { homepageProducts, getpopularProducts } from "../actions/product";
import { homepagepackages } from "../actions/package";
import ProductCard from "./sub/ProductCard";
import Header from "./Header";
import Footer from "./Footer";
import ProductCardPreloader from "./sub/ProdcutCardPreloader";
import Slider from "react-slick";
import NewProductCard from "./sub/NewProductCard";
import FruitVector from "../vectors/FruitVector";
import Searchbox from "./sub/Searchbox";
import Typewriter from "typewriter-effect";
import Lottie from "react-lottie";
import * as homeIntro from "../lottie/homeIntro.json";
import Whatsapp from "../svg/Whatsapp";

const Home = () => {
  const [skip, setskip] = useState(0);
  const [popularloaded, setpopularloaded] = useState([]);
  //const [popularproducts,setpopularproducts] = useState([])
  const [popularfruits, setpopularfruits] = useState(null);
  const [popularvegetables, setpopularvegetables] = useState(null);
  const [populargrocery, setpopulargrocery] = useState(null);
  let dispatch = useDispatch();
  //console.log(props.location.hash)
  /*useEffect(() => {
        const getJsonFromUrl = str => {
            const query = str.substr(1);
            const result = {};
          
            query.split('&').forEach(function(part) {
              const item = part.split('=');
              result[item[0]] = decodeURIComponent(item[1]);
            });
          
            return result;
          };
          if(props.location.hash)
          {
            const res = getJsonFromUrl(props.location.hash)
            if(!(Object.keys(res).length === 0))
            {
                console.log('innnnnnnnn')
             dispatch(googleauthenticatesignin(res.id_token));
            } 
            console.log(res)
          }
                 
    },[]) */
  const [categories, setCategories] = useState([
    { label: "Offers", tag: "Great Offers", icon: "/images/offer-icon.png" },
    { label: "Fruits", tag: "Fresh", icon: "/images/cata-food.svg" },
    { label: "Vegetables", tag: "Fresh", icon: "/images/cata-vegetable.svg" },
    { label: "Grocery & Meat", tag: "Fresh", icon: "/images/grocery.svg" },
  ]);

  const [introSlides, setIntroSlides] = useState([
    { img: "/images/offer-1.png" },
    { img: "/images/offer-2.png" },
    { img: "/images/offer-3.png" },
    { img: "/images/offer-4.png" },
    { img: "/images/offer-5.png" },
  ]);

  const [showSrch, setShowSrch] = useState(false);

  const emptyPopular = [{}, {}, {}];

  const offers = [
    { img: "/images/offer-1.jpeg" },
    { img: "/images/offer-2.jpeg" },
  ];

  const {
    loading,
    products,
    totalproducts,
    moreloading,
    packageloaded,
    packages,
  } = useSelector((state) => state.myhomepageproducts);
  // homepage products with skip method
  /*useEffect(() => {
        dispatch(homepageProducts(skip)) 
    }, [dispatch,skip]) */
  //console.log('packages',packages)
  useEffect(() => {
    dispatch(homepagepackages());
    //dispatch(homepagerandomproducts())
    const getpopularproducts = async () => {
      setpopularloaded(false);
      const res = await getpopularProducts();

      if (res) {
        setpopularfruits(res.popularfruits);
        setpopularvegetables(res.popularvegetables);
        setpopulargrocery(res.populargroceries);
        //setpopularproducts(res)
      }
      setpopularloaded(true);
    };
    getpopularproducts();
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setShowSrch(false);
    });
    if (showSrch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, []);

  const _homeIntro_ = {
    loop: true,
    autoplay: true,
    animationData: homeIntro.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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

  const threeItemSlides = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const oneItemSlides = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <React.Fragment>
      <Header notBg={true} />
      <div className={`hom-srch fixed anim ${showSrch ? "show" : "hide"}`}>
        <div className={`blk anim ${showSrch ? "show" : "hide"}`}>
          <Searchbox />
        </div>
      </div>
      {
        //loaded ?
        <div className="home-page">
          <div
            className="home-banner flex aic"
            style={{ backgroundImage: `url(/images/home-bg.png)` }}
          >
            <div className="wrap wrapWidth flex aic">
              <div className="left flex flex-col">
                <div className="slogn fontbe s58 color rel">
                  Freshlay <br />
                  <span className="c000">Farm to</span>
                  <br />
                  Fork
                </div>
                <div className="typewriter font s24 b6 c000">
                  <Typewriter
                    options={{
                      strings: [
                        "Refer your friends",
                        "Get 10% balance",
                        "Of there order.",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
                {/*<div className="meta flex aic">
                                <div className="dp">
                                    <div className="img" style={{backgroundImage:  `url(/images/slogn.jpg)`}}/>
                                </div>
                                <div className='lbl font s15 c000'>To explore the benefit of fruits, vegetables, and grocery. Subscribe to our channel now.</div>
                            </div>*/}
                <div className="actions flex aic">
                  <button
                    className="button flex aic font s15 cfff"
                    onClick={(e) => {
                      setShowSrch(!showSrch);
                      e.stopPropagation();
                    }}
                  >
                    <div className="ico icon-search s22 cfff" />
                    <span className="lbl">Find Products</span>
                  </button>
                  <a
                    href="https://api.whatsapp.com/send?phone=+92 317-7660050"
                    target="_blank"
                    className="cleanbtn whatsapp-btn c000 flex aic rel"
                  >
                    <Whatsapp />
                  </a>
                </div>
              </div>
              <div className="right flex aic">
                <div className="vector rel">
                  <Lottie options={_homeIntro_} width={520} />
                </div>
                {/*<div className="vector rel" style={{background: `url(/images/ellipse-1.svg)`}}>
                                <img src="/images/plate-1.png" className="img" />
                            </div>*/}
                <div className="menu flex flex-col">
                  <Link to="/user/category/Fruits" className="item flex aic">
                    <img src="/images/fruit-icon.svg" className="ico" />
                    <div className="font s15 b7 color">Fruits</div>
                  </Link>
                  <Link
                    to="/user/category/Vegetables"
                    className="item flex aic"
                  >
                    <img src="/images/vegetable-icon.svg" className="ico" />
                    <div className="font s15 b7 color">Vegetables</div>
                  </Link>
                  <Link to="/user/category/Grocery" className="item flex aic">
                    <img src="/images/grocery-icon.svg" className="ico" />
                    <div className="font s15 b7 color">Grocery</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="download">
            <div className="wrapWidth">
              <div className="blk rel">
                <img src="/images/dl-ico-1.svg" className="dl1 abs" />
                <img src="/images/dl-ico-2.svg" className="dl2 abs" />
                <img src="/images/ellipse-2.svg" className="dl3 abs" />
                <img src="/images/plate-1.png" className="dl4 abs" />
                <div className="lit flex aic">
                  <img src="/images/dl-mobile.png" className="mbl" />
                  <div className="meta flex flex-col">
                    <div className="lbl fontbe s32 c000">
                      Download
                      <br /> Our Mobile App Now
                    </div>
                    <div className="flex aic">
                      <div className="user">
                        <div
                          style={{ backgroundImage: `url(/images/user-1.jpg)` }}
                          className="img"
                        />
                      </div>
                      <div className="user">
                        <div
                          style={{ backgroundImage: `url(/images/user-3.jpg)` }}
                          className="img"
                        />
                      </div>
                      <div className="user">
                        <div
                          style={{ backgroundImage: `url(/images/user-6.jpg)` }}
                          className="img"
                        />
                      </div>
                      <div className="user">
                        <div
                          style={{ backgroundImage: `url(/images/user-4.jpg)` }}
                          className="img"
                        />
                      </div>
                      <Link
                        to="/"
                        className="lin button icon-arrow-up-right s20 cfff flex aic"
                      />
                    </div>
                  </div>
                </div>
                <div className="ftr flex aic">
                  <div className="item flex flex-col">
                    <img src="/images/playstore-1.svg" className="img" />
                    <div className="tt font s14 b6 c333">Playstore</div>
                    <div className="stars flex aic">
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                    </div>
                    <a
                      target="_blank"
                      href={
                        "https://play.google.com/store/apps/details?id=com.freshlayv1"
                      }
                      className="button fontr s13 cfff"
                    >
                      Get Now
                    </a>
                  </div>
                  <div className="item flex flex-col">
                    <img src="/images/appstore-1.svg" className="img" />
                    <div className="tt font s14 c333 b6">Appstore</div>
                    <div className="stars flex aic">
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                      <div className="ico icon-star1" />
                    </div>
                    <a
                      target="_blank"
                      href={
                        "https://apps.apple.com/pk/app/freshlay/id1573938279"
                      }
                      className="button fontr s13 cfff"
                    >
                      Get Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intro Sliders */}
          <div className="intro-slider">
            <div className="wrapWidth flex aic">
              <Slider {...threeItemSlides}>
                {introSlides.map((item, index) => (
                  <div key={index}>
                    <div className="item rel">
                      <img className="img" src={item.img} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Catagory Section */}
          <div className="categories">
            <div className="wrap wrapWidth flex aic">
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={
                    item.label === "Offers"
                      ? "/allpackages"
                      : item.label == "Grocery & Meat"
                      ? `/user/category/Grocery`
                      : `/user/category/${item.label}`
                  }
                  className="blk flex flex-col aic"
                >
                  <img src={item.icon} className="img" />
                  <div className="lbl tt fontbe s22 c000">{item.tag}</div>
                  <div className="lbl fontbe s28 color">{item.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div
            className={`slider-blk flex flex-col wrapWidth ${
              !packageloaded || packages.length == 0 ? "hide" : "show"
            }`}
          >
            <div className="label fontl s32 b7 c000">
              <span className="s22 dot">&bull;</span>Offers
            </div>
            <div className="wrap flex aic">
              {!packageloaded || packages == null ? (
                <React.Fragment>
                  {emptyPopular.map((el, i) => (
                    <ProductCardPreloader key={i} />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {packages && (
                    <Slider {...fourItemSlides}>
                      {packages.map((item, index) => (
                        <NewProductCard data={item} package={true} />
                      ))}
                    </Slider>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Fresh Fruits */}
          <div className="slider-blk flex flex-col wrapWidth">
            <div className="label fontl s32 b7 c000">
              <span className="s22 dot">&bull;</span>Fresh Fruits
            </div>
            <div className="wrap flex aic">
              {!popularloaded || popularfruits == null ? (
                <React.Fragment>
                  {emptyPopular.map((el, i) => (
                    <ProductCardPreloader key={i} />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {popularfruits && (
                    <Slider {...fourItemSlides}>
                      {popularfruits.map((item, index) => (
                        <NewProductCard data={item} />
                      ))}
                    </Slider>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Fresh Vegetables */}
          <div className="slider-blk flex flex-col wrapWidth">
            <div className="label fontl s32 b7 c000">
              <span className="s22 dot">&bull;</span>Fresh Vegetables
            </div>
            <div className="wrap flex aic">
              {!popularloaded || popularvegetables == null ? (
                <React.Fragment>
                  {emptyPopular.map((el, i) => (
                    <ProductCardPreloader key={i} />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {popularvegetables && (
                    <Slider {...fourItemSlides}>
                      {popularvegetables.map((item, index) => (
                        <NewProductCard data={item} />
                      ))}
                    </Slider>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          {/* Fresh Meats */}
          <div className="slider-blk flex flex-col wrapWidth">
            <div className="label fontl s32 b7 c000">
              <span className="s22 dot">&bull;</span>Grocery & Meats
            </div>
            <div className="wrap flex aic">
              {!popularloaded || populargrocery == null ? (
                <React.Fragment>
                  {emptyPopular.map((el, i) => (
                    <ProductCardPreloader key={i} />
                  ))}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {populargrocery && (
                    <Slider {...fourItemSlides}>
                      {populargrocery.map((item, index) => (
                        <NewProductCard data={item} />
                      ))}
                    </Slider>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        //: <div>Loading</div>
      }
      <Footer />
    </React.Fragment>
  );
};

export default Home;
