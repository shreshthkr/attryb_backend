const express = require("express");
const inventoryRouter = express.Router();
const { inventoryModel } = require("../models/inventory.model");


inventoryRouter.post("/add", async (req,res)=>{
    const newInventory = new inventoryModel(req.body);
    try {
        const inventory = await newInventory.save();
        res.status(200).send(inventory);
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

inventoryRouter.get("/", async (req, res) => {
    const { mileage, color } = req.query;

  console.log(color);
  try {
    if(mileage){
        try {
            const filterMileage = await inventoryModel.find({mileage})
            res.status(200).send({filterMileage})
        } catch (error) {
            res.status(500).send({"err":err.message})
        }
    }else if(color){
        try {
           const filterColor = await inventoryModel.find({color})
           console.log(filterColor);
           res.status(200).send({"Data":filterColor}) 
        } catch (error) {
            res.status(500).send({"err":err.message})
        }
    }
    const data = await inventoryModel.find();
    res.status(200).send({"Data":data})
  } catch (error) {
    res.status(500).send({"err":error.message})
  }

});


inventoryRouter.put("/inventory/:id", async (req,res) => {
    const carID = req.params.id;
    const newInventory = req.body;
    try {
        const existingInventory = await inventoryModel.findById(carID);

        if(!existingInventory){
            return res.status(404).send({ msg: 'Inventory not found' }); 
        }
        existingInventory.mileage = newInventory.mileage;
        existingInventory.color = newInventory.color;
        existingInventory.price = newInventory.price;

        await existingInventory.save();
        res.status(200).send({ msg: 'Inventory updated successfully', updatedInventory: existingInventory });
    } catch (error) {
        res.status(400).send({ msg: 'Error updating inventory', error: error.message });
    }
});

inventoryRouter.delete("/inventory/:id", async (req,res) => {
    const carID = req.params.id;
    try {
        const deleteInventory = await inventoryModel.findByIdAndDelete(carID);
        res.status(200).send({ msg: "Inventory deleted successfully", deleteInventory });
    } catch (error) {
        res.status(400).send({ msg: "Error deleting Inventory", error: error.message });
    }
})

inventoryRouter.get('/:id', async (req,res) => {
    const inventoryID = req.params.id;

    try {
      const product = await inventoryModel.findById(inventoryID);
      
      if(!product){
        return res.sendStatus(404).send({msg:"Inventory not found"})
      }
      res.status(200).send(product);
    } catch (error) { res.status(400).send({ error: error.message });
        
    }
})



module.exports = { inventoryRouter };


