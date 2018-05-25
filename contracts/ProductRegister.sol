pragma solidity ^0.4.18;

contract ProductRegister
{
    mapping (bytes32 => address) public register;

    function addProduct(bytes32 serialNumber, address addr) public
    {
        // throw when product's serial number is already registered
        require(register[serialNumber] == 0x0);

        register[serialNumber] = addr;
    }

    function getProductAddress(bytes32 serialNumber) view public returns(address)
    {
        return register[serialNumber];
    }
}