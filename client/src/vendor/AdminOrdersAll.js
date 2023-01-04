import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import {Dialog} from "../core";
import OrderDetail from "../screen/sub/OrderDetail"
import {useDispatch,useSelector} from 'react-redux'
// Screen
//import VendorOrdersActive from "./VendorOrdersActive";  
//import VendorOrdersPrevious from "./VendorOrdersPrevious";
import {getallOrders} from '../actions/Admin/adminorder'
import moment from 'moment'
import axios from 'axios'
import zuz from '../core/Toast'  

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function VendorOrders(props){
  
    let section = props.match.params.section || "active";
    const [cata, setCata] = useState("All"); 
    const [dropCata, setDropCata] = useState(false);
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/"},
        {label: "Vegetables", icon: "icon-eye", slug:"/"},
        {label: "Fruits", icon: "icon-eye", slug:"/"}, 
        {label: "Meats", icon: "icon-eye", slug:"/"},
    ]); 
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [order, setOrder] = useState([
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:40 PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                 
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:45 PM", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000"},                                                                 
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"2:00 PM", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000"},     
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"5:30PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                
    ]);
    const [deliverySlotItems, setDeliverySlotItems] = useState([  
        // {slot : 1,label: "5:00 AM to 8:00 AM"},
        {slot : 1,label: "9:00 AM to 11:00 AM"},
        {slot : 2,label: "12:00 PM to 2:00 PM"},
        {slot : 3,label: "3:00 PM to 5:00 PM"},
        {slot : 4,label: "6:00 PM to 8:00 PM"},
    ]);
    
    // funtion, not a component
    const _orderDetail = (id) => {
        // dispatch({type : 'Orderitems', payload : orderitems})
        // const updateitemsqty = (id,qty) => {
        //     console.log(id,qty)
        //   const moditems = theitems.map((item) => {
        //       console.log(item._id === id)
        //       if(item._id === id) {
        //           console.log({...item,qty : qty})
        //           return {...item,qty : qty}
        //       }
        //       else {
        //           return item
        //       }
        //   })
        // //   console.log(moditems)
        // dispatch({type : 'Orderitems', payload : moditems})
        //}
        Dialog({
            //title: `Detail Order #${Id}`,
            content: <OrderDetail orderid={id}/>
        })
    } 

    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(()=>{
        section = props.match.params.section;
        document.title = "My Orders";
        window.__setNavTab && window.__setNavTab("/allorders"); 
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setShowFrom(false); 
            setShowTo(false);
        }); 
    },[]);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getallOrders())
    },[])

    const deleteanorder = async (id) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/order/deleteanorder/${id}`
              );    
              console.log(data)
              dispatch(getallOrders())
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                  zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
                } else {
                  zuz.Toast.show({ html: `${error.response.statusText}`, time: 10 });
                }
              }
        }
        
    }

    {/* Delete  Role */}
    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to Delete this Role?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Delete",
                fnc: () => {
                    console.log("Confirm button Click")
                    deleteanorder(id)
                }
            },
            cancel:{
                label: "Cancel",
                fnc: () =>{
                    console.log("Cancell Button Click")
                }
            }        
        })
    }

    const {loaded,orders} = useSelector(state => state.orderlist)
    const filterdata = () => {
        dispatch(getallOrders({from: fromDate, to : toDate}))
    }

    const Orderdetails = ({item}) => {
        //console.log('item',item)
        const [theitems,settheitems]  = useState(item.orderItems)
        const [gitems2,setgitems2] = useState(2);
        
        return (
        <div id={item.Incoice_no} className="row flex aic anim">
        <div className="col rfont s14">{item.orderId}</div>
        <div className="col rfont s14">{moment(item.createdAt).format("MMM Do YYYY")}</div>
        <div className="col rfont s14">{moment(item.createdAt).format("h:mm:ss a")}</div>
        <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.name ? item.orderlocation.address.name : '' : ''  : ''}</div>
        <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.cellphone ? item.orderlocation.address.cellphone : "" : '' : ''}</div>
        <div className="col rfont s14">{item.orderlocation ? item.orderlocation.address ? item.orderlocation.address.streetaddress ? item.orderlocation.address.streetaddress : item.orderlocation.address.coordinateaddress : ''  : ''}</div>
        <div className="col rfont s14">{item.deliverytype}</div>
        <div className="col rfont s14">{item.paymentMethod}</div>
        <div className="col rfont s14">{item.discountedprice}</div>
        <div className="col rfont s14">{item.coupinname}</div> 
        <div className="col rfont s14">{item.slotno ? item.slotno < 5 ? deliverySlotItems[Number(item.slotno) - 1].label : '' : ''}</div>
        <div className="col flex aic" >
            {/* <button onClick={e=>_orderDetail(item.orderId,item.orderItems,item.discountedprice,item.packages,modifyitems,theitems)} className="btn rfont s14 cfff">See detail</button> */}
            <button onClick={e=>_orderDetail(item._id)} className="btn rfont s14 cfff">Detail</button>
            <button onClick={e=>_delete(item._id)} className="btn rfont s14 cfff">Delete</button>
            <div className="remarks flex flex-col aic">
                <Link to={`/order-invoice/${item._id}`} className="btn completed rfont s14 cfff">Invoice</Link>
            </div> 
        </div>   
    
        </div>
      )
    }
   
    return (
        <div className="table-list-p vendor-orders flex flex-col">
            <div className="page-title rfont b5 s24 black">All Orders</div>
            <div className="head flex aic"> 
                <div className="lef flex aic"></div>
                <div className="rig flex aic">
                   
                    {/* From Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowFrom(!showFrom);
                        setShowTo(false);
                        setDropCata(false);
                    }}>
                        <p className="rfont s14 c777">{fromDate ?  moment(fromDate).format('MMMM Do YYYY') : 'From' }</p>  
                        {showFrom && <div className="custom-calander abs" onClick={(e)=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>setFromDate(date)}
                                value={fromDate} 
                            />
                        </div>}
                    </button>
             
                    {/* To Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowTo(!showTo);
                        setShowFrom(false);
                        setDropCata(false);
                    }}>
                        <p className="rfont s14 c777">{toDate ?  moment(toDate).format('MMMM Do YYYY') : 'To' }</p> 
                        {showTo && <div className="custom-calander abs" onClick={e=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>setToDate(date)}
                                value={toDate} 
                            />
                        </div>}
                    </button>
                    <button onClick={() => filterdata()} className="button search-date rfont s16 anim">Search</button>
                </div>
            </div>
            <div className="content flex flex-col">
                <div className="table flex flex-col">
                    <div className="hdr flex aic">
                    <div className="col rfont s15 b6 c333">Order No</div>
                    <div className="col rfont s15 b6 c333">Active Date</div>
                    <div className="col rfont s15 b6 c333">Active Time</div>
                    <div className="col rfont s15 b6 c333">Customer Name</div>
                    <div className="col rfont s15 b6 c333">Contact</div>
                    <div className="col rfont s15 b6 c333">Shipping</div>
                    <div className="col rfont s15 b6 c333">Delivery type</div> 
                    <div className="col rfont s15 b6 c333">Payment method</div> 
                    <div className="col rfont s15 b6 c333">Amount (Rs.)</div>
                    <div className="col rfont s15 b6 c333">Coupon Name</div>
                    <div className="col rfont s15 b6 c333">Delivery Slot</div> 
                    <div className="col rfont s15 b6 c333">Actions</div> 
                </div>
                    { 
                    loaded ?  
                    orders.length > 0 ?
                            orders.map((item,index)=>(
                                <Orderdetails item={item} key={index}/>
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
                                </div>
                            ))
                        }
                        </React.Fragment>
                    }
                </div>
                {/*section == "active" && <VendorOrdersActive /> */} 
                {/*section == "previous" && <VendorOrdersPrevious /> */}   
            </div>  
        </div>
    );
}
 
export default VendorOrders;