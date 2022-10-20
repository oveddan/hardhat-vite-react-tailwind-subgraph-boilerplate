import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import { chains, client } from './web3/client';
import Web3Login from './web3/Web3Login';
import TokenTestFunctions from './components/TokenTestFunctions';
import Nav from './components/Nav';

function App() {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <Nav />
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <TokenTestFunctions />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
