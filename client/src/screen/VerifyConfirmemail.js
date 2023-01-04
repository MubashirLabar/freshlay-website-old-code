import React,{useState,useEffect} from 'react';
// { Link } from 'react-router-dom';
import {verifyemail,retrylinksend} from '../actions/auth'; 
// Screen
import zuz from "../core/Toast";
import HeaderAccount from "./sub/HeaderAccount";
import {useSelector,useDispatch} from 'react-redux'

function Confirmemail(props) { 

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(verifyemail(props.match.params.emaillink ))
    },[])

    const theuser = useSelector((state) => state.authreducer);
    const { loaded,emailverify } = theuser;
    const [email,settheemail] = useState('');
    const sendemaillink = (email) => {
        let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(email === null || email === undefined){ 
      
        zuz.Toast.show({html:"Enter your email Address", time: 5});
    } 
    
    else if(!(email.match(themail)))
    {
       
        zuz.Toast.show({html:"Enter a correct email or phoneno", time: 5});
    }
    else {
        dispatch(retrylinksend(email))
    }
    }

    return ( 
        <React.Fragment>  
            
        
            <div className="signup-p rel">
                <HeaderAccount />  
                <div className="wrap recover-wrap abs abc"> 
                    <div className="head flex flex-col aic">
                    {emailverify === false ? 
                    <div>
                     <div className="title rfont b6 black">Verify email</div>
                     <div className="sub font s16 black">
                           Your verify token has been expired please send the link to
                        get new verify link.
                        </div>
                        <div className="item flex flex-col">
                        <input value={email} className="cleanbtn iput rfont s15 c333 anim username"
                         onChange={e=>settheemail(e.target.value)}/>                              
                        </div> 
                        <button className="button rfont s16 anim"
                        onClick={() => sendemaillink(email)}
                        >Send Link again</button> 
                        </div>
                          :
                        <div>
                        <div className="title rfont b6 black">Verifying email</div>
                        <div className="sub font s16 black">
                            Verifying email in process
                        </div>
                       </div>
                    }
                    </div> 
                  
                </div> 
            </div> 
        </React.Fragment>
    );
}

export default Confirmemail;