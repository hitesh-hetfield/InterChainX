const hre = require("hardhat");

async function main() {

  const bug1 = await hre.ethers.getContractFactory("Example");
  const bug1Contract = await bug1.deploy();
  
  await bug1Contract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", bug1Contract.target);  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });