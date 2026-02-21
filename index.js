const express = require('express')
require("dotenv").config();

const app = express()
const port = process.env.PORT;

const customerRoutes = require('./routes/customer-route');
const adminRoutes = require("./routes/admin-routes");

app.use(express.urlencoded())
app.use("/uploads", express.static("uploads"));
app.use(express.json())

app.use("/admin", adminRoutes);
app.use("/customers", customerRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})