const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function checkTxStatus() {

    const filepath = path.join(
        __dirname,
        `../../tx-hashes/dev.thunder.tx-hash.json`
    );

    const txData = JSON.parse(fs.readFileSync(
        filepath,
        "utf-8"
        )
    );

    // change the index to check status of different txs
    const txHash = txData[3].txHash;
    const coinsLocked = txData[3].coinsLocked;
    const apiUrl = `https://testnet.wanscan.org/api/cc/msg/tx?sendTxHash=${txHash}`;

    try {
        // Make the GET request to the API
        const response = await axios.get(apiUrl);
    
        const apiResponseData = response.data;

        const transaction = apiResponseData[0];
        const formattedDate = new Date(transaction.timestamp * 1000);

        console.log("Timestamp:", formattedDate.toLocaleString());
        console.log("Tx Hash:", txHash);
        console.log("Coins Locked:", coinsLocked);
        console.log("Status:", transaction.status);
        console.log("Sender Address:", transaction.from);
        console.log("From Chain:", transaction.fromChain);
        console.log("To Chain:", transaction.toChain);
        console.log("Gas Fee:", transaction.fee.value, transaction.fee.unit);
        console.log("Message ID:", transaction.msgId);
    
      } catch (error) {
        
        console.error("Error fetching data from the API:", error.message);
        if (error.response) {
            console.error("Response Status Code:", error.response.status);
            console.error("Response Data:", error.response.data);
        }
    }
}

// Handling errors
checkTxStatus().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});