const Order = require("../models/orderModel");
const Ordetitems = require('../models/orderItemsModel')
const User = require("../models/usermodel");
const moment = require("moment");
const OrderItems = require("../models/orderItemsModel");
const geolib = require("geolib");
const mailer = require("nodemailer");
const Product = require("../models/productModel");
const stripe = require("stripe")("sk_test_SPaqUO8ih4NJ4p4VRkwOCiAd00RG3QuqXb");
const Settings = require("../models/Settings");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkaccess = require("../middleware/checkuseraccess");
const CLIENT_ID =
  "724779593871-mfbuamnh9hceu7tujshqjar1lrjpb5qm.apps.googleusercontent.com";
const CLIENT_SECRET = "mxC7VOBUO4_hsPTHmxLxmxeT";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04IzFrZDu8RmXCgYIARAAGAQSNwF-L9IraMYzX1kKh-WWtp0MchgO3ehe6IhW22_m-X_vrtxO4govIFVmB5GyqXqUcuu6JkpUyco";
const axios = require("axios");
const signtoken = (id) => {
  // 60 * 60 = 3600 1h
  return jwt.sign(
    { id },
    process.env.myjwt42,
    // for message 10 minutes
    { expiresIn: "2d" }
  );
};

// STRIPE PAYMENT
// Inactive
exports.getcheckoutsession = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { data } = req.body;
  const { order } = data;
  let orderddata;
  try {
    orderddata = order.orderItems.map((item) => {
      return { 
        price_data: {
          currency: "pkr",
          product_data: {
            name: `${item.label_en}`,
            images: [`http://mysupermen.herokuapp.com/${item.media}`],
          },
          unit_amount_decimal: (item.price - item.discount) * 100,
        },
        quantity: item.qty,
      };
    });
    if (order.packages.length > 0) {
      const packages = order.packages.map((item) => {
        return {
          price_data: {
            currency: "pkr",
            product_data: {
              name: `${item.PKG_id}`,
              images: [`http://mysupermen.herokuapp.com/${item.media}`],
            },
            unit_amount_decimal: item.price - item.discount * 100,
          },
          quantity: item.qty,
        };
      });
      orderddata = [...orderddata, ...packages];
    }
  } catch (error) {
    console.log(error);
  }
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/user/checkout/payment-successfull/id=${order.id}`,
      //`${req.protocol}://${req.get('host')}/user/successfull`,
      // on cancel url to delete order
      cancel_url: `${process.env.CLIENT_URL}/user/checkout/payment-cancel/id=${order.id}`,
      //`${req.protocol}://${req.get('host')}/user/checkout/checkout-payment`,
      customer_email: user.email,
      //client_reference_id : req.body.tourid,
      mode: "payment",
      line_items: [
        ...orderddata,
        //   name : `Mango`,
        //   description : 'joo',
        //   images : [`https://mysupermen.herokuapp.com/products/products-1212dqwdqw-1613716960492.jpeg`,'https://mysupermen.herokuapp.com/products/products-1212dqwdqw-1612538061839.jpeg'],
        //  amount  : 10000,
        //    currency : 'pkr',
        //   quantity : 1
        //   }
      ],
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    status: "success",
    session,
  });
};

