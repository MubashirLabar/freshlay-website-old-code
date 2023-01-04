import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../actions/Admin/adminProduct";
import { getcategories } from "../actions/Admin/admincategory";
import { listProductDetails } from "../actions/product";
import { getscales } from "../actions/Admin/adminscale";
import axios from "axios";
import zuz from "../core/Toast";
function VendorProductsEdit(props) {
  const { loading, product } = useSelector((state) => state.productdetails);
  const [chopped, setchopped] = useState("Unchopped");

  useEffect(() => {
    if (product) {
      setlabel_en(product.label_en);
      setlabel_ur(product.label_ur ? product.label_ur[0].value : "");
      setunit(product.unit);
      setprice(product.price);
      setmarketprice(product.price + product.discount);
      setcategory(product.category);
      setdescription(product.description);
      setstatus(product.status);
      setimage(product.media);
      setprod_id(product.prod_id);
      setchopped(product.chopped);
    }
  }, [product]);
  const [picUrl, setPicUrl] = useState("");
  const [file, setfile] = useState("");
  const [label_en, setlabel_en] = useState("");
  const [label_ur, setlabel_ur] = useState("");
  const [unit, setunit] = useState("all");
  const [price, setprice] = useState("");
  let [marketprice, setmarketprice] = useState("");
  const [status, setstatus] = useState("Active");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("all");
  const [image, setimage] = useState("");
  const [prod_id, setprod_id] = useState("");
  const [check, setCheckbox] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductDetails(props.productid));
    dispatch(getscales({ status: "0" }));
    const callme = async () => {
      dispatch(getcategories({ status: "0" }));
    };
    callme();
  }, [dispatch]);
  const { scale_loaded, scales } = useSelector(
    (state) => state.categoriesandroles
  );
  const editproduct = async () => {
    if (!label_en) {
      zuz.Toast.show({
        html: `Please input english name field`,
        time: 5,
      });
    } else if (!category) {
      zuz.Toast.show({
        html: `Please select a category`,
        time: 5,
      });
    } else if (!label_ur) {
      zuz.Toast.show({
        html: `Please input urdu name field`,
        time: 5,
      });
    } else if (!unit) {
      zuz.Toast.show({
        html: `Please input a unit`,
        time: 5,
      });
    } else if (unit === "all") {
      zuz.Toast.show({
        html: `Please input a unit`,
        time: 5,
      });
    } else if (!price) {
      zuz.Toast.show({
        html: `Please input price`,
        time: 5,
      });
    } else if (!status) {
      zuz.Toast.show({
        html: `Please select a status`,
        time: 5,
      });
    }
    //else if(!file) {
    //  zuz.Toast.show({
    //    html: `Please select an image`,
    //    time: 5,
    //  });
    //}
    else if (category === "all") {
      zuz.Toast.show({
        html: `Please select category`,
        time: 5,
      });
    } else {
      if (marketprice < price) {
        return zuz.Toast.show({
          html: `Market price must be greater than freshlay price`,
          time: 5,
        });
      }
      let choppedimages = [];
      if (check) {
        let formData = new FormData(document.getElementById("myformss"));
        const config = {
          header: { "content-type": "multipart/form-data" },
        };

        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/uploadchoppedimages`,
            formData,
            config
          );
          if (res.data.status === "success") {
            //zuz.Toast.show({ html: `Chopped Images uploaded`, time: 5 });
            console.log(res.data);
            //setchoppedimages(res.data.imagespaths)
            choppedimages = res.data.imagespaths;
          }
        } catch (error) {
          zuz.Toast.show({ html: `Error uploading images`, time: 5 });
        }
      }
      if (check) {
        dispatch(
          editProduct(file, {
            label_en,
            label_ur,
            unit: unit.toLowerCase(),
            price,
            discount: marketprice - price,
            status: status.toLowerCase(),
            description,
            category: category.toLowerCase(),
            chopped,
            choppedimages,
            id: props.productid,
          })
        );
        props.setreload(true);
      } else {
        dispatch(
          editProduct(file, {
            label_en,
            label_ur,
            unit: unit.toLowerCase(),
            price,
            discount: marketprice - price,
            status: status.toLowerCase(),
            description,
            category: category.toLowerCase(),
            id: props.productid,
          })
        );
        props.setreload(true);
      }
    }
  };
  const { loaded, categories } = useSelector(
    (state) => state.categoriesandroles
  );
  return (
    <React.Fragment>
      {!loading ? (
        <div className="add-new-category flex flex-col">
          <div className="form flex">
            <div className="item flex flex-col">
              <div className="lbl rfont s15 c333">
                ID<span className="astarick">&#42;</span>
              </div>
              <input
                type="text"
                readOnly
                value={`PO-${prod_id}`}
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
                value={unit}
                className="iput rfont s15 c333 anim"
                onChange={(e) => setunit(e.target.value)}
              >
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
                Freshlay price<span className="astarick">&#42;</span>
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
                value={status}
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
                  let file = e.target.files[0];
                  setfile(file);
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
                  src={
                    picUrl ? picUrl : `${process.env.REACT_APP_END_URL}${image}`
                  }
                  className="img"
                />
              </div>
            </div>
            <div className="item flex flex-col">
              <div className="lbl rfont s15 c333">
                Category<span className="astarick">&#42;</span>
              </div>
              <select
                value={category}
                className="iput rfont s15 c333 anim"
                onChange={(e) => setcategory(e.target.value)}
              >
                {loaded
                  ? categories.map((item, index) => (
                      <option key={index} value={`${item.name.toLowerCase()}`}>
                        {item.name}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="item flex flex-col">
              <div className="box flex aic">
                <button
                  className={
                    "checkbox cleanbtn " +
                    (check === true ? "on icon-check" : "")
                  }
                  onClick={() => {
                    setCheckbox(!check);
                  }}
                />
                <div className="lbl font s14 c333">
                  Modify/Upload Chopped images
                </div>
              </div>
            </div>
            {check && (
              <div>
                <button
                  className={
                    "checkbox cleanbtn " +
                    (chopped === "Unchopped" ? "on icon-check" : "")
                  }
                  onClick={() => {
                    setchopped("Unchopped");
                  }}
                />
                <div className="lbl font s14 c333">Unchopped</div>
                <button
                  className={
                    "checkbox cleanbtn " +
                    (chopped === "Chopped" ? "on icon-check" : "")
                  }
                  onClick={() => {
                    setchopped("Chopped");
                  }}
                />
                <div className="lbl font s14 c333">Chopped</div>
                <div className="item flex flex-col">
                  <div className="lbl rfont s15 c333">
                    Chopped Images<span className="astarick">&#42;</span>
                  </div>
                  <form
                    id="myformss"
                    //action={`${process.env.REACT_APP_API_URL}/product/uploadchoppedimages`}
                    onSubmit={async (e) => {
                      e.preventDefault();
                    }}
                    enctype="multipart/form-data"
                    method="post"
                  >
                    <input
                      type="file"
                      className="iput image rfont s15 c333 anim"
                      name="multi"
                      accept="image/*"
                      multiple
                    />
                    {
                      //<input type="submit" value="Upload Images"/>
                    }
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="ftr flex aic">
            <button
              onClick={() => editproduct()}
              className="button btn rfont s16 b5 cfff"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </React.Fragment>
  );
}

export default VendorProductsEdit;
