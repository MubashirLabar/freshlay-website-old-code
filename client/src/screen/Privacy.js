import React,{useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function Privacy(props) { 
    
    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);
    
    return (
        <React.Fragment>
            <Header />
                <div className="about-p wrapWidth flex flex-col">
                    <div className="title font s26 b black">Privacy Policy</div>
                    <div className="block"> 
                        <div className="item font s15 c333">Freshlay has a profound respect for your values and security that you share with us. Freshlay stresses the clients read the Privacy Policy cautiously. Since they could consent to follow up on the terms and conditions. If you disagree with our privacy policy and Terms and Conditions, Freshlay proposes, kindly don't gain admittance to or utilize our app/web.</div>
                        <div className="item font s15 c333">Our Privacy Policy has a solid association with our terms and conditions about app/web that changes every once in a while, without implication and notice. That is the reason it is proposed that review our Privacy Policy to get updates from the Web/App. On the off chance that you have a question with respect to our Privacy Policy, don't hesitate to reach us at info@freshlay.com</div>
                        <div className="item font s15 c333">Freshlay immediately gathers your data like your name, contact data like a location, telephone number, your IP address, postcode, inclination and interests, and other applicable data. Additionally, we share your data with our workers and concerned approved people to finish the exchange and the delivery interaction easily, securely, and safely.</div>
                        <div className="item font s15 c333">Freshlay keeps a record the entirety of your common data to advise you about new items, extraordinary offers and other occupant data that we think can be useful for you. We maintain mystery the entirety of your common information and don't impart it to any outsider.</div>
                        <div className="item font s15 c333">Freshlay won't request that you share your sensitive data and information by means of phone or email. On the off chance that, if you receive such kind of calls or emails, kindly don't answer and do not share your sensitive information or data. Actually, forward it to us through email at info@freshlay.com, so we could make the important and occupant action against it.</div>
                    </div> 
                </div> 
            <Footer /> 
        </React.Fragment>
    ); 
}

export default Privacy;