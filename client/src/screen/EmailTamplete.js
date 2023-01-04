import React from 'react';
import {Link} from "react-router-dom"

function EmailTamplete(props) {

    const date = new Date() 

    return(
        <div className="email-tamplate">
            <div className="line" />
            <div className="tamp-blk rel"> 
                <img src={`/images/logo.svg`} className="logo" />
                <div className="title">Your Login Verification Code</div>
                <div className="nam">Hello Gohar,</div>
                <div className="code-blk">
                    <div className="txt">Here is your login verification code:</div>
                    <div className="code">772460</div>
                </div> 
                <div className="msg">Please make sure you never share this code with anyone.</div>
                <div className="note"><span className="b6 color">Note:</span>&nbsp;The code will expire in 5 minutes.</div>
                <div className="ftr">
                    <img src={`${process.env.REACT_APP_END_URL}/images/logo.svg`} className="log" />
                    <div className="rits">{`© Freshlay ${date.getFullYear()} All rights reserved.`}</div>
                    <div className="icons">
                        <Link to="/" className="social icon-facebook"/>
                        <Link to="/" className="social icon-instagram"/>
                        <Link to="/" className="social icon-twitter"/>
                        <Link to="/" className="social icon-linkedin"/>
                    </div>
                </div> 
            </div> 
        </div>
    )
}

export default EmailTamplete;