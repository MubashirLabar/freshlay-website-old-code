import React, { useEffect, useState } from 'react';
import {updatesettings} from '../actions/Admin/adminsettings';
import { useStore,useSelector, useDispatch } from 'react-redux';
function AdminSettingNotification(props) {
    const [coupins,setcoupins] = useState([])
    const dispatch = useDispatch()
    const handleInputChange = (e, index) => {
        const { name, value } = e;
        // creating copy of input list
        const list = [...coupins];
        list[index][name] = value;
        setcoupins(list);
      };
      const changesettings = () => {
       dispatch(updatesettings({coupincodes : coupins}))
    }
    const deletecoupins = (i) => {
        let allcoupins = coupins;
        console.log(allcoupins)
        const deleted = allcoupins.splice(i, 1);
        // reference is same of coupins, it did'nt recognize, 
        // so create new value
        setcoupins([...allcoupins])
    }
    useEffect(() => {
       setcoupins(props.settings.coupincodes ? props.settings.coupincodes : [])
    },[])
    return (
        <div className="add-new-user coupin-p left flex flex-col"> 
            <div className="form flex"> 
            {coupins.map((item,i) =>   <div key={i} className="item flex flex-col">
                        <input value={item.coupinname} placeholder="Coupin name" name="coupinname" onChange={(e) => handleInputChange(e.target,i)} type="text" className="iput rfont s15 c333 anim"/>
                        <input value={item.discount} placeholder="discount" name="discount" onChange={(e) => handleInputChange(e.target,i)} type="number" className="iput rfont s15 c333 anim"/>
                        <button onClick={() => {
                           deletecoupins(i)
                            }} className="button btn rfont s16 b5 cfff">Delete</button>
                     </div>  
            )}
                <div />
            </div>
            <div className="ftr flex aic">
                <button
                    onClick={() => setcoupins([...coupins, {coupinname : '', discount : ''}])}
                    className="button btn rfont s16 b5 cfff">Add coupin code</button>
                <button 
                    onClick={() => changesettings()}
                    className="button btn rfont s16 b5 cfff">Update Setting</button>
            </div>
        </div>
    );
}

export default AdminSettingNotification;