const { initializeAlchemy, 
  getNftsForCollection, Network } = require('@alch/alchemy-sdk');
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const settings = {
  apiKey: "UTZE0H7a1loHKekkfBsDahPbsajT3QdP",
  network: Network.MATIC_MUMBAI
};
const contractAddress = "0x583fec0f4edf37950a3545a0d40b0a1d654a8742";
const alchemy = initializeAlchemy(settings);

const Feed = (props) => {
  const getNFTFeed = async () => {
    console.log("fetching nfts")
    const response = await getNftsForCollection(alchemy, contractAddress, { withMetadata: true })
    console.log(JSON.stringify(response, null, 2))
  };

  getNFTFeed()

  return (
    <div className="Feed">
      
    </div>
  );
}

export default Feed;