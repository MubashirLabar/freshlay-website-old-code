import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

// Screen
import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./sub/ProductCard";
import NewProductCard from './sub/NewProductCard'
import {connect,useDispatch,useSelector} from 'react-redux'
function Wishlist() {
    const theuser = useSelector((state) => state.authreducer);
    const { loaded, user,wishlist } = theuser;
    const [empty, setEmpty] = useState(false); 
    const [dropCata, setDropCata] = useState(false);
    const [dropPrice, setDropPrice] = useState(false);
    const [dropSort, setDropSort] = useState(false);
    const [cata, setCata] = useState("All"); 
    const [sort, setSort] = useState("Default sorting"); 
 
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/"},
        {label: "Vegetables", icon: "icon-eye", slug:"/"},
        {label: "Fruits", icon: "icon-eye", slug:"/"}, 
        {label: "Meats", icon: "icon-eye", slug:"/"},
    ]);
    const [popular, SetPopular] = useState([
        {label_en: "White Potato", label_ur: "سفید آلو", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/6.jpg"},
        {label_en: "Fresh Lehsan China", label_ur: "تازہ لہسن چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/1.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/2.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/3.jpg"},
        {label_en: "Ginger China", label_ur: "ادرک چین", currentPrice: "80", orignalPrice: "150", slug:"/product", media: "./images/2.jpg"},                                         
        {label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی", currentPrice: "80", orignalPrice: "150",  slug:"/product", media: "./images/5.png"},
    ]);  
    const [sortItems, setSortItems] = useState([
        {label: "Default sorting", slug:"/"},
        {label: "Sort by average rating", slug:"/"},
        {label: "Sort by latest", slug:"/"},
        {label: "Price: low to high", slug:"/"},
        {label: "Price: high to low", slug:"/"}, 
    ])

    useEffect(()=>{
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setDropPrice(false);
            setDropSort(false);
        }) 
    },[]);


    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const mywishlist = () =>{
        return (
            <React.Fragment>
                <Header/>
                <div className="wishlist-page wrapWidth">
                    {/* Page Header */}
                    <div className="hdr flex aic"> 
                        <div className="title font b6 s24 black">Wish List</div>
                        <div className="filters flex aic">
                            {/* Catagory Selecter Block 
                            <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                e.stopPropagation();
                                setDropCata(!dropCata); 
                                setDropPrice(false);
                                setDropSort(false);
                            }}>
                                { 
                                    catagory.map(item=>(
                                        cata == item.label && <div className="flex aic">
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
                                                }}>
                                                    <div className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}/>            
                                                    <div className="txt rfont s16 black">{item.label}</div> 
                                                </button> 
                                            ))
                                        }
                                    </div> 
                                }
                            </button>*/}
                                
                            {/* Pricing Selecter Block 
                            <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                e.stopPropagation();
                                setDropPrice(!dropPrice);
                                setDropCata(false);
                                setDropSort(false);
                            }}>
                                <div className="flex aic">          
                                    <div className="txt rfont s16 black">Any price</div>
                                    <div className={`arrow s18 c777 anim ${dropPrice == true ? "icon-chevron-up" : "icon-chevron-down"}`} />
                                </div> 
                                {dropPrice && 
                                    <div className="options flex flex-col abs" onClick={(e)=>{ e.stopPropagation()}}>
                                        <div className="range flex aic">
                                            <input type="text" placeholder="Min" className="rput rfont s16 c333" />
                                            <input type="text" placeholder="Max" className="rput rfont s16 c333" />
                                        </div>
                                        <button className="button btn font s15 b6 anim" onClick={e=>{setDropPrice(false)}}>Apply</button> 
                                    </div>   
                                }
                            </button> */}
                        
                            {/* Sort Selecter Block 
                            <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                e.stopPropagation();
                                setDropSort(!dropSort);
                                setDropCata(false); 
                                setDropPrice(false);
                            }}> 
                                { 
                                    sortItems.map(item=>(
                                        sort == item.label && <div className="flex aic">          
                                            <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropSort == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                        </div>
                                    ))
                                }
                                {dropSort && <div className="options sort flex flex-col abs">
                                        {
                                            sortItems.map(item=>(
                                                <button className="cleanbtn item flex aic anim" onClick={()=>{
                                                    setDropSort(!dropSort);
                                                    setSort(item.label);
                                                }}>         
                                                    <div className="txt rfont s16 black">{item.label}</div> 
                                                </button> 
                                            ))
                                        } 
                                    </div> 
                                }
                            </button> */}
                        </div> 
                    </div> 
                
                    {/* Wish List Products */}
                    <div className="multi-prdt-wrap flex flex-col wrapWidth">
                        <div className="search-items"> 
                            {
                              loaded ? 
                              wishlist.map(item=>( 
                                    <NewProductCard data={item}/>   
                                ))
                                : <div>Loading</div>
                            } 
                        </div>  
                        {/*<div className="more flex aic">
                            <button className="button font s15 b">Load more</button> 
                        </div>*/}
                    </div> 
                </div>  
                <Footer/>
            </React.Fragment> 
        );
    }

    const emptyWishlist = () =>{
        return(
            <React.Fragment>
                <Header />
                <div className="list-emt empty-page flex flex-col"> 
                    <Lottie options={_emptyPage_} width={300}/>
                    <div className="meta flex flex-col aic">
                        <div className="txt font s18 b6 c000">Opps! Your Wish list is vacant.</div>
                        <div className="txt font s15 c000">You need Wish list to add Products here</div>
                        <Link to="/" className="button txt font s15 cfff anim">Discover Products</Link>
                    </div>
                </div> 
                <Footer />
            </React.Fragment> 
        )
    }

    return wishlist.length > 0 ? mywishlist() : emptyWishlist();
}

export default Wishlist;