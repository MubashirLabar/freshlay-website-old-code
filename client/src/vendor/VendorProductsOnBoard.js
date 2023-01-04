import React, { useState, useEffect } from "react";
import ProductCardV from "./ProductCardV";
import { getProductrequest } from "../actions/Admin/productrequest";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import zuz from "../core/Toast";
import Lottie from 'react-lottie';
import * as emptyPage from "../lottie/emptyPage.json"

function VendorProductsOnBoard() {
  const [onboardproducts,setonboardproducts] = useState([])
  const [loaded,setloaded] = useState(false)
  const [products, setProducts] = useState([
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "120kg",
      img: "/images/1.jpg",
      stamp: "45m",
      catagory: "vegetable",
    },
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "670kg",
      img: "/images/2.jpg",
      stamp: "3 hour",
      catagory: "vegetable",
    },
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "340 kg",
      img: "/images/3.jpg",
      stamp: "3 hour",
      catagory: "vegetable",
    },
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "1000 Qty",
      img: "/images/4.jpg",
      stamp: "3 hour",
      catagory: "vegetable",
    },
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "120 Dozan",
      img: "/images/5.png",
      stamp: "Feb 14, 2020",
      catagory: "vegetable",
    },
    {
      ID: "1",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      discrip: "Alo Safed 500gm( White Potato)",
      oldPrice: "75",
      newPrice: "70",
      unit: "1kg",
      stock: "500kg",
      img: "/images/6.jpg",
      stamp: "Feb 14, 2020",
      catagory: "vegetable",
    },
  ]);

  const _emptyPage_ = {
    loop: true,
    autoplay: true, 
    animationData: emptyPage.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};


  useEffect(() => {
    const getproducts = async () => {
      try {
          const res = await  axios.get(`${process.env.REACT_APP_API_URL}/product/onboardproducts`)
          if(res.data.status === 'success'){
           setonboardproducts(res.data.products)
           setloaded(true)
          }
         } catch (error) {
          console.log(error)
         if(error.response){
             zuz.Toast.show({html:`${error.response.data.errors}`, time: 5});
         }
         } 
  }
  getproducts()
  }, []);

  return loaded ? 
  onboardproducts.length > 0 ? 
  (
    <div className="wrapper flex flex-col">
      <div className="items flex flex-col">
        {onboardproducts.map((item,index) => (
          <ProductCardV key={index} data={{productId:item}} lastweekuploaded={true} />
        ))}
      </div>
    </div>
  )
  :
  <div className="empty-page orders flex flex-col"> 
          <div className="vector"><Lottie options={_emptyPage_} width={250}/></div>
            <div className="meta flex flex-col aic">
              <div className="txt fontr s18 c000">On Board section is empty!</div>
          </div>
    </div> 
   : 
  (
    <div className="wrapper flex flex-col">
      <div className="items flex flex-col">
          <div className="product-card-v holder" />
          <div className="product-card-v holder" />
          <div className="product-card-v holder" />
          <div className="product-card-v holder" />
      </div>
    </div>
  );
}

export default VendorProductsOnBoard;
