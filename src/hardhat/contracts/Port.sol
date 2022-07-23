// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Port is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _nftsSold;
  Counters.Counter private _nftCount;
  uint256 public LISTING_FEE = 0.0001 ether;
  address payable private _marketOwner;
  mapping(uint256 => NFT) private _idToNFT;
  struct NFT {
    address nftContract;
    uint256 tokenId;
    address payable creator;
    address payable user;
    uint256 price;
    bool listed;
  }
  event LicenseCreated(
    address nftContract,
    uint256 tokenId,
    address creator,
    address user,
    uint256 price
  );

  string licenseImageURL;

  function setLicenseImageURL(string newURL) public {
    licenseImageURL = newURL;
  }

  function readLicenseImageURL() public view returns (string) {
    return licenseImageURL;
  }

  constructor(string _licenseImageURL) {
    _marketOwner = payable(msg.sender);
    licenseImageURL = _licenseImageURL
  }

  // Create license from NFT
  function createLicense(address _nftContract, uint256 _tokenId) public payable nonReentrant {
    NFT storage nft = _idToNFT[_tokenId];
    require(msg.value >= nft.price, "Not enough ether to cover asking price");

    address payable buyer = payable(msg.sender);
    payable(nft.seller).transfer(msg.value);
    IERC721(_nftContract).transferFrom(address(this), buyer, nft.tokenId);
    _marketOwner.transfer(LICENSE_FEE);
    nft.owner = buyer;
    nft.listed = false;

    _nftsSold.increment();
    emit LicenseCreated(_nftContract, nft.tokenId, nft.seller, buyer, msg.value);
  }

  function getLicenseFee() public view returns (uint256) {
    return LISTING_FEE;
  }
}