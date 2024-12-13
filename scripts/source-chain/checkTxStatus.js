const axios = require("axios");

async function checkTxStatus() {

    const txHash = "0xcfdc5cda4e50e0141068452d8308056f0f600870d112ebbf708ebb0030fecae7";
    const apiUrl = `https://testnet.wanscan.org/api/cc/msg/tx?sendTxHash=${txHash}`;

    try {
        // Make the GET request to the API
        const response = await axios.get(apiUrl);
    
        const apiResponseData = response.data;

        const transaction = apiResponseData[0];
        const formattedDate = new Date(transaction.timestamp * 1000);

        console.log("Timestamp:", formattedDate.toLocaleString());
        console.log("Message ID:", transaction.msgId);
        console.log("From Chain:", transaction.fromChain);
        console.log("To Chain:", transaction.toChain);
        console.log("Sender Address:", transaction.from);
        console.log("Send Transaction Hash:", transaction.sendTxHash);
        console.log("Status:", transaction.status);
        console.log("Gas Fee:", transaction.fee.value, transaction.fee.unit);
    
      } catch (error) {
        
        console.error("Error fetching data from the API:", error.message);
        if (error.response) {
            console.error("Response Status Code:", error.response.status);
            console.error("Response Data:", error.response.data);
        }
    }
}

checkTxStatus();