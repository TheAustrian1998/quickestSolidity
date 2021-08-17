const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Quickest", function () {

  before(async function () {
    this.accounts = await ethers.getSigners();

    this.Quick = await ethers.getContractFactory("Quick");
    this.quick = await this.Quick.deploy(ethers.utils.parseUnits("1000000"));
    await this.quick.deployed();

    this.Quickest = await ethers.getContractFactory("Quickest");
    this.quickest = await this.Quickest.deploy(this.quick.address);
    await this.quickest.deployed();
  });

  it("Should swap QUICK for QUICKEST...", async function () {
    //Approve
    let quantity = "20000";
    let approve = await this.quick.approve(this.quickest.address, ethers.utils.parseUnits(quantity));

    //Quick ->>> Quickest
    let balanceQuickBefore = ethers.utils.formatUnits(await this.quick.balanceOf(this.accounts[0].address));
    let balanceQuickestBefore = ethers.utils.formatUnits(await this.quickest.balanceOf(this.accounts[0].address));
    let quickToQuickest = await this.quickest.quickToQuickest(ethers.utils.parseUnits(quantity));
    let balanceQuickAfter = ethers.utils.formatUnits(await this.quick.balanceOf(this.accounts[0].address));
    let balanceQuickestAfter = ethers.utils.formatUnits(await this.quickest.balanceOf(this.accounts[0].address));

    expect(Number(balanceQuickAfter)).equal(Number(balanceQuickBefore) - Number(quantity));
    expect(Number(balanceQuickestAfter)).equal(Number(balanceQuickestBefore) + (Number(quantity) * 1000));
  });

  it("Should swap QUICKEST for QUICK...", async function () {
    //Quickest ->>> Quick
    let quantity = "20000000";
    let balanceQuickBefore = ethers.utils.formatUnits(await this.quick.balanceOf(this.accounts[0].address));
    let balanceQuickestBefore = ethers.utils.formatUnits(await this.quickest.balanceOf(this.accounts[0].address));
    let quickestToQuick = await this.quickest.quickestToQuick(ethers.utils.parseUnits(quantity));
    let balanceQuickAfter = ethers.utils.formatUnits(await this.quick.balanceOf(this.accounts[0].address));
    let balanceQuickestAfter = ethers.utils.formatUnits(await this.quickest.balanceOf(this.accounts[0].address));

    expect(Number(balanceQuickAfter)).equal(Number(balanceQuickBefore) + (Number(quantity) / 1000));
    expect(Number(balanceQuickestAfter)).equal(Number(balanceQuickestBefore) - Number(quantity));
  });
});