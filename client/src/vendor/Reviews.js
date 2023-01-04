import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// Screen
import {Dialog} from "../core";
import {getscales} from '../actions/Admin/adminscale'
import axios from 'axios'
import moment from 'moment'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function Scales(props){

    let section = props.match.params.section || "scale-list"; 
    const [sort, setSort] = useState("Default Filter"); 
    const [dropSort, setDropSort] = useState(false);
    const [sorting, setsorting] = useState({approval : '0'})
    const [reviews,setreviews]  = useState([])
    const [loaded,setloaded] = useState(false)
    const [updated,setupdated] = useState(false)
    const [sortItems, setSortItems] = useState([
        {label: "Default Filter", slug:"/",filter : {approval : '0'}},
        {label: "Approved", slug:"/",filter : {approval : "approved"}},
        {label: "Declined", slug:"/",filter : {approval : 'declined'}},
        {label: "Pending", slug:"/",filter : {approval : 'pending'}},
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

    useEffect(()=>{
        document.title = "Reviews"
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/reviews");
        document.body.addEventListener("click", ()=>{setDropSort(false);}); 
    },[]); 
    useEffect(() => {
        const getanorder = async () => {
            try {
                //setloaded(false)
                const res = await  axios.post(`${process.env.REACT_APP_API_URL}/review/getreviews`,{sorting})
                console.log('reviews',res)
                if(res.data.status === 'success'){
                 //console.log(res.data.reviews)
                 setreviews(res.data.reviews)
                 //settheorder(res.data.order)
                 setloaded(true)
                }
               } catch (error) {
                console.log(error)
               if(error.response){
                   console.log(error.response.data)
                  // zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
               }
               } 
        }
        getanorder()
        },[sorting,updated])

    const dispatch = useDispatch();
    const [dataloaded,setdataloaded] = useState(false)
    const { user } = useSelector((state) => state.authreducer);

    const updatereviewstatus = async (id,approval) => {
        try {
            //setloaded(false)
            const res = await  axios.post(`${process.env.REACT_APP_API_URL}/review/updatereviewapproval`,{id,approval})
            console.log('reviewsupdated',res)
            if(res.data.status === 'success'){
               setupdated(!updated)
            }
           } catch (error) {
            console.log(error)
           if(error.response){
               console.log(error.response.data)
              // zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
           }
           } 
    }
 
    const reviewresponse = (id,approval) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to accept this order?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Confirm",
                fnc: () => {
                    console.log("Confirm button Click")
                    updatereviewstatus(id,approval)
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

    return (
        <div className="table-list-p reviews-page flex flex-col">
            <div className="page-title rfont b5 s24 black">Reviews</div>
            {/* Header */}
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    
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
            <div className="table flex flex-col">
                <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">Sr #</div>
                <div className="col rfont s15 b6 c333">Prod Id</div>
                <div className="col rfont s15 b6 c333">Prod Name</div>
                <div className="col rfont s15 b6 c333">Username</div>
                <div className="col rfont s15 b6 c333">Rating</div>
                <div className="col rfont s15 b6 c333">Review</div>
                <div className="col rfont s15 b6 c333">Approval</div>
                <div className="col rfont s15 b6 c333">Date</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            { 
            loaded ? 
             reviews.length > 0 ? 
                    reviews.map((item,index)=>(
                        <div key={index} id={item.id} className="row flex aic anim">
                            <div className="col rfont s14">{index+1}</div>
                            <div className="col rfont s14">{item.productid.prod_id}</div>
                            <div className="col rfont s14">{item.productid.label_en}</div>
                            <div className="col rfont s14 flex aic">{item.userid.fullname}</div>
                            <div className="col rfont s14">{item.rating}</div>
                            <div className="col rfont s14">{item.review}</div>
                            <div className="col rfont s14">{item.approval}</div>
                            <div className="col rfont s14">{moment(item.createdAt).calendar()}</div>
                            <div className="col flex aic"> 
                            {item.approval === "approved" || item.approval === "declined" ? item.approval : 
                            <> 
                            <button onClick={()=>reviewresponse(item._id,'approved')} className="btn cleanbtn rfont s14 cfff">Approve</button> 
                            <button onClick={()=>reviewresponse(item._id,'declined')} className="btn cleanbtn rfont s14 cfff">Decline</button> 
                            </>
                           }
                         { //  user.rights.scales.edit  &&  <button onClick={()=>_editScale(item.name,item.symbol,item.status,item._id)} className="edit btn rfont s14 cfff">Edit</button> 
                         }
                         { //  user.rights.scales.del  &&  <button onClick={()=>_delete(item.id)} to="/edit-user" className="delete btn rfont s14 cfff">Delete</button>
                         }
                            </div>  
                        </div>
                    ))
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Reviews section is empty!</div>
                    </div>
                </div> 
                : 
                <React.Fragment>
                    {
                        emptyOrder.map(() => (
                            <div className="row flex aic">
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
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
            }
        </div>
            </div> 
             
        </div>
    );
}
 
export default Scales;