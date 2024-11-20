const { ethers } = require("hardhat");

async function main() {

    const w5ire = await ethers.getContractFactory("W5IRE");

    const w5ireContract = await w5ire.deploy();

    console.log("Contract deployed at:", w5ireContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})