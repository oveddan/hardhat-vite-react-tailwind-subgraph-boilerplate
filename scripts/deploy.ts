// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

import path from 'path';
import '@nomiclabs/hardhat-ethers';
import { artifacts, network, ethers } from 'hardhat';
import { MyToken } from '../typechain-types';
import { writeFile } from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(writeFile);

async function main() {
  // This is just a convenience check
  if (network.name === 'hardhat') {
    console.warn(
      'You are trying to deploy a contract to the Hardhat Network, which' +
        'gets automatically created and destroyed every time. Use the Hardhat' +
        " option '--network localhost'",
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log('Deploying the contracts with the account:', address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const contractFactory = await ethers.getContractFactory('MyToken');
  const deployedContract = await contractFactory.deploy();
  await deployedContract.deployed();

  console.log('Contract address:', deployedContract.address);

  // We also save the contract's artifacts and address in the frontend directory
  await saveFrontendFiles(deployedContract);
}

async function saveFrontendFiles(token: MyToken) {
  const fs = require('fs');
  const contractsDir = path.join(__dirname, '..', 'frontend', 'src', 'contracts', network.name);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, 'contract-address.json'),
    JSON.stringify({ Token: token.address }, undefined, 2),
  );

  const ContractArtifact = await artifacts.readArtifact('MyToken');

  await writeFileAsync(path.join(contractsDir, 'Contract.json'), JSON.stringify(ContractArtifact, null, 2));

  const abiTs = `export const abi = ${JSON.stringify(ContractArtifact.abi, null, 2)} as const`;

  await writeFileAsync(path.join(contractsDir, 'abi.ts'), abiTs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
