import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { SQRLFaucet } from '../artifacts/ts'
import { addressFromPublicKey, publicKeyFromPrivateKey } from '@alephium/web3'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  // Get settings

  const result = await deployer.deployContract(SQRLFaucet, {
    // The amount of token to be issued
    issueTokenAmount: 10000n * 1_000_000_000n,
    // The initial states of the faucet contract
    initialFields: {
      symbol: Buffer.from('SQRL', 'utf8').toString('hex'),
      name: Buffer.from('Squirrel', 'utf8').toString('hex'),
      decimals: 4n,
      supply: 10000n * 1_000_000_000n,
      balance: 10000n * 1_000_000_000n,
      owner: addressFromPublicKey(publicKeyFromPrivateKey(network.privateKeys[0]))
    }
  })
  console.log('Token faucet contract id: ' + result.contractInstance.contractId)
  console.log('Token faucet contract address: ' + result.contractInstance.address)
  console.log('Group Index: ' + result.contractInstance.groupIndex)
}

export default deployFaucet
