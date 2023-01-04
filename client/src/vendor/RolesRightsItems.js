import React,{useState,useEffect,useCallback} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {modifyroleaccess} from '../actions/Admin/adminrole'
function RolesRightsItems(props) {

   // const {id, name} = props.data;
    const [read, setRead] = useState(props.data.read);
    const [create, setCreate] = useState(props.data.edit);
    const [edit, setEdit] = useState(props.data.create);
    const [del, setDel] = useState(props.data.del); 
   // console.log(props.role)
   //console.log(props.accesses)
   const access = props.accesses
   const dispatch = useDispatch()
   // use an effect
   const updatepermissions = (read,create,edit,del) => {
    dispatch(modifyroleaccess({name : props.role,access: access,modify :{access : {read,create,edit,del}}}))
   console.log({name : props.role,access: access,modify :{access : {read,create,edit,del}}})
}
   

    return (
        <React.Fragment key={props.index}>
          
            <div className="col rfont s14 c333">{props.index+1}</div>
            <div className="col rfont s14 c333">{props.accesses}</div>
           {
           // Object.keys(props.accesses).map(e=> (
          // console.log(e)
           // <div></div>
           //<div className="col rfont s14 c333">{e}</div>
           //  )
          // )
            }
        

          
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (read == true ? "on icon-check" : "")} onClick = {()=>{setRead(!read); updatepermissions(!read,edit,create,del);}}/>
            </div>
            <div className="col rfont s14 c333"> 
                <button className={"checkbox cleanbtn " + (edit == true ? "on icon-check" : "")} onClick = {()=>{setEdit(!edit); updatepermissions(read,!edit,create,del);}}/>
            </div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (create == true ? "on icon-check" : "")} onClick = {()=>{setCreate(!create); updatepermissions(read,edit,!create,del);}}/>
            </div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (del == true ? "on icon-check" : "")} onClick = {()=>{setDel(!del); updatepermissions(read,edit,create,!del);}}/>
            </div>  
           
        </React.Fragment> 

    ); 
}

export default RolesRightsItems;