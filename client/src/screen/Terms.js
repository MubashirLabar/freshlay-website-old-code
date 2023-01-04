import React,{useEffect} from 'react';
import {Link} from "react-router-dom";

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
                <div className="about-p terms wrapWidth flex flex-col">
                    <div className="title font s24 b black">Terms & Conditions</div>
                    <div className="block">
                        <div className="txt font s15 c333">Freshlay is the lone brand name of Freshlay. We deliver daily fresh fruits vegetables, and grocery things. As a matter of first importance, you ensure that you have perused our terms and conditions cautiously. Previously, utilizing our terms and conditions so you could concur on it prior to putting in your order. </div>
                    </div>
                    <div className="block"> 
                        <div className="lbl font s24 b c000">Being A Customer</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333"><span className="b">a)</span> Being a customer, your age should be 18 to put in a order and should have a Debit card, MasterCard with your name. During placing an order with freshlay you should specify your order and precise location.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">b)</span> Freshlay has the option to drop or suspend your order, and it would be at our discretion.</div>
                            <div className="txt font s15 c333"><span className="b">c)</span> Our Terms and Conditions will apply when you will submit an order.</div>
                        </div>
                    </div>
                    
                    <div className="block"> 
                        <div className="lbl font s24 b c000">Worth-Reading Contract </div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333"><span className="b">a)</span> Once you will place an order on our website then we will affirm your order on your email address that you will give us including cost and delivery subtleties.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">b)</span> If you entered an off base or an incorrect email address so unquestionably you won't get any affirmation email. Assuming other concerning information that you gave us are wrong, we won't be liable for your order.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">c)</span> And in the order that you don't inform us to adjust or drop your request within 10 minutes then we won't change your order details. That is the reason to change or alter your order in a given time.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">d)</span> If your order isn't accessible under any condition, we will inform you and send you the substitution of your order after your confirmation.</div>
                            <div className="txt font s15 c333"><span className="b">Note:</span> For dropping the order, you should send us by email at info@freshlay.com</div>
                        </div>
                    </div>

                    <div className="block"> 
                        <div className="lbl font s24 b c000">Charges for Delivery </div>
                        <div className="txt font s15 c333">The prices are given on our website, so when you will confirm your order, there will be comprehensive of all charges considered, and taxes as applicable. We will finalize the all-out cost of your order, including delivery charges and packaging cost from your credit or debit card at the time you place the order.</div>
                    </div>
                    
                    <div className="block"> 
                        <div className="lbl font s24 b c000">Deliver by Super Men</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333"><span className="b">a)</span> Our delivery guys Super Men will consistently stay in rush to deliver your order to your doorstep within 30 minutes.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">b)</span> If nobody is accessible at your given delivery address, we will leave the notification of the delivery.</div>
                            <div className="txt font s15 c333"><span className="b">c)</span> In outrageous climate conditions like hefty downpour, storm, possibly we can't delivery your order on schedule, so in such conditions, we will get in touch with you to modify the delivery time.</div>
                        </div>
                    </div>

                    <div className="block"> 
                        <div className="lbl font s24 b c000">If you are displeased</div>
                        <div className="txt font s15 c333">We are much focus to offer you the best service by giving the guarantee of all quality foods and goods.  That is why immediately you must inspect the goods upon delivery. And if you are dissatisfied with the delivery or quality of the goods, let us know in writing via email at info@freshlay.com or utilize our Contact us section of the website/app.</div>
                    </div> 

                    <div className="block"> 
                        <div className="lbl font s24 b c000">Freshlay will not be responsible for;</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333"><span className="b">1.</span> We won't be responsible for any indirect or ramification loss or damage of loss of benefits emerging out of our supply or inability to harm of loss of benefits emerging out of our inventory or inability to supply the goods to you.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">2.</span> Possibly some products contain nuts and other allergens, but we will make sure that the content of each package is mentioned clearly. But it is your responsibility to read all of its information. If you need further information about allergens, please do contact us.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">3.</span> For freshlay, you are a consumer that is why we sell to you, our products. But freslo will not be liable for any personal loss if you resell or distribute our goods to others as a business.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">4.</span> Freshlay will be not responsible for the goods that already have been delivered to your address that you mentioned during your order.</div>
                            <div className="txt font s15 c333"><span className="b">5.</span> Kindly note that we will do each conceivable exertion to give you relentless access to our website/app that has no transmission mistake. In any case, some of the time, there can be a few minutes where access is suspended or limited then we will continue to correct for upgrades to reestablish full access to our website/app.</div>
                        </div>
                    </div>

                    <div className="block"> 
                        <div className="lbl font s24 b c000">General Terms and Conditions</div>
                        <div className="item flex flex-col font s15 c333">
                            <div className="txt mrg-b font s15 c333"><span className="b">1.</span> We claim all authority to change our website privacy and terms and conditions whenever yet this will not influence the terms and conditions during at the time you purchase.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">2.</span> We ensure that all product pictures, depiction and prices are accurate that the reason we don't assume the liability of any slip-up. The color and shape can be not the same as those shown on the website/app.</div>
                            <div className="txt mrg-b font s15 c333"><span className="b">3.</span> All registered customers will receive promotional emails and SMS, and if they do not want to receive it then can directly contact us.</div>
                            <div className="txt font s15 c333"><span className="b">4.</span> Customers will be able to get the subscription by paying the amount online and the subscription offer will not be applied with other offers.</div>
                        </div>
                    </div>

                </div> 
            <Footer />
        </React.Fragment>
    );
}

export default Terms;