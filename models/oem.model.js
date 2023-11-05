const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
  modelName: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true,
  },
  yearOfModel: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: [String],
  mileage: {
    type: Number,
    required: true,
  },
  powerBHP: {
    type: Number,
    required: true,
  },
  maxSpeed: {
    type: Number,
    required: true,
  },
}
,
    {
      versionKey: false,
    });

const OEMModel = mongoose.model("OEMSpecs", oemSchema);

module.exports = {OEMModel};
