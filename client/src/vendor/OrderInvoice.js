import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import zuz from "../core/Toast";
import $ from "jquery";
import ReactToPrint from "react-to-print";
import moment from "moment";

function OrderInvoice(props) {
  const [products, setProducts] = useState([
    {
      id: "PO-74362",
      label_en: "White Potato",
      label_ur: "سفید آلو",
      catagory: "vegetable",
      qty: "1 kg",
      price: 70,
    },
    {
      id: "PO-74362",
      label_en: "Fresh Lehsan China",
      label_ur: "تازہ لہسن چین",
      catagory: "vegetable",
      qty: "500 gm",
      price: 90,
    },
    {
      id: "PO-74362",
      label_en: "Crinkled Smooth",
      label_ur: "بندھ گوبھی",
      catagory: "vegetable",
      qty: "2 kg",
      price: 80,
    },
  ]);
  const [loaded, setloaded] = useState(false);
  const [theorder, settheorder] = useState([]);
  const [component, setcomponet] = useState("");

  let serialNo = 1;
  const id = props.match.params.id;
  let history = useHistory();
  useEffect(() => {
    const getanorder = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/order/getanorder/${id}`
        );
        if (res.data.status === "success") {
          console.log("res...", res);
          settheorder(res.data.order);
          setloaded(true);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          zuz.Toast.show({ html: `${error.response.data.errors}`, time: 5 });
        }
      }
    };
    getanorder();
  }, []);

  useEffect(() => {
    const getaddress = async () => {
      if (loaded) {
        if (theorder) {
          if (theorder.orderlocation.address) {
            setcomponet(
              <React.Fragment>
                <div className="txt rfont s15 c333">
                  {theorder.orderlocation.address.name}
                </div>
                <div className="txt rfont s15 c333">
                  0{theorder.orderlocation.address.cellphone}
                </div>
                <div className="txt rfont s15 c333">
                  {theorder.orderlocation.address.streetaddress}
                </div>
                <div className="txt rfont s15 c333">
                  {theorder.orderlocation.address.city}
                </div>
                <div className="txt rfont s15 c333">
                  {theorder.orderlocation.address.coordinateaddress}
                </div>
              </React.Fragment>
            );
          } else if (theorder.orderlocation.addressincoords) {
            var options = {
              method: "GET",
              url: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode",
              params: {
                location: `${theorder.orderlocation.addressincoords.lat},${theorder.orderlocation.addressincoords.lng}`,
                language: "en",
              },
              headers: {
                "x-rapidapi-key":
                  "cdc7cf8e67msh6b07cd04db0c676p103069jsn812be05cac4f",
                "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
              },
            };
            try {
              const response = await axios.request(options);
              if (response.data.results) {
                // console.log(response.data.results)
                setcomponet(
                  <React.Fragment>
                    <div className="txt rfont s15 c333">
                      {response.data.results[0].address}
                    </div>
                    <div className="txt rfont s15 c333">
                      {response.data.results[0].street}
                    </div>
                    <div className="txt rfont s15 c333">
                      {response.data.results[0].area}
                    </div>
                  </React.Fragment>
                );
              }
            } catch (error) {
              if (error.response) {
                zuz.Toast.show({ html: `${error.response.data}`, time: 5 });
              } else if (error.request) {
                zuz.Toast.show({ html: `${error.request}`, time: 5 });
              } else {
                zuz.Toast.show({ html: `${error.message}`, time: 5 });
              }
            }
          }
        }
      }
    };
    getaddress();
  }, [loaded]);

  const printInvoice = useRef();
  const date = new Date();

  const pageStyle = `
        @page {
            size: 210mm 297mm;
            margin: 0mm;
            margin-top: 2rem;
        }

        @media all {
            .page-break {
            display: none;
        }
        
        @media print {
            html, body {
              height: initial !important;
              overflow: initial !important;
              -webkit-print-color-adjust: exact;
            }
        }
    `;

  const _calprice = (punit, unit, price, discount, qty) => {
    let subtotal = 0;
    console.log(unit, punit, price, discount, qty);
    if (unit === "kg") {
      if (punit === "kg") {
        subtotal = (parseInt(price) - discount) * parseInt(qty);
      } else if (punit === "g") {
        subtotal = ((parseInt(price) - discount) * parseInt(qty)) / 1000;
      }
    } else if (unit === "g") {
      if (punit === "kg") {
        subtotal = (parseInt(price) - discount) * (parseInt(qty) * 1000);
      } else if (punit === "g") {
        subtotal = (parseInt(price) - discount) * parseInt(qty);
      }
    } else {
      subtotal = parseInt(price) * parseInt(qty);
    }
    console.log(subtotal);
    return Math.floor(subtotal);
    //console.log(`unit ${unit} productunit ${punit} punitvalue ${unitValue} qty ${qty} ${label_en} pricecalculated`,subtotal)
  };

  const Invoice = () => {
    const [deliverySlotItems, setDeliverySlotItems] = useState([
      // {slot : 1,label: "5:00 AM to 8:00 AM"},
      { slot: 1, label: "9:00 AM to 11:00 AM" },
      { slot: 2, label: "12:00 PM to 2:00 PM" },
      { slot: 3, label: "3:00 PM to 5:00 PM" },
      { slot: 4, label: "6:00 PM to 8:00 PM" },
    ]);
    return (
      <div ref={printInvoice} className="invoice-p flex flex-col rel">
        <img alt="media" src={`/images/logo.svg`} className="bg-logo" />
        <div className="wrap">
          <div className="media">
            <img alt="media" src={`/images/logo.svg`} className="img" />
          </div>
          {/* Company Inof */}
          <div className="blk flex">
            <div className="left flex flex-col">
              <div className="meta flex flex-col">
                <div className="txt rfont s24 upc b3 c333">Freshlay</div>
                <div className="txt rfont s15 c333">52-A, Sultanabad</div>
                <div className="txt rfont s15 c333">Near By PNN News.</div>
                <div className="txt rfont s15 c333">Gulgasht Colony,</div>
                <div className="txt rfont s15 c333">Multan</div>
              </div>
            </div>
            <div className="right flex flex-col">
              <div className="item flex flex-col">
                <div className="label lbl rfont s24 c333">Invoice</div>
                <div className="txt rfont s15 c333">
                  # INV-{theorder.orderId}
                </div>
              </div>
              <div className="item flex flex-col">
                <div className="lbl rfont s15 c333">Balance Due</div>
                <div className="txt rfont s16 c333">
                  Rs.{theorder.discountedprice}
                </div>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="blk flex">
            <div className="left flex aic">
              <div className="meta flex flex-col">
                <div className="to txt rfont s15 b5 c333">Bill To:</div>
                {component}
              </div>
            </div>
            <div className="right flex flex-col">
              {theorder.approval == "accepted" && (
                <div className="tt flex aic">
                  <div className="txt rfont s15 c333">Dispatch Date:</div>&nbsp;
                  <div className="txt rfont s15 c333">
                    {moment(theorder.updatedAt).format("L")}{" "}
                    {moment(theorder.updatedAt).format("LT")}
                  </div>
                </div>
              )}
              <div className="tt flex aic">
                <div className="txt rfont s15 c333">Order Date:</div>&nbsp;
                <div className="txt rfont s15 c333">
                  {" "}
                  <div className="col rfont s14">
                    {moment(theorder.createdAt).format("L")}{" "}
                    {moment(theorder.createdAt).format("LT")}
                  </div>
                </div>
              </div>
              <div className="tt flex aic">
                <div className="txt rfont s15 c333">Rider Name:</div>&nbsp;
                <div className="txt rfont s15 c333">
                  {theorder.riderId ? theorder.riderId.fullname : ""}
                </div>
              </div>
              <div className="tt flex aic">
                <div className="txt rfont s15 c333">Contact:</div>&nbsp;
                <div className="txt rfont s15 c333">
                  {theorder.riderId
                    ? theorder.riderId.phoneno
                      ? theorder.riderId.phoneno
                      : theorder.riderId.email
                    : ""}
                </div>
              </div>
              <div className="tt flex aic">
                <div className="txt rfont s15 c333">Vechile no:</div>&nbsp;
                <div className="txt rfont s15 c333">
                  {theorder.riderId ? theorder.riderId.vehicleno : ""}
                </div>
              </div>
              <div className="tt flex aic">
                <div className="txt rfont s15 c333">Delivery Slot:</div>&nbsp;
                <div className="txt rfont s15 c333">
                  {theorder.slotno
                    ? theorder.slotno < 5
                      ? deliverySlotItems[Number(theorder.slotno) - 1].label
                      : ""
                    : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Packages Detail */}
          {theorder.packages.length > 0 ? (
            <div className="detail flex">
              <div className="table flex flex-col">
                <div className="hdr flex aic">
                  <div className="col rfont s15 b6 c333">#</div>
                  <div className="col rfont s15 b6 c333">Package ID</div>
                  <div className="col rfont s15 b6 c333">Price</div>
                  <div className="col rfont s15 b6 c333">Discount</div>
                </div>
                {theorder.packages.length > 0
                  ? theorder.packages.map((item, index) => (
                      <div key={index} className="row flex aic anim">
                        <div className="col rfont s15 c333">{index + 1}</div>
                        <div className="col rfont s15 c333">{item.PKG_id}</div>
                        <div className="col rfont s14 c333">{item.price}</div>
                        <div className="col rfont s14 c333">
                          {item.discount}
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          ) : (
            ""
          )}
          {/* products Detail */}
          <div className="detail flex">
            <div className="table flex flex-col">
              <div className="hdr flex aic">
                <div className="col rfont s14 b5 c333">#</div>
                <div className="col rfont s14 b5 c333">Product ID</div>
                <div className="col rfont s14 b5 c333">Product Name (Eng)</div>
                <div className="col rfont s14 b5 c333">Product Name (Urdu)</div>
                <div className="col rfont s14 b5 c333">Catagory</div>
                <div className="col rfont s14 b5 c333">Unit</div>
                <div className="col rfont s14 b5 c333">Price per unit</div>
                <div className="col rfont s14 b5 c333">Price</div>
              </div>
              {theorder.orderItems.map((item, index) => (
                <div key={index} className="row flex aic anim">
                  <div className="col rfont s15 c333">{index + 1}</div>
                  <div className="col rfont s15 c333">{item.prod_id}</div>
                  <div className="col rfont s15 c333">{item.label_en}</div>
                  <div className="col fontu s15 c333">
                    {item.label_ur
                      ? item.label_ur[0]
                        ? item.label_ur[0].value
                        : ""
                      : ""}
                  </div>
                  <div className="col rfont s15 c333">{item.category}</div>
                  <div className="col rfont s15 c333">
                    {item.qty}
                    {item.unit}
                  </div>
                  <div className="col rfont s15 c333">
                    {item.price}/{item.orgunit}
                  </div>
                  <div className="col rfont s15 c333">
                    {_calprice(
                      item.unit,
                      item.orgunit,
                      item.price,
                      0,
                      item.qty
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method  Block*/}
          <div className="payment-blk flex">
            <div className="left flex flex-col">
              <div className="item flex flex-col">
                <div className="txt rfont s16 b5 c333">Payment Methods</div>
                <div className="txt rfont s15 c333">
                  {theorder.paymentMethod}
                </div>
              </div>
              <div className="item flex flex-col">
                <div className="txt rfont s16 b5 c333">Delivery Type</div>
                <div className="txt rfont s15 c333">
                  {theorder.deliverytype}
                </div>
              </div>
              {/*
                                <div className="item flex aic">
                                    <div className="l txt rfont s15 c333">Bank Name:</div>&nbsp;
                                    <div className="r txt rfont s15 c333">ABC Bank, Multan</div>
                                </div>
                                <div className="item flex aic">
                                    <div className="l txt rfont s15 c333">Acc name:</div>&nbsp;
                                    <div className="r txt rfont s15 c333">Amanda Orton</div>
                                </div>
                                <div className="item flex aic">
                                    <div className="l txt rfont s15 c333">IBAN:</div>&nbsp;
                                    <div className="r txt rfont s15 c333">FGS165461646546AA</div>
                                </div>
                                <div className="item flex aic">
                                    <div className="l txt rfont s15 c333">SWIFT code:</div>&nbsp;
                                    <div className="r txt rfont s15 c333">BTNPP34</div>
                                </div> 
                            */}
            </div>
            <div className="right flex flex-col">
              <div className="to txt rfont s16 b5 c333">Total Due:</div>
              <div className="item flex aic">
                <div className="l txt rfont s15 c333">Sub Total</div>&nbsp;
                <div className="r txt rfont s15 c333">
                  PKR.{theorder.totalprice}
                </div>
              </div>
              <div className="item flex aic">
                <div className="l txt rfont s15 c333">Discount</div>&nbsp;
                {theorder.deliverytype == "express" ? (
                  <div className="r txt rfont s15 c333">
                    {theorder.totalprice - theorder.discountedprice + 59}
                  </div>
                ) : (
                  <div className="r txt rfont s15 c333">
                    {theorder.totalprice - theorder.discountedprice}
                  </div>
                )}
              </div>
              <div className="item flex aic">
                <div className="l txt rfont s15 c333">Delivery Charges</div>
                &nbsp;
                {theorder.deliverytype == "express" ? (
                  <div className="r txt rfont s15 c333">59</div>
                ) : (
                  <div className="r txt rfont s15 c333">0</div>
                )}
              </div>
              <div className="item flex aic">
                <div className="l txt rfont s15 c333">TAX</div>&nbsp;
                <div className="r txt rfont s15 c333">0%</div>
              </div>
              <div className="item flex aic">
                <div className="l txt rfont s15 b6 c333">Balance Due</div>&nbsp;
                <div className="r txt rfont s15 b6 c333">
                  PKR.{theorder.discountedprice}
                </div>
              </div>
            </div>
          </div>

          {/* Signatures*/}
          <div className="ftr-blk flex aic">
            <div className="item flex flex-col">
              <div className="sign rfont b6 c333">Dispatch Manager</div>
            </div>
            <div className="item flex flex-col">
              <div className="sign rfont b6 c333">Rider</div>
            </div>
            <div className="item flex flex-co">
              <div className="sign rfont b6 c333">Recevier</div>
            </div>
          </div>
        </div>

        {/* copy-right */}
        <div className="cpy-rit flex aic">
          <div className="item flex flex-col">
            <div className="lbl fontl s14 b6 cfff">Company:</div>
            <div className="txt fontl s14 cfff">{`© Freshlay ${date.getFullYear()} All rights reserved.`}</div>
          </div>
          <div className="item flex flex-col">
            <div className="bl">
              <div className="lbl fontl s14 b6 cfff">Contact:</div>
              <div className="txt fontl s14 cfff">+92 61-6210050</div>
            </div>
          </div>
          <div className="item flex flex-col">
            <div className="lbl fontl s14 b6 cfff">Email:</div>
            <div className="txt fontl s14 cfff">info@freshlay.com.pk</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="order-invoice flex flex-col">
      <div className="hd flex aic">
        <div className="title rfont s24 black">Product Invoice</div>
        <Link
          //to="/allorders"
          onClick={() => history.goBack()}
          className="lin rfont s16 blue"
        >
          Back
        </Link>
      </div>
      {loaded ? (
        <React.Fragment>
          <Invoice ref={printInvoice} />
          <div className="actions flex aic">
            <ReactToPrint
              pageStyle={pageStyle}
              trigger={() => (
                <button className="print-btn button rfont s15 b5 cfff">
                  Print Invoice
                </button>
              )}
              content={() => printInvoice.current}
            />
          </div>
        </React.Fragment>
      ) : (
        <div className="cover flex aic abs fill">
          <img src="/images/loader.svg" className="img" />
        </div>
      )}
    </div>
  );
}

export default OrderInvoice;
