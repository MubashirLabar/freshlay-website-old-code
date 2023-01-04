import {Dialog} from "../core";
import { Link} from 'react-router-dom';
import OrderDetail from './sub/OrderDetail';
import {getOrders} from '../actions/order'
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import moment from "moment"

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function OrdersActive(props) {
    
    const data = useSelector((state) => state.orderDetails);
    const { loading, orderitemsactive } = data;
    let serialNo = 1;
    const [order, setOrder] = useState([
        {date: "07-01-2021", order_id:"ZN847", pay_status: "On Delivery", order_status: "pandding"},                                 
        {date: "06-01-2021", order_id:"ZN846", pay_status: "On Delivery", order_status: "approved"},                                 
        {date: "05-01-2021", order_id:"ZN845", pay_status: "Jazz Cash", order_status: "approved"},                                 
        {date: "04-01-2021", order_id:"ZN844", pay_status: "On Delivery", order_status: "rejected"},                                 
        {date: "03-01-2021", order_id:"ZN843", pay_status: "On Delivery", order_status: "delivered"},                                 
        {date: "02-01-2021", order_id:"ZN842", pay_status: "Bank", order_status: "delivered"},                                   
    ]); 

    const emptyBlock = [{},{},{},{},{}];

    const _orderDetail = (Id) => {
        Dialog({
            //title: `Oder details #${Id}`,
            content: <OrderDetail orderid={Id}/>
        })
    } 

    const More = ({pay, id, orderitems, discountedprice, packages,_id}) => {
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

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders())
    },[])

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
                <div className="col rfont s15 b5 c333">Ser#</div>
                <div className="col rfont s15 b5 c333">Date</div>
                <div className="col rfont s15 b5 c333">Order ID</div>
                <div className="col rfont s15 b5 c333">Payment Status</div>
                <div className="col rfont s15 b5 c333">Order Status</div>
                <div className="col rfont s15 b5 c333">Action</div> 
            </div> 
            {loading ?   
                emptyBlock.map((item, index) => (
                    <div key={index} className="row preload flex aic anim">
                        <div className="col"><div className="holder"/></div>
                        <div className="col"><div className="holder"/></div>
                        <div className="col"><div className="holder"/></div>
                        <div className="col"><div className="holder"/></div>
                        <div className="col"><div className="holder"/></div>                      
                        <div className="col"><div className="holder"/></div> 
                    </div> 
                ))
            :
            <React.Fragment>
                {
                orderitemsactive !== null &&  orderitemsactive.length > 0 ?
                        orderitemsactive.map(item=>(
                            <div id={item.order_id} className="row flex aic anim">
                                <div className="col rfont s15">{serialNo++}</div>
                                <div className="col rfont s15">{moment(item.createdAt).calendar()}</div>
                                <div className="col rfont s15">{item.orderId}</div>
                                <div className="col rfont s15">{item.paymentMethod}</div>
                                <div className="col rfont s14"><span className={`status ${item.approval}`}>
                                    {item.approval === "pending" ? "pending" :
                                    item.approval === "rejected" ? "rejected" :
                                    item.deliverystatus ? 'delivered' : "Accepted"} 
                                    </span></div>                      
                                <div className="col">  
                                    <button className="btn detail rfont s14 cleanbtn cfff" onClick={()=>{_orderDetail(item._id)}}>See detail</button> 
                                    <button className="btn more rfont s14 cleanbtn cfff" onClick={()=>{_more(item.paymentMethod,item.orderId,item.orderItems,item.discountedprice,item.packages,item._id)}}>More</button> 
                                </div>
                            </div> 
                        )) 
                    :
                    <div className="empty-page orders flex flex-col"> 
                        <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                        <div className="meta flex flex-col aic">
                            <div className="txt font s18 b6 c000">No Active Orders</div>
                            <div className="txt font s15 c000">Looks like you need to do some shopping!</div>
                            <Link to="/" className="button txt font s15 cfff anim">Shopping Now</Link>
                        </div>
                    </div> 
                }
            </React.Fragment>   
            }
        </div> 
      
    );
}

export default OrdersActive;