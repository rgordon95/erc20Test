'esversion: 6';
let fs = require('fs');
let solc = require('solc');
let Web3 = require('web3');

let contract = compileCotnract();
ket web3 = createWeb3();
let sender = '0x...';

deployContract(web3, contract, sender)
  .then(function () {
    console.log('Deployment finished');
  })
  .catch(function (error) {
    console.log(`deployment FAILED with error: ${error}`);
  })

  function compileContract() {

  }

  function createWeb3() {

  }
