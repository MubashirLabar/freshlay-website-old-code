import React,{useState,useEffect} from 'react';
import { Link} from 'react-router-dom';
import {getusers} from '../actions/Admin/users';
import {useDispatch,useSelector} from 'react-redux'
import {Dialog} from "../core";
import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"
import axios from 'axios';
import zuz from '../core/Toast'
import moment from 'moment'

function UsersList(props) { 
    
    const [vendor, setVendor] = useState([
        {id: "319", username:"gray2702", name: "Gray Valenzuela", contact: "03008000230", verified: "Yes", role: "vendor", status: "active"},                                                                                                                                
        {id: "320", username:"kelsie0511", name: "Kelsie Dunlap", contact: "support@gmail.com", verified: "Yes", role: "vendor", status: "active"},                                                                                                                                
        {id: "321", username:"nina2208", name: "Nina Byers", contact: "03008000230", verified: "No", role: "vendor", status: "active"},                                                                                                                                
        {id: "322", username:"yael2612", name: "Yael Marshall", contact: "03008000230", verified: "NO", role: "vendor", status: "active"},                                                                                                                                
        {id: "323", username:"hillary1807", name: "Hillary Rasmussen", contact: "support@gmail.com", verified: "Yes", role: "vendor", status: "close"},                                                                                                                                
        {id: "324", username:"herman2003", name: "Herman Tate", contact: "support@gmail.com", verified: "Yes", role: "vendor", status: "close"},                                                                                                                                
        {id: "325", username:"neil1002", name: "Neil Sosa", contact: "support@gmail.com", verified: "Yes", role: "vendor", status: "banned"},                                                                                                                                
        {id: "326", username:"wesley0508", name: "Wesley Oneil", contact: "support@gmail.com", verified: "No", role: "vendor", status: "banned"},                                                                                                                                
    ]); 
    const dispatch = useDispatch()
    const {users,usersloaded} = useSelector(state => state.allusers)

    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    const _userstat = (id) => {
        Dialog({
            title : "User details",
            content: <Orderstat id={id}/>,
    
        })
    }

    // User details component
    const Orderstat  = ({id}) => {
        console.log(id)
        const [user,setuser] = useState('');
        const [loading,setloading] = useState(true)
        console.log('theuser',user)
        useEffect(() => {
            const getdetails = async () => {
            try {  
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getuserdetails/${id}`);
                console.log(res.data)
                setuser(res.data)   
                setloading(false)
            } catch (error) {
                if (error.response) {
                    zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
                  } else {
                    zuz.Toast.show({ html: `Network error`, time: 5 });
                  }
              }
            }
            getdetails()
        },[])
      return (
          <> 
           {loading ? 
            <div className="cover flex aic abs fill">
                <img src={`/images/loader.svg`} className="img" />
            </div>
          :  
          <div className="confirm-blk flex flex-col s15 c333">
            <div>
                User refered : {user.theuser.referedusersid.length}
            </div>
            <div>
                Freshlay Wallet :  {Math.floor(user.theuser.wallet)}
            </div>
            <div>
                Refer no :  {user.theuser.refercode}
            </div>
          <div className="order-detail flex">
            <div className="wrap flex flex-col"> 
            Refered Users
                <div className="hdr pkg flex aic">
                    <div className="col rfont s14 b6 c333">Sr#</div>
                    <div className="col rfont s14 b6 c333">Name</div> 
                    <div className="col rfont s14 b6 c333">User id</div> 
                    <div className="col rfont s14 b6 c333">Phone</div> 
                </div>
                {
                user.theuser.referedusersid ? 
                 user.theuser.referedusersid.map((item,i) => 
                  <div key={i} className="row pkg flex aic">
                    <div className="col rfont s14 c333">{i+1}</div>
                    <div className="col rfont s14 c333">{item.username}</div>
                    <div className="col rfont s14 c333">{item.user_id}</div>
                    <div className="col rfont s14 c333">{item.phoneno}</div>
                  </div>
                )
                : ''
                }
            </div>
            </div>
            <div className="order-detail flex">
            <div className="wrap flex flex-col"> 
            Order history
                <div className="hdr pkg flex aic">
                    <div className="col rfont s14 b6 c333">Sr#</div>
                    <div className="col rfont s14 b6 c333">Orderid</div> 
                    <div className="col rfont s14 b6 c333">Sub Price</div> 
                    <div className="col rfont s14 b6 c333">Discounted price</div> 
                    <div className="col rfont s14 b6 c333">Delivery type</div>
                    <div className="col rfont s14 b6 c333">Payment Method</div>
                    <div className="col rfont s14 b6 c333">Order Date</div>  
                </div>
                      
                {
                user.orderlist ? 
                 user.orderlist.map((item,i) => 
                  <div className="row pkg flex aic">
                    <div className="col rfont s14 c333">{i+1}</div>
                    <div className="col rfont s14 c333">{item.orderId}</div>
                    <div className="col rfont s14 c333">{item.totalprice}</div>
                    <div className="col rfont s14 c333">{item.discountedprice}</div>
                    <div className="col rfont s14 c333">{item.deliverytype}</div>
                    <div className="col rfont s14 c333">{item.paymentMethod}</div>
                    <div className="col rfont s14 c333">{moment(item.createAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                  </div>
                )
                  : ''
                }
              
            </div>
            </div>
        
            </div>
            }
  </>
  )
    }
   
    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">ID</div>
                <div className="col rfont s15 b6 c333">Username</div>
                <div className="col rfont s15 b6 c333">Name</div>
                <div className="col rfont s15 b6 c333">Phone / Email</div>
                <div className="col rfont s15 b6 c333">Verified</div>
                <div className="col rfont s15 b6 c333">Role</div> 
                <div className="col rfont s15 b6 c333">Status</div> 
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            {  usersloaded ?
             users.length > 0 ?
                    users.map((item,index)=>(
                        <div key={index} id={item.id} className="row flex aic anim">
                            <div className="col rfont s14">{item.user_id}</div>
                            <div className="col rfont s14">{item.username}</div>
                            <div className="col rfont s14">{item.fullname}</div>
                            <div className="col rfont s14">{item.email ? item.email : item.phoneno}</div>
                            <div className="col rfont s14">{item.numberverified ? 'Yes' : 'No'}</div> 
                            <div className="col rfont s14 flex aic">{item.role}</div>
                            <div className="col rfont s14"><div className={`status rfont s14 cfff ${item.status}`}>{item.status}</div></div> 
                            <div className="col flex aic"> 
                                <Link to={`/edit-user/${item._id}`} className="edit btn rfont s14 cfff">Edit</Link>
                                <button onClick={()=>_userstat(item._id)} className="btn rfont s14 cfff">User details</button>
                            </div> 
                        </div>
                    ))
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Users list is empty!</div>
                    </div>
                </div>
                    :
                    <React.Fragment>
                    {
                        emptyOrder.map(e=>(
                            <div className="row placeholder flex aic">
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
    );
}

export default UsersList;