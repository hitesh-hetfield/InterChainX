// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

contract lockCoins {

    uint256 public totalSupply;
    
    mapping(address => uint256) balances; /* store the balances of a user */

    event coinsLocked(address user, uint256 amount); /* Event to confirm the locking of coins */
    event coinsReleased(address user, uint256 amount); /* Event to release the coins */

    /* Lock native coins */
    // function _lockCoin(uint256 amount) public {
    //     // require(amount == msg.value, "Amount must match value sent");

    //     balances[msg.sender] += amount;
    //     totalSupply += amount;

    //     emit coinsLocked(msg.sender, amount);
    // }

    function _lockCoin() public payable {
        require(msg.value > 0, "Amount must match value sent");

        balances[msg.sender] += msg.value;
        totalSupply += msg.value;

        emit coinsLocked(msg.sender, msg.value);
    }

    /* Withdraw coins to be used if coins are locked accidentally */
    function withdrawCoins(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        totalSupply -= amount;
        emit coinsReleased(msg.sender, amount);
    }

    /* Check the balance of a particular account */
    function balanceOf(address user) external view returns(uint256) {
        return balances[user]; 
    }
}