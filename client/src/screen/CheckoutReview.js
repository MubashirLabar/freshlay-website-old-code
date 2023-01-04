import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'

function CheckoutReview(props) {

    let data = useSelector(state => state.cartReducer);
    // we update state even here if i get any error of loading , first false after loading true
    const {cartItems,itemsprice} = data;
    const [product, setProduct] = useState([
        {label: "White Potato", unit: "kg", qty:"1", price: "60", orignalPrice: "70", img: "/images/1.jpg"},                
        {label: "Fresh Lehsan China", unit: "kg", qty:"3", price: "80", orignalPrice: "90", img: "/images/2.jpg"},                
        {label: "Ginger China", unit: "kg", qty:"2", price: "150", orignalPrice: "180", img: "/images/3.jpg"},                                              
    ])
    
    useEffect(()=>{
        document.title = "Review Order";
    })

    return (
        <div className="checkout-review flex">
            <div className="left">
                <div className="title font b6 s24 black">Review Order</div>
                <div className="wrap">
                    {
                        cartItems.map(item=>(
                            <div className="review-item flex aic">
                                <div className="pic">
                                <img
                                 className="img"
                                 src={`${process.env.REACT_APP_END_URL}${item.media}`}
                                />                           
                                </div> 
                                <div className="meta flex flex-col">
                                    <div className="flex aic">
                                        {item.type === "product" ? 
                                        <div className="name rfont s16 b6 black wordwrap">{item.label_en}</div>
                                        : 
                                        <div className="name rfont s16 b6 black wordwrap">{item.PKG_id}</div>
                                         }
                                        <div className="unit rfont s15 black flex aic">
                                            <span>{item.qty}</span>
                                            <span>{item.unit}</span>  
                                        </div>                             
                                    </div>
                                </div>   
                            </div>
                    
                        ))
                    }
                </div>
            </div>

            {/* Right Side */} 
            <div className="order-right">  
                <div className="block flex flex-col">
                    <div className="tit rfont s16 b6 black">Order Summary</div>
                    <div className="item flex aic">
                        <div className="lbl rfont s15 c333">Sub Total</div>
                        <div className="amount rfont s15 black">{
                        itemsprice.subtotal
                        }</div> 
                    </div>
                    <div className="item flex aic">
                        <div className="lbl rfont s15 c333">Total Items</div>
                        <div className="amount rfont s15 black">{cartItems.length}</div> 
                    </div>
                    <div className="item flex aic"> 
                        <div className="lbl rfont s15 black">Total Saving</div>
                        <div className="amount rfont s15 black">{
                        itemsprice.savings
                        }</div> 
                    </div>
                    <div className="item flex aic">
                        <div className="lbl rfont s15 black">Shipping Fee</div>
                        <div className="amount rfont s15 black">Rs 0</div> 
                    </div>
                    {/*<div className="item ship flex flex-col"> 
                        <div className="lbl ship rfont s15 black">Shipping To:</div> 
                        <div className="adr rfont s15 black">Chungi no.9 near goal Bag street no #3, Multan</div>                     
                    </div>*/}
                    <div className="item flex aic"> 
                        <div className="lbl rfont s16 b6 black">Order Total</div>
                        <div className="amount rfont s18 b6 black">{
                        itemsprice.ordertotal
                        }</div> 
                    </div> 
                    <Link to="/user/checkout/checkout-payment" className="button btn font s15 b6 anim">Proceed to Payment</Link>
                </div>    
                <div className="gtr flex flex-col">
                    <div className="msg rfont s15 c555">We guarantee quick, dependable service and your cashback if anything turns out badly.</div>
                    <div className="flex aic">
                        <div className="links flex flex-col">
                            <Link to="/" className="link rfont s15 b5 anim">{`Learn about our ${global.siteName} Guarantee`}</Link>
                            <Link to="/" className="link rfont s15 b5 anim">Return Policy</Link>
                        </div>
                        <img src={`/images/guarantee.svg`} className="img" />  
                    </div>
                </div> 
            </div> 
        </div>
    );
}

export default CheckoutReview;