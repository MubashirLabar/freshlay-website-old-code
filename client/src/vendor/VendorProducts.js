import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

// Screen
import VendorProductsAll from "./VendorProductsAll" 
import VendorProductsCreate from "./VendorProductsCreate"
import VendorProductsOnBoard from "./VendorProductsOnBoard"
import VendorProductsEdit from './VendorProductsEdit'
import {useDispatch,useSelector} from 'react-redux';
import {AdminProductlist} from '../actions/Admin/adminProduct'

function VendorProducts(props) { 
   
    let section = props.match.params.section || "all-products";
    let productid = props.match.params.id
    const [allproducts, setProducts] = useState([
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120kg", img: "./images/1.jpg", stamp: "45m", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "670kg", img: "./images/2.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "340 kg", img: "./images/3.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "1000 Qty", img: "./images/4.jpg", stamp: "3 hour", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "120 Dozan", img: "./images/5.png", stamp: "Feb 14, 2020", catagory: "vegetable"},
        {ID: "1", label_en: "White Potato", label_ur: "سفید آلو", discrip: "Alo Safed 500gm( White Potato)", oldPrice: "75", newPrice: "70", unit:"1kg", stock: "500kg", img: "./images/6.jpg", stamp: "Feb 14, 2020", catagory: "vegetable"},
    ])
    const [dropCata, setDropCata] = useState(false);
    const [dropSort, setDropSort] = useState(false);
    const [dropfilter,setDropFilter] = useState(false)
    const [cata, setCata] = useState("All"); 
    const [sort, setSort] = useState("Default sorting"); 
    const [status, setstatus]   = useState('Default status')
    const [reload,setreload] = useState(false)

    //filter data
    const [productsorting,setproductsorting] = useState(null)
    const [productfilter, setproductfilter] = useState('all')
    const [productstatus, setproductstatus] = useState('all')

    const [filter,setfilter] = useState([
        {label: 'Default status', slug:"/",filter :  "all"},
        {label: "active", slug:"/", filter :  'active'},
        {label: "inactive", slug:"/", filter :  'inactive'}  
    ])
    const [sortItems, setSortItems] = useState([
        {label: "Default sorting", slug:"/", sorting : null},
        {label: "Price: low to high", slug:"/",  sorting : {
            price : '1' }},
        {label: "Price: high to low", slug:"/", sorting : {
            price : '-1'}}, 
    ]);
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/", thecategory : 'all' },
        {label: "Vegetables", icon: "icon-eye", slug:"/", thecategory : 'vegetables'},
        {label: "Fruits", icon: "icon-eye", slug:"/",  thecategory :  'fruits'}, 
        {label: "Meats", icon: "icon-eye", slug:"/",  thecategory   : 'meats'},
    ]);
    const {loaded,products} = useSelector(state => state.adminproductlist)
    const { user } = useSelector((state) => state.authreducer);
    const [dataloaded,setdataloaded] = useState(false)
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.categoriesandroles)
   
    useEffect(() => {
          let  mycategories = []
          mycategories.push(  {label: "All", icon: "icon-eye", slug:"/", thecategory : 'all'}) 
          categories.map((item) => {
              if(item.status === "Active")
              {   
                mycategories.push({label: `${item.name}`,icon : "icon-eye", thecategory : `${(item.name).toLowerCase()}`})
              }
          })
          setCatagory(mycategories)
    },[])
    
    useEffect(() => {
        const getdata= async () => {
            const res = await dispatch(AdminProductlist(
                {filterproduct : {
                   category : productfilter,
                   sorting : productsorting,
                   status : productstatus
               }}))
            if(res)
            {
              setdataloaded(true)
            }
        }
        getdata() 
        
    },[cata,sort,status,reload])

    useEffect(()=>{
        document.title = "Products"; 
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/products");
        document.body.addEventListener("click", ()=>{
            setDropCata(false);
            setDropSort(false);
        }); 
    },[]); 
   
    return (
        <div className="table-list-p vendor-products flex flex-col">
            <div className="page-title rfont b5 s24 black">Products</div>
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/products/all-products/1" className={`button btn rfont s15 b5 anim ${section == "all-products" && "on"}`}>All Products</Link>
                    <Link to="/products/on-board-products/2" className={`button btn rfont s15 b5 anim ${section == "on-board-products" && "on"}`}>On Board Products</Link>
                    {user.rights.products.create &&  <Link to="/products/create-product/3" className={`button btn rfont s15 b5 anim ${section == "create-product" && "on"}`}><span className="icon-plus b6 ico"/><span>Create Product</span></Link> }
                </div> 
                {
                    section !== "create-product" && section !== 'edit-product' && section !== "on-board-products" &&
                        <div className="rig flex aic">
                            {/* Catagory Selecter Block */}
                            <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                            e.stopPropagation();
                            setDropCata(!dropCata); 
                            setDropFilter(false)
                            setDropSort(false);
                        }}>
                                { 
                                    catagory.map((item,index)=>(
                                        cata == item.label && <div key={index} className="flex aic">
                                            <div className={`ico font s17 flex aic cfff  ${item.icon} ${item.label}`} />           
                                            <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropCata == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                        </div>
                                    ))
                                }
                                {dropCata && <div className="options flex flex-col abs">
                                        {
                                            catagory.map((item,index)=>(
                                                <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
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
                                    filter.map((item,index)=>(
                                        status === item.label && <div key={index} className="flex aic">
                                             <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropfilter == true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                        </div>
                                    ))
                                }
                                {dropfilter && <div className="options sort flex flex-col abs">
                                        {
                                            filter.map((item,index)=>(
                                                <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
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
                }
            </div>
            <div className="content flex flex-col">
                {section === "all-products" && <VendorProductsAll dataloaded={dataloaded} products={products} loaded={loaded}/>}  
                {section === "create-product" && <VendorProductsCreate setreload={setreload}/>}     
                {section === "on-board-products" && <VendorProductsOnBoard />}  
                {section === "edit-product" && <VendorProductsEdit productid={productid} setreload={setreload}/>}   
            </div>   
        </div>
    );
}
 
export default VendorProducts;