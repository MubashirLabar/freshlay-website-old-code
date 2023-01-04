import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {Dialog} from "../core";
import moment from 'moment'
import OrderDetail from "../screen/sub/OrderDetail"
import {deletepackages} from '../actions/Admin/adminpackages' 
import axios from 'axios'
import zuz from '../core/Toast'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function VendorPackagesAll(props) { 
     
    const [order, setOrder] = useState([
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:40 PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                 
        {order_id: "PO-12230", date: "Feb 14, 2020", time:"12:45 PM", customer_name:"M Usman", contact: "03080050030", shipping: "Chungi no.9 near goal Bag street no #3", amount: "1000"},                                                                 
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"2:00 PM", customer_name:"Sohail AJmal", contact: "03080050030", shipping: "Shah Rukhny Alam A-block Street #5", amount: "3000"},     
        {order_id: "PO-12230", date: "Feb 13, 2020", time:"5:30PM", customer_name:"Ahmad Bashir", contact: "03080050030", shipping: "Sher Shah Road garden town Mulan", amount: "1500"},                                                                
    ]);
    const {loaded, user } = useSelector((state) => state.authreducer);
    const [allblogs,setallblogs] = useState([])
    const [blogsloaded, setloaded] = useState(false)
    
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])
    
    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const getblogs = async () => {
        try {
            setloaded(false)
            
            const res = await  axios.get(`${process.env.REACT_APP_API_URL}/blog/getblogs`)
            if(res.data.status === 'success'){
             console.log(res)
             setallblogs(res.data.blogs)
             setloaded(true)
            }
           } catch (error) {
            console.log(error)
           if(error.response){
             console.log(error.response);
             {
               zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
             }
           }
           } 
    }

    const deleteblog = async (id) => {
        try {
            setloaded(false)
            
            const res = await  axios.post(`${process.env.REACT_APP_API_URL}/blog/deleteblog`,{id})
            if(res.data.status === 'success'){
                zuz.Toast.show({html:`Blog deleted successfully`, time: 5});
                getblogs()
            }
           } catch (error) {
            console.log(error)
           if(error.response){
             console.log(error.response);
             {
               zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
             }
           }
           } 
    }
    
    useEffect(() => {
        getblogs()
        },[])
    {/* Delete  Order */}
    const dispatch = useDispatch()
    const _delete = (id) => {
        Dialog({
            title: "Confirmation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to delete this Package?</div>
                        </div>
                    </div>,
            confirm:{
                label: "Confirm",
                fnc:async () => {
                  deleteblog(id)
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

    const _orderDetail = (Id,orderitems,totalprice) => {
        Dialog({
            title: `Package ID #${Id}`,
            content: <OrderDetail mypackage={true} item={orderitems} discountedprice={totalprice} package={true}/>
        })
    } 


    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic">
                <div className="col rfont s15 b6 c333">Title</div>
                <div className="col rfont s15 b6 c333">Category</div>
                <div className="col rfont s15 b6 c333">Main Heading</div>
                <div className="col rfont s15 b6 c333">CreatedAt</div>
                <div className="col rfont s15 b6 c333">Manage</div>
            </div>
            {
            blogsloaded ?   
            allblogs.length > 0 ?
            allblogs.map((item,index)=>(
                        <div key={index} id={item.Incoice_no} className="row flex aic anim">
                            <div className="col rfont s14">{item.title}</div>
                            <div className="col rfont s14">{item.category}</div>
                            <div className="col rfont s14">{item.mainheading}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format("MMM Do YYYY")}</div>
                            <div className="col flex aic"> 
                            {
                            //  <button onClick={()=>_orderDetail(item.PKG_id,item.packageitems,(Number(item.price)-Number(item.discount)))} className="btn rfont s14 cfff">Details</button>
                            }
                            {//loaded ? user.rights.packages.del &&
                               <button onClick={()=>_delete(item._id)} className="btn rfont s14 cfff">Delete</button> 
                            //: ''
                            }
                            </div> 
                        </div>
                    ))
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Package section is empty!</div>
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

export default VendorPackagesAll;