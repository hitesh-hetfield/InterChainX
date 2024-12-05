// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Example {

    string private text;
    uint256[] private numbers;

    constructor() {
        text = "Test string";
        numbers = [0,1,2,3,4,5,6];
    }

    // Function to return a dynamic array and a string
    function getStuff() public view returns (uint[] memory, string memory) {
        return(numbers, text);
    }
}



// contract inputArray {
    
//     uint256[] private numberArray;
//     // address private deployerAddress;
//     string private hello; 

//     constructor() {
//         numberArray = [0,1,2,3,4,5,6,7,8,9];
//         hello = "Test String";
//         // deployerAddress = msg.sender;
//     }

//     function availableNumbers() public view returns(uint256[] memory) {
//         return numberArray;
//     }

//     function availableString() public view returns(string memory) {
//         return hello;
//     }


//     // function inputHere(uint256 amount, address anyAddress) public view returns(bool success) {

//     //     for(uint i; i < numberArray.length; i++){
//     //         if(amount == numberArray[i] && anyAddress == deployerAddress){
//     //             return true;
//     //         }
//     //     }
//     //     return false;
//     // }
// }