import React, { useState, useEffect } from 'react';
import zuz from "../../core/Toast";
import { useDispatch, connect, useSelector } from 'react-redux'
import { updateaddressbook } from '../../actions/profile'
import superagent from 'superagent'
import { Dialog, focus } from "../../core";
import Geocode from "react-geocode";
import GoogleMap from '../Googlemap'
function ShippingAddressForm(props) {

    const dispatch = useDispatch()
    const theuser = useSelector((state) => state.authreducer);
    const { loaded, user } = theuser;
    //console.log(props.item)
    const [name, setName] = useState(props.item ? props.item.name : '');
    const [streetaddress, setstreetaddress] = useState(props.item ? props.item.streetaddress : '');
    const [address2, setaddress2] = useState(props.item ? props.item.address2 : '');
    const [city, setcity] = useState(props.item ? props.item.city : '');
    const [state, setstate] = useState(props.item ? props.item.state : '');
    const [postalcode, setpostalcode] = useState(props.item ? props.item.postalcode : '');
    const [cellphone, setcellphone] = useState(props.item ? 0 + props.item.cellphone : '');
    const [email, setemail] = useState(props.item ? props.item.email : '')
    const [foundedlocations, setfoundedlocations] = useState(props.item ? props.item.addresscoordinates : '')
    const [userlocationcoordinates, setuserlocationcoordinates] = useState(props.item ? props.item.addresscoordinates : '')
    //const [storelocation, setstorelocation] = useState(props.item ? props.storelocation : '')
    const [coordinateaddress,setcoordinateaddress] = useState(props.item ? props.item.coordinateaddress : '')
    const [dropMenu, setDropMenu] = useState(false);
    const [selectedaddress, setselectedaddress] = useState({})


    Geocode.setApiKey("AIzaSyCtWBjIIdMG--m5BqfYhtWYDwHqlJqJJuo");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");

    useEffect(() => {
        if(!props.edit)
        {
        if (navigator.geolocation) {
            console.log('In navigator geolocation','high accuracy enabled')
            var options = {
                enableHighAccuracy: true,
                //timeout: 5000,
                //maximumAge: 0
              };
              function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
              }
            navigator.geolocation.getCurrentPosition((position) => {
                setuserlocationcoordinates({lat : position.coords.latitude,lng : position.coords.longitude})
                Geocode.fromLatLng(`${position.coords.latitude}`, `${position.coords.longitude}`).then(
                (response) => {
                const address = response.results[0].formatted_address;
                setcoordinateaddress(address)
                },
                (error) => {
                console.error(error);
                }
            );
            },error,options);
        }
       }
    },[])

    const addnewaddress = () => {
        if (!name) {
            zuz.Toast.show({ html: "Please enter your fullname", time: 5 })
            focus("._fullname")
        }
        else if(!cellphone) {
            zuz.Toast.show({ html: "Please input cellphone", time: 5 });
            focus("._phone")
        }
        else if (cellphone.length != 11) {
            zuz.Toast.show({ html: "Please input a valid cellphone", time: 5 });
            focus("._phone")
        }
        else if (!userlocationcoordinates) {
            zuz.Toast.show({ html: "Please select your location", time: 5 });
            focus("._location")
        }  
        else {
            let phonearray = cellphone.toString().split("");
            function arrayRemove(arr) { 
              return arr.filter(function(ele,index){ 
                  return index != 0; 
              });
            }
            var result = arrayRemove(phonearray);
            const address = {
                name,
                streetaddress,
                address2,
                //city : 'multan',
                state,
                postalcode,
                cellphone : result.join(""),
                email,
                addresscoordinates: userlocationcoordinates,
                coordinateaddress
            }

            dispatch(updateaddressbook(user, address,props.setnonloginedaddresses))
            dispatch({ type: 'HIDE_Dialogbox', payload: true })
        }
    }
    
    const OpenGoogleMap = (props) => {
        // [Long,Lat]
        const [coords, setcoords] = useState({lat : 71.47052359999999,lng : 30.218847099999998})
        const [foundedlocation,setfoundedlocation] = useState([])
        const {dialog_id} = useSelector((state) => state.generalReducers);
        console.log('dialog id got',dialog_id)
        const findcoordinates = async (val) => {
            Geocode.fromAddress(val).then(
                (response) => {
                  setfoundedlocation(response.results)
                },
                (error) => {
                  //zuz.Toast.show({ html: "Error getting location", time: 5 });
                  console.error(error);
                }
              );
        }

        // setting main coordinates and address by changing coordinates on map and selecting address
        const modifyaddress = (coordinate) => {
            console.log(coordinate)
            setcoords({lat: coordinate.lat,lng : coordinate.lng})
            props.setuserlocationcoordinates({lat: coordinate.lat,lng : coordinate.lng})
            Geocode.fromLatLng(`${coordinate.lat}`, `${coordinate.lng}`).then(
                (response) => {
                  const address = response.results[0].formatted_address;
                  props.setcoordinateaddress(address)
                  setsearch(address)
                },
                (error) => {
                  console.error(error);
                }
              );
        }
        useEffect(() => {
          modifyaddress(coords)
        },[])

        useEffect(() => {
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition((position) => {
                  setcoords({lng: position.coords.longitude,lat : position.coords.latitude})
                   props.setuserlocationcoordinates({lat : position.coords.longitude,lng : position.coords.latitude})
                     Geocode.fromLatLng(`${position.coords.latitude}`, `${position.coords.longitude}`).then(
                    (response) => {
                      const address = response.results[0].formatted_address;
                    },
                    (error) => {
                      console.error(error);
                    }
                  );
                });
              }
        },[]) 
        const [search,setsearch] = useState('')
        return (
            <div className="map-box wrapWidth flex flex-col">
                <div className='blk flex rel aic'>
                    <div className='search-bar flex aic anim' style={{ marginBottom: '10px' }}>
                        <input 
                        value={search}
                        onChange={(e) => {
                            setsearch(e.target.value)
                            findcoordinates(e.target.value)                           
                        }}
                        placeholder={"Search your location"}
                        className="iput font s15 c333" />
                    </div>
                    <button className='button fontl s15'>Save Address</button>  
                    {/* Search Result */}  
                    { foundedlocation.length > 0 &&
                    <div className="rst-option flex flex-col abs">
                        {foundedlocation.map((item) => <button
                        onClick={() => {
                            // selecting address
                            /* setcoords, using on map icon */
                            setcoords({lng : item.geometry.location.lng,lat : item.geometry.location.lat})
                            /* saving in main address */
                            props.setuserlocationcoordinates({lat : item.geometry.location.lat,lng : item.geometry.location.lng})
                            /* saving on search field */
                            setsearch(item.formatted_address)
                             /* saving on main field */
                            props.setcoordinateaddress(item.formatted_address)
                            setfoundedlocation([])
                        }}
                        className="cleanbtn txt font s15 c333">{item.formatted_address}</button>)}
                    </div>
                    }
                </div>

                <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMap coords={coords} modifyaddress={modifyaddress} setuserlocationcoordinates={props.setuserlocationcoordinates}/>
                </div>
            </div>
        )
    }

    const OpenMap = () => {
        dispatch({type : "HIDE_MAPBOX", payload : true})
         Dialog({
            title: "Search you location",
            content: //<Provider store={store}>
           <OpenGoogleMap setcoordinateaddress={setcoordinateaddress} setuserlocationcoordinates={setuserlocationcoordinates}/>,
            //</Provider>,
            confirm: {
                label: "Save Address",
                fnc: () => {dispatch({type : "HIDE_MAPBOX", payload : false})}
            }
        })
    }

    const updatethedamnaddress = (id) => {
        if (!name) {
            zuz.Toast.show({ html: "Please input Fullname", time: 5 });
            focus("._fullname")
        }
        else if(!cellphone) {
            zuz.Toast.show({ html: "Please input cellphone", time: 5 });
            focus("._phone")
        }
        else if (cellphone.length != 11) {
            zuz.Toast.show({ html: "Please input a valid cellphone", time: 5 });
            focus("._phone")
        }
        else if (!userlocationcoordinates) {
            zuz.Toast.show({ html: "Please select your location", time: 5 });
            focus("._location")
        }
        else {
            let phonearray = cellphone.toString().split("");
            function arrayRemove(arr) { 
              return arr.filter(function(ele,index){ 
                  return index != 0; 
              });
          }
          var result = arrayRemove(phonearray);
          
            const address = {
                _id : id,
                name,
                streetaddress,
                address2,
                //city,
                state,
                postalcode,
                cellphone : result.join(""),
                addresscoordinates: userlocationcoordinates,
                coordinateaddress
            }
            dispatch(updateaddressbook(user,address,props.setnonloginedaddresses))
            dispatch({ type: 'HIDE_Dialogbox', payload: true })
        }
    }
    
    //addresscoordinates: {lat: 31.520397, lng: 74.358759}
    return (
        <React.Fragment>
            {/* Edit shipping address */}
            <div className="address-form flex flex-col">

                {props.item ? <React.Fragment>
                    {/* UPDATE ADDRESS */}
                    <div className="item flex flex-col">
                        <input placeholder="name" value={name} className="cleanbtn _fullname iput font s15 c333 anim username" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="item flex flex-col">
                        <input value={streetaddress} className="cleanbtn iput _street font s15 c333 anim username" onChange={e => setstreetaddress(e.target.value)} />
                    </div>
                    {
                    /*
                    <div className="item flex flex-col">
                        <input value={address2} className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setaddress2(e.target.value)} />
                    </div>
                    */
                    }
                    {/* <div className="item flex flex-col">
                        <input value={email}  type="text" placeholder="Email (optional)" className="cleanbtn iput font s15 c333 anim username" onChange={e => setemail(e.target.value === "" ? null : e.target.value)} />
                    </div> */}
                    {/*
                    <div className="item flex flex-col">
                    <input value={city} className="cleanbtn iput _city font s15 c333 anim username" onChange={e => setcity(e.target.value)} />
                    </div>
                    */
                    }
                    { /*  
                    <div className="item flex flex-col">
                        <input value={state} className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setstate(e.target.value)} />
                    </div>
                    <div className="item flex flex-col">
                        <input value={postalcode} className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setpostalcode(e.target.value)} />
                    </div> */ }
                    <div className="item flex flex-col">
                        <input type="number" value={cellphone} className="cleanbtn _phone iput font s15 c333 anim username" onChange={e => setcellphone(e.target.value)} />
                    </div>
                    <button onClick={() => {OpenMap()}} className="cleanbtn item flex flex-col rel">
                            <input disabled type="text" placeholder={userlocationcoordinates ? coordinateaddress ? coordinateaddress : "Location selected" : "No location selected"} onChange={e => {
                            }} className="iput _location rfont s15 c333 anim flex flex-col rel" />
                            <button className="cleanbtn btn icon-map-pin font s22 color abs anim"/>
                    </button> 
                    <button className="button rfont s16 anim"
                        onClick={() =>
                            updatethedamnaddress(props.item._id)
                        }
                    >Update this Address</button>

                </React.Fragment> :
                    <React.Fragment>
                    {/* Create shipping address */}
                        <div className="item flex flex-col">
                            <input placeholder="Full Name" className="cleanbtn _fullname iput font s15 c333 anim username" onChange={e => setName(e.target.value === "" ? null : e.target.value)} />
                        </div>
                        <div className="item flex flex-col">
                            <input placeholder="Street Address" className="cleanbtn _street iput font s15 c333 anim username" onChange={e => setstreetaddress(e.target.value === "" ? null : e.target.value)} />
                        </div>
                        {
                        //<div className="item flex flex-col">
                        //  <input placeholder="Address Line 2 (Optional" className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setaddress2(e.target.value === "" ? null : e.target.value)} />
                        //</div>
                        }
                      
                        {
                        // <div className="item flex flex-col">
                        // <input placeholder="State" className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setstate(e.target.value === "" ? null : e.target.value)} />
                        // </div>
                        }
                        {
                        //    <div className="item flex flex-col">
                        //    <input placeholder="Postal Code" className="cleanbtn iput rfont s15 c333 anim username" onChange={e => setpostalcode(e.target.value === "" ? null : e.target.value)} />
                         //   </div>
                        }    
                      
                        <div className="item flex flex-col">
                            <input type="number" placeholder="0300 0000000" className="cleanbtn _phone iput font s15 c333 anim username" onChange={e => setcellphone(e.target.value === "" ? null : e.target.value)} />
                        </div>
                        {/* <div className="item flex flex-col">
                            <input type="text" placeholder="Email (optional)" className="cleanbtn iput font s15 c333 anim username" onChange={e => setemail(e.target.value === "" ? null : e.target.value)} />
                        </div> */}
                        <button onClick={() => {OpenMap()}}  className="cleanbtn item flex flex-col rel">
                            <input disabled type="text" placeholder={userlocationcoordinates ? coordinateaddress ? coordinateaddress : "Location selected" : "No location selected"} onChange={e => {
                            }} className="_location iput font s15 c333 anim flex flex-col rel" />
                            <button className="cleanbtn btn icon-map-pin font s22 color abs anim"/>
                        </button> 
                        <button className="button submit font s15 b6 anim"
                            onClick={() => addnewaddress()}
                        >Ship to this Address</button> </React.Fragment>}

            </div>
        </React.Fragment>
    );
}

export default ShippingAddressForm;