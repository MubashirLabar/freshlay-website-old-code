import React,{useEffect} from 'react';
import {Link,Redirect,useHistory} from 'react-router-dom'; 
import {useDispatch,useSelector} from 'react-redux'
import {CART_UPDATE_PRICE,LOAD_CART_ITEM} from '../actions/types'
import zuz from "../core/Toast";
import Lottie from 'react-lottie';
import * as orderPlaced from "../lottie/orderPlaced.json"
import {Dialog} from "../core";
import { useState } from 'react';
import {login} from '../actions/auth'; 

function CheckoutFinish() {
  const history = useHistory()
  const theuser = useSelector((state) => state.authreducer);
  const { loaded, user } = theuser;
  const [currentphone,setcurrentphone] = useState('')
  const [loading,setloading] = useState(false)
    useEffect(()=>{
        document.title = "Order Finish";
    })
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: CART_UPDATE_PRICE,
            payload: {
              ordertotal : 0,
              subtotal : 0,
              savings  : 0},
          });
          dispatch({
            type: LOAD_CART_ITEM,
            payload : []
          });
          localStorage.removeItem("cartItems");
          setcurrentphone(localStorage.getItem("currentorderphone"))
    },[]) 

    const _timerClock_ = {
        loop: true,
        autoplay: true, 
        animationData: orderPlaced.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      
  /*  const RetryLogin = () => {
      const [pass,setpass] = useState('')
      const _login = async () =>{ 

          setloading(true)
          const res = dispatch(login(currentphone ,pass,history,{checkout : true}))
          if(res === false)
          {
             setloading(false)
          }
    }
      return  <React.Fragment> 
            {loading && 
                <div className="cover flex aic abs fill">
                  <img src={`/images/loader.svg`} className="img" />
                </div>}
            <div className="verify-order flex flex-col s15 c333">
              <div className="content flex flex-col">
                  <div className='msg rfont s15 c333'>Please check your phone a password has been sent to<span className='b6'>0{currentphone}</span></div>
                  <input 
                  onChange={(e) => setpass(e.target.value)}
                  value={pass}
                  type="password" placeholder="password" className='cleanbtn iput font s15 c333 anim'/>
                  <button
                  onClick={() => _login()}
                  className="button rfont s15 cfff">Login</button>
              </div>
            </div>
             </React.Fragment>
    }
    const _verifyCode = () => {
      Dialog({
          title: "Login",
          content:  <RetryLogin />,             
      })
  }
  */
    return (
      <div className="checkout-finish flex flex-col aic">
          <Lottie options={_timerClock_} width={350}/>
            <div className="txt font s15 b6 c000">Bumb! Your order has been placed successfully.</div>  
            <div className="txt font s15 c333">Track your order status 👇</div>  
          {user ? 
          <Link to="/user/track-orders" className="button btn font s15 b6">Track Order</Link>
          : 
          <button onClick={() => { 
            //_verifyCode();
            history.push('/login')
            //zuz.Toast.show({html:`Please login to track your order`, time: 5})
            }} className="button btn font s15 b6">Track Order</button>
          }
      </div>
    ); 
}
 
export default CheckoutFinish;