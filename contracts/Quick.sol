//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Quick is ERC20 {
    constructor(uint256 initSupply) ERC20("Quick", "QUICK"){
        _mint(msg.sender, initSupply);
    }
}