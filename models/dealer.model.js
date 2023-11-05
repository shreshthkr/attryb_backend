const mongoose = require("mongoose");

const dealerSchema = mongoose.Schema(
    {
      name: {
        type:String,
        required:true,
      },
      email: {
        type:String,
        required:true,  
      },
      age:{
        type:Number,
        required:true
      },
      city:{
        type:String,
        reuired:true
      },
       state:{
        type:String,
        reuired:true
      },
      role:{
        type:String,
        required:true,
      },
      password: {
        type:String,
        required: [true, "Please Enter Your Password"]
      },
    },
    {
      versionKey: false,
    }
  );
  
  const DealerModel = mongoose.model("dealer", dealerSchema);
  
  module.exports = {
    DealerModel,
  };