/*jshint esversion: 6 */

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

let contract = compileContract();
let web3 = createWeb3();
const sender = '0x64A5e683Ded36aaAfd87e441fa230Ed0E6a55788'; //need to replace with real address (this is a test address for rinkeby)

deployContract(web3, contract, sender)
  .then(function () {
    console.log('Deployment finished');
  })
  .catch(function (error) {
    console.log(`deployment FAILED with error: ${error}`);
  });

//within this the contract gets selected for compiling, compiled + optimized
  function compileContract() {
    let compilerInput = {
      language: 'Solidity',
      sources: {//defines what to pass into solc for compiling
      'Voter': {
         content: fs.readFileSync('Voter.sol', 'utf8')
       } //reads file using fs
    },
    settings: {
      outputSelection: {
        '*': {
          '*': [ '*' ]
        }
      }
    }
  };
    console.log('Compiling the contract');
    //compile and optimize the contract
    let output = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    //Get compiled contract
    console.log(output);
    let contract = output.sources.Voter
    console.log('contrttarct' + contract);
    //voter contract (name of contract within file): // Voter file (filename of contract)

    // Save contract's ABI
    let abi = contract.abi;
    fs.writeFileSync('abi.json', JSON.stringify(contract)); //writes abi.json using fs module

    return contract; //returns selected contract in optimized and compiled form (contract.abi as json)

  } //end compileContract

  function createWeb3() {
    //create an instance of a web3 class & specify provider it should use (geth port)
    let web3 = new Web3();
    web3.setProvider(
        new web3.providers.HttpProvider('http://localhost:7545'));

    return web3; //return new web3 instance
  } //end createWeb3

// takes web3 instance created above, the contract and senders address
async function deployContract(web3, contract, sender) {
  let VoterContract = new web3.eth.Contract(contract.abi); //parses generated contract into JSON & creates new contract instance for deployment
  let bytecode = '0x' + contract.evm.bytecode.object; //add prefix for bytecode
  let gasEstimate = await web3.eth.estimateGas({data: bytecode}); //built in method to determine likely gas requirement

  console.log('Deploying the contract....');
  const contractInstance = await VoterContract.deploy({ //deploy bytecode locally
    data: bytecode
  })
  .send({ //send the deployed contract to network from sender with gasEstimate attached
    from: sender,
    gas: gasEstimate
  })
  .on('transactionHash', function(transactionHash) {
    console.log(`Transaction hash: ${transactionHash}`);
  })
  .on('confirmation', function(confirmationNumber, receipt) {
    console.log(`confirmation number: ${confirmationNumber}`);
  });

  console.log(`contract address: ${contractInstance.options.address}`); //returns address of contract to allow interaction with it after it is deployed
} //end deployContract
