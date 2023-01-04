import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// Screen
import RolesList from "./RolesList";
import RolesRights from "./RolesRights";
import {Dialog} from "../core";
import {useDispatch,useSelector} from 'react-redux'
import {createrole} from '../actions/Admin/adminrole'

function Roles(props){ 

    let section = props.match.params.section || null;
    const dispatch = useDispatch()
    useEffect(()=>{
        document.title = "Roles";
        window.__setNavTab && window.__setNavTab("/roles");
        section = props.match.params.section;

       
    },[]);
    
    {/* Add New Role */}
    const [newrole,setnewrole]  = useState('')

    function AddnewRole(props) {
           const [newrole,setnewrole] = useState('')
          
           const createarole = () => {
            //console.log('newrole',newrole)     
           dispatch(createrole(newrole.toLowerCase()))
           dispatch({type : 'HIDE_Dialogbox',payload : true})
           }
        return (
            <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="add-role-form">
                                <div className="item flex flex-col">
                                    <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div> 
                                    <input value={newrole} onChange={(e) => setnewrole(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                                </div>

                            </div>
                        </div>
                        <div className="pop-ftr flex aic">
                        
                         
                            <button className="button btn rfont s15 b5 cfff" 
                                onClick={()=>{
                                   createarole()
                                }}>
                                save
                            </button>
                        
                    </div>
                        </div>
        )
    }

    const _addRole = () => {
        Dialog({
            title : "Add New Role",
            content : <AddnewRole />
        })
        
    }
   
     const role = props.match.params.role
    //console.log(role)
    return (
        <div className="table-list-p roles-page flex flex-col"> 
            <div className="page-title rfont b5 s24 black">Roles</div>
            {/* Header */} 
            <div className="head flex aic">  
                <div className="lef flex aic">
                    <button onClick={()=>_addRole()} className="button btn rfont s15 b5 anim on"><span className="icon-plus b6 ico"/><span>Add Role</span></button>
                </div>
            </div>
            <div className="content flex flex-col">
              
                <React.Fragment>
                {section == null && <RolesList />}      
                {section == "rights"  && <RolesRights role={role} />}   
                </React.Fragment>
                 
            </div>   
        </div>
    );
}
 
export default Roles;