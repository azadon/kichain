pragma solidity ^0.4.18;

contract Product {

    bytes32[] public vendor;

    bytes32[] public serialNumber;

    mapping (bytes32[] => bytes32[]) public data;
}

