'esversion: 6';
let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');

let contract = compileCotnract();
let web3 = createWeb3();
let sender = '0x...';

deployContract(web3, contract, sender)
  .then(function () {
    console.log('Deployment finished');
  })
  .catch(function (error) {
    console.log(`deployment FAILED with error: ${error}`);
  })

  function compileContract() { //within this the contract gets selected for compiling, compiled + optimized
    let compilerInput = { //defines what to pass into solc for compiling
      'Voter': fs.readFileSync('Voter.sol', 'utf-8')
    };

    console.log('Compiling the contract');
    //compile and optimize the contract
    let compiledContract = solc.compile({sources: compilerInput}, 1);

  } //end compuleContract

  function createWeb3() {

  } //end createWeb3

async function deployContract(web3, contract, sender) {

} //end deployContract
