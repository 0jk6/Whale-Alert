const express = require("express");
const mongoose = require("mongoose");
const getTweets = require("../core/getTweets");
const getTxnData = require("../core/main");

const router = express.Router();

const blockSchema = mongoose.model("blockSchema");

router.get("/update", (req, res)=>{
    console.log("Updating tweets...");

    getTxnData().then(([data, tweet])=>{
        let txn = JSON.parse(data);
        let txnData = {
            tweet : tweet,
            hash : txn.transactions[0].hash,
            blockchain : txn.transactions[0].blockchain,
            amount : txn.transactions[0].amount,
            amount_usd : txn.transactions[0].amount_usd,
            timestamp : txn.transactions[0].timestamp,
            from : txn.transactions[0].from.address,
            to : txn.transactions[0].to.address
        }

        blockSchema.remove({}, ()=>{
            console.log("Removing existing collections");
        });

        const block = new blockSchema(txnData);
        
        block.save().then(txnBlock=>{
            res.json(txnBlock);
        }).catch(err=>{
            res.json({message : "error"});
            console.log(err);
        })
    })
});

router.get("/get", (req, res)=>{
    blockSchema.findOne({}).then(data=>{
        res.json({message : data});
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;