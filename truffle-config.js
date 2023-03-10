const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()

const DEPLOYER_KEY = process.env.DEPLOYER_KEY

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(DEPLOYER_KEY, 'https://rpc.ankr.com/polygon_mumbai'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: '20000000',
      gasPrice: '5100000000',
      skipDryRun: true,
    },
    arbitrum: {
      provider: () =>
        new HDWalletProvider(DEPLOYER_KEY, 'https://arbitrum.blockpi.network/v1/rpc/public'),
      network_id: 42161,
      confirmations: 2,
      timeoutBlocks: 200,
      gas: '20000000',
      gasPrice: '100000000',
      skipDryRun: true,
    },
    local: {
      provider: () => new HDWalletProvider(DEPLOYER_KEY, 'http://127.0.0.1:7545'),
      network_id: 5777,
      confirmations: 0,
      gasPrice: '20000000000',
      skipDryRun: true,
    },
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: process.env.ARBITRUM_API_KEY,
    polygonscan: process.env.POLYGON_API_KEY,
    arbiscan: process.env.ARBITRUM_API_KEY,
  },
  compilers: {
    solc: {
      version: '0.8.7',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
