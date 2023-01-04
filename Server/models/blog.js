const mongoose = require("mongoose");
const blogschema = new mongoose.Schema({
  title : {
    type : String
  },
  paragraphitems : {
    type : Object
  },
  image1 : {
    type : String
  },
  image2 : {
    type : String
  },
  category : {
    type : String
  },
  mainheading : {
    type : String
  },

});

module.exports = blogs = mongoose.model("blog", blogschema);
