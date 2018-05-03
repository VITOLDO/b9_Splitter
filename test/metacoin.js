var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

  var contract;
  var aliceAddress = accounts[1];
  var bobAddress = accounts[2];
  var carolAddress = accounts[3];

  var owner = accounts[0]

  beforeEach(function() {
    return Splitter.new(aliceAddress, bobAddress, carolAddress, {from: owner})
    .then(function(instance) {
      contract = instance;
    });
  });

  it("should just say hello", function() {
      assert.equal(true, true, "Boolean logick isn't working!!!");
  });
  
  it("contract should be owned by owner", function() {
    return contract.owner({from: owner})
    .then(function(_owner){
      assert.strictEqual(_owner, owner, "Contract is not owned by owner");
    });
  }); 

  it("contract should contains exact 3 attendats", function() {
    return contract.readAttendantsCount({from: owner})
    .then(function(count){
      assert.equal(3, count, "There are some new/lost attendants in attendants list.");
    });
  });

  it("should be possible to donate", function() {
    return contract.donateFund({from: aliceAddress, value: 1})
    .then(function(txHash){
      return contract.funds({from: owner})
      .then(function(funds){
        assert.strictEqual('1', funds.toString(10), "Donation was not processed.");
      });
      return contract.readAttendantDonation(aliceAddress, {from: owner})
      .then(function(donation) {
        assert.strictEqual('1', donation.toString(10), "Donation was not equal to previously donated value or was missing.");
      });
    });
  });

  

});
