import React,{useState} from 'react';
import { Link} from 'react-router-dom';
import {Dialog} from "../core";
 
function VendorOrdersActive(props) { 
    
    const [order, setOrder] = useState([
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:40 PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                 
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:45 PM", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000"},                                                                 
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"2:00 PM", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000"},     
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"5:30PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                
    ]);
    const [rider, setRider] = useState(false);

    {/* Delete  Order */}
    const _delete = () => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content flex flex-col">
                            <div className="rfont s16 c333">Write Reason why you are Rejecting the Request</div>
                            <textarea className="iput rfont s15 c333 anim" />
                        </div>
                    </div>,
            confirm:{
                label: "Confirm",
                fnc: () => {
                    console.log("Confirm button Click")
                }
            },
            cancel:{
                label: "Cancell",
                fnc: () =>{
                    console.log("Cancell Button Click")
                }
            }
        })
    } 

    {/* Assign Rider */}
    const _rider = () => {
        Dialog({
            title: "Select Rider",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="add-scale-form">
                                <div className="item flex flex-col">
                                    <div className="lbl rfont s15 c333">ID</div> 
                                    <input type="text" readOnly defaultValue="121" className="iput rfont s15 c777 anim" />
                                </div> 
                                <div className="item flex flex-col">
                                    <div className="lbl rfont s15 c333">Rider Name<span className="astarick">&#42;</span></div> 
                                    <select className="iput rfont s15 c333 anim">
                                        <option value="Muhammad Aslam">Muhammad Aslam</option> 
                                        <option value="Usman Qadir">Usman Qadir</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>,
            confirm:{
                label: "Save",
                fnc: () => {
                    console.log("Confirm button Click")
                }
            }       
        })
    }

    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic">
                <div className="col rfont s15 b6 c333">Order No</div>
                <div className="col rfont s15 b6 c333">Active Date</div>
                <div className="col rfont s15 b6 c333">Active Time</div>
                <div className="col rfont s15 b6 c333">Customer Name</div>
                <div className="col rfont s15 b6 c333">Contact</div>
                <div className="col rfont s15 b6 c333">Shipping</div> 
                <div className="col rfont s15 b6 c333">Amount (Rs.)</div> 
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            {  
             order.length > 0 ?
                    order.map(item=>(
                        <div id={item.Incoice_no} className="row flex aic anim">
                            <div className="col rfont s14">{item.order_id}</div>
                            <div className="col rfont s14">{item.date}</div>
                            <div className="col rfont s14">{item.time}</div>
                            <div className="col rfont s14">{item.customer_name}</div>
                            <div className="col rfont s14">{item.contact}</div>
                            <div className="col rfont s14">{item.coordinateaddress}</div>
                            <div className="col rfont s14">{item.amount}</div> 
                            <div className="col flex aic"> 
                                {
                                    rider ? <Link to="/order-invoice" className="btn rfont s14 cfff">See Invoice</Link> 
                                        : 
                                            <button onClick={()=>_rider()} className="btn rfont s14 cfff">Assign Rider</button>
                                }
                                <button onClick={()=>_delete()} className="btn rfont s14 cfff">Delete</button>
                            </div> 
                        </div>
                    ))
                : 
                    <div className="empty-orders flex flex-col">
                        <img src={"/images/empty-orderbook.svg"} className="img" />
                        <div className="lbl rfont s16 b6 c777">No Active Orders Yet</div>
                    </div>
            }
        </div>
    );
}

export default VendorOrdersActive;