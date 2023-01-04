import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import zuz from "../core/Toast";
import {updatesettings} from '../actions/Admin/adminsettings';

function AdminSettingPayment(props) {
    const [stripekey,setstripekey] = useState('')
    const [stripesecret,setstripesecret] = useState('')
    const dispatch = useDispatch();
    const modifysettings = () => {
        if(!stripekey || !stripesecret)
        {
         zuz.Toast.show({html:"Please fill all fields", time: 5});
        }
        dispatch(updatesettings({stripekey,stripesecret}))
    }
    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Stripe Key<span className="astarick">&#42;</span></div>
                    <input value={props.settings.stripekey} onChange={(e) => setstripekey(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div />
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Stripe Secret<span className="astarick">&#42;</span></div>
                    <input value={props.settings.stripesecret} onChange={(e) => setstripesecret(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div /> 
            </div>
            <div className="ftr flex aic">
                <button onClick={() => modifysettings()} className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div> 
        </div>
    );
}

export default AdminSettingPayment;