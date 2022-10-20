require('@nomicfoundation/hardhat-toolbox');

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = '7JOHPLbiPe75KZ3OBykXYwjZiHwcmX2x';

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = '2b0ff6875209eb835eff51dbede43a1b8c71de97271923f8818d7afe4f405aba';

const MUMBAI_PRIVATE_KEY = 'cfc4a6b1d71dd30b021f42115e9a3d36cedfbb9c31b34a31dae7e6d9230b4575';

module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/XkBbuhgXbMKQITu6j04r9S_B-6d96ep4`,
      accounts: [MUMBAI_PRIVATE_KEY],
      chainId: 80001,
    },
  },
};
