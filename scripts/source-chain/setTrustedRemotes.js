const hre = require("hardhat");
const { getContracts } = require("../utils");

async function setTrustedRemotes() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  console.log('Deploying on', hre.network.name, 'with account', deployerAddress);
  
  const network = hre.network.name;
  const contracts = getContracts(network);

  const LockContract = await hre.ethers.getContractFactory(
    "lockContract"
  );
  const lockContract = LockContract.attach(
    contracts.lockContract
  );

  const tx = await lockContract.setTrustedRemotes(
    [2147484614], 
    ["0xeE02101Da362c9bFc616F72AbF8301Ba94f3C4fe"], 
    [true]
  );

  await tx.wait();
  console.log("Trusted remote set");

}

// Handling errors
setTrustedRemotes().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});