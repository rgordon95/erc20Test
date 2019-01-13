//same as voter2 but allows selection by name rather than index of voting choices

pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

contract Voter {

    struct OptionPos {
        uint pos;
        bool exists; //specifies if the option exists
    }

    uint[] public votes;
    string[] public options;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) posOfOption;

    constructor(string[] _options) public {
        options = _options; //set passed in options to constructor
        votes.length = options.length; //set number of votes to number of options passed in

        for (uint i = 0; i < options.length; i++) {
            OptionPos memory optionPos = OptionPos(i, true);
            string storage optionName = options[i]; //storage declared but not needed to be
            posOfOption[optionName] = optionPos;
        }
    }

    function vote (uint option) public {
        require(0 <= option && option < options.length, "Invalid option");
        require(!hasVoted[msg.sender], "Account has already voted"); //checks if Voted

        votes[option] = votes[option] + 1;
        hasVoted[msg.sender] = true; //assigns true to hasVoted of that address
    }

    function vote(string optionName) public {
        require(!hasVoted[msg.sender], "Acciybt gas akreadt voted"); //checks if voted

        OptionPos memory optionPos = posOfOption[optionName];
        require(optionPos.exists, "Option does not exist"); //checks if valid option was passed

        votes[optionPos.pos] = votes[optionPos.pos] + 1;
        hasVoted[msg.sender] = true; //sets address vote status to voted/true

    }

    function getOptions() public view returns (string[]) {
        return options;
    }

    function getVotes() public view returns (uint[]) {
        return votes;
    }
}
