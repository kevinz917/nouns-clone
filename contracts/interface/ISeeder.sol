//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

interface ISeeder {
  struct Seed {
    uint48 head;
    uint48 body;
  }

  function generateSeed() external returns (Seed memory);
}
