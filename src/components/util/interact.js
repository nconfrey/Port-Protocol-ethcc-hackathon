import { pinJSONToIPFS } from "./pinata.js";
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contentContract = require("hardhat/artifacts/contracts/PortContent.sol/PortContent.json");
const contentContractABI = contentContract.abi;
const contentContractAddress = "0x583fec0F4edF37950A3545A0D40b0A1D654A8742";
const CONTENT_NFT = "CONTENT"

const licenseContract = require("hardhat/artifacts/contracts/PortLicense.sol/PortLicense.json");
const licenseContractABI = licenseContract.abi;
const licenseContractAddress = "0x509Ad24fe1Ea7d8e261B6C01156a3115bE3D061C";
const LICENSE_NFT = "LICENSE"

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

async function loadContract(type) {
  if (type === CONTENT_NFT) {
    return new web3.eth.Contract(contentContractABI, contentContractAddress);
  } else if (type === LICENSE_NFT) {
    return new web3.eth.Contract(licenseContractABI, licenseContractAddress);
  } else {
    return new web3.eth.Contract(contentContractABI, contentContractAddress);
  }
}

export const mintNFT = async (nftType, url, name, description, originalCreator) => {
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }

  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;
  if (nftType == CONTENT_NFT) {
    metadata.originalCreator = originalCreator;
  }

  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  window.contract = await loadContract(nftType)

  const transactionParameters = {
    to: nftType == CONTENT_NFT ? contentContractAddress : licenseContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    console.log("tx hash: " + txHash)
    return {
      success: true,
      status:
        "✅ Check out your transaction on Polyscan: https://mumbai.polygonscan.com/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
