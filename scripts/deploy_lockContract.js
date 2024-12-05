const hre = require("hardhat");

async function main() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  console.log('Deploying on', hre.network.name, 'with account', deployerAddress);
  
  const gateawayAddress5ire = process.env.gateawayAddress5ire;

  const lock = await hre.ethers.getContractFactory("lockContract");
  const lockContract = await lock.deploy(deployer, "0xDDddd58428706FEdD013b3A761c6E40723a7911d");
  
  await lockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", lockContract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
