const hre = require("hardhat");

async function main() {
//   const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
//   const deployerAddress = await deployer.getAddress();    // Retrieve the address
//   console.log('Deploying on', hre.network.name, 'with account', deployerAddress);

  const lock = await hre.ethers.getContractFactory("lockContract");
  const lockContract = await lock.deploy("0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c", "0x30de9d1d358ff1b60fb8057235aac35e23b7650f"); //5ire
  
  await lockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", lockContract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
