pragma solidity ^0.5.0;

import "truffle/Assert.sol"; // import Assert from truffle
import "../contracts/Voter.sol"; // import contract you wish to test

contract TestVoter {
    function testVoteForAnOptionUsingNumericIndex() public {
        Voter voter = new Voter();
        voter.addOption("one");
        voter.addOption("two");
        voter.startVoting();

        voter.vote(0);
        uint[] memory votes = voter.getVotes();
        uint[] memory expected = new uint[](2);
        expected[0] = 1; // will fail currently if you change this number from 1 to 0 or 2 
        expected[1] = 0;
        Assert.equal(votes, expected, "First option should be voted for");
    }
}