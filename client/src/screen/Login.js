import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux'

// Screen
import HeaderAccount from "./sub/HeaderAccount";
import {focus} from "../core";
import zuz from "../core/Toast";
import {login,retrylinksend,resetandverifywithphone,verifyemail,sendCodeForVerifyEmail} from '../actions/auth'; 

import {googleauthenticatesignin,sendFacebookTokensingin} from '../actions/auth'; 
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {useSelector,useDispatch} from 'react-redux'
import {
    keyupListener,
    keyCodes
} from "../core"

function Login({login,googleauthenticatesignin,sendFacebookTokensingin,history}) { 
    
    const logininfo = (localStorage.getItem('supermenlogininfo'))
    const [check, setCheckbox] = useState(false);
    const [emailphone, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading,setloading] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('supermenlogininfo'))
        {
            const logininfo = (localStorage.getItem('supermenlogininfo'))
            setEmail(JSON.parse(logininfo).emailphone)
            setPass(JSON.parse(logininfo).pass)
            setCheckbox(true)
        }
        },[])
        const setCheck = () => {
            if(localStorage.getItem('supermenlogininfo'))
            {
                localStorage.removeItem('supermenlogininfo')
                setCheckbox(false)
            }
            else if(check && !localStorage.getItem('supermenlogininfo'))
            {
                setCheckbox(false)
            }
            else 
            { 
                setCheckbox(true)
            }
        }

    const dispatch = useDispatch();
    const theuser = useSelector((state) => state.authreducer);
    const { emailverify,numberverify } = theuser;

    const _login = async () =>{ 
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailphone == null){ 
            focus(".email");  
            zuz.Toast.show({html:"Enter your email Address", time: 5});
        } 
         
        else if(!(emailphone.match(themail)) && !(emailphone.match(/^[0-9]+$/)))
        {
            zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
        }
        else if ((emailphone.match(/^[0-9]+$/) && !(emailphone.length === 11))) {
            zuz.Toast.show({html:"Phone no length should be 11", time: 5});
        }
        else if(pass == null){ 
            focus(".pass");
            zuz.Toast.show({html:"Enter your password", time: 5});
        }
   
        else{ 
          if(check)
          {
            localStorage.setItem('supermenlogininfo',JSON.stringify({emailphone,pass})) 
          }
          let modifiedphone = emailphone; 
          if((emailphone.match(/^[0-9]+$/)))
          {
            let phonearray = emailphone.toString().split("");
            function arrayRemove(arr) { 
              return arr.filter(function(ele,index){ 
                  return index != 0; 
              });
            }
            var result = arrayRemove(phonearray);
            //phonearray = phonearray.splice(0,1)
            modifiedphone = result.join("")
          }
          setloading(true)
          const res = await login(modifiedphone,pass,history)
          if(res === false)
          {
             setloading(false)
          }
        
        }
    }

    const sendemaillink = () => {
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(emailphone === null || emailphone === undefined){ 
      
        zuz.Toast.show({html:"Enter your email Address", time: 5});
    } 
    
    else if(!(emailphone.match(themail)))
    {
        zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
    }
    else {
        dispatch(retrylinksend(emailphone))
    }
    }

    useEffect(() => {
     const verifyagain = async () => {
      if(emailverify === false)
      {
        setloading(true)
        
        await  dispatch(sendCodeForVerifyEmail(emailphone))
        setloading(false)
      }
      else if(numberverify === false)
      {
        setloading(true)
        let modifiedphone = emailphone; 
          if((emailphone.match(/^[0-9]+$/)))
          {
            let phonearray = emailphone.toString().split("");
            function arrayRemove(arr) { 
              return arr.filter(function(ele,index){ 
                  return index != 0; 
              });
            }
            var result = arrayRemove(phonearray);
            //phonearray = phonearray.splice(0,1)
            modifiedphone = result.join("")
          }
        await dispatch(resetandverifywithphone(modifiedphone,{verifynumber : true}))
        setloading(false)
      }
    }
    verifyagain()
    },[emailverify,numberverify])
    const _sendCode = () =>{
        if(emailphone == null){ 
            zuz.Toast.show({html:"Enter Phone no", time: 5});  
        } 
        else if(!(emailphone.match(/^[0-9]+$/)))
        {
           
            zuz.Toast.show({html:"Enter a correct phoneno", time: 5});
        }
        else{
        dispatch(resetandverifywithphone(emailphone,{verifynumber : true})) 
        }
    } 

    const responseGoogle = async (response) => { 
        if(response.error === "popup_closed_by_user")
        {
            setloading(false) 
            return
        }
        const res = googleauthenticatesignin(response.tokenId);
        if(res === false)
        {
            setloading(false)
        }
        
      };
      const responseFacebook = async (response) => {
       const res = await  sendFacebookTokensingin(response.userID, response.accessToken)
       if(res === false)
       {
           setloading(false)
       }
      };
    return ( 
        <React.Fragment> 
            {loading && <div className="cover flex aic abs fill">
                <img src={`/images/loader.svg`} className="img" />
            </div>}
            <div className="signup-p rel">
                <HeaderAccount />  
                <div className="wrap wrapWidth"> 
                    <div className="head flex flex-col aic">
                        <div className="title font b black">Log In</div>
                        <div className="sub font s18">
                            <span className="black">Don't have an account?</span>&nbsp;
                            <Link to="/signup" className="color">Sign Up</Link>
                        </div>
                    </div>
 
                     {/* Contetn */}   
                    <div className="content flex aic">
                        <div className="left">
                            <div className="form flex flex-col">
                                {
                                /*
                                emailverify === false || numberverify === false ? 
                               
                               emailverify === false ?
                              
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Email</div>
                                    <input value={emailphone} type="text" className="cleanbtn iput font s15 c333 anim email" onChange={e=>setEmail(e.target.value === "" ? null : e.target.value)}/>
                                    <button  className="button btn font s15 b6 anim" onClick={e=>sendemaillink()}>Send Email</button>
                                </div> 
                                 :   <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Phone (+92)*</div>
                                    <input 
                                        value={pass} 
                                        type="text" 
                                        className="cleanbtn iput font s15 c333 anim email" 
                                        onChange={e=>setEmail(e.target.value === "" ? null : e.target.value)}
                                    />
                                    <button className="button btn font s15 b6 anim" onClick={e=>_sendCode()}>Send code</button>
                                </div>  
                             
                                : */
                                <React.Fragment>
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Phone </div>
                                    <input value={emailphone} type="text" className="cleanbtn iput font s15 c333 anim email" onChange={e=>setEmail(e.target.value)}/>
                                </div> 
                                <div className="item flex flex-col">
                                <div className="lbl font s15 c333">Password*</div>
                                <input 
                                    value={pass} 
                                    type="password" 
                                    className="cleanbtn iput font s15 c333 anim pass" 
                                    onChange={e=>setPass(e.target.value)}  
                                    onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{_login()})}}
                                />
                            </div> 
                                         
                                <div className="item flex aic">
                                    <div className="box flex aic">
                                        <button className={"checkbox cleanbtn " + (check === true ? "on icon-check" : "")} onClick = {()=>{setCheck()}}/>
                                        <div className="lbl font s14 c333">Remember Me</div>
                                    </div>
                                    <Link to="/recover-password" className="link font s14 c333">Forgot Password or Email</Link>
                                </div>                       
                                <button className="button btn font s15 b6 anim" onClick={e=>_login()}>Log In</button>
                                </React.Fragment>
                                }
                                </div> 
                        </div>
                        {/* <div className="divider" />
                        <div className="right flex flex-col rel">
                            <div className="abs lll font s16 c333">Or login with</div>
                        <GoogleLogin
                  //uxMode="redirect"  
                  //redirectUri={`${process.env.REACT_APP_END_URL}`}
                  //{"http://localhost:3000/login"}
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={() =>{ 
                        setloading(true)
                        renderProps.onClick()
                      }
                    }
                      disabled={renderProps.disabled}
                      className='link flex aic anim'
                    >
                        <div className="icon cfff"><img alt="google-logo" className="img" src={"./images/google-logo.svg"} /></div>
                        <div className="lbl font s15 cfff">Continue with Google</div>
                    </button>
                  )} 
                ></GoogleLogin>
                   <FacebookLogin
                  //disableMobileRedirect={true} 
                  // try now
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  redirectUri={`${process.env.REACT_APP_END_URL}/login`}
                  render={renderProps => (
                    <button
                      onClick={() => {
                        setloading(true)  
                        renderProps.onClick()}}
                      className='link flex aic anim'
                    >
                    <div className="icon cfff">
                        <img alt="facebook-logo" className="img" src={"./images/facebook-logo.svg"} /></div>
                                <div className="lbl font s15 cfff">Continue with Facebook</div>
                    </button>
                  )}
                />
                </div>   */}
                    </div> 
                    
                    {/* Footer */}
                    <div className="ftr flex aic">
                        <div className="tt font s14 c333">* By signing up, you agree to our <Link to="/terms-conditions" className="color">Terms of Use</Link> and to receive <span>{global.siteName}</span> emails & updates and acknowledge that you read our&nbsp;<Link to="/privacy" className="color">Privacy Policy.</Link></div>         
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default connect(null,{login, googleauthenticatesignin,sendFacebookTokensingin})(Login);