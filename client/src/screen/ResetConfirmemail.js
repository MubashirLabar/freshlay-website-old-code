import React,{useState,useEffect} from 'react';
// { Link } from 'react-router-dom';
import {confirmlink} from '../actions/auth'; 
// Screen
import zuz from "../core/Toast";
import HeaderAccount from "./sub/HeaderAccount";
import {useSelector,useDispatch} from 'react-redux'

function Confirmresetemail(props) { 

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(confirmlink(props.match.params.resetlink ))
    },[])

    return ( 
        <React.Fragment>  
            
        
            <div className="signup-p rel">
                <HeaderAccount />  
                <div className="wrap recover-wrap abs abc"> 
                    <div className="head flex flex-col aic">
                   
                    <div>
                     <div className="title rfont b6 black">Verifying link</div>
                     <div className="sub font s16 black">
                         Verifying link please wait
                        </div>
                        
                        </div>
                          
                       
                    
                    </div> 
                  
                </div> 
            </div> 
        </React.Fragment>
    );
}

export default Confirmresetemail;