// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "node_modules/@wandevs/message/contracts/app/WmbApp.sol";

contract lockContract is WmbApp {

    uint256 public totalSupply;
    mapping(address => uint256) public balances;

    event coinsLocked(address user, uint256 amount);
    event coinsReleased(address user, uint256 amount);

    event CrossChainMint(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);

    constructor (address _admin, address _wmbGateway) {
        initialize(_admin, _wmbGateway); 
    }
    
    /* Check the balance of a particular account */
    function balanceOf(address user) external view returns(uint256) {
        return balances[user];
    }

    /* Original Function */
    // function _wmbReceive(
    //     bytes calldata data,
    //     bytes32 messageId,
    //     uint256 fromChainId,
    //     address fromSC
    // ) internal override {
    //     (address to, uint256 amount) = abi.decode(data, (address, uint256 ));
        
    //     balances[to] -= amount;
    //     totalSupply -= amount;

    //     /* Transfer the native coins */
    //     (bool success, ) = payable(to).call{value: amount}("");
    //     require(success, "Transfer failed");

    //     emit CrossChainMint(messageId, fromChainId, to, amount, fromSC);
    //     emit coinsReleased(to, amount);
    // }



    function _wmbReceive(
        bytes calldata data,
        bytes32 messageId,
        uint256 fromChainId,
        address fromSC
    ) internal override {
        (address to, uint256 amount) = abi.decode(data, (address, uint256 ));
        _withdraw(to, amount);

        emit CrossChainMint(messageId, fromChainId, to, amount, fromSC);
    }

    function _withdraw(address to, uint256 amount) private {
        require(balances[to] >= amount, "Amount cannot exceed deposited balance");

        balances[to] -= amount;
        payable(to).transfer(amount);
    }

    function lockCoin(
        uint256 toChainId,
        address toSC,
        address toUser,
        uint256 gasLimit
    ) public payable {

        require(msg.value > 0, "Amount must match value sent");
        uint gasFee = estimateFee(toChainId, gasLimit);

        uint256 lockedCoin = msg.value-gasFee;
        require(lockedCoin > 0, "Insufficient funds to lock");

        balances[msg.sender] += lockedCoin;
        totalSupply += lockedCoin;

        _dispatchMessage(toChainId, toSC, abi.encode(toUser, lockedCoin), gasFee);
        emit coinsLocked(msg.sender, msg.value);
    }   
}