const hre = require("hardhat");

async function main() {

  const test = await hre.ethers.getContractFactory("Test");
  const testContract = await test.deploy();
  
  await testContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", testContract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });