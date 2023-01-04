import React,{useState, useEffect} from 'react';
import {Dialog} from "../core";
import {useDispatch,useSelector} from 'react-redux';
import {AdminProductlist} from '../actions/Admin/adminProduct'
 
function PriceList(props) { 
    
    const [prices, setPrices] = useState([
        {id: "1", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "12"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {id: "2", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "0"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {id: "3", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "0"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {id: "1", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "0"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {id: "1", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "5"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {id: "1", product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "kg", price: "80", discout: "8"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    ]); 
    const [dropCata, setDropCata] = useState(false);
    const [dropSort, setDropSort] = useState(false);
    const [dropfilter,setDropFilter] = useState(false)
    const [cata, setCata] = useState("All"); 
    const [sort, setSort] = useState("Default sorting"); 
    const [status, setstatus]   = useState('Default status')

    //filter data
    const [productsorting,setproductsorting] = useState(null)
    const [productfilter, setproductfilter] = useState(null)
    const [productstatus, setproductstatus] = useState(null)

    const [filter,setfilter] = useState([
        {label: 'Default status', slug:"/",filter :  null},
        {label: "active", slug:"/", filter : {status : 'active'}},
        {label: "inactive", slug:"/", filter : {status : 'inactive'}}  
    ])
    const [sortItems, setSortItems] = useState([
        {label: "Default sorting", slug:"/", sorting : null},
        {label: "Price: low to high", slug:"/",  sorting : {
            orignalPrice : '1' }},
        {label: "Price: high to low", slug:"/", sorting : {
            orignalPrice : '-1'}}, 
    ]);
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/", thecategory : null },
        {label: "Vegetables", icon: "icon-eye", slug:"/", thecategory : { category : 'vegetables'}},
        {label: "Fruits", icon: "icon-eye", slug:"/",  thecategory : { category : 'fruits'}}, 
        {label: "Meats", icon: "icon-eye", slug:"/",  thecategory : { category : 'meats'}},
    ]);
    
    useEffect(()=>{
        document.title = "Price-List";
        window.__setNavTab && window.__setNavTab("/price-list");
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setDropSort(false);
            setDropFilter(false)
        }); 
       
    }); 
    useEffect(() => {

        dispatch(AdminProductlist(
         {filterproduct : {
            category : productfilter,
            sorting : productsorting,
            status : productstatus
        }}))
    },[cata,sort,status])
    const {loaded,products} = useSelector(state => state.adminproductlist)
    //console.log(loaded)
    const dispatch = useDispatch();
  

    {/* Edit Price */}
    const _editPrice = () => {
        Dialog({
            title: "Edit Price",
            content: <div className="confirm-blk flex flex-col s15 c333">
                    <div className="content">
                        <div className="add-scale-form">
                            <div className="item flex flex-col">
                                <div className="lbl rfont s15 c333">Price<span className="astarick">&#42;</span></div> 
                                <input type="number" className="iput rfont s15 c333 anim" />
                            </div>
                            <div className="item flex flex-col">
                                <div className="lbl rfont s15 c333">Discout (Optional)</div> 
                                <input type="number" className="iput rfont s15 c333 anim" />
                            </div>
                        </div> 
                    </div>
                </div>,
            confirm:{
                label: "Update",
                fnc: () => {
                    console.log("Confirm button Click")
                }
            }       
        })
    }
    
    return (
        <div className="table-list-p price-list flex flex-col">
            <div className="head flex aic">  
                <div className="left rfont b5 s24 black">Price List</div>
                <div className="rig flex aic">
                    {/* Catagory Selecter Block */}
                    <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                            e.stopPropagation();
                            setDropCata(!dropCata); 
                            setDropFilter(false)
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
                                                    setproductfilter(item.thecategory)
                                               }}>
                                                    <div className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}/>            
                                                    <div className="txt rfont s16 black">{item.label}</div> 
                                                </button> 
                                            ))
                                        }
                                    </div> 
                                }
                        </button>
                        {/*filter selector*/}
                        <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                            e.stopPropagation();
                            setDropFilter(!dropfilter)
                            setDropCata(false); 
                            setDropSort(false);
                        }}>
                                { 
                                    filter.map(item=>(
                                        status === item.label && <div className="flex aic">
                                             <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropfilter == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                        </div>
                                    ))
                                }
                                {dropfilter && <div className="options sort flex flex-col abs">
                                        {
                                            filter.map(item=>(
                                                <button className="cleanbtn item flex aic anim" onClick={()=>{
                                                    setDropFilter(!dropSort);
                                                    setstatus(item.label);
                                                    setproductstatus(item.filter)
                                                }}>         
                                                    <div className="txt rfont s16 black">{item.label}</div> 
                                                </button> 
                                            ))
                                        } 
                                    </div> 
                                }
                        </button>

                    {/* Sort Selecter Block */}
                    <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                e.stopPropagation();
                                setDropSort(!dropSort);
                                setDropFilter(false)
                                setDropCata(false); 
                                //setSort()
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
                                                    setproductsorting(item.sorting);
                                                }}>         
                                                    <div className="txt rfont s16 black">{item.label}</div> 
                                                </button> 
                                            ))
                                        } 
                                    </div> 
                                }
                            </button>
                </div>
            </div>
            <div className="content flex flex-col">
                <div className="table flex flex-col">
                    <div className="hdr flex aic"> 
                        <div className="col rfont s15 b6 c333">Sr #</div>
                        <div className="col rfont s15 b6 c333">Product ID</div>
                        <div className="col rfont s15 b6 c333">Product Name</div>
                        <div className="col rfont s15 b6 c333">Unit</div>
                        <div className="col rfont s15 b6 c333">Price</div>
                        <div className="col rfont s15 b6 c333">Discount</div> 
                        <div className="col rfont s15 b6 c333">Current Price</div> 
                        <div className="col rfont s15 b6 c333">Actions</div>  
                    </div>
                    {  
                        //prices.length > 0 ? 
                       loaded ? 
                         products.length > 0 ?  
                        products.map((item,index)=>(
                                    <div id={item.id} className="row flex aic anim">
                                        <div className="col rfont s14">{index}</div>
                                        <div className="col rfont s14">{item.prod_id}</div>
                                        <div className="col rfont s14">
                                            <div className="flex flex-col aic">
                                                <div className="nam">{item.label_en}</div>
                                                <div className="nam">{item.label_ur[0].value}</div>   
                                            </div>
                                        </div>
                                        <div className="col rfont s14">{item.symbol}</div>
                                        <div className="col rfont s14 flex aic">{item.currentPrice}</div>
                                        <div className="col rfont s14 flex aic">{item.orignalPrice - item.currentPrice}</div>
                                        <div className="col rfont s14 flex aic">{item.orignalPrice}</div>
                                        <div className="col flex aic">   
                                            <button onClick={()=>_editPrice()} className="btn rfont s14 cfff">Edit Price</button>
                                        </div>  
                                    </div>
                                ))
                            : 
                            <div className="empty-orders flex flex-col">
                                <img src={"/images/empty-orderbook.svg"} className="img" />
                                <div className="lbl font s16 b6 c777">Opps! Prices Book is Empty</div>
                            </div>
                            : <div>Loading</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default PriceList;