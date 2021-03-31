// "SPDX-License-Identifier: UNLICENSED" 

pragma solidity ^0.8.3;
import "./DappToken.sol";
import "./DaiToken.sol";
contract TokenFarm {


 string public name = "Token Farm";
 string public symbol = "DAP";

 DappToken public dappToken;
 DaiToken public daiToken;


mapping(address => uint) public stakingBalance;

 constructor(DappToken _dapp, DaiToken _dai){

   dappToken = _dapp;
   daiToken = _dai;
   
   
 }

 //stake tokens (Deposit)
 function stakeToken(uint _amount) public {

   daiToken.transferFrom(msg.sender,address(this),_amount);

   stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

 }
}
