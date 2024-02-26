import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { TokenDapp } from '@/components/TokenDapp'
import { AlephiumConnectButton, useWallet } from '@alephium/web3-react'
import { tokenFaucetConfig } from '@/services/utils'
import Image from 'next/image'

export default function Home() {
  const { connectionStatus } = useWallet()

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>SQRL Faucet</title>
          <meta name="description" content="SQRL Token Faucet. IFCO - Intial Free Coin Offering" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.banner}>
            <h1 className={styles.title}>SQRL Faucet</h1>
            <Image src="/squirrellogo.png" alt="sqrl" width={250} height={250} />
          </div>
          <div className={styles.description}>
            <p>Your passive-aggresive backyard squirrel</p>
            <div className="links">
              <a href="https://www.x.com/squirrelALPH">Twitter</a>
              <a href="https://github.com/AdamCooke00/SquirrelALPH">GitHub</a>
              <a href="https://github.com/AdamCooke00/SquirrelALPH/blob/main/README.md">SQRL Factsheet</a>
            </div>
            <AlephiumConnectButton />
          </div>

          {connectionStatus === 'connected' && <TokenDapp config={tokenFaucetConfig} />}
        </main>
      </div>
    </>
  )
}
