import React,{useState,useEffect} from 'react';
import {updateorderaddress,loadaddress} from '../actions/cart'
import {useSelector,useDispatch} from 'react-redux'
import {Dialog} from "../core";
import ShippingAddressForm from "./sub/ShippingAddressForm";
import store from '../components/store';
import { Provider } from "react-redux";
import {updateaddressbook } from "../actions/profile";
import axios from 'axios'

function ShippingAddress(props) {
    let data = useSelector(state => state.cartReducer);
    const { loaded, user,isAuthenticated } = useSelector((state) => state.authreducer);
    const {orderaddress} = data;
    const {_id,name, streetaddress, address2, city, state, postalcode, cellphone,addresscoordinates,coordinateaddress} = props.data;
    const [adr, setAdr] = useState(false);  
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(loadaddress())
    },[])
    const updateaddress = async (id) => {
           //console.log('called')
           const object = {
             address : {
               _id,
               name,
               streetaddress, address2, city, state, postalcode, cellphone,addresscoordinates,coordinateaddress
             }
           }
          dispatch(updateorderaddress(object))
          // check user info
          if(!user) {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/finduserbynumber`,{cellphone});
            // console.log(data)
            if(data.status === 'success') {
              if(data.userfounded){
                props.setordercount(data.ordercount)
              }
              else {
                props.setordercount(0)
              }
            }
          }
    }
     const editaddressForm = (item,edit) => {
      Dialog({
        title: "Edit Address",
        content: <Provider store={store}>
                    <ShippingAddressForm item={item} edit={edit} setnonloginedaddresses={props.setnonloginedaddresses}/>
                 </Provider>
      });
    };
    const deleteaddressForm = (id) => {
        if(user)
        {
          if(orderaddress)
             {
              if(orderaddress.address._id == id)
              {
               dispatch({type : 'UPDATE_ORDER_ADDRESS',payload : null})
              }
             }
            const  thedata = {
                 deleteid : id
               }
            dispatch(updateaddressbook(user,thedata))
        }
        else {
         const savedaddress = JSON.parse(localStorage.getItem("saveaddressnonlogined"))
         if(savedaddress)
         {
             const modifyaddresses = savedaddress.filter((item) => item._id != id)
             if(orderaddress)
             {
              if(orderaddress.address._id == id)
              {
               dispatch({type : 'UPDATE_ORDER_ADDRESS',payload : null})
              }
             }
             props.setnonloginedaddresses(modifyaddresses)
             localStorage.setItem("saveaddressnonlogined",JSON.stringify(modifyaddresses))
         }
        }
    }
     
    return (
      <div className='blks'>
       {
        
        <label className="block flex aic">
        
            <button className={`btn cleanbtn flex aic ${orderaddress && !orderaddress.addressincoords ?
              orderaddress.address._id == _id ? 'on' : '' :  ''}`}
                onClick={()=>{
                  setAdr(!adr)
                  updateaddress(_id)
                }} >
                {orderaddress && !orderaddress.addressincoords ?
                orderaddress.address._id == _id && <div className="circle" /> : ''} 
            </button> 
                <div className="adrs flex flex-col">
                    <div className="txt fontl s16 b6 c333">{name}</div>
                    <div className="txt fontl s15 c333">{streetaddress}</div>
                    {/*
                    <div className="txt fontl s15 c333"><span>{city}</span>,&nbsp;<span>{state}</span>&nbsp;<span>{postalcode}</span></div>   
                    */ }
                  
                    <div className="txt fontl s15 c333">{cellphone}</div>
                    <div className="txt fontl s15 c333">{coordinateaddress}</div>
                </div>  
              
          <div className="actions flex aic anim">
            <button onClick={() =>editaddressForm(props.data,{edit:true})} className="cleanbtn item icon-edit flex aic fontr s22 c333"/>
            <button onClick={() =>deleteaddressForm(_id)} className="cleanbtn item flex aic fontr s26 c333">&times;</button>
          </div>
        </label>  
        }
      </div>
    );
}

export default ShippingAddress;