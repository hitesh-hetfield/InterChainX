const hre = require("hardhat");
const { getContracts, saveContract } = require("../utils");

async function main() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  console.log('Deploying on', hre.network.name, 'with account', deployerAddress);
  
  const network = hre.network.name;
  const contracts = getContracts(network);

  const lock = await hre.ethers.getContractFactory("lockContract");
  const lockContract = await lock.deploy(deployer.address, contracts.wmbGateway);
  
  await lockContract.waitForDeployment();      // Wait for deployment
  console.log("lockContract deployed to:", lockContract.target);  // Access the contract address directly

  saveContract(network, "lockContract", lockContract.target);
  console.log("Lock contract saved");

  //Verify contract
  await hre.run("verify:verify", {
    address: lockContract.target,
    constructorArguments: [deployer.address, contracts.wmbGateway],
  });


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
