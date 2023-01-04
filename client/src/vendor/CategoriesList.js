import React,{ useState} from 'react';
import { Link} from 'react-router-dom';
import {Dialog} from "../core";
import {useDispatch,useSelector} from 'react-redux'
import {deletecategory} from '../actions/Admin/admincategory'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function CategoriesList(props) { 
    
    const [catagory, setCatagory] = useState([
        {id: "1", image: "/images/vegetables.svg", name: "Vegetables", discrp: "", status: "active"},                                                                                                                                
        {id: "2", image: "/images/fruits.svg", name: "Fruits", discrp: "", status: "active"},                                                                                                                                
        {id: "3", image:"/images/meat.svg", name: "Meat", discrp: "", status: "active"},                                                                                                                                
        {id: "4", image: "/images/grocery.svg", name: "Grocery", discrp: "", status: "active"},                                                                                                                                                                                                                                                                                                                                                                                            
    ]);
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{}])
    const {loaded,categories} = useSelector(state => state.categoriesandroles)
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authreducer);

    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    {/* Delete  Order */}
    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to Delete this Category?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Delete",
                fnc: () => {
                   dispatch(deletecategory(id))
                }
            },
            cancel:{
                label: "Cancell",
                fnc: () =>{
                    console.log("Cancell Button Click")
                }
            }        
        })
    }
    //console.log('loading',loaded)
    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic"> 
                <div className="col rfont s15 b6 c333">ID</div>
                <div className="col rfont s15 b6 c333">Image</div>
                <div className="col rfont s15 b6 c333">Name</div>
                <div className="col rfont s15 b6 c333">Discription</div>
                <div className="col rfont s15 b6 c333">Status</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            { 
            props.dataloaded && loaded ?
             categories.length > 0 ?
                    categories.map((item,index)=>(
                        <div key={index} id={item.id} className="row flex aic anim">
                            <div className="col rfont s14">{item.cat_id}</div>
                            <div className="col rfont s14"><img alt="category" src={`${process.env.REACT_APP_END_URL}${item.image}`} className="image" /></div>
                            <div className="col rfont s14">{item.name}</div>
                            <div className="col rfont s14">{item.description}</div>
                            <div className="col rfont s14 flex aic">{item.status}</div>
                            <div className="col flex aic">   
                                {user.rights.categories.edit  &&   <Link to={`/categories/edit-category/${item._id}`} className="edit btn rfont s14 cfff">Edit</Link> }
                                {user.rights.categories.del  &&  <button onClick={()=>_delete(item._id)} to="/edit-user" className="delete btn rfont s14 cfff">Delete</button> }
                            </div> 
                        </div>
                    ))
                :  
                    <div className="empty-page orders flex flex-col"> 
                        <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                        <div className="meta flex flex-col aic">
                            <div className="txt fontr s18 c000">Categories section is empty!</div>
                        </div>
                    </div> 
                : 
                <React.Fragment>
                    {
                        emptyOrder.map(e=>(
                            <div className="row placeholder flex aic">
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
                                <div className="col holder" />
                            </div>
                        ))
                    }
                </React.Fragment>
            }
        </div> 
    );
}

export default CategoriesList;