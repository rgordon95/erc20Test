//takes sender, number of approvers needed, and receiver (beneficiary)
//if approvals are met it will send the funds from sender to receiver

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract multiSigWallet {
    uint minApprovers; //number of people to approve before funds dispersed to receiver

    address beneficiary; //address of receipient
    address owner; //sender of funds

    mapping (address => bool) approvedBy; //checks who approved
    mapping (address => bool) isApprover; //checks if they are able to approve
    uint approvalsNum; //starts at 0, checks number of approvals so far

    constructor(
        address[] memory _approvers,
        uint _minApprovers,
        address _beneficiary
        ) public payable {

        require(_minApprovers <= _approvers.length, "Required number of approvers should be less than or = to number of approvers");

        minApprovers = _minApprovers;
        beneficiary = _beneficiary;
        owner = msg.sender;

        for (uint i = 0; i < _approvers.length; i++) { //loops over all submitted addresses that can be approvers
          address approver = _approvers[i]; //takes the input address and assigns it to the mapping
          isApprover[approver] = true; //assigns true to the isApprover field for the address input
        }

        }

    function approve() public { //used by approvers to approve
        require(isApprover[msg.sender], "Not an approver");
        if (!approvedBy[msg.sender]) {
            approvalsNum++;
            approvedBy[msg.sender] = true;

        }

        if (approvalsNum == minApprovers) {
            beneficiary.send(address(this).balance);
            selfdestruct(owner);
        }

    }

    function reject() public { //used by approvers to reject
        require(isApprover[msg.sender], "Not an approver");

        selfdestruct(owner); //destroys contract due to no approval, returns funds to owner/sender
    }

}
