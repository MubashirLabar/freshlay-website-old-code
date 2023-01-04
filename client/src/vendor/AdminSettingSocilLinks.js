import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import zuz from "../core/Toast";
import {updatesettings} from '../actions/Admin/adminsettings';

function AdminSettingSocilLinks(props) {

    const [sociallinkfacebook, setsociallinkfacebook] = useState('');
    const [sociallinktwitter, setsociallinktwitter] = useState('');
    const [sociallinkwhatsapp, setsociallinkwhatsapp] = useState('');
    const [sociallinkinstagram, setsociallinkinstagram] = useState('');
    const dispatch = useDispatch();
    const updatelink  =  () => {
        if(!sociallinkfacebook || !sociallinktwitter || !sociallinkwhatsapp || !sociallinkinstagram)
        {
            zuz.Toast.show({html:`Please input all fields`, time: 5});
        }
        else {
       dispatch(updatesettings({sociallinkfacebook,sociallinktwitter,sociallinkwhatsapp,sociallinkinstagram}))
        }
     }
    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex"> 
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Facebook</div>
                    <input value={props.settings.sociallinkfacebook} onChange={(e) => setsociallinkfacebook(e.target.value)}  type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Twitter</div>
                    <input value={props.settings.sociallinktwitter} onChange={(e) => setsociallinktwitter(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Whatsapp</div>
                    <input value={props.settings.sociallinkwhatsapp} onChange={(e) => setsociallinkwhatsapp(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Instagram</div>
                    <input value={props.settings.sociallinkinstagram} onChange={(e) => setsociallinkinstagram(e.target.value)} type="text" className="iput rfont s15 c333 anim"/>
                </div>
            </div>
            {/* Footer */}
            <div className="ftr flex aic">
                <button onClick={() => updatelink()} className="button btn rfont s16 b5 cfff">Update links</button>
            </div> 
        </div>
    );
}

export default AdminSettingSocilLinks;