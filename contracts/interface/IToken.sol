//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IToken is IERC721 {
  function mint() external returns (uint256);
}
