var Products = artifacts.require("./Product.sol");

module.exports = function(deployer) {
  deployer.deploy(Products, 'continental-desk-x', 'SN-00001', ['A', 'B', 'C'], {gas: 6700000});
};
