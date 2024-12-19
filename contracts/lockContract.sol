// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {WmbApp} from "@wandevs/message/contracts/app/WmbApp.sol";

contract lockContract is WmbApp {

    uint256 public totalSupply;
    mapping(address => uint256) private _balances;

    event Unlocked(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);
    event Locked(uint256 indexed toChainId, address indexed to, uint256 amount, address toSC);

    constructor (address _admin, address _wmbGateway) {
        initialize(_admin, _wmbGateway); 
    }

    /* Check the balance of a particular account */
    function balanceOf(address user) public view returns(uint256) {
        return _balances[user];
    }

    function _wmbReceive(
        bytes calldata data,
        bytes32 messageId,
        uint256 fromChainId,
        address fromSC
    ) internal override {
        (address to, uint256 amount) = abi.decode(data, (address, uint256 ));
        // Withdraw the amount from the contract to the user
        _withdraw(to, amount);
        emit Unlocked(messageId, fromChainId, to, amount, fromSC);
    }

    function _withdraw(address to, uint256 amount) private {

        require(_balances[to] >= amount, "Amount cannot exceed deposited balance");
        _balances[to] -= amount;
        totalSupply -= amount;
        payable(to).transfer(amount);

    }

    function lockCoin(
        uint256 toChainId,
        address toSC,
        address toUser,
        uint256 amount,
        uint256 gasLimit
    ) public payable {
        uint gasFee = estimateFee(toChainId, gasLimit);
        require(msg.value >= amount + uint256(gasFee), "Not enough amount to lock");

        _balances[msg.sender] += amount;
        totalSupply += amount;

        _dispatchMessage(toChainId, toSC, abi.encode(toUser, amount), gasFee);
        emit Locked(toChainId, toUser, amount, toSC);
    }
}