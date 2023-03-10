const { BigNumber } = require('@ethersproject/bignumber')
const MasterChefOnyx = artifacts.require('MasterChefOnyx')
const OnyxToken = artifacts.require('OnyxToken')
const OnyxVault = artifacts.require('OnyxVault')
const OnyxLockedVesting = artifacts.require('OnyxLockedVesting')

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const INITIAL_MINT = '40000'
const HARD_CAP = '1430000'
const TOKENS_PER_SECOND = BigNumber.from(4).mul(BigNumber.from(String(10 ** 18)))
const DECIMALS = BigNumber.from(String(10 ** 18))
const START_TIME = Math.round(Date.now() / 1000)
const VESTING_END_TIME = Math.round(Date.now() / 1000 + 86400 * 75)
const FEE_ACCOUNT = process.env.FEE_ACCOUNT
const MASTER_KEY = process.env.MASTER_KEY

module.exports = async function (deployer, network) {
  console.log(`Starting on ${network} network...`)

  // Note: The deployer serves as an initial owner of the contracts
  let feeAccount = FEE_ACCOUNT // Gets the deposit fees from farms
  let masterKey = MASTER_KEY // Will control ownership for most contracts

  let tokenInstance
  let chefInstance

  /*
   * Contract #1: Deploy OnyxToken, Mint Initial Supply, and Set Hard Cap
   */
  console.log(`Deploying OnyxToken...`)
  deployer
    .deploy(OnyxToken, BigNumber.from(INITIAL_MINT).mul(DECIMALS), BigNumber.from(HARD_CAP).mul(DECIMALS))
    .then((instance) => {
      /*
       * Contract #2: Deploy VestingContract
       */
      console.log(`Deploying Vesting Contract...`)
      tokenInstance = instance
      return deployer.deploy(OnyxLockedVesting, masterKey, VESTING_END_TIME)
    })
    .then(() => {
      /*
       * Contract #3: Deploy MasterChefOnyx
       */
      console.log(`Deploying MasterChefOnyx Contract...`)
      return deployer.deploy(
        MasterChefOnyx,
        OnyxToken.address,
        OnyxLockedVesting.address,
        feeAccount,
        TOKENS_PER_SECOND,
        START_TIME
      )
    })
    .then((instance) => {
      /*
       * Add Initial Farm(s) and Transfer Token Ownership to MasterChefOnyx so it can mint
       */
      chefInstance = instance
      chefInstance.add(1000, OnyxToken.address, 0, true, ZERO_ADDRESS)
      return tokenInstance.transferOwnership(MasterChefOnyx.address)
    })
    .then(() => {
      /*
       * Contract #4: Deploy Autocompounding Vault
       */
      return deployer.deploy(OnyxVault, OnyxToken.address, MasterChefOnyx.address, 0, masterKey, feeAccount)
    })
    .then(() => {
      console.table({
        OnyxToken: OnyxToken.address,
        OnyxLockedVesting: OnyxLockedVesting.address,
        MasterChefOnyx: MasterChefOnyx.address,
        OnyxVault: OnyxVault.address,
        RewardStart: START_TIME,
        VestingEndTime: VESTING_END_TIME,
      })
    })
}
