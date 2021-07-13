const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const blockSchema = mongoose.model("blockSchema");

router.get("/transaction", (req, res)=>{
    blockSchema.findOne({}).then(data=>{
        res.render("transaction.ejs", {"data" : data})
        //res.json({message : data});
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;