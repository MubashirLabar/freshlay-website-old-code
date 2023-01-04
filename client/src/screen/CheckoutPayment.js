import React,{useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {updatepaymentmethod} from '../actions/cart'
import {createOrder} from '../actions/order'
import zuz from "../core/Toast";

import Lottie from 'react-lottie';
import * as timerClock from "../lottie/timerClock.json"
 
function CheckoutPayment(props) {
    let data = useSelector(state => state.cartReducer);
    // we update state even here if i get any error of loading , first false after loading true
    const {cartItems,itemsprice,orderaddress,paymentMethod} = data;
    const [payMethod, setPayMethod] = useState([
        {label: "Cash on delivery", img: "/images/hand-cash.svg", slug: "cash-delivery"},
        {label: "Jazz Cash", img: "/images/jazz-cash.jpg", slug: "jazz-cash"},
        {label: "Bank transfer", img: "/images/bank.svg", slug: "bank"},
        {label: "Debit/Credit Card", img: "/images/card.svg", slug: "card"},
    ]);
    const [dropMenu, setDropMenu] = useState(false);
    const [method, setMthod] = useState("cash-delivery");
    const [btndisabled,setbtndisable] = useState(false)
    const [btntext,setbtntext] = useState("Place order")
    const dispatch = useDispatch();
    const updatepayment = (paymentmethod)=> {
        dispatch(updatepaymentmethod(paymentmethod))
    }
   useEffect(() => {
       document.title = "Order Payment"; 
    dispatch(updatepaymentmethod('Cash on delivery'))
   },[])

   const _timerClock_ = {
    loop: true,
    autoplay: true, 
    animationData: timerClock.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

   const saveOrder = async () => {
       setbtndisable(true)
       setbtntext("Processing...")
       if(paymentMethod)
       {
        const order = {
            orderItems : cartItems,
            totalprice : itemsprice.subtotal,
            savings : itemsprice.savings,
            discountedprice : itemsprice.ordertotal,
            orderlocation: orderaddress,
            paymentMethod
        } 
        const res = await dispatch(createOrder(order))
        if(res === false)
        {
            setbtntext("Place order")
        }
       }
       else {
        zuz.Toast.show({html:`Please select payment first`, time: 5});
       }
   
   }


    return (
        <div className="checkout-payment flex">
           <div className="left">
                <div className="title font b6 s24 black">Complete Payment</div>
                <div className="wrap"> 
                    {/* Payment Method Selector */} 
                    <div className="pay-slect">
                        <div className="lbl rfont s16 b6 c000">Payment Method</div>
                        <div className={`blk flex flex-col rel ${dropMenu && "on"}`}>
                            <button className="cleanbtn flex aic"onClick={()=>{setDropMenu(!dropMenu)}}>
                                { 
                                    payMethod.map(item=>(
                                        method == item.slug &&
                                            <button className="cleanbtn item flex aic">
                                                <img src={item.img} className="img" />  
                                                <div className="font s15 black">{item.label}</div>                    
                                            </button>
                                    ))
                                } 
                                <div className="icon icon-chevron-down s18 c333"/>
                            </button>  
                            {dropMenu && 
                                <div className="drop-blk abs"> 
                                { 
                                    payMethod.map(item=>( 
                                        <button className="cleanbtn item flex aic" onClick={()=>{
                                            setMthod(item.slug);
                                            updatepayment(item.label)
                                            setDropMenu(false);
                                        }}>
                                            <img src={item.img} className="img" />  
                                            <div className="lbl font s16 b6 black">{item.label}</div>   
                                            {method == item.slug && <div className="tick icon-check s20 b" />}                 
                                        </button>
                                    ))
                                } 
                                </div>
                            }
                        </div>
                    </div>
                    
                    {/*Discription Block */}
                    <div className="discrp flex aic">
                        {method == "cash-delivery" && <div className="txt font s15 c333">Pay with Cash after receiving the order.</div>}
                        {method == "bank" && <div className="txt font s15 c333">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</div>}
                        {method == "jazz-cash" && <div className="txt font s15 c333">Pay freely using JazzCash on your mobile Account or Shop.</div>}
                        {method == "card" && <div className="txt font s15 c333">Any local or international Visa/Mastercard Credit or Debit Card holder can pay online.</div>}
                    </div> 

                    {/* stamp */}
                    <div className="stamp flex aic">
                        <div className="wrp flex aic">
                            <div className="rt flex aic">
                                <Lottie options={_timerClock_} width={70}/> 
                            </div>  
                            <div className="lf flex flex-col">
                                <div className="msg rfont s16 b6 black">Delivery Max 1hrs, Mon to Sat 9:00AM to 5:00PM Sunday 12:00AM to 7:00PM</div>
                            </div>
                        </div>
                    </div>
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
                  
                    <button disabled={btndisabled} onClick={() => saveOrder()} className="button btn font s15 b6 anim">{btntext}</button>
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

export default CheckoutPayment;