// rider
exports.updateriderdelivery = async (req, res) => {
  console.log('reached')
  try {
    const OAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    //console.log(req.body)
    const order = await Order.findByIdAndUpdate(
      { _id: req.body.orderid },
      { deliverystatus: true, paid: true }
    ).populate("userId", "fullname username email");
    const orderuser = await User.findById(order.userId)
      const updatereferprice = async (refercode,price) => {
          const therefereduser = await User.findOne({refercode});
          console.log(therefereduser.id,order.userId._id)
          console.log(therefereduser.id != order.userId._id)
          if(therefereduser){
            if(therefereduser.id != order.userId._id){
              if(orderuser.ordercount < 5)
              {
                let updatewallet;
                if(therefereduser.wallet){
                  updatewallet = therefereduser.wallet + price;
                }
                else {
                  updatewallet = price
                }
                const refereduser = await User.findOneAndUpdate({refercode},{wallet : Number(updatewallet)});
                // saving user id in refereduserid
                //console.log(refereduser)

                if(orderuser.ordercount < 5)
                {
                  let referuserids = refereduser.referedusersid;
                  referuserids.push(order.userId);
                  //if(refereduser.referedusersid)
                  orderuser.referedusersid = referuserids;
                  await refereduser.save();
                }
              }
            }
        }
      }
    if(order.refercode) {
            updatereferprice(order.refercode,order.discountedprice * 10 / 100)
    }
    // Imp ! if he does not have an email, email wont send
    const access_token = await OAuth2Client.getAccessToken();
    if (order.userId.email) {
      let mail = {
        from: `ahad@freshlo.co`,
        to: `${order.userId.email}`,
        subject: "Thank you for ordering",
        // title,text,url , button-text,
        html: await emailtemplate(
          "Thank you for ordering",
          `Dear ${order.userId.username} <br/>  <br/>  <br/> Thank you for your recent purchase. We hope you love it! If you do, would you consider posting an online review? This helps us to continue providing great products and helps potential buyers to make confident decisions.<br/>Thank you in advance for your review and for being a preferred customer.`,
          `${process.env.CLIENT_URL}/user/review/${order._id}`,
          "Review order"
        ),
      };
      // console.log('before')
      const smtpTransport = mailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "ahad@freshlo.co",
          pass: "Supermen@1122",
        },
      });
      smtpTransport.sendMail(mail, function (err) {
        if (err) {
          res.status(404).json({
            errors: "could'nt send email",
          });
        } else {
          res.status(200).json({
            status: "success",
            order,
            emailsended: true,
          });
        }
      });
    } else {
      res.status(200).json({
        status: "success",
        order,
        emailsended: false,
      });
    }
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
};

exports.updateriderlocation = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(
      { _id: req.body[0]._id },
      { riderlocation: req.body[0].coords },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      //order
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
};

