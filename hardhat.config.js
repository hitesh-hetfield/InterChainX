/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { wanchainTestnet } = require("viem/chains");

account_pvt_key = process.env.PVT_KEY !== undefined ? [process.env.PVT_KEY] : [];
wanchain_pvt_key = process.env.PVT_KEY_1 !== undefined ? [process.env.PVT_KEY_1] : [];


module.exports = {
  solidity: "0.8.22",
  networks: {
    thunder: {
      url: "https://rpc.testnet.5ire.network",
      chainId: 997,
      accounts: account_pvt_key
    },
    qa: {
      url: "https://rpc.qa.5ire.network",
      chainId: 997995,
      accounts: account_pvt_key
    },
    wanchainTestnet: {
      url: wanchainTestnet.rpcUrls.default.http[0],
      accounts: wanchain_pvt_key,
      gasPrice: 1e9,
      gas: 6e6,
    },
    esepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts: account_pvt_key
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      chainId: 80002,
      accounts: account_pvt_key
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      accounts: account_pvt_key
    },
    bsepolia: {
      url: "https://sepolia.base.org/",
      chainId: 84532,
      accounts: account_pvt_key
    }
  },
  etherscan: {
    apiKey: {
      thunder: process.env.THUNDER_API_KEY !== undefined ? [process.env.THUNDER_API_KEY] : [],
      amoy: process.env.POLYGON_API_KEY !== undefined ? [process.env.POLYGON_API_KEY] : [],
      qa: process.env.THUNDER_API_KEY !== undefined ? [process.env.THUNDER_API_KEY] : []
    },
  customChains: [
    {
      network: "thunder",
        chainId: 997,
        urls: {
          apiURL: "https://contract.evm.testnet.5ire.network/5ire/verify",
          browserURL: "https://testnet.5irescan.io/dashboard"
        }
      },
      // {
      //   network: "bsepolia",
      //   chainId: 84532,
      //   urls: {
      //     apiURL: "https://api-sepolia.basescan.org/api",
      //     browserURL: "https://sepolia.basescan.org/"
      //   }
      // },
      // {
      //   network: "esepolia",
      //   chainId: 11155111,
      //   urls: {
      //     apiURL: "https://api-sepolia.etherscan.io/api",
      //     browserURL: "https://sepolia.etherscan.io/"
      //   }
      // },
      {
        network: "amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com/"
        }
      },
    //   {
    //   network: "bsc",
    //   chainId: 97,
    //   urls: {
    //     apiURL: "https://api-testnet.bscscan.com/api",
    //     browserURL: "https://testnet.bscscan.com/"
    //   }
    // },
    {
      network: "qa",
      chainId: 997995,
      urls: {
        apiURL: "https://contract.evm.qa.5ire.network/5ire/verify",
        browserURL: "https://scan.qa.5ire.network",
      },
    }
  ]
  }
};