const mongoose = require("mongoose");

const blockSchema = mongoose.Schema({
    tweet : {
        type : String,
    },
    hash : {
        type : String,
    },
    blockchain : {
        type : String,
    },
    amount : {
    },
    amount_usd : {
    },
    timestamp :{
    },
    from : {
        type : String,
    },
    to : {
        type : String,
    }

});

mongoose.model("blockSchema", blockSchema);