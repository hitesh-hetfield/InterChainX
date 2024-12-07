// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "node_modules/@wandevs/message/contracts/app/WmbApp.sol";

contract lockContract is WmbApp {

    uint256 public totalSupply;
    mapping(address => uint256) private _balances;

    event coinsReleased(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);
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
        _withdraw(to, amount);

        emit coinsReleased(messageId, fromChainId, to, amount, fromSC);
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
        uint256 gasLimit
    ) public payable {

        require(msg.value > 0, "Amount to lock cannot be negative");
        uint gasFee = estimateFee(toChainId, gasLimit);

        uint256 lockedCoin = msg.value-gasFee;
        require(lockedCoin > 0, "Insufficient funds to lock");

        _balances[msg.sender] += lockedCoin;
        totalSupply += lockedCoin;

        _dispatchMessage(toChainId, toSC, abi.encode(toUser, lockedCoin), gasFee);
        emit Locked(toChainId, toUser, lockedCoin, toSC);
    }
}