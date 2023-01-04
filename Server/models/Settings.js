const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const settingsSchema = new mongoose.Schema({
  sitename: {
    type: String,
  },
  siteemail: {
    type: String,
  },
  sitefooter: {
    type: String,
  },
  ordercommission: {
    type: Number,
  },
  georadius: {
    type: String,
  },
  sitelogo: {
    type: String,
  },
  description: {
    type: String,
  },
  customerterms: {
    type: String,
  },
  privacy: {
    type: String,
  },
  androidlink: {
    type: String,
  },
  ioslink: {
    type: String,
  },
  emailhost: {
    type: String,
  },
  emailusername: {
    type: String,
  },
  emailpassword: {
    type: String,
  },
  twillioAuthtoken: {
    type: String,
  },
  twillioaccountsid: {
    type: String,
  },
  stripekey: {
    type: String,
  },
  stripesecret: {
    type: String,
  },
  sociallinkfacebook: {
    type: String,
  },
  sociallinktwitter: {
    type: String,
  },
  sociallinkwhatsapp: {
    type: String,
  },
  sociallinkinstagram: {
    type: String,
  },
  phoneverifydigit: {
    type: Number,
  },
  phoneexpiretime: {
    type: String,
  },
  coupincodes : {
    type : Array
  },
  sliders: {
    type: [
      {
        slideimage: { type: String },
        slidetitle: { type: String },
        slidedescription: { type: String },
      },
    ],
  },
  blogname : {
    type : String
  },
  blogcontent : {
    type : String
  },
  image : {
    type : String
  },
  minorder : {
    type : Number
  },
  headertags : {
    type : String
  }
});

module.exports = Settings = mongoose.model("settings", settingsSchema);
