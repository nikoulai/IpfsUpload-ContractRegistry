# IPFS Upload & Contract Registry

Takes a file as a command line argument uploads a file to IPFS and then stores the CID in a smart contract.

Usage Usage:
```shell
npx ts-node scripts/mainUploadToIPFS.ts ~/Desktop/file.txt
```

The script needs an IPFS api running on localhost:5001 and an Ethereum provider on localhost:8545.
It reads the contract address from contractAddress.json. The address in contractAddress.json is the result of deploying the contract using the scripts/deployContract.ts script.

To run it execute:
```shell
npx hardhat run scripts/deployContract.ts
```
Optionally, when running the uploader you can indicate the IPFS api, the provider and the contract address using the corresponding flags.

```shell
npx ts-node scripts/mainUploadToIPFS.ts ~/Desktop/file.txt --ipfs /ip4/127.0.0.1/tcp/5002 --provider ws://localhost:8545 --contract 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

# Tests

The core functionality of the uploader (except fot argument parser )can be tested using hardhat.
```shell
npx hardhat test
```

# Notes

Ater cloning install dependencies.
```shell
npm install
```
To use smoothly you will need node v17.4.0 and above (Due to ipfs-http-client)

I had an issue using node v17.4.0 regarding opessl. You may need to run:
```shell
export NODE_OPTIONS=--openssl-legacy-provider
```
