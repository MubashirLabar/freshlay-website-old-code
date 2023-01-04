import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateProduct } from "../actions/Admin/adminProduct";
import { getcategories } from "../actions/Admin/admincategory";
import { getscales } from "../actions/Admin/adminscale";
import axios from "axios";
import zuz from "../core/Toast";
function VendorProductsCreate(props) {
  const [picUrl, setPicUrl] = useState("");
  //const [choppedimages,setchoppedimages] = useState([])
  const [file, setfile] = useState("");
  const [chopped,setchopped] = useState('Unchopped')
  const [label_en, setlabel_en] = useState("");
  const [label_ur, setlabel_ur] = useState("");
  const [unit, setunit] = useState("all");
  const [price, setprice] = useState("");
  let [marketprice, setmarketprice] = useState("");
  const [status, setstatus] = useState("Active");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("all");
  const [next_prod_id, setnext_prod_id] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const callme = async () => {
      dispatch(getcategories({ status: "0" }));
      // getting new product id
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getnextproductid`);
        setnext_prod_id(res.data.product_id);
      } catch (error) {
        if (error.response) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        }
      }
    };
    callme();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getscales({ status: "0" }));
  }, [dispatch]);
  const { scale_loaded, scales } = useSelector(
    (state) => state.categoriesandroles
  );
  //console.log(scales)

  // Adding Product
  const uploadproduct = async () => {
    if (!label_en) {
      zuz.Toast.show({
        html: `Please input english name field`,
        time: 5,
      });
    }
    else if(!category) {
      zuz.Toast.show({
        html: `Please select a category`,
        time: 5,
      });
    }
    else if(!label_ur) {
      zuz.Toast.show({
        html: `Please input urdu name field`,
        time: 5,
      });
    }
    else if(!unit) {
      zuz.Toast.show({
        html: `Please input a unit`,
        time: 5,
      });
    }
    else if(unit === "all") {
      zuz.Toast.show({
        html: `Please input a unit`,
        time: 5,
      });
    }
    else if(!price) {
      zuz.Toast.show({
        html: `Please input price`,
        time: 5,
      });
    }
    else if(!status) {
      zuz.Toast.show({
        html: `Please select a status`,
        time: 5,
      });
    }
    else if(!file) {
      zuz.Toast.show({
        html: `Please select an image`,
        time: 5,
      });
    }
    else if(!marketprice) {
      zuz.Toast.show({
        html: `Please input market price`,
        time: 5,
      });
    }
    else if(category === "all") {
      zuz.Toast.show({
        html: `Please select category`,
        time: 5,
      });
    }
    else {
      // if (!discount) {
      //   discount = 0;
      // }
      if(Number(marketprice) < Number(price)) {
        return zuz.Toast.show({
          html: `Market price must be greater than freshlay price`,
          time: 5,
        });
      }
      // Uploading chopped images
       //let formData = new FormData;
       let choppedimages = []
       if(chopped == "Chopped"){
       let formData = new FormData(document.getElementById('myformss'));
       const config = {
         header: { "content-type": "multipart/form-data" },
       };

       try {
         const res = await axios.post(
           `${process.env.REACT_APP_API_URL}/product/uploadchoppedimages`,
           formData,
           config
         );
         if(res.data.status === 'success')
         {
           choppedimages = res.data.imagespaths
         }
       } catch (error) {
         zuz.Toast.show({ html: `Error uploading images`, time: 5 });
       }
      }
      const res = await dispatch(
        CreateProduct(file, {
          label_en,
          label_ur,
          unit: unit.toLowerCase(),
          price : marketprice,
          discount : marketprice - price,
          status: status.toLowerCase(),
          description,
          chopped,
          choppedimages,
          category: category.toLowerCase(),
        })
      );
      //console.log('got response boy',res)
      if (res) {
        setlabel_en("");
        setlabel_ur("");
        setprice("");
        setPicUrl("");
        setdescription("");
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getnextproductid`);
          setnext_prod_id(res.data.product_id);
          props.setreload(true)
        } catch (error) {
          if (error.response) {
            zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
          }
        }
      }
    }
  };
  const { loaded, categories } = useSelector(
    (state) => state.categoriesandroles
  );
  return (
    <div className="add-new-category flex flex-col">
      <div className="form flex">
        <div className="item flex flex-col">
            <div className="lbl rfont s15 c333">
              ID<span className="astarick">&#42;</span>
            </div>
            <input
              type="text"
              readOnly
              value={`PO-${next_prod_id}`}
              className="iput rfont s15 c333 anim"
            />
        </div>
        <div className="item flex flex-col">
            <div className="lbl rfont s15 c333">
              Name (Eng)<span className="astarick">&#42;</span>
            </div>
            <input
              type="text"
              value={label_en}
              onChange={(e) => setlabel_en(e.target.value)}
              className="iput rfont s15 c333 anim"
            />
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Name (Urdu)<span className="astarick">&#42;</span>
          </div>
          <input
            type="text"
            value={label_ur}
            onChange={(e) =>
              setlabel_ur(e.target.value === "" ? null : e.target.value)
            }
            className="iput rfont s15 c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Unit<span className="astarick">&#42;</span>
          </div>
          <select
            className="iput rfont s15 c333 anim"
            onChange={(e) => setunit(e.target.value)}>
            <option value="all">Select unit</option>
            {scale_loaded
              ? scales.map((item, index) => (
                  <option key={index} value={`${item.symbol}`}>
                    {item.name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Freshlay Price<span className="astarick">&#42;</span>
          </div>
          <input
            type="number"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="iput rfont s15 c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">Market price</div>
          <input
            type="number"
            value={marketprice}
            onChange={(e) => setmarketprice(e.target.value)}
            className="iput rfont s15 c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Status<span className="astarick">&#42;</span>
          </div>
          <select
            className="iput rfont s15 c333 anim"
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Product Image<span className="astarick">&#42;</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="iput image rfont s15 c333 anim"
            onChange={(e) => {
              console.log(e.target.files)
              let file = e.target.files[0];
              setfile(file);
              // console.log('file',file)
              file && setPicUrl(URL.createObjectURL(file));
            }}
          />
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">Discription</div>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="iput textarea rfont s15 c333 anim"
          />
        </div>
        <div className="item flex flex-col">
          <div className="img-preview">
            <img
              alt="product"
              src={picUrl ? picUrl : "/images/category.png"}
              className="img"
            />
          </div>
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Category<span className="astarick">&#42;</span>
          </div>
          <select
            className="iput rfont s15 c333 anim"
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="all">Select Category</option>
            {loaded
              ? categories.map((item, index) => (
                  <option key={index} value={`${item.name}`}>
                    {item.name}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">Chopped/UnChopped (Optional)</div>
          <select className="iput rfont s15 c333 anim" onChange={(e) => {setchopped((e.target.value).toString())}}>
            <option>Unchopped</option>
            <option>Chopped</option>
          </select>
        </div>
        {chopped === "Chopped" && 
        <div className="item flex flex-col">
          <div className="lbl rfont s15 c333">
            Chopped Images<span className="astarick">&#42;</span>
          </div>
          <form 
          id="myformss"
          //action={`${process.env.REACT_APP_API_URL}/product/uploadchoppedimages`} 
          onSubmit={async(e) => { 
          e.preventDefault()
          } }
          enctype="multipart/form-data" method="post">
              <input type="file" className="iput image rfont s15 c333 anim" name="multi" accept='image/*' multiple/>
              {
                //<input type="submit" value="Upload Images"/>
              }
          </form>
          </div>
        }
      </div>
     
      <div className="ftr flex aic">
        <button
          onClick={() => uploadproduct()}
          className="button btn rfont s16 b5 cfff"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default VendorProductsCreate;
