import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addtowishlist } from "../../actions/auth";
import zuz from "../../core/Toast";
import { connect, useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";

function ProductCard(props) {
  // console.log('product card')
  const dispatch = useDispatch();
  const { label_en, label_ur, price, discount, slug, media, id } = props.data;
  //console.log(props.data)
  const [heart, setHeart] = useState(false);
  const theuser = useSelector((state) => state.authreducer);
  const { loaded, user, wishlist, isAuthenticated } = theuser;
  //console.log(props.data.numreviews)
  //console.log(typeof(props.data.numreviews))
  return (
    <React.Fragment>
      <div className="product-card flex rel">
        {isAuthenticated ? (
          <button
            className={`fav-ico icon-heart1 abs cleanbtn s24 flex aic anim ${
              wishlist
                ? wishlist.map((item) => item.id == id).includes(true)
                  ? "on"
                  : ""
                : ""
            }`}
            //  onClick={e=>setHeart(!heart)}
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
          <img
            className="img"
            src={`${process.env.REACT_APP_END_URL}${media}`}
          />
          <div className="detail flex flex-col">
            <h2 className="nam rfont s15 b5 black wordwrap">{label_en}</h2>
            {label_ur && (
              <div className="fontu s16 u-nam font black wradwrap">
                {label_ur[0].value}
              </div>
            )}
            {props.package ? (
              <div className="reviews flex aic">
                <div className="rev rfont s14 b3 c777">
                  ({props.data.packageitems.length} items)
                </div>
              </div>
            ) : props.data.avgrating && props.data.numreviews > 0 ? (
              <div className="reviews flex aic">
                <Rating rating={props.data.avgrating} />
                <div className="rev rfont s14 b3 c777">
                  ({props.data.numreviews} review)
                </div>
              </div>
            ) : (
              <div className="reviews flex aic">
                <Rating rating={0} />
                <div className="rev rfont s14 b3 c777">(0 review)</div>
              </div>
            )}
            <div className="prices flex aic">
              {discount && discount > 0 ? (
                <React.Fragment>
                  <div className="price rfont s16 b black">
                    Rs. {parseInt(price) - parseInt(discount)}
                  </div>
                  {discount && (
                    <strike className="discount font s14 b5 c777">
                      Rs. {parseInt(price)}
                    </strike>
                  )}
                </React.Fragment>
              ) : (
                <div className="price rfont s16 b black">Rs.{price}</div>
              )}
            </div>
            {/*<div className="ftr flex aic"> 
                        <div className="qty">
                            <div className="counter flex aic">
                                <button className="cleanbtn icon-minus btn anim" />
                                <input className="iput cleanbtn font s15 c333" placeholder="1" value="1"/>                                         
                                <button className="cleanbtn icon-plus btn anim" />
                            </div>
                        </div> 
                        <div className="cart flex aic">
                            <button className="button icon-shopping-cart flex aic s20 cfff" />
                        </div>
                    </div>*/}
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default ProductCard;
