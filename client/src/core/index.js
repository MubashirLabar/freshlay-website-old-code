import React,{useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Provider, useSelector,useDispatch} from 'react-redux';
import store from "../components/store";
 
const focus = (id) =>{
    try{
        document.querySelector(id).focus();
    }catch(e){}
}

const isValidEmail = (e) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return reg.test(e);
}

const keyCodes = {
	ENTER: 13,
    BACKSPACE: 8
}

const keyupListener = (e, keyCode, callback) => {
	var key = e.which || e.keyCode;
	key === keyCode && callback();
}

const generateID = (len, k) =>{
    const s = (k) => {
        var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0 ; i < k; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    var id = s(k);
    if(len > 1){
        for(let n = 0; n<len; n++){ 
            id += "-" + s(k);
        }
    }
    return id;
}


const DialogBox = (props) => {
    const { title, content, cancel, confirm} = props.meta;
    const ID = props.ID;  
    const [shake, setShake] = useState(false);
    const dispatch = useDispatch()
    const {generalReducers} = useSelector(state => state)
    let {hideDialogbox,hidemap,dialog_id} = generalReducers
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        document.body.addEventListener("click", ()=>{
            setShake(true);
        }); 
    },[])

    console.log(hidemap)

    if(hideDialogbox){
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(ID));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        document.getElementById(ID).parentNode.removeChild(document.getElementById(ID)); 
        document.body.style.overflowY= "inherit";
        dispatch({type : 'HIDE_Dialogbox',payload : false})
    }

    const hide = () => {
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(ID));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        document.getElementById(ID).parentNode.removeChild(document.getElementById(ID));           
    }
    const hideMap = () => {
        console.log('called hidemap')
        console.log('the id',dialog_id)
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(dialog_id));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        //document.getElementById(dialog_id).parentNode.removeChild(document.getElementById(dialog_id));  
        dispatch({type : "HIDE_MAPBOX", payload : false})         
    }
 
    return(
        <div className="pop-container fixed abs fill flex aic" id="popup-container">
            <div id="pop-box" className={`pop rel ${shake && "shake"}`} onClick={(e)=>e.stopPropagation()}>
                <div className="wrapper rel"> 
                    <div className="head flex aic sticky">
                        <div className="lbl rfont s18 b6 black">{title}</div>
                        <button className="cross cleanbtn fontr s26 c555 anim" onClick={()=>{
                            hide()
                            dispatch({type : "HIDE_MAPBOX", payload : false})   
                        }}>&times;</button>
                    </div>
                    <div className="content flex">{content}</div> 
                    <div className={`pop-ftr flex aic ${hidemap ? 'map-ftr' : ''}`}>
                        {cancel &&  
                            <button className="button btn rfont s15 b5 cfff" onClick={()=>
                                { 
                                    cancel.fnc(); 
                                    hide();
                                }}>
                                {cancel.label}
                            </button>
                        }
                        {confirm && 
                            <button className="button btn rfont s15 b5 cfff" 
                                onClick={()=>{
                                    confirm.fnc();
                                    hide();
                                }}>
                                {confirm.label}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
    
}

const Dialog = (data) => {
    var ID = generateID(5, 6);
    var _ID = "pop-"+ID;
    var div = document.createElement("div");
    div.id = "pop-" + ID;
    document.body.appendChild(div);
    if(!window.__modals){ window.__modals = []}
    ReactDOM.render(
        <Provider store={store}><DialogBox 
        ref={(ref) => (window.__modals[ID] = ref)}
        meta={data} ID={_ID}/></Provider> , document.getElementById("pop-"+ID)
    );           
    return ID; 
}

const OfferDialog = (props) => {
    const { title, content, cancel, confirm} = props.meta;
    const ID = props.ID;  
    const [shake, setShake] = useState(false);
    const dispatch = useDispatch()
    const {generalReducers} = useSelector(state => state)
    let {hideDialogbox,hidemap,dialog_id} = generalReducers
    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        document.body.addEventListener("click", ()=>{
            setShake(true);
        }); 
    },[])

    if(hideDialogbox){
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(ID));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        document.getElementById(ID).parentNode.removeChild(document.getElementById(ID)); 
        document.body.style.overflowY= "inherit";
        dispatch({type : 'HIDE_Dialogbox',payload : false})
    }

    const hide = () => {
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(ID));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        document.getElementById(ID).parentNode.removeChild(document.getElementById(ID));           
    }
    const hideMap = () => {
        console.log('called hidemap')
        console.log('the id',dialog_id)
        try{
            ReactDOM.unmountComponentAtNode(document.getElementById(dialog_id));
            document.body.style.overflowY= "inherit";
        }
        catch(e){} 
        //document.getElementById(dialog_id).parentNode.removeChild(document.getElementById(dialog_id));  
        dispatch({type : "HIDE_MAPBOX", payload : false})         
    }
 
    return(
        <div className="pop-container offer-box fixed abs fill flex aic" id="popup-container">
            <div id="pop-box" className={`pop rel ${shake && "shake"}`} onClick={(e)=>e.stopPropagation()}>
                <div className="wrapper rel"> 
                    <div className="head flex aic sticky">
                        <div className="lbl rfont s18 b6 black">{title}</div>
                        <button className="cross cleanbtn fontr s26 c555 anim" onClick={()=>{
                            hide()
                            dispatch({type : "HIDE_MAPBOX", payload : false})   
                        }}>&times;</button>
                    </div>
                    <div className="content flex">{content}</div> 
                    <div className={`pop-ftr flex aic ${hidemap ? 'map-ftr' : ''}`}>
                        {cancel &&  
                            <button className="button btn rfont s15 b5 cfff" onClick={()=>
                                { 
                                    cancel.fnc(); 
                                    hide();
                                }}>
                                {cancel.label}
                            </button>
                        }
                        {confirm && 
                            <button className="button btn rfont s15 b5 cfff" 
                                onClick={()=>{
                                    confirm.fnc();
                                    hide();
                                }}>
                                {confirm.label}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
    
}

const OfferBox = (data) => {
    var ID = generateID(5, 6);
    var _ID = "pop-"+ID;
    var div = document.createElement("div");
    div.id = "pop-" + ID;
    document.body.appendChild(div);
    if(!window.__modals){ window.__modals = []}
    ReactDOM.render(
        <Provider store={store}><OfferDialog
        ref={(ref) => (window.__modals[ID] = ref)}
        meta={data} ID={_ID}/></Provider> , document.getElementById("pop-"+ID)
    );           
    return ID; 
}

export {
    focus, 
    isValidEmail,
    keyCodes,  
    keyupListener,
    generateID,
    Dialog,
    OfferBox,
} 