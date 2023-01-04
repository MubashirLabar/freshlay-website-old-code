import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// Screen
import ScaleList from "./ScaleList";
import {Dialog} from "../core";
import {createScale} from '../actions/Admin/adminscale'
import {getscales} from '../actions/Admin/adminscale'

function Scales(props){

    let section = props.match.params.section || "scale-list"; 
    const [sort, setSort] = useState("Default sorting"); 
    const [dropSort, setDropSort] = useState(false);
    const [sorting, setsorting] = useState({status : '0'})
    const [sortItems, setSortItems] = useState([
        {label: "Default sorting", slug:"/",filter : {status : '0'}},
        {label: "Sort by Active", slug:"/",filter : {status : 'active'}},
        {label: "Sort by Inactive", slug:"/",filter : {status : 'inactive'}},
    ]);

    useEffect(()=>{
        document.title = "Scales"
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/scales");
        document.body.addEventListener("click", ()=>{setDropSort(false);}); 
    },[]); 
    const dispatch = useDispatch();
    const [dataloaded,setdataloaded] = useState(false)
    const { user } = useSelector((state) => state.authreducer);
    const { hideDialogbox } = useSelector((state) => state.generalReducers);
    useEffect(() => {
       
    },[hideDialogbox])
    useEffect(() => {
        const getdata= async () => {
            const res = await dispatch(getscales(sorting))
            if(res)
            {
              setdataloaded(true)
            }
        }
        getdata()
        
    },[sorting])
    const {scale_loaded,scales} = useSelector(state => state.categoriesandroles)
    
    function Addscale (props) {
        const [name,setname] = useState('');
        const [symbol,setsymbol] = useState('');
        const [status, setstatus] = useState('active');
        //console.log('sortstatusfunction',props.sortstatus)
        const createscale = () => {
            dispatch(createScale({name,symbol,status},props.sortstatus))
            dispatch({type : 'HIDE_Dialogbox' , payload : true})
        }
        return (
            <div className="confirm-blk flex flex-col s15 c333">
                    <div className="content">
                        <div className="add-scale-form">
                            <div className="item flex flex-col">
                                <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div> 
                                <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                            </div>
                            <div className="item flex flex-col">
                                <div className="lbl rfont s15 c333">Symbol<span className="astarick">&#42;</span></div> 
                                <input value={symbol} onChange={(e) => setsymbol(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                            </div>
                            <div className="item flex flex-col">
                                <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div> 
                                <select onChange={(e) => setstatus(e.target.value)} value={status} className="iput rfont s15 c333 anim">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="pop-ftr flex aic">
                        
                            <button className="button btn rfont s15 b5 cfff" 
                                onClick={()=>{
                                  createscale()
                                }}>
                               save
                            </button>
                        
                    </div>
                </div>
        )
    }
    {/* Add New Scale */}
    const _addScale = () => {
        
        return  Dialog({
            title: "Add New Scale",
            content:  <Addscale sortstatus={sorting}/>     
        })
    } 
 
    return (
        <div className="table-list-p scales-page flex flex-col">
            <div className="page-title rfont b5 s24 black">Scales</div>
            {/* Header */}
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/scales/scale-list" className={`button btn rfont s15 b5 anim ${section == "scale-list" && "on"}`}>Scales</Link>
            { user.rights.scales.create  &&     <button onClick={()=>_addScale()} className={`button btn rfont s15 b5 anim ${section == "add-category" && "on"}`}><span className="icon-plus b6 ico"/><span>Add Scale</span></button>  }
                </div>
                {section === "scale-list" && <div className="rig flex aic">
                    {/* Sort Selecter Block */}
                    <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                        e.stopPropagation();
                        setDropSort(!dropSort);
                    }}> 
                        { 
                            sortItems.map((item,index)=>(
                                sort == item.label && <div key={index} className="flex aic">          
                                    <div className="txt rfont s16 black">{item.label}</div>
                                    <div className={`arrow s18 c777 anim ${dropSort == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                </div>
                            ))
                        }
                        {dropSort && <div className="options sort flex flex-col abs">
                                {
                                    sortItems.map((item,index)=>(
                                        <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
                                            setDropSort(!dropSort);
                                            setsorting(item.filter)
                                            setSort(item.label);
                                        }}>         
                                            <div className="txt rfont s16 black">{item.label}</div> 
                                        </button> 
                                    ))
                                } 
                            </div>  
                        }
                    </button>
               
                </div>}
            </div>
              
            <div className="content flex flex-col">
              {section == "scale-list" && <ScaleList scales={scales} sortstatus={sorting} scale_loaded={scale_loaded} dataloaded={dataloaded}/>}   
            </div> 
             
        </div>
    );
}
 
export default Scales;