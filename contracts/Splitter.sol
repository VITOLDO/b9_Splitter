pragma solidity ^0.4.2;

contract Splitter {
	
	address public owner;

	uint public funds;

	struct SplitterAttendant {
    	address account;
    	uint donated;
    	uint balance;
  	}

  	SplitterAttendant[] public attendants;

	function Splitter(address _aliceAdd, 
					  address _bobAdd, 
					  address _carolAdd) 
		public 	
	{
		owner = msg.sender;
		attendants.push(SplitterAttendant(_aliceAdd, 0, 0));
		attendants.push(SplitterAttendant(_bobAdd, 0, 0));
		attendants.push(SplitterAttendant(_carolAdd, 0, 0));
	}

	function donateFund() 
		public 
		payable 
		returns(bool success)
	{
		require(msg.value > 0);

		funds += msg.value;

		uint numberOfAttendats = attendants.length;
		for(uint i = 0; i < numberOfAttendats; i++) {
			findAttendant(msg.sender).donated += msg.value;
		}
		return true;
	}

	function readAttendantsCount()
		public
		constant
		returns(uint count)
	{
		return attendants.length;
	}

	function readAttendantDonation(address attendant)
		public
		constant
		returns(uint count)
	{
		return findAttendant(attendant).donated;
	}

	function findAttendant(address attendant)
		internal
		constant
		returns(SplitterAttendant resultAttendant)
	{
		uint numberOfAttendats = attendants.length;
		for(uint i = 0; i < numberOfAttendats; i++) {
			SplitterAttendant memory iteratedAttendant = attendants[i];
			if (attendant == iteratedAttendant.account) {
				return iteratedAttendant;
			}
		}
	}
}