import { AuctionHouse, Token, Seeder } from "./../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers as Ethers } from "ethers";
import { ethers, upgrades } from "hardhat";
import { revertMessages, increaseBlockchainTimeBySeconds, ZERO_ADDRESS, deploySeeder, deployNFTToken } from "./helper";

describe("Auction Test", () => {
  let auctionHouse: AuctionHouse;
  let nft: Token;
  let seeder: Seeder;
  let addr1: SignerWithAddress;
  let bidder1: SignerWithAddress;
  let bidder2: SignerWithAddress;

  let dao: any;

  const AUCTION_DURATION = 60 * 60 * 24;

  // TODO: Look into typechain
  async function deploy(deployer: SignerWithAddress) {
    const auctionHouseFactory = await ethers.getContractFactory("AuctionHouse", deployer);
    return upgrades.deployProxy(auctionHouseFactory, [nft.address, AUCTION_DURATION]) as Promise<AuctionHouse>;
  }

  before(async () => {
    [addr1, bidder1, bidder2] = await ethers.getSigners();
    dao = addr1;
    seeder = await deploySeeder();
    nft = await deployNFTToken(addr1.address, dao.address, seeder.address);
    auctionHouse = await deploy(addr1);
    await nft.setMinter(auctionHouse.address); // change minter to auctionHouse contract
    await nft.setDAO(auctionHouse.address);
    const tx = await auctionHouse.connect(addr1).initiateAuctionHouse(); // initiate the perpetual auction. mints first nft

    const receipt = await tx.wait();
    const { timestamp } = await ethers.provider.getBlock(receipt.blockHash);

    const createdEvent = receipt.events?.find((e) => e.event === "AuctionCreated"); // check auction emitted event data
    expect(createdEvent?.args?._tokenId).to.equal(1);
    expect(createdEvent?.args?._startTime).to.equal(timestamp);
    expect(createdEvent?.args?._endTime).to.equal(timestamp + AUCTION_DURATION);

    expect(await auctionHouse.auctionDuration()).to.be.equal(AUCTION_DURATION);
    expect(await auctionHouse.nft()).to.be.equal(nft.address);
    expect(await nft.balanceOf(auctionHouse.address)).to.be.equal(1);
    expect(await auctionHouse.tokenId()).to.be.equal(1);

    const _currentAuction = await auctionHouse.auctions(1);
    expect(_currentAuction.bidder).equal(ZERO_ADDRESS);
  });

  it("Bid", async () => {
    await auctionHouse.connect(bidder1).bid({ value: 1000 }); // first bid
    const _currentAuction = await auctionHouse.auctions(1);
    expect(_currentAuction.bidder).equals(bidder1.address);
    expect(_currentAuction.amount).equals(1000);
  });

  it("Settle auction", async () => {
    await expect(auctionHouse.advanceAuction()).to.be.revertedWith(revertMessages.AUCTION_NOT_ENDED);

    increaseBlockchainTimeBySeconds(AUCTION_DURATION * 2);

    await auctionHouse.advanceAuction();
    expect(await nft.balanceOf(bidder1.address)).to.be.equal(1);
    expect(await auctionHouse.tokenId()).to.be.equal(2);
  });

  // await expect(tx)
  //     .to.emit(nounsAuctionHouse, 'AuctionBid')
  //     .withArgs(nounId, bidderA.address, RESERVE_PRICE, false);
});
