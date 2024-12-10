const hre = require("hardhat");
const { getContracts, saveContract } = require("../utils");

async function main() {
  const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
  const deployerAddress = await deployer.getAddress();    // Retrieve the address
  console.log('Deploying on', hre.network.name, 'with account', deployerAddress);
  
  const network = hre.network.name;
  const contracts = getContracts(network);

  const UnlockContract = await hre.ethers.getContractFactory(
    "FireERC20"
  );
  const unlockContract = UnlockContract.attach(
    contracts.unlockContract
  );

  const tx = await unlockContract.trustedRemotes(1073741853, "0x7A0d8C7347D1CFfeB91264fD299BaEC2302990be");
  console.log("Return value:", tx);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


