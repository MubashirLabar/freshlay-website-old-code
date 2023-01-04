import React,{useState} from 'react';

function AdminSettingHomepage(props){ 

    const [picUrl, setPicUrl] = useState(null);
    const [picUrl2, setPicUrl2] = useState(null);
    const [picUrl3, setPicUrl3] = useState(null);

    const [sliderimage1, setsliderimage1] = useState('');
    const [sliderimage2, setsliderimage2] = useState('');
    const [sliderimage3, setsliderimage3] = useState('');

    const [slidetitle1, setslidetitle1] = useState('')
    const [slidedescription1, setslidedescription1] = useState('')
    const [slidetitle2, setslidetitle2] = useState('')
    const [slidedescription2, setslidedescription2] = useState('')
    const [slidetitle3, setslidetitle3] = useState('')
    const [slidedescription3, setslidedescription3] = useState('')
    const modifysliders = () => {
        
    }

    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="tit rfont b5 s20 c333">Slider Setting</div>
            <div className="form col-3 flex">  
                {/* 1 Slide */}
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Image<span className="astarick">&#42;</span></div>
                    <input  type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setsliderimage1(file)
                            file && setPicUrl(URL.createObjectURL(file));
                    }}/>
                    {picUrl && <div className="img-preview"><img src={picUrl} className="img" /></div>}
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Title<span className="astarick">&#42;</span></div>
                    <input value={slidetitle1} onChange={(e) => setslidetitle1(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription<span className="astarick">&#42;</span></div>
                    <input value={slidedescription1} onChange={(e) => setslidedescription1(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div> 
            
                {/* 2 Slide */}
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Image<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setsliderimage2(file)
                            file && setPicUrl2(URL.createObjectURL(file));
                    }}/>
                    {picUrl2 && <div className="img-preview"><img src={picUrl} className="img" /></div>}
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Title<span className="astarick">&#42;</span></div>
                    <input value={slidetitle2} onChange={(e) => setslidetitle2(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription<span className="astarick">&#42;</span></div>
                    <input value={slidedescription2} onChange={(e) => setslidedescription2(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div> 
            
                            
                {/* 3 Slide */}
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Image<span className="astarick">&#42;</span></div>
                    <input type="file" className="iput image rfont s15 c333 anim" onChange={(e)=>
                        {
                            let file = e.target.files[0];
                            setsliderimage3(file)
                            file && setPicUrl3(URL.createObjectURL(file));
                    }}/>
                    {picUrl3 && <div className="img-preview"><img src={picUrl} className="img" /></div>}
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Slide Title<span className="astarick">&#42;</span></div>
                    <input value={slidetitle3} onChange={(e) => setslidetitle3(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Discription<span className="astarick">&#42;</span></div>
                    <input value={slidedescription3} onChange={(e) => setslidedescription3(e.target.value)} type="text" className="iput rfont s15 c333 anim" />
                </div> 
            

            </div>
            {/* Footer */}
            <div className="ftr flex aic"> 
                <button className="button btn rfont s16 b5 cfff">Update Slides</button>
            </div> 
        </div>
    );
}

export default AdminSettingHomepage;