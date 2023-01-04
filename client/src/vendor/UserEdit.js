import React,{useState, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import UserEditRoles from "./UserEditRoles";
import {edituser} from '../actions/Admin/users';

import {Link} from 'react-router-dom';
import {getauser} from '../actions/Admin/users'
import axios from 'axios'
import zuz from "../core/Toast";

function UserEdit(props) {

    const id = props.match.params.id
   // console.log(id)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getauser(id))
    },[])
    const {user_loaded,user}= useSelector(state => state.allusers)
    //console.log(user)
    const [Username, setUserName] = useState('');

    const [username, setusername] = useState('');
    const [emailphone, setEmailphone] = useState(''); 
    const [fullname, setfullName] = useState(null);  
    const [role,setrole] = useState('')
    const [status,setstatus] = useState('')
    const [storename, setStoreName] = useState('');
    const [media,setmedia] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setshowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [vehicleno,setvehicleno] = useState('')
   
    const [dropMenu, setDropMenu] = useState(true);
    const [address,setaddress] = useState('')
    const [storelocation,setstorelocation] = useState('')
    const [foundedlocations,setfoundedlocation] = useState('')
    const [selectedaddress,setselectedaddress]  = useState('')
    const [storelocationcoordinates,setstorelocationcoordinates] = useState('')
    const [city, setcity] = useState('')
    useEffect(() => {
        if(user){
    setusername(user.username)
    user.phoneno ? setEmailphone(user.phoneno) : setEmailphone(user.email)
    setrole(user.role)
    setmedia(user.media)
    setstatus(user.status)
    setStoreName(user.storename)
    setfullName(user.fullname)
    setaddress(user.address)
    setStoreName(user.storename)
    setcity(user.storelocationcity)
    setstorelocationcoordinates(user.storelocationcoordinates)
    setvehicleno(user.vehicleno)
    }
    },[user])

     // TrueWay Geocoding
         // 2 request per second
         const findcoordinates = () => {
            var options = {
                method: 'GET',
                url: 'https://trueway-geocoding.p.rapidapi.com/Geocode',
                params: {address: storelocation, language: 'en'},
                headers: {
                  'x-rapidapi-key': 'cdc7cf8e67msh6b07cd04db0c676p103069jsn812be05cac4f',
                  'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com'
                }
              };
                  axios.request(options).then(function (response) {
                  console.log(response.data.results);
                  setfoundedlocation(response.data.results)
                  if(response.data.results.length > 0)
                  {
                      setDropMenu(true)
                  }
              }).catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
              });
            }
        

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

    const edittheuser = (id) => {
         
        if(role === "user" || role === "rider" || role=== "admin")
        {
           if(!username || !fullname || !status || !emailphone || !role )
           {
              zuz.Toast.show({html:`Please input all fields`, time: 5});
           }
           else if(password !== confirmPass)
           {
               zuz.Toast.show({html:`Password fields did not matched`, time: 5}); 
           }
           else 
           {
            dispatch(edituser(id,{data : {vehicleno,username,address,fullname,role,status,emailphone: emailphone.toString(),password,confirmPass}}))
           }
        }
       else if(role === 'vendor')
        {
            console.log('vendor')
           if(!username || !fullname || !role || !status  || !emailphone || !city || !storename || !storelocationcoordinates)
           {
              zuz.Toast.show({html:`Please input all fields`, time: 5});
           }
           else if(password !== confirmPass)
           {
               zuz.Toast.show({html:`Password fields did not matched`, time: 5}); 
           }
           else 
           {
            dispatch(edituser(id,{data : {username,address,fullname,role,status,emailphone: emailphone.toString(),password,confirmPass,storelocationcity : city,storename,storelocationcoordinates}}))
           }
        }        
   }

    return (
        <div className="table-list-p user-edit-p flex flex-col">
            <div className="hd flex aic">
                <div className="page-title rfont b6 s24 black">User Edit</div>
                <Link to="/users" className="lin rfont s16 blue">Back</Link>
            </div>
            
            <div className="wrapper flex flex-col">
                <div className="info flex aic">
                    <div className="media">
                        <img  src={`${process.env.REACT_APP_END_URL}${media}`} className="img" />
                    </div>
                    <div className="meta flex flex-col">
                       {
                           // <div className="nam rfont s18 b5 c333">Avatar</div>
                       }
                        
                        <div className="rfont s15 c777">{storename}</div>
                    </div>
                </div>
                
                <div className="form flex">
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Username<span className="astarick">&#42;</span></div>
                        <input value={username} type="text" placeholder="username"  onChange={e=>setusername(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Phone No / Email<span className="astarick">&#42;</span></div>
                        <input value={emailphone} type="text" placeholder="Email/phoneno"   onChange={e=>setEmailphone(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                    <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Full Name<span className="astarick">&#42;</span></div>
                    <input type="text" value={fullname} onChange={e=>setfullName(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Role<span className="astarick">&#42;</span></div>
                        <select value={role} onChange={(e) => setrole(e.target.value)} className="iput rfont s15 c333 anim">
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                            <option value="rider">Rider</option>
                        </select>
                    </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div>
                        <select value={status} className="iput rfont s15 c333 anim">
                            <option value="active">Active</option>
                            <option value="closed">Close</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>
                    
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Address<span className="astarick">&#42;</span></div>
                        <input type="text" value={address} placeholder="Address"   onChange={e=>setaddress(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                    {role === "rider" &&
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Vehicle no<span className="astarick">&#42;</span></div>
                        <input type="text" value={vehicleno} onChange={e=>setvehicleno(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                     }
                    {role === "vendor" ?
                    <React.Fragment>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Store Name</div>
                        <input value={storename} type="type" placeholder="Store Name"  onChange={e=>setStoreName(e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                    <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">City<span className="astarick">&#42;</span></div>
                    <input value={city} type="type" onChange={e=>setcity(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                    </div>
                   
                    <div className="item flex flex-col rel">
                <div className="lbl rfont s15 c333">Store Location<span className="astarick">&#42;</span></div>
                <input value={storelocation} type="type" onChange={e=>setstorelocation(e.target.value)} className="iput rfont s15 c333 anim flex flex-col rel" />
                <button onClick={() =>  findcoordinates()}  className="button btn rfont s16 b5 cfff">Search</button>               
                    {/* Store location selector*/}    
                    {dropMenu && foundedlocations && foundedlocations.length > 0 && 
                        <div className="drop-blk abs"> 
                            {  
                                foundedlocations.map((item,index)=>( 
                                    <button key={index} className="cleanbtn name flex aic anim" onClick={()=>{
                                    //  setProductId(item.id);
                                    // setunit(item.unit)
                                        setselectedaddress(item.address)
                                        setstorelocationcoordinates(item.location)
                                        setDropMenu(false);
                                        
                                    }}> 
                                        <div className="nam rfont s14 c333">{item.address}</div>                    
                                    {
                                        // <div className="ur_nam rfont s14 c333">{item.label_ur[0].value}</div> 
                                    }                   
                                    </button>  
                                ))
                            } 
                        </div> 
                    }
                    {selectedaddress &&
                    <div className="lbl rfont s15 c333">{selectedaddress}<span className="astarick">&#42;</span></div> }
                </div> 
               
                    </React.Fragment> 
                     : ''}
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Password<span className="astarick">&#42;</span></div>
                        <div className="password flex aic">
                            <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password}  onChange={e=>setPassword(e.target.value === "" ? null : e.target.value)} className="cleanbtn rfont s15 c333 anim" />
                            <button onClick={()=>{setshowPass(!showPass)}} className={`cleanbtn show-btn s20 c777 ${showPass == true ? "icon-eye" : "icon-eye-off"}`} />
                        </div>
                    </div>
                    <div className="item flex flex-col">
                        <div className="lbl rfont s15 c333">Confirm Password<span className="astarick">&#42;</span></div>
                        <div className="password flex aic">
                            <input type={showConfirmPass ? 'text' : 'password'} placeholder="confirm password" value={confirmPass} onChange={e=>setConfirmPass(e.target.value === "" ? null : e.target.value)} className="cleanbtn rfont s15 c333 anim" />
                            <button onClick={()=>{setShowConfirmPass(!showConfirmPass)}} className={`cleanbtn show-btn s20 c777 ${showConfirmPass == true ? "icon-eye" : "icon-eye-off"}`} />
                        </div>
                    </div>
                </div>
                <div className="roles">
                    <div className="hdr flex aic"> 
                        <div className="col rfont s15 b6 c333">Module Permission</div>
                        <div className="col rfont s15 b6 c333">Read</div>
                        <div className="col rfont s15 b6 c333">Create</div>
                        <div className="col rfont s15 b6 c333">Edit</div>
                        <div className="col rfont s15 b6 c333">Delete</div>
                    </div>
                    { user_loaded ?
                        Object.keys(user.rights).map((e,index)=>
                            e === 'id' ? '' :
                        <UserEditRoles index={index} data= {user.rights[e]} accesses={e} id={user._id}/>  
                        )  
                        : ''
                    }
                </div>
                <div className="flex aic ftr">
                    <button onClick={() => edittheuser(user._id)} className="button btn rfont s16 b5 cfff">Save Change</button>
                </div>
            </div>

        </div>
    );
}

export default UserEdit;