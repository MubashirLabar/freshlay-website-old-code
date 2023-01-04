import React,{useState} from 'react';
import {connect} from 'react-redux'
import zuz from "../core/Toast";
import {useSelector,useDispatch} from 'react-redux'
import {resetandverifywithphone,resetwithemail} from '../actions/auth'; 
// Screen
import HeaderAccount from "./sub/HeaderAccount";


function  RecoverPassword () { 

   
    const [emailphone, setemailphone] = useState('');
    const [loading,setloading] = useState(false)

   const dispatch = useDispatch();

    const _Recover = async () =>{ 
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailphone == null){ 
           
            zuz.Toast.show({html:"Enter your email or phone number", time: 5});
        } 
        
        else if(!(emailphone.match(themail)) && !(emailphone.match(/^[0-9]+$/)))
        {
           
            zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
        }
        else if((emailphone.match(themail)) || (emailphone.match(/^[0-9]+$/))){ 
            if((emailphone.match(themail)))
            {
                setloading(true)
                await  dispatch(resetwithemail(emailphone))
                setloading(false)
            }
            else if( (emailphone.match(/^[0-9]+$/)))
            {
                if(emailphone.length === 10)
                {
                    setloading(true)
                    await dispatch(resetandverifywithphone(emailphone,{resetpassword : true}))
                    setloading(false)
                }
                else{
                    zuz.Toast.show({html:"Your phone number length should be 10", time: 5});
                }
               
            }
            else {
            zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
            }
        }
   
        else{ 
            zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
        }
    }

    return ( 
        <React.Fragment>  
            {loading && <div className="cover flex aic abs fill">
                <img src="/images/loader.svg" className="img" />
                </div>}
            <div className="signup-p rel">
                <HeaderAccount />  
                <div className="wrap recover-wrap abs abc"> 
                    <div className="head flex flex-col aic">
                        <div className="title font b black">Recover Password</div>
                        <div className="sub font s16 black">Enter your email address or phone & we'll send you a link/code to recover your password.</div>
                    </div> 
                    <div className="item flex flex-col">
                        <div className="lbl font s15 c333">Email/Phone no (+92)</div>
                        <input className="cleanbtn iput font s15 c333 anim email" value={emailphone}  onChange={e=>setemailphone(e.target.value)}/>
                    </div>  
                    <button className="button btn font s15 b6 anim" onClick={()=>_Recover()}>Send Link/Code</button>
                
                </div> 
            </div>
        </React.Fragment>
    );
}

export default RecoverPassword;