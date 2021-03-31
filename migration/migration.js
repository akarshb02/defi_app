const TokenFarm = artifacts.require('./TokenFarm')
const dapp = artifacts.require('DappToken')
const dai = artifacts.require('DaiToken')

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(dai)
    const daiToken = await dai.deployed()

    await deployer.deploy(dapp)
    const dappToken = await dapp.deployed()

    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    //Transfer all tokens to TookenFarm from dapp

    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

    //transfer 10 dai token to invester
    await daiToken.transfer(accounts[1], '10000000000000000000')

}
