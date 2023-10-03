// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, // Sepolia network URL
      accounts: [process.env.PRIVATE_KEY], // Replace with your wallet's private key
    }
  }
};
