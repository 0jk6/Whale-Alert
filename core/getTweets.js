const Twitter = require("twitter");
const keys = require("../keys");

//extracts the latest tweet from @whale_alert twitter account
function getTweets(){
    const twee = new Twitter(keys);

    let params = {
        screen_name : "whale_alert",
        count : 1
    };
    
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            twee.get("statuses/user_timeline", params, (err, tweets, resp)=>{
                if(!err){
                    resolve(tweets);
                }
                else{
                    reject(err);
                }
            });
        }, 250)
    });    
}


module.exports = getTweets;

