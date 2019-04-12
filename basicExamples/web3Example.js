'esversion: 6';

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


// contract.methods.vote(1) //can pass input params into methods attached to the contract this way

//to actually send the contract use following code

var receipt = await contract.methods.vote(1)
  .send({
    from: senderAddress, //address of Sender 
    gas: 1500000 //max gas to be used
  })
  .then(function(receipt) {
    // "receipt" object contains information about transaction
  })
  // .catch would go here
  ;


//to call a method  (isntead of send)

contract.methods.getVotes()
  .call()
  .then(function(result) {
    console.log('result returned:' + result);
  }) //add .catch here
  ;



//deploying a contract

var Voter = new web3.net.Contract(abi)
var newContract = await Voter
  .deploy({data: bytecode})
  .send({
    from: "0x.......B50", //address from
    gas: 1500000 //gas to be used (max)
  })
  ;
