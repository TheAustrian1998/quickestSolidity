const { ethers } = require("hardhat");

async function main() {
  await hre.run("compile");

  let quickAddress = '';

  const Quickest = await ethers.getContractFactory("Quickest");
  const quickest = await Quickest.deploy(quickAddress);
  await quickest.deployed();

  console.log("Deployed to:", quickest.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});