import React,{useState} from 'react';
import {modifyuseraccess} from '../actions/Admin/users'
import {useDispatch} from 'react-redux' 

function UserEditRoles(props) {

    const {id, name} = props.data;
    // console.log(props.data)
    //const [read, setRead] = useState(false);
    //const [write, setWrite] = useState(false);
   // const [create, setCreate] = useState(false);
   // const [del, setDel] = useState(false);
     const access = props.accesses
    const [read, setRead] = useState(props.data.read);
    const [create, setCreate] = useState(props.data.create);
    const [edit, setEdit] = useState(props.data.edit);
    const [del, setDel] = useState(props.data.del); 
    
    const dispatch = useDispatch()
    const updatepermissions = (read,create,edit,del) => {
        console.log({id : props.id,access: access,modify :{access : {read,create,edit,del}}})
        dispatch(modifyuseraccess({id : props.id,access: access,modify :{access : {read,create,edit,del}}}))
       
    }

    return (
        <div className="row flex aic" key={id}>  
            <div className="col rfont s14 c333">{props.accesses}</div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (read == true ? "on icon-check" : "")} onClick = {()=>{setRead(!read); updatepermissions(!read,create,edit,del)}}/>
            </div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (create == true ? "on icon-check" : "")} onClick = {()=>{setCreate(!create); updatepermissions(read,!create,edit,del)}}/>
            </div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (edit == true ? "on icon-check" : "")} onClick = {()=>{setEdit(!edit); updatepermissions(read,create,!edit,del)}}/>
            </div>
            <div className="col rfont s14 c333">
                <button className={"checkbox cleanbtn " + (del == true ? "on icon-check" : "")} onClick = {()=>{setDel(!del); updatepermissions(read,create,edit,!del)}}/>
            </div>
        </div>
    );
}

export default UserEditRoles;