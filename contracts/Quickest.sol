//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Quickest is ERC20 {
    IERC20 public QUICK;

    constructor(address QUICKContract) ERC20("Quickest", "QCKT"){
        QUICK = IERC20(QUICKContract);
    }

    function quickToQuickest(uint256 amount) external {
        QUICK.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount * 1000);
    }

    function quickestToQuick(uint256 amount) external {
        _burn(msg.sender, amount);
        QUICK.transfer(msg.sender, amount / 1000);
    }
}