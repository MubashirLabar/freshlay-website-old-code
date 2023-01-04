import React,{useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function ReturnPolicy() { 
    
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);
     
    return (
        <React.Fragment>
            <Header />
                <div className="about-p return wrapWidth flex flex-col">
                    <div className="title font s26 b black">Return Policy</div>
                    <div className="block"> 
                        <div className="item font s15 c333"><span className="b">1)</span> Freshlay has customer supportive return policy that stays till 24 hours from the hour of procurement, so following 24 hours, else, we won't exchange or refund.</div>
                        <div className="item font s15 c333"><span className="b">2)</span> To return refund, your product should be unused and in the very condition that you received and in original packaging.</div>
                        <div className="item font s15 c333"><span className="b">3)</span> Freshlay needs a strong proof to finish the return process and that is a receipt or verification of procurement.</div>
                        <div className="item font s15 c333"><span className="b">4)</span> In various circumstances, just partial refunds are given (If relevant) at that point the item should be in the original condition and ought not be used.</div>
                        <div className="item font s15 c333"><span className="b">5)</span> After getting your return we will inspect it and inform you its accepting. Furthermore, if your sent thing is approved, then your refund process will begin. We will inform you about the rejection or approval of your refund.</div>
                        <div className="item font s15 c333"><span className="b">6)</span> If your refund process is affirmed, we will refund you inside a specific measure of days through your credit card/visa card.</div>
                        <div className="item font s15 c333"><span className="b">7)</span> In any case, if you were unable to get your refund in our specific days, we recommend, kindly first check your bank balance or talk with your bank, because might be refund can take some time.</div>
                        <div className="item font s15 c333"><span className="b">8)</span> If you have done all that, and did not receive refund then contact with us through email at info@freshlay.com</div>
                    </div> 
                </div>
            <Footer />
        </React.Fragment>
    );
}

export default ReturnPolicy;