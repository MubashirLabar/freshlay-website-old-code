import React,{useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function Terms(props) { 

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]); 

    return (
        <React.Fragment>
            <Header />
                <div className="about-p delivery wrapWidth flex flex-col">
                    <div className="title font s26 b black">Frequently Asked Questions</div>
                    <div className="block"> 
                        <div className="lbl font s18 b c000">Why Has My Card Been Declined?</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333">Possibly, can be some reasons why your card has been declined. Perhaps, you utilized the wrong PIN. But if still unable to use your card, then for additional details, contact your card provider.</div>
                        </div>
                    </div>

                    <div className="block"> 
                        <div className="lbl font s18 b c000">Shipping Policy</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333">Freshlay responses over your order at the same time when you place your order through Website, Phone call, WhatsApp, Mobile App or Email. Our customer service representative will call you to reconfirm the quantity, address, and delivery timing that you could receive fresh vegetables, fruits, and grocery items at low prices. Free of cost shipping facility starts from Rs…. 000.</div>
                        </div>
                    </div>
                
                    <div className="block"> 
                        <div className="lbl font s18 b c000">Cancellation by Customer/Freshlay</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333">Customers can cancel the order in the given cut-off time after placing the order by calling our customer service agent. In such a condition, we will refund the payment that was already made by you for the order. But if we find any fraudulent activity that does not come under our privacy and terms and conditions then we will cancel the order and will make a list of all negative fraudulent activities to cut off their access to us.</div>
                        </div>
                    </div>
                
                </div> 
            <Footer />
        </React.Fragment>
    );
}

export default Terms;