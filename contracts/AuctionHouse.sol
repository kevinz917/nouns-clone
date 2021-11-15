//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// TODO: Add non-reentrant guard
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IAuctionHouse.sol";
import "./interface/IToken.sol";
import "hardhat/console.sol"; // REMOVE ALL IN PROD

struct Auction {
  address payable bidder;
  uint256 amount;
  uint256 startTime;
  uint256 endTime;
}

contract AuctionHouse is IAuctionHouse, OwnableUpgradeable, PausableUpgradeable, ReentrancyGuardUpgradeable {
  IToken public nft; // nft token address

  uint256 public tokenId;

  uint256 public auctionDuration;

  mapping(uint256 => Auction) public auctions; // tokenId -> Bid

  event Bid(address _bidder, uint256 _amount, uint256 _tokenId);
  event AuctionSettled(uint256 _tokenId, uint256 _amount, address _winner);

  function initialize(IToken _nft, uint256 _auctionDuration) external initializer {
    __ReentrancyGuard_init();
    __Pausable_init();
    __Ownable_init();

    _pause(); // TODO: Remove this?

    nft = _nft;
    auctionDuration = _auctionDuration;
  }

  // Admin sets duration
  function setAuctionDuration(uint256 _duration) public onlyOwner {
    auctionDuration = _duration;
  }

  // used only once to initiate auction
  function initiateAuctionHouse() public onlyOwner {
    _unpause();
    _createAuction();
  }

  /**
   * @notice Bid on an NFT
   * @dev This accepts ETH
   */
  function bid() public payable override nonReentrant {
    require(msg.value > auctions[tokenId].amount, "BID TOO LOW"); // in NOUNS, the bid must be 2% greater than the previous bid
    require(nft.balanceOf(msg.sender) == 0, "CAN ONLY OWN 1"); // player can't own more than 1 noun

    Auction memory currentBidEvent = auctions[tokenId];

    address payable _lastBidder = currentBidEvent.bidder;
    if (_lastBidder != address(0)) {
      _lastBidder.transfer(currentBidEvent.amount);
    }

    auctions[tokenId].bidder = payable(msg.sender);
    auctions[tokenId].amount = msg.value;

    // extend auction for 5 minutes
    bool extended = currentBidEvent.endTime - block.timestamp < 15 * 600;
    if (extended) {
      auctions[tokenId].endTime += 60 * 5;
    }

    emit Bid(msg.sender, msg.value, tokenId);
  }

  /**
   * @notice Creates next round of auction
   * @dev This accepts ETH
   */
  function _createAuction() internal {
    try nft.mint() returns (uint256 _tokenId) {
      tokenId = _tokenId;

      Auction memory _newAuction = Auction({ bidder: payable(address(0)), amount: 0, startTime: block.timestamp, endTime: block.timestamp + auctionDuration }); // initiate new auction

      auctions[tokenId] = _newAuction;
    } catch Error(string memory) {
      _pause();
    }
  }

  /**
   * @notice Settles last round of auction
   * @dev This accepts ETH
   */
  function _settleAuction() internal {
    Auction memory _currentAuction = auctions[tokenId];

    require(_currentAuction.startTime != 0, "AUCTION HASN'T STARTED"); // Can't settle an un-started auction
    require(block.timestamp >= _currentAuction.endTime, "AUCTION NOT ENDED");

    if (_currentAuction.bidder == address(0)) {
      // burn nft
    } else {
      nft.transferFrom(address(this), _currentAuction.bidder, tokenId);
    }

    emit AuctionSettled(tokenId, _currentAuction.amount, _currentAuction.bidder);
  }

  /**
   * @notice Advance auction to next auction
   */
  function advanceAuction() public whenNotPaused nonReentrant {
    _settleAuction();
    _createAuction();
  }

  /**
     * @notice Settles the current auction. Probably used during emergency?
     * @dev This function can only be called when the contract is paused.
     Does this mean anyone can settle an auction?
     */
  function settleAuction() public nonReentrant whenPaused {
    _settleAuction();
  }

  // // This was ripped off from NounsDAO. TODO: Study this
  // /**
  //  * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH. Why?
  //  */
  // function _safeTransferETHWithFallback(address to, uint256 amount) internal {
  //   if (!_safeTransferETH(to, amount)) {
  //     IWETH(weth).deposit{ value: amount }();
  //     IERC20(weth).transfer(to, amount);
  //   }
  // }

  // /**
  //  * @notice Transfer ETH and return the success status.
  //  * @dev This function only forwards 30,000 gas to the callee.
  //  */
  // function _safeTransferETH(address to, uint256 value) internal returns (bool) {
  //   (bool success, ) = to.call{ value: value, gas: 30_000 }(new bytes(0));
  //   return success;
  // }
}
