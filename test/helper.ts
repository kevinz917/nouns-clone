import { Token } from "./../typechain-types/Token";
import { Seeder } from "./../typechain-types/Seeder";
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

export const deploySeeder = async (): Promise<Seeder> => {
  const _contract: any = await (await ethers.getContractFactory("Seeder")).deploy();
  return _contract;
};

export const deployNFTToken = async (_minter: string, _dao: string, _seeder: string): Promise<Token> => {
  const _contract: any = await (await ethers.getContractFactory("Token")).deploy(_minter, _dao, _seeder);
  return _contract;
};
