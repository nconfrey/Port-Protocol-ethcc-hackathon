# Port Protocol: EthCC 2022 Hackathon

Try out the demo, which [is hosted live here!](https://port-protocol-ethcc-hackathon.vercel.app/feed)

**Smart Contract Architecture**

Contracts were written with [`OpenZepplin`](https://docs.openzeppelin.com/learn/developing-smart-contracts?pref=hardhat) and deployed with `Hardhat`. 

`src/hardhat/PortContent.sol`
**Installation**

1. `yarn install`
2. `yarn start`

### Use of Polygon

We wrote 3 Solidity smart contracts for this hackathon and deployed 2 onto Polygon Mumbai testnet.

- The `PortContent (PORT)` token represents a piece of content (image, video, link). Find our contract [here](https://mumbai.polygonscan.com/token/0x583fec0f4edf37950a3545a0d40b0a1d654a8742). It is `PortContent.sol`.
- The `PortLicense (THX)` token represents a license to fairly use a piece of content. Find our contract [here](https://mumbai.polygonscan.com/address/0x509ad24fe1ea7d8e261b6c01156a3115be3d061c). It is `PortLicense.sol`.
- The `Port.sol` contract was written as a possible future extension to manage the payment of royalties when minting licenses, and saving a percentage to the development wallet. 

Resources used while developing:
- [Deploy on polygon tutorial](https://docs.alchemy.com/alchemy/tutorials/how-to-code-and-deploy-a-polygon-smart-contract)
- `npx hardhat run scripts/deploy.js --network polygon_mumbai`

### Use of IPFS

We used `Pinata` and `IPFS` to host our lovely NFT designs.

| Creator  | Curator  | License   |
|---|---|---|
|[IPFS Link](https://gateway.pinata.cloud/ipfs/QmbiTRRffjBTdYVQt3XCqXrBen48fwQm72FCcZuNR4yZWF)  |[IPFS Link](https://gateway.pinata.cloud/ipfs/QmW2Y9Vht1WPUz1HtB6aqgqVC24nMGXHJk23qhhN2FrTQ1)   |[IPFS Link](https://gateway.pinata.cloud/ipfs/QmXXKNeJrigru7C41hBoobz8igsjmqUe6Ch2jMSUeigFoj)   |
|<img src="https://gateway.pinata.cloud/ipfs/QmbiTRRffjBTdYVQt3XCqXrBen48fwQm72FCcZuNR4yZWF" width=200/> |<img src="https://gateway.pinata.cloud/ipfs/QmW2Y9Vht1WPUz1HtB6aqgqVC24nMGXHJk23qhhN2FrTQ1" width=200/>  |<img src="https://gateway.pinata.cloud/ipfs/QmXXKNeJrigru7C41hBoobz8igsjmqUe6Ch2jMSUeigFoj" width=200/>  |

Additionally, the metadata JSON is pinned to `IPFS` using `Pinata`. See the helper function `pinJSONToIPFS` which uses `axios` to accomplish the network fetch as well as bundling our Pinata api keys.

### Use of Alchemy

Alchemy powers our minter and NFT queries.

**Minting**
- Based off of [this boilerplate](https://docs.alchemy.com/alchemy/tutorials/nft-minter)

**NFT Queries**
Leveraged the Alchemy web3 SDK.
- Using `getNFTsForCollection` to fetch all NFTs in a collection, [tutorial](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/how-to-get-all-nfts-in-a-collection)

### Use of Moralis
Moralis is used to provide easy sign-in and wallet APIs.
