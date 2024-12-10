const hre = require("hardhat");
const { getContracts, saveContract} = require("../utils");

async function main() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  const network = hre.network.name; 

  console.log('Deploying on', network, 'with account', deployerAddress);

  const contracts = getContracts(network);
  console.log(contracts);

  const tokenName = "5ire Token";
  const tokenSymbol = "5IRE";

  const unlock = await hre.ethers.getContractFactory("FireERC20");
  const unlockContract = await unlock.deploy(tokenName, tokenSymbol, deployerAddress, "0xDDddd58428706FEdD013b3A761c6E40723a7911d"); //polygonAmoy
  
  await unlockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", unlockContract.target);  // Access the contract address directly

  saveContract(network, "unlockContract", unlockContract.target);
  console.log("FireERC20 Contract saved");

  //Verify contract
  await hre.run("verify:verify", {
    address: unlockContract.target,
    constructorArguments: [tokenName, tokenSymbol, deployerAddress, "0xDDddd58428706FEdD013b3A761c6E40723a7911d"],
  });

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });