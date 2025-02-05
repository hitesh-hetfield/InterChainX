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
    ["0x373085e45B03db364258aEC125355C2997F223E3"], 
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
