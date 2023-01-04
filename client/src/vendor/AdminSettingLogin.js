import React,{useState} from 'react';

function AdminSettingLogin(props) {

    const [showPass, setshowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return ( 
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex">
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Username<span className="astarick">&#42;</span></div>
                    <input type="text" value="Dean Stanley" className="iput rfont s15 c333 anim"/>
                </div>
                <div />
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Password<span className="astarick">&#42;</span></div>
                    <div className="password flex aic">
                        <input type={showPass ? 'text' : 'password'} value="Store No. #3" className="cleanbtn rfont s15 c333 anim" />
                        <button onClick={()=>{setshowPass(!showPass)}} className={`cleanbtn show-btn s20 c777 ${showPass == true ? "icon-eye" : "icon-eye-off"}`} />
                    </div>
                </div> 
                <div />
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Confirm Password<span className="astarick">&#42;</span></div>
                    <div className="password flex aic">
                        <input type={showConfirmPass ? 'text' : 'password'} value="Store No. #3" className="cleanbtn rfont s15 c333 anim" />
                        <button onClick={()=>{setShowConfirmPass(!showConfirmPass)}} className={`cleanbtn show-btn s20 c777 ${showConfirmPass == true ? "icon-eye" : "icon-eye-off"}`} />
                    </div>
                </div>  
                <div />
            </div>
            <div className="ftr flex aic">
                <button className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div> 
        </div>
    );
}

export default AdminSettingLogin;