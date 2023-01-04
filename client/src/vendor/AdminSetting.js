import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// Screen
import AdminSettingSite from "./AdminSettingSite";
import AdminSettingSms from "./AdminSettingSms";
import AdminSettingPayment from "./AdminSettingPayment";
import AdminSettingEmail from "./AdminSettingEmail";
import AdminSettingNotification from "./AdminSettingNotification";
import AdminSettingSocilLinks from "./AdminSettingSocilLinks";
import AdminSettingOpt from "./AdminSettingOpt";
import AdminSettingHomepage from "./AdminSettingHomepage";
import AdminSettingLogin from "./AdminSettingLogin";
import AdminSettingBlog from './AdminSettingBlog';

import {getallsettings} from '../actions/Admin/adminsettings'
function AdminSetting(props) {

    let section = props.match.params.section || "site";

    useEffect(()=>{
        section = props.match.params.section; 
        document.title = "Setting"; 
        window.__setNavTab && window.__setNavTab("/settings");
    })
    const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getallsettings())
    },[])
    const {loaded,settings} = useSelector(state => state.sitesetings)
    return (
        <div className="table-list-p admin-setting">
            <div className="page-title rfont b5 s24 black">Setting</div>
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/settings/site" className={`button btn rfont s15 b5 anim ${section == "site" && "on"}`}>Site Setting</Link>
                    <Link to="/settings/blog" className={`button btn rfont s15 b5 anim ${section == "blog" && "on"}`}>Blog Setting</Link>
                    <Link to="/settings/email" className={`button btn rfont s15 b5 flex aic anim ${section == "email" && "on"}`}>Email Setting</Link>
                    <Link to="/settings/sms" className={`button btn rfont s15 b5 anim ${section == "sms" && "on"}`}>SMS</Link>
                    <Link to="/settings/payment" className={`button btn rfont s15 b5 flex aic anim ${section == "payment" && "on"}`}>Payment</Link>
                    <Link to="/settings/notification" className={`button btn rfont s15 b5 flex aic anim ${section == "notification" && "on"}`}>Manage Coupin</Link>
                    <Link to="/settings/social-links" className={`button btn rfont s15 b5 flex aic anim ${section == "social-links" && "on"}`}>Social Links</Link>
                    <Link to="/settings/opt" className={`button btn rfont s15 b5 flex aic anim ${section == "opt" && "on"}`}>Opt Setting</Link>
                    <Link to="/settings/homepage" className={`button btn rfont s15 b5 flex aic anim ${section == "homepage" && "on"}`}>Homepage</Link>
                    <Link to="/settings/log" className={`button btn rfont s15 b5 flex aic anim ${section == "log" && "on"}`}>Log Setting</Link>
                </div>
            </div>
            <div className="content flex flex-col">
                {loaded ? 
                <React.Fragment>
                {section === "site" && <AdminSettingSite settings={settings}/>}   
                {section === "blog" && <AdminSettingBlog settings={settings}/>}  
                {section === "sms" && <AdminSettingSms settings={settings}/>}    
                {section === "payment" && <AdminSettingPayment settings={settings}/>}    
                {section === "email" && <AdminSettingEmail settings={settings}/>}    
                {section === "notification" && <AdminSettingNotification settings={settings}/>}    
                {section === "social-links" && <AdminSettingSocilLinks settings={settings}/>}    
                {section === "opt" && <AdminSettingOpt settings={settings}/>}    
                {section === "homepage" && <AdminSettingHomepage settings={settings}/>}        
                {section === "log" && <AdminSettingLogin settings={settings}/>}
                </React.Fragment> 
                 :  
                <div className="cover flex aic abs fill">
                    <img src="/images/loader.svg" className="img" />
                </div>
                }        
            </div>
        </div>   
    );
}

export default AdminSetting;