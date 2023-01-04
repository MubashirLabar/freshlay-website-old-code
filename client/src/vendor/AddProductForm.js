import React,{useState, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {CreateProductrequest} from '../actions/Admin/productrequest'
import {getcategories} from '../actions/Admin/admincategory'
import {categoryProductselction} from '../actions/Admin/productrequest'
import zuz from '../core/Toast'

function AddProductForm(props) {
    

    const [name, setName] = useState(null);
    const [category,setcategory]= useState('all')
    const [dropMenu, setDropMenu] = useState(false);
    const [productId, setProductId] = useState(null);
    const [unit,setunit] = useState(null);
    const [stock,setstock]  = useState('')
    const [productsNames, setProducts] = useState([
        {product_id: "PO-12230", label_en: "White Potato", label_ur: "سفید آلو"},
        {product_id: "PO-12231", label_en: "Lehsan China", label_ur: "تازہ لہسن چین"},
        {product_id: "PO-12232", label_en: "Ginger China", label_ur: "ادرک چین"},
        {product_id: "PO-12233", label_en: "Crinkled Smooth", label_ur: "بندھ گوبھی"},
    ]); 
    //console.log(productId)
    useEffect(()=>{
        document.body.addEventListener("click", ()=>{
            setDropMenu(false); 
        });
    })
    useEffect(() => {
        setProductId(null)
        if(category)
        {
            dispatch(categoryProductselction(
                {filterproduct : {
                   status : 'all',
                   category :  category.toLowerCase()
               }}))
        }
        
    },[category])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getcategories())
    },[])
    const upload = () => {
        if(category==="all" || !productId || !stock)
        {
            zuz.Toast.show({html:`Please select & fill all field`, time: 5});
        }
       else {
       dispatch(CreateProductrequest({category : category.toLowerCase(),productId,stock:parseInt(stock)}))
       }
    }
    const {catprod_loaded,selectproduct} = useSelector(state => state.adminproductlist)
    const {loaded,categories} = useSelector(state => state.categoriesandroles)
    return (
        <div className="add-new-prd-form" onClick={(e)=>setDropMenu(false)}> 
            <div className="item flex flex-col">
                <div className="lbl rfont s14 c333">Catagory<span className="astarick">&#42;</span></div>
                <select value={category}  onChange={(e) => setcategory(e.target.value)} className="cleanbtn iput rfont s15 c333 anim">
                <option value="all">Select category</option>
                {loaded 
                 ?
                 categories.map((item,index) =>  <option key={index} value={`${item.name}`}>{item.name}</option>)
                 : 
                 ''
                }
                </select>
            </div> 
            <div className="item flex flex-col">
                <div className="lbl rfont s14 c333">Name (Eng)<span className="astarick">&#42;</span></div>
                {/* Product name Selecter Block*/} 
                <div className="selecter"> 
                    <div className="blk flex flex-col rel">
                        <button className="cleanbtn flex aic"onClick={(e)=>{setDropMenu(!dropMenu); e.stopPropagation();}}>
                            {
                            productId == null && 
                                <div className="name flex aic">
                                    <div className="nam rfont s15 c333">Choose Product Name</div>
                                </div>
                            }  
                            {  
                           
                                selectproduct.map(item=>(
                                    productId == item.id &&
                                     <div className="name flex aic"> 
                                            <div className="nam rfont s15 c333">{item.label_en}</div>                    
                                            <div className="rfont s15 c333">{item.label_ur[0].value}</div>                    
                                        </div> 
                                    
                                )) 
                            } 
                            <div className={`icon s18 c333 anim ${dropMenu == true ? "icon-chevron-up" : "icon-chevron-down"}`} />           
                        </button>   
                        {dropMenu && 
                            <div className="drop-blk abs"> 
                            {  
                                selectproduct.map(item=>( 
                                    <button key={item.ID} className="cleanbtn name flex aic anim" onClick={()=>{
                                        setProductId(item.id);
                                        setunit(item.unit)
                                        setDropMenu(false);
                                        
                                    }}> 
                                        <div className="nam rfont s14 c333">{item.label_en}</div>                    
                                        <div className="ur_nam rfont s14 c333">{item.label_ur[0].value}</div>                    
                                    </button>  
                                ))
                            } 
                            </div>
                        }
                    </div>
                </div>
            
            </div>   
            <div className="item flex flex-col">
                <div className="lbl rfont s14 c333">Unit</div>
                <input type="text" readOnly value={unit} className="cleanbtn read iput rfont s15 c333 anim" onChange={e=>setName(e.target.value === "" ? null : e.target.value)}/>                                                  
            </div>
            <div className="item flex flex-col">
                <div className="lbl rfont s14 c333">Stock<span className="astarick">&#42;</span></div> 
                <input value={stock} onChange={(e) => setstock(e.target.value)} type="number" className="cleanbtn iput rfont s15 c333 anim"/>                                                  
            </div>  
            <div onClick={() => upload()} className="button btn rfont s16 b5 cfff">Upload</div>
        </div>
    );
}

export default AddProductForm;