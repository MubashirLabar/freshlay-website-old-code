import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import zuz from "../../core/Toast";
import axios from 'axios'

function PricingTable(props) { 

    const [dropCata, setDropCata] = useState(false);
    const [dropSort, setDropSort] = useState(false);
    const [dataloaded,setdataloaded] = useState(false);
    const [pricelist,setpricelist] = useState([])
    const [cata, setCata] = useState("All"); 
    const [sort, setSort] = useState("Default sorting"); 
    const [sortItems, setSortItems] = useState([
        {label: "Default sorting", slug:"/", sorting : {
            price : '-1'
        }},
        {label: "Price: low to high", slug:"/", sorting : {
            price : '1'
        }},
        {label: "Price: high to low", slug:"/", sorting : {
           price : '-1'
        }}, 
    ])
    const [catagory, setCatagory] = useState([
        {label: "All", icon: "icon-eye", slug:"/"},
        {label: "Vegetables", icon: "icon-eye", slug:"/"},
        {label: "Fruits", icon: "icon-eye", slug:"/"}, 
        {label: "Meats", icon: "icon-eye", slug:"/"},
    ]);
    const {loaded,categories} = useSelector(state => state.categoriesandroles)
    useEffect(() => {
        if(dataloaded & loaded)
        {
          let  mycategories = []
          mycategories.push(  {label: "All", icon: "icon-eye", slug:"/"}) 
          categories.map((item) => {
            if(item.status === "Active")
            {
              mycategories.push({label: `${item.name}`,icon : "icon-eye"})
            }
          })
          setCatagory(mycategories)
        }
      },[dataloaded])
    const [productsorting,setproductsorting] = useState(null)
    const [productfilter, setproductfilter] = useState('all')
    const getanorder = async () => {
        try {
            const res = await  axios.post(`${process.env.REACT_APP_API_URL}/product/pricelists`,{filterproduct : {
                category : productfilter.toLowerCase(),
                sorting : productsorting,
               
            }})
            if(res.data.status === 'success'){
            // console.log(res)
             setpricelist(res.data.Pricelist)
             setdataloaded(true)
            }
           } catch (error) {
           if(error.response){
               zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
           }
           } 
    }
    useEffect(() => {
        const connectwithsocket = () => {
            //let ws = new WebSocket('ws://localhost:5000/');
            let ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}`); 
            ws.addEventListener('message', function (data) {
            const thedata = JSON.parse(JSON.parse(data.data))
            console.log(thedata)
             if(thedata.type === 'productedited')
              {
                getanorder()
              }   
            });

            ws.onclose = function(){
                console.log('disconneted')
                setTimeout(function(){connectwithsocket()}, 5000);
            };
        }
        connectwithsocket()
   },[cata,sort])


    useEffect(() => {
        getanorder()
    },[cata,sort])
   
    const [prices, setPrices] = useState([
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/1.jpg", slug: ""},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/2.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/3.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/4.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/5.png", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/6.jpg", slug:"/"}, 
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/1.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/2.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/3.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/4.jpg", slug:"/"}, 
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/1.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/2.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/3.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو", symbol: "1 kg", price: "80", img: "./images/4.jpg", slug:"/"},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    ]);  
 
    return (
        <React.Fragment>
         <div className="table-list-p price-list flex flex-col wrapWidth">
                    <div className="hd flex aic">
                        <div className="lbl rfont s24 b">Prices List 👇</div>
                        <div className="rig flex aic">
                            {/* Catagory Selecter Block */}
                            <button className="cleanbtn cum-select flex aic rel" onClick={(e)=>{
                                e.stopPropagation();
                                setDropCata(!dropCata); 
                                setDropSort(false);
                            }}>
                                { 
                                    catagory.map((item,index)=>(
                                        cata === item.label && <div key={index} className="flex aic">
                                            <div className={`ico font s17 flex aic cfff  ${item.icon} ${item.label}`} />           
                                            <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropCata === true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
                                        </div>
                                    ))
                                }
                                {dropCata && <div className="options flex flex-col abs">
                                        {
                                            catagory.map((item,index)=>(
                                                <button key={index} className="cleanbtn item flex aic anim" onClick={()=>{
                                                    setDropCata(!dropCata);
                                                    setCata(item.label);
                                                    setproductfilter(item.label)
                                                }}>
                                                    <div className={`ico font s17 flex aic cfff ${item.icon} ${item.label}`}/>            
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
                                    setDropCata(false); 
                            }}> 
                                { 
                                    sortItems.map((item,index)=>(
                                        sort === item.label && <div key={index} className="flex aic">          
                                            <div className="txt rfont s16 black">{item.label}</div>
                                            <div className={`arrow s18 c777 anim ${dropSort === true ? "icon-chevron-up" : "icon-chevron-down"}`} />          
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
                    </div>
                    <div className="content flex flex-col rel">
                        {/* header */}
                        <div className="hdr flex aic"> 
                            <div className="col rfont s15 b5 black">Image</div>
                            <div className="col rfont s15 b5 black">Product Name</div>
                            <div className="col rfont s15 b5 black">Scale</div> 
                            <div className="col rfont s15 b5 black">Price</div> 
                        </div> 
                        <div className="table flex flex-col">
                            {/* Table Row*/}
                            {dataloaded ? 
                                pricelist.map((item, index)=>(
                                    <Link to="/" key={index} className="row flex aic anim">
                                        <div className="col rfont s14 c333">
                                            <img  src={`${process.env.REACT_APP_END_URL}${item.media}`} className="img" />
                                        </div>
                                        <div className="col rfont s14 c333">
                                            <div className="flex flex-col">
                                                <div className="col nam rfont s14 c333">{item.label_en}</div>
                                                <div className="col nam rfont s14 c333">{item.label_ur ? item.label_ur[0].value : ''}</div>
                                            </div>
                                        </div>
                                        <div className="col rfont s14 c333">{item.unit}</div>
                                        <div className="col rfont b5 s14 black">{item.price}</div>
                                    </Link>
                                ))
                                : 
                                <div>Loading</div>
                            }
                        </div>
                    </div>
                </div>

        </React.Fragment>  
    );  
}

export default PricingTable;