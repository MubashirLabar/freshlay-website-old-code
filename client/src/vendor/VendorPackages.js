import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
// Screen
import VendorPackagesAll from "./VendorPackagesAll" 
import VendorPackageCreate from './VendorPackagesCreate'
import VendorMyPackages from "./VendorMyPackages";

import axios from 'axios'
import zuz from '../core/Toast'

function VendorProducts(props) { 
   
    let section = props.match.params.section || "all-packages";
    let productid = props.match.params.id
    const {loaded ,user } = useSelector((state) => state.authreducer);

    useEffect(()=>{
        document.title = "Products"; 
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/packages");
    },[]); 
    
    const [keyword , setkeyword] = useState('')

   
    return (
        <div className="table-list-p vdr-pkgs flex flex-col">
            <div className="page-title rfont b5 s24 black">Packages</div>
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/packages/all-packages/1" className={`button btn rfont s15 b5 anim ${section == "all-packages" && "on"}`}>All Packages</Link>
                    <Link to="/packages/my-packages/2" className={`button btn rfont s15 b5 anim ${section == "my-packages" && "on"}`}>My Packages</Link>
                {loaded ? user.rights.packages.create &&    <Link to="/packages/create-package/3" className={`button btn rfont s15 b5 anim ${section == "create-package" && "on"}`}><span className="icon-plus b6 ico"/><span>Create Package</span></Link> : '' }
                </div> 
                { section === 'all-packages' &&
                <div className="rig flex aic">
                <div className='search-bar flex aic anim'>
                 <input onChange={(e) => setkeyword(e.target.value)} className="iput rfont s15 c333" placeholder="Search package by id" />
                </div>
                </div>
                 }
                
            </div>
            <div className="content flex flex-col">
                {section === "all-packages" && <VendorPackagesAll keyword={keyword} />}  
                {section === 'my-packages' && <VendorMyPackages/>}
                {section === "create-package" && <VendorPackageCreate />}           
            </div>   
        </div>
    );
}
 
export default VendorProducts;