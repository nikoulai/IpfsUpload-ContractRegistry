import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { ipfsUpload } from "../scripts/uploadToIPFS";
import { IpfsStorage } from "../typechain";

describe('IPFS File Uploader', function () {

  let defaultAccount: SignerWithAddress;
  let ipfsStorage: Contract;
  let cid: string;

  before(async function () {

      [defaultAccount] = await ethers.getSigners();

      const IpfsStorage = await ethers.getContractFactory('IpfsStorage', defaultAccount);

      ipfsStorage = await IpfsStorage.deploy();

      await ipfsStorage.deployed();

    let cid: string = await ipfsUpload("file.txt");
  });


  it('Test file upload', async function () {

    const filename: string = "file.txt";

	  const cid: string = await ipfsUpload(filename, undefined, undefined, ipfsStorage.address);
    let cidInContr: string = await ipfsStorage.getCID();
    expect(cidInContr).to.equal(cid);
  
  });

});
