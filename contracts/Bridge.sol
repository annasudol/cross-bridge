// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./TokenErc20.sol";
import "hardhat/console.sol";

contract Bridge {
    using ECDSA for bytes32;
    address immutable public validator;
    uint256 immutable public chainID;
    address immutable public token;

    event SwapInitialized(address from, address to, uint256 amount, uint256 nonce, uint256 chainId, string symbol);
    event RedeemInitialized(address from, address to, uint256 amount, uint256 nonce, uint256 chainId, string symbol);

    constructor(address _validator, address _token, uint256 _chainID) {
        validator = _validator;
        chainID = _chainID;
        token = _token;
    }

    mapping(address => bytes) public signatures;

    modifier checkValidERC20(string memory symbol) {
        require(keccak256(abi.encodePacked(TokenErc20(token).symbol())) ==
                keccak256(abi.encodePacked(symbol)), "non supported erc20 token");
        _;
    }

    modifier chainIdIsSupported(uint256 _chainId) {
        require(chainID == _chainId, "non supported chain");
        _;
    }

    //Swap(): transfers tokens from sender to the contract
    function swap(address to, uint256 amount, uint256 nonce, uint256 chainId, string memory symbol)
        checkValidERC20(symbol) chainIdIsSupported(chainId) public {
            TokenErc20(token).burn(msg.sender, amount);
            emit SwapInitialized(msg.sender, to, amount, nonce, chainId, symbol);
    }

    // takes hashed message and a signature, calls ecrecover to recover the signer and verifies 
    //if the recovered address is the validator address; if yes, transfers tokens to the receiver.
    function redeem(address from, address to, uint256 amount, uint256 nonce, uint256 _chainId, string memory symbol, bytes calldata _signature) 
        checkValidERC20(symbol) chainIdIsSupported(_chainId) public {
        bytes memory signature = signatures[msg.sender];
        require(keccak256(abi.encodePacked(signature)) != keccak256(abi.encodePacked(_signature)), "no re-entrance");

        bytes32 message = keccak256(abi.encodePacked(from, to, amount, nonce, _chainId, symbol));

        require(_verify(message, _signature), "invalid signature");
        signatures[msg.sender] = _signature;
        TokenErc20(token).mint(to, amount);
        emit RedeemInitialized(from, to, amount, nonce, _chainId, symbol);
    }

    function _verify(bytes32 message, bytes calldata signature) internal view returns (bool) {
        return message.toEthSignedMessageHash().recover(signature) == validator;
    }
}