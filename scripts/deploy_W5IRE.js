const hre = require("hardhat");

async function main() {
//   const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
//   const deployerAddress = await deployer.getAddress();    // Retrieve the address
//   console.log('Deploying on', hre.network.name, 'with account', deployerAddress);

  const unlock = await hre.ethers.getContractFactory("W5ire");
  // const unlockContract = await unlock.deploy("0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c", "0x5522976caf971e0000183ab20cab8ebba9a90cdc"); //polygon
  const unlockContract = await unlock.deploy("Wrapped 5ire", "W5ire", "0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c", "0x5522976caf971e0000183ab20cab8ebba9a90cdc"); //polygon
  
  await unlockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", unlockContract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });