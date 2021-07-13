# Whale Alert - Fetch latest whale transactions from various Blockchains

This NodeJS app uses [whale-alert.io's](https://whale-alert.io/) API to fetch the latest whale transactions.
I call it poor man's whale alert.

### Here are some screenshots
![screenshot](https://github.com/threadException/Whale-Alert/blob/main/transaction_json.png)

![screenshot](https://github.com/threadException/Whale-Alert/blob/main/transaction.png)

### Whyyyyy?
For free accounts whale-alert.io's API is very limited, only allows 10 api calls per minute or 1 api call per 6 seconds.
And only returns the transactions that has a value of greater than 500k USD.

But, then I found their bot's [twitter account](https://twitter.com/whale_alert). It tweets everytime a large transaction happens. And inside the tweet, there is a link to their website that shows the entire transaction details.

It's url looks something like this
```
https://whale-alert.io/transaction/ethereum/ae8a491532d1862c6c5f05fd48d704425d3ec77d413d31dd75b941379be53dc1
```

and all we need to do is to extract the following part from the above url
```
/transaction/ethereum/ae8a491532d1862c6c5f05fd48d704425d3ec77d413d31dd75b941379be53dc1
```
and add ```https://api.whale-alert.io/v1``` to the front then add  ```?api_key=YOUR_WHALE_ALERT_API_KEY_HERE``` to the end.

Then it will look something like this
```
https://api.whale-alert.io/v1/transaction/ethereum/ae8a491532d1862c6c5f05fd48d704425d3ec77d413d31dd75b941379be53dc1?api_key=YOUR_WHALE_ALERT_API_KEY_HERE
```

This url will return the JSON formatted data of the transaction that was tweeted by whale-alert's bot.

But why? you may ask. Well, this evades their 500k USD transaction limit.

### Building
goto ```keys.js``` and add your twitter's `consumer_key`, `consumer_secret`, `access_token_key` and `access_token_secret`, then add, your whale-alert.io's api key at `whale_alert_api_key` and finally add your `MongoURI`.

Once you do this, run `npm install` and then run `npm start` to start the server.

### How to use this?
Host the code on AWS or Digital Ocean or Heroku.

Then, you can get the transaction's JSON data from ```/api/v1/get``` route.
You can update the data from ```/api/v1/update``` route.

This will delete all the existing data on MongoDB server and update with new data. I never used Redis and I think it will be the best option in this case.
If you've worked with Redis in the past then feel free remove the MongoDB dependency and add Redis('s?) code and submit a pull request. I'll verify merge it.

Once you host the code on a server, create an account on https://testuptime.com/ and add ```/api/v1/update``` route to it. And ping your website from there with a simple http request. This will update the data every single minute by extracting the latest tweet from whale_alert bot. This will also ensure that we are not crossing the API's rate limit. I don't know if it's feasible to do this on the server side itself. If yes, create a pull request and I'll merge it.

Once you do this, you can use ```/api/v1/get``` route to fetch latest transaction details for Android or IOS apps or your website.

### Contribution
Feel free to fork and contribute to this repo.

What it needs now?

- [ ] Redis instead of MongoDB? does it even work?
- [ ] Remove testuptime.com's dependency?