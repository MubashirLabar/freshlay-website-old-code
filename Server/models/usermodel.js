const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { NumberContext } = require("twilio/lib/rest/pricing/v1/voice/number");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is required"],
  },
  usercreatedby : {
    type : String
  },
  address: {
    type: String,
  },
  storename: {
    type: String,
  },
  storelocationcity: {
    type: String,
  },
  storelocationcoordinates: {
    type: Object,
  },
  user_id: {
    type: String,
  },
  fullname: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
  },
  vehicleno: {
    type: String,
  },
  confirmnumbercode: {
    type: Number,
    //  default : ''
  },
  vendorId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  notifications : {
    type : [{
      data : Object
    }]
  },
  numberverified: {
    type: Boolean,
    default: false,
  },
  confirmemail: {
    type: Boolean,
    default: false,
  },
  resetpassmessagetoken: {
    type: String,
    default: "",
  },
  resetemailPasswordLink: {
    type: String,
    default: "",
  },
  phoneno: {
    type: Number,

    maxlength: [10, "length should be 10"],
  },
  ordercount : {
    type : Number,
    default : 0
  },
  refercode : {
    type : String
  },
  wallet : {
    type : Number,
    default : 0
  },
  randompassgenerated : {
    type : Boolean
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "length should be greater than 8"],
  },
  favourite: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
  },
  media: {
    type: String,
    default: "users/default.jpg",
  },
  cnic: {
    type: String,
  },
  addressbook: {
    type: [
      {
        name: { type: String },
        streetaddress: { type: String },
        address2: { type: String },
        city: { type: String },
        state: { type: String },
        postalcode: { type: String },
        cellphone: { type: String },
        addresscoordinates: { type: Object },
        coordinateaddress : {type : String}
      },
    ],
  },
  referedusersid: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
  },
  status: {
    type: String,
    default: "active",
  },
  rights: {
    dashboard: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    categories: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    products: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    requestproduct: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    orders: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    allorders: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    scales: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },

    settings: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    roles: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    users: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    packages: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    reviews: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    },
    blogging: {
      read: {
        type: Boolean,
        default: "false",
      },
      create: {
        type: Boolean,
        default: "false",
      },
      edit: {
        type: Boolean,
        default: "false",
      },
      del: {
        type: Boolean,
        default: "false",
      },
    }  
  },
});

// run before when we are trying to save the document
// some method dont work inside
/*userSchema.pre('save',async (next) => {
    userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
    
}
next()
) 
}
) */

module.exports = User = mongoose.model("user", userSchema);
