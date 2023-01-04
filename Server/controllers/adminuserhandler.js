const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const Role = require("../models/Role");
const checkaccess = require("../middleware/checkuseraccess");
const Order = require('../models/orderModel')
var randomFixedInteger = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() *
        (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};


exports.getauser = async (req, res) => {
  //const theuser = await User.findById(req.user.id);
  //console.log("theuser", theuser);
  const access = await checkaccess(req.user.id, "users", "read");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    //console.log(req.params);
    const theuser = await User.findById(req.params.id)
      .select(
        "user_id vehicleno role username fullname phoneno favourite media cnic email addressbook favourite status rights storename storelocationcity storelocationcoordinates address"
      )
      .populate("favourite");
    res.status(200).json({
      success: "true",
      data: theuser,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error("Error while getting your info");
  }
};

exports.edituseraccess = async (req, res) => {
  const access = await checkaccess(req.user.id, "users", "edit");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    const { id, access, modify } = req.body;
    const user = await User.findById(id);
    user.rights[access] = modify.access;
    await user.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Editing role",
    });
  }
};

// when updating user if he edit email or phoneno, please check if this email or phonno already exist
exports.edituser = async (req, res) => {
  const access = await checkaccess(req.user.id, "users", "edit");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  const data = req.body.body.data;
  console.log(data);
  function filtter(obj) {
    let result = {},
      key;
    for (key in obj) {
      if (obj[key] !== "" && obj[key] !== null) {
        result[key] = obj[key];
      }
    }
    return result;
  }
  const filtereddata = filtter(data);
  console.log(filtereddata);
  let { password, emailphone } = filtereddata;
  try {
    const themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // user is going to update is his info also username check if username already exist
    const theuser = await User.findById(req.body.id);
    if (password) {
      password = await bcrypt.hash(password, 12);
    }
    if (emailphone.match(themail)) {
      email = emailphone;
      if (email !== theuser.email) {
        const user = await User.find({ email });
        //console.log('user found',user)
        if (user.length > 0) {
          return res.status(422).json({
            errors: "User already exist with this email",
          });
        } else {
          if (password && password !== null && password !== "") {
            await User.findByIdAndUpdate(
              req.body.id,
              { ...filtereddata, password, email },
              { new: true }
            );
          } else {
            await User.findByIdAndUpdate(
              req.body.id,
              { ...filtereddata, email },
              { new: true }
            );
          }
        }
      } else {
        if (password && password !== null && password !== "") {
          await User.findByIdAndUpdate(
            req.body.id,
            { ...filtereddata, password, email },
            { new: true }
          );
        } else {
          await User.findByIdAndUpdate(
            req.body.id,
            { ...filtereddata, email },
            { new: true }
          );
        }
      }
    } else if (emailphone.match(/^[0-9]+$/)) {
      const phoneno = emailphone;
      if (!(emailphone.length === 10)) {
        return res.status(422).json({
          errors: "Phone no length should be 10",
        });
      } else if (Number(phoneno) !== theuser.phoneno) {
        const user = await User.find({ phoneno });
        // console.log(user)
        if (user.length > 0) {
          return res.status(422).json({
            errors: "User already exist with this phoneno",
          });
        } else {
          if (password && password !== null && password !== "") {
            await User.findByIdAndUpdate(
              req.body.id,
              { ...filtereddata, password, phoneno },
              { new: true }
            );
          } else {
            await User.findByIdAndUpdate(
              req.body.id,
              { ...filtereddata, phoneno },
              { new: true }
            );
          }
        }
      } else {
        if (password && password !== null && password !== "") {
          await User.findByIdAndUpdate(
            req.body.id,
            { ...filtereddata, password, phoneno },
            { new: true }
          );
        } else {
          await User.findByIdAndUpdate(
            req.body.id,
            { ...filtereddata, phoneno },
            { new: true }
          );
        }
      }
    }

    // if(req.body.phoneno && )

    return res.status(200).json({
      success: "true",
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: "Error while updating user",
    });
  }
};

exports.getusers = async (req, res) => {
  const access = await checkaccess(req.user.id, "users", "read");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    //console.log(req.body)
    const { role, status } = req.body;
    let users;
    if (role === "0" && status === "0") {
      users = await User.find();
    } else if (role !== "0" && status === "0") {
      users = await User.find({ role: role });
    } else if (role === "0" && status !== "0") {
      users = await User.find({ status: status });
    } else if (role !== "0" && status !== "0") {
      users = await User.find({ status: status, role: role });
    }
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting all users",
    });
  }
};

exports.getvendorriders = async (req, res) => {
  //console.log(req.body)
  const access = await checkaccess(req.user.id, "users", "read");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    console.log(req.body)
    const { role, status } = req.body;
    let users;
    if (role === "0" && status === "0") {
      users = await User.find({ usercreatedby: req.user.id });
    } else if (role !== "0" && status === "0") {
      users = await User.find({ role: role, usercreatedby: req.user.id });
    } else if (role === "0" && status !== "0") {
      users = await User.find({ status: status, usercreatedby: req.user.id });
    } else if (role !== "0" && status !== "0") {
      users = await User.find({
        status: status,
        role: role,
        usercreatedby: req.user.id,
      });
    }
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting all users",
    });
  }
};

