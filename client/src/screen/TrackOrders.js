import React, {useState,useEffect, useRef} from 'react';
import {Link} from "react-router-dom"
import Lottie from 'react-lottie';
import * as trackOrder from "../lottie/trackOrder.json"
import * as clock from "../lottie/clock.json"
import * as emptyPage from "../lottie/emptyPage.json"
// Screen
import axios from 'axios' 
import Header from "./Header"; 
//import io from 'socket.io-client' 
import Footer from "./Footer"; 
import 'mapbox-gl/dist/mapbox-gl.css';  
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Marker,Feature, Layer,ScaleControl,ZoomControl,RotationControl } from "react-mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
//import { duration } from 'moment';

let Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

function TrackOrders(props) {
  //[-122.48369693756104, 37.83381888486939], [-122.49378204345702, 37.83368330777276]
  const [time,settime] = useState('')   
  const [distance,setdistance] = useState('')
  const [riderlocation,setriderlocation] = useState('')
  const [destination,setdestination] = useState('')
  const [geojson,setgeojson] = useState('')
  const [riderinfo,setriderinfo] = useState('')
  const [riderstarted,setriderstarted] = useState('')
  const [loaded,setloaded] = useState(false)
  const [orderexist,setorderexist] = useState(false)
  const [orderid,setorderid] = useState('')
  const [myorderstatus,setmyorderstatus] = useState('')
  const [orderdeliverytype,setorderdeliverytype] = useState('')

  const _trackOrder_ = {
    loop: true,
    autoplay: true, 
    animationData: trackOrder.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const _clock_ = {
    loop: true,
    autoplay: true, 
    animationData: clock.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const _emptyPage_ = {
    loop: true,
    autoplay: true, 
    animationData: emptyPage.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

 {/*if order exist connect with socket */} 
  useEffect(() => {
    if(orderexist)
    { 
    const connectwithsocket = () => {
      let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`); 
        ws.addEventListener('message', function (data) {
        const thedata = JSON.parse(JSON.parse(data.data))
         if(thedata.type === 'riderlocation')
          { 
            const {orderdetails} = thedata
            if(orderdetails.orderid === orderid)
            {
                setriderlocation({longitude:orderdetails.riderlocation.longitude, latitude : orderdetails.riderlocation.latitude})
                setriderstarted(true)
              }
          }   
        });
        ws.onclose = function(){
            console.log('disconneted')
            setTimeout(function(){connectwithsocket()}, 5000);
        };
    }
    connectwithsocket()
  } 
},[orderid,orderexist])
  
  useEffect(() => {
     {/*Get order details loading page first time */}
    const getorder = async () => {
      const data = await axios.get(`${process.env.REACT_APP_API_URL}/order/getuseractiveorder`); 
      const {order,orderstatus} = data.data
      //console.log(order)
      if(order.length === 0)
      {    
        setorderexist(false)
        setloaded(true)
      
      }
      else{
          setmyorderstatus(orderstatus)
          setorderdeliverytype(order[0].deliverytype)
          if(!(order[0].riderlocation))
          {
            setorderexist(true)
            setloaded(true)
            setorderid(order[0]._id)
            if(order[0].orderlocation.address)
            {
              // set destination
              setdestination(order[0].orderlocation.address.addresscoordinates)
            }
            else if(order[0].orderlocation.addressincoords)
            {
              setdestination(order[0].orderlocation.addressincoords)
            }
          }
          else 
          {
          
              if(order[0].orderlocation.address)
            {
              // set destination
              setdestination(order[0].orderlocation.address.addresscoordinates)
            }
            else if(order[0].orderlocation.addressincoords)
            {
              setdestination(order[0].orderlocation.addressincoords)
            }
            setriderinfo(order[0].riderId)
            setorderid(order[0]._id)
            setriderlocation(order[0].riderlocation)
            setorderexist(true)
            setriderstarted(true)
            setloaded(true)
          }
      }
   }
    getorder()
  },[])

    {/*if rider location changes get new data */}
  useEffect(() => {
    if(orderexist)
    {
      const getdata = async () => {
       try {
        const data = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${riderlocation.longitude},${riderlocation.latitude};${destination.lng},${destination.lat},?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoiYWhhZGciLCJhIjoiY2tqMXZkNHFkMjdxcTJxcnc5MTl5NjdqMCJ9.i10iuEH6qU2ucz-1FS22xg`);
         settime(data.data.routes[0].duration)
         setdistance(data.data.routes[0].distance)
         setgeojson(data.data.routes[0].geometry.coordinates)
       } catch (error) {
         //console.log(error.response)
       }
      }
      getdata()
    }
  },[riderlocation,loaded])

  useEffect(() => {
    document.title = "Track Orders";
  })

    const lineLayout = {
      'line-cap' : 'square', 
      'line-join': 'round',
      
    }
    const linePaint = {
      'line-color': '#2f9a14',
        'line-width': 8,
        'line-opacity' : 0.8
    }
    const circlepaint = {
      'circle-radius' : 10,
      'circle-color' : '#18A753',
      'circle-opacity' : 0.8
    }

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    
    return (
        <React.Fragment>
            <Header />
            {loaded ? 
            orderexist ? 
            riderstarted ? 
            <Map
            center= {[riderlocation.longitude ? riderlocation.longitude : 71.5249 ,riderlocation.latitude ? riderlocation.latitude : 30.1575]}
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: '100vh',
                  width: '100vw',
                }}
                zoom={[13]}
              >
                <div className="sidebar" >
              Distance Remaining : {(distance/1000).toFixed(2)} km | Estimated Time: {Math.floor(time/60)} Min
              </div>
                <ScaleControl />
                <ZoomControl />
                <RotationControl style={{top : 80}} />
              
                <Layer  type="line" layout={lineLayout} paint={linePaint} geometry={'kl|eFbrqjVuC~Ew@^cABo@Qk@k@yBaFkAkA_Bg@uCFGr@eB~B}@dCw@dG{Qpo@MnANx@fDfGzCdIdExEtD`Cv@fAtGfK`AtEtAs@bBiE@cFk@iAqBaAKs@hCcJ[s@c@E{Bb@o@McAoCyAcAGiAPYf@IbCrC`@LjAKbDsEtCwCv@_@|BWVDPSKyAO^'}>
                <Feature coordinates={  geojson} />
                </Layer>
              
                
               <Layer type="circle" paint={circlepaint}>
              
               <Feature coordinates={[ riderlocation.longitude,riderlocation.latitude]}/> 
               {
               //<Feature coordinates={[ destination.lng,destination.lat]}/> 
               }
              
               </Layer>
                <Marker
                  coordinates={[ destination.lng,destination.lat]}
                  anchor="bottom">
                 { 
                   <img 
                   style={{width : '30px',height : '30px',borderRadius: '15px'}}
                  src={'/images/location2.png'}/> 
                 } 
                </Marker>
              
              </Map>
              :
              <div>
              { 
                myorderstatus === "accepted" ?
                 <div className="track-order">
                    <div className="response flex flex-col aic">
                      <div className="vector"><Lottie options={_trackOrder_} width={450}/></div> 
                      <div className="txt tit font s22 c000">Please wait for rider the response.</div>
                      <div className="txt font s15 c333">Once the rider set the current location, then you can track your order.</div>
                    </div>     
                 </div> 
                 :
                  <div className="track-order">
                    <div className="response flex flex-col aic">
                      <div className="vector"><Lottie options={_trackOrder_} width={450}/></div> 
                      <div className="txt tit font s22 c000">Please wait for vendor to accept your order</div>
                      <div className="txt font s15 c333">Please be patient.vendor will response to your order in a minute</div>
                    </div>     
                  </div> 
              }
              </div>
              : 
                 <div className="track-order">
                    <div className="empty-page flex flex-col"> 
                      <Lottie options={_emptyPage_} width={300}/>
                      <div className="meta flex flex-col aic">
                          <div className="txt font s18 b6 c000">Opps! Following page is empty</div>
                          <div className="txt font s15 c000">It would appear because you need to buy a few products</div>
                          <Link to="/" className="button txt font s15 cfff anim">Purchase Now</Link>
                      </div>
                    </div> 
                 </div>
                
              : 
              <div className="track-order rel ">
                <div className="cover flex aic abs fill">
                  <img src="/images/loader.svg" className="img" />
                </div> 
              </div> 
              }
            <Footer />  
        </React.Fragment>    
    ); 
}

export default TrackOrders;