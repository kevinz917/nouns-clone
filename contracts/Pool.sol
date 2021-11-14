//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import { ReentrancyGuardUpgradeable } from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "./interface/IToken.sol";

contract Pool is PausableUpgradeable, ReentrancyGuardUpgradeable {
  IToken nft; // nft token address

  constructor(IToken _nft) {
    nft = _nft;
  }
}
