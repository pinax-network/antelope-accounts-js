const { createClient } = require("./");
const process = require('process');

// Accounts substream sink URL
const url = "http://yaro-accounts43.mar.eosn.io:8000";

async function promptUser() {
    process.stdin.write('\nEnter account name:\n> ');
    const account = await new Promise((resolve) => {
        process.stdin.once('data', (data) => {
          resolve(data.toString().trim());
        });
    });

    try {
        const data = await client.getOrigin(account);
        console.log(data);
    } catch (e) {
        console.error(`Failed to get data for account "${account}":`, e.message);
    }

    promptUser();
}

const client = createClient( url );

promptUser();