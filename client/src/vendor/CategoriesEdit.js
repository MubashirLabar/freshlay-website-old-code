import React,{useState,useEffect} from 'react';
import {getacategory,editcategory} from '../actions/Admin/admincategory';
import {useDispatch,useSelector} from 'react-redux'
import zuz from '../core/Toast';


function CategoriesEdit(props) {
    const {cat_loaded,category} = useSelector(state => state.categoriesandroles)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getacategory(props.id))
    },[dispatch,props.id])
    useEffect( () => {
        if(category){
            setName(category.name);
            setstatus(category.status);
            setdescription(category.description)
        }
      },[category])

    const [name, setName] = useState('');
    const [status, setstatus] = useState('');   
    const [file, setImage] = useState('');
    const [description, setdescription] = useState();
    const [picUrl, setPicUrl] = useState('');

         const editacategory =() => {
         if(!name)
         {
            zuz.Toast.show({html:`PLease input atleast Name`, time: 5});
         }
         else 
         {
         dispatch(editcategory(file,{name,status,description,cat_id :category.cat_id}))
         } 
        }
       
    return (
        <div>
        {
            cat_loaded ? 
        <div className="add-new-category flex flex-col">
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div>
                    <select value={category.status} onChange={(e) => setstatus(e.target.value)} className="iput rfont s15 c333 anim">
                        <option value="active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select> 
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Image<span className="astarick">&#42;</span></div>
                    <input type="file" accept="image/*"  className="iput rfont s15 c333 anim"  onChange={e=>{
                        let file = e.target.files[0];
                        setImage(file)
                        file && setPicUrl(URL.createObjectURL(file));
                    }}/>
                    <div className="img-preview"><img alt="category" src={picUrl ? picUrl : `${process.env.REACT_APP_END_URL}${category.image}`} className="img" /></div>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription</div>
                    <textarea value={description} type="text"  onChange={e=>setdescription(e.target.value)} className="iput textarea rfont s15 c333 anim" />
                </div>
            </div>
            <div className="ftr flex aic">
                <button
                onClick={() => editacategory()}
                className="button btn rfont s16 b5 cfff">Edit Category</button>
            </div>
        </div>:<div>loading</div>
        
        } </div>
    );
}

export default CategoriesEdit; 