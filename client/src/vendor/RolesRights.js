import React,{useState,useEffect} from 'react';
import RolesRightsItems from "./RolesRightsItems";
import {useDispatch,useSelector} from 'react-redux'
import {getarole} from '../actions/Admin/adminrole'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function RolesRights(props) { 
    
    // when we will get here we will call dispatch to get all access related to role
    // and then we will update here in row
 
    const [roles, setRoles] = useState([
        {id: "1", name: "Dashboard"},
        {id: "2", name: "Location"},                                                                                                                                
        {id: "3", name: "Category"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "4", name: "Products"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "5", name: "Orders"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "6", name: "Updates"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "7", name: "Banner"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "8", name: "Setting"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "9", name: "Role"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    ]);
    const [read, setRead] = useState(false);
    const role = props.role;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getarole(role))
    }, [])
    console.log(role)
    const {access_loaded,roleaccess} = useSelector(state => state.categoriesandroles)
    console.log('roleaccess',roleaccess)
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{}])

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="table roles-items flex flex-col">
            <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">Sr #</div>
                <div className="col rfont s15 b6 c333">Module Name</div>
                <div className="col rfont s15 b6 c333">Read</div>
                <div className="col rfont s15 b6 c333">Create</div> 
                <div className="col rfont s15 b6 c333">Edit</div> 
                <div className="col rfont s15 b6 c333">Delete</div> 
            </div>
            {  
             roles.length > 0 ?
             access_loaded ? 
              Object.keys(roleaccess).map((e,index)=>
                 e === 'id' ? '' :
                <div id={index} className="row flex aic anim">
                <RolesRightsItems index={index} data= {roleaccess[e]} role={role} accesses={e}/>  
                </div> 
                
                )
             :
             <React.Fragment>
             {
                 emptyOrder.map(e=>(
                     <div className="row flex aic">
                         <div className="col holder" />
                         <div className="col holder" />
                         <div className="col holder" />
                         <div className="col holder" />
                         <div className="col holder" />
                         <div className="col holder" />
                     </div>  
                 ))
             }
            </React.Fragment> 
                    /*   props.roles.map((item,index)=>( 
                       <div id={index} className="row flex aic anim">
                            <RolesRightsItems index={index} data= {item} role={role} accesses={props.roles[index]}/>  
                        </div> 
                       
                      
                        
                   
                    )) */
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Roles section is empty!</div>
                    </div>
                </div> 
            }
        </div>
    );
}

export default RolesRights;