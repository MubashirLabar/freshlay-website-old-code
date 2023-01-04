import React, { useState } from 'react';
import { useStore,useSelector, useDispatch } from 'react-redux';
import {updatesettings} from '../actions/Admin/adminsettings';
import zuz from "../core/Toast"; 

function AdminSettingEmail(props) {
    
    const [emailhost,setemailhost] = useState('');
    const [emailusername, setemailusername] = useState('');
    const [emailpassword, setemailpassword] = useState('');
    const dispatch = useDispatch()
    const changesettings = () => {
        if(!emailhost || !emailusername || !emailpassword)
        {
            zuz.Toast.show({html:"Please fill all fields", time: 5});
        }
        else 
        { 
       dispatch(updatesettings({emailhost,emailusername,emailpassword}))
        }
    }
    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Mail Host<span className="astarick">&#42;</span></div>
                    <input value={props.settings.emailhost} defaultValue="" type="text" onChange={(e) => setemailhost(e.target.value)} className="iput rfont s15 c333 anim"/>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Mail Username<span className="astarick">&#42;</span></div>
                    <input value={props.settings.emailusername} onChange={(e) => setemailusername(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Mail Password<span className="astarick">&#42;</span></div>
                    <input value={props.settings.emailpassword} onChange={(e) => setemailpassword(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
            </div>
            <div className="ftr flex aic"> 
                <button onClick={() => changesettings()} className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div> 
        </div>
    );
}

export default AdminSettingEmail; 