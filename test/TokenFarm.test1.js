const { assert } = require('chai')

const Dai = artifacts.require('DaiToken')
const Dapp = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()


function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, invester]) => { //owner = accounts[0],invester= accounts[1]

    let daiToken, dappToken, tokenFarm;


    before(async() => {
        daiToken = await Dai.new()
        dappToken = await Dapp.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)


        //Transfer all dapp tokens to form
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        //invester transert

        await daiToken.transfer(invester, tokens('1000'), { from: owner })
    })



    describe('Deployment', async() => {


        // step1
        it('has a name', async() => {

            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')

        })
        it('has a symbol', async() => {

            const symbol = await daiToken.symbol()
            assert.equal(symbol, 'mDAI')
        })


    })

    describe('Dapp Token', async() => {
        it('has a name', async() => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })

        it('has a symbol', async() => {
            const symbol = await dappToken.symbol()
            assert.equal(symbol, 'DAPP')
        })
    })


    describe('TokenFarm', async() => {

        it('has name', async() => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Token Farm')
        })

        it('has tokens', async() => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))

        })

    })
    describe('Farming', async() => {
        it('rewards investors for staking mDai tokens', async() => {
            let result = await daiToken.balanceOf(invester)


            //check investor balance before staking
            assert.equal(result.toString(), tokens('1000'), ' investor Mock Dai wallet balance correct before staking')


            await daiToken.approve(tokenFarm.address, tokens('1000'), { from: invester })
            await tokenFarm.stakeToken(tokens('1000'), { from: invester })


            result = await daiToken.balanceOf(invester)
            assert.equal(result.toString(), tokens('0'), 'investor Mock Dai wallet balance corect after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('1000'), 'Token Farm MOck Dai balance correct after staking')



        })

    })
})
