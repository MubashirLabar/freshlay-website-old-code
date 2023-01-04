import React from 'react';
import { Link } from 'react-router-dom';

function HeaderAccount(props) {
    return (
        <div className="header-account sticky flex aic"> 
            <div className="wrapWidth flex aic">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/logo.svg" className="img" />
                    </Link>               
                </div>
                <Link to="/" className="close cleanbtn font b3 s24 c333">X</Link>
            </div>
        </div>
    );
}

export default HeaderAccount;