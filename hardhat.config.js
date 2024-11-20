/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { wanchainTestnet } = require("viem/chains");

account_pvt_key = process.env.PVT_KEY !== undefined ? [process.env.PVT_KEY] : []

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
      accounts: account_pvt_key
    },
    wanchainTestnet: {
      url: wanchainTestnet.rpcUrls.default.http[0],
      accounts: process.env.PVT_KEY_1 !== undefined ? [process.env.PVT_KEY_1] : [],
      gasPrice: 1e9,
      gas: 6e6,
    },
    bsepolia: {
      url: "https://sepolia.base.org/",
      chainId: 84532,
      accounts: ["c8b995a4ddd4fe8db064ab664f3f9dfc7e7de7d17d2d1be3edba29a5cc84960f"]
    }
  },
  etherscan: {
    apiKey: {
      thunder: process.env.API_KEY !== undefined ? [process.env.API_KEY] : [],
      qa: process.env.API_KEY !== undefined ? [process.env.API_KEY] : [],
      bsepolia: "CGQJ1G91H1ZYZHYMDNGKPZVYKYSBAG8BXA"
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
      //   network: "qa",
      //     chainId: 997,
      //     urls: {
      //       apiURL: "https://contract.evm.qa.5ire.network/5ire/verify",
      //     browserURL: "https://qa.5ire.network"
      //     }
      //   },
        {
          network: "bsepolia",
          chainId: 84532,
          urls: {
            apiURL: "https://api-sepolia.basescan.org/api",
            browserURL: "https://sepolia.basescan.org/"
          }
        }
    ]
  }
};