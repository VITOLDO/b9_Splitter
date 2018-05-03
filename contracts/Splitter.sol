pragma solidity ^0.4.2;

contract Splitter {
	
	address public owner;

	function Splitter() public {
		owner = msg.sender;
	}

	function readBalance(address) public constant returns(uint balance) {
		return 5;
	}

	function giveSplittedFund() public payable returns(bool success){
		require(msg.value > 0);
		return true;
	}
}