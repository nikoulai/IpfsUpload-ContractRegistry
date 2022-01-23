// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const fileName: string = "../contractAddress.json"
// import addressObject from  
const file = require(fileName);
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const IpfsStorage = await ethers.getContractFactory("IpfsStorage");
  const ipfsStorage = await IpfsStorage.deploy();

  await ipfsStorage.deployed();

  // console.log(JSON.stringify(file))
  console.log("IpfsStorage deployed to:", ipfsStorage.address);
  file.address = ipfsStorage.address;

  console.log(JSON.stringify(file))
  fs.writeFile(fileName,JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    // console.log(JSON.stringify(file));
    // console.log('writing to ' + fileName);
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
