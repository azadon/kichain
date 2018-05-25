Web3 = require('web3')
solc = require('solc')
fs = require('fs')

// await sleep trick
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function createProductContract() {
	console.log('Compilation of product contract...')
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
	code = fs.readFileSync('../contracts/Product.sol').toString()
	compiledCode = solc.compile(code)
	abiDefinition = JSON.parse(compiledCode.contracts[':Product'].interface)
	ProductContract = web3.eth.contract(abiDefinition)
	return ProductContract
}

function getProductInstance(address) {
	ProductContract = createProductContract()
	contractInstance = ProductContract.at(address)
	return contractInstance
}

exports.createContract = async function(params) {
	var result = {}
	try {
		console.log('Creating product contract...')
		console.log(params.vendor)
		console.log('Compilation of product contract...')
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
		code = fs.readFileSync('../contracts/Product.sol').toString()
		compiledCode = solc.compile(code)
		abiDefinition = JSON.parse(compiledCode.contracts[':Product'].interface)
		ProductContract = web3.eth.contract(abiDefinition)
		byteCode = compiledCode.contracts[':Product'].bytecode
		console.log('Deploying product contract... ')
		deployedContract = ProductContract.new(params.vendor, params.serialNumber, JSON.parse(params.sourcesList),
							{	data: byteCode, 
								from: web3.eth.accounts[0], 
								gas: 4700000})
		let receipt = undefined
		while (true) {
  		  receipt = web3.eth.getTransactionReceipt(deployedContract.transactionHash);
		  if (receipt && receipt.contractAddress) {
		      break;
		    }
		    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
		    await sleep(4000)
		  }
		console.log('Deployed ')
		console.log('Deployed contract for', params.vendor, params.serialNumber, 'address:', receipt.contractAddress)
		result.address = receipt.contractAddress
		console.log('Result: ', result)
	}
	catch(err)
	{
		console.log('Error in contract deployment.')
		console.log(err)
	}
	return result
}

exports.addData = function(params) {
	try {
	    console.log("Add new data")	
        console.log(params)
		product = getProductInstance(params.address)
		product.putData(params.source, params.data)
	}
	catch(err)
	{
	    console.log(err)
	}
}

exports.getData = function(params) {
	try {
		console.log("Get data")	
		console.log(params)
		product = getProductInstance(params.address)
		return product.getData(params.source)
	}
	catch(err)
	{
	    console.log(err)
	}
}
