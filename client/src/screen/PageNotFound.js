import React,{useEffect, useRef} from 'react';
import Lottie from 'react-lottie';
import * as pageNotFound from "../lottie/page-not-found.json"
 
function Privacy(props) { 
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);

    const _pageNotFound_ = {
        loop: true,
        autoplay: true, 
        animationData: pageNotFound.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
     
    return ( 
        <div className="page-not-found flex flex-col aic">
            <div className="vector"><Lottie options={_pageNotFound_} width={350}/></div>  
            <div className='lbl fontr s22 c000'>Opps! Page not found.</div>
            <div className='txt font s16 c333'>Please enter valid way for the best search result.</div>
        </div>   
    );
}

export default Privacy;