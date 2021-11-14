import { expect } from "chai";
import { ethers as Ethers } from "ethers";
import { ethers } from "hardhat";
import { revertMessages } from "./helper";

describe("ERC721 Token", () => {
  let nft: Ethers.Contract;
  let seeder: Ethers.Contract;
  let addr1: any;
  let addr2: any;
  let addr3: any;

  let dao: any;

  before(async () => {
    [addr1, addr2, addr3] = await ethers.getSigners();
    dao = addr1;
    seeder = await (await ethers.getContractFactory("Seeder")).deploy(); // nft contract
    nft = await (await ethers.getContractFactory("Token")).deploy(addr1.address, dao.address, seeder.address); // seeder contract
  });

  it("Minting", async () => {
    await nft.connect(addr1).mint(); // mint nft
    expect(await nft.balanceOf(addr1.address)).to.be.equal(1);
    await nft.connect(addr1).stake(1); // stake nft
    expect(await nft.staked(1)).to.be.equal(true);

    // await nft.connect(addr2).mint();
    // expect(await nft.balanceOf(addr2.address)).to.be.equal(1);
    // expect(await nft.connect(addr2).stake(1)).to.be.revertedWith(revertMessages.NOT_MINTER); // stake wrong nft
  });
});
