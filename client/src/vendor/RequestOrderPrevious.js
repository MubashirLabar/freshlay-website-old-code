import React,{useState} from 'react';
import {Dialog} from "../core";
import OrderDetail from "../screen/sub/OrderDetail"
import {useDispatch,useSelector} from 'react-redux' 
import moment from 'moment'
import { Link} from 'react-router-dom';

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function RequestOrderPrevious() { 
    
    const [order, setOrder] = useState([
        {date: "Feb 14, 2020", time: "12:20 PM", order_id: "PO-12230", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500", discrp: "Due to Empty Stock"},                                                                 
        {date: "Feb 14, 2020", time: "1:00 PM", order_id: "PO-12230", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000", discrp: ""},                                                                 
        {date: "Feb 13, 2020", time: "4:15 PM", order_id: "PO-12230", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000", discrp: ""},     
        {date: "Feb 13, 2020", time: "6:00 PM", order_id: "PO-12230", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500", discrp: "Due to Empty Stock"},                                                                
    ]);
    
    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    const _orderDetail = (id) => {
        Dialog({
            content: <OrderDetail orderid={id}/>
        })
    } 
    const [deliverySlotItems, setDeliverySlotItems] = useState([  
        // {slot : 1,label: "5:00 AM to 8:00 AM"},
        {slot : 1,label: "9:00 AM to 11:00 AM"},
        {slot : 2,label: "12:00 PM to 2:00 PM"},
        {slot : 3,label: "3:00 PM to 5:00 PM"},
        {slot : 4,label: "6:00 PM to 8:00 PM"},
    ]);
    const {new_order_loaded,vendor_orders} = useSelector(state => state.orderDetails)
    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic">
                <div className="col rfont s15 b6 c333">Order No</div>
                <div className="col rfont s15 b6 c333">Received Date</div>
                <div className="col rfont s15 b6 c333">Received Time</div>
                <div className="col rfont s15 b6 c333">Customer Name</div>
                <div className="col rfont s15 b6 c333">Contact</div>
                <div className="col rfont s15 b6 c333">From</div> 
                <div className="col rfont s15 b6 c333">Type</div>
                <div className="col rfont s15 b6 c333">Amount (Rs.)</div> 
                <div className="col rfont s15 b6 c333">Delivery Slot</div>
                <div className="col rfont s15 b6 c333">Remarks</div> 
            </div> 
            { 
            new_order_loaded ?  
             vendor_orders.length > 0 ?
                    vendor_orders.map((item,index)=>(
                        <div key={index} id={item.Incoice_no} className="row flex aic anim">
                             <div className="col rfont s14">{item.orderId}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format('MMMM Do YYYY')}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format('h:mm:ss a')}</div>
                            <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.name ? item.orderlocation.address.name : '' : ''  : ''}</div>
                            <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.cellphone ? item.orderlocation.address.cellphone : "" : '' : ''}</div>
                            <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.coordinateaddress ? item.orderlocation.address.coordinateaddress : item.orderlocation.address.streetaddress : ''  : ''}</div>
                            <div className="col rfont s14">{item.deliverytype}</div>
                            <div className="col rfont s14">{item.discountedprice}</div> 
                            <div className="col rfont s14">{item.slotno ? item.slotno < 5 ? deliverySlotItems[Number(item.slotno) - 1].label : '' : ''}</div>
                            <div className="col flex aic" > 
                                {
                                    item.deliverystatus ? 
                                    <div className="remarks flex flex-col aic">
                                        <div className="txt rfont s14 b5 green">Order Completed</div>
                                        <Link to={`/order-invoice/${item._id}`} className="btn completed rfont s14 cfff">See Invoice</Link>
                                    </div> 
                                    :
                                    item.approval === 'rejected' ? 
                                        <div className="flex flex-col aic">
                                            <div className="msg rfont s14 b5 red">{item.rejected}</div>
                                            <button onClick={e=>_orderDetail(item._id)} className="delete btn rfont s14 cfff">See detail</button>
                                            
                                        </div>
                                    :
                                    <div>
                                        <div className="remarks flex flex-col aic">
                                            <Link to={`/order-invoice/${item._id}`} className="btn completed rfont s14 cfff">See Invoice</Link>
                                        </div> 
                                        <div className="flex flex-col aic">
                                            <div className="msg rfont s14 b5 green">Order Accepted</div>
                                            <button onClick={e=>_orderDetail(item._id)} className="btn rfont s14 cfff">See detail</button>
                                        </div>
                                    </div>
                                }
                            </div>   
                        </div> 
                    )) 
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Order section is empty!</div>
                    </div>
                </div> 
                :  
                <React.Fragment>
                {
                    emptyOrder.map(e=>(
                        <div className="row placeholder flex aic">
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                            <div className="col holder" />
                        </div>
                    ))
                }
            </React.Fragment>
            }
        </div>
    );
}

export default RequestOrderPrevious;