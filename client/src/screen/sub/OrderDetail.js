import React,{useState, useEffect, useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import zuz from '../../core/Toast'
import {getallOrders} from '../../actions/Admin/adminorder'

function OrderDetail(props) { 
    //console.log(props.discountedprice)
    //console.log(props)
    const dispatch = useDispatch()
    const [edit,setedit] = useState(false)
    const [theitems,settheitems] = useState([])
    let serialNo = 1;
    const [orderDetail, setOrderDetail] = useState([
        {order_id: "ZN847", po_id:"PO-12230", item_name: "White Potato", qty: "1kg", price: "60"},
        {order_id: "ZN846", po_id:"PO-12230", item_name: "Ginger China", qty: "500gm", price: "150"},
        {order_id: "ZN845", po_id:"PO-12230", item_name: "Crinkled Smooth", qty: "1kg", price: "50"},
        {order_id: "ZN844", po_id:"PO-12230", item_name: "Leshan China", qty: "500gm", price: "120"},
    ]); 

    const [loaded,setloaded] = useState(false)
    const [theorder,settheorder] = useState([])
    const [delivery,setDelivery] = useState('')
    const id = props.orderid
    //console.log(theorder)
    useEffect(() => {
        const getanorder = async () => {
            try {
                const res = await  axios.get(`${process.env.REACT_APP_API_URL}/order/getanorder/${id}`)
                if(res.data.status === 'success'){
                 //console.log(res)
                 settheorder(res.data.order)
                 settheitems(res.data.order.orderItems)
                 setDelivery(res.data.order.deliverytype)
                 dispatch({type : "Orderitems",payload : res.data.order.orderItems})
                 setloaded(true)
                }
               } catch (error) {
                console.log(error)
               if(error.response){    
                   zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
               }
               } 
        }
        getanorder()
        },[])
    
    const {dashboardlogined} = useSelector(state => state.authreducer)
    // manage items quantity
    const Orderqty = ({item,edit}) => {
        console.log('itrmmm',item)
        const [qty,setqty]  = useState(item.qty)
        const {orderItems} = useSelector(state => state.generalReducers)
        const updateitemsqty = (id,qty) => {
          const moditems = orderItems.map((item) => {
              //console.log(item._id === id)
              if(item._id === id) {
                  //console.log({...item,qty : qty})
                  return {...item,qty : qty}
              }
              else {
                  return item
              }
          })
          dispatch({type :'Orderitems',payload : moditems})
        }
        useEffect(() => {
            orderItems.map((theitem) => { 
                if(item.id === theitem.id) 
                {
                     setqty(theitem.qty) 
                } 
            })
        },[])

        return (
            <>
            {edit && <button className='cleanbtn ico icon-minus s18 anim' onClick={() => {
                //setqty(qty-1)
                updateitemsqty(item._id,item.unit === "g" ? qty - 50 : qty - 1)
                }}/> }
              <div className="col rfont s14 c333 ">{`${qty}${item.unit}`}</div>
            {edit && <button className='cleanbtn ico icon-plus s18 anim' onClick={() => {
                console.log('calling',qty + 1)
                //setqty(qty+1)
                updateitemsqty(item._id,item.unit === "g" ? qty + 50 : qty + 1)
            }
            }
                />
                 }
            </>
        )
    }


    const {orderItems} = useSelector(state => state.generalReducers)
    const modifyitems  = async () => {
       
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/order/editanorder/${id}`,{items: orderItems,delivery}
              );    
            //console.log(data)
            zuz.Toast.show({html:`Order edit successfully`, time: 5});
            setedit(!edit)
            dispatch(getallOrders())
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                  zuz.Toast.show({ html: `${error.response.data.errors}`, time: 10 });
                } else {
                  zuz.Toast.show({ html: `${error.response.statusText}`, time: 10 });
                }
              }
        }
    }
    
    return (
        <div className="order-detail flex">
        {
        !loaded && <div className="cover flex aic abs fill">
                     <img src={`/images/loader.svg`} className="img" />
                  </div>
        }
        {loaded &&  <div className="wrap flex flex-col"> 
            {theorder.orderItems.length !== 0 && 
                <div className="hdr flex aic">
                    <div className="col rfont s14 b6 c333">Sr#</div>
                    {theorder.packages.length > 0 ? '' :    <div className="col rfont s14 b6 c333">Pro_ID</div> }
                    <div className="col rfont s14 b6 c333 wordwrap">Item Name</div>
                    <div className="col rfont s14 b6 c333 wordwrap">Qty</div>
                    {theorder.packages.length > 0 ? '' :    <div className="col rfont s14 b6 c333">Price</div> }
                    {theorder.packages.length > 0 ? '' :    <div className="col rfont s14 b6 c333">Discount</div> } 
                </div>
            }
                {
                    serialNo = 1,
                    theorder.orderItems.map((item,index)=>(
                        <div key={index} className="row flex aic">
                            <div className="col rfont s14 c333">{serialNo++}</div>
                            {theorder.packages.length > 0 ? '' : <div className="col rfont s14 c333">{item.prod_id}</div> }
                            <div className="col rfont s14 c333">{item.label_en}</div>
                             <Orderqty edit={edit} item={item} /> 
                            {/* <button className='cleanbtn ico icon-minus s18 anim' onClick={() => props.updateitemsqty(item._id,1)}/>
                              <div className="col rfont s14 c333 ">{`${item.qty}${item.unit}`}</div>
                            <button className='cleanbtn ico icon-plus s18 anim' onClick={() => props.updateitemsqty(item._id,1)}/> */}
                            {theorder.packages.length > 0 ? '' : <div className="col rfont s14 c333">{`${item.price}/${item.orgunit}`}</div> }
                            {theorder.packages.length > 0 ? '' : <div className="col rfont s14 c333">{item.discount}</div> }
                        </div>
                    ))
                }
                { 
                theorder.packages.length > 0 ?
                theorder.packages.length !== 0 &&
                <div className="hdr pkg flex aic">
                    <div className="col rfont s14 b6 c333">Sr#</div>
                    <div className="col rfont s14 b6 c333">PKG_ID</div> 
                    <div className="col rfont s14 b6 c333">Price</div> 
                    <div className="col rfont s14 b6 c333">Discount</div> 
                </div>
                : ''
                }
                {                
                theorder.packages ?
                theorder.packages.length > 0 ?
                theorder.packages.map((item,index) => (
                  <div key={index} className="row pkg flex aic">
                  <div className="col rfont s14 c333">{index+1}</div>
                  <div className="col rfont s14 c333">{item.PKG_id}</div>
                  <div className="col rfont s14 c333">{Number(item.price)}</div>
                  <div className="col rfont s14 c333">{Number(item.discount)}</div>
                  </div>
                ))
                : ''
                : ''
                }
                <div className="actions flex aic" >
                    <div className="act flex aic">
                        {dashboardlogined && <button onClick={() => setedit(!edit)} className={`button btn font s15 b6 anim on`}>Edit</button> }
                        {edit && <button onClick={() => modifyitems()} className={`button btn font s15 b6 anim on`}>Save</button> }
                        {edit && <> 
                        <button className='cleanbtn item flex aic' onClick={() => setDelivery('normal')}>
                            <div className={`rel anim ${delivery == 'normal' ? 'on' : ''}`}>
                                <div className={`circle abs anim ${delivery == 'normal' ? 'on' : ''}`}/>
                            </div>  
                            <div className='meta flex flex-col'>
                                <div className='lb fontl s14 c333 b5'>Free Delivery</div>
                            </div>
                        </button>
                        <button className='cleanbtn item flex aic' onClick={() => setDelivery('express')}>
                            <div className={`rel anim ${delivery == 'express' ? 'on' : ''}`}>
                                <div className={`circle abs anim ${delivery == 'express' ? 'on' : ''}`}/>
                            </div>
                            <div className='meta flex flex-col'>
                                <div className='lb fontl s13 c333 b5'>Express Delivery</div>
                            </div>
                        </button>
                        </>
                        }
                    </div>
                   <div className="ftr flex aic rfont s16 b6 black">Total: {theorder.discountedprice}</div>
                </div>
            </div> }
        </div>
    );
}

export default OrderDetail;