import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
// Screen
import Header from "./Header";
import Footer from "./Footer";
import CheckoutShipping from "./CheckoutShipping";
import CheckoutReview from "./CheckoutReview";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutFinish from "./CheckoutFinish";

function Checkout(props) {

    let section = props.match.params.section || "shipping";

    useEffect(()=>{
        section = props.match.params.section;
    },[]);  

    return ( 
        <React.Fragment>
            <Header /> 
            <div className="checkout-page">         
                <div className="container wrapWidth">
                    {section == "shipping" && <CheckoutShipping />} 
                    {section == "checkout-review" && <CheckoutReview />} 
                    {section == "checkout-payment" && <CheckoutPayment />} 
                    {section == "checkout-finish" && <CheckoutFinish />} 
                </div>
            </div>  
            <Footer />
        </React.Fragment>
    );
}

export default Checkout;