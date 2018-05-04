pragma solidity ^0.4.2;

contract Splitter {
	
	address public owner;

	mapping(address=>uint) public balances;

  	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter() 
		public 	
	{
		owner = msg.sender;
	}

	function donateFund(address split1, address split2) 
		public 
		payable 
		returns(bool success)
	{
		require(msg.value > 0);

		uint ammountToSend = msg.value / 2;

		if (msg.value % 2 != 0) {
			balances[msg.sender] += 1; // give back if it's odd number
		}

		balances[split1] += ammountToSend;
		balances[split2] += ammountToSend;

		return true;
	}

	function withdrawMyFunds() 
		public
	{
		Transfer(this, msg.sender, balances[msg.sender]);
		balances[msg.sender] = 0;
		msg.sender.transfer(balances[msg.sender]);
	}
}