import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
// Screen
import CategoriesList from "./CategoriesList";
import CategoriesAddNew from "./CategoriesAddNew";
import {getcategories} from '../actions/Admin/admincategory'
import CategoriesEdit from './CategoriesEdit';

function Categories(props){

    let section = props.match.params.section || "list";
    const dispatch = useDispatch();
    const [dataloaded,setdataloaded] = useState(false)
    useEffect(()=>{
        document.title = "Category";
        section = props.match.params.section;
        window.__setNavTab && window.__setNavTab("/categories/list/1");

        const getdata= async () => {
            const res =await dispatch(getcategories({status : '0'}))
            if(res)
            {
              setdataloaded(true)
            } 
            }
        getdata()
    },[]);
   const filtercategory = (val) => {
        dispatch(getcategories({status: val}))
   }
   const { user } = useSelector((state) => state.authreducer); 
    return (
        <div className="table-list-p categories-page flex flex-col">
            <div className="page-title rfont b5 s24 black">Users List</div>
            {/* Header */}
            <div className="head flex aic"> 
                <div className="lef flex aic">
                    <Link to="/categories/list/1" className={`button btn rfont s15 b5 anim ${section === "list" && "on"}`}>Categories</Link>
                    {user.rights.categories.create  &&    <Link to="/categories/add-category/2" className={`button btn rfont s15 b5 anim ${section === "add-category" && "on"}`}><span className="icon-plus b6 ico"/><span>Add Category</span></Link> }
                </div>
                {section === "list"  && <div className="rig flex aic">
                    <select onChange={(e) => filtercategory(e.target.value)} className="filter-item rfont s14 c333">
                        <option value="0">Default Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>}
            </div>
            <div className="content flex flex-col">
                {section === "list" && <CategoriesList dataloaded={dataloaded}/>}  
                {section === "add-category" && <CategoriesAddNew />} 
                {section === "edit-category" && <CategoriesEdit id={props.match.params.id}/>}
            </div>   
        </div>
    );
}
 
export default Categories;