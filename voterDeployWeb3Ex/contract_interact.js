let fs = require('fs');
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let contractAddress = "0xb5Ee2Cc586614b627FeBAf423D97DD823B1ddEF8";
let fromAddress = "0x892fb75cac75ded84bd13e02b3962fcca2730b8d";

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