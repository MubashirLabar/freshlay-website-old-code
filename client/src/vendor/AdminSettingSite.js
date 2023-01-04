import React,{useState} from 'react';
import {updatesettingswithlogo} from '../actions/Admin/adminsettings'
import {useDispatch,useSelector} from 'react-redux'
function AdminSettingSite(props) {

     

    const [picUrl, setPicUrl] = useState(null);
    const [sitename, setsitename] = useState(props.settings.sitename);
    const [siteemail, setsiteemail] = useState(props.settings.siteemail);
    const [sitefooter, setsitefooter] = useState(props.settings.sitefooter);
    const [georadius,setgeoradius] = useState(props.settings.georadius);
    const [file,setfile] = useState(null)
    const [sitelogo,setsitelogo] = useState(null);
    const [ordercommission,setordercommission] = useState(props.settings.ordercommission);
    const [description, setdescription] = useState(props.settings.description);
    const [customerterms,setcustomerterms] = useState(props.settings.customerterms);
    const [privacy, setprivacy] = useState(props.settings.privacy);
    const [androidlink, setandroidlink] = useState(props.settings.androidlink);
    const [ioslink, setioslink] = useState(props.settings.ioslink)
    const [minorder, setminorder] = useState(props.settings.minorder)
    const [headertags, setheadettags] = useState(props.settings.headertags)
    const dispatch = useDispatch();
    const updatesettings = () => {
        dispatch(updatesettingswithlogo(file,{sitename,siteemail,sitefooter,
            georadius,ordercommission,description,customerterms,privacy,androidlink,ioslink,minorder,headertags}))
    }
    return (
        <div className="add-new-user flex flex-col"> 
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Site Name<span className="astarick">&#42;</span></div>
                    <input value={sitename} onChange={(e) => setsitename(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Site Email<span className="astarick">&#42;</span></div>
                    <input value={siteemail} onChange={(e)=> setsiteemail(e.target.value)} type="email" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Site Footer<span className="astarick">&#42;</span></div>
                    <input value={sitefooter} onChange={(e) => setsitefooter(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Geolocation Distance Radius<span className="astarick">&#42;</span></div>
                    <input value={georadius} onChange={(e)=> setgeoradius(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Site Logo<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setfile(file)
                            file && setPicUrl(URL.createObjectURL(file));
                    }}/>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Order Commission Percentage<span className="astarick">&#42;</span></div>
                    <input value={ordercommission} onChange={(e) => setordercommission(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="img-preview"><img src={picUrl ? picUrl : props.settings.sitelogo ? `${process.env.REACT_APP_END_URL}${props.settings.sitelogo}` : "/images/logo.svg"} className="img" /></div>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription<span className="astarick">&#42;</span></div>
                    <textarea value={description} onChange={(e) => setdescription(e.target.value)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Customer Terms Condition</div>
                    <textarea value={customerterms} onChange={(e) => setcustomerterms(e.target.value)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Privacy</div>
                    <textarea value={privacy} onChange={(e) => setprivacy(e.target.value)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Header tags</div>
                    <textarea value={headertags} onChange={(e) => setheadettags(e.target.value)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Android App Link</div>
                    <input value={androidlink} onChange={(e) => setandroidlink(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">IOS App Link</div>
                    <input value={ioslink} onChange={(e) => setioslink(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Minimum order limit</div>
                    <input type={Number} value={minorder} onChange={(e) => setminorder(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
            </div>
            <div className="ftr flex aic">
                <button onClick={() => updatesettings()} className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div>
        </div>
    );
}

export default AdminSettingSite;