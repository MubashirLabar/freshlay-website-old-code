import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// Screen
import Header from "./Header";
import Footer from "./Footer";
import OrdersActive from "./OrdersActive"; 
import OrdersPrevious from "./OrdersPrevious";

function UserOrders(props){

    let section = props.match.params.section || "active";

    useEffect(()=>{
        section = props.match.params.section;
    },[]); 

    return (
        <React.Fragment>
            <Header />
            <div className="my-orders flex flex-col wrapWidth">
                <div className="page-title font b6 s24 black">My Orders</div>
                <div className="head flex aic"> 
                    <Link to="/user/my-orders/active" className={`button btn font s15 b6 anim ${section == "active" && "on"}`}>Active</Link>
                    <Link to="/user/my-orders/previous" className={`button btn font s15 b6 anim ${section == "previous" && "on"}`}>Previous</Link>
                </div>
                <div className="content flex flex-col">
                    {section == "active" && <OrdersActive />} 
                    {section == "previous" && <OrdersPrevious />}  
                </div>  
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default UserOrders;