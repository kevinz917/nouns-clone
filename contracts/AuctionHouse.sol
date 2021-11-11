//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

// TODO: Add non-reentrant guard
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IToken.sol";

struct Auction {
  address payable bidder;
  uint256 amount;
  uint256 startTime;
  uint256 endTime;
}

contract AuctionHouse is OwnableUpgradeable, PausableUpgradeable {
  IToken public nft; // nft address

  uint256 public tokenId;

  uint256 public auctionDuration;

  mapping(uint256 => Auction) auctions; // tokenId -> Bid

  event Bid(address _bidder, uint256 _amount, uint256 _tokenId);
  event AuctionSettled(uint256 _tokenId, uint256 _amount, address _winner);

  constructor(IToken _nft, uint256 _auctionDuration) {
    __Pausable_init();

    _pause(); // TODO: Remove this?

    nft = _nft;
    auctionDuration = _auctionDuration;
  }

  /**
   * @notice Bid on an NFT
   * @dev This accepts ETH
   */
  function bid() public payable {
    require(auctions[tokenId].amount > msg.value, "BID TOO LOW"); // in NOUNS, the bid must be 2% greater than the previous bid

    Auction memory currentBidEvent = auctions[tokenId];

    address payable _lastBidder = currentBidEvent.bidder;
    if (_lastBidder != address(0)) {
      _lastBidder.transfer(currentBidEvent.amount);
      payable(address(this)).transfer(currentBidEvent.amount);
    }

    currentBidEvent.amount = msg.value;
    currentBidEvent.bidder = payable(msg.sender);

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
    Auction memory _currentBidEvent = auctions[tokenId];
    require(block.timestamp > _currentBidEvent.endTime, "AUCTION NOT ENDED");

    if (_currentBidEvent.bidder == address(0)) {
      // burn
    } else {
      nft.transferFrom(address(this), _currentBidEvent.bidder, tokenId);
    }

    emit AuctionSettled(tokenId, _currentBidEvent.amount, _currentBidEvent.bidder);
  }

  /**
   * @notice Change to new auction
   * @dev This accepts ETH
   */
  function advanceAuction() public whenNotPaused {
    _settleAuction();
    _createAuction();
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
