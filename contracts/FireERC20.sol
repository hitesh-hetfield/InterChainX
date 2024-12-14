// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {WmbApp} from "@wandevs/message/contracts/app/WmbApp.sol";

contract FireERC20 is WmbApp, ERC20 {

    uint256 private _totalSupply;

    event CrossChainMint(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);
    event coinsReleased(uint256 indexed toChainId, address indexed to, uint256 amount, address toSC);
   
    constructor(
        string memory _name, 
        string memory _symbol, 
        address _admin, 
        address _wmbGateway
    ) ERC20(_name, _symbol) {
        initialize(_admin, _wmbGateway);
    }

    function totalSupply() public override view returns(uint256) {
        return _totalSupply;
    }

    function _wmbReceive(
        bytes calldata data,
        bytes32 messageId,
        uint256 fromChainId,
        address fromSC
    ) internal override {
        (address to, uint256 amount) = abi.decode(data, (address, uint256));

        _mint(to, amount);
        _totalSupply += amount;
        emit CrossChainMint(messageId, fromChainId, to, amount, fromSC);
    }

    function unlockCoins(
        uint256 toChainId,
        address toSC,
        address toUser,
        uint256 amount,
        uint256 gasLimit
    ) public payable {

        uint gasFee = estimateFee(toChainId, gasLimit);

        _totalSupply -= amount;
        _burn(msg.sender, amount);

        _dispatchMessage(toChainId, toSC, abi.encode(toUser, amount), gasFee);
        emit coinsReleased(toChainId, toUser, amount, toSC);
    }   
}