import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Screen
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./sub/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../actions/product";
import ProductCardPreloader from "./sub/ProdcutCardPreloader";
import NewProductCard from "./sub/NewProductCard";

import Lottie from "react-lottie";
import * as comingSoon from "../lottie/coming.json";

function Category(props) {
  const [dropCata, setDropCata] = useState(false);
  const [dropPrice, setDropPrice] = useState(false);
  const [dropSort, setDropSort] = useState(false);
  const [cata, setCata] = useState(props.match.params.categoryname);
  const [sort, setSort] = useState("Default sorting");
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [skip, setskip] = useState(0);
  const [minmax, setminmax] = useState("");

  const [catagory, setCatagory] = useState([
    { label: "All", icon: "icon-eye", slug: "/" },
    { label: "Vegetables", icon: "icon-eye", slug: "/" },
    { label: "Fruits", icon: "icon-eye", slug: "/" },
    { label: "Meats", icon: "icon-eye", slug: "/" },
  ]);
  const [sortItems, setSortItems] = useState([
    {
      label: "Default sorting",
      slug: "/",
      sorting: {
        label_en: "1",
      },
    },
    {
      label: "Sort by average rating",
      slug: "/",
      sorting: {
        avgrating: "1",
      },
    },
    {
      label: "Sort by latest",
      slug: "/",
      sorting: {
        price: "-1",
      },
    },
    {
      label: "Price: low to high",
      slug: "/",
      sorting: {
        price: "1",
      },
    },
    {
      label: "Price: high to low",
      slug: "/",
      sorting: {
        price: "-1",
      },
    },
  ]);
  const [productsorting, setproductsorting] = useState({ label_en: "1" });

  const emptyProducts = [{}, {}, {}, {}, {}, {}];
  const { loaded, categories } = useSelector(
    (state) => state.categoriesandroles
  );

  useEffect(() => {
    if (loaded) {
      let mycategories = [];
      mycategories.push({ label: "All", icon: "icon-eye", slug: "/" });
      categories.map((item) => {
        if (item.status === "Active") {
          mycategories.push({ label: `${item.name}`, icon: "icon-eye" });
        }
      });
      setCatagory(mycategories);
    }
  }, [loaded]);
  useEffect(() => {
    document.body.addEventListener("click", () => {
      setDropCata(false);
      setDropPrice(false);
      setDropSort(false);
    });
  }, []);
  let data = useSelector((state) => state.filterdproducts);
  const { loading, products, totalproducts, filtermoreloading } = data;

  let dispatch = useDispatch();

  useEffect(() => {
    setskip(0);
    setCata(props.match.params.categoryname);
  }, [props.match.params.categoryname]);

  useEffect(() => {
    document.title = cata === "Grocery" ? "Grocery & Meat" : cata;
    //console.log('calling for data',cata)
    const filtertheproducts = () => {
      if (cata === "All" && min <= 0 && max <= 0) {
        dispatch(
          filterProducts({
            sorting: productsorting,
            skip,
          })
        );
      } else if (!(cata === "All") && min <= 0 && max <= 0) {
        // add sorting
        dispatch(
          filterProducts({
            filterdata: { category: cata.toLowerCase() },
            sorting: productsorting,
            skip,
          })
        );
      } else if (cata === "All" && (min > 0 || max > 0)) {
        dispatch(
          filterProducts({
            filterdata: {
              price: {
                $gte: min,
                $lte: max,
              },
            },
            sorting: productsorting,
            skip,
          })
        );
      } else {
        // add sorting
        dispatch(
          filterProducts({
            filterdata: {
              category: cata.toLowerCase(),
              price: {
                $gte: min,
                $lte: max,
              },
            },
            sorting: productsorting,
            skip,
          })
        );
      }
    };
    filtertheproducts();
  }, [cata, minmax, productsorting, skip]);

  const _preLoading = () => {
    return (
      <div className="multi-prdt-wrap flex flex-col wrapWidth">
        <div className="search-items">
          {emptyProducts.map((el, i) => (
            <ProductCardPreloader key={i} />
          ))}
        </div>
      </div>
    );
  };

  const _comingSoon_ = {
    loop: true,
    autoplay: true,
    animationData: comingSoon.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <React.Fragment>
      <Header />

      <div className="category-page flex flex-col wrapWidth">
        {/* {cata == "Grocery" ? (
          <div className="empty-page orders flex flex-col">
            <div className="vector">
              <Lottie options={_comingSoon_} width={250} />
            </div>
            <div className="meta flex flex-col aic">
              <div className="txt fontl s18 b6 c000">Coming Soon!</div>
              <div className="txt fontl s15 c000">
                Our Grocery Products will be display within few days.
              </div>
              <Link to="/" className="button txt font s15 cfff anim">
                Explore Other
              </Link>
            </div>
          </div>
        ) : ( */}
        <React.Fragment>
          <head className="hdr flex aic">
            <div className="title rfont b s24 black">
              {cata == "Grocery" ? "Grocery & Meat" : cata}
            </div>
            <div className="filters flex aic">
              {/* Catagory Selecter Block */}
              <button
                className="cleanbtn cum-select flex aic rel"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropCata(!dropCata);
                  setDropPrice(false);
                  setDropSort(false);
                }}
              >
                {/* showing title after matching value */}
                {catagory.map(
                  (item, index) =>
                    cata == item.label && (
                      <div key={index} className="flex aic">
                        <div
                          className={`ico font s17 flex aic cfff  ${item.icon} ${item.label}`}
                        />
                        <div className="lbl font s15 black">
                          {item.label === "Grocery"
                            ? "Grocery & Meat"
                            : item.label}
                        </div>
                        <div
                          className={`arrow s18 c777 anim ${
                            dropCata == true
                              ? "icon-chevron-up"
                              : "icon-chevron-down"
                          }`}
                        />
                      </div>
                    )
                )}
                {/* if drop cata is true show drop-down menu */}
                {dropCata && (
                  <div className="options flex flex-col abs">
                    {catagory.map((item, index) => (
                      <button
                        key={index}
                        className="cleanbtn item flex aic anim"
                        onClick={() => {
                          setDropCata(!dropCata);
                          setCata(item.label);
                          setskip(0);
                          // filtertheproducts(item.label);
                        }}
                      >
                        <div
                          className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}
                        />
                        <div className="txt font s15 black">
                          {item.label === "Grocery"
                            ? "Grocery & Meat"
                            : item.label}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </button>

              {/* Pricing Selecter Block
                                <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                    e.stopPropagation();
                                    setDropPrice(!dropPrice);
                                    setDropCata(false);
                                    setDropSort(false);
                                }}>
                                    <div className="flex aic">          
                                        <div className="lbl font s15 black">Any price</div>
                                        <div className={`arrow s18 c777 anim ${dropPrice == true ? "icon-chevron-up" : "icon-chevron-down"}`} />
                                    </div> 
                                    {dropPrice && 
                                        <div className="options flex flex-col abs" onClick={(e)=>{ e.stopPropagation()}}>
                                            <div className="range flex aic">
                                                <input type="text" placeholder="Min" value={min} className="rput rfont s16 c333" onChange={(e) => setmin(e.target.value)}/>
                                                <input type="text" placeholder="Max" value={max} className="rput rfont s16 c333" onChange={(e) => setmax(e.target.value)}/>
                                            </div>
                                            <button className="button btn font s15 b6 anim" onClick={e=>{
                                                setDropPrice(false)
                                            //   filtertheproducts()
                                            setminmax(`${min}${max}`)
                                            setskip(0)
                                                }}>Apply</button> 
                                        </div>   
                                    }
                                </button> */}

              {/* Sort Selecter Block */}
              <button
                className="cleanbtn cum-select flex aic rel"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropSort(!dropSort);
                  setDropCata(false);
                  setDropPrice(false);
                }}
              >
                {sortItems.map(
                  (item, index) =>
                    sort == item.label && (
                      <div key={index} className="flex aic">
                        <div className="lbl font s15 black">{item.label}</div>
                        <div
                          className={`arrow s18 c777 anim ${
                            dropSort == true
                              ? "icon-chevron-up"
                              : "icon-chevron-down"
                          }`}
                        />
                      </div>
                    )
                )}
                {dropSort && (
                  <div className="options sort flex flex-col abs">
                    {sortItems.map((item, index) => (
                      <button
                        key={index}
                        className="cleanbtn item flex aic anim"
                        onClick={() => {
                          setDropSort(!dropSort);
                          setSort(item.label);
                          setproductsorting(item.sorting);
                          setskip(0);
                        }}
                      >
                        <div className="txt font s15 black">{item.label}</div>
                      </button>
                    ))}
                  </div>
                )}
              </button>
            </div>
          </head>
          {/* Selected for You */}
          {loading ? (
            _preLoading()
          ) : (
            <div className="multi-prdt-wrap flex flex-col wrapWidth">
              {products.length > 0 ? (
                <div className="search-items">
                  {products.map((item, index) => (
                    <NewProductCard key={index} data={item} />
                  ))}
                </div>
              ) : (
                <div>No product found</div>
              )}
              {products.length >= totalproducts ? (
                ""
              ) : (
                <div className="more flex aic">
                  {filtermoreloading ? (
                    _preLoading()
                  ) : (
                    <button
                      className="button fontl s15 b6"
                      onClick={() => {
                        setskip(skip + 10);
                      }}
                    >
                      Load more
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </React.Fragment>
        {/* )*/}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Category;
