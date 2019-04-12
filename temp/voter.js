let Voter = artifacts.require('./Voter.sol');
// most tests have similar pattern
// 1) create contract
// 2) interact with it
// 3) verify state is what you expected

// reference the contract by name
contract('Voter', function(accounts) {

    let voter;
    let firstAccount;

    //use beforeEach to prevent duplicated code
    beforeEach(async function() {
        firstAccount = accounts[0];
        voter = await Voter.new(); // create new instance of your contract in beforeEach so each test runs independently
        await setOptions(firstAccount, ['coffee', 'tea'])
    });

    it('has no votes by default', async function() {
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([0, 0]);
    });

    it('can vote with a string option', async function() {
        await voter.methods['vote(string)']('coffee', {from: firstAccount});
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    it('can vote with a number option', async function() {
        await voter.methods['vote(uint256)'](0, {from: firstAccount});
        let votes = await voter.getVotes.call({from: firstAccount});

        expect(toNumbers(votes)).to.deep.equal([1, 0]);
    });

    const ERROR_MSG = 'Returned error: VM Exception while processing transaction: revert Voting has already started -- Reason given: Voting has already started.';

    it('cannot vote twice from the same contract', async function() {
        try {
            let firstAccount = accounts[0];
            await setOptions(firstAccount, ['one', 'two'])

            await voter.methods['vote(uint256)'](0, {from: firstAccount});
            await voter.methods['vote(uint256)'](0, {from: firstAccount});
        } catch (error) {
            expect(error.message).to.equal(ERROR_MSG);
        }
    });

    async function setOptions(account, options) {
        for (pos in options) {
            await voter.addOption(options[pos], {from: account});
        }
        await voter.startVoting({from: account, gas: 600000});
    }

    function toNumbers(bigNumbers) {
        return bigNumbers.map(function(bigNumber) {
            return bigNumber.toNumber()
        })
    }
});


// other notes:
// this file uses "expect" style assertions from Chai, but you can use any of your choice
// if unfamiliar with expect style assertions view below example (unrelated to this file)
/*
    let num 1 + 1; // this is what you are testing below
    expect(num).to.equal(2); // this will pass 
    expect(num).to.equal(3); // this will fail    
    expect(num).to.equal(11); // this will fail
    expect(num).to.equal(42); // this will fail

 */
// web3.js does not use normal JavaScript numbers, but BigNumbers, so for web3 the below will fail:
/*
    var num = await contract.getNum.call({from: accounts[0]});

    expect(num).to.equal(1); // this fails
    
    // the below would pass
    expect(num).to.deep.equal(
        Contract.web3.toBigNumber(1);
    );
    
    // this also would pass and is much more straightforward
    expect(num.toNumber()).to.equal(1);
*/