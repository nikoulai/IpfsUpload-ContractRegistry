//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
// import "hardhat/console.sol";


contract IpfsStorage {

    string private ipfsCID;

    function getCID() external view returns (string memory) {
        // console.log("con",ipfsCID);
        return ipfsCID;
    }

    function setCID(string memory _cid) public {
        // console.logString(_cid);
        ipfsCID = _cid;
        // console.logString(ipfsCID);
    }
}

  