import { NetworkId } from '@alephium/web3'
import { loadDeployments } from '../../artifacts/ts/deployments'
import { get } from 'http'

export interface TokenFaucetConfig {
  network: NetworkId
  groupIndex: number
  tokenFaucetAddress: string
  faucetTokenId: string
}

interface TokenInfo {
  tokenID: string
  tokenAddress: string
}

function getNetwork(): NetworkId {
  const network = 'mainnet' as NetworkId
  return network
}

function getTokenInfo(): TokenInfo {
  if (getNetwork() === 'mainnet') {
    return {
      tokenID: 'e565d11d6d5194dc2a65c7d67c324d341bc55f1e7131a9ef5577e8e75e199000',
      tokenAddress: '2A8RXH3bRZcSAVdVhu93vEUENxH1kizJbTcdVxmsAZwAF'
    }
  } else if (getNetwork() === 'testnet') {
    return {
      tokenID: '99d91e5ab1b054da64c9933c126297c5067d7e2c8b08be8095d1aeab9f0c9201',
      tokenAddress: '253WWbzos3V4bskx2T82smLLfkFcJDnHJ27RwLy7Qtjo6'
    }
  } else {
    return {
      tokenID: 'e565d11d6d5194dc2a65c7d67c324d341bc55f1e7131a9ef5577e8e75e199000',
      tokenAddress: '2A8RXH3bRZcSAVdVhu93vEUENxH1kizJbTcdVxmsAZwAF'
    }
  }
}

function getTokenFaucetConfig(): TokenFaucetConfig {
  const network = getNetwork()
  const groupIndex = 0
  const tokenFaucetAddress = getTokenInfo().tokenAddress
  const faucetTokenId = getTokenInfo().tokenID
  return { network, groupIndex, tokenFaucetAddress, faucetTokenId }
}

export const tokenFaucetConfig = getTokenFaucetConfig()
