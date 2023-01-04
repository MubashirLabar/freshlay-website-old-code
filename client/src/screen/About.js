import React,{useEffect} from 'react';

// Screen 
import Header from "./Header";
import Footer from "./Footer"; 

function About(props) {

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
        document.title = 'About Us'
    },[]);  

    return (
        <React.Fragment>
            <Header notBg={true} page='blog-p'/>
            <div className="about-page">
            <div className="banner rel flex aic" style={{backgroundImage: `url(/images/about-banner.jpg)`}}>
                <div className="cvr abs" />
                <div className="title font s38 b6 cfff">About Us</div>
            </div>
            <div className="wrapper flex flex-col">
                <div className="content">
                    <div className="txt font s22 b7 c000">Freshlay is Pakistan’s first	groundbreaking business	concept, allowing people to	buy fresh fruits and vegetables	online directly	from farms because it is based on the "Farm	to fork” concept. Freshlay, like other successful companies, has its unique	selling	points</div>
                    <div className="txt font 15 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>Freshlay's benefits their	customers by selling them fresh, high-quality fruits and vegetables	straight from the farms. Furthermore, before reaching customers, these fruits and vegetables do	not	transit	through	several	retailers due to which Freshlay’s products, in	contrast to	those on the local	market,	are	extremely fresh.</div>
                    </div>
                    <div className="txt font 14 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>Freshlay is also more economical than the local market	or merchants since it provides direct service from producers to	consumers; there are no	retailers or other middlemen to	take a commission, therefore it	is ultimately cheaper than the entire market. To benefit their customers more Freshlay has a variety of	discount offers	available for its clients to attract and encourage them	to buy their product. These	offers will help customers save	money.</div>
                    </div>
                    <div className="txt font 14 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>Freshlay benefits not only consumers but also farmers and producers by purchasing fruits and vegetables at higher prices by paying them 15% extra amount which is more than market rates which allow farmers and producers to earn higher revenues.</div>
                    </div>
                    <div className="txt font 14 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>Freshlay provides convenience for exhausted and drained clients by eliminating the need to go grocery shopping by enabling them to order fresh fruits, vegetables, and groceries directly through Freshlay's website or application, which will be delivered with an immediate delivery approach. In addition to this, Freshlay offers a cash-on- delivery option to its users to make things easier for them.</div>
                    </div>
                    <div className="txt font 14 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>Freshlay does not compromise on the hygiene or quality of their products, which are fruits and vegetables. To preserve and protect their products, they adopt ultrasonic ways and techniques to retain the quality of fruits and vegetables while safeguarding them from unhygienic methods. Furthermore, Freshlay prioritizes not just fresh food delivery, but also hygienic packaging by maintaining a consistent food temperature. Freshlay also ensures that products are packed and delivered in such a way that they are not damaged while getting delivered.</div>
                    </div>
                    <div className="txt font 14 c000 flex">
                        <div className="ico s18 c000">👉</div>
                        <div>The most important part of Freshlay in these times of corona pandemic is safeguarding customers from coronavirus, as we all know that a local market is a place where individuals are most likely to get covid. Customers who use Freshlay's services do not need to leave the house; all they have to do is pick up the phone and place an order.</div>
                    </div>
                </div> 
            </div>
        </div>
            <Footer/>
        </React.Fragment>
    );
}

export default About;