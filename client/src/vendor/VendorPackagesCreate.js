import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {createpackages} from '../actions/Admin/adminpackages'
import {getcategories} from '../actions/Admin/admincategory'

import {getscales} from '../actions/Admin/adminscale'
import axios from 'axios'
import zuz from '../core/Toast'
function VendorProductsCreate(props) {
    
    const [picUrl, setPicUrl] = useState(''); 
    const [file,setfile] = useState('');
    
    const [packageitems, setpackageitems] = useState([{ label_en: "", label_ur: [{value : ""}], unit : "",qty:"" }]);
    const [price,setprice]  = useState('');     
    
    let [marketprice,setmarketprice] = useState('');
    const [description,setdescription] = useState('')
    const [next_pkg_id,setnext_pkg_id] = useState('')
    const dispatch = useDispatch();
    
    const { user } = useSelector((state) => state.authreducer);
    const handleInputChange = (e, index) => {
        const { name, value } = e;
        // creating copy of input list
        const list = [...packageitems];
        if(name === 'label_ur')
        {
            list[index]['label_ur'] = [{value}]  
        }
        else 
        {
            list[index][name] = value;
        }
        
        setpackageitems(list);
      };

    const handleAddClick = () => {
        setpackageitems([...packageitems, { label_en: "", label_ur: [{value : ""}], unit : "",qty:"" }]);
      }; 
    
    useEffect(()=>{
        const callme = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/package/getnextpackageid`);
          setnext_pkg_id(res.data.PKG_id)
        } catch (error) {
            if(error.response){
                  zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
              }
        }
    }
     callme()
    },[dispatch]);

    useEffect(() => {
        dispatch(getscales({status : '0'}))
    },[dispatch])
    const {scale_loaded,scales} = useSelector(state => state.categoriesandroles)
    // Adding Product
    const uploadproduct = async () => {
        console.log(packageitems)
        if(!file || !price || !marketprice) {
            zuz.Toast.show({html:`Please Input/select all necessary fields`, time: 5});
        }
        else if (Number(marketprice) < Number(price)){
            zuz.Toast.show({html:`Market price should be greater than freshlay price`, time: 5});
        }
        else{
           
     const res = await   dispatch(createpackages(file,{vendorId:user._id,price,discount :  marketprice - price,packageitems,description}))
        //console.log('got response boy',res)
        if(res)
        {
            setpackageitems([{ label_en: "", label_ur: [{value : ""}], unit : "",qty:"" }])
            setprice('')
            setPicUrl('')
            setdescription('')
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/package/getnextpackageid`);
                setnext_pkg_id(res.data.PKG_id)
              } catch (error) {
                  if(error.response){
                        zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
                    }
              }
        }
    }  
    
    }
    const {loaded,categories} = useSelector(state => state.categoriesandroles)
    return (
        <div className="add-new-category flex flex-col">
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Package ID<span className="astarick">&#42;</span></div>
                    <input type="text" readOnly  value={`${next_pkg_id}`} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Package Image<span className="astarick">&#42;</span></div>
                    <input type="file" accept="image/*"  className="iput image rfont s15 c333 anim"  onChange={e=>{
                        let file = e.target.files[0];
                        setfile(file)
                        // console.log('file',file)
                        file && setPicUrl(URL.createObjectURL(file));
                    }} />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription (optional)</div>
                    <textarea type="text" value={description}  onChange={e=>setdescription(e.target.value)} className="iput textarea rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div  className="img-preview"><img alt="product" src={picUrl ? picUrl : "/images/category.png"} className="img" /></div>
                </div>

               {/* Dynamic tags */}
               {packageitems.map((item,index) => {
                   //console.log(item.label_ur[0].value)
                   //const ur = item.label_ur[0].value
               return  <React.Fragment>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Name (Eng)<span className="astarick">&#42;</span></div>
                    <input name="label_en" type="text" value={item.label_en} onChange={e=>handleInputChange(e.target,index)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Name (Urdu)<span className="astarick">&#42;</span></div>
                    <input name="label_ur" type="text" value={item.label_ur[0].value} onChange={e=>handleInputChange(e.target,index)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Unit<span className="astarick">&#42;</span></div>
                    <select name="unit" value={item.unit} className="iput rfont s15 c333 anim" onChange={e=> handleInputChange(e.target,index)}>
                    <option value="all">Select unit</option>
                      {scale_loaded ?  scales.map((item,index)=>  <option key={index} value={`${item.symbol}`}>{item.name}</option>)  : ''}
                        
                    </select>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Quantity<span className="astarick">&#42;</span></div>
                    <input name="qty"  type="number" value={item.qty} onChange={e=>handleInputChange(e.target,index)} className="iput rfont s15 c333 anim" />
                </div>
                </React.Fragment>
                })}

                <div className="item flex flex-col"></div>
                <div className="ftr flex aic">
                    <button
                        onClick={() => handleAddClick()}
                        className="button btn rfont s16 b5 cfff">Add More Product
                    </button>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Freslay Price<span className="astarick">&#42;</span></div>
                    <input type="number" value={price} onChange={e=>setprice(e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Market price</div>
                    <input type="number" value={marketprice} onChange={e=>setmarketprice(e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                
               

                
                
            </div>
           
            <div className="ftr flex aic">
                <button
                onClick={() => uploadproduct()}
                className="button btn rfont s16 b5 cfff">Upload Package</button>
            </div>
        </div>
    );
}

export default VendorProductsCreate; 