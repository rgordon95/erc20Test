let fs = require('fs');
let Web3 = require('web3');

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let contractAddress = "0xe54f58bA3FD6dEDf84EA7688422A4848d7591E0b";
let fromAddress = "0x718c9e45584859a43ae708d1bff0b64043ef6a35";

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

    await voter.methods.startVoting().send({from: fromAddress, gas: 600000});

    console.log("Voting");
    await voter.methods['vote(uint256)'](0).send({from: fromAddress, gas: 600000});

    console.log("Getting votes");
    let votes = await voter.methods.getVotes().call({from: fromAddress});

    console.log(`Votes: ${votes}`)
}