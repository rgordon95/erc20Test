let Web3 = require("web3"); //import web3
let web3 = new Web3(); //new web3 instance

web3.setProvider( //set provi0der of new instance
  new web3.providers.HttpProvider( //define http port for geth
    "http://localhost:8545" //geth port
));


//to access contact instance
var abi = readJsonFile("abi.json"); //read returned abi json
var contractAddress = "0x.."; //address the contract should use
var contract = new web3.eth.Contract(abi, contractAddress); //new contract instance with the returned abi.json and address to use (defined above)
