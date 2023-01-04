import React,{useState} from 'react';
import {updatesettingswithlogo} from '../actions/Admin/adminsettings'
import {useDispatch,useSelector} from 'react-redux'
import axios from "axios";
import zuz from '../core/Toast'
function AdminSettingSite(props) {

     

    const [picUrl, setPicUrl] = useState(null);
    const [picUrl2, setPicUrl2] = useState(null);
    const [title, settitle] = useState(null);
    const [mainheading, setmainheading] = useState(null);
    //const [subheading, setsubheading] = useState(null);
    const [content,setcontent] = useState(null);
    const [category,setcategory] = useState('Freshlay')
    const [file,setfile] = useState(null)
    const [file2,setfile2] = useState(null)
    const [paragraphitems,setparagraphitems] = useState([{paragraph : ""}])

    const handleInputChange = (e, index) => {
        const { name, value } = e;
        // creating copy of input list
        const list = [...paragraphitems];
        
        {
            list[index][name] = value;
        }
        
        setparagraphitems(list);
      };

    const handleAddClick = () => {
        setparagraphitems([...paragraphitems, { paragraph:"" }]);
      }; 
    
  
    const dispatch = useDispatch();
    const Createblog = async () => {
        try {
            let formData = new FormData();

            const config = {
                header: { 
                "content-type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            },
              };
            //console.log(body)
            formData.append("file", file);
            //const res = await axios.post(`${process.env.REACT_APP_API_URL}/blog/updloadsecondimage`, formData, config);
            //if (res.data.status === "success") {
                if (true) {
               // console.log(res)
                const body = {
                    title,
                    mainheading,
                    //subheading,
                    paragraphitems,
                    category,
                    image1 : 'res.data.myfilename'
                }
              console.log(body)
              formData = new FormData();
              formData.append("file",file2)
              formData.append("data", JSON.stringify(body));
              let res2 = await axios.post(`${process.env.REACT_APP_API_URL}/blog/modifypost`, formData, config);
              if (res2.data.status === "success") {
                zuz.Toast.show({ html: `New blog added succesfully`, time: 5 });
              }   
            }
          } catch (error) {
            console.log(error)
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
                    <input value={title} onChange={(e) => settitle(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Main Heading<span className="astarick">&#42;</span></div>
                    <input value={mainheading} onChange={(e) => setmainheading(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    {/*     
                    <div className="lbl rfont s15 c333">Sub Heading<span className="astarick">&#42;</span></div>
                    <input value={subheading} onChange={(e) => setsubheading(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                    */}
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Main image<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setfile(file)
                            file && setPicUrl(URL.createObjectURL(file));
                    }}/>
                </div>
                <div className="item flex flex-col">
                    <div className="img-preview"><img src={picUrl ? picUrl  : "/images/category.png"} className="img" /></div>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Paragraph image<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setfile2(file)
                            file && setPicUrl2(URL.createObjectURL(file));
                    }}/>
                </div>
               
                <div className="item flex flex-col">
                    <div className="img-preview"><img src={picUrl2 ? picUrl2  : "/images/category.png"} className="img" /></div>
                </div>
                {paragraphitems.map((item,index) => {
                   //console.log(item.label_ur[0].value)
                   //const ur = item.label_ur[0].value
               return  <React.Fragment>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Paragraph {index}<span className="astarick">&#42;</span></div>
                    <textarea name="paragraph" value={item.paragraph} onChange={(e) => handleInputChange(e.target,index)} type="text" className="iput textarea rfont s15 c333 anim" />
                </div>
                </React.Fragment>
                })}
              
            </div>
            <div className="ftr flex aic">
                    <button
                        onClick={() => handleAddClick()}
                        className="button btn rfont s16 b5 cfff">Add More Paragraph
                    </button>
                </div>
            <div className="ftr flex aic">
                <button onClick={() => Createblog()} className="button btn rfont s16 b5 cfff">Upload Blog</button>
            </div>
        </div>
    );
}

export default AdminSettingSite;