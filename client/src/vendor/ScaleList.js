import React,{useState, useEffect} from 'react';
import {Dialog} from "../core";
import {deletescale,editScale} from '../actions/Admin/adminscale'
import {useSelector,useDispatch} from 'react-redux'

function ScaleList(props) { 
    
    const [scales, setScales] = useState([
        {id: "1", name: "Qunatity", symbol: "qty", status: "active"},
        {id: "2", name: "Kilo Garam", symbol: "kg", status: "active"},                                                                                                                                
        {id: "3", name: "Garam", symbol: "gm", status: "active"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        {id: "4", name: "Dazan", symbol: "Dz", status: "active"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    ]); 
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{}])
    useEffect(()=>{
        document.title = "Scales";
    })  

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authreducer);
    {/* Delete  Order */}
    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to Delete this Category?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Delete",
                fnc: () => {
                    console.log("Confirm button Click")
                    dispatch(deletescale(id,props.sortstatus))
                }
            },
            cancel:{
                label: "Cancell",
                fnc: () =>{
                    console.log("Cancell Button Click")
                }
            }        
        })
    }

    const Editscale = props => {
        const [name,setname] = useState(props.name);
        const [symbol,setsymbol] = useState(props.symbol)
        const [status, setstatus] = useState(props.status)
        return (
            <div className="confirm-blk flex flex-col s15 c333">
            <div className="content">
                <div className="add-scale-form">
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div> 
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Symbol<span className="astarick">&#42;</span></div> 
                        <input value={symbol} onChange={(e) => setsymbol(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                    </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div> 
                        <select value={status} onChange={(e) => setstatus(e.target.value)} className="iput rfont s15 c333 anim">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="pop-ftr flex aic">
                <button className="button btn rfont s15 b5 cfff" 
                    onClick={()=>{
                        console.log(name,symbol,status,props.id)
                            dispatch(editScale({name,symbol,status,id:props.id},props.sortstatus))
                        dispatch({type: "HIDE_Dialogbox", payload: true})
                    }}>
                    Save
                </button>
             </div>
        </div> 
        )
    }

    {/* Add New Scale */}
    const _editScale = (name,symbol,status,id) => {
        Dialog({
            title: "Edit Scale",
            content: <Editscale name={name} symbol={symbol} status={status} id={id} sortstatus={props.sortstatus}/>,
            /*confirm:{
                label: "Save",
                fnc: () => {
                    console.log("Confirm button Click")
                }
            }   */     
        })
    }
  
    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">Sr #</div>
                <div className="col rfont s15 b6 c333">Name</div>
                <div className="col rfont s15 b6 c333">Symbol</div>
                <div className="col rfont s15 b6 c333">Status</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            { 
            props.scale_loaded && props.dataloaded ? 
             props.scales.length > 0 ? 
                    props.scales.map((item,index)=>(
                        <div key={index} id={item.id} className="row flex aic anim">
                            <div className="col rfont s14">{index+1}</div>
                            <div className="col rfont s14">{item.name}</div>
                            <div className="col rfont s14">{item.symbol}</div>
                            <div className="col rfont s14 flex aic">{item.status}</div>
                            <div className="col flex aic">   
                         {   user.rights.scales.edit  &&  <button onClick={()=>_editScale(item.name,item.symbol,item.status,item._id)} className="edit btn rfont s14 cfff">Edit</button> }
                         {   user.rights.scales.del  &&  <button onClick={()=>_delete(item.id)} to="/edit-user" className="delete btn rfont s14 cfff">Delete</button>}
                            </div>  
                        </div>
                    ))
                : 
                    <div className="empty-orders flex flex-col">
                        <img src={"/images/empty-orderbook.svg"} className="img" />
                        <div className="lbl font s16 b6 c777">Opps! Scales Book is Empty</div>
                    </div>
                : 
                <React.Fragment> 
                {
                    emptyOrder.map(e=> (
                        <div className="row flex anim">
                            <div className="col holder" />
                            <div className="col holder" />
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

export default ScaleList;