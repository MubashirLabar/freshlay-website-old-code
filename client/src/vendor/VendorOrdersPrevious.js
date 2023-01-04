import React,{useState} from 'react';
import { Link} from 'react-router-dom';

function VendorOrdersPrevious(props) { 
    
    const [order, setOrder] = useState([
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:40 PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500", discrp: ""},                                                                 
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:45 PM", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000", discrp: ""},                                                                 
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"2:00 PM", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000", discrp: "Client not satisfied to the Product"},     
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"5:30PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500", discrp: ""},                                                                
    ]);

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
                <div className="col rfont s15 b6 c333">Remarks</div> 
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
                            <div className="col rfont s14">{item.shipping}</div>
                            <div className="col rfont s14">{item.amount}</div> 
                            <div className="col" >
                                {
                                    item.discrp ?
                                    <div className="remarks flex flex-col">
                                        <div className="txt rfont s14 b5 red">Order Cancelled</div>
                                        <div className="rfont s13 c777">{item.discrp}</div>
                                    </div>
                                    :
                                    <div className="remarks flex flex-col aic">
                                        <div className="txt rfont s14 b5 green">Order Completed</div>
                                        <Link to="/order-invoice" className="btn completed rfont s14 cfff">See Invoice</Link>
                                    </div>
                                }
                               
                            </div> 
                        </div>
                    ))
                : 
                    <div className="empty-orders flex flex-col">
                        <img src={"/images/empty-orderbook.svg"} className="img" />
                        <div className="lbl rfont s16 b6 c777">Previous Record Book is Empty</div>
                    </div>
            }
        </div>
    );
}

export default VendorOrdersPrevious;