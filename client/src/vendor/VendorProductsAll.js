import React,{useState} from 'react';
import {Dialog} from "../core";
import {Link} from 'react-router-dom'
import moment from 'moment'
import {deleteproduct} from '../actions/Admin/adminProduct'
import {useDispatch,useSelector} from 'react-redux'

import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function VendorProductsAll(props) {  
    
    const [products, setProducts] = useState([                                                               
        {product_id: "PO-12230", image: "/images/1.jpg", name:{en: "White Potato", ur: "سفید آلو"}, catagory: "vegetable", unit:"1Kg", price: "80", discout: "10", status: "active", stamp: "1h ago", discrp: "Alo Safed 500gm( White Potato)"},
        {product_id: "PO-12231", image: "/images/2.jpg", name:{en: "White Potato", ur: "سفید آلو"}, catagory: "vegetable", unit:"1Kg", price: "80", discout: "10", status: "active", stamp: "1h ago", discrp: "Alo Safed 500gm( White Potato)"},
        {product_id: "PO-12231", image: "/images/3.jpg", name:{en: "White Potato", ur: "سفید آلو"}, catagory: "vegetable", unit:"1Kg", price: "80", discout: "10", status: "active", stamp: "1h ago", discrp: "Alo Safed 500gm( White Potato)"},
        {product_id: "PO-12231", image: "/images/4.jpg", name:{en: "White Potato", ur: "سفید آلو"}, catagory: "vegetable", unit:"1Kg", price: "80", discout: "10", status: "active", stamp: "Jan 19,2021", discrp: "Alo Safed 500gm( White Potato)"},
        {product_id: "PO-12231", image: "/images/5.png", name:{en: "White Potato", ur: "سفید آلو"}, catagory: "vegetable", unit:"1Kg", price: "80", discout: "10", status: "active", stamp: "Jan 19,2021", discrp: "Alo Safed 500gm( White Potato)"},
    ]); 
    const { user } = useSelector((state) => state.authreducer);
    const [emptyOrder, setEmptyOrder] = useState([{},{},{},{},{},{},{},{},{},{}])

    {/* Delete  Product */}
    const dispatch = useDispatch()
    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to Delete this Product?</div>
                        </div>
                    </div>,
            confirm:{
                label: "Delete",
                fnc: () => {
                  dispatch(deleteproduct(id))
                    //  console.log("Confirm button Click")
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
  
    const _emptyPage_ = {
        loop: true,
        autoplay: true, 
        animationData: emptyPage.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="table flex flex-col">
            <div className="hdr flex aic">
                <div className="col rfont s15 b6 c333">ID</div>
                <div className="col rfont s15 b6 c333">Image</div>
                <div className="col rfont s15 b6 c333">Name</div>
                <div className="col rfont s15 b6 c333">Catagory</div>
                <div className="col rfont s15 b6 c333">Unit</div>
                <div className="col rfont s15 b6 c333">Price</div>
                <div className="col rfont s15 b6 c333">Discount</div>
                <div className="col rfont s15 b6 c333">Status</div>
                <div className="col rfont s15 b6 c333">Create Date</div>
                <div className="col rfont s15 b6 c333">Discription</div>
                <div className="col rfont s15 b6 c333">Actions</div> 
            </div>
            {  
            props.loaded && props.dataloaded ?
             props.products.length > 0 ?
                    props.products.map((item,index)=>(
                        <div key={index} id={item.Incoice_no} className="row flex aic anim">
                            <div className="col rfont s14">{item.prod_id}</div>
                            <div className="col rfont s14">
                                <img src={`${process.env.REACT_APP_END_URL}${item.media}`} className="img" />
                            </div> 
                            <div className="col rfont s14 flex flex-col">
                                <div className="nam">{item.label_en}</div>
                                <div className="nam">{item.label_ur ? item.label_ur[0].value : ''}</div>
                            </div>
                            <div className="col rfont s14">{item.category}</div>
                            <div className="col rfont s14">{item.unit}</div>
                            <div className="col rfont s14">{item.price}</div>
                            <div className="col rfont s13">{item.discount}</div>
                            <div className="col rfont s14">{item.status}</div>
                            <div className="col rfont s14">{moment(item.createdAt).format('MMMM Do YYYY')}</div> 
                            <div className="col rfont s14">{item.description}</div>
                            <div className="col" >

                            { user.rights.products.edit &&   <Link to={`/products/edit-product/${item._id}`} className="edit btn cleanbtn rfont s14 cfff">Edit</Link> }
                            {
                            // user.rights.products.del &&    <button onClick={()=>_delete(item.id)} className="delete btn cleanbtn rfont s14 cfff">Delete</button> 
                            }
                            </div>  
                        </div>
                    ))
                : 
                <div className="empty-page orders flex flex-col"> 
                    <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
                    <div className="meta flex flex-col aic">
                        <div className="txt fontr s18 c000">Product section is empty!</div>
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

export default VendorProductsAll;