const hre = require("hardhat");
const { getContracts, saveContract } = require("../utils");

async function main() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  const network = hre.network.name;

  console.log('Deploying on', network, 'with account', deployerAddress);
  
  const contracts = getContracts(network);
  console.log(contracts);

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

// Handling errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
