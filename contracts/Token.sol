//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import { ERC721Checkpointable } from "./base/ERC721Checkpointable.sol"; TODO: Read NounsDAO's contract here
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interface/ISeeder.sol";
import "./interface/IToken.sol";
import "hardhat/console.sol"; // REMOVE ALL IN PROD

contract Token is ERC721Enumerable, IToken, Ownable {
  address public minter; // minter

  address public dao; // dao treasury

  uint256 public tokenId; // nft token

  ISeeder public seeder; // seeder contract that generates pseudoranodmness

  mapping(uint256 => ISeeder.Seed) seeds; // tokeID => seed

  mapping(uint256 => Lockup) public lockup; // tokenId => period.

  event Mint(address _recipient, uint256 _tokenId, ISeeder.Seed _seed);

  constructor(
    address _minter,
    address _dao,
    ISeeder _seeder
  ) ERC721("NOUN-CLONE", "NC") {
    minter = _minter;
    dao = _dao;
    seeder = _seeder;
  }

  // stake NFT
  // The longer time you lock up your NFT, the more governance rights you receive during that period of time. Governance right are
  // you are trading liquidity for governance rights
  function stake(uint256 _tokenId, uint256 _period) public onlyNFTOwner(_tokenId) {
    // lock up for certain periods of time
    Lockup memory _newLockup = Lockup({ period: _period, startTime: block.timestamp, isStaked: true });

    lockup[_tokenId] = _newLockup;
  }

  // unstake nft
  function unstake(uint256 _tokenId) public onlyNFTOwner(_tokenId) {
    Lockup memory _lockupTerm = lockup[_tokenId];
    require(block.timestamp > _lockupTerm.startTime + _lockupTerm.period, "LOCKUP NOT MATURE");
    _lockupTerm.isStaked = false;
    lockup[_tokenId] = _lockupTerm;
  }

  // mint NFT
  function mint() public override onlyMinter returns (uint256) {
    return mintTo(dao);
  }

  // before token transfer hook provided by IERC721.sol from OpenZeppelin
  // check whether token is taked or not
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override {
    // TODO: figure out how to checek whether NFT is staked before transfer
  }

  // internal use
  function mintTo(address _recipient) internal onlyMinter returns (uint256) {
    tokenId += 1;
    ISeeder.Seed memory _seed = seeds[tokenId] = seeder.generateSeed(); // generate seed
    _mint(_recipient, tokenId);

    emit Mint(_recipient, tokenId, _seed);
    return tokenId;
  }

  function setMinter(address _minter) public onlyOwner {
    minter = _minter;
  }

  function setDAO(address _dao) public onlyOwner {
    dao = _dao;
  }

  ///////////////////////////
  ////// Modifiers /////////
  ///////////////////////////

  modifier onlyMinter() {
    require(msg.sender == minter, "NOT MINTER");
    _;
  }

  modifier onlyNFTOwner(uint256 _tokenId) {
    require(msg.sender == ownerOf(_tokenId), "NOT OWNER");
    _;
  }

  modifier notStaked(uint256 _tokenId) {
    require(lockup[tokenId].isStaked == false, "NFT IS STAKED");
    _;
  }
}
