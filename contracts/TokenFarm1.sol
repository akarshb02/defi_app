// "SPDX-License-Identifier: UNLICENSED" 

pragma solidity ^0.8.3;
import "./DappToken.sol";
import "./DaiToken.sol";
contract TokenFarm {


 string public name = "Token Farm";
 string public symbol = "DAP";

 DappToken public dappToken;
 DaiToken public daiToken;
 address public owner;

address[] public stakers;
mapping(address => uint) public stakingBalance;
mapping(address => bool ) public hasStaked;
mapping(address => bool) public isStaking;


 constructor(DappToken _dapp, DaiToken _dai){

   dappToken = _dapp;
   daiToken = _dai;
   owner = msg.sender;
   
   
 }

 //stake tokens (Deposit)

 function stakeToken(uint _amount) public {

   require(_amount > 0,'amount cannot be 0');

   daiToken.transferFrom(msg.sender,address(this),_amount);

   stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

   if(!hasStaked[msg.sender])
   {
     stakers.push(msg.sender);
   }

   isStaking[msg.sender] = true;
   hasStaked[msg.sender] = true;

 }

 //issue reward tokens




function issueToken() public {

  require(msg.sender == owner,'caller must be the owner');
  for(uint i = 0;i<=stakers.length;i++){

    address recipient = stakers[i];
    uint balance = stakingBalance[recipient];

    if(balance>0){
        dappToken.transfer(recipient, balance);
    }
  }
}
}
