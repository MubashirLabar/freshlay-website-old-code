import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

// Screen
import VendorOrdersActive from "./VendorOrdersActive";  
import VendorOrdersPrevious from "./VendorOrdersPrevious";

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
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    useEffect(()=>{
        section = props.match.params.section;
        document.title = "My Orders";
        window.__setNavTab && window.__setNavTab("/order-response"); 
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setShowFrom(false);
            setShowTo(false);
        }); 
    },[]);
 
    return (
        <div className="table-list-p vendor-orders flex flex-col">
            <div className="page-title rfont b5 s24 black">My Orders</div>
            <div className="head flex aic"> 
            {
                <div className="lef flex aic">
                   <Link to="/order-response/active" className={`button btn rfont s15 b5 anim ${section == "active" && "on"}`}>Active</Link>
                   <Link to="/order-response/previous" className={`button btn rfont s15 b5 anim ${section == "previous" && "on"}`}>Previous</Link>
                 
                 </div>
             }
                <div className="rig flex aic">
                    {/* Catagory Selecter Block */}
                    <button className="cleanbtn cum-select vendor flex aic rel" onClick={(e)=>{
                        e.stopPropagation();
                        setDropCata(!dropCata); 
                        setShowFrom(false);
                        setShowTo(false);
                    }}>
                        { 
                            catagory.map(item=>(
                                cata == item.label && <div className="feild flex aic">
                                    <div className={`ico font s17 flex aic cfff  ${item.icon} ${item.label}`} />           
                                    <div className="txt rfont s16 black">{item.label}</div>
                                    <div className={`arrow s18 c777 anim ${dropCata == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                </div>
                            ))
                        }
                        {dropCata && <div className="options flex flex-col abs">
                                {
                                    catagory.map(item=>(
                                        <button className="cleanbtn item flex aic anim" onClick={()=>{
                                            setDropCata(!dropCata);
                                            setCata(item.label);
                                        }}>
                                            <div className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}/>            
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
                        setDropCata(false);
                    }}>
                        <p className="rfont s14 c777">From</p>  
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
                        <p className="rfont s14 c777">To</p> 
                        {showTo && <div className="custom-calander abs" onClick={e=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>setToDate(date)}
                                value={toDate} 
                            />
                        </div>}
                    </button>
                    <button className="button search-date rfont s16 anim">Search</button>
                </div>
            </div>
            <div className="content flex flex-col">
                {section == "active" && <VendorOrdersActive /> } 
                {section == "previous" && <VendorOrdersPrevious />}   
            </div>  
        </div>
    );
}
 
export default VendorOrders;