import React,{useState} from 'react';
import {updatesettingswithlogo} from '../actions/Admin/adminsettings'
import {useDispatch,useSelector} from 'react-redux'
import axios from "axios";
import zuz from '../core/Toast'


function AdminSettingSite(props) {

     

    const [picUrl, setPicUrl] = useState(null);
    const [title, settitle] = useState(null);
    const [mainheading, setmainheading] = useState(null);
    const [subheading, setsubheading] = useState(null);
    const [content,setcontent] = useState(null);
    const [category,setcategory] = useState('Freshlay')
    const [file,setfile] = useState(null)
  
    const dispatch = useDispatch();
    const modifyblog = async () => {
        try {
            const body = {
                title,
                mainheading,
                subheading,
                content,
                category
            }
            console.log(body)
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/modifypost`, body);
            if (res.data.status === "success") {
              zuz.Toast.show({ html: `New scale added succesfully`, time: 5 });
           
            }
          } catch (error) {
            if (error.response) {
                zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
            }
          }
      //  dispatch(updatesettingswithlogo(file,{title,siteemail,sitefooter,
      //      georadius,ordercommission,description,customerterms,privacy,androidlink,ioslink}))
    }
    return (
        <div className="add-new-user flex flex-col"> 
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Category<span className="astarick">&#42;</span></div>
                    <select defaultValue={'Freshlay'} onChange={(e) => setcategory(e.target.value)} className="iput rfont s15 c333 anim">
                        <option value={'Freshlay'}>Freshlay</option>
                        <option value={'Fruits'}>fruits</option>
                        <option value={'Vegetable'}>Vegetable</option>
                        <option value={'Grocery'}>Grocery</option>
                    </select>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Blog title<span className="astarick">&#42;</span></div>
                    <input value={props.settings.title} onChange={(e) => settitle(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Main Heading<span className="astarick">&#42;</span></div>
                    <input value={props.settings.mainheading} onChange={(e) => setmainheading(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Sub Heading<span className="astarick">&#42;</span></div>
                    <input value={props.settings.subheading} onChange={(e) => setsubheading(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Side image<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setfile(file)
                            file && setPicUrl(URL.createObjectURL(file));
                    }}/>
                </div>
               
                <div className="item flex flex-col">
                    <div className="img-preview"><img src={picUrl ? picUrl : props.settings.sitelogo ? `${process.env.REACT_APP_END_URL}${props.settings.sitelogo}` : "/images/logo.svg"} className="img" /></div>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Content<span className="astarick">&#42;</span></div>
                    <textarea value={props.settings.content} onChange={(e) => setcontent(e.target.value)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
            </div>
            <div className="ftr flex aic">
                <button onClick={() => modifyblog()} className="button btn rfont s16 b5 cfff">Upload Blog</button>
            </div>
        </div>
    );
}

export default AdminSettingSite;