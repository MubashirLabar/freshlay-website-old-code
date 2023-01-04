import React, { useState, useEffect } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { generateID } from "../../core";
import { addToCart } from "../../actions/cart";
import { addtowishlist } from "../../actions/auth";
import zuz from "../../core/Toast";
import { connect, useDispatch, useSelector } from "react-redux";

function NewProductCard(props) {
  const {
    label_en,
    avgrating,
    label_ur,
    price,
    discount,
    slug,
    unit,
    media,
    id,
  } = props.data;
  const [qty, setqty] = useState(1);
  const theuser = useSelector((state) => state.authreducer);
  const { loaded, user, wishlist, isAuthenticated } = theuser;

  const [unitValue, setUnitValue] = useState(1);
  const [punit, setpunit] = useState("kg");
  const [calprice, setcalprice] = useState(price ? price - discount : "");
  const [dropUnits, setDropUnits] = useState(false);
  const _units = [
    { qty: 250, punit: "g" },
    { qty: 500, punit: "g" },
    { qty: 750, punit: "g" },
    { qty: 1, punit: "kg" },
    { qty: 2, punit: "kg" },
    { qty: 3, punit: "kg" },
    { qty: 4, punit: "kg" },
    { qty: 5, punit: "kg" },
    { qty: 6, punit: "kg" },
    { qty: 7, punit: "kg" },
    { qty: 8, punit: "kg" },
    { qty: 9, punit: "kg" },
    { qty: 10, punit: "kg" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    setDropUnits(false);
    document.body.addEventListener("click", () => {
      setDropUnits(false);
    });
  }, []);

  {
    /* Add to Cart */
  }
  const addinCart = ({ id, qty, unit, orgunit }) => {
    console.log("saving", qty, unit);
    if (qty === 0) {
      zuz.Toast.show({ html: "Please add some quantity", time: 5 });
    } else {
      const cart_id = generateID(4, 5);
      dispatch(
        addToCart({
          cart_id,
          id,
          chopped: "Unchopped",
          choppedimg: [],
          qty,
          unit,
          type: "product",
          orgunit,
        })
      );
      zuz.Toast.show({ html: "Added to cart successfully", time: 5 });
    }
  };
  const addpkginCart = (id, qty, unit) => {
    const cart_id = generateID(4, 5);
    dispatch(addToCart({ cart_id, id, qty, unit, type: "package" }));
  };
  // useEffect(() => {
  //     const _calprice = () => {
  //         let subtotal;
  //         if (unit === "kg") {
  //             if(punit === 'kg') {
  //                 subtotal =
  //                 (parseInt(price) - discount) * parseInt(unitValue);
  //             }
  //             else if(punit === "g") {
  //                 subtotal =
  //                 (parseInt(price) - discount) * parseInt(unitValue)/1000;
  //             }
  //           }
  //           else if (unit === "g") {
  //             if(punit === 'kg') {
  //                 subtotal =
  //                 (parseInt(price) - discount) * (parseInt(unitValue) * 1000);
  //             }
  //             else if(punit === "g") {
  //                 subtotal =
  //                 (parseInt(price) - discount) * parseInt(unitValue);
  //             }
  //           } else {
  //             subtotal = parseInt(price) * parseInt(qty);

  //           }
  //         setcalprice(subtotal)
  //         //console.log(`unit ${unit} productunit ${punit} punitvalue ${unitValue} qty ${qty} ${label_en} pricecalculated`,subtotal)
  //     }
  //     _calprice()
  // },[unitValue,qty])

  return (
    <div className="prdt-card flex flex-col aic rel">
      {/*<div className='discount fontl s13 cfff'>40% discount</div>*/}
      {isAuthenticated ? (
        props.package ? (
          ""
        ) : (
          <button
            className={`fav-ico icon-heart1 abs cleanbtn s24 flex aic anim ${
              wishlist
                ? wishlist.map((item) => item.id == id).includes(true)
                  ? "on"
                  : ""
                : ""
            }`}
            onClick={() =>
              dispatch(
                addtowishlist({
                  id,
                  media,
                  label_en,
                  price,
                  discount,
                  label_ur,
                })
              )
            }
          />
        )
      ) : (
        <button
          className={`fav-ico icon-heart1 abs cleanbtn s24 flex aic anim ""}`}
          onClick={() => {
            zuz.Toast.show({
              html: "Please login to add this product to wishlist",
              time: 5,
            });
          }}
        />
      )}
      <Link
        to={props.package ? `/user/package/${id}` : `/user/product/${id}`}
        className="blk flex flex-col aic rel anim"
      >
        <div className="media">
          <img
            src={`${process.env.REACT_APP_END_URL}${media}`}
            className="img"
          />
        </div>
        <div className="prt-lbl fontl s20 b6 c000 wordwrap">{label_en}</div>
        <div className="prt-lbl fontu s26 b5 c000 wordwrap">
          {label_ur ? label_ur[0].value : ""}
        </div>
        {
          props.package ? (
            <div className="rev rfont s14 b5 b3 c000">
              ({props.data.packageitems.length} items)
            </div>
          ) : (
            ""
          )
          // <Rating rating={avgrating || 5} />
        }
      </Link>
      {!props.package && (
        <div className="meta flex aic">
          {/* Quntity */}
          {unit !== "kg" && unit !== "g" ? (
            <div className="qty flex aic">
              <button
                className="cleanbtn ico icon-minus s18 anim"
                onClick={() =>
                  qty > 0
                    ? //unit == 'g' ?
                      //setqty(qty-0.5) :
                      setqty(qty - 1)
                    : ""
                }
              />
              <input
                type="text"
                value={qty}
                className="cleanbtn iput font s14 color"
              ></input>
              <button
                className="cleanbtn ico icon-plus s18 c000 anim"
                onClick={() =>
                  //unit == "g" ?
                  //setqty(qty+0.5) :
                  setqty(qty + 1)
                }
              />
            </div>
          ) : (
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
                    unitValue == item.qty &&
                    punit == item.punit && (
                      <div key={index} className="slt flex aic">
                        <div className="lbl font s15 color">
                          {item.qty} {item.punit}
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
                          setUnitValue(item.qty);
                          setpunit(item.punit);
                        }}
                      >
                        <div className="txt font s15 black">
                          {item.qty} {item.punit}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </button>
            </div>
          )}
          {/*<div className="price fontl s18 b7 c000 rel">Rs. {price - discount}</div> */}
        </div>
      )}
      <div className="flex flex-col aic rates">
        <strike className="item flex aic c999">
          <div className="lbl fontl s13 b3 ">Avg Market Price</div>
          <div className="ct-prc fontl s15 b3 rel">
            {
              Number(price) + Number(discount)
              //Math.floor(calprice)
            }
            <span className="s12">&nbsp;PKR</span>
          </div>
        </strike>
        <div className="item flex aic c000">
          <div className="lbl fontl s15">Freshlay Price</div>
          <div className="price fontl s18 b7 rel">
            {
              price
              //Math.floor((calprice) * 60 / 100)
            }
            <span className="s12">&nbsp;PKR</span>
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          props.package
            ? addpkginCart(id, qty, unit)
            : addinCart({
                id,
                qty: unit === "g" || unit === "kg" ? unitValue : qty,
                unit: unit === "kg" || unit === "g" ? punit : unit,
                orgunit: unit,
              })
        }
        className="button fontl s14 cfff flex aic"
      >
        <img src="/images/cart.svg" className="ico" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}

export default NewProductCard;
