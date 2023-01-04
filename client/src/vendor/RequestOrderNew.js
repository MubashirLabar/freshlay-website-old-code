import React,{useEffect, useState} from 'react';
import {Dialog} from "../core";
import OrderDetail from "../screen/sub/OrderDetail"
import {getvendorriders} from '../actions/Admin/adminorder'
import {useDispatch,useSelector} from 'react-redux' 
import zuz from '../core/Toast'
import moment from 'moment'
import store from '../components/store';
import { Provider } from "react-redux";
import {respondtoorder} from '../actions/Admin/adminorder'
import {getauser} from '../actions/Admin/users'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function RequestOrderNew() { 
    
   
    const [order, setOrder] = useState([
        {date: "Feb 14, 2020", time: "12:20 PM", order_id: "PO-12230", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                 
        {date: "Feb 14, 2020", time: "1:00 PM", order_id: "PO-12230", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000"},                                                                 
        {date: "Feb 13, 2020", time: "4:15 PM", order_id: "PO-12230", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000"},     
        {date: "Feb 13, 2020", time: "6:00 PM", order_id: "PO-12230", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                
    ]);

    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const _orderDetail = (id) => {
        Dialog({
            content: <OrderDetail orderid={id}/>
        })
    } 
    const {new_order_loaded,new_orders} = useSelector(state => state.orderDetails)
    console.log(new_orders)
    const dispatch  = useDispatch()
    const responseorder  = (data) => {
        //console.log(data)
         dispatch(respondtoorder(data))
    }
    const theuser = useSelector((state) => state.authreducer);
    const { user } = theuser;
    useEffect(() => {
    dispatch(getvendorriders(user._id))
    },[])
       

    const Assignrider = (props) => {
       
        const {vendorriders} = useSelector(state => state.dashboarddata)
        const [riderid,setriderid] = useState('select rider')
        const [ID,SETID] = useState("")
        useEffect(() => {
            const getrider =async () => {
            if(riderid=== 'select rider')
            {
                return
            }
            else
            {
            const duser = await dispatch(getauser(riderid))
            console.log(duser)
            if(duser)
                {
                SETID(duser.user_id)
                }
            }
        }
        getrider()
        },[riderid])
        //console.log('vendorriders',vendorriders)
        const assigntherider = () => {
         if(riderid === 'select rider')
         {
            zuz.Toast.show({html:`Please select rider`, time: 5}); 
         } 
         else 
         {
             responseorder({id:props.orderid,responded : true,approval : 'accepted',riderId: riderid})
         }
        }
        return (
            <React.Fragment>
            <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="add-scale-form">
                                <div className="item flex flex-col">
                                    <div className="lbl rfont s15 c333">ID</div> 
                                    <input type="text" readOnly value={ID} className="iput rfont s15 c777 anim" />
                                </div> 
                                <div className="item flex flex-col">
                                    <div className="lbl rfont s15 c333">Rider Name<span className="astarick">&#42;</span></div> 
                                        <select onChange={(e)=> {setriderid(e.target.value)}} className="iput rfont s15 c333 anim">
                                        {
                                        <React.Fragment>
                                        {riderid === "select rider" && <option value="select rider">Select rider</option> }
                                        {vendorriders.map((item) => <option value={item._id}>{item.fullname}</option> ) }
                                        </React.Fragment>  
                                        }
                                        </select>
                                </div>
                            </div> 
                        </div>
                        <div className="pop-ftr flex aic">
                     <button className="button btn rfont s15 b5 cfff" 
                     onClick={()=>{
                        assigntherider()
                        dispatch({type:"HIDE_Dialogbox", payload: true})
                     }}>
                     Confirm
                 </button>
                 </div> 
            </div> 
                    
                 </React.Fragment>
        )
    }
    const _rider = (id) => {
        Dialog({
            title: "Select Rider",
            content: 
            <Provider store={store}>
                <Assignrider orderid={id}/>  
            </Provider>    
        })
    }

   // code has been copied to sidebar
    
    const _accept = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to accept this order?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Confirm",
                fnc: () => {
                    //responseorder({id,responded : true,approval : 'accepted'})
                    //console.log("Confirm button Click")
                    _rider(id)
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

    const RejectOrder = (props) => {
        const [reason,setreason] = useState('')
        const cancelrequest = () => {
            responseorder({id: props.id,rejected:reason,approval:'rejected',responded: true})
        }
        return (
            <div className="confirm-blk reject flex flex-col s15 c333">
            <div className="content flex flex-col">
                <div className="rfont s16 c333">Write Reason why you are Rejecting the Request</div>
                <textarea value={reason} onChange={(e) => setreason(e.target.value)}  className="iput rfont s15 c333 anim" />
                <div className="pop-ftr flex aic">
                    <button className="button btn rfont s15 b5 cfff" onClick={()=>
                        {
                            // cancelrequest()
                            dispatch({type: "HIDE_Dialogbox", payload: true})
                        }}>
                        cancel
                    </button>
                    <button className="button btn rfont s15 b5 cfff" 
                        onClick={()=>{
                            cancelrequest()
                            //console.log('confirm click')
                            dispatch({type: "HIDE_Dialogbox", payload: true})
                        }}>
                        Confirm
                    </button>
                        
                </div>
            </div>
        </div> 
        )
    }
    const [deliverySlotItems, setDeliverySlotItems] = useState([  
        // {slot : 1,label: "5:00 AM to 8:00 AM"},
        {slot : 1,label: "9:00 AM to 11:00 AM"},
        {slot : 2,label: "12:00 PM to 2:00 PM"},
        {slot : 3,label: "3:00 PM to 5:00 PM"},
        {slot : 4,label: "6:00 PM to 8:00 PM"},
    ]);

    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <RejectOrder id={id} />
        })
    }
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
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div> 
            {  new_order_loaded ? 
             new_orders.length > 0?
                    new_orders.map((item,index)=>(
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
                                <button onClick={e=>_orderDetail(item._id)} className="btn rfont s14 cfff">See detail</button>
                                <button onClick={e=>_accept(item._id)} className="btn rfont s14 cfff">Accept</button>
                                <button onClick={e=>_delete(item._id)} className="btn rfont s14 cfff">Reject</button> 
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

export default RequestOrderNew;