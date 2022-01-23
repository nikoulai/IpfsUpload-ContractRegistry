// import { ethers } from "hardhat";
// import ethers from "@nomiclabs/hardhat-ethers";
// import Web3 from "web3";
const { ethers } = require("hardhat");
import { Contract } from "web3-eth-contract";
import { AbiItem } from 'web3-utils';
import { create, IPFSHTTPClient } from "ipfs-http-client";
import * as fs from "fs";
import * as path from "path";
// import {  } from "ipfs-utils";
import artifact from "../artifacts/contracts/IpfsStorage.sol/IpfsStorage.json";
import contractAddObj from "../contractAddress.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import yargs from "yargs"

const ipfsStorageAbi = artifact.abi;
// const ethers = hre.ethers;

export const ipfsUpload = async (file: string, web3Provider?: string, ipfsApi?: string, contractAddress?: string) => {

	ipfsApi = ipfsApi || "/ip4/127.0.0.1/tcp/5001";
	web3Provider = web3Provider || "ws://localhost:8545";
	contractAddress = contractAddress || contractAddObj.address
	
	const ipfs: IPFSHTTPClient = create({
		url: ipfsApi
	});
	if(!ipfs.isOnline())
		throw new Error(`No running IPFS node at ${ipfsApi}`)
	// const web3: Web3 = new Web3(web3Provider);
	// try{
	// 	await web3.eth.net.isListening()
	// }
   	// catch(e)
	//     {  throw new Error(`Web3 couldn't connect to ${web3Provider}`)};	

	// const contract: Contract = new web3.eth.Contract(ipfsStorageAbi, contractAddress);
	// const [defaultAccount]: string[] = await web3.eth.getAccounts();
	const customHttpProvider = new ethers.providers.JsonRpcProvider(web3Provider);
	let defaultAccount: SignerWithAddress;
	[defaultAccount] = await ethers.getSigners();

      	// const IpfsStorage = await ethers.getContractFactory('IpfsStorage');
      	const IpfsStorage = await new ethers.Contract(contractAddress,ipfsStorageAbi,customHttpProvider);
	const ipfsStorage = await IpfsStorage.attach(contractAddress)
	// let encodedFile: string = fs.readFileSync(file, { encoding: 'base64' });
	// console.log(file)
	let fileContent: Buffer = fs.readFileSync(file);
	const fileDetails = {
		path: path.parse(file).base,
		content: fileContent
	};
	const options = {
		wrapWithDirectory: true,
	}
	
	const cidObj  = await ipfs.add(fileDetails, options);
	const cidStr = cidObj.cid.toString();
	// const cidStr = cid.cid.multihash.digest.

	// let e = await contract.methods.setCID(cidStr).send({ "from": defaultAccount });
	await ipfsStorage.connect(defaultAccount).setCID(cidStr);

	return cidStr;
}
