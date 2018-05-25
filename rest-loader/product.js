Web3 = require('web3')
solc = require('solc')
fs = require('fs')

function createProductContract() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
	code = fs.readFileSync('contracts/Product.sol').toString()
	compiledCode = solc.compile(code)
	console.log(compiledCode.contracts)
	abiDefinition = JSON.parse(compiledCode.contracts[':Product'].interface)
	ProductContract = web3.eth.contract(abiDefinition)
}

function getProductInstance(address) {
	ProductContract = createProductContract()
	contractInstance = ProductContract.at(address)
	return contractInstance
}

exports.createContract = function(params) {
	console.log(params)
	ProductContract = createProductContract()
	byteCode = compiledCode.contracts[':Product'].bytecode
	deployedContract = ProductContract.new(params.vendor, 
					        params.serialNumber, 
							params.sourcesList, 
						{	data: byteCode, 
							from: web3.eth.accounts[0], 
							gas: 4700000})
	contractInstance = ProductContract.at(deployedContract.address)
	console.log('Deployed contract for', vendor, serialNumber, 'address:', deployedContract.address)
	result = {}
	result.address = deployedContract.address
	return result
}

exports.addData = function(params) {
	console.log(params)
	product = getProductInstance(params.address)
	product.putData(params.source, params.data)
}

exports.getData = function(params) {
	console.log(params)
	product = getProductInstance(params.address)
	return product.getData(params.source)
}
