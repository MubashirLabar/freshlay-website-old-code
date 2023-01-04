import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';
import {Dialog} from "../core";
import {useDispatch,useSelector} from 'react-redux'
import {getroles,editrole,deleterole} from '../actions/Admin/adminrole'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function RolesList(props) { 
    
    const [allroles, setRoles] = useState([
        {id: "1", name: "Customer"},
        {id: "2", name: "Shop Owner"},                                                                                                                                
        {id: "3", name: "Delivery Boy"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "4", name: "Delivery Boy"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "5", name: "Operator"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    ]);
 
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{}])

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    {/* Delete  Role */}
    const _delete = (itemname) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to Delete this Role?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Delete",
                fnc: () => {
                    console.log("Confirm button Click")
                    dispatch(deleterole(itemname))
                }
            },
            cancel:{
                label: "Cancel",
                fnc: () =>{
                    console.log("Cancell Button Click")
                }
            }        
        })
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getroles())
    }, [])
    const {roles_loaded,roles} = useSelector(state => state.categoriesandroles)
    {/* Add New Role */}
    function EditRole(props) {
        const [newrole,setnewrole] = useState(props.name)
         
        const editarole = () => {
        // console.log('role',props.name) 
            
        dispatch(editrole({nameid :props.name,role : newrole}))
        dispatch({type: "HIDE_Dialogbox", payload: true})
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
                                editarole()
                             }}>
                             save
                         </button>
                     
                 </div>
                     </div>
     )
 }

    const _editRole = (name) => {
        Dialog({
            title: "Edit Role",
            content:  <EditRole name={name}/>
                  
        })
    }

    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">Sr #</div>
                <div className="col rfont s15 b6 c333">Name</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            {  
             roles_loaded ?  
             roles.length > 0 ? 
                    roles.map((item,index)=>(
                        <div id={item.id} className="row flex aic anim">
                            <div className="col rfont s14">{index+1}</div>
                            <div className="col rfont s14">{item.name}</div>
                            <div className="col flex aic">   
                                <button onClick={()=>_editRole(item.name)} className="edit btn rfont s14 cfff">Edit</button>
                                  { // <Link to="/roles/rights/" className="success btn rfont s14 cfff">Rights</Link>
                                  }
                                
                                <Link to={`/roles/rights/${item.name}`} className="success btn rfont s14 cfff">Rights</Link>
                                <button onClick={()=>_delete(item.name)} to="/edit-user" className="delete btn rfont s14 cfff">Delete</button>
                            </div>   
                        </div>
                    )) 
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Roles section is empty!</div>
                    </div>
                </div> 
                 :
                 <React.Fragment>
                    {
                        emptyOrder.map(e=>(
                            <div className="row flex aic">
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
                            </div> 
                        ))
                    }
                 </React.Fragment> 
            }
        </div>
    );
}

export default RolesList;