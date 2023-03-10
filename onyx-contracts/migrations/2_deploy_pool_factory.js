const StakingPoolFactory = artifacts.require('StakingPoolFactory')

module.exports = async function (deployer, network) {
  let tokenInstance

  console.log(`Deploying OnyxToken with ${network} settings.`)
  deployer
    .deploy(StakingPoolFactory, '0xd8A8CA8883af165Fc66ec75774a0B1C59326B0ad')
    .then((instance) => {
      tokenInstance = instance
    })
    .then(() => {
      return tokenInstance.deployDefaultPoolContract(
        '0x539bde0d7dbd336b79148aa742883198bbf60342',
        '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        '100000000000000000',
        Math.round(Date.now() / 1000).toString(),
        Math.round(Date.now() / 1000 + 86400 * 7).toString()
      )
    })
    .then(() => {
      console.table({
        StakingPoolFactory: tokenInstance.address,
      })
    })
}
