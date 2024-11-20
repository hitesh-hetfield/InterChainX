const hre = require("hardhat");

async function main() {

  const lock = await hre.ethers.getContractFactory("lockCoins");
  const lockContract = await lock.deploy(); //5ire
  
  await lockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", lockContract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
