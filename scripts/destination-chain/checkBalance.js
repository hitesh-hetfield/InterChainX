const hre  = require("hardhat");
const { ethers } = require("ethers");
const { getContracts, saveContract } = require("../utils");

async function checkBalance() {


    // console.log("Ethers object:", ethers);

    const deployer = await hre.ethers.provider.getSigner();
    const deployerAddress = await deployer.getAddress();
    
    const network = hre.network.name;
    const contracts = getContracts(network);

    const UnlockContract = await hre.ethers.getContractFactory(
        "FireERC20"
    );

    const unlockContract = UnlockContract.attach(
        contracts.unlockContract
    );

    const userAddress = "0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c";

    const checkBalance = await unlockContract.balanceOf(
        userAddress
    );

    const formattedBalance = ethers.formatEther(checkBalance);

    console.log("User Balance:", formattedBalance);
}

checkBalance().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});