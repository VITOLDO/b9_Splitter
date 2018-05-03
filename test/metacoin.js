var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {

  var contract;

  beforeEach(function() {
    return Splitter.new({from: accounts[0]})
    .then(function(instance) {
      contract = instance;
    })
  })

  it("should just say hello", function() {
      assert.equal(true, true, "Boolean logick isn't working!!!");
  });
  
});
