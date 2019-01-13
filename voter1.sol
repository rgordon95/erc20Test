pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract Voter {
    uint[] public votes;
    string[] public options;

    constructor(string[] _options) public {
        options = _options; //set passed in options to constructor
        votes.length = options.length; //set number of votes to number of options passed in
    }

    function vote (uint option) public {
        require(0 <= option && option < options.length, "Invalid option");
        votes[option] = votes[option] + 1;
    }

    function getOptions() public view returns (string[]) {
        return options;
    }

    function getVotes() public view returns (uint[]) {
        return votes;
    }

}
