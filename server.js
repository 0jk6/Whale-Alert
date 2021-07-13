const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
const {MongoURI} = require("./keys");


require('./models/schema');
mongoose.connect(MongoURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((req)=>{
        console.log("Connected to MongoDB");
});

const getRoute = require("./routes/get");
const frontRoute = require("./routes/front");
app.use("/api/v1/", getRoute);
app.use("/", frontRoute);

app.get("/", (req, res)=>{
    res.redirect("/transaction");
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});