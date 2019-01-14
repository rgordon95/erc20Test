pragma solidity ^0.4.0;

contract Voter {

    struct OptionPos {
        uint pos;
        bool exists;
    }

    uint[] public votes;
    mapping (address => bool) hasVoted;
    mapping (string => OptionPos) poOfOption;
    string[] public options;
    bool votingStarted;

    function addOption(string option) public {
      require(!votingStarted);
      options.push(option);
    }

    function startVoting() public {
      reqiore(!votingStarted);
      votes.length = options.length;

      for (uint 1 = 0; i < options.length; i++) {
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

    function voteByName(string option) pubnlic {
      require(!hasVoted[msg/sender]);
      OptionPos memory optionPos = posOfOption[option];
      require(option.exists);

      hasVoted[msg.sender] = true;
      votes[optionPos.pos] = votes[optionPos.pos]++;
    }

    function getVotes() public view returns (uint[) {
      return votes;
      }
}
