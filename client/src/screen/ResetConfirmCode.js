import React,{useState,useEffect} from 'react';
// { Link } from 'react-router-dom';
import {confirmCode,resetandverifywithphone,resetwithemail} from '../actions/auth'; 
// Screen
import HeaderAccount from "./sub/HeaderAccount";
import {useSelector,useDispatch} from 'react-redux'
import zuz from "../core/Toast";
import {
    focus,
    keyCodes,
    keyupListener
} from "../core"
function Confirmresetcode(props) {   

    const dispatch = useDispatch();
   

    const theuser = useSelector((state) => state.authreducer);
    const [code,setcode] = useState('');
    const [number,setnumber] = useState(false)
    const [email,setemail] =useState(false)
    const [emailnumber,setemailnumber] = useState(props.match.params.number)
    const [loading,setloading] = useState(false)

    const [digit1, setDigit1] = useState(null)
    const [digit2, setDigit2] = useState(null)
    const [digit3, setDigit3] = useState(null)
    const [digit4, setDigit4] = useState(null)
    const [digit5, setDigit5] = useState(null)
    const [digit6, setDigit6] = useState(null)

    useEffect(() => {
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailnumber == null){ 
           
            zuz.Toast.show({html:"Enter your email or phone number", time: 5});
        } 
        
        else if(!(emailnumber.match(themail)) && !(emailnumber.match(/^[0-9]+$/)))
        {
           
            zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
        }
        else if((emailnumber.match(themail)) || (emailnumber.match(/^[0-9]+$/))){ 
            if((emailnumber.match(themail)))
            {
                setemail(true)
            }
            else if( (emailnumber.match(/^[0-9]+$/)))
            {
                if(emailnumber.length === 10)
                {
                    setnumber(true)
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
    },[])
    const verifyCode = async () => {
        setloading(true)
        const code = `${digit1}`+`${digit2}`+`${digit3}`+`${digit4}`+`${digit5}`+`${digit6}`
        await dispatch(confirmCode(code,emailnumber,{reset:true},{number},{email}))
        setloading(false)
    }
    const sendcodeagain = async () => {
        if(number)
        {
        setloading(true)
        await dispatch(resetandverifywithphone(emailnumber)) 
        setloading(false)
        }
        else if(email)
        {
        setloading(true)
        await  dispatch(resetwithemail(emailnumber,true))
        setloading(false)
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
                    <div> 
                     <div className="title font b black">Confirmation Code</div>
                     <div className="sub font s15 b3 black">
                     To reset your password please
                     enter the code first. which have been sended to your {email ? 'email' : 'number'}.
                     Code is valid for 5 minutes
                        </div>
                        <div className="item flex aic">
                            <input 
                                value={digit1}  
                                placeholder="0"
                                type="text" 
                                maxlength="1" 
                                className="cleanbtn digit _d1 rfont s15 c333 anim username"
                                onChange={e=>{
                                    setDigit1(e.target.value)
                                    if(e.target.value.length == 1){
                                        focus("._d2")
                                    }
                                }} 
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit1(null)
                                    focus("._d1")
                                })}} 
                            />      
                            <input  
                                value={digit2} 
                                placeholder="0"
                                type="text" 
                                maxlength="1"  
                                className="cleanbtn digit _d2 rfont s15 c333 anim username"
                                onChange={e=>{
                                    setDigit2(e.target.value)
                                    if(e.target.value.length == 1){
                                        focus("._d3")
                                    } 
                                }}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit2(null)
                                    focus("._d1")
                                })}}
                            />     
                            <input 
                                value={digit3} 
                                placeholder="0"
                                type="text" 
                                maxlength="1" 
                                className="cleanbtn digit _d3 rfont s15 c333 anim username"
                                onChange={e=>{
                                    setDigit3(e.target.value)
                                    if(e.target.value.length == 1){
                                        focus("._d4")
                                    }
                                }}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit3(null)
                                    focus("._d2")
                                })}}
                            /> 
                            <input 
                                value={digit4} 
                                placeholder="0"
                                type="text" 
                                maxlength="1" 
                                className="cleanbtn digit _d4 rfont s15 c333 anim username"
                                onChange={e=>{
                                    setDigit4(e.target.value)
                                    if(e.target.value.length == 1){
                                        focus("._d5")
                                    }
                                }}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit4(null)
                                    focus("._d3")
                                })}}
                            />   
                            <input 
                                value={digit5} 
                                placeholder="0"
                                type="text" 
                                maxlength="1" 
                                className="cleanbtn digit _d5 rfont s15 c333 anim username"
                                onChange={e=>{
                                    setDigit5(e.target.value)
                                    if(e.target.value.length == 1){
                                        focus("._d6")
                                    }
                                }}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit5(null)
                                    focus("._d4")
                                })}}
                            />   
                            <input 
                                value={digit6} 
                                placeholder="0"
                                type="text" 
                                maxlength="1" 
                                className="cleanbtn digit _d6 rfont s15 c333 anim username"
                                onChange={e=>setDigit6(e.target.value)}
                                onKeyUp={(e)=>{keyupListener(e, keyCodes.BACKSPACE, ()=>{
                                    setDigit6(null)
                                    focus("._d5")
                                })}}
                            />          
                        </div> 
                        <div className="btns flex aic">
                            <button className="button rfont s16 anim"
                            onClick={() => verifyCode(code)}
                            >Verify Code</button> 
                            <button className="button rfont s16 anim"
                            onClick={() => sendcodeagain(number)}
                            >Resent Code</button> 
                        </div>
                     
                        </div>
                    </div> 
                </div> 
            </div> 
        </React.Fragment>
    );
}

export default Confirmresetcode;