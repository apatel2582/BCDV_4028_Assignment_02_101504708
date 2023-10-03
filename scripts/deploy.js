// scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the contract factory
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
  
    // Deploy the contract
    const nftMarket = await NFTMarket.deploy();
    await nftMarket.deployed();
  
    console.log("NFTMarket deployed to:", nftMarket.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  