var Products = artifacts.require("./Product.sol");

module.exports = function(deployer) {
  deployer.deploy(Products, 'SomeVendor', 'SN-00001', ['A', 'B', 'C'], {gas: 6700000});
};
