 import React, { useState,useEffect } from 'react';
 import {Link} from 'react-router-dom';
 import {searchProducts} from '../../actions/product'; 
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import {
    keyupListener,
    keyCodes
} from "../../core"

 
 function Searchbox(props) {
    const dispatch = useDispatch();
     const [input,setinput] = useState('');
     //console.log('input',input.length)
     let history = useHistory();
 
    const onkekupvalue = () => {
        if(input.length > 0){
        history.push(`/user/search-result/${input}`);
        dispatch({type: "HIDE_SIDEBAR", payload: true}) 
        }
    }
     return (
       
         <button className='cleanbtn search-bar flex aic anim'   onClick={(e) => {e.stopPropagation()}}>
             {input.length === 0 ?  <span className="ico icon-search s18 c333" ></span> : 
             <Link to={`/user/search-result/${input}`} className="ico icon-search1 s18 c333" /> }
             <input placeholder={"Search Products"} value={input} onKeyUp={(e)=>{keyupListener(e, keyCodes.ENTER, ()=>{onkekupvalue()})}} onChange={(e) => 
                {
                    setinput(e.target.value)
                    dispatch(searchProducts(e.target.value)); 
                } 
                } className="iput fontl s16 c000" />  
         </button> 
     );
 } 
 
 export default Searchbox;