const axios= require("axios");

async function getTxData() {

    const txHash = "0x760ed7baa17ed0d3cda5960a170a3d10f29ba71c838a59d3f5f8aec90522c3d1";
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

  
getTxData();