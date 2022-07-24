# Port Protocol: EthCC 2022 Hackathon

![port-9mb-gif](https://user-images.githubusercontent.com/15101296/180642613-eb1ea839-a6e7-477e-b799-6e82ee95a419.gif)

Try out the demo, which [is hosted live here!](https://port-protocol-ethcc-hackathon.vercel.app/feed)

### Problem

Current methods of harvesting data for machine learning models is exploitive to creators, because there is no way to compensate them for their work.

To [quote this tweet](https://twitter.com/Carnage4Life/status/1550775142220935169?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed&ref_url=notion%3A%2F%2Fwww.notion.so%2Fseamcontact%2FDevPost-Submission-75f4b71bc1b44685ba212e177c9d2242), "People’s source code and art is feed into these machines then turned into a paid service without these original creators even agreeing to this let alone getting compensated."

Read more about the problem and story in our devpost submission.

### Solution

image

Port Protocol assembles content datasets on-chain so that they can be used with fair creative attribution and compensation. 

Content is minted into the `PortContent` NFT, which holds a link (stored either in a web3 decentralized service or from an existing web2 repository) to any file type of content (images, gifs, source code, music). The minter is either a 1) the creator or 2) a curator, represented by the `originalCreator` boolean in the NFT metadata.

Once the content is on-chain, then anyone can mint a `PortLicense` NFT of that content to fairly use it. In this way, correct usage is trustlessly provable: if the creation was used online, and the license NFT is in the users wallet, then it was fairly compensated for its use. The inverse is also possible to prove: the user is not fairly compensating the creator if they do not have the license in their wallet. 

## Implementation

We wrote 3 smart contracts in Solidity (`Port.sol`, `PortContent.sol`, and `PortLicense.sol`) to handle the NFTs for the content, licensing, and distribution of royalties. As this was the first time I ever deployed a contract, I'm proud of how they turned out! The contracts were developed using helpful documentation from Polygon and Truffle/Infura. 
    
Additionally, we also created a full stack dapp (affectionately referred to as "Porthole") to view and browse the content created using the Port Protocol, and also to mint new content and new licenses. The Dapp was written in React and powered by the Alchemy APIs, Metamask login, and IPFS/Pinata.

**Installation**

1. `yarn install`
2. `yarn start`

### Smart Contract Architecture

Contracts were written with [`OpenZepplin`](https://docs.openzeppelin.com/learn/developing-smart-contracts?pref=hardhat) and deployed with `Hardhat`. 

`src/hardhat/PortContent.sol`
- `npx hardhat run scripts/deploy.js --network polygon_mumbai`

### Use of Polygon

We wrote 3 Solidity smart contracts for this hackathon and deployed 2 onto Polygon Mumbai testnet.

- The `PortContent (PORT)` token represents a piece of content (image, video, link). Find our contract [here](https://mumbai.polygonscan.com/token/0x583fec0f4edf37950a3545a0d40b0a1d654a8742). It is `PortContent.sol`.
- The `PortLicense (THX)` token represents a license to fairly use a piece of content. Find our contract [here](https://mumbai.polygonscan.com/address/0x509ad24fe1ea7d8e261b6c01156a3115be3d061c). It is `PortLicense.sol`.
- The `Port.sol` contract was written as a possible future extension to manage the payment of royalties when minting licenses, and saving a percentage to the development wallet. 

Resources used while developing:
- [Deploy on polygon tutorial](https://docs.alchemy.com/alchemy/tutorials/how-to-code-and-deploy-a-polygon-smart-contract)

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
