const express = require("express");
const dealerRouter = express.Router();
const { DealerModel } = require("../models/dealer.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dealerRouter.post("/register", async (req, res) => {
  const { name, email, age, city, state, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const dealer = new DealerModel({
        name,
        email,
        age,
        city,
        state,
        role:'dealer',
        password: hash,
      });
      await dealer.save();
      res.status(200).send({ msg: "Registration has been done" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.mesaage });
  }
});


dealerRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const dealer = await DealerModel.findOne({ email });
      if (dealer) {
        bcrypt.compare(password, dealer.password, (err, result) => {
          if (result) {
            res.status(200).send({
              msg: "Login Successfull",
              token: jwt.sign({ dealerID: dealer._id, role:"dealer" }, "attryb"),
              dealerID: dealer._id
            });
          } else {
            res.status(400).send({ msg: "Wrong Credentials" });
          }
        });
      }
    } catch (error) {
      res.status(400).send({ msg: error.mesaage });
    }
  });

module.exports = {dealerRouter}