const express = require("express");
const oemRouter = express.Router();
const { OEMModel } = require("../models/oem.model");

oemRouter.post("/add", async (req, res) => {
  const {modelName, yearOfModel, price, colors, mileage, powerBHP, maxSpeed } =
    req.body;
  try {
    const oem = new OEMModel({
        modelName,
        image,
        yearOfModel,
      price,
      colors,
      mileage,
      powerBHP,
      maxSpeed,
    });
    await oem.save();
    res.status(200).send({ msg: "A new car details has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

oemRouter.get("/cars", async (req, res) => {
  const { model } = req.query;
  try {
    if (model) {
      const oemData = await OEMModel.findOne({ model: model });
      if (oemData) {
        res.status(200).send(oemData);
      } else {
        res.status(404).send({ msg: "OEM specification not found" });
      }
    } else {
      const allOEMData = await OEMModel.find();
      res.status(200).send({ msg: "All data retrieved", allOEMData });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { oemRouter };
