//this is same as voter1 but prevents duplicate votes from one account 

pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract Voter {
    uint[] public votes;
    string[] public options;
    mapping (address => bool) hasVoted;

    constructor(string[] _options) public {
        options = _options; //set passed in options to constructor
        votes.length = options.length; //set number of votes to number of options passed in
    }

    function vote (uint option) public {
        require(0 <= option && option < options.length, "Invalid option");
        require(!hasVoted[msg.sender], "Account has already voted"); //checks if Voted
        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true; //assigns true to hasVoted of that address
    }

    function getOptions() public view returns (string[]) {
        return options;
    }

    function getVotes() public view returns (uint[]) {
        return votes;
    }

}
