require("dotenv").config();
const twit = require('./twit.js');
const cron = require("node-cron");

function postTweet(tweet) {
    return new Promise((resolve, reject) => {
        let params = {
            status: tweet,
        };
        twit.post('statuses/update', params, (err, data) => {
            if(err)
                return(reject(err));
            return resolve(data);
        });
    });
}

async function main() {
    // const tweet = "This was posted by a bot";
    const tweet = "Tweeting a random number: " + Math.floor(Math.random() * 100);
    try {
        await postTweet(tweet);
        console.log("Successfully tweeted '" + tweet + "'");
    } catch(e) {
        console.log("error in tweet\n", e);
    }
}

console.log("Starting the bot");

cron.schedule("0 20 * * * *", () => main());
