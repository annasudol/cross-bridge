//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./Token.sol";
pragma solidity ^0.8.9;

contract Bridge {
    using ECDSA for bytes32;
    address immutable public validator;
    uint256 immutable public chainID;
    address immutable public token;
    mapping(bytes32 => bool) redemeed;
    mapping(address => uint) faceded;
                          //from: string, to: string, value: number, chainId: number, symbol: string
    event SwapInitialized(address from, address to, uint256 amount, uint256 nonce, uint256 chainId, string symbol);
    event RedeemInitialized(address from, address to, uint256 amount, uint256 nonce, uint256 chainId, string symbol);

    constructor(address _validator, address _token, uint256 _chainID) {
        validator = _validator;
        chainID = _chainID;
        token = _token;
    }

    mapping(address => bytes) public signatures;

    modifier checkValidERC20(string memory symbol) {
        require(keccak256(abi.encodePacked(Token(token).symbol())) ==
                keccak256(abi.encodePacked(symbol)), "non supported erc20 token");
        _;
    }

    modifier chainIdIsSupported(uint256 _chainId) {
        require(chainID == _chainId, "non supported chain");
        _;
    }

    function facet() public {
        require(faceded[msg.sender] <= (block.timestamp - 1 days), "we can only send facet every 24 hours");
        faceded[msg.sender] = block.timestamp;
        Token(token).mint(msg.sender, 1 ether);
    }

    //Swap(): transfers tokens from sender to the contract
    function swap(address to, uint256 amount, uint256 nonce, uint256 chainId, string memory symbol)
        checkValidERC20(symbol) chainIdIsSupported(chainId) public {
            Token(token).burn(msg.sender, amount);
            emit SwapInitialized(msg.sender, to, amount, nonce, chainId, symbol);
    }

    // takes hashed message and a signature, calls ecrecover to recover the signer and verifies 
    //if the recovered address is the validator address; if yes, transfers tokens to the receiver.
    function redeem(address from, address to, uint256 amount, uint256 nonce, uint256 _chainId, string memory symbol, bytes calldata signature)
        checkValidERC20(symbol) chainIdIsSupported(_chainId) public {

        bytes32 message = keccak256(abi.encodePacked(from, to, amount, nonce, _chainId, symbol));
        require(!redemeed[message], "re-entrance");
        require(_verify(message, signature), "invalid signature");
        redemeed[message]=true;

        Token(token).mint(to, amount);
        emit RedeemInitialized(from, to, amount, nonce, _chainId, symbol);
    }

    function _verify(bytes32 message, bytes calldata signature) internal view returns (bool) {
        return message.toEthSignedMessageHash().recover(signature) == validator;
    }
}