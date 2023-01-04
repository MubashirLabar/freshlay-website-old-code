import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import zuz from "../core/Toast";
import {updatesettings} from '../actions/Admin/adminsettings';

function AdminSettingSms(props) {
      const [twillioAuthtoken,settwillioAuthtoken] = useState('');
      const [twillioaccountsid, settwillioaccountsid] = useState('')
      const dispatch = useDispatch()
      const modifysettings = () => {
       if(!twillioAuthtoken || !twillioaccountsid)
       {
        zuz.Toast.show({html:"Please fill all fields", time: 5});
       }
       else 
       {
         dispatch(updatesettings({twillioAuthtoken,twillioaccountsid}))
       }
      }
    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex">
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Twilio Auth Token<span className="astarick">&#42;</span></div>
                    <input value={props.settings.twillioAuthtoken} onChange={(e) => settwillioAuthtoken(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div />
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Twilio Account SID<span className="astarick">&#42;</span></div>
                    <input value={props.settings.twillioaccountsid} onChange={(e) => settwillioaccountsid(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div />
            </div>
            <div className="ftr flex aic">
                <button onClick={() => modifysettings()} className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div> 
        </div>
    );
}

export default AdminSettingSms;