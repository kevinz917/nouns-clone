// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { expect } from "chai";
// import { ethers as Ethers } from "ethers";
// import { ethers, upgrades } from "hardhat";
// import { revertMessages, increaseBlockchainTimeBySeconds } from "./helper";

// describe("ERC721 Token", () => {
//   let nft: Ethers.Contract;
//   let seeder: Ethers.Contract;
//   let addr1: SignerWithAddress;
//   let addr2: SignerWithAddress;
//   let addr3: SignerWithAddress;

//   let dao: SignerWithAddress;
//   let LOCKUP_PERIOD_1 = 10; // denominated in days (?)

//   before(async () => {
//     [addr1, addr2, addr3] = await ethers.getSigners();
//     dao = addr1;
//     seeder = await (await ethers.getContractFactory("Seeder")).deploy(); // nft contract
//     nft = await (await ethers.getContractFactory("Token")).deploy(addr1.address, dao.address, seeder.address); // seeder contract
//   });

//   it("Minting", async () => {
//     await nft.connect(addr1.address).mint(); // mint nft
//     expect(await nft.balanceOf(addr1.address)).to.be.equal(1);
//     await nft.connect(addr1).stake(1, LOCKUP_PERIOD_1); // stake nft

//     const _lockup = await nft.connect(addr1).lockup(1);
//     expect(_lockup.isStaked).equals(true);
//     expect(_lockup.period).equals(LOCKUP_PERIOD_1);
//     await expect(nft.connect(addr1).unstake(1)).to.be.revertedWith(revertMessages.NOT_MATURE); // attempt failed unstake before lockup maturity
//     // await expect(nft.connect(addr1).transferFrom(addr1.address, addr2.address, 1)).to.be.revertedWith(revertMessages.NFT_IS_STAKED);

//     await increaseBlockchainTimeBySeconds(10000);

//     await nft.connect(addr1).unstake(1);
//     const _lockup_after_stake = await nft.connect(addr1).lockup(1);
//     expect(_lockup_after_stake.isStaked).equals(false);
//   });
// });
