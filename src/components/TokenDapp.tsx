import React, { useCallback } from 'react'
import { FC, useState } from 'react'
import styles from '../styles/Home.module.css'
import { withdrawToken } from '@/services/token.service'
import { TxStatus } from './TxStatus'
import { useWallet } from '@alephium/web3-react'
import { node } from '@alephium/web3'
import { TokenFaucetConfig } from '@/services/utils'

export const TokenDapp: FC<{
  config: TokenFaucetConfig
}> = ({ config }) => {
  const { signer } = useWallet()
  const addressGroup = config.groupIndex
  const claimableAmount = '1000000000'
  const [ongoingTxId, setOngoingTxId] = useState<string>()

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signer) {
      const result = await withdrawToken(signer, claimableAmount, config.faucetTokenId)
      setOngoingTxId(result.txId)
    }
  }

  const txStatusCallback = useCallback(
    async (status: node.TxStatus, numberOfChecks: number): Promise<any> => {
      if ((status.type === 'Confirmed' && numberOfChecks > 2) || (status.type === 'TxNotFound' && numberOfChecks > 3)) {
        setOngoingTxId(undefined)
      }

      return Promise.resolve()
    },
    [setOngoingTxId]
  )

  console.log('ongoing..', ongoingTxId)
  return (
    <>
      {ongoingTxId && <TxStatus txId={ongoingTxId} txStatusCallback={txStatusCallback} />}

      <div className={styles.table}>
        <form onSubmit={handleWithdrawSubmit}>
          <>
            <div className={styles.buttonCenterer}>
              {!ongoingTxId && (
                <input className={styles.claimbtn} type="submit" disabled={!!ongoingTxId} value="Claim Free SQRL" />
              )}
            </div>
            <h2>{config.network[0].toUpperCase() + config.network.substring(1).toLowerCase()}</h2>
            <table>
              <thead>
                <tr>
                  <td>SQRL ID</td>
                  <td>Group Index</td>
                  <td>Contract Address</td>
                  <td>Claimable Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr key={addressGroup} style={{ background: '#dbcacc', color: '#3c21ad' }}>
                  <td title="random">{config.faucetTokenId}</td>
                  <td title="random">{addressGroup}</td>
                  <td title="random">{config.tokenFaucetAddress}</td>
                  <td title="random">{claimableAmount}</td>
                </tr>
              </tbody>
            </table>
            <br />
          </>
        </form>
      </div>
    </>
  )
}
