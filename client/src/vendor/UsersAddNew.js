import React,{useState,useEffect} from 'react';
import {createusers,createinfo} from '../actions/Admin/users';
import {useDispatch,useSelector} from 'react-redux';
import zuz from "../core/Toast";
import Geocode from "react-geocode";
import axios from 'axios'

function UsersAddNew(props) {
    
   
    const { loaded, user } =  useSelector((state) => state.authreducer);

    const [username, setUserName] = useState('');
    const [fullname, setfullName] = useState('');
    const [emailphone, setEmailPhone] = useState('');   
    const [role,setrole] = useState(loaded ? user.role === 'vendor'? 'rider' : 'user' : '')
    const [status,setstatus] = useState("active")
    const [storename, setStoreName] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPass, setConfirmPass] = useState(''); 
    const [address,setaddress] = useState('')
    const [dropMenu, setDropMenu] = useState(true);
    const [storelocation,setstorelocation] = useState('')
    const [foundedlocations,setfoundedlocation] = useState('')
    const [selectedaddress,setselectedaddress]  = useState('')
    const [storelocationcoordinates,setstorelocationcoordinates] = useState('')
    const [vehicleno,setvehicleno] = useState('')
    const [city, setcity] = useState('')
    const [allroles,setallroles] = useState([])

    useEffect(() => {
        const getroles = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL}/category/getroles`
              );
            console.log(data)
            setallroles(data.roles)
            console.log('asdasds')
        }
       getroles()
    },[])

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
                    zuz.Toast.show({html:`${error.response.data}`, time: 5});
                    console.log(error.response.data);
                  } else if (error.request) {
                    // The request was made but no response was received
                    zuz.Toast.show({html:`${error.request}`, time: 5});
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    zuz.Toast.show({html:`${error.message}`, time: 5});
                    console.log('Error', error.message);
                  }
              });
            }
        
          
    
    const dispatch = useDispatch()
    
    const {usercreated}= useSelector(state => state.allusers)
    const {roles_loaded,roles} = useSelector(state => state.categoriesandroles)
   
    //console.log(roles)
     const createuser = () => {
        console.log('called    asdasds')
         if(!(role === 'vendor'))
         {
            if(!username)
            {
                zuz.Toast.show({html:`Please input username field`, time: 5}); 
            }
            else if(!fullname) 
            {
                zuz.Toast.show({html:`Please input fullname field`, time: 5}); 
            } 
            else if(!status) 
            {
                zuz.Toast.show({html:`Please input status field`, time: 5}); 
            } 
            else if(!emailphone)
            {
                zuz.Toast.show({html:`Please input emailphone field`, time: 5}); 
            } else if(!password) 
            {
                zuz.Toast.show({html:`Please input password field`, time: 5}); 
            } 
            else if(!confirmPass)
            {
                zuz.Toast.show({html:`Please input confirm password field`, time: 5}); 
            }
            else if(role === "rider" && !vehicleno)
            {
                zuz.Toast.show({html:`Please input vehicle no`, time: 5}); 
            }
            else if(password !== confirmPass)
            {
                zuz.Toast.show({html:`Password fields did not matched`, time: 5}); 
            }
            else if ((emailphone.match(/^[0-9]+$/) && !(emailphone.length === 11))) {
                zuz.Toast.show({html:"Phone no length should be 11", time: 5});
            }
            else 
            {
                let modifiedphone = emailphone; 
                if((emailphone.match(/^[0-9]+$/)))
                {
                    let phonearray = emailphone.toString().split("");
                    function arrayRemove(arr) { 
                    return arr.filter(function(ele,index){ 
                        return index != 0; 
                    });
                    }
                    var result = arrayRemove(phonearray);
                    //phonearray = phonearray.splice(0,1)
                    modifiedphone = result.join("")
                }
                dispatch(createusers({username,address,fullname,role,status,emailphone : modifiedphone,password,confirmPass,storelocationcity : city,storename,storelocationcoordinates,vehicleno,vendorId : user._id,}))
            }
         }
        else if(role === 'vendor')
         {
            if(!username)
            {
                zuz.Toast.show({html:`Please input username field`, time: 5}); 
            }
            else if(!fullname) 
            {
                zuz.Toast.show({html:`Please input fullname field`, time: 5}); 
            } 
            else if(!status) 
            {
                zuz.Toast.show({html:`Please input status field`, time: 5}); 
            } 
            else if(!emailphone)
            {
                zuz.Toast.show({html:`Please input emailphone field`, time: 5}); 
            } else if(!password) 
            {
                zuz.Toast.show({html:`Please input password field`, time: 5}); 
            } 
            else if(!confirmPass)
            {
                zuz.Toast.show({html:`Please input confirm password field`, time: 5}); 
            } 
            else if(!city)
            {
                zuz.Toast.show({html:`Please input city field`, time: 5}); 
            }
            else if(!storename)
            {
                zuz.Toast.show({html:`Please input storename field`, time: 5}); 
            }
            else if(!storelocationcoordinates)
            {
                zuz.Toast.show({html:`Please select store address`, time: 5}); 
            }
            else if(password !== confirmPass)
            {
                zuz.Toast.show({html:`Password fields did not matched`, time: 5}); 
            }
            else if ((emailphone.match(/^[0-9]+$/) && !(emailphone.length === 11))) {
                zuz.Toast.show({html:"Phone no length should be 11", time: 5});
            }
            else 
            {
                let modifiedphone = emailphone; 
                if((emailphone.match(/^[0-9]+$/)))
                {
                    let phonearray = emailphone.toString().split("");
                    function arrayRemove(arr) { 
                    return arr.filter(function(ele,index){ 
                        return index != 0; 
                    });
                    }
                    var result = arrayRemove(phonearray);
                    //phonearray = phonearray.splice(0,1)
                    modifiedphone = result.join("")
                }
              
             dispatch(createusers({username,address,fullname,role,status,emailphone : modifiedphone,password,confirmPass,storelocationcity : city,storename,storelocationcoordinates}))
            }
         }           
    }
    
   
    useEffect(() => {
       if(usercreated)
       {
        zuz.Toast.show({html:`New account has been createed`, time: 5});
        dispatch(createinfo())
        setUserName('')
        setfullName('')
        setEmailPhone('')
        setStoreName('')
        setPassword('')
        setConfirmPass('')
        setvehicleno('')
        setaddress('')
       }
    },[usercreated])

    return (
        <div className="add-new-user flex flex-col">
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Username<span className="astarick">&#42;</span></div>
                    <input type="text" value={username} onChange={e=>setUserName(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Phone No / Email<span className="astarick">&#42;</span></div>
                    <input type="text" value={emailphone}  onChange={e=>setEmailPhone(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                {loaded ? user.role === "admin" ? 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Role<span className="astarick">&#42;</span></div>
                    <select value={role} onChange={(e) => setrole(e.target.value)} className="iput rfont s15 c333 anim">
                      {allroles.map((el) => {
                          return <option val={`${el.name}`}>{el.name}</option>
                      })}
                        {/* <option value="user">User</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                        <option value="rider">Rider</option> */}
                       
                    </select>
                </div>
                : ''
                : '' }
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div>
                    <select value={status} onChange={(e) => setstatus(e.target.value)}  className="iput rfont s15 c333 anim">
                    
                        <option value="active">Active</option>
                        <option value="closed">Close</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div>
                    <input type="text" value={fullname} onChange={e=>setfullName(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                {role === "rider" && 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Vehicle no<span className="astarick">&#42;</span></div>
                    <input type="text" value={vehicleno} onChange={e=>setvehicleno(e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                }
                { role === "vendor" ?
                <React.Fragment>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Store Name<span className="astarick">&#42;</span></div>
                    <input value={storename} type="type" onChange={e=>setStoreName(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
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
                : ''
                 }
                 { role === "user" || role === "rider"?
                     <div className="item flex flex-col">
                     <div className="lbl rfont s15 c333">User Address<span className="astarick">&#42;</span></div>
                     <input value={address} type="type" onChange={e=>setaddress(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                 </div> : ''
                 }
                
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Password<span className="astarick">&#42;</span></div>
                    <input value={password} type="password" onChange={e=>setPassword(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Confirm Password<span className="astarick">&#42;</span></div>
                    <input value={confirmPass} type="password" onChange={e=>setConfirmPass(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
            </div>
            <div className="ftr flex aic">
                <button onClick={() => createuser()} className="button btn rfont s16 b5 cfff">Add {loaded ? user.role === "admin" ? 'User' : 'Rider' : 'user'}</button>
            </div>
        </div>
    );
}

export default UsersAddNew;