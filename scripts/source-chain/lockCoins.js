const hre = require("hardhat");
const { ethers } = require("ethers");
const { getContracts } = require("../utils");
const fs = require("fs");
const path = require("path");

async function lockCoins() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  console.log('Deploying on', hre.network.name, 'with account', deployerAddress);
  
  const network = hre.network.name;
  const contracts = getContracts(network);
  const env = process.env.NODE_ENV;

  const LockContract = await hre.ethers.getContractFactory(
    "lockContract"
  );
  const lockContract = LockContract.attach(
    contracts.lockContract
  );

  // Chain id of destination chain 
  const estimateFee = await lockContract.estimateFee(
    2147484614,
    300000
    );
  
  console.log("Estimate Fee:", estimateFee);
  // Amount of native token to lock
  const nativeTokenAmount = ethers.parseUnits("5", 18);

  // estimate fee + number of coins to lock
  const totalAmount = BigInt(estimateFee) + BigInt(nativeTokenAmount);

  const tx = await lockContract.lockCoin(
    // Chain id of destination chain 
    2147484614, 
    // Contract address from destination chain - ERC20
    "0x21F49083CDb15e33361AdcB32e5C677616fE36c6",
    // Address of the user
    "0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c",
    // gas limit
    300000,
    // Amount of native token + fee to lock
    { value: totalAmount }
    );

  await tx.wait();
  console.log("Coins Locked Tx:", tx.hash);

  // Storing tx hashes
  const lockTxs = {
    txHash: tx.hash,
    coinsLocked: ethers.formatEther(nativeTokenAmount).toString()
  };

  const filepath = path.join(
    __dirname,
    `../../tx-hashes/${env}.${network}.tx-hash.json`
  );

  const existingTxs = fs.existsSync(filepath)
  ? JSON.parse(fs.readFileSync(
    filepath, 
    "utf-8")
  )
  : [];

  existingTxs.push(lockTxs);

  fs.writeFileSync(
    filepath,
    JSON.stringify(existingTxs, null, 4)
  );
}

// Handling errors
lockCoins().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
