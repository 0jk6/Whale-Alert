const request = require('request')

//extracts the original whale-alert.io url from twitter's t.co url
function extractTransactionURL(url){

    let headers = {
        "User-Agent": "please gimme back the original url from the tweet"
    }
  
    var options = {
      url, headers
    }
  
    return new Promise((resolve, reject)=>{
        request.get(options, function (error, resp, body) {
                if (!error && resp.statusCode==200) {
                    console.log("whale alert url : " + resp.request.uri.href)
                    resolve(resp.request.uri.href);
                }
                else{
                    reject(error)
                }
            }
        )
    }); 
}

module.exports = extractTransactionURL;
