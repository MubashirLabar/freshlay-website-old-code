import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {liveorders,getOrders} from '../actions/Admin/adminorder'
import {ReloadProductrequest} from '../actions/Admin/productrequest'
import {addnotifiction,deletenotification} from '../actions/Admin/notifications'
import {reloaddashboarddata} from '../actions/Admin/admindashboard'
import {useDispatch,useSelector} from 'react-redux'
import zuz from "../core/Toast";

//Vendor Screen

import AddProductForm from "./AddProductForm";
import {Dialog} from "../core";
import {generateID} from '../core'
import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    LIVE_PRODUCT_REQUESTS_LIST
} from '../actions/types';
import moment from 'moment'
import store from '../components/store';
import { Provider } from "react-redux";
import {Howl, Howler} from 'howler';
import alaramaudio from '../super_alarm.mp3'
import axios from 'axios'

function Header() {
   
    const [allnotifications, setNotifications] = useState([
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "1m", slug: "/"},              
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "50m", slug: "/"},              
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "1 hour", slug: "/"},              
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "2 hour", slug: "/"},              
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
        {img: "icon-bell", label: "Congrats on your new Purchase", text: "Now see your order how far away from you.", stamp: "3 hour", slug: "/"},                       
    ]);
    const [dropNotic, setDropNotic] = useState(false);
    const {notifications} = useSelector(state => state.notification)
    useEffect(()=>{
        document.body.addEventListener("click", ()=>{
            setDropNotic(false);
        }) 
    },[]) 

    const play  = () => {
        var sound = new Howl({
            src: alaramaudio
          });
        sound.play();
      }

    const _addProduct = ()=>{
        Dialog({
            title: "Add New Product",
            content:
            <Provider store={store}>
            <AddProductForm />
            </Provider>
            , 
        })
    }
    const theuser = useSelector((state) => state.authreducer);
    const { loaded, user} = theuser;
    const {adminSidebar} = useSelector(state => state.generalReducers);

    // handling websocket data
    const dispatch = useDispatch();
    useEffect(()=>{
             dispatch(getOrders())
         },[])
    useEffect(() => {
        const connectwithsocket = () => {
            let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`); 
         ws.addEventListener('message', function (data) {
         const thedata = JSON.parse(JSON.parse(data.data))
         if(thedata.type === 'notification')
         {
         console.log(thedata)
         const {data} = thedata
            if(data.data.notificationtype === "order")
            {
             if( user._id === data.data.userid)
             {
                 
                    console.log('we are inside')
                    play();
                   zuz.Toast.show({html:`New order recieved`, time: 5});
                   dispatch(liveorders())
                   dispatch(reloaddashboarddata()) 
                  dispatch((addnotifiction([{...data}])))
            }   
        }
          // } 
           else if(data.data.notificationtype  === 'productstockrequest')
           {
            if(user.role === 'admin')
             {
            play();
           zuz.Toast.show({html:`New product stock request recieved`, time: 5});
           dispatch(ReloadProductrequest())
           dispatch(reloaddashboarddata()) 
          // const id = generateID(4, 5);
           dispatch((addnotifiction([{...data}])))
             }   
           }
           else if(data.data.notificationtype === 'productrequestresponse')
           {
            if(user._id === data.data.userid)
             {
            play();
            zuz.Toast.show({html:`${data.data.text}`, time: 5});
            dispatch((addnotifiction([{...data}])))
             }   
           }
        }
         }); 
            ws.onclose = function(){
                console.log('disconneted')
                setTimeout(function(){connectwithsocket()}, 5000);
            };
        }
    
        connectwithsocket()
        },[])
     
        const removenotification = async (id) => {
            dispatch({type : REMOVE_NOTIFICATION, payload : id})
            await axios.delete(`${process.env.REACT_APP_API_URL}/user/removenotification/${id}`)
        }
    return (
        <div className="vendor-header">
            <div className="wrap flex aic">
                <div className="left flex aic">
                    <button onClick={(e)=>{
                        e.stopPropagation()
                        dispatch({type: "ADMIN_SIDEBAR", payload: true})}} 
                        className="cleanbtn humburger flex flex-col aic"
                    >
                        <div className={`stick stick-1 close`}></div>
                        <div className={`stick stick-2 close`}></div>
                        <div className={`stick stick-3 close`}></div>
                    </button>
                    
                </div> 
                <div className="right flex aic">
                {user.role === "vendor" || user.role === "seller" ? <button className="notic add cleanbtn icon-plus s22 cfff anim" onClick={()=>_addProduct()}/> : '' }
                    <button className="notic cleanbtn icon-bell s20 c000 black anim rel" onClick={(e)=>
                        {
                            setDropNotic(!dropNotic);
                            e.stopPropagation();
                        }}>
                         {
                            notifications.length <= 0 ? '' 
                            :
                            <div className="qty rfont s13 cfff abs flex aic">{notifications.length}</div>
                         }
                        {dropNotic && 
                            <div className="notic-blk abs flex flex-col">
                                { 
                                    notifications.length > 0 ?
                                    <div className="items flex flex-col">
                                        {
                                            
                                            notifications.map(item=>(
                                                <button onClick={() => removenotification(item._id)} className="cleanbtn item flex aic">
                                                <div className="img flex aic">
                                                    <img src={`/images/${item.data.img}.svg`} />
                                                    </div>  
                                                    <div className="meta flex flex-col">
                                                        <div className="msg"><span className="rfont s15 b5 c000">{item.data.label}</span>&nbsp;<span className="font s14 c333">{item.data.text}</span></div>  
                                                        <div className="stamp rfont s14 c777">{moment(item.data.stamp).startOf('minute').fromNow()}</div>
                                                    </div>                                     
                                                    {/*<button onClick={() => removenotification(item._id)}>ok</button>*/} 
                                                </button>                  
                                            ))
                                        }
                                    </div>
                                    :
                                    <div className="empty flex flex-col aic" onClick={e=>{e.stopPropagation()}}>
                                        <img src="/images/icon_notifications.webp" className="img"/>
                                        <div className="lbl font s18 b6 black">No notifications (Yet!)</div> 
                                        <div className="ms rfont s13 c333">Purchase something and start to seeing some activity here</div>               
                                    </div> 
                                }
                            </div> 
                        }
                    </button>
                    <div className="meta flex aic">
                        <div className="dp">
                            <div className="img" style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${user.media})`}} />
                        </div>
                        <div className="nam rfont s16 b5 c333">{user.fullname}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;