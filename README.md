# Port Protocol: EthCC 2022 Hackathon

Try out the demo, which [is hosted live here!](https://port-protocol-ethcc-hackathon.vercel.app/feed)

**Smart Contract Architecture**
Contracts were written with [`OpenZepplin`](https://docs.openzeppelin.com/learn/developing-smart-contracts?pref=hardhat) and deployed with `Hardhat`. 

`src/hardhat/PortContent.sol`
**Installation**
1. `yarn install`
2. `yarn start`

### Use of Polygon

We deployed the `PortContent (PORT)` token onto Polygon Mumbai testnet. Find our contract [here](https://mumbai.polygonscan.com/token/0x583fec0f4edf37950a3545a0d40b0a1d654a8742)

- [Deploy on polygon tutorial](https://docs.alchemy.com/alchemy/tutorials/how-to-code-and-deploy-a-polygon-smart-contract)

Resources:
- `npx hardhat run scripts/deploy.js --network polygon_mumbai`

### Use of IPFS

The metadata is pinned to `IPFS` using `Pinata`.

### Use of Alchemy

Alchemy powers our minter and NFT queries.

**Minting**
- Based off of [this boilerplate](https://docs.alchemy.com/alchemy/tutorials/nft-minter)

**NFT Queries**
Leveraged the Alchemy web3 SDK.
- Using `getNFTsForCollection` to fetch all NFTs in a collection, [tutorial](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/how-to-get-all-nfts-in-a-collection)

### Use of Moralis
Moralis is used to provide easy sign-in and wallet APIs.