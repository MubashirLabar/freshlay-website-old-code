import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment'
import {useDispatch,useSelector} from 'react-redux'
import {getallOrders} from '../actions/Admin/adminorder'
import axios from "axios";
import zuz from "../core/Toast";

function OrdersReport(props) {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    const [category, setCategory] = useState("All Categories"); 
    const [dropCata, setDropCata] = useState(false);
    const [categoriesItems, setCategoriesItems] = useState([  
        {label: "All Categories"},
        {label: "Potato"},
        {label: "Onion"},
        {label: "Tomato"},
    ]);

    const [deliverySlot, setDeliverySlot] = useState("9:00 AM to 11:00 AM"); 
    const [dropDeliverySlot, setDropDeliverySlot] = useState(false);
    const [slotno,setslotno] = useState(1)
    const [loading,setloading] = useState(false);
    
    const [ordersreport,setorderreport]  = useState({})
    const [deliverySlotItems, setDeliverySlotItems] = useState([  
        {slot : 1,label: "9:00 AM to 11:00 AM"},
        {slot : 2,label: "12:00 PM to 2:00 PM"},
        {slot : 3,label: "3:00 PM to 5:00 PM"},
        {slot : 4,label: "6:00 PM to 8:00 PM"},
    ]);
    const [searchslot,setsearchslot] = useState('') 

    const [records, setRecords] = useState([
        {date: '12/08/2021', pdtName: 'Potato', slot: '9:00 AM to 12:00 AM', qty: '10 kg'},
        {date: '12/08/2021', pdtName: 'Manog', slot: '9:00 AM to 12:00 AM', qty: '30 kg'},
        {date: '12/08/2021', pdtName: 'Apple', slot: '9:00 AM to 12:00 AM', qty: '5 kg'},
        {date: '12/08/2021', pdtName: 'Onion', slot: '9:00 AM to 12:00 AM', qty: '3 kg'},
        {date: '12/08/2021', pdtName: 'Tomato', slot: '9:00 AM to 12:00 AM', qty: '1 kg'},
    ])

    const dispatch = useDispatch()

    useEffect(() => {
        window.__setNavTab && window.__setNavTab("/allorders"); 
        document.body.addEventListener('click', () => {
            setShowFrom(false); 
            setShowTo(false); 
            setDropDeliverySlot(false)
            setDropCata(false)
        })
    },[])

    const getreports = async () => {
        try {
            
            // console.log(toDate)
            //console.log(d)
            const { data } = await axios.post(
              `${process.env.REACT_APP_API_URL}/order/getslotreport`,{
                slot : slotno,
                from: fromDate, to : toDate
              }
            );
            //console.log(data)
            setsearchslot(deliverySlotItems[slotno - 1])
            setorderreport((data.orderreport))
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
    // console.log(ordersreport)
    // console.log(Object.keys(ordersreport))
    // for (const [key, value] of Object.entries(ordersreport)) {
    //     console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
    //   }
    return (
        <div className="table-list-p order-report flex flex-col">
            <div className="page-title rfont b5 s24 black">Order Report</div>
            <div className="head flex aic"> 
                <div className="rig flex aic">
                    {/* Sort BY Categories 
                    <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                        e.stopPropagation();
                        setDropCata(!dropCata);
                        setShowFrom(false); 
                        setShowTo(false); 
                        setDropSortProducts(false)
                    }}> 
                        { 
                            categoriesItems.map((item,index)=>(
                                category == item.label && <div key={index} className="flex aic">          
                                    <div className="txt rfont s16 black">{item.label}</div>
                                    <div className={`arrow s18 c777 anim ${dropCata == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                </div>
                            ))
                        }
                        {dropCata && <div className="options sort flex flex-col abs">
                                {
                                    categoriesItems.map((item,index)=>(
                                        <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
                                            setDropCata(!dropCata);
                                            setCategory(item.label);
                                        }}>         
                                            <div className="txt rfont s16 black">{item.label}</div> 
                                        </button> 
                                    ))
                                } 
                            </div> 
                        }
                    </button>*/}

                    {/* Sort By Product Slot*/}
                    <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                        e.stopPropagation();
                        setDropDeliverySlot(!dropDeliverySlot);
                        setShowFrom(false); 
                        setShowTo(false); 
                        setDropCata(false)
                    }}> 
                        { 
                            deliverySlotItems.map((item,index)=>(
                                deliverySlot == item.label && <div key={index} className="flex aic">          
                                    <div className="txt rfont s16 black">{item.label}</div>
                                    <div className={`arrow s18 c777 anim ${dropDeliverySlot == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                </div>
                            )) 
                        }    

                        {dropDeliverySlot && <div className="options sort flex flex-col abs">
                                {
                                    deliverySlotItems.map((item,index)=>(
                                        <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
                                            setDropDeliverySlot(!dropDeliverySlot);
                                            setDeliverySlot(item.label);
                                            setslotno(item.slot)
                                        }}>         
                                            <div className="txt rfont s16 black">{item.label}</div> 
                                        </button>  
                                    ))
                                } 
                            </div> 
                        }
                    </button>

                    {/* From Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowFrom(!showFrom);
                        setShowTo(false);
                        setDropDeliverySlot(false)
                    }}>
                        <p className="rfont s14 c000">{fromDate ?  moment(fromDate).format('MMMM Do YYYY') : 'From' }</p>  
                        {
                            showFrom && <div className="custom-calander abs" onClick={(e)=>e.stopPropagation()}>
                                <Calendar
                                    onChange={(date)=>{
                                        setFromDate(date)
                                        setShowFrom(false);
                                    }}
                                    value={fromDate} 
                                />
                            </div>
                        }
                    </button>
             
                    {/* To Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowTo(!showTo);
                        setShowFrom(false);
                        setDropDeliverySlot(false)
                        setDropCata(false)
                    }}>
                        <p className="rfont s14 c000">{toDate ?  moment(toDate).format('MMMM Do YYYY') : 'To' }</p> 
                        {showTo && <div className="custom-calander abs" onClick={e=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=> {
                                    setToDate(date)
                                    setShowTo(false)
                                }} 
                                value={toDate} 
                            />
                        </div>}
                    </button>
                    
                    <button onClick={() => getreports()} className="button search-date rfont s16 anim">Search</button>
                </div>
            </div>
            
            {/* List */}
            <div className="content flex flex-col">
                <div className="table flex flex-col">
                    <div className="hdr flex aic">
                        <div className="col rfont s15 b6 c333">No.</div>
                        {/* <div className="col rfont s15 b6 c333">Date</div> */}
                        <div className="col rfont s15 b6 c333">Product Name</div>
                        <div className="col rfont s15 b6 c333">Qty/Kg</div>
                        <div className="col rfont s15 b6 c333">Delivery Slot</div>
                    </div>
                     
                    {Object.entries(ordersreport).length > 0 ?
                        Object.entries(ordersreport).map((item, index) => {
                            return <div id={item.Incoice_no} className="row flex aic anim">
                                <div className="col rfont s14">{index + 1}</div>
                                {/* <div className="col rfont s14">{item.date}</div> */}
                                {item.map((theitem,i) => 
                                i == 0 ? <div className="col rfont s14">{theitem}</div> :
                                <div className="col rfont s14">{theitem[Object.keys(theitem)[0]]} {Object.keys(theitem)[0]}</div>
                                  )}
                                <div className="col rfont s14">{searchslot.label}</div>
                            </div>
                        })
                        : 
                        <div className="empty-orders flex flex-col">
                            <div className="lbl rfont s16 b6 c333">Opps! No Result Found.</div>
                        </div>
                    }
                </div>
            </div>  
        </div>
    );
}

export default OrdersReport;