pragma solidity 0.4.0;

contract Restricted { // parent contract
    function allowed(address addr) returns (bool) {
      return true;
  }
  function changeState() { require(allowed(msg.caller)); }
}

contract AllowsOwner is Restricted { // child extends parent
    address owner;
    function allowed(address addr) returns(bool) {
        return owner == addr;
    }
}