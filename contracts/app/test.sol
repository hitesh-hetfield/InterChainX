//SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Test {

    mapping(address => uint256) public balances;

    function deposit() payable public {
        require(msg.value > 0, "Amount to deposit should be more than 0");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] > amount, "Amount to withdraw cannot exceed available balance");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount); 
    }
}