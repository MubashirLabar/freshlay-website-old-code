import {Dialog} from "../core";
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import OrderDetail from './sub/OrderDetail';
import {getOrders} from '../actions/order'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function OrdersPrevious(props) {
 
    const data = useSelector((state) => state.orderDetails);
    const { loading,orderitemsprev } = data;
    
    let serialNo = 1; 
    const [order, setOrder] = useState([
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "On Delivery", orderstatus: "delivered"},                                 
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "On Delivery", orderstatus: "delivered"},                                 
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "Jazz Cash", orderstatus: "rejected"},                                 
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "On Delivery", orderstatus: "delivered"},                                 
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "On Delivery", orderstatus: "delivered"},                                 
        {date: "Yesterday at 7:46 AM", orderId:"SM80", paymentMethod: "Bank", orderstatus: "rejected"},                                  
    ]);

    const [orderDetail, setOrderDetail] = useState([
        {order_id: "ZN847", item_name: "White Potato", qty: "1kg", price: "60"},
        {order_id: "ZN846", item_name: "Ginger China", qty: "500gm", price: "150"},
        {order_id: "ZN845", item_name: "Crinkled Smooth", qty: "1kg", price: "50"},
        {order_id: "ZN844", item_name: "Leshan China", qty: "500gm", price: "120"},
    ]); 
    const emptyBlock = [{},{},{},{},{}];
    const dispatch = useDispatch();
    useEffect(() => {
           dispatch(getOrders())
    },[])


    const _orderDetail = (Id) => {
        Dialog({
           // title: `Order details #${Id}`,
           content: <OrderDetail orderid={Id}/>
        })
    } 

    const More = ({pay, id, orderitems, discountedprice, packages, _id}) => {
        return(
            <div className="more-cols">
                <div className="table flex flex-col">
                    <div className="hdr flex aic">
                        <div className="col rfont s15 b5 c333">Order ID</div>
                        <div className="col rfont s15 b5 c333">Payment Status</div>
                        <div className="col rfont s15 b5 c333">Action</div> 
                    </div>
                    <div id={id} className="row flex aic anim">
                        <div className="col rfont s15">{id}</div>
                        <div className="col rfont s15">{pay}</div>
                        <div className="col rfont s15">
                            <button className="btn detail rfont s14 cleanbtn cfff" onClick={()=>{_orderDetail(_id)}}>See detail</button> 
                        </div> 
                    </div>  
                </div> 
            </div>

        )
    } 

    const _more = (payMethod, Id, orderitems,discountedprice,packages,_id) => {
        Dialog({
            title: ``,
            content: <More pay={payMethod} id={Id} orderitems={orderitems} discountedprice={discountedprice} packages={packages} _id={_id}/>
        })
    } 

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
      
        <div className="table flex flex-col">
            <div className="hdr flex aic">
                <div className="col rfont s15 b6 c333">Ser#</div>
                <div className="col rfont s15 b6 c333">Date</div>
                <div className="col rfont s15 b6 c333">Order ID</div>
                <div className="col rfont s15 b6 c333">Payment Status</div>
                <div className="col rfont s15 b6 c333">Order Status</div>
                <div className="col rfont s15 b6 c333">Action</div> 
            </div>
            {loading ? 
                emptyBlock.map((item, index)=>(
                    <div key={index} className="row preload flex aic anim">
                        <div className="col"><div className="holder" /></div>
                        <div className="col"><div className="holder" /></div>
                        <div className="col"><div className="holder" /></div>
                        <div className="col"><div className="holder" /></div>
                        <div className="col"><div className="holder" /></div>                      
                        <div className="col"><div className="holder" /></div> 
                    </div> 
                ))
            :
            <React.Fragment>
            {  
             orderitemsprev !== null &&  orderitemsprev.length > 0?
                    orderitemsprev.map(item=>(
                        <div id={item.order_id} className="row flex aic anim">
                            <div className="col rfont s15">{serialNo++}</div>
                            <div className="col rfont s15">{item.createdAt}</div>
                            <div className="col rfont s15">{item.orderId}</div>
                            <div className="col rfont s15">{item.paymentMethod}</div>
                            <div className="col rfont s14"><span className={`status ${item.approval}`}>
                                    {item.deliverystatus === true ? 'delivered' : "Accepted"} 
                                    </span>
                            </div>
                            <div className="col">
                                <button className="btn rfont s14 cleanbtn cfff" onClick={()=>{_orderDetail(item._id)}}>See detail</button> 
                                <button className="btn more rfont s14 cleanbtn cfff" onClick={()=>{_more(item.paymentMethod,item.orderId,item.orderItems,item.discountedprice,item.packages,item._id)}}>More</button> 
                            </div> 
                        </div>
                    ))
                :
                <div className="empty-page orders flex flex-col"> 
                    <Lottie options={_emptyPage_} width={250}/>
                    <div className="meta flex flex-col aic">
                        <div className="txt font s18 b6 c000">Order history is empty.</div>
                        <div className="txt font s15 c000">Currently your previous order history is empty.</div>
                    </div>
                </div>  
            }
            </React.Fragment>
}
        </div>
    );
}

export default OrdersPrevious;