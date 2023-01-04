import React,{useState,useEffect} from 'react';
// { Link } from 'react-router-dom';
import {changepassword} from '../actions/auth'; 
// Screen
import zuz from "../core/Toast";
import HeaderAccount from "./sub/HeaderAccount";
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';

function Changepassword(props) { 

    const dispatch = useDispatch();
   

    const theuser = useSelector((state) => state.authreducer);
    const { loaded,emailverify } = theuser;
    const [newpassword,setnewpassword] = useState(null);
    const [confirmpassword,setconfirmpassword] = useState(null);
    const [loading,setloading] = useState(false)
   
    const changethepassword = async () => {
        if (!confirmpassword || !newpassword) {
            zuz.Toast.show({
              html: "Please input all field to update your password",
              time: 5,
            });
          } 
          else if (confirmpassword.length < 8 || newpassword.length < 0) {
            zuz.Toast.show({
              html: "Minimum password length should be 8",
              time: 5,
            });
          } 
          else if (confirmpassword !== newpassword) {
            zuz.Toast.show({
              html: "Your new password fields did'nt matched",
              time: 5,
            });
          } 
          else {
            setloading(true)
            await dispatch(changepassword(newpassword));
            setloading(false)
          }
    }
 
    return ( 
        <React.Fragment>  
            <div className="signup-p rel">
                <HeaderAccount />  
                <div className="wrap recover-wrap change-pas abs abc"> 
                    <div className="head flex flex-col aic">
                      <div className="title font b black">Change Password</div>
                      <div className="sub font s16 black">Set your new Password and remember it for future using.</div>
                    <div className='form'> 
                        <div className="item flex flex-col"> 
                          <input value={newpassword} placeholder="Password" className="cleanbtn iput rfont s15 c333 anim username"
                            onChange={e=>setnewpassword(e.target.value)}
                          />  
                                                     
                        </div> 
                        <div className="item flex flex-col">
                          <input value={confirmpassword} placeholder="Confirm password" className="cleanbtn iput rfont s15 c333 anim username"
                          onChange={e=>setconfirmpassword(e.target.value)}/> 
                        </div>

                        <button className="button font s15 b6 anim"
                        onClick={() => changethepassword()}
                        >Change Password</button> 
                         
                     
                        </div>
                      
                    
                    </div> 
                  
                </div> 
            </div> 
        </React.Fragment>
    );
}

export default Changepassword;