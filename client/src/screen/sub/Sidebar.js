import React,{useState} from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

    const [nav, setNav] = useState([
        {label: "Discover", icon:"icon-home", slug:"/"},
        {label: "Cart", icon:"icon-shopping-cart", slug:"/cart", new: "1"},
        {label: "Wish List", icon:"icon-heart1", slug:"/"},
        {label: "Notification", icon:"icon-bell", slug:"/"},
        {label: "Account", icon:"icon-user", slug:"/my-account"},
        {label: "Logout", icon:"icon-log-out", slug:"/"},  
    ]); 
 
    return (
        <div className="sidebar-page abs fill">
            <div className="sidebar fixed display">
                <div className="head flex flex-col" > 
                    <div className="dp">
                        <div className="img" style={{backgroundImage: "url(https://placeimg.com/640/480/people)"}}/>                                 
                    </div>
                    <div className="meta flex flex-col">
                        <div className="nam rfont s16 cfff">Mubashir Labar</div>
                        <div className="city rfont s14">Multan</div>
                    </div>
                </div>
                <div className="items flex flex-col">
                    {
                        nav.map(item=>(
                            <Link to={item.slug} className="flex aic lin rfont s15 c333 anim">
                                <div className={`ico ${item.icon} s22`} />
                                <div className="rfont s15">{item.label}</div> 
                            </Link> 
                        ))
                    }
                </div>
            </div>
        </div> 
    );
}
 
export default Sidebar;