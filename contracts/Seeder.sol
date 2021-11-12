//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./interface/ISeeder.sol";

contract Seeder is ISeeder {
  // generate seed data for NFT. this way, the rendering can be separated from the logic here
  function generateSeed() external view override returns (ISeeder.Seed memory) {
    uint256 pseudorandomness = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1))));

    return Seed({ head: uint48(pseudorandomness) % 10, body: uint48(pseudorandomness) & 11 });
  }
}
