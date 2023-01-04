import React, { useState } from 'react';
import {Dialog} from "../core";
import moment from 'moment'
import {responseproductrequest} from '../actions/Admin/productrequest'
import {useDispatch} from 'react-redux'

function ProductCardV(props) {

  //  const {ID, label_en, label_ur, discrip, oldPrice, newPrice, unit, stock, img, stamp, catagory} = props.data;
  
    const actions = props.productRequest;
    const {rejected,category,approval,createdAt,productId,stock,_id,oldstock,vendorId} = props.data
    
    //console.log('productdata',props.data)
    const dispatch = useDispatch()
    const Deleteproduct = (props) => {
        const [reason,setreason] = useState('')
        const cancelrequest =async () => {
         const res = await  dispatch(responseproductrequest({id: props.id,rejected:reason,approval:'rejected'}))
         if(res)
         {
             setreason('')
         }
        }
        return (
            <div className="confirm-blk flex flex-col s15 c333">
            <div className="content flex flex-col">
                <div className="rfont s16 c333">Write Reason why you are Rejecting the Request</div>
                <textarea value={reason} onChange={(e) => setreason(e.target.value)}  className="iput rfont s15 c333 anim" />
                <div className="pop-ftr flex aic">
                            <button className="button btn rfont s15 b5 cfff" 
                                onClick={()=>{
                                  cancelrequest()
                                }}>
                               Confirm
                            </button>
                        
                    </div>
            </div>
        </div> 
        )
    }

    const _delete = (id) => {
        Dialog({
            title: "Conformation",
            content: <Deleteproduct id={id}/>,
            /*confirm:{
                label: "Confirm",
                fnc: () => {
                    console.log("Confirm button Click")
                }
            },
            cancel:{
                label: "Cancell",
                fnc: () =>{

                    console.log("Cancell Button Click")
                }
            } */
        })
    }

    const _accept = (id) => {
        Dialog({
            title: "Conformation",
            content: <div className="confirm-blk flex flex-col s15 c333">
                        <div className="content">
                            <div className="msg rfont s16 c333">Are you sure to accept this order?</div>
                        </div>
                     </div>,
            confirm:{
                label: "Confirm",
                fnc: () => {
                    console.log("Confirm button Click")
                    dispatch(responseproductrequest({id:id,approval:'accepted'}))
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

    return (
        <div className="product-card-v flex anim">
            <div className="media">
                {
                    <div className="img" style={{backgroundImage: `url(${process.env.REACT_APP_END_URL}${productId.media})`}}/>
                }
                {
                //<img
                //    className="img"
                //    src={`${process.env.REACT_APP_END_URL}${productId.media}`}
                //  />
                }
            </div>
            <div className="wrap flex flex-col">
                <div className="nam flex aic">
                    <div className="en font s15 b6 c333">{productId.label_en}</div>
                    <div className="ur font s18 b5 c333">{productId.label_ur ? productId.label_ur[0].value : ''}</div>
                </div>
                <div className="txt font s14 c555">{productId.description}</div>
                <div className="meta flex aic">
                    <div className="item flex aic">
                        <div className="lbl rfont s14 c000">Price:</div>
                        <div className="discout rfont s14 b6 c333">Rs. {productId.price - productId.discount}</div>
                     {!productId.discount || productId.discount < 0 ? '' 
                         :
                        <strike className="rfont s16 b3 c777">Rs. {productId.price}</strike>
                      }
                        </div> 
                    <div className="item flex aic">
                        <div className="lbl rfont s14 c555">Unit:</div>
                        <div className="tt rfont s14 c555">{productId.unit}</div>
                    </div>
                    <div className="item flex aic"></div>
                </div>
                <div className="flex aic">
                    <div className="item flex aic">
                        <div className="lbl rfont s14 c000">Available Stock:</div>
                       {props.lastweekuploaded ? 
                        <div className="tt rfont s14 c555">{productId.stock}</div>
                        :
                        <div className="tt rfont s14 c555">{oldstock} + {stock}</div>
                        }
                    </div>
                    <div className="item flex aic">
                        <div className="lbl rfont s14 c000">Catagory:</div>
                        <div className="tt rfont s14 c555">{productId.category}</div>
                    </div>
                    {props.lastweekuploaded ? 
                    '' :
                    <div className="item flex aic">
                        <div className="lbl rfont s14 c000">From:</div>
                        <div className="tt rfont s14 c555">{vendorId.fullname} {vendorId.email} {vendorId.phoneno}</div>
                    </div>
                    }
                </div>
            </div>
            <div className="right flex flex-col">
                {
                    props.lastweekuploaded ?
                    <div className="stamp font s14 c333">{moment(productId.createdAt).calendar()}</div>
                    : 
                    <div className="stamp font s14 c333">{moment(createdAt).calendar()}</div>
                }
                
               {
                   props.lastweekuploaded ? ''
                   :
                <div className="flex aic">
                    {
                    //<button onClick={()=>_edit()} className="btn cleanbtn rfont s14 cfff">Edit</button>
                    }
                    {  approval === 'pending' ?
                        <React.Fragment>
                        <button onClick={()=>_accept(_id)} className="approve btn cleanbtn rfont s14 cfff">Approve</button>
                        <button onClick={()=>_delete(_id)} className="btn cleanbtn rfont s14 cfff">{actions ? "Reject" : "Delete"}</button>
                        </React.Fragment>
                        :
                        approval === 'accepted' ? <div>accepted</div> : <div>Rejected: {rejected}</div>
                    } 
                   {
                       //actions && <button onClick={()=>_accept(_id)} className="approve btn cleanbtn rfont s14 cfff">Approve</button>
                   }
                </div>
               }
            </div>
        </div>
    );
}

export default ProductCardV;