import React,{useState} from 'react';
import {Addcategory} from '../actions/Admin/admincategory';
import {useDispatch} from 'react-redux'
import zuz from '../core/Toast'
import {getcategories} from '../actions/Admin/admincategory'

function CategoriesAddNew(props) {

    const [name, setName] = useState('');
    const [status, setstatus] = useState('Active');   
    const [file, setImage] = useState('');
    const [description, setdescription] = useState('');
    const [picUrl, setPicUrl] = useState('');

    const dispatch = useDispatch();
         const addnewcategory =async () => {
            if(!name || !file)
            {
                zuz.Toast.show({html:`PLease input atleast Name and image`, time: 5});
            }
            else {
            const res = await dispatch(Addcategory(file,{name,status,description}))
            if(res)
            {
                setName('')
                setdescription('')
                dispatch(getcategories({status : '0'}))
            }
            } 
        }

    return (
        <div className="add-new-category flex flex-col">
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Name<span className="astarick">&#42;</span></div>
                    <input type="text" value={name} onChange={e=>setName(e.target.value === "" ? null : e.target.value)} className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Status<span className="astarick">&#42;</span></div>
                    <select onChange={(e) => setstatus(e.target.value)} className="iput rfont s15 c333 anim">
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
                    <div className="img-preview"><img src={picUrl ? picUrl : "/images/category.png"} className="img" /></div>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription</div>
                    <textarea value={description} type="text"  onChange={e=>setdescription(e.target.value === "" ? null : e.target.value)} className="iput textarea rfont s15 c333 anim" />
                </div>
            </div>
            <div className="ftr flex aic">
                <button
                onClick={() => addnewcategory()}
                className="button btn rfont s16 b5 cfff">Add Category</button>
            </div>
        </div>
    );
}

export default CategoriesAddNew; 