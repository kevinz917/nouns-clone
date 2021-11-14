//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import { ERC721Checkpointable } from "./base/ERC721Checkpointable.sol"; TODO: Read NounsDAO's contract here
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./interface/ISeeder.sol";
import "./interface/IToken.sol";

contract Token is
  ERC721Enumerable,
  IToken // IS THIS THE RIGHT PATTERN LOL
{
  address public minter; // minter

  address public dao; // dao treasury

  uint256 public tokenId; // nft token

  ISeeder public seeder; // seeder contract that generates pseudoranodmness

  mapping(uint256 => ISeeder.Seed) seeds; // tokeID => seed

  mapping(uint256 => bool) public staked; // whether NFT is staked

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
  // what does staking do?
  function stake(uint256 _tokenId) public onlyNFTOwner(_tokenId) {
    staked[_tokenId] = true;
  }

  // unstake nft
  function unstake(uint256 _tokenId) public onlyNFTOwner(_tokenId) {
    staked[_tokenId] = false;
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
    require(staked[tokenId] == false, "NFT STAKED");
  }

  // internal use
  function mintTo(address _recipient) internal onlyMinter returns (uint256) {
    // generate seed
    tokenId += 1;
    ISeeder.Seed memory _seed = seeds[tokenId] = seeder.generateSeed();
    _mint(_recipient, tokenId);

    emit Mint(_recipient, tokenId, _seed);
    return tokenId;
  }

  modifier onlyMinter() {
    require(msg.sender == minter, "NOT MINTER");
    _;
  }

  modifier onlyNFTOwner(uint256 _tokenId) {
    require(msg.sender == ownerOf(_tokenId), "NOT OWNER");
    _;
  }
}
