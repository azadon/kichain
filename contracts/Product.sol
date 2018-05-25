pragma solidity ^0.4.18;

contract Product {

    string public vendor;

    string public serialNumber;

    bytes32[] public dataSources;

    mapping (bytes32 => string) public data;

    constructor(string vendor_, string serialNumber_, bytes32[] dataSources_) public
    {
        vendor = vendor_;
        serialNumber = serialNumber_;
        dataSources = dataSources_;
    }

    //
    function putData(bytes32 dataSource, string data_) public {
        data[dataSource] = data_;
    }

    function getDataSources()  view public returns (bytes32[]) {
        return dataSources;
    }

    function getData(bytes32 dataSource) view public returns (string) {
        return data[dataSource];
    }
    
}

