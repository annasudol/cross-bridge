// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Token is ERC20, AccessControl {
    bytes32 public constant AUTHORIZED_ROLE = keccak256("AUTHORIZED_ROLE");

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, initialSupply * (10**uint256(18)));
    }

    modifier onlyAutorized() {
        require(hasRole(AUTHORIZED_ROLE, msg.sender), "not authorized");
        _;
    }

    function mint(address to, uint256 amount) onlyAutorized public {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) onlyAutorized public {
        _burn(from, amount);
    }
}
