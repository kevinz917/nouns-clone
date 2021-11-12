//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/// @title Interface for auction house

interface IAuctionHouse {
  function bid() external payable;
}
