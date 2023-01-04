import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
// Screen
import HeaderAccount from "./sub/HeaderAccount";
import {focus} from "../core"
import zuz from "../core/Toast";
import {signup,googleauthenticatesignup,sendFacebookTokensingup} from '../actions/auth'; 
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
 
function Signup({signup,googleauthenticatesignup,sendFacebookTokensingup}) {
 
    const [username, setUserName] = useState(null);
    const [emailphone, setEmailphone] = useState(null);
    const [pass, setPass] = useState(null);
    const [confirmPass, setConfirmPass]= useState(null);
    const [loading, setloading] = useState(false)

    const _signup = async () =>{ 
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      //  let phoneregex = /^((92))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
        if(username == null){
            focus(".username");
            zuz.Toast.show({html:"Enter a username", time: 5});
        }
        else if(username.length < 3 || username.length > 20)
        {
           focus(".username");
           zuz.Toast.show({html:"Username length should be between 4 to 20", time: 5});
        }
        else if(emailphone == null){
            focus(".email");
            zuz.Toast.show({html:"Enter your email Address or phone no", time: 5});
        }
        else if (!(emailphone.match(/^[0-9]+$/)))
        {
        focus(".email");
        // console.log('email error')
            zuz.Toast.show({html:"Please input a valid phone no", time: 5});
        }
        else if ((emailphone.match(/^[0-9]+$/) && !(emailphone.length === 11))) {
            zuz.Toast.show({html:"Phone no length should be 11", time: 5});
        }
        else if(pass == null){
            focus(".pass");
            zuz.Toast.show({html:"Enter your password", time: 5});
        }
        else if(pass.length < 6)
        {
            focus(".pass");
            zuz.Toast.show({html:"Your password length should be greater than 5", time: 5});
        }
        else if(confirmPass == null){
            focus(".confirmpass");
        }
        else if(confirmPass != pass){
            focus(".confirmpass");
            zuz.Toast.show({html:"your password fields did'nt match", time: 5});
        }
        else{
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
            const res = await signup(username,modifiedphone,pass)
            if(res === false)
            {
                setloading(false)
            }
        } 
    }

    const responseGoogle = async (response) => {
        // when we set http to https then http origin is changed so thats why getting error
        if(response.error === "popup_closed_by_user")
        {
            setloading(false) 
        }
        const res = await googleauthenticatesignup(response.tokenId);
      
        if(res === false)
        {
            setloading(false)
        }
      };

      const responseFacebook = async (response) => {
        const res = await sendFacebookTokensingup(response.userID, response.accessToken)  
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
                        <div className="title font b black">Sign Up</div>
                        <div className="sub font s18">
                            <span className="black">Already have a account?</span>&nbsp;
                            <Link to="/login" className="color">Login</Link>
                        </div>
                    </div>

                     {/* Contetn */}   
                    <div className="content flex aic">
                        <div className="left">
                            <div className="form flex flex-col">
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Name</div>
                                    <input type="text" className="cleanbtn iput font s15 c333 anim username" onChange={e=>setUserName(e.target.value === "" ? null : e.target.value)}/>                              
                                </div>
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Phone</div>
                                    <input type="number" className="cleanbtn iput font s15 c333 anim email"  onChange={e=>setEmailphone(e.target.value === "" ? null : e.target.value)}/>
                                </div>                                
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Password*</div>
                                    <input type="password" className="cleanbtn iput font s15 c333 anim pass"  onChange={e=>setPass(e.target.value === "" ? null : e.target.value)}/>
                                </div>                                
                                <div className="item flex flex-col">
                                    <div className="lbl font s15 c333">Confirm Password*</div>
                                    <input type="password" className="cleanbtn iput font s15 c333 anim confirmpass"  onChange={e=>setConfirmPass(e.target.value === "" ? null : e.target.value)}/>  
                                </div>
                                <button className="button btn font s15 b6 anim" onClick={e=>_signup()}>Sign Up</button>
                            </div> 
                        </div>
                        {/* <div className="divider" /> */}
                        {/* <div className="right flex flex-col rel"> 
                            <div className="lll abs lbl font s16 c333">Or login with</div>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={() => {
                          renderProps.onClick()
                          setloading(true)
                          }}
                      disabled={renderProps.disabled}
                      className='link flex aic anim'
                    >
                      <div className="icon cfff"><img className="img" src={"./images/google-logo.svg"} /></div>
                                <div className="lbl font s15 cfff">Continue with Google</div>
                    </button>
                  )}
                />
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                  callback={responseFacebook}
                  render={renderProps => (
                    <button 
                      onClick={() =>  {
                        setloading(true)
                        renderProps.onClick()
                        }}
                      className='link flex aic anim'
                    >
                    <div className="icon cfff"><img className="img" src={`${process.env.REACT_APP_END_URL}images/facebook-logo.svg`} /></div>
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

export default connect(null,{signup,googleauthenticatesignup,sendFacebookTokensingup})(Signup)