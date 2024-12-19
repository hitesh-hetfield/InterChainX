const hre = require("hardhat");
const { getContracts } = require("../utils");

async function checkTrustedRemotes() {
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

  const tx = await lockContract.trustedRemotes(
    2147484614, 
    "0xeE02101Da362c9bFc616F72AbF8301Ba94f3C4fe");
  console.log("Return value:", tx);

}

// Handling errors
checkTrustedRemotes().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


