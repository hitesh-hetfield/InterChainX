// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// import "../app/lockCoins.sol";
import "node_modules/@wandevs/message/contracts/app/WmbApp.sol";

contract unlockContract is WmbApp {

    uint256 public totalSupply;
    
    mapping(address => uint256) balances; /* store the balances of a user */

    event coinsLocked(address user, uint256 amount); /* Event to confirm the locking of coins */
    // event coinsReleased(address user, uint256 amount); /* Event to release the coins */

    event CrossChainMint(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);

    constructor (address _admin, address _wmbGateway) {
        initialize(_admin, _wmbGateway); 
    }

    /* Helper Functions */

    /* Check the balance of a particular account */
    function balanceOf(address user) external view returns(uint256) {
        return balances[user]; 
    }

    function _wmbReceive(
        bytes calldata data,
        bytes32 messageId,
        uint256 fromChainId,
        address fromSC
    ) internal override {
        (, address to, uint256 amount,) = abi.decode(data, (address, address, uint256, string));

        balances[to] += amount;
        totalSupply += amount;

        emit CrossChainMint(messageId, fromChainId, to, amount, fromSC);
    }
    
    
    
    function crossTo(
        uint256 toChainId,
        address toSC,
        address toUser,
        // uint256 amount,
        uint256 gasLimit
    ) public payable {

        require(msg.value > 0, "Amount must match value sent");
        require(balances[msg.sender] >= msg.value, "Amount to transfer cannot exceed locked amount");

        uint fee = estimateFee(toChainId, gasLimit);
        uint256 lockedCoin = msg.value-fee;

        balances[msg.sender] += lockedCoin;
        totalSupply += lockedCoin;

        _dispatchMessage(toChainId, toSC, abi.encode(toUser, lockedCoin), fee);
        emit coinsLocked(msg.sender, msg.value);
    }   
}
