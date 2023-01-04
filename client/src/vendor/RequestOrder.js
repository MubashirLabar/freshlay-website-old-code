import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Screen
import RequestOrderNew from "./RequestOrderNew";  
import RequestOrderPrevious from "./RequestOrderPrevious";
import {getOrders,liveorders} from '../actions/Admin/adminorder'
import {useDispatch,useSelector} from 'react-redux'
import moment from 'moment' 
function RequestOrder(props){

    let section = props.match.params.section || "new";
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);

    useEffect(()=>{
        section = props.match.params.section;
        document.title = "Order Requests";
        document.body.addEventListener("click", ()=>{
            setShowFrom(false);
            setShowTo(false);
        });
        window.__setNavTab && window.__setNavTab("/orders");  
    },[]);
    const dispatch = useDispatch();
    useEffect(()=>{
             dispatch(getOrders())
         },[])
    const searchorder = () => {
        dispatch(getOrders({from: fromDate, to : toDate}))
    }
    return ( 
        <div className="table-list-p request-order flex flex-col">
            <div className="page-title rfont b5 s24 black">Order Requests</div>
            <div className="head flex aic"> 
                <div className="lef flex aic">
                 <Link to="/orders/new" className={`button btn font s15 b6 anim ${section == "new" && "on"}`}>New</Link>
                 <Link to="/orders/previous" className={`button btn font s15 b6 anim ${section == "previous" && "on"}`}>Previous</Link>
                   {
                   // <Link to="/request-order/new" className={`button btn font s15 b6 anim ${section == "new" && "on"}`}>New</Link>
                   // <Link to="/request-order/previous" className={`button btn font s15 b6 anim ${section == "previous" && "on"}`}>Previous</Link>
                   }
                </div>
               {section == "previous" && <div className="rig flex aic">
                    {/* From Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowFrom(!showFrom);
                        setShowTo(false);
                    }}>
                        <p className="rfont s14 c777">{fromDate ?  moment(fromDate).format('MMMM Do YYYY') : 'From' }</p> 
                        {showFrom && <div className="custom-calander abs" onClick={(e)=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>{
                                    setFromDate(date);
                                    setShowFrom(false);
                                }}
                                value={fromDate}
                            />
                        </div>}
                    </button>
                   
                    {/* To Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowTo(!showTo);
                        setShowFrom(false);
                    }}>
                        <p className="rfont s14 c777">{toDate ?  moment(toDate).format('MMMM Do YYYY') : 'To' }</p> 
                        {showTo && <div className="custom-calander abs" onClick={(e)=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>{
                                    setToDate(date)
                                    setShowTo(false);
                                }}
                                value={toDate} 
                            />
                        </div>}
                    </button>
                    <button onClick={() => searchorder()} className="button search-date rfont s16 anim">Search</button>
                </div> }
            </div> 
            <div className="content flex flex-col">
                {section == "new" && <RequestOrderNew />} 
                {section == "previous" && <RequestOrderPrevious />}   
            </div>  
        </div>
    );
}
 
export default RequestOrder;