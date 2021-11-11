//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IToken is IERC721 {
  function getTokenId() external returns (uint256);

  function mint() external returns (uint256);
}
