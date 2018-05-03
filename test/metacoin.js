var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

  var contract;
  var aliceAddress = accounts[1];
  var bobAddress = accounts[2];
  var carolAddress = accounts[3];

  var owner = accounts[0]

  beforeEach(function() {
    return Splitter.new({from: owner})
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

  it("should be possible to donate", function() {
    return contract.donateFund(bobAddress, carolAddress, {from: aliceAddress, value: web3.toWei(1, 'ether')})
    .then(function(txHash){
        return contract.balances(bobAddress, {from: bobAddress})
        .then (function(toWithdraw){
          assert.strictEqual(toWithdraw.toString(10), web3.toWei(0.5, 'ether'), "Donation was not splitted from previous donation or missing.");
        });
    });
  });



});
