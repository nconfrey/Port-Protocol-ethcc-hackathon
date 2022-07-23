import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";
import { Image, Checkbox, Tooltip, Modal, Input, Alert, Spin, Button } from "antd";
import Text from "antd/lib/typography/Text";
const { TextArea } = Input;

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [originalCreator, setOriginalCreator] = useState(false);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  const styles = {
    h2: {
      display: "flex",
      fontFamily: "Albert+Sans, sans-serif",
      fontWeight: "400",
      fontSize: "32px",
      color: "#041836",
      paddingTop: "10px",
    },
    label: {
      display: "flex",
      fontFamily: "Albert+Sans, sans-serif",
      fontWeight: "normal",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#041836",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    subtitle: {
      display: "flex",
      fontFamily: "Albert+Sans, sans-serif",
      fontWeight: "light",
      fontSize: "16px",
      color: "#041836",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
    checkbox: {
      paddingTop: "10px",
      paddingBottom: "10px",
      fontFamily: "Albert+Sans, sans-serif",
      fontWeight: "normal",
      fontSize: "16px",
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const onMintPressed = async () => {
    const { success, status } = await mintNFT("CREATOR_NFT",
      url,
      name,
      description,
      originalCreator);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
    }
  };

  const checkboxChecked = (e) => {
    setOriginalCreator(e.target.checked)
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="Minter">
      <Text style={styles.h2}>Mint an Item</Text>
      <Text style={styles.subtitle}>Add any image, video, website, or link.</Text>
      <form>
        <Text style={styles.label}>Link to asset</Text>
        <Input
          type="text"
          placeholder="https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <Text style={styles.label}>Item Name</Text>
        <Input
          type="text"
          placeholder="My first croissant"
          onChange={(event) => setName(event.target.value)}
        />
        <Text style={styles.label}>Describe the item</Text>
        <TextArea
          rows={4}
          type="text"
          placeholder="I made this cool GIF"
          onChange={(event) => setDescription(event.target.value)}
        />
        <Checkbox style={styles.checkbox} onChange={checkboxChecked}>I certify I am the original creator</Checkbox>
      </form>
      <Button
        outline
        size="large"
        type="primary"
        onClick={onMintPressed}
        style={{
          width: "100%",
          marginTop: "20px",
          borderRadius: "0.5rem",
          fontSize: "16px",
          fontWeight: "500",
          alignSelf: "center",
          color: "#3A4662",
          backgroundColor: "#FFCD26"
        }}
      >
        Mint NFT
      </Button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
