const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    model: {
        type: String,
        required: true,
      },
    mileage: { 
        type: Number, 
        required: true
     },
     price:{
        type: Number,
        required:true
     },
    km_odeometer: {
      type: Number,
      required: true,
    },
    scratches: {
      type: Number,
      required: true,
    },
    originalPaint: {
      type: String,
      required: true,
    },
    accidentCount: {
      type: Number,
      required: true,
    },
    previousBuyer: {
      type: Number,
      required: true,
    },
    registrationPlace: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: true,
      },
     description: {
        type: String,
        required: true,
      },
  },
  {
    versionKey: false,
  }
);

const inventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = { inventoryModel };
