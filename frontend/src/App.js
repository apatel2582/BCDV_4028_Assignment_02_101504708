import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Hardcoded contract address
const CONTRACT_ADDRESS = "0xD0b9145a3467797fA007f3A026B68b41892039AD";
const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [tokenURI, setTokenURI] = useState("");
  const [tokenIds, setTokenIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [abi, setAbi] = useState(null); // Declare state variable for ABI here
  const [minterAddress, setMinterAddress] = useState(""); // to store the address input
  const [mintTransactions, setMintTransactions] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");

  const loadBlockchainData = async () => {
    try {
      if (!abi) {
        throw new Error("ABI is not loaded");
      }
      setLoading(true);
      setError("");
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("signer", signer);
        const address = await signer.getAddress();
        console.log("address", address);
        setWalletAddress(address);
        console.log("walletAddress", walletAddress);
        setAccount(await signer.getAddress());
  
        // Now that you have the ABI, you can initialize the contract
        const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        setContract(nftContract);
  
        // Here you can fetch other data related to the contract, for example:
        const tokens = await nftContract.getTokensOfOwner(await signer.getAddress()) || [];
        console.log("Token: - ",tokens);
        setTokenIds(tokens);
        // Fetch minting transactions
        // const mintTxns = await fetchMintingTransactions(account, provider, CONTRACT_ADDRESS);
        // console.log(mintTxns);
        // setMintTransactions(mintTxns);
        console.log("account", account);
        console.log("CONTRACT_ADDRESS", CONTRACT_ADDRESS);
        const tokenTransfers = await fetchTokenTransfers(address, CONTRACT_ADDRESS);
        console.log("Token Transfers: - ", tokenTransfers);
        setMintTransactions(tokenTransfers);
 
      } else {
        throw new Error("MetaMask not found. Please install MetaMask extension.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; 

  const fetchTokenTransfers = async (account, contractAddress) => {
    const response = await fetch(
      `https://api-sepolia.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${contractAddress}&address=${account}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`
    );
    const data = await response.json();
    console.log("data = ", data);
    console.log("data.result = ", data.result);
    return data.result;
  };

  const addMinter = async () => {
      try {
          if (!contract) {
              throw new Error("Contract is not loaded");
          }
          setLoading(true);
          await contract.grantMinterRole(minterAddress);
          alert("Minter role granted successfully!"); // or handle this in a more elegant way
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    // Fetch the ABI on component mount
    fetch("NFTMarket.json")
      .then((response) => response.json())
      .then((data) => {
        setAbi(data.abi); // Set the ABI here
        loadBlockchainData(); // You can call this function here after setting the ABI
      })
      .catch((err) => console.error("Error fetching ABI: ", err));
  }, []);
  
  useEffect(() => {
    if (abi) {
      loadBlockchainData();
    }
  }, [abi]);

  const mintNFT = async () => {
    try {
      if (!contract) {
        throw new Error("Contract is not loaded");
      }
      setLoading(true);
      const newTokenId = await contract.createToken(tokenURI);
      setTokenIds([...tokenIds, newTokenId]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <>
                <div>
                    <input
                        type="text"
                        placeholder="Enter Token URI"
                        onChange={(e) => setTokenURI(e.target.value)}
                    />
                    <button onClick={mintNFT} disabled={!contract}>Mint NFT</button>
                    
                    {/* Add Minter Section */}
                    {account && ( // Check if the account is loaded; further validation can be added if needed
                        <div>
                            <input 
                                type="text" 
                                placeholder="Enter Ethereum Address to grant Minter role" 
                                value={minterAddress}
                                onChange={(e) => setMinterAddress(e.target.value)} 
                            />
                            <button onClick={addMinter}>Add Minter</button>
                        </div>
                    )}

                </div>
                <div>
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <>
                            <p></p>
                            <div>Account: {account}</div>
                            <div> 
                            <p></p>
                            </div>
                            <div>
                                Tokens & Transactions of the Wallet Address: {account}
                                {mintTransactions.map((txn, index) => (
                                    <div key={index}>
                                      <p></p>
                                        Transaction Hash: {txn.hash}
                                        Token ID: {txn.tokenID}
                                        From: {txn.from}
                                        To: {txn.to}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </>
        )}
    </div>
  );
}

export default App;
