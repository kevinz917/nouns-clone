//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// import { ERC721Checkpointable } from "./base/ERC721Checkpointable.sol"; TODO: Read NounsDAO's contract here
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interface/IToken.sol";

// import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Token is
  ERC721Enumerable,
  IToken // IS THIS THE RIGHT PATTERN LOL
{
  address public minter; // minter

  address public dao; // dao treasury

  uint256 public tokenId; // nft token

  constructor(address _minter, address _dao) ERC721("Kevin's Experiment", "KZ") {
    // transferOwnership(msg.sender);
    minter = _minter;
    dao = _dao;
  }

  function setTokenId(uint256 _tokenId) public {
    tokenId = _tokenId;
  }

  function getTokenId() public view override returns (uint256) {
    return tokenId;
  }

  // mint NFT
  function mint() public override onlyMinter returns (uint256) {
    _mint(dao, tokenId++);
    return tokenId;
  }

  modifier onlyMinter() {
    require(msg.sender == minter, "NOT MINTER");
    _;
  }
}
