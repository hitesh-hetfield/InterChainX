const hre = require("hardhat");
const { getContracts, saveContract } = require("../utils");

async function main() {
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

  const tx = await lockContract.setTrustedRemotes([contracts.chainId], [contracts.wmbGateway], [true]);

  await tx.wait();
  console.log("Trusted remote set");




  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
