# BCDV_4028_Assignment_01_101504708

Assignment 01 for BCDV 4028 - Advanced Smart Contracts
Anishkumar Pankajkumar Patel
101504708

## dApp Project

This repository contains a decentralized application (dApp) built with Solidity, React, and Hardhat. This dApp allows the original deployer of the contract to mint NFTs and manage minters. Upon minting, the NFT transaction details are listed on the interface.

### Setting Up for Development

1. **Prerequisites**:
   - [Node.js and npm](https://nodejs.org/)
   - [MetaMask](https://metamask.io/download.html) browser extension
   - [Hardhat](https://hardhat.org/getting-started/)
   - A code editor like [VSCode](https://code.visualstudio.com/download)
&nbsp;

2. **Clone the Repository**:
   `git clone [repository_link]`
   `cd [repository_name]`
&nbsp;

3. **Install Dependencies**:
    - For the main project:
    `npm install`
    - For the frontend:
    `cd frontend`
    `npm install`
&nbsp;

4. **Compile and Deploy the Contract:**
    - *Compile and Deploy the Contract:*
      Navigate to the root directory of the project and run:
      `npx hardhat compile`
    - *Deploy the Contract:*
      Run the following command:
      `npx hardhat run scripts/deploy.js --network sepolia`
    Note: My script name is deploy.js and network is sepolia, which you can set and change in hardhat.config.js
&nbsp;

5. **Configure Environment Variables:**
    - Create a .env file in the root directory and another inside the frontend directory. Populate them with the necessary values such as private keys, API keys, etc., following the provided .env.example format.
&nbsp;

6. **Start the Frontend:**
    - Navigate to the frontend directory and run: `npm start`
    This will start the React application on `localhost:3000`.
&nbsp;

### Using the dApp

    - Ensure MetaMask is connected to the correct network and the dApp is running on `localhost:3000`.
    - The original deployer of the contract can mint NFTs using links from Pinata IPFS or any other valid URL.
    - New minters can only be added by the deployer of the contract.
    - Upon minting an NFT, the transaction details will be displayed on the interface.
&nbsp;

### Screenshots

&nbsp;
