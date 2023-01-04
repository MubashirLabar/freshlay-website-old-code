const mongoose = require("mongoose");

const roleschema = mongoose.Schema(
  {
    // role name e.g user/vendor/rider
    name: {
      type: String,
    },
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
    packages :{
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
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("roles", roleschema);
