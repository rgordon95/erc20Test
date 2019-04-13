var CrowdFundingWithDeadline = artifacts.require("./CrowdFundingWithDeadline.sol");

module.exports = function(deployer) {
  deployer.deploy(
    CrowdFundingWithDeadline, 
    "Test campaign",
    1,
    20,
    "0x1Ed027A94c29c1D5f8C0f065652f7D40F22aF83C"
  );
};