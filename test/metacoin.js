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
    return contract.donateFund({from: aliceAddress, value: web3.toWei(1, 'ether')})
    .then(function(txHash){
      return contract.attendants(1, {from: owner})
      .then(function(attendant) {
        assert.equal(bobAddress, attendant[0], "It's not bob's address");
        assert.strictEqual('100.5', web3.fromWei(web3.eth.getBalance(attendant[0]).toString(10), 'ether'), 
                           "Donation was not splitted from previous donation or missing.");
      });
    });
  });



});
