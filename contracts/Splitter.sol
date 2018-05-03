pragma solidity ^0.4.2;

contract Splitter {
	
	address public owner;

	uint public funds;

	struct SplitterAttendant {
    	address account;
    	uint balance;
  	}

  	SplitterAttendant[] public attendants;

  	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter(address _aliceAdd, 
					  address _bobAdd, 
					  address _carolAdd) 
		public 	
	{
		owner = msg.sender;
		attendants.push(SplitterAttendant(_aliceAdd, 0));
		attendants.push(SplitterAttendant(_bobAdd, 0));
		attendants.push(SplitterAttendant(_carolAdd, 0));
	}

	function donateFund() 
		public 
		payable 
		returns(bool success)
	{
		require(msg.value > 0);

		uint numberOfAttendants = attendants.length;
		require(numberOfAttendants == 3); // To be removed when sender can chose whom to split donation

		for(uint i = 0; i < numberOfAttendants; i++) {
			SplitterAttendant memory iteratedAttendant = attendants[i];
			if (msg.sender != iteratedAttendant.account) { // possible place to chose whom to donate instead of just not me
				require(iteratedAttendant.account.send(msg.value / 2));
			}
		}
		return true;
	}



	function readAttendantsCount()
		public
		constant
		returns(uint count)
	{
		return attendants.length; // maybe some other way to find this out
	}
}