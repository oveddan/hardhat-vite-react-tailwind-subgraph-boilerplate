import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiConfig } from 'wagmi'
import './App.css'
import "@rainbow-me/rainbowkit/styles.css";
import { chains, client } from './web3/client'
import Web3Login from './web3/Web3Login'

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Web3Login />
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