const emailtemplate = async (title, text, url, buttontext) => {
  const result = await Settings.find();
  return `
    <html>
      <head>
      <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Roboto:wght@100;300;400;500;700&family=Varela+Round&display=swap"
      rel="stylesheet">
        <style> 
          .color{color: #57c702;}
          .email-tamplate{
            background: #f5f5f5;
            padding: 50px 0px; 
          } 
          .line{
            height: 10px;
            background: #57c702;
            width: 840px; 
            margin: 0 auto;
          }
          .tamp-blk{
            width: 760px; 
            margin: 0 auto;
            background: #fff;
            padding: 20px 40px;
            position: relative;
          }
          .logo{
            height: 62px;
            margin-bottom: 8px;
          }
          .title{
            font-family: "Open Sans", sans-serif;
            font-size: 26px;
            font-weight: 700;
            color: #020102;
          }
          .nam{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            padding: 30px 0px 20px 0px;
          }
          .code-blk{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
          }
          .txt{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .code{
            font-family: "Open Sans", sans-serif;
            font-size: 24px;
            font-weight: bold;
            color: #57c702;
            margin-top: 15px;
            letter-spacing: 0.5px;
          } 
          .msg{
            margin-top: 25px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .note{
            margin-top: 20px;
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
          }
          .ftr{
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin: 25px 0px 0px 0px;
          } 
          .log{width: 110px;} 
          .rits{
            font-family: "Open Sans", sans-serif;
            font-size: 14px;
            color: #020102;
            margin-bottom: 20px;
            margin-top: 2px;
          }
          .icons{
            display: flex;
            align-items: center; 
          }
          .ico{
            height: 35px;
            margin-right: 10px;
          }
          @media screen and (max-width: 1200px) {
            .tamp-blk{
              max-width: 650px;
            }
            .line{max-width: 730px;}
          }
          @media screen and (max-width: 768px) {
            .tamp-blk{max-width: 420px;}
            .line{max-width: 500px;}
          }
          @media screen and (max-width: 640px) {
            .tamp-blk{max-width: 320px;}
            .line{max-width: 400px;}
          }  
          @media screen and (max-width: 425px) {
            .tamp-blk{
              max-width: 266px;
              padding: 20px 12px;
            }  
            .line{max-width: 290px;}  
            .ftr{padding: 20px 18px;} 
          }
        </style>   
      </head>
      <body> 
        <div class="email-tamplate">
          <div class="line" />
          <div class='tamp-blk'>  
            <img src="https://mysupermen.herokuapp.com/site/logo.png" class="logo" />
            <div class="title">${title}</div>
            <div class="code-blk">
                <div class="txt">${text}</div>
                <a href=${url}
                  style="background:#57c702;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                  ${buttontext}</a>
            </div> 
            <div class="ftr">
                <img src="https://mysupermen.herokuapp.com/site/logo.png" class="log" />
                <div class="rits">© Freshlo ${date.getFullYear()} All rights reserved.</div>
                <div class="icons">
                    <a to="/"><img class="ico" src="https://mysupermen.herokuapp.com/images/facebook.png" /></a>
                    <a to="/"><img class="ico" src="https://mysupermen.herokuapp.com/images/instagram.png" /></a>
                    <a to="/"><img class="ico" src="https://mysupermen.herokuapp.com/images/linkedin.png" /></a>
                    <a to="/"><img class="ico" src="https://mysupermen.herokuapp.com/images/twitter.png" /></a>
                </div>
            </div> 
          </div> 
        </div>
      </body>
    </html>
  `;
};

/// Admin delete order
exports.deleteorder = async (req,res) => {
  const access = await checkaccess(req.user.id, "orders", "del");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    const theuser = await User.findById(req.user.id);
    if (!(theuser.role === "admin")) {
      return res.status(422).json({
        errors: "You dont have access",
      });
    }
    //console.log(req.params)
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
}
// Admin edit order
exports.editorder = async (req,res) => {
  const access = await checkaccess(req.user.id, "orders", "edit");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    console.log(req.params.id)
    console.log(req.body)
    const order = await Order.findById(req.params.id)
    // const theuser = await User.findById(order.userId)
    console.log(order)
    const cartItems = req.body.items
    const deliverytype = req.body.delivery
    let ordertotal=0;
    let subtotal = 0;
    let savings = 0;
    for(let i = 0; i < cartItems.length; i++) {
      if(cartItems[i].unit === 'kg')
      {
          subtotal = subtotal + parseInt(cartItems[i].price) * cartItems[i].qty
          savings = savings + parseInt(cartItems[i].discount) * cartItems[i].qty
      }
      else if(cartItems[i].unit === 'g')
      {
          subtotal = Math.floor(subtotal + parseInt(cartItems[i].price) * cartItems[i].qty/1000)
          savings = Math.floor(savings + parseInt(cartItems[i].discount) * cartItems[i].qty/1000)
      } 
      else {
          subtotal = subtotal + parseInt(cartItems[i].price) * cartItems[i].qty
          savings = savings + parseInt(cartItems[i].discount) * cartItems[i].qty 
      }
          
      }
      ordertotal = subtotal;
      //ordertotal = subtotal - savings;
      let totalprice = subtotal + savings
      let discountedprice;
      // if(theuser.ordercount - 1 == 0)
      // {     
      //   discountedprice =  totalprice - Math.floor(totalprice * 40 / 100)
      // }
      // else if(theuser.ordercount -1  == 1)
      // {
      //   discountedprice = totalprice - Math.floor(totalprice * 30 / 100)
      // }
      // else if(theuser.ordercount - 1  == 2)
      // {
      //   discountedprice = totalprice - Math.floor(totalprice * 20 / 100)
      // }
      // else if(theuser.ordercount - 1 == 3)
      // {
      //   discountedprice = totalprice -Math.floor(totalprice * 10 / 100) 
      // }
      // else 
      if(order.packages){
        order.packages.map((item) => {
             totalprice = totalprice + Number(item.price) 
        })
      }
      // console.log(ordertotal,subtotal,savings)
      // console.log(discountedprice)
      discountedprice = totalprice
      if(deliverytype === 'express')
      {
        discountedprice = discountedprice + 59
        //caltotalprice = caltotalprice + 59
      }
      cartItems.map(async (item)=> {
        await OrderItems.findByIdAndUpdate(item.id,{qty : item.qty})
      })
      await Order.findByIdAndUpdate(req.params.id,{totalprice,discountedprice,deliverytype})

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
}

