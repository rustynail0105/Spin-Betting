import { useMemo, useContext, createContext } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import Header from "./components/Header";
import "./App.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import Home from "./components/Home/Home";
import { Grid } from "@mui/material";

export const BalanceContext = createContext({
  balance: 0,
  setBalance: () => {},
});

function App() {
  const { balance, setBalance } = useContext(BalanceContext);
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  /**
   * initialize all the wallets you want to use
   */
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [solNetwork]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BalanceContext.Provider
            value={{ balance: balance, setBalance: setBalance }}
          >
            <Grid maxWidth={"1600px"}>
              <Header />
              <Home />
            </Grid>
          </BalanceContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
