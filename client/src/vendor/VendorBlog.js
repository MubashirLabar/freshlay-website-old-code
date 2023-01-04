import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
// Screen
import VendorMYBlogs from "./VendorMyBlogs" 
import VendorCreateBlog from './VendorCreateBlog'


function VendorProducts(props) { 
   
    let section = props.match.params.section || "blogging";
    let productid = props.match.params.id
    const {loaded ,user } = useSelector((state) => state.authreducer);

    useEffect(()=>{
        document.title = "Products"; 
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/blogs");
    },[]); 
    
    const [keyword , setkeyword] = useState('')

   
    return (
        <div className="table-list-p vdr-pkgs flex flex-col">
            <div className="page-title rfont b5 s24 black">Blogs</div>
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/blogging/my-blogs/1" className={`button btn rfont s15 b5 anim ${section == "my-blogs" && "on"}`}>My Blogs</Link>
                    <Link to="/blogging/create-blogs/2" className={`button btn rfont s15 b5 anim ${section == "create-blogs" && "on"}`}>Create Blogs</Link>
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
                
                {section === 'my-blogs' && <VendorMYBlogs/>}
                {section === "create-blogs" && <VendorCreateBlog />}           
            </div>   
        </div>
    );
}
 
export default VendorProducts;