// edit delivery type 
// exports.editdeliverytype = async (req,res) => {
//   const access = await checkaccess(req.user.id, "orders", "edit");
//     if (!access) {
//       return res.status(422).json({
//         errors: "You dont have access for this request",
//       });
//     }
//   try {
//    console.log(req.body)
  
//     //await Order.findByIdAndUpdate(req.params.id,{totalprice,discountedprice})
//     res.status(200).json({
//       status: "success",
//     });
//   } catch (error) {
//     res.status(404).json({
//       errors: "Error getting Orders",
//     });
//   }
// }

exports.getriderorders = async (req, res) => {
  try {
    const orders = await Order.find({
      riderId: req.user.id,
      deliverystatus: false,
    }).populate("userId", "media fullname");
    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
};

exports.getriderinfo = async (req, res) => {
  try {
    //console.log(req.user)
    const thetime = new Date(moment().startOf("day").format());
    // const dailyorder = await Order.find({ 'createdAt' : {'$gt' : thetime}}).populate('userId')
    const totalordersdelivered = await Order.find({
      riderId: req.user.id,
      deliverystatus: true,
    }).countDocuments();
    const todaysordersdelivered = await Order.find({
      riderId: req.user.id,
      deliverystatus: true,
      createdAt: { $gt: thetime },
    }).countDocuments();
    res.status(200).json({
      status: "success",
      totalordersdelivered,
      todaysordersdelivered,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error getting Orders",
    });
  }
};

//recent active order
exports.getactiveorder = async (req, res) => {
  
  try {
    let orderstatus;
    let order;
    order = await Order.find({
      userId: req.user.id,
      approval: "accepted",
      deliverystatus: false,
    })
      .limit(1)
      .sort({ $natural: -1 })
      .populate("riderId")
      .populate("userId");

    if (order.length == 0) {
      order = await Order.find({
        userId: req.user.id,
        approval: "pending",
        deliverystatus: false,
      })
        .limit(1)
        .sort({ $natural: -1 })
        .populate("riderId")
        .populate("userId");
      orderstatus = "pending";
    } else {
      orderstatus = "accepted";
    }

    console.log(order);
    res.status(200).json({
      status: "success",
      orderstatus,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting current order",
    });
  }
};

exports.getanorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("orderItems")
      .populate("riderId")
      .populate("userId")
      .populate("vendorId");
    res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    //console.log(error);
    res.status(404).json({
      errors: "Error getting order info",
    });
  }
};

exports.getvendorrider = async (req, res) => {
  try {
    const allvendorriders = await User.find({ role : "rider" , usercreatedby : req.params.id });
    let vendorriders = [];
    if (allvendorriders !== null) {
      vendorriders = allvendorriders;
    }
    //console.log(vendorriders)
    res.status(200).json({
      status: "success",
      vendorriders,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error getting riders",
    });
  }
};

