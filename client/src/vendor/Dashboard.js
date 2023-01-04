import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import $ from "jquery";
import 'slick-carousel/slick/slick';
import moment from 'moment'
import Slider from "react-slick"; 

// Screen
import ProductCard from "../screen/sub/ProductCard";
import ProductCardV from "./ProductCardV";
// Actions
import {getdashboarddata} from '../actions/Admin/admindashboard'
import {useDispatch,useSelector} from 'react-redux'
function Dashboard(props) { 
    const dispatch = useDispatch()
    const {loaded,details} = useSelector(state => state.dashboarddata)
    const {user} = useSelector(state => state.authreducer)
    const theuser = useSelector(state => state.authreducer)
    const [popular, SetPopular] = useState([
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "China Lehsan", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},        
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},  
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},     
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "China Lehsan", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},        
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},  
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"}, 
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "China Lehsan", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},        
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},  
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},      
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "China Lehsan", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/4.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/3.jpg"},        
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},  
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},                    
    ]);
 
    const [activeOrder, setActiveOrder] = useState([
        {name: "Zain Ali", discrp: "3 items Ordered", slug: "/orders", stamp: "45m", dp: "https://placeimg.com/640/480/people?12"},
        {name: "Muhammad Amir", discrp: "6 items Ordered", slug: "/orders", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?14"},
        {name: "Qasim Ali", discrp: "1 items Ordered", slug: "/orders", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?15"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "2 items Ordered", slug: "/orders", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
    ]);
    
    const [recentRequest, setrecentRequest] = useState([
        {name: "Zain Ali", discrp: "waiting your response", slug: "/request-order", stamp: "45m", dp: "https://placeimg.com/640/480/people?12"},
        {name: "Muhammad Amir", discrp: "waiting your response", slug: "/request-order", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?14"},
        {name: "Qasim Ali", discrp: "waiting your response", slug: "/request-order", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?15"},
        {name: "Ahmad Bashir", discrp: "waiting your response", slug: "/request-order", stamp: "1 hour", dp: "https://placeimg.com/640/480/people?17"},
        {name: "Ahmad Bashir", discrp: "waiting your response", slug: "/request-order", stamp: "2 hour", dp: "https://placeimg.com/640/480/people?17"},
    ]);

    const [overview, setOVerView] = useState([
        {label: "Products Sold", icon: "icon-shopping-cart", percent: "83%"},
        {label: "New Customer", icon: "icon-user-plus", percent: "50%"},
        {label: "Customer Satisfaction", icon: "icon-heart1", percent: "70%"},
    ]);

    const [products, setProducts] = useState([
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120kg", img: "./images/1.jpg", stamp: "45m", catagory: "vegetable"},
        {ID: "2", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "670kg", img: "./images/2.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "3", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "340 kg", img: "./images/3.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "4", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "1000 Qty", img: "./images/4.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "5", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120 Dozan", img: "./images/5.png", stamp: "Feb 14, 2020", catagory: "vegetable"},
        {ID: "6", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "500kg", img: "./images/6.jpg", stamp: "Feb 14, 2020", catagory: "vegetable"},
    ]); 
    const [dashboardloaded,setdashboarloaded] = useState(false)
    useEffect(()=>{
        document.title = "Dashboard";
        window.__setNavTab && window.__setNavTab("/dashboard"); 

        const getdata = async () => {
            const res = await  dispatch(getdashboarddata()) 
            if(res)
            {
              setdashboarloaded(true)
            }
        }
        getdata()
    },[])
  
    const topSaledSlides = {
        dots: false, 
        infinite: false, 
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4   
    } 
 
    return (
        <div className="dashboard flex">
           {dashboardloaded ?  
           <React.Fragment>
            <div className="content flex flex-col">
                {/* OverView Block */}
                {theuser.loaded ? user.role === 'admin' &&
                <div className="overview flex flex-col">
                    <div className="title rfont s20 b5 black">OverView</div>
                    <div className="items flex aic">
                        {
                          //  overview.map(item=>(
                              <React.Fragment>
                                <div className="item flex aic">
                                    <div className={`ico s24 icon-shopping-cart`} />
                                    <div className="meta flex flex-col">
                                        <div className="num rfont s22 cfff">{details.totalvendor}</div>
                                        <div className="txt font s15 cfff">Total Venders</div>
                                    </div>
                                </div>
                                <div className="item flex aic">
                                <div className={`ico s24 icon-user-plus`} />
                                <div className="meta flex flex-col">
                                    <div className="num rfont s22 cfff">{details.totaluser}</div>
                                    <div className="txt font s15 cfff">Total Customers</div>
                                </div>
                            </div>
                            <div className="item flex aic">
                            <div className={`ico s24 icon-heart1`} />
                            <div className="meta flex flex-col">
                                <div className="num rfont s22 cfff">{details.activeproducts}</div>
                                <div className="txt font s15 cfff">Active Products</div>
                            </div>
                           </div>
                           </React.Fragment>
                          //  ))
                        }
                    </div>
                </div>
                : ''}

                {/* Top Saled Product */}
                {/* topsaledpopulate , vendor true = dont display hear and product details */ }
                {details.topsaledpopulate &&
                <React.Fragment>
                {details.topsaledpopulate.length > 0 &&
                <div className="top-rate flex flex-col">
                    <div className="title rfont s20 b5 black">Top Saled Products</div>
                       <React.Fragment> 
                        <div className="top-saling flex aic"> 
                            <Slider {...topSaledSlides}>
                                {   details.topsaledpopulate.map((item,index)=>(
                                        <ProductCard key={index} data={item._id} vendor={true}/> 
                                    )) 
                                }
                            </Slider>
                        </div>
                        </React.Fragment>
                </div>
                }
                </React.Fragment>
                }

                {/* Last Week Uploaded */}
                {details.lastweekuploaded &&
                    <React.Fragment>
                        {details.lastweekuploaded.length > 0 &&
                        <div className="block"> 
                            <div className="title rfont s20 b5 black">Last Week Uploaded</div>
                            <div className="items flex flex-col">
                            {
                                details.lastweekuploaded.map((item,index)=>(
                                    <ProductCardV key={index} data={{productId:item}} lastweekuploaded={true}/> 
                                ))
                            }
                            </div>
                        </div>
                        }
                    </React.Fragment>
                }
            </div> 
           
            {/* Right Side */}
            <div className="rightbar">
                {/* Recent Request */}
                {
                theuser.loaded ? user.role === 'admin' &&
                <React.Fragment>
                {details.productrequests && details.productrequests.length > 0 &&
                <div className="contex"> 
                    <div className="label rfont s18 b5 black">Product Stock Request</div>
                    <div className="items flex flex-col">
                        {
                            details.productrequests.map((item,index)=>(
                                <Link key={index} to={"/requestproduct"} className="item flex aic">
                                    <div className="dp"> 
                                        <div className="img" style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${item.vendorId.media})`}} />
                                    </div>
                                    <div className="meta flex flex-col">
                                        <div className="tit rfont s14 b6 black">{item.vendorId.username}</div>
                                        <div className="stamp rfont s13 c999">{moment(item.createdAt).calendar()}</div>
                                        <div className="txt rfont s13 c999">{'waiting for your response'}</div>
                                    </div> 
                                </Link>
                            ))
                        }
                    </div>
                </div>
                }
                </React.Fragment>
                : ''}
                
                {/* Recent Request */}
                {details.recentrequest && details.recentrequest.length > 0 &&
                <div className="contex"> 
                    <div className="label rfont s18 b5 black">Recent Request</div>
                    <div className="items flex flex-col">
                        {
                            details.recentrequest.map((item,index)=>(
                                <Link key={index} to={"/orders"} className="item flex aic">
                                    <div className="dp"> 
                                        <div className="img" style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${item.userId.media})`}} />
                                    </div>
                                    <div className="meta flex flex-col">
                                        <div className="tit rfont s14 b6 black">{item.userId.username}</div>
                                        <div className="stamp rfont s13 c999">{moment(item.createdAt).calendar()}</div>
                                        <div className="txt rfont s13 c000">{'Waiting for your response'}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                 }
                {/* Active Orders */}
                {details.activeorders && details.activeorders.length > 0 &&
                <div className="contex"> 
                    <div className="label rfont s18 b5 black">Active Orders</div>
                    <div className="items flex flex-col">
                        {
                            details.activeorders.map((item,index)=> {
                                let totalitem = 0;
                                item.orderItems.map((item) => {
                                    
                                    totalitem = totalitem + item.qty
                                })
                              return  <Link key={index} to={item.slug} className="item flex aic">
                                    <div className="dp">
                                        <div className="img" style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${item.userId.media})`}} />
                                    </div>
                                    <div className="meta flex flex-col">
                                        <div className="tit rfont s14 b6 black">{item.userId.username}</div>
                                        <div className="stamp rfont s13 c999">{moment(item.createdAt).calendar()}</div>
                                        <div className="txt rfont s14 c000">{`${totalitem} items`}</div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
                 }
                        
            </div>
            </React.Fragment>
           : 
           <React.Fragment>
            <div className="content flex flex-col">
                <div className="overview flex flex-col">
                    <div className="items flex aic">
                        <div className="item holder flex aic" />
                        <div className="item holder flex aic" />
                        <div className="item holder flex aic" />
                    </div>
                </div>
                <div className="top-rate flex flex-col">
                    <div class="loading flex">
                        <div className="holder" />
                        <div className="holder" />
                        <div className="holder" />
                        <div className="holder" />
                    </div> 
                </div> 
                <div className="block placeholder">
                    <div className="items holder" />
                    <div className="items holder" />
                    <div className="items holder" />
                </div>
            </div>
            <div class="rightbar">
                <div className="contex holder"></div>
                <div className="contex holder"></div>
            </div>
           </React.Fragment>
           }
        </div>
    );
} 
 
export default Dashboard;