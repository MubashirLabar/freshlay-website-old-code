import React,{useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function Contact(props) {

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[]);

    return (
        <React.Fragment>
            <Header />
            <div className="about-p contact wrapWidth flex flex-col">
                <div className="title font s28 b black">Contact Us</div>
                <div className="txt font s18 c333">24 X 7 Online Orders via Whatsapp/ Mobileapp/ Email/</div>
                <div className="txt font s18 c333">Telephonic Orders: 00:00 AM</div>
                <div className="txt font s18 c333">Call at 0000000- 00000- 00000</div>
                <div className="txt font s18 c333">Email @ ………………….</div>
                <div className="txt font s18 c333">Whatsapp 00000000</div>
                <div className="txt font s18 c333">Facebook ……………..</div>
            </div>
            <Footer /> 
        </React.Fragment>
    );

    /*return (
        <React.Fragment> 
            <Header />
            <div className="contact-p flex flex-col">
                <div className="title font s26 b black">Contact us</div>
                <div className="block flex flex-col">
                    <div className="lbl font s16 b c333">Stuck somewhere and feeling alone?</div>
                    <div className="txt a font s14 c333">Fill in details and hit `Send` and we will get back to you in no time :)</div>
                    <input type="text" placeholder="Full name" className="cleanbtn iput font s15 c333 anim"/>
                    <input type="text" placeholder="Email" className="cleanbtn iput font s15 c333 anim"/>
                    <input type="text" placeholder="Subject" className="cleanbtn iput font s15 c333 anim"/>
                    <textarea type="text" placeholder="Your Message..." className="cleanbtn textarea iput font s15 c333 anim"/>
                    <button className="button btn font s15 b6 cfff">Send Message</button>
                </div> 
            </div>
            <Footer /> 
        </React.Fragment>
    );*/
}

export default Contact;