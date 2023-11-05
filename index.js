const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();


const { connection } = require("./Config/db");
const { userRouter } = require("./routes/user.routes");
const {dealerRouter} = require("./routes/dealer.routes");
const {oemRouter} = require("./routes/oem.routes");
const {inventoryRouter} = require("./routes/inventory.routes");
const { auth } = require("./middlewares/auth")
const app = express()

app.use(express.json()) 
app.use(cors())
 

app.use("/users", userRouter);
app.use("/dealers", dealerRouter);
app.use("/oemSpecs", oemRouter);
app.use("/inventory", inventoryRouter);

// app.use(auth);
//server runnig on port 8080
app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log( "Connected to MongoDb")

    } catch (error) {
        console.log("Cannot connect to MongoDb")
    }
    console.log(`Server running on port ${process.env.PORT}`)
})