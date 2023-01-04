import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Dialog} from "../core";
import moment from 'moment'
import OrderDetail from "../screen/sub/OrderDetail"
import axios from 'axios'
import zuz from '../core/Toast'
import setheadertoken from "../utils/setheadertoken";
import {deletepackages} from '../actions/Admin/adminpackages' 

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"
 
function VendorMyPackages(props) { 
    
    const [mypackages,setmypackages]  = useState([])
    const [loaded,setloaded] = useState(false)
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authreducer);
    const getpackages = async () => {
        try {
            if (localStorage.myjwttoken) {
                setheadertoken(localStorage.myjwttoken);
              }
            const res = await  axios.get(`${process.env.REACT_APP_API_URL}/package/getvendorpackages`)
            if(res.data.status === 'success'){
             console.log(res)
             setmypackages(res.data.vendorpackages)
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
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        getpackages()
        },[])

    {/* Delete  Order */}
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
                  const res =await dispatch(deletepackages(id))
                  if(res)
                  {
                      getpackages()
                  }
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
                <div className="col rfont s15 b6 c333">Packages Id</div>
                <div className="col rfont s15 b6 c333">Created date</div>
                <div className="col rfont s15 b6 c333">Created time</div>
                <div className="col rfont s15 b6 c333">Price (Rs.)</div>
                <div className="col rfont s15 b6 c333">Discount (Rs.)</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            {
            loaded ?  
             mypackages.length > 0 ?
             mypackages.map(item=>(
                        <div id={item.Incoice_no} className="row flex aic anim">
                            <div className="col rfont s14">{item.PKG_id}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format("MMM Do YYYY")}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format("h:mm:ss a")}</div>
                            <div className="col rfont s14">{item.price}</div>
                            <div className="col rfont s14">{item.discount}</div>
                            <div className="col flex aic"> 
                                <button onClick={()=>_orderDetail(item.PKG_id,item.packageitems,(Number(item.price)-Number(item.discount)))} className="btn rfont s14 cfff">Details</button>
                            {user.rights.packages.del &&  <button onClick={()=>_delete(item._id)} className="btn rfont s14 cfff">Delete</button> }
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
                        </div>
                    ))
                }
                </React.Fragment>
            }
        </div>
    );
}

export default VendorMyPackages;