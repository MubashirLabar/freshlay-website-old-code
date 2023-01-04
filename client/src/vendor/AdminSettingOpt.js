import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import {updatesettings} from '../actions/Admin/adminsettings';
import zuz from "../core/Toast";
function AdminSettingOpt(props) {
    const dispatch = useDispatch();
    const [phoneverifydigit,setphoneverifydigit] = useState(props.settings.phoneverifydigit)
    const modifysettings = () => {
        dispatch(updatesettings({phoneverifydigit}))
    }
    return (
        <div className="add-new-user left flex flex-col"> 
            <div className="form flex"> 
                {/*
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">OTP Type<span className="astarick">&#42;</span></div>
                    <select className="iput rfont s15 c333 anim">
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="both">Both</option>
                    </select>
                </div> */
                }
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">OTP Digit Limit<span className="astarick">&#42;</span></div>
                    <select defaultValue={props.settings.phoneverifydigit} onChange={(e) => setphoneverifydigit(e.target.value)} className="iput rfont s15 c333 anim">
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                    </select>
                </div>
                <div className="item flex flex-col">
                    <div className="lbl rfont s15 c333">Expire Time (In Minute)<span className="astarick">&#42;</span></div>
                    <input type="number" className="iput rfont s15 c333 anim"/>
                </div>
            </div> 
            <div className="ftr flex aic"> 
                <button onClick={() => modifysettings()} className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div> 
        </div>
    );
}

export default AdminSettingOpt;