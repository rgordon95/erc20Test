let fs = require('fs');
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));

let contractAddress = "0x21D5b7bBC9Ee0d627BEb4eF558a20f68e38B4710";
let fromAddress = "0x1Ed027A94c29c1D5f8C0f065652f7D40F22aF83C";

let abiStr = fs.readFileSync('abi.json', 'utf8');
let abi = JSON.parse(abiStr);

let voter = new web3.eth.Contract(abi, contractAddress);

sendTransaction()
    .then(function() {
        console.log("Done");
    })
    .catch(function(error) {
        console.log(error);
    })

async function sendTransaction() {
    console.log("Adding option 'coffee'");
    await voter.methods.addOption("coffee").send({from: fromAddress});

    console.log("Adding option 'tea'");
    await voter.methods.addOption("tea").send({from: fromAddress});

    await voter.methods.startVoting().send({from: fromAddress, gas: 900000});

    console.log("Voting");
    await voter.methods['vote(uint256)'](0).send({from: fromAddress, gas: 900000});

    console.log("Getting votes");
    let votes = await voter.methods.getVotes().call({from: fromAddress});

    console.log(`Votes: ${votes}`)
}