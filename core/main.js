const getTweets = require("./getTweets");
const extractTransactionURL = require("./extractTxn");
const extractURL = require("./extractUrl");
const getTransactionDetails = require("./getTxnDetails");

function getTxnData(){
    return new Promise((resolve, reject)=>{
        //extract tweets from @whale_alert
        getTweets().then(tweets=>{
            let tweet = tweets[0].text;
            //extract t.co url from tweet
            let tcoURL = extractURL(tweet);
            
            //remove t.co url from the tweet
            tweet = tweet.replace(tcoURL, "");

            //remove emojis from the tweet... who know regex btw? I copied it from stackoverflow
            tweet = tweet.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
            //remove \n \r \t characters
            tweet = tweet.trim();

            //extract the original url
            extractTransactionURL(tcoURL).then(url=>{
                //we have the t.co url
                //remove https://whale-alert.io from the url
                let txnId = url.replace("https://whale-alert.io", "");
                //pass this txnId to get the transaction details from whale alert api
                getTransactionDetails(txnId).then(data=>{
                    resolve([data, tweet]);
                }).catch(err=>{
                    console.log(err);
                })
    
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
    }) 
}

module.exports = getTxnData;