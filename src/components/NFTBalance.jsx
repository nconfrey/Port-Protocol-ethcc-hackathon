import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import { useNFTBalance } from "hooks/useNFTBalance";
import { FileSearchOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import Text from "antd/lib/typography/Text";
import { NavLink } from "react-router-dom";
import gif from "../assets/mint-now.gif"

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

function NFTBalance() {
  const { NFTBalance, fetchSuccess } = useNFTBalance();
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const { Moralis } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [nftToExpand, setExpandInfo] = useState(null);
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const contractABIJson = contractABI//JSON.parse(contractABI);
  const listItemFunction = "createMarketItem";
  const ItemImage = Moralis.Object.extend("ItemImages");

  const handleExpandInfo = (nft) => {
    setExpandInfo(nft);
    setVisibility(true);
  };

  function addItemImage() {
    const itemImage = new ItemImage();

    itemImage.set("image", nftToExpand.image);
    itemImage.set("nftContract", nftToExpand.token_address);
    itemImage.set("tokenId", nftToExpand.token_id);
    itemImage.set("name", nftToExpand.name);

    itemImage.save();
  }
  console.log(NFTBalance)

  // empty state
  if (NFTBalance.length === 0) {
    console.log("empty state")
    return (
      <div style={{
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        display: "flex",
        flexDirection: "column"
      }}>
        <img src={gif} style={{
          width: "50%%",
          height: "50%",
        }} />
        <Text style={{
          display: "flex",
          fontFamily: "Albert+Sans, sans-serif",
          fontWeight: "400",
          fontSize: "32px",
          color: "#041836",
          padding: "10px",
        }}> None of your stuff is on chain yet!</Text>
        <NavLink to="/mint">
          <Button
            size="large"
            type="primary"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "0.5rem",
              fontSize: "16px",
              fontWeight: "500",
              alignSelf: "center"
            }}
          >
            Start minting!
          </Button>
        </NavLink>
      </div>
    )
  }

  return (
    <>
      <div style={styles.NFTs}>
        {contractABIJson.noContractDeployed && (
          <>
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {!fetchSuccess && (
          <>
            <Alert
              message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
              type="warning"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {NFTBalance &&
          NFTBalance.map((nft, index) => (
            <div onClick={() => handleExpandInfo(nft)}>
              <Card
                hoverable
                bordered={false}
                style={{
                  width: 300,
                  height: 450
                }}
                cover={
                  nft.image.indexOf(".jpg") != -1 ||
                    nft.image.indexOf(".png") != -1 ||
                    nft.image.indexOf(".jpeg") != -1 ||
                    nft.image.indexOf(".gif") != -1 ||
                    nft.image.indexOf("ipfs") != -1
                    ?
                    <Image
                      preview={false}
                      src={nft?.image || "error"}
                      fallback="data:image/png;base64,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"
                      alt=""
                      style={{ height: "300px", width: "300px" }}
                    />
                    : <Image
                      preview={false}
                      src={nft.metadata?.originalCreator === true ? "https://gateway.pinata.cloud/ipfs/QmbiTRRffjBTdYVQt3XCqXrBen48fwQm72FCcZuNR4yZWF"
                        : "https://gateway.pinata.cloud/ipfs/QmW2Y9Vht1WPUz1HtB6aqgqVC24nMGXHJk23qhhN2FrTQ1"
                      }
                      style={{ height: "300px", width: "300px" }}
                    />
                }
                key={index}
              >
                <Meta
                  title={nft.metadata.name}
                  description={"Minted on: " + nft.last_metadata_sync}
                  style={{
                    textAlign: "center",
                    justifyContent: "center"
                  }} />
              </Card>
            </div>
          ))}
      </div>

      <Modal
        title={`${nftToExpand?.metadata?.name}`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => setVisibility(false)}
        okText="Done"
        footer={[
          <Button onClick={() => setVisibility(false)}>
            Cancel
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <img
            src={`${nftToExpand?.image}`}
            style={{
              width: "250px",
              margin: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          <Text>{nftToExpand?.metadata.description}</Text>
        <br />
        <a href={nftToExpand?.image} target="_blank">Link to asset</a> 
        </Spin>
      </Modal>
    </>
  );
}

export default NFTBalance;
