import React,{useState, useEffect} from 'react';
import ProductCardV from "./ProductCardV";
import Calendar from 'react-calendar';
import {getProductrequest} from '../actions/Admin/productrequest'
import { useDispatch,useSelector } from 'react-redux';

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"
import moment from 'moment'

function ProductRequest() {

    const [products, setProducts] = useState([
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120kg", img: "./images/1.jpg", stamp: "45m", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "670kg", img: "./images/2.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "340 kg", img: "./images/3.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "1000 Qty", img: "./images/4.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120 Dozan", img: "./images/5.png", stamp: "Feb 14, 2020", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "500kg", img: "./images/6.jpg", stamp: "Feb 14, 2020", catagory: "vegetable"},
    ])
    const [dropCata, setDropCata] = useState(false);
    const [cata, setCata] = useState("All"); 
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/",category :  'all'},
        {label: "Vegetables", icon: "icon-eye", slug:"/",category :  'vegetables'},
        {label: "Fruits", icon: "icon-eye", slug:"/",category :  'fruits'}, 
        {label: "Meats", icon: "icon-eye", slug:"/",category :  'meats'},
    ]); 
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [approval,setapproval] = useState('all')
    const [dataloaded,setdataloaded] = useState(false)
    const [thecategory,setthecategory] = useState('all')

    const {loaded,categories} = useSelector(state => state.categoriesandroles)
    useEffect(() => {
        if(loaded)
        {
          let  mycategories = []
          mycategories.push(  {label: "All", icon: "icon-eye", slug:"/", category : 'all'}) 
          categories.map((item) => {
              if(item.status === "Active")
              {
                
                mycategories.push({label: `${item.name}`,icon : "icon-eye", category : `${(item.name).toLowerCase()}`})
              }
          })
          setCatagory(mycategories)
          
        }
      },[loaded])
    useEffect(()=>{
        document.title = "Products Requests";
        window.__setNavTab && window.__setNavTab("/requestproduct"); 
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setShowFrom(false);
            setShowTo(false);
        }); 
    })
    const dispatch = useDispatch()
    useEffect(() => {
        const getdata= async () => {
            const res = await  dispatch(getProductrequest())
            if(res)
            {
              setdataloaded(true)
            }
        }
        getdata()

    },[])
    const filterproducts = () => {
        dispatch(getProductrequest({filter : {category: thecategory, approval, date : {fromDate, toDate}}}))
    }
    const {requestproducts,request_prod_loaded} = useSelector(state => state.adminproductlist)
    
    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="vendor-product-request product-request flex flex-col">
            <div className="title flex aic">
                <div className="ttt rfont s24 b5 black">Products Request</div>
                <div className="filter flex aic">
                     {/*  Selecter Block */}
                     <select value={approval} onChange={(e) => setapproval(e.target.value)} className="cleanbtn cum-select rfont s14 vendor flex aic rel">
                         <option value="all">Filter by approval</option>
                         <option value="pending">Pending</option>
                         <option value="accepted">Approved</option>
                         <option value="rejected">Rejected</option>
                     </select>
                    {/* Catagory Selecter Block */}
                  
                    <button className="cleanbtn cum-select vendor flex aic rel" onClick={(e)=>{
                        e.stopPropagation();
                        setDropCata(!dropCata); 
                        setShowFrom(false);
                        setShowTo(false);
                    }}>
                        { 
                            catagory.map(item=>(
                                cata == item.label && <div className="feild flex aic">
                                    <div className={`ico font s17 flex aic cfff  ${item.icon} ${item.label}`} />           
                                    <div className="txt rfont s16 black">{item.label}</div>
                                    <div className={`arrow s18 c777 anim ${dropCata == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                </div>
                            ))
                        }
                        {dropCata && <div className="options flex flex-col abs">
                                {
                                    catagory.map(item=>(
                                        <button className="cleanbtn item flex aic anim" onClick={()=>{
                                            setDropCata(!dropCata);
                                            setCata(item.label);
                                            setthecategory(item.category)
                                        }}>
                                            <div className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}/>            
                                            <div className="txt rfont s16 black">{item.label}</div> 
                                        </button> 
                                    ))
                                }
                            </div> 
                        }
                    </button>
                    
                    {/* From Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowFrom(!showFrom);
                        setShowTo(false);
                        setDropCata(false);
                    }}>
                        <p className="rfont s14 c777">{fromDate ?  moment(fromDate).format('MMMM Do YYYY') : 'From' }</p>  
                        {showFrom && <div className="custom-calander abs" onClick={(e)=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>setFromDate(date)}
                                value={fromDate} 
                            />
                        </div>}
                    </button>
             
                    {/* To Date Block */}
                    <button className="cleanbtn date-box rel" onClick={(e)=>{
                        e.stopPropagation();
                        setShowTo(!showTo);
                        setShowFrom(false);
                        setDropCata(false);
                    }}>
                        <p className="rfont s14 c777">{toDate ?  moment(toDate).format('MMMM Do YYYY') : 'To' }</p> 
                        {showTo && <div className="custom-calander abs" onClick={e=>e.stopPropagation()}>
                            <Calendar
                                onChange={(date)=>setToDate(date)}
                                value={toDate} 
                            />
                        </div>}
                    </button>
                    <button onClick={() => filterproducts()} className="button search-date rfont s16 anim">Search</button>
                </div>
            </div>
            <div className="wrapper flex flex-col">
                {
                    dataloaded && request_prod_loaded ? 
                    requestproducts.length > 0 ?
                        <div className="items flex flex-col"> 
                            {
                                requestproducts.map(item=>(
                                    <ProductCardV  data={item} productRequest={true}/>
                                ))           
                            }
                        </div>
                    :
                    <div className="empty-page orders flex flex-col"> 
                        <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                        <div className="meta flex flex-col aic">
                            <div className="txt fontr s18 c000">Products Request section is empty!</div>
                        </div>
                    </div> 
                    : 
                    <div className="items flex flex-col">
                        <div className="product-card-v holder" />
                        <div className="product-card-v holder" />
                        <div className="product-card-v holder" />
                        <div className="product-card-v holder" />
                    </div>
                }
            </div>   
        </div> 
    ); 
}

export default ProductRequest;