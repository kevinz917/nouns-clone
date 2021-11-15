import { ethers } from "hardhat";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export enum revertMessages {
  INVALID_PROOF = "Proof is not valid",
  NOT_MINTER = "NOT MINTER",
  NOT_MATURE = "LOCKUP NOT MATURE",
  NFT_IS_STAKED = "NFT_IS_STAKED",
  AUCTION_NOT_ENDED = "AUCTION NOT ENDED",
}

export const increaseBlockchainTimeBySeconds = async (seconds: number) => {
  await ethers.provider.send("evm_increaseTime", [seconds]); // advance time 1 hour
  await ethers.provider.send("evm_mine", []);
};
