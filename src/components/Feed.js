import { Card, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState, useEffect } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
const { initializeAlchemy, getNftsForCollection, Network } = require('@alch/alchemy-sdk');
const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1240px",
    gap: "10px",
  },
};

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const settings = {
  apiKey: "UTZE0H7a1loHKekkfBsDahPbsajT3QdP",
  network: Network.MATIC_MUMBAI
};
const contractAddress = "0x583fec0f4edf37950a3545a0d40b0a1d654a8742";
const alchemy = initializeAlchemy(settings);

const Feed = (props) => {
  const [feedNFTs, setFeedNFTs] = useState(null);
  const [visible, setVisibility] = useState(false);
  const [nftToExpand, setExpandInfo] = useState(null);
  const [status, setStatus] = useState("");
  const { initializeAlchemy, getNftsForCollection, Network } = require('@alch/alchemy-sdk');

  useEffect(() => {
    async function fetchData() {
      console.log("fetching nfts")
      const response = await getNftsForCollection(alchemy, contractAddress, { withMetadata: true })
      //console.log(JSON.stringify(response, null, 2))
      console.log(response)
      setFeedNFTs(response)
    }
    fetchData();
  }, []);

  const handleExpandInfo = (nft) => {
    setExpandInfo(nft);
    setVisibility(true);
  };

  async function mintLicenseFrom(nft) {
    console.log(nft)
    const title = "License for Port item #" + nft.tokenId + " named " + nft.title
    const description = "Original asset: " + nft.rawMetadata.image
    const { success, status } = await mintNFT("LICENSE",
      "https://gateway.pinata.cloud/ipfs/QmXXKNeJrigru7C41hBoobz8igsjmqUe6Ch2jMSUeigFoj",
      title,
      description,
      false);
    setStatus(status);
  }

  return (
    <div style={styles.NFTs}>
      {feedNFTs &&
        feedNFTs.nfts.map((nft, index) => (
          <div onClick={() => handleExpandInfo(nft)}>
          <Card
            hoverable
            bordered={false}
            style={{
              width: 300,
              height: 450,
              backgroundColor: "transparent"
            }}
            cover={
              nft.rawMetadata.image?.indexOf(".jpg") != -1 ||
                nft.rawMetadata.image?.indexOf(".png") != -1 ||
                nft.rawMetadata.image?.indexOf(".jpeg") != -1 ||
                nft.rawMetadata.image?.indexOf(".gif") != -1 ||
                nft.rawMetadata.image?.indexOf("ipfs") != -1
                ?
                <Image
                  preview={false}
                  src={nft.rawMetadata.image || "error"}
                  fallback="data:image/png;base64,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"
                  alt=""
                  style={{ height: "300px", width: "300px" }}
                />
                : <Image
                  preview={false}
                  src={nft.rawMetadata.originalCreator === true ? "https://gateway.pinata.cloud/ipfs/QmbiTRRffjBTdYVQt3XCqXrBen48fwQm72FCcZuNR4yZWF"
                    : "https://gateway.pinata.cloud/ipfs/QmW2Y9Vht1WPUz1HtB6aqgqVC24nMGXHJk23qhhN2FrTQ1"
                  }
                  style={{ height: "300px", width: "300px" }}
                />
            }
            key={index}
          >
            <Meta 
            title={nft.title} 
            description={"Minted on: " + nft.timeLastUpdated.substring(0, 10)}
            style={{
              textAlign: "center",
              justifyContent: "center"
            }} />
          </Card>
          </div>
        ))}
      <Modal
        title={`${nftToExpand?.rawMetadata.name}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => mintLicenseFrom(nftToExpand)}
        okText="Use"
        footer={[
          <Button onClick={() => setVisibility(false)}>
            Cancel
          </Button>,
          <Button onClick={() => mintLicenseFrom(nftToExpand)} type="primary">
            Use
          </Button>,
          <Button onClick={() => mintLicenseFrom(nftToExpand)} type="primary">
            Claim
          </Button>,
          <p id="status" style={{ color: "red" }}>
            {status}
          </p>
        ]}
      >
        <img
          src={`${nftToExpand?.rawMetadata.image}`}
          style={{
            width: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
        <Text>{nftToExpand?.rawMetadata.description}</Text>
        <br />
        <a href={nftToExpand?.rawMetadata.image} target="_blank">Link to asset</a> 
      </Modal>
    </div>
  );
}

export default Feed;