//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IToken is IERC721 {
  struct Lockup {
    uint256 period;
    uint256 startTime;
    bool isStaked;
  }

  function mint() external returns (uint256);
}
