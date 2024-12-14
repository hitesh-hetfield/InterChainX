const hre = require("hardhat");
const { ethers } = require("ethers");
const { getContracts, saveContract } = require("../utils");
const { lock } = require("ethers");

async function checkBalance() {

    const deployer = await hre.ethers.provider.getSigner();
    const deployerAddress = await deployer.getAddress();

    const network = hre.network.name;
    const contracts = getContracts(network);

    const LockContract = await hre.ethers.getContractFactory(
        "lockContract"
    );

    const lockContract = LockContract.attach(
        contracts.lockContract
    );

    const userAddress = "0x850b74A3Cd5edeaD1d09c4ce39356ED681709C1c";

    const checkBalance = await lockContract.balanceOf(
        userAddress
    );

    const formattedBalance = ethers.formatEther(checkBalance);

    console.log("User Coins Locked:", formattedBalance);
}

checkBalance((error) => {
    console.error(error);
    process.exitCode=1
});