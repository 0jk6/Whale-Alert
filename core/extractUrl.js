//simple pattern matching to extract the url from the tweet body
function extractURL(tweet){
    
    let urlRegex = /(https?:\/\/[^ ]*)/;
    let url = tweet.match(urlRegex)[1];
    
    return url;
}

module.exports = extractURL;