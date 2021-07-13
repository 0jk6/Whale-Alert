const request = require("request");
const {whale_alert_api_key} = require("../keys");

//extracts the transaction's blockchain data from whale-alert.io api
function getTransactionDetails(txn){
    
    if(txn[txn.length-2] == '/')
        txn = txn.replace("/1", "");
    
    let url = "https://api.whale-alert.io/v1" + txn + "?api_key=" + whale_alert_api_key;

    console.log("whale alert api url : " + url)
    return new Promise((resolve, reject)=>{
        request.get(url,function (error, resp, body) {
                if (!error && resp.statusCode==200) {
                    resolve(body);
                }
                else{
                    reject(error)
                }
            }
        );
    }); 
}

module.exports = getTransactionDetails;