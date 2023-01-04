import React,{useEffect} from 'react';

// Screen 
import Header from "./Header"; 
import Footer from "./Footer"; 

function Couriers(props) {

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);

    return (
        <React.Fragment>
            <Header />
            <div className="about-p contact wrapWidth flex flex-col">
                <div className="title font s28 b black">Couriers</div>
                <div className="txt mrg-b font s15 c333">Freshlay has its own unique super-fast delivery system by <b>SUPERMEN</b> in every corner of Pakistan at very low charges with 100% secure delivery and cash on delivery everywhere. We have a highly dedicated and professional staff that provides courier and dispatch services.</div>
                <div className="txt font s15 c333">Place your order with us today.</div>
            </div>
            <Footer /> 
        </React.Fragment>
    );
}

export default Couriers;