exports.createusers = async (req, res) => {
  const theuser = await User.findById(req.user.id);
  const access = await checkaccess(req.user.id, "users", "create");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    //console.log(req.body);
    let {
      username,
      fullname,
      address,
      role,
      status,
      emailphone,
      password,
      storelocationcity,
      storename,
      storelocationcoordinates,
      vehicleno,
      vendorId,
    } = req.body;
    const refercode = username.split(" ")[0] + randomFixedInteger(4)
    let email;
    let phoneno;
    //console.log(emailphone.length)
    let themail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailphone.match(themail)) {
      email = emailphone;
    } else if (emailphone.match(/^[0-9]+$/)) {
      if (!(emailphone.length === 10)) {
        return res.status(422).json({
          errors: "Phone no length should be 10",
        });
      } else {
        phoneno = emailphone;
      }
    } else {
      return res.status(422).json({
        errors: "Please input correct email or phone number",
      });
    }

    try {
      let user;

      if (email) {
        user = await User.findOne({ email: email });
        if (user) {
          return res.status(422).json({
            errors: "User with this email is already exist",
          });
        }
      } else if (phoneno) {
        user = await User.findOne({ phoneno: phoneno });
        console.log(`userfound ${user}`);
        if (user) {
          return res.status(422).json({
            errors: "User with this phone no is already exist",
          });
        }
      }
      password = await bcrypt.hash(password, 12);
      let newuser;
      if (email) {
        const recent = await User.find().limit(1).sort({ $natural: -1 });
        let user_id;
        if (recent.length === 0) {
          user_id = 1;
        } else {
          const found_id = recent[0].user_id.split("-");
          user_id = Number(found_id[1]) + 1;
          user_id = `UID-${user_id}`;
         // if (!(role === 'user')) {
            const rights = await Role.find({ name: role });
            console.log(rights);
            newuser = await User.create({
              username,
              address,
              fullname,
              role,
              status,
              storename,
              email,
              password,
              storelocationcity,
              storename,
              storelocationcoordinates,
              usercreatedby: theuser._id,
              user_id,
              rights: rights[0],
              numberverified: true,
              confirmemail: true,
              refercode
            });
          // } else {
          //   newuser = await User.create({
          //     username,
          //     address,
          //     fullname,
          //     role,
          //     status,
          //     storename,
          //     email,
          //     password,
          //     storelocationcity,
          //     storename,
          //     storelocationcoordinates,
          //     usercreatedby: theuser._id,
          //     user_id,
          //     vehicleno,
          //     vendorId,
          //     numberverified: true,
          //     confirmemail: true,
          //   });
          // }
        }
      } else if (phoneno) {
        const recent = await User.find().limit(1).sort({ $natural: -1 });

        let user_id;
        if (recent.length === 0) {
          user_id = 1;
        } else {
          const found_id = recent[0].user_id.split("-");
          user_id = Number(found_id[1]) + 1;
          user_id = `UID-${user_id}`;
          //if (!(role === 'user')) {
            const rights = await Role.find({ name: role });
            //.select('dashboard location category products orders update banner settings role')
            console.log(rights);
            newuser = await User.create({
              username,
              address,
              fullname,
              role,
              status,
              storename,
              phoneno,
              password,
              storelocationcity,
              storename,
              storelocationcoordinates,
              usercreatedby: theuser._id,
              user_id,
              rights: rights[0],
              numberverified: true,
              confirmemail: true,
              refercode
            });
          // } else {
          //   newuser = await User.create({
          //     username,
          //     address,
          //     fullname,
          //     role,
          //     status,
          //     storename,
          //     phoneno,
          //     password,
          //     storelocationcity,
          //     storename,
          //     storelocationcoordinates,
          //     usercreatedby: theuser._id,
          //     user_id,
          //     vehicleno,
          //     vendorId,
          //     numberverified: true,
          //     confirmemail: true,
          //   });
          // }
        }
      }

      return res.status(200).json({
        success: "true",
        body: {
          newuser,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        errors: "Error while creating user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error while creating user",
    });
  }
};



exports.getusersdetails = async (req, res) => {
  const access = await checkaccess(req.user.id, "users", "read");
    if (!access) {
      return res.status(422).json({
        errors: "You dont have access for this request",
      });
    }
  try {
    console.log('got id',req.params)
    const theuser = await User.findById(req.params.id).select("wallet refercode phoneno ordercount referedusersid").populate("referedusersid")
    //console.log(theuser)
    const orderlist = await Order.find({userId : req.params.id})
    console.log(orderlist)
    res.status(200).json({
      status: "success",
      theuser,
      orderlist
    });
  } catch (error) {
    return res.status(422).json({
      errors: "Error getting all users",
    });
  }
};