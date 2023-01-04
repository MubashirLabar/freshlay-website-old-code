import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {getusers} from '../actions/Admin/users';
import {useDispatch,useSelector} from 'react-redux'

// Screen
import UsersList from "./UsersList";
import UsersAddNew from "./UsersAddNew";


function Users(props){
 
    let section = props.match.params.section || "list";
    const [sort, setSort] = useState("All Users"); 
    const [sortitem,setsortitem] = useState({role: '0'})
    const [thestatus,setthestatus] = useState({status : '0' })
    const [dropSort, setDropSort] = useState(false);
    const [sortItems, setSortItems] = useState([
        {label: "All Users", slug:"/", val : {role : "0"}},
        {label: "Vendors", slug:"/" , val : {role : "vendor"}},
        {label: "Riders", slug:"/" , val : {role : "rider"} },
        {label: "Customers", slug:"/", val : {role : "user"}},
        {label: "Verified Users", slug:"/", val : {numberverified: true}},
        {label: "Unverified Users", slug:"/", val : {numberverified : false}},
    ]);
    const [status, setStatus] = useState("Filter by Status"); 
    const [dropStatus, setDropStatus] = useState(false);
    const [statusItems, setStatusItems] = useState([
        {label: "Filter by Status", slug:"/",val : {status : '0' }},
        {label: "Active", slug:"/",val : {status : 'active' }},
        {label: "Close", slug:"/",val : {status : 'closed' }}, 
        {label: "Banned", slug:"/",val : {status : 'banned' }},
    ]);
    const { loaded, user } = useSelector((state) => state.authreducer);
    const dispatch = useDispatch()
     useEffect(() => {
        dispatch(getusers(sortitem,thestatus))
     },[sortitem,thestatus])
    useEffect(()=>{
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/users")
        document.title = "Users";
        document.body.addEventListener("click", ()=>{
            setDropSort(false);
            setDropStatus(false);
        }); 
    },[]);
    
    return (
        <div className="table-list-p users-page flex flex-col">
            <div className="page-title rfont b5 s24 black">Users List</div>
            {/* Header */}
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/users/add-new-user" className="button btn rfont s15 b5 flex aic anim on"><span className="icon-plus b6 ico"/><span>Add {loaded ? user.role === "admin" ? 'User' : 'Rider' : 'user'}</span></Link>
                </div>
                {section !== "add-new-user" ? 
                    <div className="rig flex aic">
                        {/* Sort by Users Block */}
                        <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                            e.stopPropagation();
                            setDropSort(!dropSort);
                            setDropStatus(false);
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
                                                setSort(item.label);
                                                setsortitem(item.val)
                                            }}>         
                                                <div className="txt rfont s16 black">{item.label}</div> 
                                            </button> 
                                        ))
                                    } 
                                </div>  
                            }
                        </button>

                        {/* Sort by Status Block */}
                        <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                            e.stopPropagation();
                            setDropStatus(!dropStatus);
                            setDropSort(false);
                        }}> 
                            { 
                                statusItems.map((item,index)=>(
                                    status == item.label && <div key={index} className="flex aic">          
                                        <div className="txt rfont s16 black">{item.label}</div>
                                        <div className={`arrow s18 c777 anim ${dropStatus == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                    </div>
                                ))
                            }
                            {dropStatus && <div className="options sort flex flex-col abs">
                                    {
                                        statusItems.map((item,index)=>(
                                            <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
                                                setDropStatus(!dropSort);
                                                setStatus(item.label);
                                                setthestatus(item.val)
                                            }}>         
                                                <div className="txt rfont s16 black">{item.label}</div> 
                                            </button> 
                                        ))
                                    } 
                                </div>  
                            }
                        </button>
                    </div>
                    :
                    <div className="rig flex aic">
                        <Link to="/users" className="lin rfont s16 blue">Back</Link>
                    </div>
                }
            </div>
            <div className="content flex flex-col">
                {section == "list" && <UsersList />}   
                {section == "add-new-user" && <UsersAddNew />}   
            </div>    
        </div>
    );
}
 
export default Users;