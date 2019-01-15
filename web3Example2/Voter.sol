pragma solidity ^0.4.0;

//this file is very similar to voter3 but does not use features that were experimental in 0.4.x
//changes are not providing list of options in the constructor and
// instead calling addOption and startVoting methods (startVoting has the old constructor function from before)


contract Voter {

    struct OptionPos {
        uint pos;
        bool exists;
    }

    uint[] public votes;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) posOfOption;
    string[] public options;
    bool votingStarted;

    function addOption(string option) public {
      require(!votingStarted);
      options.push(option);
    }

    function startVoting() public {
      require(!votingStarted);
      votes.length = options.length;

      for (uint i = 0; i < options.length; i++) {
        OptionPos memory option = OptionPos(i, true);
        posOfOption[options[i]] = option;
      }
      votingStarted = true;
    }

    function vote(uint option) public {
      require(0 <= option && option < options.length);
      require(!hasVoted[msg.sender]);

      hasVoted[msg.sender] = true;
      votes[option] = votes[option] + 1;
    }

    function voteByName(string option) public {
      require(!hasVoted[msg.sender]);
      OptionPos memory optionPos = posOfOption[option];
      require(option.exists);

      hasVoted[msg.sender] = true;
      votes[optionPos.pos] = votes[optionPos.pos]++;
    }

    function getVotes() public view returns (uint[]) {
      return votes;
      }
}