exports.responseorderrequest = async (req, res) => {
  try {
    //console.log(req.body);
    const { approval, rejected, id, responded, riderId } = req.body;
    const theorder = await Order.findByIdAndUpdate(
      id,
      {
        rejected,
        approval,
        responded,
        riderId,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      approval,
      theorder,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};

exports.allorders = async (req, res) => {
  try {
    console.log('calling')
    let orders;
    if (req.body.from || req.body.to) {
      //console.log("inside");
      orders = await Order.find({
        createdAt: { $gt: req.body.from, $lt: req.body.to },
      })
      //.populate("userId orderItems")
      .sort({'createdAt' : -1});
    } else {
      orders = await Order.find()
      //.populate("userId orderItems")
      .sort({'createdAt' : -1});
    }
    // console.log(dailyorder)
    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
    res.status(404);
    throw new Error("Error while creating error");
  }
};

exports.getvenderorders = async (req, res) => {
  try {
    const pendingorder = await Order.find({
      vendorId: req.user.id,
      responded: false,
    })
      //.populate("userId orderItems")
      .sort({ $natural: -1 });
    console.log(req.body);
    let allorders;
    if (Object.entries(req.body).length === 0) {
      allorders = await Order.find({
        vendorId: req.user.id,
        responded: true,
      })
        //.populate("userId orderItems")
        .sort({ $natural: -1 });
    } else {
      allorders = await Order.find({
        vendorId: req.user.id,
        createdAt: { $gt: req.body.from, $lt: req.body.to },
        responded: true,
      })
        //.populate("userId orderItems")
        .sort({ $natural: -1 });
    }
    res.status(200).json({
      status: "success",
      pendingorder,
      allorders,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};

exports.checkcoupencode = async (req, res) => {
  try {
    console.log(req.body)
    const settings = await Settings.find();
    console.log(settings[0])
    let coupincode = []
    const coupins =  settings[0].coupincodes;
    console.log(coupins)
    coupins.map((item) => {
      console.log(item.coupinname)
      if(item.coupinname == req.body.coupinname)
      {
        coupincode.push(item)
      }
    })
    if(coupincode.length > 0)
    { 
      res.status(200).json({
      status: "success",
      coupincode
    });
    }
    else {
      res.status(404).json({
        errors: "Coupin name is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error sending request",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    //const totalorder = await Order.find().countDocuments();
    let {
      orderItems,
      orderlocation,
      totalprice,
      paymentMethod,
      discountedprice,
      savings,
      deliverytype,
      refercode,
      coupinname,
      slotno,
      slotdate
    } = req.body;
    if (!orderItems) {
      res.status(404).json({
        errors: "Please add a product in your cart",
      });
    } else if (!orderlocation) {
      res.status(404).json({
        errors: "Please select an order location",
      });
    } else if (!paymentMethod) {
      res.status(404).json({
        errors: "Please Select payment method",
      });
    } else if (!totalprice) {
      res.status(404).json({
        errors: "Some fields are missing",
      });
    } else if (!discountedprice) {
      res.status(404).json({
        errors: "Some fields are missing",
      });
    }
    const settings = await Settings.find();
    let token = req.header("myjwttoken");
    // non-logined
    let user;
    let decoded;
    const productIds = [];
    const packages = [];
    const allvendorslocations = await User.find({ role: "vendor" });
    let res2;
    let userstatus;
    let useraddress;
    // check order limit
    // if (!token) {
    //   user = await User.findOne({
    //     phoneno: Number(orderlocation.address.cellphone),
    //   });
    //   if(!user) {
    //     if(totalprice - Math.floor(totalprice * 40 / 100) <= settings[0].minorder)
    //     {
    //     console.log("inhere")
    //      return res.status(404).json({
    //         errors: `Your order amount should be greater than ${settings[0].minorder}`,
    //       });
    //     }
    //   }
    // }
    
    if (orderlocation.address) {
      useraddress = orderlocation.address.addresscoordinates;
    } else if (orderlocation.addressincoords) {
      useraddress = orderlocation.addressincoords;
    }
    /*const result = allvendorslocations.filter((item) => {
      if (item.storelocationcoordinates) {
        const withinradius = geolib.isPointWithinRadius(
          useraddress,
          item.storelocationcoordinates,
          50000
        );
        if (withinradius) return item;
      }
    });
    if (result.length < 1) {
      res.status(404).json({
        errors: "Pardon, you are not in the scope of MySuperMen store",
      });
    } else */
    {
      // Create user if not register
      let theuser;
      let randompasswordgen;
      let discountpercentage = 0;
      if (!token) {
        user = await User.findOne({
          phoneno: Number(orderlocation.address.cellphone),
        });
        theuser = user
        if (!user) {
          var randomFixedInteger = function (length) {
            return Math.floor(
              Math.pow(10, length - 1) +
                Math.random() *
                  (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
            );
          };
          const thename  = orderlocation.address.name
          const refercode = thename.split(" ")[0] + randomFixedInteger(4)
          const recent = await User.find().limit(1).sort({ $natural: -1 });
          let user_id;
          if (recent.length === 0) {
            user_id = "UID-1";
          } else {
            const found_id = recent[0].user_id.split("-");
            user_id = Number(found_id[1]) + 1;
            // console.log(user_id)
            user_id = `UID-${user_id}`;
          }
          let randompassword = randomFixedInteger(8);
          randompasswordgen = randompassword
          const password = await bcrypt.hash(randompassword.toString(), 12);
          
          user = await User.create({
            phoneno: Number(orderlocation.address.cellphone),
            username: orderlocation.address.name,
            password,
            user_id,
            randompassgenerated: true,
            refercode
          });
        }
      } else {
        try {
          decoded = jwt.verify(token, process.env.myjwt42);
          user = decoded;
        } catch (error) {
          //console.log(error)
          return res.status(422).json({
            errors: "Token is not valid,Please Retry",
          });
        }
      }

      // find nearest store
      let storecoordinates;
      storecoordinates = allvendorslocations.map((item) => {
        return { ...item.storelocationcoordinates, id: item.id };
      });
      console.log(useraddress);
      res2 = geolib.findNearest(useraddress, storecoordinates);

      async function getSomeData() {
        await Promise.all(
          orderItems.map(async (item) => {
            if (item.type === "package") {
              packages.push(item);
            } else {
              // handle stock inc/dec here
              // sub qty,kg, if orgunit is kg and order unit is g, divide g by 1000 and get kg then subtract
              // if orgunit is g and order unit is kg then multiply by 1000 then subtract
              const res = await OrderItems.create(item);
              productIds.push(res._id);
            }
          })
        );
      }
      getSomeData()
        .then(async function () {
          if(token){
            user = await User.findById(decoded.id);
          }
          let discountedprice;
          //let caltotalprice = totalprice;
     
        // if(user.ordercount == 0)
        // {     
        //   discountedprice =  totalprice - Math.floor(totalprice * 10 / 100)
        //   savings = Math.floor(totalprice * 10 / 100)
        //   discountpercentage = 10;
        // }
        // else if(user.ordercount == 1)
        // {
        //   discountedprice = totalprice - Math.floor(totalprice * 30 / 100)
        // }
        // else if(user.ordercount == 2)
        // {
        //   discountedprice = totalprice - Math.floor(totalprice * 20 / 100)
        // }
        // else if(user.ordercount == 3)
        // {
        //   discountedprice = totalprice -Math.floor(totalprice * 10 / 100) 
        // }
        
      
      //else {
        discountedprice = totalprice
        // discountedprice =  totalprice -Math.floor(totalprice * 40 / 100)
        // if(refercode){
        //   updatereferprice(refercode,totalprice * 10 / 100)
        // } 
      //}
      if(discountedprice <= settings[0].minorder)
        {
         return res.status(404).json({
            errors: `Your order amount should be greater than ${settings[0].minorder}`,
          });
        }
      if(deliverytype === 'express')
      {
        discountedprice = discountedprice + 59
        //caltotalprice = caltotalprice + 59
      }
      if(paymentMethod === "Freshlay wallet")
      {
      if(user.wallet){
        if(user.wallet < discountedprice)
        {
         return res.status(404).json({
            errors: "Sorry,You don't have enough balance in your wallet",
          });
        }
      }
      else {
       return res.status(404).json({
          errors: "Sorry,You don't have enough balance in your wallet",
        });
      }
      }
      let coupinmatched = false;
      let coupindiscount;
      if(req.body.coupinname){
      if(settings[0].coupincodes){
        settings[0].coupincodes.map((item) => {
          if(coupinname == item.coupinname){
            coupinmatched = true
            coupindiscount = item.discount
            discountpercentage = Number(item.discount) + Number(discountpercentage)
          }
        })
       }
      }
      if(coupinmatched){
        discountedprice =  discountedprice - Math.floor(totalprice * Number(coupindiscount) / 100)
        savings = savings + Math.floor(discountedprice * Number(coupindiscount) / 100)
      }
          // update ordercount
          await User.findByIdAndUpdate(user._id,{ordercount : user.ordercount ? user.ordercount + 1 : 1});
          // increament id
          let recentorder = await Order.find().limit(1).sort({ $natural: -1 });
          let order_id;
          if (recentorder.length === 0) {
            order_id = "SM-1";
          } else {
            const found_id = recentorder[0].orderId.split("-");
            if(found_id[1])
            {
              order_id = Number(found_id[1]) + 1;
              // console.log(user_id)
              order_id = `SM-${order_id}`;
            }
            else
            {
              let ordernum = await Order.find().countDocuments()
              order_id = `SM-${ordernum}`;
            }
           
          }

          const order = await Order.create({
            orderItems: productIds,
            packages,
            orderlocation,
            totalprice ,
            userId: user.id,
            orderId: order_id,
            vendorId: res2.id,
            paymentMethod,
            refercode : refercode,
            discountedprice : discountedprice,
            savings,
            deliverytype,
            coupinname,
            slotno,
            slotdate
          });

          const theorder = await Order.findById(order._id).populate(
            "orderItems "
          );
          if (!token) {
            const thetoken = await signtoken(user.id);
            res.status(200).json({
              status: "success",
              order: theorder,
              token: thetoken,
            });
          } else {
            res.status(200).json({
              status: "success",
              order: theorder,
            });
          }
          if (!token) {
           const slots = [  
              // {slot : 1,label: "5:00 AM to 8:00 AM"},
              {slot : 1,label: "9:00 AM to 11:00 AM"},
              {slot : 2,label: "12:00 PM to 2:00 PM"},
              {slot : 3,label: "3:00 PM to 5:00 PM"},
              {slot : 4,label: "6:00 PM to 8:00 PM"},
            ]
            if (theuser) {
                try {
                  console.log("sending message non-verified");
                  let message
                  if(deliverytype === 'express')
                  {
                    message = `Hi ${orderlocation.address.name}, \nThank you for your order on Freshlay Your order no ${order_id} with a total of Rs. ${totalprice} after ${discountpercentage}% discount your actual balance is Rs. ${discountedprice}. Your order has been placed and will be delivered in an hour.\nTo track your order log into your account.\nNote: Order After 8:00 PM will be delivered Next Day.`
                  }
                  else {
                    message = `Hi ${orderlocation.address.name}, \nThank you for your order on Freshlay Your order no ${order_id} with a total of Rs. ${totalprice} after ${discountpercentage}% discount your actual balance is Rs. ${discountedprice}. Your order has been placed and will be delivered in between ${slots[slotno-1].label}.\nTo track your order log into your account.\nNote: Order After 8:00 PM will be delivered Next Day.`
                  }
              
                  const res = await axios.post(
                    `http://smartsms.pk/plain?api_token=${process.env.smartsmsapitoken}&api_secret=${process.env.smartsmsapi_secret}&to=92${user.phoneno}&from=Zeoel&message=${message}`
                  );
                  //console.log(res);
                } catch (error) {
                  console.log(error);
                  return res.status(422).json({
                    errors: "Error while sending message",
                  });
                }
            } else {
              try {
                let message;
                if(deliverytype === 'express')
                {
                message = `Hi ${orderlocation.address.name},\nFreshlay Welcomes you for signing up. The Password of your account is ${randompasswordgen}.\nThank you for your order on Freshlay. Your order no ${order_id} with a total of Rs. ${totalprice} after ${discountpercentage}% discount your actual balance is Rs. ${discountedprice}. Your order has been placed and will be delivered in an hour.\nTo track your order log into your account.\nNote: Order After 8:00 PM will be delivered Next Day.`
                } 
                else {
                message = `Hi ${orderlocation.address.name},\nFreshlay Welcomes you for signing up. The Password of your account is ${randompasswordgen}.\nThank you for your order on Freshlay. Your order no ${order_id} with a total of Rs. ${totalprice} after ${discountpercentage}% discount your actual balance is Rs. ${discountedprice}. Your order has been placed and will be delivered in between ${slots[slotno-1].label}.\nTo track your order log into your account.\nNote: Order After 8:00 PM will be delivered Next Day.`
                }
                const res = await axios.post(
                  `http://smartsms.pk/plain?api_token=${process.env.smartsmsapitoken}&api_secret=${process.env.smartsmsapi_secret}&to=92${user.phoneno}&from=Zeoel&message=${message}`
                );
                //console.log('res',res)
              } catch (error) {
                console.log(error);
                return res.status(422).json({
                  errors: "Error while sending message",
                });
              }
            }
          } 
        })
        .catch(function (error) {
          console.log(error);
         return res.status(404).json({
            errors: "Error while creating order",
          });
        });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      errors: "Error while creating order",
    });
  }
};

exports.getuserorder = async (req, res) => {
  try {
    const userordersactive = await Order.find({
      userId: req.user.id,
      deliverystatus: false,
    })
      .populate("userId orderItems")
      .sort({ $natural: -1 });
    const userordersprev = await Order.find({
      userId: req.user.id,
      deliverystatus: true,
    })
      .populate("userId orderItems")
      .sort({ $natural: -1 });
    res.status(200).json({
      status: "success",
      userordersactive,
      userordersprev,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error while getting order",
    });
  }
};

exports.getslotreport = async (req, res) => {
  try {
    // console.log(req.body)
    // let todate = Date(req.body.toDate)
    // console.log(new Date(todate))
    // const mod_to = todate.setDate(todate.getDate() + 1)
   
    const orders = await Order.find({
      slotno: req.body.slot,
      slotdate: { $gte: req.body.from, $lte: req.body.to },
      deliverystatus : false
    }).populate('orderItems')
    const object = {};
    orders.map((item,i) => {
         item.orderItems.map((item,i) => {
               let unit = 'kg'
               let qty = object[item.label_en] ? object[item.label_en][unit] : 0
               if(item.unit == 'g')
               {
                gramqty = item.qty / 1000
                object[item.label_en] = {[unit] : qty ? qty + gramqty : gramqty }
               }
               else if(item.unit == 'dz')
               {
                 unit = 'dz'
                object[item.label_en] = {[unit] : qty ? qty + item.qty : item.qty }
               } 
               else {
                object[item.label_en] = {[unit] : qty ? qty + item.qty : item.qty } 
               }
              
         })
    })
    res.status(200).json({
      status: "success",
      orderreport : object
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error while getting order",
    });
  }
};