const hre = require("hardhat");
const { getContracts } = require("../utils");

async function setTrustedRemotes() {
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

  const tx = await unlockContract.setTrustedRemotes(
    [1073741853], 
    ["0x0fEc43F72F1CFC634302e9BdD3aF84b6Ec808f4d"], 
    [true]
  );

  await tx.wait();
  console.log("Trusted remote set");

}

// Handling errors
setTrustedRemotes().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
